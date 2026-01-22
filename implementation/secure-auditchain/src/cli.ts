#!/usr/bin/env node
import { Command } from "commander";
import { readOrInitChain, writeJsonFile as writeJson, DEFAULT_CHAIN_PATH } from "./storage.js";
import { Blockchain } from "./blockchain.js";
import { initKeys, readKeys } from "./keys.js";
import { readFile, writeFile } from "node:fs/promises";
import { ChainFile } from "./types.js";

const program = new Command();
program
  .name("secure-auditchain")
  .description("Mini blockchain audit log: tamper-evident secure storage (SHA-256 chain + Ed25519 signatures)")
  .version("1.0.0");

program
  .command("init-keys")
  .description("Generate Ed25519 keypair under keys/")
  .action(async () => {
    const kp = await initKeys();
    console.log("✅ Keys generated.");
    console.log("public.key.b64:", kp.publicKeyB64.slice(0, 24) + "...");
  });

program
  .command("add")
  .description("Add an audit event block")
  .requiredOption("--type <type>", "Event type, e.g. LOGIN_FAIL")
  .requiredOption("--actor <actor>", "Actor/user who triggered the event")
  .requiredOption("--message <message>", "Event message")
  .option("--meta <json>", "Optional JSON metadata (string)")
  .action(async (opts) => {
    const chainFile = await readOrInitChain(DEFAULT_CHAIN_PATH);
    const bc = new Blockchain(chainFile);
    const keys = await readKeys();

    let meta: Record<string, unknown> | undefined;
    if (opts.meta) {
      try {
        meta = JSON.parse(opts.meta);
      } catch {
        console.error("❌ --meta must be valid JSON.");
        process.exitCode = 1;
        return;
      }
    }

    const block = bc.addBlock(
      { type: String(opts.type), actor: String(opts.actor), message: String(opts.message), meta },
      keys
    );

    await writeJson(DEFAULT_CHAIN_PATH, bc.toJSON());
    console.log(`✅ Added block #${block.index} hash=${block.hash.slice(0, 16)}...`);
  });

program
  .command("verify")
  .description("Verify chain integrity + signatures")
  .action(async () => {
    const chainFile = await readOrInitChain(DEFAULT_CHAIN_PATH);
    const bc = new Blockchain(chainFile);
    const res = bc.verify();
    if (res.ok) {
      console.log("✅ Chain is VALID");
    } else {
      console.log("❌ Chain is INVALID");
      console.log(`First failure at block #${res.at}: ${res.reason}`);
      process.exitCode = 2;
    }
  });

program
  .command("print")
  .description("Print the chain (pretty)")
  .action(async () => {
    const chainFile = await readOrInitChain(DEFAULT_CHAIN_PATH);
    const bc = new Blockchain(chainFile);
    console.log(JSON.stringify(bc.toJSON(), null, 2));
  });

program
  .command("tamper-demo")
  .description("Run a demo that adds events, verifies OK, then tampers with disk file and verifies FAIL")
  .action(async () => {
    // ensure keys exist; if not, create
    let keys;
    try {
      keys = await readKeys();
    } catch {
      keys = await initKeys();
      console.log("✅ Generated new keys for demo");
    }

    // reset chain
    const emptyChainFile: ChainFile = { version: 1, createdAt: new Date().toISOString(), chain: [] };
    await writeJson(DEFAULT_CHAIN_PATH, emptyChainFile);
    console.log("🔄 Reset chain");

    // add a few events
    const bc = new Blockchain(emptyChainFile);
    bc.addBlock({ type: "LOGIN_FAIL", actor: "alice", message: "Bad password", meta: { ip: "1.2.3.4" } }, keys);
    bc.addBlock({ type: "ROLE_CHANGED", actor: "bob", message: "Granted admin role", meta: { by: "secops" } }, keys);
    bc.addBlock({ type: "FILE_HASH", actor: "system", message: "nginx.conf updated", meta: { file: "/etc/nginx/nginx.conf", sha256: "deadbeef" } }, keys);
    await writeJson(DEFAULT_CHAIN_PATH, bc.toJSON());
    console.log("✅ Added 3 blocks");

    // verify ok
    const verifyResult1 = bc.verify();
    if (verifyResult1.ok) {
      console.log("✅ Initial verification: Chain is VALID");
    } else {
      console.log("❌ Unexpected: Initial verification failed");
      return;
    }

    // tamper with chain.json on disk
    const obj = bc.toJSON();
    if (!obj.chain?.length) {
      console.error("Unexpected: empty chain");
      process.exitCode = 1;
      return;
    }

    // Modify message in block #1 (index 1)
    obj.chain[1].event.message = "Granted admin role (TAMPERED)";
    await writeFile(DEFAULT_CHAIN_PATH, JSON.stringify(obj, null, 2) + "\n", "utf-8");
    console.log("🛑 Tampered with data/chain.json (modified block #1 message).");

    // verify fail
    const tamperedChainFile = await readOrInitChain(DEFAULT_CHAIN_PATH);
    const bcTampered = new Blockchain(tamperedChainFile);
    const verifyResult2 = bcTampered.verify();
    if (verifyResult2.ok) {
      console.log("❌ Unexpected: Verification passed after tampering");
    } else {
      console.log("❌ Tampered chain verification: Chain is INVALID");
      console.log(`   First failure at block #${verifyResult2.at}: ${verifyResult2.reason}`);
      console.log("✅ Demo complete: Tampering was successfully detected!");
    }
  });

program.parseAsync(process.argv);

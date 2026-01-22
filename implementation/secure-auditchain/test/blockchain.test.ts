import { describe, it, expect } from "vitest";
import { Blockchain } from "../src/blockchain.js";
import { generateEd25519KeyPair } from "../src/crypto.js";

describe("Blockchain", () => {
  it("detects tampering", () => {
    const kp = generateEd25519KeyPair();
    const bc = new Blockchain({ version: 1, createdAt: new Date().toISOString(), chain: [] });

    bc.addBlock({ type: "A", actor: "alice", message: "one" }, kp);
    bc.addBlock({ type: "B", actor: "bob", message: "two" }, kp);

    expect(bc.verify()).toEqual({ ok: true });

    // tamper: change event message without rehashing/signing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (bc.chain[1] as any).event.message = "TAMPERED";
    const res = bc.verify();
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.at).toBe(1);
  });
});

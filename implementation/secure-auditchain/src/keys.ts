import { readFile, writeFile } from "node:fs/promises";
import { generateEd25519KeyPair } from "./crypto.js";
import { ensureDir, DEFAULT_KEYS_DIR, PUBLIC_KEY_PATH, PRIVATE_KEY_PATH } from "./storage.js";

export async function initKeys(): Promise<{ publicKeyB64: string; privateKeyB64: string }> {
  await ensureDir(DEFAULT_KEYS_DIR);
  const kp = generateEd25519KeyPair();
  await writeFile(PUBLIC_KEY_PATH, kp.publicKeyB64 + "\n", "utf-8");
  await writeFile(PRIVATE_KEY_PATH, kp.privateKeyB64 + "\n", "utf-8");
  return kp;
}

export async function readKeys(): Promise<{ publicKeyB64: string; privateKeyB64: string }> {
  const publicKeyB64 = (await readFile(PUBLIC_KEY_PATH, "utf-8")).trim();
  const privateKeyB64 = (await readFile(PRIVATE_KEY_PATH, "utf-8")).trim();
  return { publicKeyB64, privateKeyB64 };
}

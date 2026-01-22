import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { ChainFile } from "./types.js";

export async function ensureDir(path: string): Promise<void> {
  await mkdir(path, { recursive: true });
}

export async function readJsonFile<T>(path: string): Promise<T> {
  const raw = await readFile(path, "utf-8");
  return JSON.parse(raw) as T;
}

export async function writeJsonFile<T>(path: string, data: T): Promise<void> {
  await ensureDir(dirname(path));
  const raw = JSON.stringify(data, null, 2) + "\n";
  await writeFile(path, raw, "utf-8");
}

export const DEFAULT_CHAIN_PATH = "data/chain.json";
export const DEFAULT_KEYS_DIR = "keys";
export const PUBLIC_KEY_PATH = "keys/public.key.b64";
export const PRIVATE_KEY_PATH = "keys/private.key.b64";

export async function readOrInitChain(chainPath = DEFAULT_CHAIN_PATH): Promise<ChainFile> {
  try {
    return await readJsonFile<ChainFile>(chainPath);
  } catch {
    const init: ChainFile = {
      version: 1,
      createdAt: new Date().toISOString(),
      chain: []
    };
    await writeJsonFile(chainPath, init);
    return init;
  }
}

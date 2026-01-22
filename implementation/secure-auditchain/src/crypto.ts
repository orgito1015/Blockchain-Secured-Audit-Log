import { createHash, generateKeyPairSync, sign as cryptoSign, verify as cryptoVerify, createPublicKey } from "node:crypto";
import { canonicalStringify } from "./canonical.js";

export function sha256Hex(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

export type KeyPairB64 = {
  publicKeyB64: string;  // SPKI DER -> base64
  privateKeyB64: string; // PKCS8 DER -> base64
};

export function generateEd25519KeyPair(): KeyPairB64 {
  const { publicKey, privateKey } = generateKeyPairSync("ed25519", {
    publicKeyEncoding: { type: "spki", format: "der" },
    privateKeyEncoding: { type: "pkcs8", format: "der" }
  });

  return {
    publicKeyB64: Buffer.from(publicKey).toString("base64"),
    privateKeyB64: Buffer.from(privateKey).toString("base64")
  };
}

export function signEd25519(privateKeyB64: string, message: string): string {
  const privateKeyDer = Buffer.from(privateKeyB64, "base64");
  const signature = cryptoSign(null, Buffer.from(message, "utf-8"), {
    key: privateKeyDer,
    format: "der",
    type: "pkcs8"
  });
  return signature.toString("base64");
}

export function verifyEd25519(publicKeyB64: string, message: string, signatureB64: string): boolean {
  const publicKeyDer = Buffer.from(publicKeyB64, "base64");
  const signature = Buffer.from(signatureB64, "base64");

  // createPublicKey makes validation more robust
  const pub = createPublicKey({ key: publicKeyDer, format: "der", type: "spki" });
  return cryptoVerify(null, Buffer.from(message, "utf-8"), pub, signature);
}

/**
 * Hash preimage used for block hashing/signing.
 * NOTE: hash/sign does NOT include `hash`, `signature` fields themselves.
 */
export function blockPreimage(input: {
  index: number;
  timestamp: string;
  event: unknown;
  previousHash: string;
  publicKey: string;
}): string {
  return canonicalStringify(input);
}

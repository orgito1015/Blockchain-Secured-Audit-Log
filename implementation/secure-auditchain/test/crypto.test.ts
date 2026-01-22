import { describe, it, expect } from "vitest";
import { sha256Hex, generateEd25519KeyPair, signEd25519, verifyEd25519, blockPreimage } from "../src/crypto.js";

describe("Crypto Functions", () => {
  describe("sha256Hex", () => {
    it("generates consistent SHA-256 hashes", () => {
      const input = "test message";
      const hash1 = sha256Hex(input);
      const hash2 = sha256Hex(input);
      expect(hash1).toBe(hash2);
      expect(hash1).toHaveLength(64); // SHA-256 produces 64 hex characters
    });

    it("produces different hashes for different inputs", () => {
      const hash1 = sha256Hex("message1");
      const hash2 = sha256Hex("message2");
      expect(hash1).not.toBe(hash2);
    });
  });

  describe("Ed25519 Key Generation", () => {
    it("generates valid Ed25519 key pairs", () => {
      const kp = generateEd25519KeyPair();
      expect(kp.publicKeyB64).toBeTruthy();
      expect(kp.privateKeyB64).toBeTruthy();
      expect(typeof kp.publicKeyB64).toBe("string");
      expect(typeof kp.privateKeyB64).toBe("string");
    });

    it("generates unique key pairs", () => {
      const kp1 = generateEd25519KeyPair();
      const kp2 = generateEd25519KeyPair();
      expect(kp1.publicKeyB64).not.toBe(kp2.publicKeyB64);
      expect(kp1.privateKeyB64).not.toBe(kp2.privateKeyB64);
    });
  });

  describe("Ed25519 Signing and Verification", () => {
    it("signs and verifies messages correctly", () => {
      const kp = generateEd25519KeyPair();
      const message = "test message";
      const signature = signEd25519(kp.privateKeyB64, message);
      
      expect(signature).toBeTruthy();
      expect(typeof signature).toBe("string");
      
      const isValid = verifyEd25519(kp.publicKeyB64, message, signature);
      expect(isValid).toBe(true);
    });

    it("rejects invalid signatures", () => {
      const kp = generateEd25519KeyPair();
      const message = "test message";
      const signature = signEd25519(kp.privateKeyB64, message);
      
      // Verify with wrong message
      const isValid = verifyEd25519(kp.publicKeyB64, "wrong message", signature);
      expect(isValid).toBe(false);
    });

    it("rejects signatures from different keys", () => {
      const kp1 = generateEd25519KeyPair();
      const kp2 = generateEd25519KeyPair();
      const message = "test message";
      const signature = signEd25519(kp1.privateKeyB64, message);
      
      // Verify with different public key
      const isValid = verifyEd25519(kp2.publicKeyB64, message, signature);
      expect(isValid).toBe(false);
    });
  });

  describe("blockPreimage", () => {
    it("generates consistent canonical JSON", () => {
      const input = {
        index: 1,
        timestamp: "2024-01-01T00:00:00.000Z",
        event: { type: "TEST", actor: "alice", message: "test" },
        previousHash: "abc123",
        publicKey: "key123"
      };
      
      const preimage1 = blockPreimage(input);
      const preimage2 = blockPreimage(input);
      expect(preimage1).toBe(preimage2);
    });

    it("sorts object keys for consistency", () => {
      const input1 = {
        index: 1,
        timestamp: "2024-01-01T00:00:00.000Z",
        event: { actor: "alice", type: "TEST", message: "test" },
        previousHash: "abc123",
        publicKey: "key123"
      };
      
      const input2 = {
        index: 1,
        timestamp: "2024-01-01T00:00:00.000Z",
        event: { type: "TEST", message: "test", actor: "alice" },
        previousHash: "abc123",
        publicKey: "key123"
      };
      
      const preimage1 = blockPreimage(input1);
      const preimage2 = blockPreimage(input2);
      expect(preimage1).toBe(preimage2);
    });
  });
});

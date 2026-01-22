import { AuditEvent, Block, ChainFile } from "./types.js";
import { blockPreimage, sha256Hex, signEd25519, verifyEd25519 } from "./crypto.js";

export class Blockchain {
  private chainFile: ChainFile;

  constructor(chainFile: ChainFile) {
    this.chainFile = chainFile;
  }

  get chain(): Block[] {
    return this.chainFile.chain;
  }

  toJSON(): ChainFile {
    return this.chainFile;
  }

  getLatestHash(): string {
    if (this.chain.length === 0) return "GENESIS";
    return this.chain[this.chain.length - 1].hash;
  }

  addBlock(event: AuditEvent, keypair: { publicKeyB64: string; privateKeyB64: string }): Block {
    const index = this.chain.length;
    const timestamp = new Date().toISOString();
    const previousHash = this.getLatestHash();
    const publicKey = keypair.publicKeyB64;

    const preimage = blockPreimage({ index, timestamp, event, previousHash, publicKey });
    const hash = sha256Hex(preimage);
    const signature = signEd25519(keypair.privateKeyB64, hash);

    const block: Block = {
      index,
      timestamp,
      event,
      previousHash,
      hash,
      publicKey,
      signature
    };

    this.chain.push(block);
    return block;
  }

  /**
   * Validate chain integrity and signatures.
   * Returns { ok: true } if valid, else { ok:false, at:index, reason } for first failure.
   */
  verify(): { ok: true } | { ok: false; at: number; reason: string } {
    for (let i = 0; i < this.chain.length; i++) {
      const b = this.chain[i];

      const expectedPrev = i === 0 ? "GENESIS" : this.chain[i - 1].hash;
      if (b.previousHash !== expectedPrev) {
        return { ok: false, at: i, reason: `previousHash mismatch (expected ${expectedPrev})` };
      }

      const preimage = blockPreimage({
        index: b.index,
        timestamp: b.timestamp,
        event: b.event,
        previousHash: b.previousHash,
        publicKey: b.publicKey
      });
      const expectedHash = sha256Hex(preimage);
      if (b.hash !== expectedHash) {
        return { ok: false, at: i, reason: `hash mismatch (expected ${expectedHash})` };
      }

      const sigOk = verifyEd25519(b.publicKey, b.hash, b.signature);
      if (!sigOk) {
        return { ok: false, at: i, reason: "signature verification failed" };
      }
    }
    return { ok: true };
  }
}

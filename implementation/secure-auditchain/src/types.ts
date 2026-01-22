export type AuditEvent = {
  type: string;
  actor: string;
  message: string;
  meta?: Record<string, unknown>;
};

export type Block = {
  index: number;
  timestamp: string; // ISO
  event: AuditEvent;
  previousHash: string;
  hash: string;
  publicKey: string; // base64 (spki)
  signature: string; // base64
};

export type ChainFile = {
  version: number;
  createdAt: string;
  chain: Block[];
};

# Secure AuditChain (mini blockchain for cybersecurity)

A **small-scale blockchain system** that demonstrates **tamper-evident secure data storage** using:
- **SHA-256 hash chaining** (integrity)
- **Ed25519 digital signatures** (authenticity / non-repudiation)
- Simple **JSON file persistence**

## What this is (cybersecurity use-case)
This project models a **secure audit log** (append-only). If anyone edits, deletes, or reorders entries, verification fails.
With signatures enabled, an attacker **cannot** forge valid blocks without the private key.

## Quick start
```bash
npm install
npm run dev -- init-keys
npm run dev -- add --type LOGIN_FAIL --actor alice --message "Bad password" --meta '{"ip":"1.2.3.4"}'
npm run dev -- print
npm run dev -- verify
```

## Demo: detect tampering
```bash
npm run dev -- tamper-demo
# It will:
# 1) add a few events
# 2) verify OK
# 3) modify stored chain on disk
# 4) verify FAIL and show the first broken block
```

## Commands
- `init-keys` : generate Ed25519 keypair under `keys/`
- `add` : append an audit event into the chain (`data/chain.json`)
- `verify` : validate chain integrity + signatures
- `print` : pretty-print the chain
- `tamper-demo` : automatic demo of detection

## Threat model (short)
**Helps against:**
- Silent edits to audit logs
- Deleting entries
- Reordering entries
- “Re-hashing” attacks (blocked by signatures)

**Does NOT protect against:**
- Attacker who steals the **private key** (they can sign malicious entries)
- Attacker who fully controls the host and deletes *everything* (availability problem)
- Trust/consensus across multiple organizations (this is single-node demo)

## Repo layout
- `src/` implementation (block, chain, crypto, storage, CLI)
- `data/chain.json` created on first run
- `keys/` created by `init-keys`

## Notes
- Uses Node's built-in `crypto` for SHA-256 + Ed25519.
- Stored format is stable (canonical JSON), so signatures verify reliably.

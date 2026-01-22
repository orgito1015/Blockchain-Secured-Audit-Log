# Secure AuditChain

> A production-ready blockchain implementation for tamper-evident cybersecurity audit logging

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Overview

**Secure AuditChain** is a small-scale blockchain system designed for cybersecurity use cases. It provides **tamper-evident secure data storage** using industry-standard cryptographic techniques:

- **SHA-256 hash chaining** for integrity
- **Ed25519 digital signatures** for authenticity and non-repudiation
- **Simple JSON file persistence** for transparency and ease of inspection

## What This Is (Cybersecurity Use-Case)

This project models a **secure audit log** that is append-only. If anyone attempts to:
- Edit existing entries
- Delete entries
- Reorder entries  
- Modify without proper signatures

...the verification process will **immediately detect** the tampering.

With signatures enabled, an attacker **cannot** forge valid blocks without access to the private key.

## 📦 Installation

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 8.x or higher

### Setup

```bash
# Clone the repository
git clone https://github.com/orgito1015/Blockchain-Secured-Audit-Log.git
cd Blockchain-Secured-Audit-Log/implementation/secure-auditchain

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test
```

## 🚀 Quick Start

### 1. Initialize Cryptographic Keys

Generate an Ed25519 key pair for signing blocks:

```bash
npm run dev -- init-keys
```

This creates a `keys/` directory with:
- `public.key.b64` - Public key for verification
- `private.key.b64` - Private key for signing (keep secure!)

### 2. Add Audit Events

Add events to the blockchain:

```bash
npm run dev -- add \
  --type LOGIN_FAIL \
  --actor alice \
  --message "Bad password" \
  --meta '{"ip":"192.168.1.100","attempts":3}'
```

**Event Types** (examples):
- `LOGIN_FAIL` / `LOGIN_SUCCESS` - Authentication events
- `ROLE_CHANGED` - Privilege escalation
- `FILE_HASH` - File integrity monitoring
- `CONFIG_CHANGE` - Configuration modifications
- `ACCESS_DENIED` - Authorization failures

### 3. View the Blockchain

Pretty-print the entire chain:

```bash
npm run dev -- print
```

### 4. Verify Integrity

Validate the entire blockchain:

```bash
npm run dev -- verify
```

Output on success:
```
✅ Chain is VALID
```

Output on tampering:
```
❌ Chain is INVALID
First failure at block #2: hash mismatch (expected abc123...)
```

## 🎯 Commands Reference

### `init-keys`

Generate Ed25519 keypair for signing blocks.

### `add`

Append an audit event to the blockchain.

```bash
npm run dev -- add \
  --type <EVENT_TYPE> \
  --actor <USERNAME> \
  --message <DESCRIPTION> \
  [--meta <JSON_STRING>]
```

### `verify`

Validate blockchain integrity and all signatures.

### `print`

Display the blockchain in pretty-printed JSON format.

### `tamper-demo`

Automated demonstration of tampering detection.

## 🧪 Testing

```bash
# Run all tests
npm test
```

## 🔐 Security Model

### Threat Model

**Helps Against:**
- ✅ Silent edits to audit logs
- ✅ Deleting entries
- ✅ Reordering entries
- ✅ "Re-hashing" attacks (blocked by signatures)

**Does NOT Protect Against:**
- ❌ Attacker who steals the **private key** (they can sign malicious entries)
- ❌ Attacker who fully controls the host and deletes *everything* (availability problem)
- ❌ Trust/consensus across multiple organizations (single-node demo)

## 📂 Repository Layout

```
secure-auditchain/
├── src/                    # Source code
│   ├── blockchain.ts       # Core blockchain logic
│   ├── crypto.ts          # Cryptographic functions
│   ├── canonical.ts       # Canonical JSON serialization
│   ├── types.ts           # TypeScript type definitions
│   ├── storage.ts         # File I/O operations
│   ├── keys.ts            # Key management
│   ├── cli.ts             # Command-line interface
│   └── index.ts           # Main entry point
│
├── test/                   # Test suite
│   ├── blockchain.test.ts  # Blockchain tests
│   ├── crypto.test.ts      # Crypto function tests
│   └── canonical.test.ts   # JSON serialization tests
│
├── data/                   # Created on first run
│   └── chain.json         # Blockchain storage
│
└── keys/                   # Created by init-keys
    ├── public.key.b64     # Public key
    └── private.key.b64    # Private key (keep secure!)
```

## 🛠️ Development

```bash
# Build
npm run build

# Lint
npm run lint

# Development mode (no build)
npm run dev -- <command> [options]
```

## 🔗 Related Documentation

- [Main Project README](../../README.md)
- [Research Paper](../../research/paper.md)
- [Contributing Guidelines](../../CONTRIBUTING.md)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

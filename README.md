# Blockchain-Secured-Audit-Log

[![CI](https://github.com/orgito1015/Blockchain-Secured-Audit-Log/workflows/CI/badge.svg)](https://github.com/orgito1015/Blockchain-Secured-Audit-Log/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive research and implementation project demonstrating the application of blockchain technology in cybersecurity for secure, tamper-evident audit logging.

**Blockchain in Cybersecurity: Research and Implementation of a Small-Scale Blockchain System for Secure Data Storage**

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Features](#features)
- [Key Technologies](#key-technologies)
- [Getting Started](#getting-started)
- [Use Cases](#use-cases)
- [Research Paper](#research-paper)
- [Contributing](#contributing)
- [License](#license)

## 🔍 Overview

This repository contains both academic research and a working implementation exploring how blockchain principles can enhance cybersecurity data storage. Traditional centralized logging systems are vulnerable to tampering, deletion, and unauthorized modification. This project demonstrates how cryptographic techniques can provide:

- **Immutability**: Logs that cannot be altered without detection
- **Authenticity**: Cryptographic proof of who created each entry
- **Auditability**: Transparent verification of entire log history
- **Non-repudiation**: Cryptographic signatures prevent denial of actions

## 📁 Project Structure

```
├── research/           # Academic research paper
│   └── paper.md       # Full research documentation
│
└── implementation/     # Working blockchain implementation
    └── secure-auditchain/
        ├── src/       # Source code
        ├── test/      # Test suite
        └── README.md  # Implementation guide
```

### `/research` – Academic Research

Complete research paper covering:
- Blockchain fundamentals and cybersecurity applications
- Threat model and security analysis
- System design and architecture
- Implementation details and evaluation
- Limitations and future work

### `/implementation` – Blockchain System

Production-ready TypeScript implementation featuring:
- SHA-256 cryptographic hash chaining
- Ed25519 digital signatures
- CLI for managing audit events
- Comprehensive test suite
- Attack simulation and verification tools

## ✨ Features

### Core Capabilities

- **Tamper-Evident Logging**: Any modification to stored events is immediately detectable
- **Cryptographic Hash Chaining**: Each block links to the previous one via SHA-256 hashes
- **Digital Signatures**: Ed25519 signatures ensure authenticity and non-repudiation
- **Attack Simulation**: Built-in tools to demonstrate tampering detection
- **Chain Verification**: Automated validation of entire blockchain integrity
- **JSON Storage**: Simple file-based persistence for easy inspection

### Security Properties

✅ Detects unauthorized modifications  
✅ Prevents silent data deletion  
✅ Identifies reordering attacks  
✅ Validates cryptographic signatures  
✅ Ensures data integrity across the chain  

## 🔧 Key Technologies

- **Node.js** - Runtime environment
- **TypeScript** - Type-safe development
- **SHA-256** - Cryptographic hashing (Node.js built-in)
- **Ed25519** - Digital signatures (Node.js built-in)
- **Vitest** - Testing framework
- **ESLint** - Code quality

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/orgito1015/Blockchain-Secured-Audit-Log.git
   cd Blockchain-Secured-Audit-Log/implementation/secure-auditchain
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Initialize cryptographic keys**
   ```bash
   npm run dev -- init-keys
   ```

4. **Add your first audit event**
   ```bash
   npm run dev -- add --type LOGIN_FAIL --actor alice --message "Invalid password" --meta '{"ip":"192.168.1.100"}'
   ```

5. **View the blockchain**
   ```bash
   npm run dev -- print
   ```

6. **Verify integrity**
   ```bash
   npm run dev -- verify
   ```

7. **Run tampering demo**
   ```bash
   npm run dev -- tamper-demo
   ```

For detailed usage instructions, see [implementation/secure-auditchain/README.md](implementation/secure-auditchain/README.md)

## 💡 Use Cases

### Cybersecurity Applications

- **Security Audit Logs**: Tamper-proof logging of security events
- **Access Control Records**: Immutable history of authentication attempts
- **Configuration Changes**: Auditable system configuration modifications
- **File Integrity Monitoring**: Cryptographic verification of file changes
- **Incident Response**: Trustworthy forensic evidence
- **Compliance Auditing**: Verifiable regulatory compliance records

### Example Scenarios

**Failed Login Attempts**
```bash
npm run dev -- add --type LOGIN_FAIL --actor "user@example.com" --message "Failed login attempt" --meta '{"ip":"203.0.113.0","attempts":3}'
```

**Privilege Escalation**
```bash
npm run dev -- add --type ROLE_CHANGE --actor "admin" --message "Granted admin role to user" --meta '{"target":"user123","by":"security-team"}'
```

**File Modifications**
```bash
npm run dev -- add --type FILE_CHANGE --actor "system" --message "Critical config modified" --meta '{"file":"/etc/nginx/nginx.conf","hash":"abc123..."}'
```

## 📚 Research Paper

The academic research paper explores:

1. **Introduction**: Motivation and problem statement
2. **Background**: Blockchain technology and related work
3. **Threat Model**: Security assumptions and attacker capabilities
4. **System Design**: Architecture and cryptographic components
5. **Implementation**: Technical details and design decisions
6. **Evaluation**: Testing and security analysis
7. **Limitations**: Current constraints and scope
8. **Future Work**: Potential enhancements and extensions

Read the full paper: [research/paper.md](research/paper.md)

## 🧪 Development

### Running Tests

```bash
cd implementation/secure-auditchain
npm test
```

### Build

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on:

- Development setup
- Code style
- Testing requirements
- Pull request process

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](implementation/secure-auditchain/LICENSE) file for details.

## 🔒 Security Considerations

### What This Protects Against

- ✅ Unauthorized log modifications
- ✅ Deletion or reordering of entries
- ✅ Re-hashing attacks
- ✅ Repudiation of actions

### What This Does NOT Protect Against

- ❌ Attacker with access to private keys (can create valid malicious entries)
- ❌ Complete system compromise (availability attacks)
- ❌ Distributed consensus issues (single-node implementation)

### Recommendations for Production

- Store private keys in hardware security modules (HSM)
- Implement key rotation policies
- Add distributed consensus for multi-node deployments
- Integrate with existing SIEM systems
- Regular backup and disaster recovery procedures

## 📊 Project Status

- [x] Research paper completed
- [x] Core blockchain implementation
- [x] SHA-256 hash chaining
- [x] Ed25519 digital signatures
- [x] CLI interface
- [x] Comprehensive test suite
- [x] CI/CD pipeline
- [ ] Distributed consensus (future work)
- [ ] Merkle tree optimization (future work)
- [ ] Web interface (future work)

## 🙏 Acknowledgments

- NIST Digital Signature Standards
- Node.js Crypto Module
- Blockchain research community

---

**Note**: This is a research and educational project. For production use, additional security hardening and feature development is recommended.

# ACP Agents for Angular Migration

This directory contains **ACP (Agent Client Protocol) agents** that implement the 11 specialized agent roles for Angular v15→v20 migration.

## 🎯 What Are These?

These are **actual executable ACP agents** (not prompt templates) that can be used directly in Zed Editor. They communicate with Zed via the Agent Client Protocol (ACP) over stdio.

## 📦 Installation

```bash
cd workshop/agents/acp-agents
npm install
npm run build
```

## 🚀 Usage in Zed

Add to `~/.config/zed/settings.json`:

```json
{
  "agent_servers": {
    "Build Fixer": {
      "command": "node",
      "args": ["/absolute/path/to/acp-agents/dist/agents/build-fixer.js", "--acp"],
      "env": {}
    },
    "Code Modernizer": {
      "command": "node",
      "args": ["/absolute/path/to/acp-agents/dist/agents/code-modernizer.js", "--acp"],
      "env": {}
    },
    "Style Migrator": {
      "command": "node",
      "args": ["/absolute/path/to/acp-agents/dist/agents/style-migrator.js", "--acp"],
      "env": {}
    },
    "Logic Refactorer": {
      "command": "node",
      "args": ["/absolute/path/to/acp-agents/dist/agents/logic-refactorer.js", "--acp"],
      "env": {}
    },
    "Dependency Auditor": {
      "command": "node",
      "args": ["/absolute/path/to/acp-agents/dist/agents/dependency-auditor.js", "--acp"],
      "env": {}
    },
    "Infra & Perf Optimizer": {
      "command": "node",
      "args": ["/absolute/path/to/acp-agents/dist/agents/infra-perf-optimizer.js", "--acp"],
      "env": {}
    },
    "Architecture Reviewer": {
      "command": "node",
      "args": ["/absolute/path/to/acp-agents/dist/agents/architecture-reviewer.js", "--acp"],
      "env": {}
    },
    "Code Reviewer": {
      "command": "node",
      "args": ["/absolute/path/to/acp-agents/dist/agents/code-reviewer.js", "--acp"],
      "env": {}
    },
    "Unit Test Migrator": {
      "command": "node",
      "args": ["/absolute/path/to/acp-agents/dist/agents/unit-test-migrator.js", "--acp"],
      "env": {}
    },
    "E2E Test Migrator": {
      "command": "node",
      "args": ["/absolute/path/to/acp-agents/dist/agents/e2e-test-migrator.js", "--acp"],
      "env": {}
    },
    "Test Migrator": {
      "command": "node",
      "args": ["/absolute/path/to/acp-agents/dist/agents/test-migrator.js", "--acp"],
      "env": {}
    }
  }
}
```

## 📋 Available Agents

### Dev Team Agents (8)
1. **Build Fixer** - Fixes TypeScript errors, build failures
2. **Code Modernizer** - Converts legacy patterns to modern syntax
3. **Style Migrator** - Handles Material MDC and CSS refactoring
4. **Logic Refactorer** - Modernizes services, HTTP, state management
5. **Dependency Auditor** - Ensures package compatibility
6. **Infra & Perf Optimizer** - Optimizes infrastructure and performance
7. **Architecture Reviewer** - Audits code architecture
8. **Code Reviewer** - Pre-validates code before PR

### AQA Team Agents (3)
9. **Unit Test Migrator** - Migrates Karma to Vitest
10. **E2E Test Migrator** - Migrates Protractor to Playwright
11. **Test Migrator** - Legacy agent for backward compatibility

## 🔧 Development

### Build
```bash
npm run build
```

### Watch Mode
```bash
npm run dev
```

### Test Individual Agent
```bash
npm run start:build-fixer
```

## 📚 Architecture

- **BaseAgent** (`src/base/BaseAgent.ts`) - Base class for all agents
- **Individual Agents** (`src/agents/*.ts`) - Agent-specific implementations
- **Entry Points** (`src/agents/*.ts`) - Executable scripts

## 🔗 Related Documentation

- **Prompt Templates**: `../roles/` - Original prompt templates (still useful for reference)
- **Agent Strategy**: `../README.md` - Overall agent strategy
- **ACP Setup Guide**: `../../docs/setup/acp-agents-setup.md` - Detailed ACP agents setup
- **Zed Setup**: `../../docs/setup/zed-mcp-setup.md` - MCP server setup
- **Zed Architecture**: `../docs/zed-guide.md` - Understanding ACP vs MCP vs prompt templates

## ⚠️ Note

These ACP agents work alongside MCP servers. Make sure you have:
- Angular MCP server configured
- Playwright MCP server configured (for test agents)
- Context7 MCP server configured (optional but recommended)

See `../../docs/setup/acp-agents-setup.md` for detailed ACP agents setup and `../../docs/setup/zed-mcp-setup.md` for MCP server setup.


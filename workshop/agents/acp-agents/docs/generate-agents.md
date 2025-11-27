# ACP Agents Generation

This directory contains ACP (Agent Client Protocol) agents for Angular migration.

## Structure

- `src/base/BaseAgent.ts` - Base class for all agents
- `src/agents/` - Individual agent implementations
- Each agent has:
  - `{AgentName}Agent.ts` - Agent class implementation
  - `{agent-name}.ts` - Entry point script

## Agents

1. ✅ Build Fixer (`BuildFixerAgent.ts`)
2. ✅ Code Modernizer (`CodeModernizerAgent.ts`)
3. ⏳ Style Migrator
4. ⏳ Logic Refactorer
5. ⏳ Dependency Auditor
6. ⏳ Infra & Perf Optimizer
7. ⏳ Architecture Reviewer
8. ⏳ Code Reviewer
9. ⏳ Unit Test Migrator
10. ⏳ E2E Test Migrator
11. ⏳ Test Migrator (Legacy)

## Building

```bash
npm install
npm run build
```

## Configuration

Add to `~/.config/zed/settings.json`:

```json
{
  "agent_servers": {
    "Build Fixer": {
      "command": "node",
      "args": ["/path/to/acp-agents/dist/agents/build-fixer.js", "--acp"],
      "env": {}
    },
    "Code Modernizer": {
      "command": "node",
      "args": ["/path/to/acp-agents/dist/agents/code-modernizer.js", "--acp"],
      "env": {}
    }
  }
}
```


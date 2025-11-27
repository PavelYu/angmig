# ACP Agents Setup Guide

## ✅ Conversion Complete!

All 11 prompt template agents have been converted to **actual ACP (Agent Client Protocol) agents** that can be used directly in Zed Editor.

## 📁 Structure

```
acp-agents/
├── src/
│   ├── base/
│   │   └── BaseAgent.ts          # Base class for all agents
│   └── agents/
│       ├── BuildFixerAgent.ts    # Build Fixer implementation
│       ├── build-fixer.ts         # Entry point
│       ├── CodeModernizerAgent.ts
│       ├── code-modernizer.ts
│       └── ... (9 more agents)
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── README.md                      # Usage documentation
├── zed-config.json               # Zed configuration template
└── .gitignore
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd workshop/agents/acp-agents
npm install
```

### 2. Build

```bash
npm run build
```

### 3. Configure Zed

Copy the configuration from `zed-config.json` to `~/.config/zed/settings.json`, updating the paths to match your system:

```bash
# Get absolute path
cd /Users/Pavel_Yukhnovich/Documents/angmig/workshop/agents/acp-agents
pwd  # Use this path in zed-config.json
```

Then merge `zed-config.json` into your `~/.config/zed/settings.json` under `agent_servers`.

### 4. Use in Zed

1. Open Zed Editor
2. Press `Cmd+?` to open Agent Panel
3. Click `+` button
4. Select one of the configured agents (e.g., "Build Fixer")
5. Start chatting!

## 📋 Available Agents

### Dev Team (8 agents)
1. **Build Fixer** - Fixes TypeScript errors, build failures
2. **Code Modernizer** - Converts legacy patterns to modern syntax
3. **Style Migrator** - Handles Material MDC and CSS refactoring
4. **Logic Refactorer** - Modernizes services, HTTP, state management
5. **Dependency Auditor** - Ensures package compatibility
6. **Infra & Perf Optimizer** - Optimizes infrastructure and performance
7. **Architecture Reviewer** - Audits code architecture
8. **Code Reviewer** - Pre-validates code before PR

### AQA Team (3 agents)
9. **Unit Test Migrator** - Migrates Karma to Vitest
10. **E2E Test Migrator** - Migrates Protractor to Playwright
11. **Test Migrator** - Legacy agent for backward compatibility

## 🔧 Development

### Watch Mode
```bash
npm run dev
```

### Test Individual Agent
```bash
npm run start:build-fixer
```

## 📚 Differences from Prompt Templates

| Aspect | Prompt Templates | ACP Agents |
|--------|------------------|------------|
| **Location** | `roles/*.md` | `acp-agents/src/agents/*.ts` |
| **Format** | Markdown files | TypeScript/JavaScript |
| **Usage** | Copy-paste into Agent Panel | Direct integration in Zed |
| **Execution** | Manual copy-paste | Automatic via ACP protocol |
| **Customization** | Edit Markdown | Edit TypeScript code |

## ⚠️ Important Notes

1. **MCP Servers Still Required**: ACP agents work alongside MCP servers. Make sure you have:
   - Angular MCP server configured
   - Playwright MCP server (for test agents)
   - Context7 MCP server (optional but recommended)

2. **Path Configuration**: Update all paths in `zed-config.json` to absolute paths on your system.

3. **Dependencies**: The `@agentclientprotocol/sdk` package will be installed via `npm install`.

## 🔗 Related Documentation

- **Prompt Templates**: `../roles/` - Original prompt templates (still useful for reference)
- **Agent Strategy**: `../README.md` - Overall agent strategy
- **Zed Setup**: `../../docs/setup/zed-mcp-setup.md` - MCP server setup
- **Zed Architecture**: `../../agents/docs/zed-guide.md` - Understanding ACP vs MCP

## 🎉 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Build: `npm run build`
3. ✅ Configure Zed: Update `~/.config/zed/settings.json`
4. ✅ Test: Open Agent Panel in Zed and try an agent!
5. ✅ Customize: Edit agent implementations as needed


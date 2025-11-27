# 🤖 How Agents Work in Zed Editor

## Overview

**Important Clarification**: Zed Editor has **two different concepts** that are both called "agents":

1. **ACP Agents** (Agent Client Protocol) - Actual executable programs that communicate with Zed
2. **MCP Servers** (Model Context Protocol) - Context/knowledge providers for AI

**In this project**, "agents" refer to **prompt templates** written in **Markdown** files that you use with **Zed Editor's built-in Agent Panel** and **MCP servers**.

---

## 🎯 What Are "Agents" in This Project?

In this migration project, "agents" are **specialized prompt templates** stored as Markdown files. They define:
- **Role descriptions** (what the agent does)
- **Prompt templates** (ready-to-use prompts you copy into Zed's Agent Panel)
- **Examples** (before/after code, common patterns)
- **Instructions** (step-by-step guidance)

**Example**: The `build_fixer.md` file contains prompts like:
```markdown
@BuildFixer
Fix the following TypeScript compilation errors:

**Errors**:
[PASTE YOUR ERRORS HERE]
```

> **Note**: These are NOT actual ACP agents (executable programs). They are prompt templates used with Zed's built-in AI chat interface (Agent Panel).

---

## 📝 Agent File Format

Agents are written in **Markdown** (`.md` files). Each agent file contains:

1. **Role Description** - What the agent does
2. **Responsibilities** - List of tasks
3. **Knowledge Sources** - Which MCP servers it uses
4. **Prompt Templates** - Copy-paste ready prompts
5. **Examples** - Before/after code examples
6. **Best Practices** - Usage guidelines

**Location**: `workshop/agents/roles/*.md`

**Example agents**:
- `build_fixer.md` - Fixes TypeScript errors
- `code_modernizer.md` - Converts legacy Angular patterns
- `style_migrator.md` - Handles CSS/Material migrations
- `unit_test_migrator.md` - Migrates Karma to Vitest

---

## 🛠️ How Agents Work with Zed Editor

### 1. **Zed Editor's Agent Panel** (The Interface)
- Fast, AI-native code editor (https://zed.dev)
- Built-in **Agent Panel** (AI chat interface) - Press `Cmd+?` to open
- Uses Zed's first-party AI agent or external ACP agents (Claude Code, Gemini CLI, Codex)
- Supports MCP servers for enhanced context

### 2. **MCP Servers** (The "Brains" - Context Providers)
MCP (Model Context Protocol) servers provide specialized knowledge:

- **Angular MCP**: Official Angular documentation, migration guides
- **Playwright MCP**: Test execution and debugging
- **Context7 MCP**: Project-specific memory and patterns

**MCP servers are NOT agents** - they're context/knowledge providers that the AI can query.

### 3. **Agent Prompts** (The Instructions)
You copy prompt templates from agent `.md` files into **Zed's Agent Panel** (the built-in AI chat).

---

## 🚀 Usage Workflow

### Step 1: Choose an Agent
Pick the agent that matches your task:
```bash
# Example: Open Build Fixer agent
open workshop/agents/roles/build_fixer.md
```

### Step 2: Copy a Prompt Template
Each agent file contains 5-6 prompt templates. Find one that matches your scenario.

**Example from Build Fixer**:
```markdown
@BuildFixer
Fix the following TypeScript compilation errors:

**Errors**:
```
[PASTE YOUR ERRORS HERE]
```

**Tasks**:
1. Fix strict null checks
2. Add proper type annotations
3. Resolve module imports
```

### Step 3: Customize & Paste into Zed
1. Replace placeholders (like `[PASTE YOUR ERRORS HERE]`) with your actual data
2. Paste the prompt into **Zed Editor's AI chat** (with MCP servers enabled)
3. The AI uses MCP servers to:
   - Query Angular MCP for official documentation
   - Check Context7 for project-specific patterns
   - Apply fixes following best practices

### Step 4: Review & Apply
1. Review the AI-generated solution
2. Apply the changes
3. Verify with tests/build

---

## 🔧 Technical Stack

### No Special Language Required
- **Agent files**: Plain Markdown (`.md`)
- **Prompts**: Natural language instructions
- **Execution**: Zed Editor + AI + MCP servers

### MCP Configuration
MCP servers are configured in `~/.config/zed/settings.json` under `context_servers`:

```json
{
  "context_servers": {
    "angular": {
      "command": "npx",
      "args": ["@angular/mcp-server"],
      "env": {}
    },
    "playwright": {
      "command": "node",
      "args": ["/path/to/playwright-mcp/dist/index.js"],
      "env": {
        "PLAYWRIGHT_PROJECT_PATH": "/path/to/project"
      }
    },
    "context7": {
      "command": "npx",
      "args": ["context7-mcp"],
      "env": {
        "UPSTASH_REDIS_URL": "your-redis-url",
        "UPSTASH_REDIS_TOKEN": "your-token"
      }
    }
  }
}
```

**Alternative**: Install MCP servers as **extensions** from the Zed extensions marketplace (easier setup).

**Official Documentation**: https://zed.dev/docs/ai/mcp

---

## 📚 Example: Creating Your Own Agent

If you want to create a custom agent:

1. **Create a Markdown file**: `workshop/agents/roles/my_agent.md`

2. **Write the structure**:
```markdown
# 👷 Agent Role: My Custom Agent

## 📋 Role Description
The **My Custom Agent** does [specific task].

## 🎯 Responsibilities
- Task 1
- Task 2
- Task 3

## 💬 Prompt Templates

### Template 1: Common Use Case
```markdown
@MyCustomAgent
[Your prompt template here]

**Context**:
- [Context details]

**Expected Output**:
- [What you want]
```
```

3. **Use it**: Copy the prompt template into Zed Editor's AI chat

---

## 🎯 Key Points

✅ **Agents are Markdown files** - No special language needed  
✅ **Prompts are natural language** - Just instructions in English  
✅ **Zed Editor executes** - Via AI chat with MCP servers  
✅ **MCP provides context** - Angular docs, project memory, test tools  

---

## 📖 Further Reading

- **Agent Strategy**: `workshop/agents/README.md`
- **Zed + MCP Setup**: `workshop/docs/setup/zed-mcp-setup.md`
- **Example Agent**: `workshop/agents/roles/build_fixer.md`

---

---

## 🔍 Understanding Zed's Two "Agent" Concepts

### Type 1: ACP Agents (Agent Client Protocol)
**What they are**: Actual executable programs that communicate with Zed via stdio

**How to create**:
- Can be written in **any programming language** (Python, JavaScript, Rust, etc.)
- Must implement the **Agent Client Protocol (ACP)** specification
- Configured in `settings.json` under `agent_servers`

**Example**:
```json
{
  "agent_servers": {
    "My Custom Agent": {
      "type": "custom",
      "command": "node",
      "args": ["~/projects/agent/index.js", "--acp"],
      "env": {}
    }
  }
}
```

**Official Examples**: Gemini CLI, Claude Code, Codex (built-in)

**Official Documentation**: https://zed.dev/docs/ai/external-agents

### Type 2: MCP Servers (Model Context Protocol)
**What they are**: Context/knowledge providers (NOT agents themselves)

**How to create**:
- Can be written in **any programming language**
- Must implement the **Model Context Protocol (MCP)** specification
- Configured in `settings.json` under `context_servers` or installed as extensions

**Purpose**: Provide specialized knowledge/tools to AI agents

**Official Documentation**: https://zed.dev/docs/ai/mcp

### Type 3: Prompt Templates (This Project)
**What they are**: Markdown files with reusable prompt templates

**How to create**: Just write Markdown files with prompt templates (no code needed!)

**Usage**: Copy prompts into Zed's Agent Panel (built-in AI chat)

---

## 💡 Summary

**Question**: "How are agents created for Zed editor? Is it a specific language?"

**Answer**: 
- **In this project**: "Agents" are **Markdown files** with prompt templates (no code needed)
- **For actual ACP agents**: Can be written in **any language** (Python, JS, Rust, etc.) that implements ACP
- **For MCP servers**: Can be written in **any language** that implements MCP
- **Natural language prompts** - Written in plain English/Markdown
- **Zed's Agent Panel executes** - Built-in AI chat uses MCP servers for context

**This Project's Approach**: 
- Uses **prompt templates** (Markdown files) 
- Leverages **Zed's built-in Agent Panel** (first-party AI)
- Connects to **MCP servers** for specialized knowledge (Angular docs, Playwright, Context7)

**Think of it as**: "Specialized prompt libraries" that leverage Zed Editor's built-in AI capabilities combined with MCP servers for specialized knowledge.

---

## 📚 Official Zed Documentation References

- **External Agents (ACP)**: https://zed.dev/docs/ai/external-agents
- **Model Context Protocol (MCP)**: https://zed.dev/docs/ai/mcp
- **Agent Panel**: https://zed.dev/docs/ai/agent-panel
- **Agent Client Protocol Spec**: https://agentclientprotocol.com
- **Model Context Protocol Spec**: https://modelcontextprotocol.io


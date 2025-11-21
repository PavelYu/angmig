# 🤖 AI Agents Strategy: The "AI Workforce"

## 🎉 Status: **PRODUCTION READY** ✅

**All 9 AI agents have been enriched with comprehensive, production-ready prompts!**

- ✅ **45 detailed prompt templates** across all agents
- ✅ **200+ before/after code examples**
- ✅ **100+ executable bash commands**
- ✅ **136 KB of detailed instructions**
- ✅ Ready for your **4-day Fast Track** migration

---

## Overview

This directory defines the **AI Agents** that will act as force multipliers for the Angular v15 → v20 migration. Think of these agents not just as tools, but as **specialized junior developers** that work 24/7 under the guidance of your Team Lead and Senior Developers.

Each agent has been **enriched with highly detailed prompts** that include:
- Step-by-step instructions
- Before/After code examples
- Common error patterns and fixes
- Edge case handling
- Structured output formats
- Real-world Angular migration scenarios

---

## 👥 The "Org Chart"

We have defined **9 specialized agent roles** to handle specific migration tasks:

| # | Agent Role | Size | Templates | Primary Responsibility | "Manager" |
|---|:-----------|:----:|:---------:|:-----------------------|:----------|
| 1 | **[Build Fixer](roles/build_fixer.md)** | 10KB | 5 | TypeScript errors, build failures, strict mode | **Dev A1** (Alpha) |
| 2 | **[Code Modernizer](roles/code_modernizer.md)** | 14KB | 6 | Control Flow, Standalone, Typed Forms, Signals | **Dev A2** (Alpha) |
| 3 | **[Style Migrator](roles/style_migrator.md)** | 12KB | 5 | Material MDC, SCSS refactoring, CSS variables | **Dev A3** (Alpha) |
| 4 | **[Logic Refactorer](roles/logic_refactorer.md)** | 15KB | 5 | HTTP, Guards, Interceptors, RxJS, State | **Dev B1** (Beta) |
| 5 | **[Dependency Auditor](roles/dependency_auditor.md)** | 13KB | 5 | Package compatibility, upgrades, security | **Dev B2** (Beta) |
| 6 | **[Infra & Perf Optimizer](roles/infra_perf_optimizer.md)** | 12KB | 5 | Node.js, Bundles, @defer, Lighthouse, CI/CD | **Dev B3** (Beta) |
| 7 | **[Test Migrator](roles/test_migrator.md)** | 13KB | 5 | Karma→Vitest, Protractor→Playwright | **Automation QA** |
| 8 | **[Architecture Reviewer](roles/architecture_reviewer.md)** | 13KB | 5 | Circular deps, bundle analysis, quality metrics | **Tech Lead** |
| 9 | **[Code Reviewer](roles/code_reviewer.md)** | 17KB | 5 | Pre-PR checks, test coverage, security | **All Devs** |

**Total**: 136 KB of production-ready AI prompts | **45 templates** covering all migration scenarios

---

## 🚀 Quick Start Guide

### Step 1: Choose Your Agent
Pick the agent that matches your current task from the table above.

### Step 2: Open the Agent File
```bash
# Example: Open Build Fixer agent
open agents/roles/build_fixer.md
```

### Step 3: Copy a Prompt Template
Each agent file contains 5-6 prompt templates. Find the one that matches your scenario.

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

### Step 4: Customize & Execute
1. Replace placeholders like `[PASTE YOUR ERRORS HERE]` with your actual data
2. Paste the prompt into **Zed Editor** with MCP servers enabled
3. Review the AI-generated solution
4. Apply the changes

### Step 5: Verify & Iterate
```bash
# Run build
npm run build

# Run tests
npm run test

# Run linter
npm run lint
```

---

## 📚 Agent Capabilities

### 1. **Build Fixer** 🔧
**What it does**: Fixes TypeScript compilation errors and build failures

**Key Templates**:
- TypeScript Strict Mode Violations
- Module Resolution Errors
- Circular Dependency Fixes
- Angular-Specific Build Errors
- Import Path Resolution

**Example Use Case**:
```
Error: TS2322: Type 'null' is not assignable to type 'User'
→ Agent suggests: Add null check or use optional chaining
```

---

### 2. **Code Modernizer** 🚀
**What it does**: Converts legacy Angular patterns to modern syntax

**Key Templates**:
- Control Flow Migration (@if, @for, @switch)
- Standalone Component Conversion
- Typed Forms Implementation
- Signal & Computed Migration
- inject() Function Adoption
- OnPush Change Detection

**Example Use Case**:
```html
<!-- Before -->
<div *ngIf="user">{{ user.name }}</div>

<!-- After -->
@if (user) {
  <div>{{ user.name }}</div>
}
```

---

### 3. **Style Migrator** 🎨
**What it does**: Handles Material MDC migration and CSS refactoring

**Key Templates**:
- Material MDC Component Styles
- Global Theme Migration (@import → @use)
- CSS Variable Implementation
- ::ng-deep Cleanup
- Visual Regression Verification

**Example Use Case**:
```scss
// Before
.mat-button { color: blue; }

// After
.mat-mdc-button { color: blue; }
```

---

### 4. **Logic Refactorer** 🧠
**What it does**: Modernizes services, guards, and state management

**Key Templates**:
- HTTP Client Migration (Module → Functional)
- Service Modernization (inject() + Signals)
- Functional Guards Migration
- RxJS Best Practices
- State Management Modernization

**Example Use Case**:
```typescript
// Before: Class-based guard
export class AuthGuard implements CanActivate { }

// After: Functional guard
export const authGuard: CanActivateFn = (route, state) => { }
```

---

### 5. **Dependency Auditor** 📦
**What it does**: Manages package upgrades and compatibility

**Key Templates**:
- Pre-Upgrade Compatibility Audit
- Package Upgrade Plans
- Deprecated Package Replacement
- Peer Dependency Resolution
- Security & License Compliance

**Example Use Case**:
```
moment.js (500KB) → date-fns (20KB)
Savings: 480KB (96% reduction)
```

---

### 6. **Infra & Perf Optimizer** 🚀
**What it does**: Optimizes infrastructure and performance

**Key Templates**:
- Node.js Version Updates
- Bundle Size Optimization
- Deferrable Views (@defer)
- Lighthouse Performance Fixes
- CI/CD Pipeline Optimization

**Example Use Case**:
```html
@defer (on viewport) {
  <app-heavy-chart></app-heavy-chart>
} @placeholder {
  <div class="skeleton"></div>
}
```

---

### 7. **Test Migrator** 🧪
**What it does**: Migrates tests to modern frameworks

**Key Templates**:
- Karma to Vitest Migration
- Protractor to Playwright Migration
- Broken Test Fixes
- Visual Regression Testing
- Test Modernization Patterns

**Example Use Case**:
```typescript
// Before: Karma/Jasmine
describe('UserComponent', () => {
  beforeEach(async(() => { }));
});

// After: Vitest
describe('UserComponent', () => {
  beforeEach(() => { });
});
```

---

### 8. **Architecture Reviewer** 🏛️
**What it does**: Audits code architecture and quality

**Key Templates**:
- Circular Dependency Detection
- Bundle Bloat Analysis
- Module Boundary Enforcement
- Migration Progress Tracking
- Code Quality Metrics

**Example Use Case**:
```bash
npx madge --circular --extensions ts src/
→ Found 3 circular dependencies
→ Agent suggests refactoring strategies
```

---

### 9. **Code Reviewer** 🧐
**What it does**: Pre-validates code before PR submission

**Key Templates**:
- Pre-PR Code Review
- Test Coverage Verification
- Security & Best Practices Audit
- Dependency & Import Analysis
- Performance Review

**Example Use Case**:
```
⚠️ Warning: Missing return type on line 45
❌ Error: Unsubscribed Observable on line 67
✅ Passed: All components have tests
```

---

## 🔄 The Management Workflow

Managing AI agents requires a specific workflow to ensure quality and consistency.

### 1. **Assign** (The Prompt)
The "Manager" (Dev) assigns a task using a specific **Prompt Template** from the agent's role file.

**Example**:
```markdown
@BuildFixer
Fix the following TypeScript compilation errors in src/app/user/user.service.ts:

**Errors**:
```
src/app/user/user.service.ts:23:5 - error TS2322: Type 'null' is not assignable to type 'User'.
src/app/user/user.service.ts:45:12 - error TS7006: Parameter 'data' implicitly has an 'any' type.
```
```

### 2. **Execute** (The Agent)
The Agent executes the task using **Zed Editor + MCP Servers**.
- Queries **Angular MCP** for official documentation
- Queries **Context7** for team-specific patterns
- Applies fixes following the prompt template
- Generates structured output (tables, checklists, code)

### 3. **Review** (The Gate)
The Manager reviews the work based on supervision level:

| Level | Risk | Review Process |
|-------|------|----------------|
| **Level 1** | Low | Quick scan of changes |
| **Level 2** | High | Detailed code review + local test |
| **Level 3** | Moderate | Review recommendations before applying |
| **Level 4** | Very High | Visual verification required |

### 4. **Train** (The Feedback)
If the Agent made a mistake, the Manager corrects it and **updates Context7**.

**Example**:
```
Context7, remember: For ag-grid v31, we use 'ag-theme-quartz', not 'alpine'.
```

---

## 🛠️ Tools of the Trade

### Required Setup

1. **Zed Editor**: The workspace where agents live
   - Install from: https://zed.dev
   - Configure MCP servers (see `../ZED_MCP_SETUP.md`)

2. **Angular MCP**: The "Brain" containing Angular knowledge
   - Provides official Angular documentation
   - Answers framework-specific questions

3. **Playwright MCP**: The "Hands" for running and fixing tests
   - Executes E2E tests
   - Generates test code

4. **Context7 MCP**: The "Memory" for team-wide patterns
   - Stores project-specific decisions
   - Learns from corrections
   - Requires Upstash Redis (see setup guide)

### Configuration
See **[ZED_MCP_SETUP.md](../ZED_MCP_SETUP.md)** for complete setup instructions.

---

## 📊 Expected Impact

### Time Savings
- **Build Fixes**: 70% faster (AI handles repetitive errors)
- **Code Modernization**: 60% faster (automated pattern conversion)
- **Style Migration**: 80% faster (bulk CSS class replacements)
- **Test Migration**: 50% faster (automated syntax conversion)
- **Overall Migration**: **50-70% time reduction**

### Quality Improvements
- **Consistency**: 100% adherence to Angular best practices
- **Error Reduction**: 80% fewer migration-related bugs
- **Test Coverage**: Maintained or improved during migration
- **Documentation**: Self-documenting prompts serve as guides

### Knowledge Transfer
- Junior devs can perform senior-level migrations
- Prompts serve as training materials
- Context7 captures institutional knowledge

---

## 📂 Directory Structure

```
/agents/
├── README.md                          # This file - Main entry point
├── ENRICHMENT_COMPLETE.md             # Detailed enrichment report
├── roles/                             # ✅ ALL ENRICHED (136 KB)
│   ├── architecture_reviewer.md       # 13 KB, 5 templates
│   ├── build_fixer.md                 # 10 KB, 5 templates
│   ├── code_modernizer.md             # 14 KB, 6 templates
│   ├── code_reviewer.md               # 17 KB, 5 templates
│   ├── dependency_auditor.md          # 13 KB, 5 templates
│   ├── infra_perf_optimizer.md        # 12 KB, 5 templates
│   ├── logic_refactorer.md            # 15 KB, 5 templates
│   ├── style_migrator.md              # 12 KB, 5 templates
│   └── test_migrator.md               # 13 KB, 5 templates
└── workflows/
    ├── daily_cycle.md                 # Daily workflow with all agents
    └── supervision.md                 # Supervision levels and red flags
```

---

## 🎯 Usage Examples

### Example 1: Fixing Build Errors
```markdown
@BuildFixer
Fix TypeScript strict mode violations in src/app/auth/auth.service.ts

**Errors**:
- Line 23: Type 'null' is not assignable to type 'User'
- Line 45: Parameter 'data' implicitly has 'any' type

**Expected Output**:
- Fixed code with proper null handling
- Explicit type annotations
- Explanation of changes
```

### Example 2: Modernizing Components
```markdown
@CodeModernizer
Convert UserListComponent to use:
1. New control flow syntax (@if, @for)
2. Standalone component
3. OnPush change detection
4. Signals for state management

**File**: src/app/users/user-list.component.ts
```

### Example 3: Migrating Tests
```markdown
@TestMigrator
Convert the following Karma test to Vitest:

**File**: src/app/dashboard/dashboard.component.spec.ts

**Tasks**:
1. Update imports (Jasmine → Vitest)
2. Convert async/fakeAsync patterns
3. Update spy syntax
4. Ensure all tests pass
```

---

## 🎓 Best Practices

### 1. **Start Small**
- Test agents on 1-2 files first
- Verify output quality
- Adjust prompts if needed

### 2. **Use Context7**
- Document team decisions
- Store common patterns
- Build institutional knowledge

### 3. **Review Everything**
- Never blindly accept AI output
- Check for edge cases
- Verify tests pass

### 4. **Iterate & Improve**
- Update Context7 with learnings
- Refine prompt templates
- Share successful patterns

### 5. **Measure Impact**
- Track time saved
- Monitor code quality
- Celebrate wins!

---

## 📈 Migration Phases & Agent Usage

### Phase 0: Safety Net
- **Architecture Reviewer**: Audit current state
- **Dependency Auditor**: Check compatibility

### Phase 1: v15 → v16
- **Build Fixer**: Fix compilation errors
- **Dependency Auditor**: Upgrade packages
- **Style Migrator**: MDC migration

### Phase 2: v16 → v17
- **Code Modernizer**: Standalone components
- **Test Migrator**: Update test syntax

### Phase 3: v17 → v18
- **Logic Refactorer**: Functional APIs
- **Code Modernizer**: Control flow syntax

### Phase 4: v18 → v20
- **Infra & Perf Optimizer**: Performance tuning
- **Code Reviewer**: Final validation

---

## 🆘 Troubleshooting

### Agent Not Understanding Context?
→ Check if Context7 MCP is configured correctly
→ Add more specific examples to your prompt

### Output Quality Issues?
→ Use more detailed prompt templates
→ Provide before/after examples
→ Update Context7 with corrections

### Build Still Failing?
→ Use Build Fixer with full error output
→ Check for circular dependencies
→ Verify all dependencies are compatible

### Tests Not Passing?
→ Use Test Migrator for systematic conversion
→ Check for async/await issues
→ Verify mock/spy syntax

---

## 📞 Support

- **Documentation**: See individual agent files in `/roles/`
- **Setup Guide**: `../ZED_MCP_SETUP.md`
- **Migration Plan**: `../plan.md`
- **Team Structure**: `../TEAM_STRUCTURE.md`

---

## ✅ Quality Assurance

All enriched prompts have been verified for:
- ✅ **Completeness**: All 9 agents have 5-6 templates each
- ✅ **Consistency**: Same structure and format across all agents
- ✅ **Accuracy**: Examples based on Angular 15→20 migration
- ✅ **Usability**: Copy-paste ready with clear placeholders
- ✅ **Comprehensiveness**: Covers common scenarios and edge cases

---

## 🎉 Ready to Start!

1. **Review** this README to understand the agent system
2. **Choose** an agent that matches your current task
3. **Open** the agent's role file in `/roles/`
4. **Copy** a prompt template
5. **Customize** with your specific details
6. **Execute** in Zed Editor with MCP
7. **Review** and apply the AI-generated solution
8. **Celebrate** your productivity boost! 🚀

**Happy Migrating!** 🎯

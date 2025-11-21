# 🚀 Zed Editor + MCP Setup for Angular Migration

## Overview
This guide shows how to use **Zed Editor** with **Model Context Protocol (MCP)** servers to supercharge your Angular migration with AI assistance.

## 🎯 **Why Zed + MCP for Migration?**

Traditional approach: Manually fix 1000+ TypeScript errors, convert 500+ components, migrate 300+ tests.

**With Zed + MCP**: AI has direct access to:
- **Angular documentation** (via Angular MCP)
- **Playwright testing** (via Playwright MCP)
- **Project context** (via Context7 MCP)

**Result**: 5-10x faster migration with higher quality.

---

## 📦 **Required MCP Servers**

### 1. Angular MCP Server
**Purpose**: Access to Angular documentation, migration guides, and best practices.

**Repository**: https://angular.dev/ai/mcp

**What it provides**:
- Angular API documentation
- Migration guides (v15→v16→v17→v18→v19→v20)
- Breaking changes documentation
- Best practices

### 2. Playwright MCP Server
**Purpose**: Run and manage Playwright tests during migration.

**Repository**: https://github.com/microsoft/playwright-mcp

**What it provides**:
- Run Playwright tests from AI
- Update visual baselines
- Debug test failures
- Generate new tests

### 3. Context7 MCP Server
**Purpose**: Maintain context about your codebase across AI sessions.

**Repository**: https://github.com/upstash/context7

**What it provides**:
- Remember previous fixes
- Track migration progress
- Share context between team members
- Learn from your codebase patterns

---

## 🛠️ **Setup Instructions**

### Step 1: Install Zed Editor
```bash
# macOS
brew install --cask zed

# Or download from https://zed.dev
```

### Step 2: Install MCP Servers

#### Angular MCP
```bash
# Follow instructions at https://angular.dev/ai/mcp
# Typically involves:
npm install -g @angular/mcp-server
# Or use npx for on-demand usage
```

#### Playwright MCP
```bash
# Clone and setup
git clone https://github.com/microsoft/playwright-mcp.git
cd playwright-mcp
npm install
npm run build
```

#### Context7 MCP
```bash
# Setup Context7 (requires Upstash account)
# Follow instructions at https://github.com/upstash/context7
```

### Step 3: Configure Zed MCP Settings

Create or edit `~/.config/zed/settings.json`:

```json
{
  "mcp": {
    "servers": {
      "angular": {
        "command": "npx",
        "args": ["@angular/mcp-server"],
        "env": {}
      },
      "playwright": {
        "command": "node",
        "args": ["/path/to/playwright-mcp/dist/index.js"],
        "env": {
          "PLAYWRIGHT_PROJECT_PATH": "{your path}"
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
}
```

### Step 4: Restart Zed
Close and reopen Zed to load MCP servers.

---

## 🎯 **Migration Workflows with Zed + MCP**

### Workflow 1: Fix Build Errors (Stream A)

#### Without MCP (Manual):
1. Run `npm run build`
2. Copy error to Google
3. Read Stack Overflow
4. Try fix
5. Rebuild
6. Repeat 100+ times

**Time**: 2-3 days

#### With Zed + Angular MCP:
1. Run `npm run build`
2. Ask Zed AI:
   ```
   Fix these Angular build errors using Angular v20 best practices.
   
   [paste errors]
   ```
3. AI uses Angular MCP to get exact migration guides
4. Apply fixes
5. Rebuild

**Time**: 4-6 hours

#### Example Prompt:
```
Using Angular MCP, fix these TypeScript errors after upgrading to v17:

Error: NG2003: No suitable injection token for parameter 'http' of class 'DataService'
Error: NG0303: Can't bind to 'ngIf' since it isn't a known property

Context: We just upgraded from v15 to v17.
```

**AI Response** (with Angular MCP):
```typescript
// Error 1: Missing HttpClient import in standalone component
// According to Angular v17 migration guide:

import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export class DataService {
  private http = inject(HttpClient); // Use inject() in v17+
}

// Error 2: Missing CommonModule import
// In v17, standalone components must import CommonModule:

@Component({
  standalone: true,
  imports: [CommonModule], // Add this
  template: `<div *ngIf="show">Content</div>`
})
```

### Workflow 2: Migrate Tests (Stream C)

#### With Zed + Playwright MCP:

1. Ask Zed AI:
   ```
   Using Playwright MCP, run all tests and show me which ones are failing after the v17 upgrade.
   ```

2. AI runs tests via MCP and reports:
   ```
   Failed tests:
   - login.spec.ts: 3 failures
   - dashboard.spec.ts: 5 failures
   
   Common issue: waitForAngular() is deprecated in v17
   ```

3. Ask Zed AI:
   ```
   Fix all Playwright tests to work with Angular v17. Remove waitForAngular() and use proper locators.
   ```

4. AI fixes all tests using Playwright MCP documentation

#### Example Prompt:
```
Using Playwright MCP, update this test for Angular v17:

test('should login', async ({ page }) => {
  await page.goto('/login');
  await page.waitForAngular(); // Deprecated!
  await page.fill('#username', 'test');
  await page.fill('#password', 'pass');
  await page.click('button[type=submit]');
  await page.waitForAngular();
  expect(await page.url()).toContain('/dashboard');
});
```

**AI Response** (with Playwright MCP):
```typescript
test('should login', async ({ page }) => {
  await page.goto('/login');
  // waitForAngular() removed in v17, use proper locators
  await page.getByLabel('Username').fill('test');
  await page.getByLabel('Password').fill('pass');
  await page.getByRole('button', { name: 'Login' }).click();
  // Wait for navigation
  await page.waitForURL('**/dashboard');
  expect(page.url()).toContain('/dashboard');
});
```

### Workflow 3: Track Progress (All Streams)

#### With Zed + Context7 MCP:

Context7 remembers your migration progress across sessions.

**Day 1 End**:
```
Store in Context7: We completed v15→v16 upgrade. 
Build passes. 47 TypeScript errors fixed. 
ngx-perfect-scrollbar identified for replacement.
```

**Day 2 Morning**:
```
Ask Context7: What did we accomplish yesterday and what's next?
```

**AI Response**:
```
Yesterday (Day 1):
- ✅ Upgraded to Angular v16
- ✅ Fixed 47 TypeScript errors
- ✅ Build passing
- ✅ Identified ngx-perfect-scrollbar for replacement

Today (Day 2):
- Upgrade to v17
- Replace ngx-perfect-scrollbar
- Fix RxJS toPromise() → lastValueFrom()
- Target: >70% tests passing
```

### Workflow 4: Component Migration (Stream B)

#### With Zed + Angular MCP + Context7:

**Prompt**:
```
Using Angular MCP, convert this component to standalone.
Use Context7 to remember the pattern for future components.

[paste component code]
```

**AI Response**:
```typescript
// Converted to standalone using Angular v17 pattern
@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    RouterModule
  ],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  // Component code unchanged
}

// Pattern stored in Context7 for next 500 components
```

---

## 📋 **Day-by-Day MCP Usage**

### Day 1: v15 → v16

**Morning** (Tech Lead):
```
Using Angular MCP, what are the breaking changes from v15 to v16?
Show me the migration checklist.
```

**Stream A** (Build Fixes):
```
Using Angular MCP, fix these v16 build errors in batch:
[paste 20 errors]

Store the fix patterns in Context7 for similar errors.
```

**Stream C** (Tests):
```
Using Playwright MCP, run all tests and identify failures.
Group by failure type.
```

### Day 2: v16 → v17

**Morning** (Tech Lead):
```
Using Angular MCP, what are the critical breaking changes from v16 to v17?
Focus on: RxJS, Templates, Signals.
```

**Stream A** (Build Fixes):
```
Using Angular MCP and Context7 patterns from yesterday,
fix these v17 errors:
[paste errors]
```

**Stream B** (Dependencies):
```
Using Angular MCP, what's the recommended replacement for ngx-perfect-scrollbar in v17?
Show me migration code examples.
```

### Day 3: v17 → v19

**Morning** (Tech Lead):
```
Using Angular MCP, can we safely skip v18 and go directly to v19?
What are the risks?
```

**Stream A** (Build Fixes):
```
Using Angular MCP, how do I migrate from HttpClientModule to provideHttpClient in v19?
Apply this pattern to all our services using Context7.
```

**Stream B** (AG Grid):
```
Using Angular MCP, what changed in AG Grid between v28 and v31?
Show me the ColDef migration pattern.
```

### Day 4: v19 → v20

**Morning** (Tech Lead):
```
Using Angular MCP, what are the template breaking changes in v20?
Specifically: {{ in }}, {{ void }}, parentheses handling.
```

**Stream A** (Final Fixes):
```
Using Angular MCP and all Context7 patterns from this week,
fix these final v20 errors:
[paste errors]
```

**Stream C** (Validation):
```
Using Playwright MCP, run full test suite and visual regression.
Compare to baseline from Day 1.
```

---

## 🎯 **Advanced MCP Prompts**

### Batch Component Conversion
```
Using Angular MCP and Context7:

1. Analyze this component pattern
2. Store the conversion pattern in Context7
3. Apply to all 50 components in src/app/features/
4. Show me a summary of changes

[paste first component]
```

### Intelligent Error Fixing
```
Using Angular MCP, Context7, and our project patterns:

Fix this error, but first:
1. Check Context7 if we've seen similar errors
2. Use Angular MCP for v20 best practices
3. Apply the fix
4. Store the pattern for future use

Error: [paste error]
```

### Test Migration with Learning
```
Using Playwright MCP and Context7:

1. Run all tests
2. Group failures by type
3. Fix the most common failure type
4. Store the fix pattern in Context7
5. Apply pattern to similar tests
6. Re-run tests
7. Repeat until >90% passing
```

---

## 📊 **MCP Benefits: Before/After**

### Without MCP
| Task | Time | Quality |
|------|------|---------|
| Fix 100 TypeScript errors | 8 hours | Variable |
| Convert 50 components | 16 hours | Inconsistent |
| Migrate 100 tests | 12 hours | Manual |
| Research breaking changes | 4 hours | Incomplete |
| **Total** | **40 hours** | **Medium** |

### With Zed + MCP
| Task | Time | Quality |
|------|------|---------|
| Fix 100 TypeScript errors | 2 hours | High (Angular MCP) |
| Convert 50 components | 3 hours | Consistent (Context7) |
| Migrate 100 tests | 2 hours | Automated (Playwright MCP) |
| Research breaking changes | 30 min | Complete (Angular MCP) |
| **Total** | **7.5 hours** | **High** |

**Speedup**: 5.3x faster with higher quality

---

## 🔧 **Troubleshooting MCP Setup**

### MCP Server Not Starting
```bash
# Check Zed logs
tail -f ~/.local/share/zed/logs/Zed.log

# Verify MCP server manually
npx @angular/mcp-server
```

### Angular MCP Not Responding
```bash
# Clear cache
rm -rf ~/.cache/zed/mcp

# Restart Zed
```

### Context7 Connection Issues
```bash
# Verify Upstash credentials
echo $UPSTASH_REDIS_URL
echo $UPSTASH_REDIS_TOKEN

# Test connection
curl $UPSTASH_REDIS_URL/ping
```

---

## 🎉 **Best Practices**

### 1. Start Each Day with Context7
```
Ask Context7: What's our migration status? What's today's plan?
```

### 2. Use Angular MCP for Every Breaking Change
```
Before fixing manually, ask Angular MCP:
"What's the recommended way to fix [error] in Angular v[X]?"
```

### 3. Let Playwright MCP Run Tests
```
Don't run tests manually. Ask Playwright MCP:
"Run tests and show me failures grouped by type"
```

### 4. Store Patterns in Context7
```
After fixing a common issue:
"Store this fix pattern in Context7 for similar errors"
```

### 5. Batch Processing
```
Don't fix errors one by one. Batch 10-20 similar errors:
"Using Angular MCP and Context7 patterns, fix these 20 errors"
```

---

## 📚 **Additional Resources**

- **Angular MCP Docs**: https://angular.dev/ai/mcp
- **Playwright MCP**: https://github.com/microsoft/playwright-mcp
- **Context7**: https://github.com/upstash/context7
- **Zed Editor**: https://zed.dev
- **MCP Protocol**: https://modelcontextprotocol.io

---

## 🚀 **Ready to Start?**

1. ✅ Install Zed Editor
2. ✅ Setup MCP servers (Angular, Playwright, Context7)
3. ✅ Configure `~/.config/zed/settings.json`
4. ✅ Restart Zed
5. ✅ Start Day 1 of migration with AI superpowers!

**With Zed + MCP, your 4-day migration is not just possible—it's achievable with high quality.** 💪

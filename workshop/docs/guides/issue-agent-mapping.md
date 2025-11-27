# 🔍 Issue-Agent Mapping: Comprehensive Reference

**Purpose**: Quick reference table mapping common migration issues to teams and agents that can solve them.

> **How to Use**: When you encounter an issue, find it in this table, identify the team/agent, then use the agent's prompt templates from `../../agents/roles/[agent-name].md`

---

## 📊 Issue-Agent Mapping Table

| Issue Category | Specific Issue | Team | Sub-Team | Agent | When It Occurs | Priority |
|----------------|----------------|------|----------|-------|----------------|----------|
| **Build Errors** | TypeScript compilation errors (TS2322, TS2339, etc.) | Dev | Alpha A1 | `@BuildFixer` | After any Angular upgrade | 🔴 Critical |
| **Build Errors** | Module resolution errors (TS2307) | Dev | Alpha A1 | `@BuildFixer` | After any Angular upgrade | 🔴 Critical |
| **Build Errors** | Import path errors | Dev | Alpha A1 | `@BuildFixer` | After any Angular upgrade | 🔴 Critical |
| **Build Errors** | Strict null check violations | Dev | Alpha A1 | `@BuildFixer` | After enabling strict mode | 🟡 Medium |
| **Build Errors** | Circular dependency errors | Dev | Lead | `@ArchitectureReviewer` | Anytime | 🟡 Medium |
| **Build Errors** | Angular.json schema validation errors | Dev | Alpha A1 | `@BuildFixer` | After CLI upgrade | 🔴 Critical |
| **Build Errors** | Configuration format errors (polyfills, etc.) | Dev | Alpha A1 | `@BuildFixer` | Version-specific | 🔴 Critical |
| **Build Errors** | Polyfills configuration format (string vs array) | Dev | Alpha A1 | `@BuildFixer` | v14-v15 | 🔴 Critical |
| **Build Errors** | Template expression errors (arrow functions in templates) | Dev | Alpha A2 | `@CodeModernizer` | After any upgrade | 🔴 Critical |
| **Build Errors** | Webpack module resolution errors | Dev | Alpha A1 | `@BuildFixer` | After any upgrade | 🔴 Critical |
| **Material Issues** | MatLegacy imports (must remove before v17) | Dev | Alpha A2 | `@StyleMigrator` | v15-v16 | 🔴 Critical |
| **Material Issues** | Material MDC migration (class name changes) | Dev | Alpha A2 | `@StyleMigrator` | v15-v16 | 🔴 Critical |
| **Material Issues** | Material theme migration | Dev | Alpha A2 | `@StyleMigrator` | v15-v16 | 🟡 Medium |
| **Material Issues** | Material component styling broken | Dev | Alpha A2 | `@StyleMigrator` | After Material upgrade | 🔴 Critical |
| **Component Issues** | Missing module imports (third-party modules) | Dev | Alpha A2 | `@CodeModernizer` | After any upgrade | 🔴 Critical |
| **Component Issues** | Template expression errors (`{{ in }}` → `{{ this.in }}`) | Dev | Alpha A2 | `@CodeModernizer` | v20 | 🔴 Critical |
| **Component Issues** | Component not rendering after upgrade | Dev | Alpha A2 | `@CodeModernizer` | After any upgrade | 🔴 Critical |
| **Component Issues** | Component lifecycle issues | Dev | Alpha A2 | `@CodeModernizer` | After any upgrade | 🟡 Medium |
| **Component Issues** | Location.back() API issue (use Router instead) | Dev | Beta B1 | `@LogicRefactorer` | After any upgrade | 🟡 Medium |
| **HTTP/Services** | `HttpClientModule` → `provideHttpClient` migration | Dev | Beta B1 | `@LogicRefactorer` | v17+ | 🔴 Critical |
| **HTTP/Services** | `toPromise()` → `lastValueFrom()` migration | Dev | Beta B1 | `@LogicRefactorer` | v17 | 🔴 Critical |
| **HTTP/Services** | Service injection errors | Dev | Beta B1 | `@LogicRefactorer` | After any upgrade | 🔴 Critical |
| **HTTP/Services** | Interceptor not working | Dev | Beta B1 | `@LogicRefactorer` | After HTTP migration | 🔴 Critical |
| **HTTP/Services** | Guard migration (class → functional) | Dev | Beta B1 | `@LogicRefactorer` | v16+ | 🟡 Medium |
| **HTTP/Services** | RxJS operator deprecations | Dev | Beta B1 | `@LogicRefactorer` | After RxJS upgrade | 🟡 Medium |
| **Dependencies** | Package compatibility check | Dev | Beta B2 | `@DependencyAuditor` | Before any upgrade | 🔴 Critical |
| **Dependencies** | `ngx-perfect-scrollbar` replacement | Dev | Beta B2 | `@DependencyAuditor` | v15-v17 | 🔴 Critical |
| **Dependencies** | AG Grid upgrade (v28 → v31) | Dev | Alpha A3 | `@StyleMigrator` | v17-v19 | 🔴 Critical |
| **Dependencies** | AG Grid API changes (columnState, columnGroupState) | Dev | Alpha A3 | `@StyleMigrator` | v28+ | 🔴 Critical |
| **Dependencies** | AG Grid CSS theme migration (alpine → quartz) | Dev | Alpha A3 | `@StyleMigrator` | v31+ | 🔴 Critical |
| **Dependencies** | Highcharts upgrade (v9 → v11) | Dev | Beta B2 | `@DependencyAuditor` | v17+ | 🟡 Medium |
| **Dependencies** | highcharts-angular compatibility (v3.1.2 incompatible with v14) | Dev | Beta B2 | `@DependencyAuditor` | v14-v15 | 🔴 Critical |
| **Dependencies** | View Engine libraries warning (ngx-perfect-scrollbar, ng-in-viewport) | Dev | Beta B2 | `@DependencyAuditor` | v15-v17 | 🟡 Medium |
| **Dependencies** | CommonJS dependencies warning (moment, lodash) | Dev | Beta B2 | `@DependencyAuditor` | After npm install | 🟡 Medium |
| **Dependencies** | Peer dependency warnings | Dev | Beta B2 | `@DependencyAuditor` | After npm install | 🟡 Medium |
| **Dependencies** | Deprecated package identification | Dev | Beta B2 | `@DependencyAuditor` | Before upgrade | 🔴 Critical |
| **Dependencies** | Security vulnerabilities (`npm audit`) | Dev | Beta B2 | `@DependencyAuditor` | Day 4 | 🟡 Medium |
| **Infrastructure** | Node.js version update (18 → 20) | Dev | Beta B3 | `@InfraPerfOptimizer` | v17+ | 🔴 Critical |
| **Infrastructure** | Dockerfile update | Dev | Beta B3 | `@InfraPerfOptimizer` | Node.js upgrade | 🔴 Critical |
| **Infrastructure** | CI/CD pipeline update (Azure Pipelines) | Dev | Beta B3 | `@InfraPerfOptimizer` | Node.js upgrade | 🔴 Critical |
| **Infrastructure** | Build optimization (bundle size) | Dev | Beta B3 | `@InfraPerfOptimizer` | Post-migration | 🟢 Low |
| **Infrastructure** | Performance optimization (`@defer`) | Dev | Beta B3 | `@InfraPerfOptimizer` | Post-migration | 🟢 Low |
| **Infrastructure** | Lighthouse performance issues | Dev | Beta B3 | `@InfraPerfOptimizer` | Post-migration | 🟢 Low |
| **Unit Tests** | Karma → Vitest migration | AQA | AQA 1 | `@UnitTestMigrator` | Anytime (independent) | 🟡 Medium |
| **Unit Tests** | Test broken after upgrade | AQA | AQA 1 | `@UnitTestMigrator` | After any upgrade | 🔴 Critical |
| **Unit Tests** | TestBed configuration errors | AQA | AQA 1 | `@UnitTestMigrator` | After Angular upgrade | 🔴 Critical |
| **Unit Tests** | Test spy/mock syntax errors | AQA | AQA 1 | `@UnitTestMigrator` | After test framework upgrade | 🟡 Medium |
| **Unit Tests** | Test coverage analysis | AQA | AQA 1 | `@UnitTestMigrator` | Anytime | 🟢 Low |
| **Unit Tests** | Async test patterns (`async`, `fakeAsync`) | AQA | AQA 1 | `@UnitTestMigrator` | After Angular upgrade | 🟡 Medium |
| **E2E Tests** | Protractor → Playwright migration | AQA | AQA 2 | `@E2ETestMigrator` | Anytime (independent) | 🟡 Medium |
| **E2E Tests** | Playwright installation method (`npm init` vs `npm install`) | AQA | AQA 2 | `@E2ETestMigrator` | Day 0/Day 1 | 🔴 Critical |
| **E2E Tests** | E2E test broken after upgrade | AQA | AQA 2 | `@E2ETestMigrator` | After any upgrade | 🔴 Critical |
| **E2E Tests** | Selector not found (element changed) | AQA | AQA 2 | `@E2ETestMigrator` | After component changes | 🔴 Critical |
| **E2E Tests** | Visual regression failures | AQA | AQA 2 | `@E2ETestMigrator` | After styling changes | 🟡 Medium |
| **E2E Tests** | Playwright baseline capture | AQA | AQA 2 | `@E2ETestMigrator` | Day 1 | 🔴 Critical |
| **E2E Tests** | `waitForAngular()` deprecation | AQA | AQA 2 | `@E2ETestMigrator` | v17+ | 🔴 Critical |
| **Code Quality** | Circular dependency detection | Dev | Lead | `@ArchitectureReviewer` | Anytime | 🟡 Medium |
| **Code Quality** | Bundle bloat analysis | Dev | Lead | `@ArchitectureReviewer` | Post-migration | 🟢 Low |
| **Code Quality** | Code review before PR | Dev | All | `@CodeReviewer` | Before merge | 🔴 Critical |
| **Code Quality** | Security audit | Dev | All | `@CodeReviewer` | Before merge | 🟡 Medium |
| **Code Quality** | Test coverage verification | Dev | All | `@CodeReviewer` | Before merge | 🟡 Medium |
| **Version Issues** | Angular version mismatch | Dev | Lead | `@BuildFixer` | Before upgrade | 🔴 Critical |
| **Version Issues** | Node.js version mismatch | Dev | Beta B3 | `@InfraPerfOptimizer` | Before upgrade | 🔴 Critical |
| **Version Issues** | Git repository not clean | Dev | Lead | - | Before upgrade | 🔴 Critical |
| **Version Issues** | Current build doesn't pass | Dev | Alpha A1 | `@BuildFixer` | Before upgrade | 🔴 Critical |

---

## 🎯 Quick Reference by Team

### Dev Team Lead
| Agent | Issues Solved |
|-------|---------------|
| `@ArchitectureReviewer` | Circular dependencies, bundle analysis, code quality metrics |
| `@CodeReviewer` | Pre-PR checks, security, test coverage verification |

### Dev Sub-Team Alpha (Frontend)
| Team Member | Agent | Primary Issues |
|--------------|-------|----------------|
| **Dev A1** | `@BuildFixer` | TypeScript errors, build failures, import errors, strict mode |
| **Dev A2** | `@CodeModernizer` | Component migration, control flow, standalone, template errors |
| **Dev A2** | `@StyleMigrator` | Material MDC migration, Material styling, CSS/SCSS updates |
| **Dev A3** | `@StyleMigrator` | AG Grid migration, UI library styling, Material theming |

### Dev Sub-Team Beta (Backend & Infrastructure)
| Team Member | Agent | Primary Issues |
|--------------|-------|----------------|
| **Dev B1** | `@LogicRefactorer` | HTTP migration, service injection, guards, interceptors, RxJS |
| **Dev B2** | `@DependencyAuditor` | Package compatibility, deprecated packages, peer dependencies, security |
| **Dev B3** | `@InfraPerfOptimizer` | Node.js updates, Docker, CI/CD, build optimization, performance |

### AQA Team (Testing)
| Team Member | Agent | Primary Issues |
|--------------|-------|----------------|
| **AQA 1** | `@UnitTestMigrator` | Karma→Vitest migration, test fixes, TestBed config, test coverage |
| **AQA 2** | `@E2ETestMigrator` | Protractor→Playwright migration, E2E test fixes, visual regression |

---

## 🚨 Critical Issues (Must Fix Before Proceeding)

These issues block migration progress and must be resolved immediately:

| Issue | Agent | Team |
|-------|-------|------|
| Build doesn't compile | `@BuildFixer` | Dev A1 |
| Material MatLegacy imports (blocks v17+) | `@StyleMigrator` | Dev A2 |
| `ngx-perfect-scrollbar` incompatible | `@DependencyAuditor` | Dev B2 |
| HTTP services broken | `@LogicRefactorer` | Dev B1 |
| Node.js version mismatch | `@InfraPerfOptimizer` | Dev B3 |
| Git repository not clean | - | Dev Team Lead |
| Current build doesn't pass | `@BuildFixer` | Dev A1 |

---

## 🟡 Medium Priority Issues (Fix During Migration)

These issues should be fixed during migration but don't block progress:

| Issue | Agent | Team |
|-------|-------|------|
| Test failures (>70% acceptable) | `@UnitTestMigrator`, `@E2ETestMigrator` | AQA |
| Material theme migration | `@StyleMigrator` | Dev A2 |
| Guard migration (class → functional) | `@LogicRefactorer` | Dev B1 |
| Peer dependency warnings | `@DependencyAuditor` | Dev B2 |
| Circular dependencies | `@ArchitectureReviewer` | Dev Team Lead |

---

## 🟢 Low Priority Issues (Defer to Week 2+)

These issues can be deferred until after v20 is stable:

| Issue | Agent | Team |
|-------|-------|------|
| TypeScript strict mode | `@BuildFixer` | Dev A1 |
| Vitest migration | `@UnitTestMigrator` | AQA 1 |
| Bundle optimization | `@InfraPerfOptimizer` | Dev B3 |
| Performance optimization (`@defer`) | `@InfraPerfOptimizer` | Dev B3 |
| Control flow migration (`@if`, `@for`) | `@CodeModernizer` | Dev A2 |

> **Note**: Standalone component migration is NOT needed for hackathon. Components can stay in NgModules.

---

## 📋 Issue Resolution Workflow

### Step 1: Identify the Issue
1. Check error message or symptom
2. Look up issue in this table
3. Identify team and agent

### Step 2: Use the Agent
1. Go to `../../agents/roles/[agent-name].md`
2. Find appropriate prompt template
3. Copy prompt template
4. Customize with your specific issue
5. Use in Zed Editor Agent Panel with MCP servers

### Step 3: Verify Fix
1. Run build/test as appropriate
2. Verify fix doesn't break other things
3. Document fix in Context7 (if using Context7 MCP)

### Step 4: Escalate if Needed
- If agent can't solve: Escalate to Dev Team Lead
- If blocking: Mark as blocker, adjust plan
- If low priority: Defer to Week 2+

---

## 🔄 Common Issue Patterns

### Pattern 1: Build Errors After Upgrade
**Symptoms**: `npm run build` fails with TypeScript errors
**Agent**: `@BuildFixer`
**Team**: Dev A1
**Workflow**:
1. Run `npm run build 2>&1 | tee errors.txt`
2. Copy errors to `@BuildFixer` agent
3. Fix in batches of 20-30 errors
4. Verify build passes after each batch

**Common Causes**:
- Polyfills configuration format (v14 uses string, v15+ may differ)
- Template expression limitations (arrow functions not allowed)
- Module resolution issues (webpack can't find files)
- Missing module imports (third-party modules not imported)

### Pattern 2: Material Components Broken
**Symptoms**: Material components not rendering or styled incorrectly
**Agent**: `@StyleMigrator`
**Team**: Dev A2
**Workflow**:
1. Check for MatLegacy imports
2. Use `@StyleMigrator` to migrate to MDC
3. Update CSS classes
4. Test in browser

### Pattern 3: Tests Broken After Upgrade
**Symptoms**: Test suite fails after Angular upgrade
**Agent**: `@UnitTestMigrator` (unit) or `@E2ETestMigrator` (E2E)
**Team**: AQA 1 or AQA 2
**Workflow**:
1. Run test suite, capture failures
2. Use appropriate agent to fix in batches
3. Focus on critical path tests first
4. Accept >70% pass rate for 4-day migration

### Pattern 4: Dependency Incompatibility
**Symptoms**: `npm install` fails or package incompatible
**Agent**: `@DependencyAuditor`
**Team**: Dev B2
**Workflow**:
1. Run `./scripts/verify_dependencies.sh [version]`
2. Use `@DependencyAuditor` to analyze
3. Identify replacement or upgrade path
4. Test replacement in isolation

### Pattern 5: Infrastructure Issues
**Symptoms**: CI/CD fails, Docker build fails, Node version issues
**Agent**: `@InfraPerfOptimizer`
**Team**: Dev B3
**Workflow**:
1. Verify Node.js version matches Angular requirements
2. Update Dockerfile, CI/CD configs
3. Test locally before pushing
4. Verify CI/CD pipeline passes

### Pattern 6: Polyfills Configuration Error
**Symptoms**: "Data path '/polyfills' must be string" or similar schema validation error
**Agent**: `@BuildFixer`
**Team**: Dev A1
**Root Cause**: Angular v14 requires `polyfills` as string path, format may differ in other versions
**Solution Pattern**:
1. Check Angular version: `npm list @angular/core --depth=0`
2. Create `src/polyfills.ts` if missing
3. Update `angular.json` to correct format for your version
4. Update `tsconfig.app.json` to include polyfills.ts
**Generalizable**: Any configuration format error follows this pattern

### Pattern 7: Template Expression Limitations
**Symptoms**: Template parser errors, "Parser Error", syntax errors in templates
**Agent**: `@CodeModernizer`
**Team**: Dev A2
**Common Scenarios**: Arrow functions in templates, complex expressions, async operations
**Solution Pattern**:
1. Identify complex expression causing parser error
2. Extract to component method
3. Update template to call component method instead
4. Preserve functionality

### Pattern 8: Missing Module Imports
**Symptoms**: "is not a known element" or "Can't bind to 'X' since it isn't a known property"
**Agent**: `@CodeModernizer`
**Team**: Dev A2
**Root Cause**: Third-party modules must be explicitly imported in feature modules
**Solution Pattern**:
1. Verify all third-party modules are imported in feature module
2. Check SharedModule exports
3. Ensure feature modules import required modules

### Pattern 9: Location API Issue
**Symptoms**: `error TS2339: Property 'back' does not exist on type 'Location'`
**Agent**: `@LogicRefactorer`
**Team**: Dev B1
**Root Cause**: `Location.back()` doesn't exist in Angular's Location service
**Solution**: Replace with `Router.navigate()` instead

### Pattern 10: AG Grid API Changes
**Symptoms**: `Property 'columnState' does not exist on type 'GridOptions'`
**Agent**: `@StyleMigrator`
**Team**: Dev A3
**Root Cause**: AG Grid v28+ API changes - state management API differs
**Solution**: Use `GridApi` methods (`applyColumnState`, `applyColumnGroupState`) instead of direct property assignment

### Pattern 11: Playwright Installation Error
**Symptoms**: `error: unknown option '--yes'` when running `npm init playwright@latest --yes`
**Agent**: `@E2ETestMigrator`
**Team**: AQA 2
**Root Cause**: `npm init playwright@latest --yes` flag doesn't exist
**Solution**: Use `npm install --save-dev @playwright/test` followed by `npx playwright install`

### Pattern 12: Highcharts Compatibility
**Symptoms**: `error TS2707: Generic type 'ɵɵComponentDeclaration' requires between 7 and 8 type arguments`
**Agent**: `@DependencyAuditor`
**Team**: Dev B2
**Root Cause**: highcharts-angular v3.1.2 incompatible with Angular 14
**Solution**: Upgrade Angular first, then upgrade highcharts-angular

### Pattern 13: View Engine Libraries Warning
**Symptoms**: Build warning about "Processing legacy View Engine libraries"
**Agent**: `@DependencyAuditor`
**Team**: Dev B2
**Root Cause**: Libraries built with View Engine (pre-Ivy) cause performance issues
**Solution**: Replace deprecated libraries (e.g., `ngx-perfect-scrollbar` → native CSS or `ngx-scrollbar`)

---

## 💡 Agent Usage Tips

1. **Always verify environment first** - Many agents have "Pre-Fix Verification" templates
2. **Work in batches** - Don't try to fix everything at once (20-30 errors per batch)
3. **Use Context7** - Store successful patterns for reuse
4. **Review agent output** - Don't blindly accept AI suggestions
5. **Test after each batch** - Verify fixes don't break other things
6. **Document decisions** - Update `KNOWN_ISSUES.md` with patterns
7. **Check version first** - Always verify actual Angular version (`npm list @angular/core --depth=0`) - may differ from plan assumption
8. **Clear caches** - If module resolution fails, try `rm -rf node_modules .angular dist && npm install`
9. **Pattern-based fixes** - Many issues follow patterns (see Common Issue Patterns above)

---

## 🔍 Diagnostic Commands

### Check Current Angular Version
```bash
npm list @angular/core --depth=0
```

### Verify Polyfills Configuration
```bash
# Check if polyfills.ts exists
ls -la src/polyfills.ts

# Check angular.json
cat angular.json | grep polyfills
```

### Find View Engine Libraries
```bash
npm run build 2>&1 | grep "View Engine"
```

### Check Module Imports
```bash
# Find missing imports
npm run build 2>&1 | grep "is not a known"
```

### Verify Component Files Exist
```bash
find src -name "*.component.ts" | grep -i "status-cell"
```

### Find MatLegacy Imports
```bash
grep -r "MatLegacy" src/
```

### Check for Template Syntax Issues
```bash
# Find arrow functions in templates (may cause parser errors)
grep -r "=>" src/**/*.html
```

---

## 📚 Related Documentation

- **4-Day Migration Plan**: See `4-day-migration-plan.md` for day-by-day tasks
- **Agent Details**: See `../../agents/roles/` for detailed agent prompt templates
- **Setup Guide**: See `../setup/zed-mcp-setup.md` for MCP server configuration
- **Archived References**: See `../history/archived-guides/` for troubleshooting patterns and migration experience notes

---

**Last Updated**: 2025-11-27


# 📘 The Angular Migration Manual (v15 → v20) - Enterprise Edition

**Objective**: Safe, incremental upgrade from Angular 15 to 20.
**Current State**: Angular 15.2.10 (Phase 2 completed)
**Philosophy**: "Safety First, Then Speed." Establish a baseline of truth before breaking the build.

---

>
> **Quick Start Documents**:
> - **[ZED_MCP_SETUP.md](ZED_MCP_SETUP.md)** ← **Setup first!** Zed + MCP for 5x faster migration
> - **[4-DAY-QUICK-REFERENCE.md](4-DAY-QUICK-REFERENCE.md)** ← Day-by-day checklist with AI prompts
> - **[PARALLELIZATION_GUIDE.md](PARALLELIZATION_GUIDE.md)** ← Complete parallelization strategy

### 🚀 **AI-Powered Migration with Zed + MCP**

**New**: Use **Zed Editor** with **Model Context Protocol (MCP)** servers for AI-assisted migration:
- **Angular MCP**: Direct access to Angular docs, migration guides, breaking changes
- **Playwright MCP**: Run and debug tests from AI
- **Context7 MCP**: Remember fixes across sessions, share with team

**Impact**: 5x faster migration with higher quality. See **[ZED_MCP_SETUP.md](ZED_MCP_SETUP.md)** for setup.

### Two Migration Paths

| Path | Duration | Team Size | Approach | Best For |
| :--- | :--- | :--- | :--- | :--- |
| **⚡ Fast Track** | **4 days** | 8 people | Aggressive parallel execution, Zed + MCP AI-heavy, skip modernizations | **Tight deadlines, get to v20 ASAP** |
| **📋 Standard Track** | 3-4 weeks | 8 people | Methodical, includes modernizations (standalone, strict mode, Vitest) | Quality-focused, long-term maintainability |

### Fast Track Key Points (4 Days)
- **Day 0**: Setup Zed + MCP (30 min)
- **Day 1**: v15 → v16 (Foundation + parallel prep)
- **Day 2**: v16 → v17 (Critical dep replacements)
- **Day 3**: v17 → v19 (Double upgrade + AG Grid)
- **Day 4**: v19 → v20 (Final push + deployment)

**What You Get**: Angular 20 running in production, build passing, critical flows working.

**What You Defer**: Standalone components, TypeScript strict mode, control flow migration, Vitest migration.

### Parallelization Strategy
**Maximum Parallelization**: Up to **6 independent streams** working simultaneously across 2 sub-teams:
- **Stream A**: Build fixes (Zed + MCP AI-assisted)
- **Stream B**: Dependency upgrades
- **Stream C**: Test fixes (Zed + MCP AI-assisted)
- **Stream D**: Infrastructure (Node, Docker, CI/CD)
- **Stream E**: Documentation (optional)

**Key Success Factor**: Heavy use of **Zed + MCP** (Angular, Playwright, Context7) for batch fixing TypeScript errors, test migrations, and component conversions.

### Quick Navigation
- **[🚀 Zed + MCP Setup](#zed_mcp_setupmd)** ← **Start here!** Setup AI assistance
- **[🚨 4-Day Fast Track](#-fast-track-4-day-migration-plan-v15--v20)** ← Fast track plan
- **[Phase 0: Safety Net](#️-phase-0-the-safety-net-pre-migration)** ← Playwright baseline (parallel with everything)
- **[Phase 1: Foundation](#-phase-1-the-foundation--audit)** ← Dependency audit (3-5 days, highly parallel)
- **[Phase 3: v15→v17](#-phase-3-the-stability-plateau-v15--v17)** ← Main migration phase (2-3 weeks, 5 parallel streams)
- **[Phase 4: v18→v20](#-phase-4-the-modern-frontier-v18--v20)** ← Final upgrade (1-2 weeks or 2 days fast track)
- **[🛠️ Scripts Toolbox](#️-migration-scripts-toolbox)** ← All automation scripts

---

## 🛠️ Migration Scripts Toolbox

> [!IMPORTANT]
> **All migration scripts are located in `scripts/` directory**. Run `chmod +x scripts/*.sh` to make them executable.

### Quick Reference

| Script | Purpose | Usage |
| :--- | :--- | :--- |
| **`pre_migration_check.sh`** | 🛡️ **Run first!** Comprehensive safety check | `./scripts/pre_migration_check.sh [target]` |
| **`migration_toolbox.sh`** | 🔧 Core migration checks | `./scripts/migration_toolbox.sh check_all` |
| **`migration_status.sh`** | 📊 Generate status report | `./scripts/migration_status.sh` |
| **`backup_before_migration.sh`** | 💾 Create backup | `./scripts/backup_before_migration.sh [name]` |
| **`check_angular_version.sh`** | 🔍 Verify versions | `./scripts/check_angular_version.sh [target]` |
| **`verify_dependencies.sh`** | ✅ Check compatibility | `./scripts/verify_dependencies.sh [target]` |
| **`find_breaking_changes.sh`** | 🔍 Scan breaking changes | `./scripts/find_breaking_changes.sh [target]` |
| **`check_deprecated_apis.sh`** | 🔍 Find deprecated APIs | `./scripts/check_deprecated_apis.sh` |
| **`check_control_flow.sh`** | 🔍 Control flow progress | `./scripts/check_control_flow.sh` |
| **`check_typescript_strict.sh`** | 🔍 Strict mode readiness | `./scripts/check_typescript_strict.sh` |
| **`check_zone_flags.sh`** | 🔍 Zone.js migration | `./scripts/check_zone_flags.sh` |
| **`verify_build.sh`** | ✅ Verify build | `./scripts/verify_build.sh [config]` |
| **`analyze_bundle.sh`** | 📊 Bundle analysis | `./scripts/analyze_bundle.sh [dist_dir]` |

### When to Use Each Script

**Before Starting Migration:**
1. `pre_migration_check.sh 20` - **Run comprehensive safety check first!**
2. `backup_before_migration.sh` - Create safety backup
3. `migration_status.sh` - Check current state
4. `check_angular_version.sh 20` - Verify versions
5. `verify_dependencies.sh 20` - Check compatibility
6. `find_breaking_changes.sh 20` - Identify blockers

**During Migration (Each Phase):**
1. `migration_toolbox.sh check_all` - Run core checks
2. `check_deprecated_apis.sh` - Find deprecated code
3. `check_control_flow.sh` - Check control flow progress
4. `verify_build.sh production` - Verify build succeeds
5. `analyze_bundle.sh` - Monitor bundle size
6. `check_zone_flags.sh` - Verify Zone.js setup

**Before Proceeding to Next Phase:**
1. `migration_toolbox.sh check_all` - **Must pass!**
2. `migration_status.sh` - Review status report
3. `check_angular_version.sh [next_version]` - Verify readiness
4. `find_breaking_changes.sh [next_version]` - Check blockers
5. `verify_build.sh production` - Ensure build works

---

## 🛡️ Phase 0: The Safety Net (Pre-Migration)
**Goal**: Create a "Definition of Truth" so we know if we broke the UI.
**Duration**: 3-5 days
**Parallelization**: HIGH - All tasks can run concurrently

### 📊 Parallel Execution Matrix - Phase 0

| Day | Tech Lead | Stream A (QA) | Stream B (Dev) | Stream C (Dev) | Stream E (DevOps) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Day 1** | Setup migration branch | Install Playwright | Audit critical user flows | Document current state | Verify Node 18 setup |
| **Day 2** | Review baseline plan | Write Playwright tests | Create test data fixtures | Map component dependencies | Setup Docker for Node 18 |
| **Day 3** | Code review setup | Run baseline snapshots | Validate test coverage | Create component inventory | Configure Azure Pipeline |
| **Day 4** | CI/CD integration | Add tests to CI | Document edge cases | Identify high-risk areas | Test pipeline locally |
| **Day 5** | Final review | Verify all tests pass | Sign-off on coverage | Risk assessment report | Deploy pipeline to dev |

### 0.1 Visual Regression Baseline (Playwright)
**Owner**: Stream A (QA/Tester)
**Can Start**: Immediately (Day 1)
**Blocks**: Nothing (fully parallel)

> [!TIP]
> With 300k+ LOC, manual testing is impossible. We need robots.

1.  **Install Playwright**:
    ```bash
    npm init playwright@latest
    ```
2.  **Configure "Golden Paths"**:
    Identify the top 5 critical user flows. Create a test that navigates to these pages and takes a screenshot.
    *   Login Screen
    *   Main Dashboard (Highcharts rendering)
    *   Data Grid (AG Grid rendering)
    *   Complex Form (Material inputs)
    *   Settings/Configuration Page
3.  **Run Baseline**:
    ```bash
    npx playwright test --update-snapshots
    ```
    *   *Result*: A folder of `.png` files that represent "Correctness".

**Parallel Activity**: While Stream A writes Playwright tests, Stream B can document user flows and create test data.

### 0.2 Git Strategy & CI/CD
**Owner**: Tech Lead + Stream E (DevOps)
**Can Start**: Day 1
**Blocks**: Nothing

*   **Branching**: Create a long-lived branch `migration/v17` (or `migration/v20`). Do NOT merge to `main` until the target version is stable.
*   **CI Gate**: Add a step to your pipeline that runs `npx playwright test` on every commit to the migration branch.
    ```yaml
    # .github/workflows/migration-check.yml
    - name: Run Visual Regression
      run: npx playwright test
    ```

**Parallel Activity**: Stream E sets up CI/CD while Stream A writes tests. They sync on Day 3 to integrate.

### 0.3 Dependency Inventory (NEW - Parallel Task)
**Owner**: Stream B + Stream C
**Can Start**: Day 1
**Duration**: 2 days
**Blocks**: Phase 1 planning

**Tasks**:
1.  **Component Inventory** (Stream C):
    ```bash
    # Generate component list
    find src/app -name "*.component.ts" | wc -l
    # Categorize by complexity
    ./scripts/analyze_components.sh > component-inventory.md
    ```

2.  **Dependency Audit** (Stream B):
    ```bash
    # Check current versions
    ./scripts/check_angular_version.sh 20
    ./scripts/verify_dependencies.sh 20
    # Document findings
    ```

3.  **Risk Assessment** (Both):
    - Identify components using deprecated APIs
    - Flag high-risk dependencies (ag-grid, ngx-perfect-scrollbar)
    - Create migration priority matrix

### 0.4 Documentation & Knowledge Base (NEW - Parallel Task)
**Owner**: All streams contribute
**Can Start**: Day 1
**Duration**: Ongoing

**Deliverables**:
1.  **Current State Documentation**:
    - Angular version: 15.2.10
    - Node version: 18.x
    - Critical dependencies and versions
    - Known issues and workarounds

2.  **Migration Runbook**:
    - Step-by-step commands
    - Rollback procedures
    - Emergency contacts

3.  **"Gotcha" Document** (Shared Markdown):
    - Template for logging issues and solutions
    - Updated daily by all team members

### ✅ Phase 0 Exit Criteria (All Must Pass)
- [ ] Playwright baseline captured (>= 5 critical flows)
- [ ] CI/CD pipeline configured and green
- [ ] Component inventory complete
- [ ] Dependency audit complete
- [ ] Risk assessment documented
- [ ] All team members trained on tools
- [ ] Migration branch created and protected

---

## 📋 Phase 1: The Foundation & Audit
**Goal**: Identify the "Red Zone" dependencies that will explode.
**Duration**: 3-5 days
**Parallelization**: HIGH - Most tasks can run concurrently

> [!TIP]
> **Run these scripts before starting Phase 1:**
> ```bash
> ./scripts/backup_before_migration.sh phase1-start
> ./scripts/check_angular_version.sh 20
> ./scripts/verify_dependencies.sh 20
> ./scripts/find_breaking_changes.sh 20
> ```

### 📊 Parallel Execution Matrix - Phase 1

| Day | Tech Lead | Stream A (Audit) | Stream B (Analysis) | Stream C (Documentation) | Stream D (Testing) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Day 1** | Review dependency list | Audit Red Zone deps | Analyze component usage | Document current deps | Verify test coverage |
| **Day 2** | Plan replacement strategy | Research alternatives | Map dependency tree | Create migration guide | Identify test gaps |
| **Day 3** | Review findings | Test alternatives | Analyze breaking changes | Document workarounds | Create test plan |
| **Day 4** | Approve migration plan | Create POC replacements | Estimate migration effort | Update runbook | Add missing tests |
| **Day 5** | Final review & sign-off | Present recommendations | Risk assessment report | Finalize documentation | Test baseline complete |

### 1.1 The "Red Zone" Audit (Must Replace/Refactor)
**Owner**: Stream A (Audit Lead)
**Can Start**: Day 1
**Duration**: 3 days
**Blocks**: Phase 2 planning
**Parallel Activities**: Streams B, C, D work concurrently

These libraries are deprecated or have major breaking changes.

| Dependency | Risk Level | Action Plan | Owner | Parallel Work |
| :--- | :--- | :--- | :--- | :--- |
| **`ngx-perfect-scrollbar`** | 🚨 **CRITICAL** | **DEAD**. Deprecated. Must replace with native CSS `overflow: auto` or `ngx-scrollbar`. Do this **BEFORE** Angular 15 upgrade if possible. | Stream A | Stream B analyzes usage, Stream C documents alternatives |
| **`@swimlane/ngx-graph`** | 🟠 HIGH | Check compatibility with Ivy/Strict mode in v16+. Might need a fork or alternative. | Stream A | Stream B creates compatibility matrix |
| **`d3`** | 🟠 HIGH | v3/v4/v5 compatibility issues. Ensure `@types/d3` matches the version. | Stream A | Stream B audits all d3 imports |
| **`@ag-grid-community`** | 🔴 HIGH | v28 -> v31 is a massive jump. Grid CSS classes renamed. Expect grid to look "unstyled". | Stream A | Stream B documents all grid customizations |

### 1.2 Dependency Analysis Deep Dive (NEW - Parallel Task)
**Owner**: Stream B (Analysis Team)
**Can Start**: Day 1 (Parallel with 1.1)
**Duration**: 3 days
**Blocks**: Nothing (informational)

**Tasks (All Parallel)**:
1. **Component Usage Analysis** (Day 1-2):
   ```bash
   # Find all components using Red Zone deps
   grep -r "ngx-perfect-scrollbar" src/app
   grep -r "ag-grid" src/app
   grep -r "ngx-graph" src/app
   # Document findings in component-usage.md
   ```

2. **Dependency Tree Mapping** (Day 1-2):
   ```bash
   # Generate dependency graph
   npm ls @ag-grid-community
   npm ls ngx-perfect-scrollbar
   # Identify transitive dependencies
   ```

3. **Breaking Changes Analysis** (Day 2-3):
   ```bash
   # Run breaking changes scanner
   ./scripts/find_breaking_changes.sh 17
   ./scripts/find_breaking_changes.sh 20
   # Create breaking-changes-matrix.md
   ```

4. **Migration Effort Estimation** (Day 3):
   - Estimate hours per component
   - Identify high-risk areas
   - Create priority matrix

### 1.3 Documentation & Knowledge Base (NEW - Parallel Task)
**Owner**: Stream C (Documentation Team)
**Can Start**: Day 1 (Parallel with 1.1, 1.2)
**Duration**: 5 days (ongoing)
**Blocks**: Nothing

**Deliverables (All Parallel)**:
1. **Dependency Inventory** (Day 1-2):
   - Current versions of all dependencies
   - Compatibility matrix for Angular 15-20
   - Known issues and workarounds

2. **Migration Guides** (Day 2-4):
   - ngx-perfect-scrollbar replacement guide
   - ag-grid upgrade guide (v28 -> v31+)
   - d3 version compatibility guide
   - Material MDC migration guide

3. **Runbook Updates** (Day 3-5):
   - Step-by-step upgrade commands
   - Rollback procedures
   - Emergency contacts
   - Troubleshooting guide

### 1.4 Test Coverage Baseline (NEW - Parallel Task)
**Owner**: Stream D (Testing Team)
**Can Start**: Day 1 (Parallel with all above)
**Duration**: 4 days
**Blocks**: Phase 2 execution (must complete first)

**Tasks (Sequential within stream, parallel with other streams)**:
1. **Coverage Analysis** (Day 1):
   ```bash
   npm test -- --coverage
   # Document current coverage %
   # Identify untested critical paths
   ```

2. **Gap Analysis** (Day 2):
   - Find components with <50% coverage
   - Identify Red Zone components without tests
   - Prioritize test creation

3. **Test Creation** (Day 3-4):
   - Add tests for critical Red Zone components
   - Focus on ag-grid, scrollbar, graph components
   - Ensure >70% coverage before Phase 2

4. **Baseline Validation** (Day 4):
   ```bash
   npm test
   npx playwright test
   # All tests must pass before Phase 2
   ```

### ✅ Phase 1 Exit Criteria (All Must Pass)
- [ ] Red Zone audit complete (all dependencies categorized)
- [ ] Component usage analysis complete
- [ ] Dependency tree mapped
- [ ] Breaking changes documented
- [ ] Migration guides created
- [ ] Test coverage >70% for critical paths
- [ ] All Playwright baseline tests passing
- [ ] Migration effort estimated
- [ ] Risk assessment approved by Tech Lead

**Parallel Completion**: All 4 streams must complete before Phase 2 starts, but they work independently.

---

## 🚧 Phase 2: The Material Hurdle (v14 → v15)
**Goal**: Complete Angular 15 upgrade and MDC (Material Design Components) migration.
**Status**: Project is on Angular 15.2.10, but MDC migration may be incomplete.
**Duration**: 3-5 days (if starting from v14) or 1-2 days (verification only if already on v15)
**Parallelization**: MEDIUM - Some tasks must be sequential

> [!IMPORTANT]
> **If you're already on Angular 15.2.10:**
> 1. Skip to [Phase 2 Verification](#phase-2-verification-if-already-on-v15)
> 2. Verify MDC migration is complete
> 3. Ensure no `MatLegacy*` imports remain
> 4. Proceed to Phase 3 if verification passes

> [!CRITICAL]
> **The MDC Migration is MANDATORY**
> - In Angular v17, all `MatLegacy*` modules are **deleted**
> - If you skip MDC migration now, your app will be un-upgradeable to v17+
> - This is the most breaking change in Angular's history

---

### 2.0 Pre-Migration Checklist

#### Prerequisites
- [ ] Node.js 18.x installed (`nvm install 18 && nvm use 18`)
- [ ] Backup created (`./scripts/backup_before_migration.sh v14-baseline`)
- [ ] All tests passing on v14
- [ ] Git working directory clean
- [ ] Team notified of upgrade window

#### Pre-Migration Scripts
```bash
# Verify current state
./scripts/check_angular_version.sh 15
./scripts/verify_dependencies.sh 15
./scripts/migration_toolbox.sh check_all

# Create baseline
./scripts/backup_before_migration.sh v14-to-v15-start
```

---

### 2.1 The Core Upgrade (v14 → v15)

#### Step 1: Update Angular Core
```bash
# Update Angular core packages
ng update @angular/core@15 @angular/cli@15 --force

# Why --force?
# - ag-grid v28 has peer dependency conflicts with Angular 15
# - ngx-perfect-scrollbar is not compatible with Angular 15
# - We'll handle these in Phase 3
```

**Expected Result**: Build will fail. This is normal.

#### Step 2: Update Angular Material
```bash
# Update Material to v15
ng update @angular/material@15

# This will:
# - Update Material packages to v15
# - Prompt for MDC migration
# - Update some imports automatically
```

**Checkpoint**: 
```bash
npm run build
# Expected: Build fails with Material-related errors
```

---

### 2.2 The MDC Migration (Critical!)

#### What is MDC Migration?

**Material Design Components (MDC)** is a complete rewrite of Angular Material using Google's official Material Web Components.

**Changes**:
- All component internals rewritten
- CSS class names changed (`.mat-*` → `.mdc-*`)
- Some APIs changed
- Better accessibility
- Better performance
- **Breaking**: Old styles will break

#### Step 1: Run MDC Migration Schematic
```bash
# Run the automated migration
ng generate @angular/material:mdc-migration

# This will:
# - Replace MatLegacy* imports with new imports
# - Update some templates
# - Add migration comments in code
# - Generate a migration report
```

**Review the migration report** (`mdc-migration-report.md`) carefully.

#### Step 2: Manual Fixes Required

**A. Update Component Imports**

Find and replace all legacy imports:

```bash
# Find all MatLegacy imports
grep -r "MatLegacy" src/

# Common replacements:
```

| Legacy Import | New Import |
|---------------|------------|
| `MatLegacyButton` | `MatButton` |
| `MatLegacyFormField` | `MatFormField` |
| `MatLegacyInput` | `MatInput` |
| `MatLegacySelect` | `MatSelect` |
| `MatLegacyCheckbox` | `MatCheckbox` |
| `MatLegacyRadio` | `MatRadio` |
| `MatLegacySlider` | `MatSlider` |
| `MatLegacyTable` | `MatTable` |
| `MatLegacyDialog` | `MatDialog` |
| `MatLegacyTooltip` | `MatTooltip` |

**B. Update Module Imports**

```typescript
// Before (v14)
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule } from '@angular/material/legacy-form-field';

// After (v15)
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
```

**C. Update CSS/SCSS Styles**

This is the most time-consuming part.

```scss
// Before (v14) - Legacy Material
::ng-deep .mat-form-field-outline {
  color: blue;
}

::ng-deep .mat-button {
  border-radius: 8px;
}

// After (v15) - MDC Material
// Option 1: Use CSS variables (recommended)
.mat-mdc-form-field {
  --mdc-outlined-text-field-outline-color: blue;
}

.mat-mdc-button {
  --mdc-text-button-container-shape: 8px;
}

// Option 2: Target MDC classes (brittle, but sometimes necessary)
::ng-deep .mdc-notched-outline__leading {
  border-color: blue;
}

::ng-deep .mdc-button {
  border-radius: 8px;
}
```

**Common CSS Migrations**:

| Component | Legacy Class | MDC Class | CSS Variable |
|-----------|--------------|-----------|--------------|
| Form Field | `.mat-form-field-outline` | `.mdc-notched-outline` | `--mdc-outlined-text-field-outline-color` |
| Button | `.mat-button` | `.mdc-button` | `--mdc-text-button-*` |
| Checkbox | `.mat-checkbox-frame` | `.mdc-checkbox__background` | `--mdc-checkbox-*` |
| Input | `.mat-input-element` | `.mdc-text-field__input` | `--mdc-filled-text-field-*` |
| Select | `.mat-select-trigger` | `.mdc-select__anchor` | `--mdc-outlined-select-*` |

**D. Update Template Selectors (if needed)**

Some component selectors changed:

```html
<!-- Before (v14) -->
<mat-legacy-button>Click</mat-legacy-button>
<mat-legacy-form-field>
  <input matLegacyInput>
</mat-legacy-form-field>

<!-- After (v15) -->
<button mat-button>Click</button>
<mat-form-field>
  <input matInput>
</mat-form-field>
```

#### Step 3: Test Material Components

**Manual Testing Checklist**:
- [ ] All buttons render and work
- [ ] All form fields render correctly
- [ ] Form validation displays properly
- [ ] Dialogs open and close
- [ ] Tooltips appear on hover
- [ ] Tables render with data
- [ ] Checkboxes and radios work
- [ ] Selects open and close
- [ ] Date pickers work
- [ ] Tabs switch correctly
- [ ] Menus open and close

**Visual Regression Testing**:
```bash
# Run Playwright visual regression
npx playwright test --update-snapshots

# Review visual diffs carefully
# MDC components look slightly different (this is expected)
```

---

### 2.3 Additional v15 Breaking Changes

#### A. TypeScript Configuration

**Remove deprecated Ivy flag**:

```json
// tsconfig.json
{
  "compilerOptions": {
    // Remove this line (Ivy is default in v15)
    // "enableIvy": true  ← DELETE THIS
  }
}
```

#### B. Router Changes

**Replace deprecated `RouterLinkWithHref`**:

```typescript
// Before (v14)
import { RouterLinkWithHref } from '@angular/router';

// After (v15)
import { RouterLink } from '@angular/router';
// RouterLink now handles both <a> and <button> elements
```

#### C. Dependency Injection Changes

**Update `providedIn` values**:

```typescript
// Before (v14)
@Injectable({
  providedIn: 'any'  // Deprecated
})

// After (v15)
@Injectable({
  providedIn: 'root'  // Use 'root' instead
})
```

#### D. DatePipe Changes

**Remove deprecated timezone config**:

```typescript
// Before (v14)
import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';

// After (v15)
// Use DatePipe with explicit timezone parameter instead
```

---

### 2.4 Dependency Updates

#### Update package.json

```json
{
  "dependencies": {
    "@angular/animations": "^15.2.10",
    "@angular/common": "^15.2.10",
    "@angular/compiler": "^15.2.10",
    "@angular/core": "^15.2.10",
    "@angular/forms": "^15.2.10",
    "@angular/material": "^15.2.9",
    "@angular/platform-browser": "^15.2.10",
    "@angular/platform-browser-dynamic": "^15.2.10",
    "@angular/router": "^15.2.10",
    "@angular/cdk": "^15.2.9",
    
    // Update language service to match
    "@angular/language-service": "^15.2.10",  // Was 14.3.0
    
    // Keep these for now (will upgrade in Phase 3)
    "@ag-grid-community/angular": "~28.2.1",
    "ngx-perfect-scrollbar": "~10.1.1"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^15.2.11",
    "@angular/cli": "^15.2.11",
    "@angular/compiler-cli": "^15.2.10",
    "typescript": "~4.9.0"  // v15 requires TypeScript 4.8-4.9
  }
}
```

```bash
# Install updated dependencies
npm install
```

---

### 2.5 Build and Test

#### Build the Application
```bash
# Clean build
rm -rf node_modules .angular dist
npm install
npm run build

# Expected: Build should pass (with possible warnings)
```

#### Run Tests
```bash
# Run unit tests
npm test

# Run e2e tests
npx playwright test

# Expected: Most tests should pass
# Some Material-related tests may fail (fix in next step)
```

---

### 2.6 Fix Remaining Issues

#### Common Issues and Fixes

**Issue 1: Material styles broken**
```scss
// Problem: Old Material classes don't work
.mat-form-field-outline { ... }

// Solution: Use MDC classes or CSS variables
.mat-mdc-form-field {
  --mdc-outlined-text-field-outline-color: ...;
}
```

**Issue 2: Tests failing due to Material changes**
```typescript
// Problem: TestBed can't find MatLegacyModule
import { MatLegacyButtonModule } from '@angular/material/legacy-button';

// Solution: Use new module
import { MatButtonModule } from '@angular/material/button';
```

**Issue 3: ag-grid peer dependency warnings**
```bash
# Problem: ag-grid v28 warns about Angular 15
npm WARN peer dependency @angular/core@15 not compatible

# Solution: Ignore for now, will upgrade in Phase 3
# ag-grid v28 works with Angular 15 despite warnings
```

**Issue 4: ngx-perfect-scrollbar errors**
```bash
# Problem: ngx-perfect-scrollbar not compatible with Angular 15

# Solution: Will replace in Phase 3
# For now, use --legacy-peer-deps if needed
npm install --legacy-peer-deps
```

---

### Phase 2 Verification (If Already on v15)

> [!TIP]
> **If your project is already on Angular 15.2.10**, run these verification steps to ensure MDC migration is complete.

#### Verification Script
```bash
# Run comprehensive checks
./scripts/migration_toolbox.sh legacy
./scripts/check_deprecated_apis.sh
./scripts/migration_toolbox.sh check_all
```

#### Manual Verification Checklist

**1. Check for Legacy Imports**
```bash
# Should return NO results
grep -r "MatLegacy" src/
grep -r "legacy-" src/

# If found, you need to complete MDC migration
```

**2. Check package.json**
```bash
# Verify Angular versions
cat package.json | grep "@angular/core"
# Should show: "^15.2.10"

cat package.json | grep "@angular/material"
# Should show: "^15.2.9"
```

**3. Check TypeScript Config**
```bash
# Verify enableIvy is removed
cat tsconfig.json | grep "enableIvy"
# Should return NO results
```

**4. Test Material Components**
- [ ] Open application in browser
- [ ] Test all Material components visually
- [ ] Check browser console for errors
- [ ] Verify no MDC-related warnings

**5. Run Build and Tests**
```bash
# Production build must pass
npm run build -- --configuration production

# Tests should mostly pass
npm test

# Playwright tests should pass
npx playwright test
```

#### If Verification Fails

**Found `MatLegacy*` imports?**
→ Complete Section 2.2 (MDC Migration)

**Material components broken?**
→ Complete Section 2.2.C (Update CSS/SCSS)

**Build failing?**
→ Check Section 2.6 (Common Issues)

**Tests failing?**
→ Update test imports (Section 2.2.B)

---

### ✅ Phase 2 Exit Criteria (All Must Pass)

#### Automated Checks
- [ ] `npm run build` passes with Node 18
- [ ] `npm run build -- --configuration production` passes
- [ ] `npm test` runs (>70% passing acceptable)
- [ ] `npx playwright test` passes (baseline)
- [ ] `./scripts/migration_toolbox.sh legacy` returns 0 results
- [ ] `./scripts/check_deprecated_apis.sh` shows no critical issues

#### Manual Checks
- [ ] No `MatLegacy*` imports in codebase
- [ ] No `legacy-` module imports
- [ ] Material components render correctly in browser
- [ ] No MDC-related console errors
- [ ] `enableIvy` removed from tsconfig.json
- [ ] All dependencies updated to v15

#### Visual Checks
- [ ] All buttons look correct (may look slightly different - this is OK)
- [ ] All form fields render properly
- [ ] All dialogs open and close
- [ ] All tables display data
- [ ] Application is visually functional

#### Documentation
- [ ] MDC migration report reviewed
- [ ] Known issues documented
- [ ] Style changes documented
- [ ] Team notified of visual changes

---

### 🚨 Troubleshooting Phase 2

#### Problem: Build fails with Material errors
```bash
Error: Cannot find module '@angular/material/legacy-button'
```

**Solution**: Complete MDC migration (Section 2.2)

#### Problem: Styles completely broken
```bash
# Material components have no styling
```

**Solution**: 
1. Check if Material theme is imported in `styles.scss`
2. Update theme import for v15:
```scss
// Before
@import '~@angular/material/prebuilt-themes/indigo-pink.css';

// After (v15)
@use '@angular/material' as mat;
@include mat.all-component-themes($theme);
```

#### Problem: Tests fail with "No provider for MatLegacyDialog"
```typescript
// Solution: Update test imports
import { MatDialogModule } from '@angular/material/dialog';  // Not legacy-dialog
```

#### Problem: ag-grid or ngx-perfect-scrollbar blocking upgrade
```bash
# Solution: Use --force flag
ng update @angular/core@15 --force

# Or use --legacy-peer-deps
npm install --legacy-peer-deps
```

---

### 📊 Phase 2 Success Metrics

**Time Investment**:
- Fresh v14 → v15: 3-5 days
- Verification only (if on v15): 1-2 days

**Expected Outcomes**:
- ✅ Angular 15.2.10 running
- ✅ No MatLegacy imports
- ✅ Material components functional
- ✅ Build passing
- ✅ >70% tests passing

**Deferred Items** (handle in Phase 3):
- ag-grid upgrade (v28 → v31)
- ngx-perfect-scrollbar replacement
- Full test suite fixes
- Performance optimization

---

## 🚀 Phase 3: The Stability Plateau (v15 → v17)
**Goal**: Modernize and Stabilize.
**Duration**: 2-3 weeks
**Parallelization**: VERY HIGH - Multiple independent workstreams

> [!IMPORTANT]
> **Before starting Phase 3, run:**
> ```bash
> ./scripts/backup_before_migration.sh phase3-start
> ./scripts/check_angular_version.sh 17
> ./scripts/verify_dependencies.sh 17
> ./scripts/find_breaking_changes.sh 17
> ```

### 📊 Parallel Execution Matrix - Phase 3

**Week 1: Core Upgrade + Parallel Modernization**

| Day | Tech Lead | Stream A (Types) | Stream B (Components) | Stream C (Templates) | Stream D (Tests) | Stream E (Infra) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Mon** | Upgrade to v16 | Analyze `any` types | Audit components | Scan templates | Setup Vitest | Update Dockerfile |
| **Tue** | Fix build errors | Start type fixes (AI) | Plan standalone | Start control flow (AI) | Migrate 10 tests (AI) | Update Azure Pipeline |
| **Wed** | Code review | Continue types (AI) | Convert 5 components (AI) | Convert templates (AI) | Migrate 10 tests (AI) | Test pipeline |
| **Thu** | Upgrade to v17 | Fix strict errors | Convert 5 components (AI) | Convert templates (AI) | Migrate 10 tests (AI) | Deploy to dev |
| **Fri** | Integration | Review progress | Review progress | Review progress | Review progress | Verify deployment |

**Week 2: Intensive Parallel Migration**

| Day | Tech Lead | Stream A (Types) | Stream B (Components) | Stream C (Templates) | Stream D (Tests) | Stream E (Infra) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Mon** | Resolve conflicts | Fix RxJS issues | Convert 10 components (AI) | Convert 20 templates (AI) | Migrate 20 tests (AI) | Monitor CI/CD |
| **Tue** | Code review | Enable strict flags | Convert 10 components (AI) | Convert 20 templates (AI) | Migrate 20 tests (AI) | Optimize builds |
| **Wed** | Integration | Fix strict errors | Convert 10 components (AI) | Convert 20 templates (AI) | Migrate 20 tests (AI) | Bundle analysis |
| **Thu** | Merge streams | Final type fixes | Convert remaining (AI) | Convert remaining (AI) | Migrate remaining (AI) | Performance tuning |
| **Fri** | Phase validation | Verify strict mode | Verify standalone | Verify control flow | Verify all tests pass | Final deployment |

**Week 3: Polish + Validation**

| Day | Tech Lead | All Streams |
| :--- | :--- | :--- |
| **Mon** | Bug fixes | Fix integration issues, run full test suite |
| **Tue** | Performance | Optimize bundle, fix performance regressions |
| **Wed** | Documentation | Update docs, create migration report |
| **Thu** | Validation | Run all validation scripts, Playwright tests |
| **Fri** | Sign-off | Final review, prepare for Phase 4 |

### 3.0 Pre-requisites
**Owner**: Tech Lead + Stream E
**Can Start**: Immediately
**Duration**: 1 day
**Blocks**: Core upgrade

*   **Node.js**: Stay on Node 18.
*   **Verify**: Run `./scripts/check_angular_version.sh 17` to check compatibility
*   **Backup**: Run `./scripts/backup_before_migration.sh phase3-start`

### 3.1 Upgrade to v16 & v17
**Owner**: Tech Lead
**Can Start**: After pre-requisites
**Duration**: 2 days (1 day per version)
**Blocks**: All other Phase 3 work (must complete first)

```bash
# Upgrade to v16
ng update @angular/core@16 @angular/cli@16 @angular/material@16 --force

# Upgrade to v17
ng update @angular/core@17 @angular/cli@17 @angular/material@17 --force
```

**Critical**: Once v17 upgrade completes, ALL streams can start parallel work.

### 🔍 Detailed Migration Guide: v16 & v17 Specifics
*   **v16 (The Death of ngcc)**: View Engine libraries **will no longer work**. If you have old libs, this is where they break.
*   **v17 (Signals)**: `mutate` is removed. Use `update` instead.
    ```typescript
    // Before
    items.mutate(list => list.push(newItem));
    // After
    items.update(list => [...list, newItem]);
    ```
*   **v17 (Templates)**: `NgSwitch` now uses strict equality (`===`). Check for type mismatches (string vs number).
*   **v17 (Animation)**: `AnimationDriver.NOOP` is deprecated. Use `NoopAnimationDriver`.

### 🔍 Detailed Migration Guide: RxJS
**Problem**: `toPromise()` is deprecated/removed.
**Solution**:
*   **Before**:
    ```typescript
    const data = await this.http.get('/api').toPromise();
    ```
*   **After**:
    ```typescript
    import { lastValueFrom } from 'rxjs';
    const data = await lastValueFrom(this.http.get('/api'));
    ```

### 3.2 Stream A: Type Safety Migration (PARALLEL - Starts after 3.1)
**Owner**: Dev A
**Can Start**: After v17 upgrade completes
**Duration**: 2 weeks
**Blocks**: Nothing (can merge independently)
**AI Usage**: VERY HIGH

**Branch**: `stream-a/type-safety`

**Daily Workflow**:
```bash
# Morning: Find files with 'any' types
./scripts/check_typescript_strict.sh

# For each file with high 'any' count:
# 1. Open in VS Code
# 2. Ask AI: "Convert this file to use strict TypeScript types"
# 3. Review AI changes
# 4. Run: npm run build
# 5. Commit if successful

# End of day: Track progress
grep -r ": any" src/app | wc -l  # Should decrease daily
```

**AI Prompt Template**:
```
Task: Convert this file to use strict TypeScript types.

Requirements:
- Replace all `: any` with proper types
- Add return types to all functions
- Fix noImplicitAny errors
- Use proper generics where applicable
- Preserve all existing functionality

File: [paste file content]
```

**Targets**:
- Week 1: Fix 50% of `any` types
- Week 2: Enable `strict: true` in tsconfig.json

### 3.3 Stream B: Standalone Component Migration (PARALLEL - Starts after 3.1)
**Owner**: Dev B
**Can Start**: After v17 upgrade completes
**Duration**: 2 weeks
**Blocks**: Nothing (can merge independently)
**AI Usage**: VERY HIGH

**Branch**: `stream-b/standalone`

**Daily Workflow**:
```bash
# Morning: Generate component list
find src/app -name "*.component.ts" > components.txt

# For each component (batch of 5-10):
# 1. Open component + its module
# 2. Ask AI: "Convert this component to standalone"
# 3. Verify imports are correct
# 4. Run: ng serve (check for errors)
# 5. Commit batch

# End of day: Track progress
./scripts/migration_status.sh
```

**AI Prompt Template**:
```
Task: Convert this NgModule component to standalone.

Requirements:
- Add standalone: true to @Component
- Move all imports from NgModule to component imports array
- Update all providers
- Remove from NgModule declarations
- Verify all dependencies are imported

Component: [paste component]
NgModule: [paste module]
```

**Targets**:
- Week 1: Convert 30% of components
- Week 2: Convert remaining 70%

### 3.4 Stream C: Template Control Flow Migration (PARALLEL - Starts after 3.1)
**Owner**: Dev C
**Can Start**: After v17 upgrade completes
**Duration**: 2 weeks
**Blocks**: Nothing (can merge independently)
**AI Usage**: MEDIUM-HIGH

**Branch**: `stream-c/templates`

**Command**: `ng generate @angular/core:control-flow`

**Daily Workflow**:
```bash
# Morning: Check progress
./scripts/check_control_flow.sh

# For complex templates:
# 1. Ask AI to convert
# For simple templates:
# 2. Use CLI schematic: ng generate @angular/core:control-flow
# 3. Review changes
# 4. Test in browser
# 5. Commit batch

# End of day: Track progress
./scripts/check_control_flow.sh  # Check progress %
```

**AI Prompt Template**:
```
Task: Convert this template from legacy to new control flow syntax.

Requirements:
- Convert *ngIf to @if/@else
- Convert *ngFor to @for
- Convert *ngSwitch to @switch
- Preserve all existing logic and bindings
- Handle trackBy functions properly

Template: [paste template]
```

**Targets**:
- Week 1: Convert 50% of templates
- Week 2: Convert remaining 50% (100% complete)

### 🔍 Detailed Migration Guide: Control Flow
**Problem**: `*ngIf` and `*ngFor` are "slow" and verbose.
**Solution**:
*   **Before**:
    ```html
    <div *ngIf="isLoggedIn; else loginTpl">Welcome</div>
    <ng-template #loginTpl>Please Login</ng-template>
    ```
*   **After**:
    ```html
    @if (isLoggedIn) {
      <div>Welcome</div>
    } @else {
      Please Login
    }
    ```

### 3.5 Stream D: Test Migration (PARALLEL - Starts after 3.1)
**Owner**: Dev D
**Can Start**: After v17 upgrade completes
**Duration**: 2 weeks
**Blocks**: Nothing (can merge independently)
**AI Usage**: VERY HIGH

**Branch**: `stream-d/tests`

**Daily Workflow**:
```bash
# One-time setup (Day 1)
npm install --save-dev vitest @vitest/ui @vitest/coverage-v8

# Daily: Migrate tests in batches of 10-20
# 1. Select 10-20 test files
# 2. Ask AI to convert each
# 3. Run: npm test
# 4. Fix failures
# 5. Commit batch

# End of day: Track progress
find src -name "*.spec.ts" | wc -l  # Total
git grep "import.*jasmine" | wc -l  # Remaining Jasmine
```

**AI Prompt Template**:
```
Task: Convert this Karma/Jasmine test to Vitest.

Requirements:
- Update imports (jasmine → vitest)
- Convert beforeEach/afterEach to Vitest syntax
- Update matchers (expect().toBe → expect().toBe)
- Handle async/await properly (fakeAsync → vitest timers)
- Preserve all test logic and assertions

Test file: [paste test]
```

**Targets**:
- Week 1: Migrate 50% of tests
- Week 2: Migrate remaining 50%, all tests passing

### 3.6 Stream E: Infrastructure Updates (PARALLEL - Starts after 3.1)
**Owner**: Dev E (DevOps)
**Can Start**: After v17 upgrade completes
**Duration**: 1 week
**Blocks**: Production deployment
**AI Usage**: LOW

**Branch**: `stream-e/infra`

**Tasks**:
1. **Update Dockerfile** (Day 1):
   ```dockerfile
   # Update from Node 16 to Node 18
   FROM node:18-alpine
   ```

2. **Update Azure Pipelines** (Day 2):
   ```yaml
   - task: NodeTool@0
     inputs:
       versionSpec: '18.x'
   ```

3. **Test Locally** (Day 3):
   ```bash
   docker build -t test-migration .
   docker run test-migration npm run build
   ```

4. **Deploy to Dev** (Day 4):
   - Deploy to dev environment
   - Run smoke tests
   - Monitor for issues

5. **Optimize CI/CD** (Day 5):
   - Add caching
   - Optimize build times
   - Add bundle analysis

### 3.7 Daily Team Coordination
**Time**: 15 minutes each morning
**Participants**: All streams + Tech Lead

**Agenda**:
1. Each stream reports (2 min each):
   - Yesterday's progress
   - Today's plan
   - Blockers
2. Tech Lead announces:
   - Current Angular version
   - Build status
   - Critical issues
3. Review overnight CI results

**Conflict Resolution**:
- **Stream A + B**: Type changes may break component imports
  - **Solution**: Stream A commits first, Stream B pulls and resolves
- **Stream C + D**: Template changes may break tests
  - **Solution**: Stream C updates templates, Stream D updates tests same day
- **All Streams**: Merge conflicts on `package.json`, `tsconfig.json`
  - **Solution**: Tech Lead owns these files, streams request changes via PR

### 3.8 Merge Strategy
**Frequency**: End of each week
**Order**:
1. Stream E (Infrastructure) - merges first
2. Stream A (Types) - merges second
3. Stream B (Components) - merges third
4. Stream C (Templates) - merges fourth
5. Stream D (Tests) - merges last (validates everything)

**Process**:
```bash
# Tech Lead merges each stream in order
git checkout migration/v17
git merge stream-e/infra
# Run tests, fix conflicts
git merge stream-a/type-safety
# Run tests, fix conflicts
git merge stream-b/standalone
# Run tests, fix conflicts
git merge stream-c/templates
# Run tests, fix conflicts
git merge stream-d/tests
# Run full validation
./scripts/migration_toolbox.sh check_all
npm run build
npm test
npx playwright test
```

### ✅ Phase 3 Validation Checklist
*   [ ] `ng build` passes with Node 18.
*   [ ] Control Flow (`@if`, `@for`) is working in converted templates.
*   [ ] No `toPromise()` calls remain.
*   [ ] Visual Regression tests (Playwright) match the baseline (ignore minor pixel diffs from MDC).
*   [ ] **Run**: `./scripts/migration_toolbox.sh check_all` (must pass)
*   [ ] **Run**: `./scripts/check_deprecated_apis.sh` (fix all critical issues)
*   [ ] **Run**: `./scripts/analyze_bundle.sh` (verify bundle size)
*   [ ] **Run**: `./scripts/check_typescript_strict.sh` (assess strict mode readiness)
*   [ ] All 5 streams merged successfully
*   [ ] >80% tests passing
*   [ ] Standalone migration >80% complete
*   [ ] Control flow migration 100% complete
*   [ ] TypeScript strict mode enabled

**Parallel Success Metrics**:
- All streams work independently without blocking each other
- Daily merges to integration branch
- CI runs overnight, catches issues early
- Team velocity: 5x faster than sequential approach

### 🛠️ Troubleshooting: Common Upgrade Errors
| Error | Cause | Fix |
| :--- | :--- | :--- |
| `Package 'X' has an incompatible peer dependency` | Old libs like `ag-grid` | Use `--force` or `--legacy-peer-deps`. |
| `Error: export 'X' (imported as 'Y') was not found in 'Z'` | Webpack/Build optimizer | Delete `.angular` cache and `node_modules`. |
| `Module not found: Error: Can't resolve 'zone.js/dist/zone'` | Zone.js path change | Update imports to `zone.js` (no subpath). |
| `NG0303: Can't bind to 'ngIf' since it isn't a known property` | Missing Import | Import `CommonModule` or use `@if`. |

---

## ⚡ **FAST TRACK: 4-Day Migration Plan (v15 → v20)**
**Reality Check**: You have 4 days. This is aggressive but doable with maximum parallelization.

> [!WARNING]
> **This is the CRITICAL PATH for teams with tight deadlines.**
> Focus on getting to v20 STABLE, not perfect. Modernization (standalone, strict mode) can happen AFTER.

### 📊 4-Day Parallel Execution Matrix

| Day | Tech Lead | Stream A (Build) | Stream B (Deps) | Stream C (Tests) | Stream D (Infra) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Day 1** | Upgrade v15→v16 | Fix build errors (AI) | Audit Red Zone deps | Run baseline tests | Update to Node 18 |
| **Day 2** | Upgrade v16→v17 | Fix build errors (AI) | Replace ngx-scrollbar | Fix broken tests (AI) | Update Dockerfile |
| **Day 3** | Upgrade v17→v18→v19 | Fix build errors (AI) | Upgrade ag-grid v31 | Fix broken tests (AI) | Update Azure Pipeline |
| **Day 4** | Upgrade v19→v20 | Final fixes (AI) | Verify all deps | All tests passing | Deploy to staging |

### Day 1: v15 → v16 (Foundation)
**Goal**: Get to v16, fix build

**Tech Lead** (Sequential - blocks everything):
```bash
# Morning
./scripts/backup_before_migration.sh v15-baseline
ng update @angular/core@16 @angular/cli@16 @angular/material@16 --force
# Expect build to fail
```

**Stream A - Build Fixes** (Starts after upgrade):
- Fix TypeScript errors (use AI for batch fixes)
- Fix Material imports
- Get `ng build` to pass

**Stream B - Dependency Audit** (PARALLEL - starts immediately):
```bash
./scripts/verify_dependencies.sh 20
grep -r "ngx-perfect-scrollbar" src/app
# Create replacement plan
```

**Stream C - Test Baseline** (PARALLEL - starts immediately):
```bash
npm test -- --coverage
npx playwright test --update-snapshots
# Document current state
```

**Stream D - Infrastructure** (PARALLEL - starts immediately):
```bash
nvm install 18
nvm use 18
# Update Dockerfile to Node 18
```

**End of Day 1 Gate**:
- [ ] `ng build` passes on v16
- [ ] Node 18 configured
- [ ] Red Zone deps identified

### Day 2: v16 → v17 (Modernization)
**Goal**: Get to v17, start critical replacements

**Tech Lead** (Morning):
```bash
ng update @angular/core@17 @angular/cli@17 @angular/material@17 --force
```

**Stream A - Build Fixes**:
- Fix v17 breaking changes (AI-assisted)
- Fix RxJS `toPromise()` → `lastValueFrom()`
- Get build passing

**Stream B - Critical Dependency Replacements**:
- Replace `ngx-perfect-scrollbar` with native CSS or `ngx-scrollbar`
- Test replacements in browser
- Commit if working

**Stream C - Test Fixes**:
- Fix tests broken by v17 changes (AI-assisted)
- Focus on critical path tests only
- Aim for >70% passing

**Stream D - CI/CD Updates**:
```bash
# Update Azure Pipelines to Node 18
# Test pipeline locally
```

**End of Day 2 Gate**:
- [ ] `ng build` passes on v17
- [ ] `ngx-perfect-scrollbar` replaced
- [ ] >70% tests passing

### Day 3: v17 → v19 (Acceleration)
**Goal**: Jump to v19 (skip v18 if possible, or do both quickly)

**Tech Lead** (Morning):
```bash
ng update @angular/core@18 @angular/cli@18 @angular/material@18 --force
# If successful, immediately:
ng update @angular/core@19 @angular/cli@19 @angular/material@19 --force
```

**Stream A - Build Fixes**:
- Fix v18/v19 breaking changes (AI-assisted)
- Update to `provideHttpClient`
- Add `standalone: false` to all components (quick fix)

**Stream B - AG Grid Upgrade**:
```bash
npm install @ag-grid-community/core@31 @ag-grid-community/angular@31
# Update imports: ColDef<T> → ColDef
# Update CSS: ag-theme-alpine → ag-theme-quartz
```

**Stream C - Test Marathon**:
- Fix all broken tests (AI-assisted, batch processing)
- Use AI to convert 20-30 tests at a time
- Aim for >80% passing

**Stream D - Node 20 Prep**:
```bash
nvm install 20
nvm use 20
# Test build with Node 20
# Update all configs
```

**End of Day 3 Gate**:
- [ ] `ng build` passes on v19 with Node 20
- [ ] AG Grid rendering correctly
- [ ] >80% tests passing

### Day 4: v19 → v20 (Final Push)
**Goal**: Get to v20, deploy to staging

**Tech Lead** (Morning):
```bash
ng update @angular/core@20 @angular/cli@20 @angular/material@20 --force
```

**Stream A - Final Build Fixes**:
- Fix v20 breaking changes
- Fix template errors (`{{ in }}` → `{{ this.in }}`)
- Production build must pass

**Stream B - Dependency Verification**:
```bash
./scripts/verify_dependencies.sh 20
./scripts/migration_toolbox.sh check_all
# Fix any remaining issues
```

**Stream C - Test Completion**:
- Fix remaining test failures
- Run full test suite
- Run Playwright visual regression

**Stream D - Deployment**:
```bash
# Build production
npm run build -- --configuration production
# Deploy to staging
# Run smoke tests
```

**End of Day 4 Gate** (MUST PASS):
- [ ] `ng build --configuration production` passes
- [ ] All critical tests passing (>90%)
- [ ] Playwright tests passing
- [ ] Deployed to staging successfully
- [ ] Smoke tests pass

### 4-Day Success Criteria
**Minimum Viable Migration**:
- ✅ Angular 20 running in production
- ✅ Build passes
- ✅ Critical user flows work
- ✅ No console errors

**Deferred to Later** (Don't do these in 4 days):
- ❌ Standalone component migration (can stay NgModule)
- ❌ TypeScript strict mode (can stay loose)
- ❌ Control flow migration (can keep `*ngIf`)
- ❌ Vitest migration (can keep Karma)
- ❌ Full test coverage (70-80% is acceptable)

**Key to Success**:
1. **Use AI heavily** - Don't manually fix 1000 TypeScript errors
2. **Skip optional modernizations** - Focus on "does it build and run?"
3. **Parallel everything** - 4 streams working simultaneously
4. **Accept technical debt** - You can refactor after v20 is stable

---

## 🔮 Phase 4: The Modern Frontier (v18 → v20)
**Goal**: Signals & Zoneless.
**Duration**: 1-2 weeks (or 2 days if using Fast Track above)
**Parallelization**: HIGH

> [!IMPORTANT]
> **Before starting Phase 4, run:**
> ```bash
> ./scripts/backup_before_migration.sh phase4-start
> ./scripts/check_angular_version.sh 20
> ./scripts/verify_dependencies.sh 20
> ./scripts/find_breaking_changes.sh 20
> ```

### 📊 Parallel Execution Matrix - Phase 4 (Standard Track)

**Week 1: Core Upgrades**

| Day | Tech Lead | Stream A (Build) | Stream B (Deps) | Stream C (Tests) | Stream D (Infra) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Mon** | Upgrade to v18 | Fix build errors (AI) | Upgrade ag-grid | Fix test failures (AI) | Update to Node 20 |
| **Tue** | Fix conflicts | Fix HttpClient (AI) | Update Highcharts | Continue test fixes (AI) | Update Dockerfile |
| **Wed** | Upgrade to v19 | Fix build errors (AI) | Verify all deps | Continue test fixes (AI) | Update Azure Pipeline |
| **Thu** | Fix conflicts | Add standalone:false | Test all deps | Continue test fixes (AI) | Test pipeline |
| **Fri** | Upgrade to v20 | Fix build errors (AI) | Final verification | All tests passing | Deploy to dev |

**Week 2: Validation & Polish**

| Day | Tech Lead | All Streams |
| :--- | :--- | :--- |
| **Mon** | Bug fixes | Fix integration issues |
| **Tue** | Performance | Bundle optimization |
| **Wed** | Testing | Full test suite + Playwright |
| **Thu** | Staging | Deploy to staging |
| **Fri** | Production | Production deployment |

### 4.0 Pre-requisites
**Owner**: Tech Lead + Stream D
**Can Start**: Immediately
**Duration**: 1 day
**Blocks**: Core upgrade

*   **Node.js**: Switch to Node 20 (or 22).
    ```bash
    nvm install 20
    nvm use 20
    ```
*   **Verify**: Run `./scripts/check_angular_version.sh 20` to confirm Node/TS compatibility

### 4.1 Upgrade to v18/v19/v20
**Owner**: Tech Lead
**Can Start**: After pre-requisites
**Duration**: 3-5 days (1-2 days per version)
**Blocks**: All other Phase 4 work

Follow standard update paths.
```bash
# Upgrade to v18
ng update @angular/core@18 @angular/cli@18 @angular/material@18 --force

# Upgrade to v19
ng update @angular/core@19 @angular/cli@19 @angular/material@19 --force

# Upgrade to v20
ng update @angular/core@20 @angular/cli@20 @angular/material@20 --force
```

### 🔍 Detailed Migration Guide: v18-v20 Specifics
*   **v18 (Testing)**: `async` is replaced by `waitForAsync`.
*   **v18 (Templates)**: `[(ngModel)]` no longer writes to properties (expressions).
*   **v19 (Standalone Default)**: Components are now **Standalone by default**.
    *   *Action*: If you have legacy NgModule components, you MUST add `standalone: false` to their decorator, or the CLI will try to migrate them.
*   **v20 (Zoneless)**: `provideExperimentalZonelessChangeDetection` is renamed to `provideZonelessChangeDetection`.
*   **v20 (Templates)**:
    *   `{{ in }}` must be `{{ this.in }}`.
    *   `{{ void }}` must be `{{ this.void }}`.
    *   Parentheses are strictly respected (e.g., `(foo?.bar).baz` will throw if `foo` is null).

### 🔍 Detailed Migration Guide: AG Grid (v28 -> v31+)
**Problem**: Major breaking changes. `ColDef` generic removed, CSS classes renamed.
**Solution**:

#### 1. TypeScript Changes (`ColDef`)
*   **Before (v28)**:
    ```typescript
    import { ColDef } from 'ag-grid-community';
    // Generic was optional but common
    public columnDefs: ColDef<MyData>[] = [ ... ];
    ```
*   **After (v31+)**:
    ```typescript
    import { ColDef } from '@ag-grid-community/core'; // Note import path change!
    // Generic is REMOVED
    public columnDefs: ColDef[] = [ ... ];
    ```

#### 2. CSS Changes (The "Unstyled" Grid)
*   **Before**:
    ```html
    <ag-grid-angular class="ag-theme-alpine" ...></ag-grid-angular>
    ```
*   **After**:
    *   Ensure you import the new CSS in `styles.scss`:
        ```scss
        @import "@ag-grid-community/styles/ag-grid.css";
        @import "@ag-grid-community/styles/ag-theme-quartz.css"; // Alpine is legacy
        ```
    *   Update HTML class:
        ```html
        <ag-grid-angular class="ag-theme-quartz" ...></ag-grid-angular>
        ```

### 4.2 Stream A: Build Fixes (PARALLEL - Starts after each upgrade)
**Owner**: Dev A
**Can Start**: After each version upgrade
**Duration**: Ongoing
**AI Usage**: VERY HIGH

**Daily Workflow**:
```bash
# After Tech Lead upgrades Angular version:
npm run build 2>&1 | tee build-errors.txt

# Use AI to fix errors in batches:
# 1. Copy 10-20 errors
# 2. Ask AI: "Fix these TypeScript/Angular errors"
# 3. Apply fixes
# 4. Rebuild
# 5. Repeat
```

### 4.3 Stream B: Dependency Upgrades (PARALLEL)
**Owner**: Dev B
**Can Start**: Day 1
**Duration**: 1 week
**AI Usage**: LOW

**Critical Dependencies**:
1. **AG Grid** (Day 1-3):
   - Upgrade to v31+
   - Fix all grid imports and CSS
   - Test all grids in browser

2. **Highcharts** (Day 2-3):
   - Upgrade to latest
   - Fix any breaking changes

3. **Other Deps** (Day 4-5):
   - Upgrade remaining dependencies
   - Test thoroughly

### 4.4 Modernization Challenges (OPTIONAL - After v20 is stable)
*   **Signals**: Refactor one service to use `signal()`.
*   **Zoneless**: Enable `provideZonelessChangeDetection()`.

### ✅ Phase 4 Validation Checklist
*   [ ] `ng build` passes with Node 20.
*   [ ] `ag-grid` is rendering correctly (Quartz theme).
*   [ ] No `HttpClientModule` imports (using `provideHttpClient`).
*   [ ] At least one component migrated to Standalone (Proof of Concept).
*   [ ] `eslint` is running without errors (Flat Config).
*   [ ] **Run**: `./scripts/migration_toolbox.sh check_all` (must pass)
*   [ ] **Run**: `./scripts/check_deprecated_apis.sh` (all issues resolved)
*   [ ] **Run**: `./scripts/check_zone_flags.sh` (verify Zone.js setup)
*   [ ] **Run**: `./scripts/analyze_bundle.sh` (verify bundle optimization)

### 🔍 Detailed Migration Guide: TypeScript Configuration
**Problem**: `target` and `module` settings for v14 (ES2020) are too old for v17+.
**Solution**:
*   **Phase 2 (v16)**: Update `tsconfig.json`:
    ```json
    "target": "es2022",
    "module": "es2022",
    "useDefineForClassFields": false // Important for legacy decorators
    ```
*   **Phase 4 (v18+)**:
    ```json
    "target": "ES2022", // or ESNext
    "module": "ESNext"
    ```

### 🔍 Detailed Migration Guide: Protractor -> Playwright
**Problem**: `angular.json` uses `@angular-devkit/build-angular:protractor`, which is deprecated.
**Solution**:
1.  **Remove**: Delete the `e2e` project from `angular.json`.
2.  **Uninstall**: `npm uninstall protractor`.
3.  **Install Playwright**: (See Phase 0).
4.  **Migrate Tests**: Manually rewrite `e2e/src/*.po.ts` (Page Objects) to Playwright Page Models.

### 🔍 Detailed Migration Guide: Build Budgets
**Problem**: `angular.json` has strict budgets (8mb initial).
**Observation**: Your initial bundle is huge (8mb!).

> [!TIP]
> **Analyze bundle size:**
> ```bash
> ./scripts/analyze_bundle.sh
> ```
> This script checks bundle sizes against budgets and provides optimization tips.

**Solution**:
*   **Short Term**: Increase budgets in `angular.json` to avoid build failures during migration.
    ```json
    "maximumWarning": "10mb",
    "maximumError": "14mb"
    ```
*   **Long Term**: Use `source-map-explorer` to analyze why `main.js` is 8mb. (Likely `moment`, `lodash`, or `ag-grid` full bundles).
*   **Monitor**: Run `./scripts/analyze_bundle.sh` after each phase to track bundle size changes.

### 🔍 Detailed Migration Guide: Project Files
Based on your specific configuration, here are the exact steps:

#### 1. `src/polyfills.ts` (Critical Performance Flags)
**Observation**: You have custom Zone.js flags (lines 34-36) disabling `requestAnimationFrame` and `on_property` patching.
**Risk**: If you just delete `polyfills.ts` (as is common in v15+), you will **lose these optimizations**, causing massive performance degradation.

> [!TIP]
> **Use the Zone.js flags checker:**
> ```bash
> ./scripts/check_zone_flags.sh
> ```
> This script will verify if `zone-flags.ts` exists and is properly imported.

**Action**:
1.  Create a new file `src/zone-flags.ts`.
2.  Move lines 34-41 from `polyfills.ts` to `zone-flags.ts`.
3.  Import this file in `src/main.ts` **before** `import 'zone.js';`.
    ```typescript
    // src/main.ts
    import './zone-flags'; // <--- Add this FIRST
    import 'zone.js';      // <--- Then this
    import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
    // ...
    ```
4.  **Verify**: Run `./scripts/check_zone_flags.sh` to confirm migration is correct.

#### 2. `nginx.conf` & Deployment
**Observation**: Your `nginx.conf` is the main config, which includes `/etc/nginx/conf.d/*.conf`.
**Action**:
*   The `root` directive is likely in `default.conf.template` (seen in your file list).
*   **Task**: Open `default.conf.template` and ensure the path matches the new Angular 17+ build output.
    *   *Old*: `root /usr/share/nginx/html/msp-multisnap;`
    *   *New (v17+)*: `root /usr/share/nginx/html/msp-multisnap/browser;` (Check your `dist` folder after build!).

#### 3. `src/app/app.module.ts`
**Observation**: Standard NgModule setup.
**Action**:
*   **Phase 1-4**: Keep `app.module.ts` as is. It is fully supported in v20.
*   **Phase 5 (Modernization)**: Convert to `bootstrapApplication` in `main.ts` and remove `AppModule` only *after* the upgrade is stable.

---

### 🔍 Detailed Migration Guide: Project Structure & Deployment
**Observation**:
*   **CI/CD**: You use Azure Pipelines (`azure-pipelines-slz.yml`).
*   **Container**: You use `Dockerfile` and `nginx.conf`.

**Action Items**:
1.  **Nginx Config**: Angular 17+ (Vite/Esbuild) *might* change the output directory structure (e.g., `dist/msp-multisnap/browser` vs `dist/msp-multisnap`).
    *   *Task*: Verify `nginx.conf` `root` directive matches the new build output location after upgrading to v17.
2.  **Azure Pipelines**:
    *   Ensure the build agent uses Node 18+ (for Angular 15-17) and Node 20+ (for Angular 18+).
    *   Update `azure-pipelines-slz.yml`:
        ```yaml
        - task: NodeTool@0
          inputs:
            versionSpec: '20.x' # Update this!
        ```

---

## 📊 Full Dependency Audit
> [!IMPORTANT]
> A complete, line-by-line audit of all 50+ dependencies is available in a separate document.
> 👉 **[View Dependency Audit](dependency_audit.md)**

---

## 📦 Dependency Matrix (Reference)

| Angular Version | Node.js | TypeScript | RxJS | AG Grid |
| :--- | :--- | :--- | :--- | :--- |
| **v14** | 14/16 | 4.6 | 7.5 | v28 |
| **v15** | 14/16/18 | 4.8 | 7.5 | v29 |
| **v16** | 16/18 | 4.9/5.0 | 7.5 | v30 |
| **v17** | 18.13+ | 5.2 | 7.8 | v31 |
| **v18** | 18.19+ | 5.4 | 7.8 | v31+ |
| **v20** | 20/22 | 5.6+ | 7.8+ | v32+ |

### 4.3 Detailed Migration Guide: Unit Testing (Karma → Vitest)
**Problem**: Karma is deprecated. `ng test` is slow.
**Solution**: Migrate to **Vitest** (faster, better ESM support, works great with Angular).

1.  **Uninstall Karma**:
    ```bash
    npm uninstall karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter @types/jasmine jasmine-core
    ```

2.  **Install Vitest + Angular support**:
    ```bash
    npm install --save-dev vitest @vitest/ui @angular/build-tooling jsdom
    ```

3.  **Create `vitest.config.ts`** in project root:
    ```typescript
    import { defineConfig } from 'vitest/config';
    import angular from '@analogjs/vite-plugin-angular';

    export default defineConfig({
      plugins: [angular()],
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['src/test-setup.ts'],
        include: ['**/*.spec.ts'],
        coverage: {
          provider: 'v8',
          reporter: ['text', 'json', 'html'],
          exclude: ['node_modules/', 'src/test-setup.ts']
        }
      }
    });
    ```

4.  **Create `src/test-setup.ts`**:
    ```typescript
    import 'zone.js';
    import 'zone.js/testing';
    import { getTestBed } from '@angular/core/testing';
    import {
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting
    } from '@angular/platform-browser-dynamic/testing';

    getTestBed().initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
    ```

5.  **Update `package.json` scripts**:
    ```json
    "scripts": {
      "test": "vitest run",
      "test:watch": "vitest",
      "test:ui": "vitest --ui",
      "test:coverage": "vitest run --coverage"
    }
    ```

6.  **Update test files** (minimal changes needed):
    - Vitest uses Jasmine-compatible syntax (`describe`, `it`, `expect`)
    - Most tests work without changes
    - For async tests, use `async/await` (already supported)

**Benefits of Vitest**:
- ⚡ 10x faster than Karma
- 🔥 Hot Module Replacement (HMR) for tests
- 📊 Beautiful UI with `--ui` flag
- 🎯 Better TypeScript support
- 🚀 Works with ESM out of the box


### 4.4 Detailed Migration Guide: HTTP Client
**Problem**: `HttpClientModule` is deprecated in v18+.
**Solution**: Use `provideHttpClient`.
*   **Before (`app.module.ts`)**:
    ```typescript
    imports: [ HttpClientModule ]
    ```
*   **After (`app.module.ts` or `app.config.ts`)**:
    ```typescript
    import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
    
    providers: [
      provideHttpClient(withInterceptorsFromDi()) // Maintains legacy interceptors
    ]
    ```

### 4.5 Detailed Migration Guide: Standalone Components
**Goal**: Remove `NgModule` entirely (Optional but recommended).
**Steps**:
1.  **Run Schematic**:
    ```bash
    ng generate @angular/core:standalone
    ```
2.  **Select Mode**:
    *   `Convert all components, directives and pipes to standalone`
3.  **Bootstrap**:
    *   The schematic will attempt to convert `main.ts` to `bootstrapApplication`.
    *   *Manual Fix*: You might need to move `providers` from `app.module.ts` to `main.ts`.

---

### 4.6 Detailed Migration Guide: Library-Specifics
**Goal**: Upgrade 3rd party libs without breaking the app.

#### 1. Highcharts (`highcharts-angular`)
*   **Problem**: v11+ changes default styling and accessibility.
*   **Action**:
    *   Upgrade: `npm install highcharts@11 highcharts-angular@4`.
    *   **Breaking**: `chart.style` is deprecated. Use CSS variables.
    *   **Breaking**: Accessibility module is now enabled by default. If charts look "weird" (extra borders), check accessibility settings.

#### 2. D3 (`d3-scale`, `d3-shape`)
*   **Problem**: v7 uses ES Modules exclusively.
*   **Action**:
    *   If you get `Error: require() of ES Module`, you must:
        1.  Convert your consuming files to ESM.
        2.  OR use `d3` v5/v6 (legacy).
        3.  OR use dynamic imports: `const d3 = await import('d3-shape');`

#### 3. Ngx-Translate
*   **Problem**: `forRoot` config changes in Standalone.
*   **Action**:
    *   **Before (NgModule)**:
        ```typescript
        TranslateModule.forRoot({ ... })
        ```
    *   **After (Standalone)**:
        ```typescript
        import { provideTranslateService, TranslateLoader } from "@ngx-translate/core";
        providers: [
          provideTranslateService({
            loader: { provide: TranslateLoader, ... }
          })
        ]
        ```

---

## 🛡️ The "Strict" Mode Gauntlet (TypeScript)
**Goal**: Enable `strict: true` in `tsconfig.json` (Required for modern Angular).

> [!TIP]
> **Check strict mode readiness:**
> ```bash
> ./scripts/check_typescript_strict.sh
> ```
> This script analyzes your codebase and provides a readiness report.

**Strategy**: Do not turn it on all at once. You will get 5,000+ errors.

1.  **`noImplicitAny`**: The biggest hurdle.
    *   *Fix*: Explicitly type everything. Use `any` only if desperate.
2.  **`strictNullChecks`**:
    *   *Fix*: Handle `null` and `undefined`.
    *   *Tip*: Use Optional Chaining (`?.`) and Nullish Coalescing (`??`).
3.  **`strictPropertyInitialization`**:
    *   *Fix*: Initialize properties in the constructor or use `!:` (definite assignment assertion).
    *   *Example*: `name!: string;` (I promise this will be set).

---

---

## ⚡ Phase 5: Performance & Polish (v17+)
**Goal**: Crush that 8MB bundle size using modern Angular features.

### 5.1 Deferrable Views (`@defer`)
**Problem**: Large components (like Charts, Grids) load upfront, slowing down LCP.
**Solution**: Use `@defer` to lazy-load them *without* routing.
*   **Before**:
    ```html
    <app-heavy-chart [data]="data"></app-heavy-chart>
    ```
*   **After**:
    ```html
    @defer (on viewport) {
      <app-heavy-chart [data]="data"></app-heavy-chart>
    } @placeholder {
      <div>Loading Chart...</div>
    }
    ```

### 5.2 Image Optimization (`NgOptimizedImage`)
**Problem**: Large images cause layout shifts (CLS).
**Solution**: Use `ngSrc`.
*   **Action**:
    1.  Import `NgOptimizedImage`.
    2.  Replace `src` with `ngSrc`.
    ```html
    <img ngSrc="logo.png" width="200" height="100" priority />
    ```

### 5.3 MDC Accessibility Audit
**Problem**: Material v15+ enforces strict a11y (contrast, touch targets).
**Checklist**:
*   [ ] **Touch Targets**: Buttons must be 48x48px. If your layout breaks, use density scaling:
    ```scss
    @include mat.button-density(-1); // Compact mode
    ```
*   [ ] **Contrast**: MDC colors are slightly different. Run Lighthouse to verify text contrast.
*   [ ] **Dialogs**: Ensure all dialogs have `aria-label` or `aria-labelledby`.

### ✅ Phase 5 Validation Checklist
*   [ ] Bundle size analysis shows reduction (check `source-map-explorer`).
*   [ ] Lighthouse Accessibility score is >90.
*   [ ] No legacy polyfills (`zone-flags.ts` is clean).
*   [ ] CI/CD pipeline is green with Node 20.

---

## 🧹 Post-Migration Cleanup Checklist
**Goal**: Remove the scaffolding used during the upgrade.

1.  **Remove "Any" Types**: Run `npx type-coverage` to find where you cheated with `any`.
2.  **Delete Legacy Configs**:
    *   Remove `zone-flags.ts` (if you moved to Zoneless).
    *   Remove `test.ts` (if you moved to Jest).
    *   Remove `karma.conf.js`.
3.  **Update CI/CD**:
    *   Remove the `migration/v15` branch protection rules.
    *   Merge `migration/v20` to `main`.
4.  **Celebrate**: You just saved the company ~6 months of rewrite time.

---

## 👥 Team Execution Strategy
**Goal**: Parallelize the work to reduce downtime.

| Role | Responsibility | Phase |
| :--- | :--- | :--- |
| **Tech Lead** | Core upgrades (`ng update`), `package.json` management, CI/CD updates. | All |
| **Dev A** | **Visual Regression**: Setup Playwright, run baselines, verify UI after each phase. | Phase 0-4 |
| **Dev B** | **Component Audit**: Fix `ag-grid` breaking changes, migrate `Material` styles. | Phase 2 & 4 |
| **Dev C** | **Logic & Tests**: Fix RxJS `toPromise`, migrate Protractor to Playwright, fix Unit Tests. | Phase 3 |

---

## 🧠 Deep Code Dive: Niche Breaking Changes
> [!WARNING]
> These are less common but can silently break your app.

### 1. `RouterOutlet` Instantiation (v15)
*   **Change**: `RouterOutlet` now instantiates components *after* change detection.
*   **Impact**: Tests that rely on component instantiation order might fail.
*   **Fix**: Use `await fixture.whenStable()` in tests before asserting component existence.

### 2. `TransferState` & `makeStateKey` (v16)
*   **Change**: Moved from `@angular/platform-browser` to `@angular/core`.
*   **Fix**: Update imports.
    ```typescript
    // Before
    import { TransferState, makeStateKey } from '@angular/platform-browser';
    // After
    import { TransferState, makeStateKey } from '@angular/core';
    ```

### 3. `Router` Error Handling (v17)
*   **Change**: `malformedUriErrorHandler` is removed.
*   **Fix**: Handle URL parsing errors in `UrlSerializer.parse` directly.

### 4. `NgSwitch` Equality (v17)
*   **Change**: Uses `===` instead of `==`.
*   **Impact**: `1` (number) will no longer match `'1'` (string).
*   **Fix**: Ensure types match in templates or use a pipe to convert.

---

## 🛠️ Detailed Migration Guide: ESLint (v18+)
**Problem**: `tslint` is dead. `eslint` v9 uses "Flat Config" (`eslint.config.js`), breaking old `.eslintrc.json`.
**Solution**:
1.  **Install Angular ESLint**:
    ```bash
    ng add @angular-eslint/schematics
    ```
2.  **Migrate to Flat Config** (if prompted or manually):
    *   Delete `.eslintrc.json`.
    *   Create `eslint.config.js`.
    *   Use `angular-eslint` presets.
    ```javascript
    // eslint.config.js
    const angular = require('angular-eslint');
    module.exports = [
      ...angular.configs.tsRecommended,
      ...angular.configs.templateRecommended,
    ];
    ```

---

---

## 🤖 AI-Assisted Migration Strategy
**Tool Available**: VS Code Agent Mode (Gemini/Claude)
**Approach**: Combine automated scripts + AI assistance for intelligent refactoring.

### 1. The "AI-First, Script-Second" Rule
Leverage VS Code agent mode for complex refactoring, use scripts for verification.

**When to Use AI Agent:**
*   **Complex Type Migrations**: Converting `any` to proper types
*   **Component Refactoring**: Converting to Standalone components
*   **Template Migrations**: Converting `*ngIf` to `@if` with complex logic
*   **Test Modernization**: Migrating Karma tests to Vitest
*   **Breaking Change Fixes**: Understanding and fixing cryptic Angular errors

**When to Use Scripts:**
*   **Verification**: Always run scripts to verify AI changes
*   **Bulk Detection**: Finding all instances of deprecated code
*   **Status Tracking**: Monitoring migration progress
*   **Safety Checks**: Pre/post migration validation

### 2. AI-Assisted Test Migration
With VS Code agent mode, test migration becomes feasible:
1.  **Phase 3**: Start migrating tests to Vitest using AI assistance
2.  **AI Prompt Template**:
    ```
    Convert this Karma/Jasmine test to Vitest. Preserve all test logic.
    Update imports, use Vitest matchers, handle async properly.
    ```
3.  **Verify**: Run `npm test` after each batch of conversions

### 3. Parallel Workstreams (AI-Enhanced)
Maximize team efficiency with parallel execution and AI assistance.

| Stream | Owner | Parallel Tasks | AI Agent Usage |
| :--- | :--- | :--- | :--- |
| **A: Type Safety** | Dev A | **Strict Mode Migration**<br>- Enable `strict: true` incrementally<br>- Fix `noImplicitAny` errors<br>- Add proper type annotations | **HIGH**: AI helps infer complex types, suggest proper interfaces |
| **B: Component Modernization** | Dev B | **Standalone Migration**<br>- Convert components to standalone<br>- Update imports/providers<br>- Refactor modules | **HIGH**: AI automates import management, provider migration |
| **C: Template Migration** | Dev C | **Control Flow Migration**<br>- Convert `*ngIf` to `@if`<br>- Convert `*ngFor` to `@for`<br>- Update complex templates | **MEDIUM**: AI handles complex nested logic, preserves behavior |
| **D: Test Modernization** | Dev D | **Test Migration**<br>- Migrate Karma to Vitest<br>- Update test syntax<br>- Fix broken tests | **HIGH**: AI converts test syntax, updates mocks/spies |
| **E: Infrastructure** | Dev E | **CI/CD & Deployment**<br>- Update Dockerfiles (Node 18/20)<br>- Update Azure Pipelines<br>- Configure new build tools | **LOW**: Mostly manual, AI for troubleshooting |

### 4. Parallel Execution Timeline

```
Week 1-2: Preparation (All teams work in parallel on v15 branch)
├─ Stream A: Run strict mode analysis, create type inventory
├─ Stream B: Audit components, identify standalone candidates  
├─ Stream C: Scan templates, estimate migration effort
├─ Stream D: Set up Vitest, create test migration plan
└─ Stream E: Prepare Node 18/20 environments

Week 3-4: Phase 3 Execution (v15 → v17)
├─ Tech Lead: Run ng update @angular/core@16, @17
├─ Stream A: Fix TypeScript errors (AI-assisted)
├─ Stream B: Start standalone migration (AI-assisted)
├─ Stream C: Migrate templates (AI-assisted)
├─ Stream D: Migrate tests (AI-assisted)
└─ Stream E: Update CI/CD for v17

Week 5-6: Phase 4 Execution (v17 → v20)
├─ Tech Lead: Run ng update @angular/core@18, @19, @20
├─ Stream A: Enable full strict mode
├─ Stream B: Complete standalone migration
├─ Stream C: Optimize with @defer
├─ Stream D: Complete test migration
└─ Stream E: Deploy to staging
```

### 5. AI Agent Prompt Templates (Copy-Paste Ready)

#### **Type Safety Migration (Stream A)**
```
Task: Convert this file to use strict TypeScript types.

Requirements:
- Replace all `: any` with proper types
- Add return types to all functions
- Fix noImplicitAny errors
- Use proper generics where applicable
- Preserve all existing functionality

File: [paste file content]
```

#### **Standalone Component Migration (Stream B)**
```
Task: Convert this NgModule component to standalone.

Requirements:
- Add standalone: true to @Component
- Move all imports from NgModule to component imports array
- Update all providers
- Remove from NgModule declarations
- Verify all dependencies are imported

Component: [paste component]
NgModule: [paste module]
```

#### **Template Control Flow Migration (Stream C)**
```
Task: Convert this template from legacy to new control flow syntax.

Requirements:
- Convert *ngIf to @if/@else
- Convert *ngFor to @for
- Convert *ngSwitch to @switch
- Preserve all existing logic and bindings
- Handle trackBy functions properly

Template: [paste template]
```

#### **Test Migration (Stream D)**
```
Task: Convert this Karma/Jasmine test to Vitest.

Requirements:
- Update imports (jasmine → vitest)
- Convert beforeEach/afterEach to Vitest syntax
- Update matchers (expect().toBe → expect().toBe)
- Handle async/await properly (fakeAsync → vitest timers)
- Preserve all test logic and assertions

Test file: [paste test]
```

### 6. Daily Team Coordination Workflow

**Morning Standup (15 min)**
1. Each stream reports: Yesterday's progress, Today's plan, Blockers
2. Tech Lead announces: Current Angular version, Build status, Critical issues
3. Review: Script check results from overnight CI runs

**Midday Sync (5 min - Slack)**
- Post script results: `./scripts/migration_toolbox.sh check_all`
- Share AI prompt successes/failures
- Quick blocker resolution

**End of Day (10 min)**
1. Each stream commits work to feature branch
2. Run verification: `./scripts/migration_status.sh`
3. Update shared "Gotcha" doc with learnings
4. Push to trigger CI checks overnight

### 7. Stream-Specific AI Workflows

#### **Stream A: Type Safety** (AI-Heavy)
```bash
# 1. Find files with 'any' types
./scripts/check_typescript_strict.sh

# 2. For each file with high 'any' count:
#    - Open in VS Code
#    - Select all code
#    - Ask AI: "Convert to strict types"
#    - Review AI changes
#    - Run: npm run build

# 3. Verify daily progress
grep -r ": any" src/app | wc -l  # Track this number going DOWN
```

#### **Stream B: Standalone Migration** (AI-Heavy)
```bash
# 1. Generate list of components
find src/app -name "*.component.ts" > components.txt

# 2. For each component:
#    - Open component + its module
#    - Ask AI: "Convert to standalone"
#    - Verify imports are correct
#    - Run: ng serve (check for errors)

# 3. Verify progress
./scripts/migration_status.sh
```

#### **Stream C: Template Migration** (AI-Medium)
```bash
# 1. Find templates with old syntax
./scripts/check_control_flow.sh

# 2. For complex templates:
#    - Ask AI to convert
#    - For simple templates: Use CLI schematic
#    - Run: ng generate @angular/core:control-flow

# 3. Verify
./scripts/check_control_flow.sh  # Check progress %
```

#### **Stream D: Test Migration** (AI-Heavy)
```bash
# 1. Set up Vitest (one-time)
npm install --save-dev vitest @vitest/ui @vitest/coverage-v8

# 2. Migrate tests in batches of 10:
#    - Select 10 test files
#    - Ask AI to convert each
#    - Run: npm test
#    - Fix failures

# 3. Track progress
find src -name "*.spec.ts" | wc -l  # Total
git grep "import.*jasmine" | wc -l  # Remaining Jasmine
```

#### **Stream E: Infrastructure** (AI-Low, Script-Heavy)
```bash
# 1. Update Dockerfile
# AI Prompt: "Update this Dockerfile from Node 16 to Node 20"

# 2. Update Azure Pipelines
# AI Prompt: "Update this pipeline to use Node 20 and Angular 17"

# 3. Test locally
docker build -t test-migration .
docker run test-migration npm run build
```

### 8. Conflict Resolution Strategy

**When Streams Conflict:**
- **Stream A + B**: Type changes may break component imports
  - **Solution**: Stream A commits first, Stream B pulls and resolves
- **Stream C + D**: Template changes may break tests
  - **Solution**: Stream C updates templates, Stream D updates tests same day
- **All Streams**: Merge conflicts on `package.json`, `tsconfig.json`
  - **Solution**: Tech Lead owns these files, streams request changes via PR

**Merge Order (End of Each Phase):**
1. Stream E (Infrastructure) - merges first
2. Stream A (Types) - merges second
3. Stream B (Components) - merges third
4. Stream C (Templates) - merges fourth
**Merge Order (End of Each Phase):**
1. Stream E (Infrastructure) - merges first
2. Stream A (Types) - merges second
3. Stream B (Components) - merges third
4. Stream C (Templates) - merges fourth
5. Stream D (Tests) - merges last (validates everything)

### 9. Risk Mitigation & Rollback Strategy

**Branch Strategy for Parallel Work:**
```
main
└─ migration/v17 (Tech Lead's integration branch)
   ├─ stream-a/type-safety (Dev A's work)
   ├─ stream-b/standalone (Dev B's work)
   ├─ stream-c/templates (Dev C's work)
   ├─ stream-d/tests (Dev D's work)
   └─ stream-e/infra (Dev E's work)
```

**Daily Integration:**
- Each stream merges to `migration/v17` at end of day
- Tech Lead resolves conflicts
- CI runs full test suite overnight
- If CI fails: Identify culprit stream, rollback that stream only

**Rollback Procedure:**
```bash
# If Stream B broke the build:
git revert <stream-b-merge-commit>
# Stream B fixes issue on their branch
# Re-merge when fixed
```

**Safety Checkpoints (Must Pass Before Proceeding):**
- [ ] All 5 streams merged successfully
- [ ] `./scripts/migration_toolbox.sh check_all` passes
- [ ] `npm run build` succeeds
- [ ] `npm test` passes (>80% tests passing)
- [ ] Playwright visual regression passes
- [ ] Manual smoke test of critical paths

### 10. Success Metrics & Progress Tracking

**Track Daily (Automated via Scripts):**
| Metric | Script | Target |
| :--- | :--- | :--- |
| Legacy Material Count | `./scripts/migration_toolbox.sh legacy` | 0 |
| `toPromise()` Count | `./scripts/migration_toolbox.sh rxjs` | 0 |
| `any` Type Count | `./scripts/check_typescript_strict.sh` | <500 (from ~5000) |
| Control Flow Progress | `./scripts/check_control_flow.sh` | 100% |
| Standalone Components | `./scripts/migration_status.sh` | 100% |
| Vitest Test Coverage | `npm test -- --coverage` | >80% |
| Bundle Size | `./scripts/analyze_bundle.sh` | <6MB (from 8MB) |

**Weekly Team Report (Auto-generated):**
```bash
# Run this every Friday
./scripts/migration_status.sh > weekly-report.md
# Review in team meeting
```

**Phase Completion Criteria:**
- **Phase 3 (v17) Complete When:**
  - Angular version: 17.x
  - Control flow: 100% migrated
  - Tests: >80% passing
  - Build: Green
  - Playwright: Green

- **Phase 4 (v20) Complete When:**
  - Angular version: 20.x
  - Standalone: 100% migrated
  - TypeScript: `strict: true` enabled
  - Bundle: <6MB
  - All tests: Green
  - Production deployment: Successful

### 4. The "War Room" Protocol (Knowledge Sharing)
Without AI to answer questions, the team must share knowledge instantly.
*   **Daily 15min Standup**: Specific to migration blockers.
*   **The "Gotcha" Doc**: A shared markdown file where every developer MUST log:
    *   "I saw error X."
    *   "I fixed it by doing Y."
    *   *Why*: Prevents Dev B from spending 4 hours solving what Dev A solved yesterday.

### 5. Manual Verification Scripts (The "Poor Man's AI")
We have prepared a comprehensive **Migration Scripts Toolbox** to automate verification and analysis.

> [!TIP]
> All scripts are in the `scripts/` directory. Make them executable with `chmod +x scripts/*.sh` if needed.

---

## 🛠️ **Complete Scripts Reference**

### **Pre-Migration Scripts** (Run Before Starting)

| Script | Purpose | Usage |
| :--- | :--- | :--- |
| **`pre_migration_check.sh`** | 🛡️ **Run this first!** Comprehensive pre-migration safety check | `./scripts/pre_migration_check.sh [target_version]` |
| **`backup_before_migration.sh`** | 💾 Create backup before migration | `./scripts/backup_before_migration.sh [backup_name]` |
| **`check_angular_version.sh`** | 🔍 Verify Angular/Node/TypeScript versions | `./scripts/check_angular_version.sh [target_version]` |
| **`verify_dependencies.sh`** | ✅ Check dependency compatibility | `./scripts/verify_dependencies.sh [target_version]` |
| **`find_breaking_changes.sh`** | 🔍 Scan for breaking changes by version | `./scripts/find_breaking_changes.sh [target_version]` |

### **Core Migration Scripts** (Run During Migration)

| Script | Purpose | Usage |
| :--- | :--- | :--- |
| **`migration_toolbox.sh`** | 🔧 **Core migration checks** (Legacy Material, RxJS, Strict Mode, Deps) | `./scripts/migration_toolbox.sh check_all`<br>`./scripts/migration_toolbox.sh legacy`<br>`./scripts/migration_toolbox.sh rxjs`<br>`./scripts/migration_toolbox.sh strict`<br>`./scripts/migration_toolbox.sh deps` |
| **`check_deprecated_apis.sh`** | 🔍 Find deprecated Angular APIs in codebase | `./scripts/check_deprecated_apis.sh` |
| **`check_typescript_strict.sh`** | 🔍 Check TypeScript strict mode readiness | `./scripts/check_typescript_strict.sh` |
| **`check_zone_flags.sh`** | 🔍 Verify Zone.js flags migration status | `./scripts/check_zone_flags.sh` |
| **`check_control_flow.sh`** | 🔍 Check control flow migration progress | `./scripts/check_control_flow.sh` |

### **Build & Analysis Scripts** (Run After Each Phase)

| Script | Purpose | Usage |
| :--- | :--- | :--- |
| **`verify_build.sh`** | ✅ Verify build after migration | `./scripts/verify_build.sh [build_config]` |
| **`analyze_bundle.sh`** | 📊 Analyze bundle size & check budgets | `./scripts/analyze_bundle.sh [dist_dir]` |
| **`migration_status.sh`** | 📊 Generate comprehensive migration status report | `./scripts/migration_status.sh` |

---

### **Quick Workflow Examples**

#### **Before Starting Migration:**
```bash
# 1. Run comprehensive pre-migration check
./scripts/pre_migration_check.sh 20

# 2. Create backup
./scripts/backup_before_migration.sh pre-v17-upgrade

# 3. Check current state
./scripts/migration_status.sh
```

#### **During Each Phase:**
```bash
# After upgrading Angular version
./scripts/migration_toolbox.sh check_all
./scripts/check_deprecated_apis.sh
./scripts/verify_build.sh production
./scripts/analyze_bundle.sh
```

#### **Before Proceeding to Next Phase:**
```bash
# Must pass all checks
./scripts/migration_toolbox.sh check_all
./scripts/check_angular_version.sh 17
./scripts/find_breaking_changes.sh 17
./scripts/migration_status.sh
```

---

### **What Each Script Checks**

#### **`migration_toolbox.sh`** (Core Checks)
*   **Legacy Material**: Scans for `MatLegacy` imports
*   **RxJS**: Scans for deprecated `toPromise()` calls
*   **Strict Mode**: Counts `any` types (track progress)
*   **Forbidden Deps**: Checks for `ngx-perfect-scrollbar`, `karma`, `protractor`

#### **`pre_migration_check.sh`** (Comprehensive Safety Check)
Runs all critical checks in one command:
*   Angular version compatibility
*   Dependency verification
*   Migration toolbox checks
*   Deprecated APIs scan
*   TypeScript strict mode
*   Zone.js flags migration
*   Breaking changes scan

#### **`migration_status.sh`** (Status Report)
Generates a comprehensive report showing:
*   Current Angular version
*   Phase completion status (Playwright, MDC, Control Flow, Standalone)
*   Dependency status
*   Configuration status (TypeScript, Node.js)
*   Build status
*   Next steps

#### **`check_control_flow.sh`** (Control Flow Migration)
*   Counts legacy `*ngIf`, `*ngFor`, `*ngSwitch`
*   Counts new `@if`, `@for`, `@switch`
*   Shows migration progress percentage
*   Provides migration command

#### **`verify_build.sh`** (Build Verification)
*   Checks Node.js and Angular versions
*   Runs production build
*   Analyzes build output
*   Checks for warnings/errors
*   Runs bundle analysis

---

### **Integration with CI/CD**

Add these scripts to your CI/CD pipeline:

```yaml
# Example: GitHub Actions
- name: Pre-Migration Check
  run: ./scripts/pre_migration_check.sh 20

- name: Migration Toolbox
  run: ./scripts/migration_toolbox.sh check_all

- name: Verify Build
  run: ./scripts/verify_build.sh production
```

---

## 🆘 Emergency Commands
*   **Reset**: `git reset --hard HEAD` (If you get lost).
*   **Nuke Node Modules**: `rm -rf node_modules && npm install`.
*   **Ignore Peer Deps**: `npm install --legacy-peer-deps` (Use only as a last resort).

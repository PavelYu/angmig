# ⚡ 4-Day Angular Migration Plan: v14 → v20

**Mission**: Complete Angular migration in 4 days with clear day-by-day tasks, prerequisites, deliverables, dependencies, and agent assignments.

---

## 👥 Team Structure

### Dev Team Lead (1 person - Solo)
**Role**: Strategic oversight, coordination, conflict resolution, upgrades

**Responsibilities**:
- Run `ng update` commands for version upgrades
- Resolve merge conflicts
- Make architectural decisions
- Coordinate between sub-teams and AQA team
- Monitor overall progress
- Handle blockers
- Final code review and approval

**Agents Used**: `@ArchitectureReviewer`, `@CodeReviewer`

---

### Dev Sub-Teams

#### Sub-Team Alpha (Frontend Focus)
| Role | Person | Primary Responsibility | Agent | Stream |
|------|--------|----------------------|-------|--------|
| **Dev A1** | Dev A1 | Build fixes, TypeScript errors, RxJS migration | `@BuildFixer` | Stream A |
| **Dev A2** | Dev A2 | Component fixes, templates, Material MDC | `@CodeModernizer`, `@StyleMigrator` | Stream A |
| **Dev A3** | Dev A3 | UI libraries (AG Grid), styling, Material theming | `@StyleMigrator` | Stream A |

#### Sub-Team Beta (Backend & Infrastructure)
| Role | Person | Primary Responsibility | Agent | Stream |
|------|--------|----------------------|-------|--------|
| **Dev B1** | Dev B1 | Services, HTTP, guards, interceptors, state management | `@LogicRefactorer` | Stream B |
| **Dev B2** | Dev B2 | Dependency upgrades, package compatibility, replacements | `@DependencyAuditor` | Stream B |
| **Dev B3** | Dev B3 | Infrastructure, Node.js, CI/CD, deployment, performance | `@InfraPerfOptimizer` | Stream D |

---

### AQA Team (Testing & Quality)
| Role | Person | Primary Responsibility | Agent | Stream |
|------|--------|----------------------|-------|--------|
| **AQA 1** | AQA 1 | Unit test fixes, coverage (keep Karma for hackathon) | `@UnitTestMigrator` | Stream C |
| **AQA 2** | AQA 2 | E2E test migration (Protractor→Playwright), visual regression | `@E2ETestMigrator` | Stream C |

> [!IMPORTANT]
> **AQA Team Independence**: AQA team works independently of Angular version state. They can start test migration immediately and work in parallel with dev team.

> [!NOTE]
> **Hackathon Scope**: We're NOT migrating to standalone components or Vitest. Focus on getting to v20 with NgModules and Karma.

---

## 🚀 Pre-Migration Setup (Do Before Day 1)

> [!CRITICAL]
> **BULLETPROOF PREREQUISITES** - These checks MUST pass before starting migration:
> 1. ✅ **Version Verification** - Check actual Angular version (may differ from plan assumption)
> 2. ✅ **Git Repository Clean** - Required for `ng update` commands
> 3. ✅ **Node.js Version** - Must match Angular requirements
> 4. ✅ **Build Verification** - Current build must pass
> 5. ✅ **Dependency Audit** - Identify deprecated/incompatible packages
> 6. ✅ **Playwright Baseline** - Visual regression baseline captured

### Prerequisites Checklist
- [ ] **Zed Editor installed** (`brew install --cask zed`)
- [ ] **MCP servers configured** (see `../setup/zed-mcp-setup.md`)
  - Angular MCP server
  - Playwright MCP server (optional but recommended)
  - Context7 MCP server (optional but recommended)
- [ ] **Git repository clean** (`git status` shows no uncommitted changes)
- [ ] **Current build passes** (`npm run build`)
- [ ] **Node.js 18+ installed** (`node --version`)
- [ ] **Backup created** (`./scripts/backup_before_migration.sh v15-baseline`)
- [ ] **Team members assigned** to sub-teams and streams
- [ ] **Version verified** (`npm list @angular/core --depth=0` - may be v14, not v15!)
- [ ] **Polyfills checked** (`ls -la src/polyfills.ts` - v14 requires this file)
- [ ] **Dependencies audited** (`./scripts/verify_dependencies.sh 20`)

### Pre-Migration Scripts
```bash
# Run comprehensive pre-migration check
./scripts/pre_migration_check.sh 20

# Create backup
./scripts/backup_before_migration.sh pre-hackathon-baseline

# Check current state
./scripts/migration_status.sh

# Verify dependencies
./scripts/verify_dependencies.sh 20
```

### Setup Time: 30-60 minutes

---

## 📅 DAY 1: v14 Verification → v15 → v16 (Foundation)

### Prerequisites (Before Starting)
- [x] Pre-migration setup complete
- [ ] Current Angular version verified: `ng version` (may be v14.x or v15.x)
- [ ] Git branch created: `git checkout -b migration/day1-v16`
- [ ] All team members ready

> [!CRITICAL]
> **Day 1 starts with v14 verification** - We must ensure v14 migration is complete before upgrading to v15!

### v14 Verification Checklist (First Hour)

**If your app is on v14.x, verify these before upgrading to v15:**

| Check | Command | Success Criteria | Team | Agent |
|-------|---------|------------------|------|-------|
| **Version Check** | `npm list @angular/core --depth=0` | Shows v14.x.x | Dev Team Lead | - |
| **Build Status** | `npm run build` | Build passes with 0 errors | Dev A1 | `@BuildFixer` |
| **Test Status** | `npm test` | Tests run (may have failures, but suite executes) | AQA 1 | `@UnitTestMigrator` |
| **Deprecated APIs** | `./scripts/check_deprecated_apis.sh` | No critical deprecated APIs | Dev A1 | `@BuildFixer` |
| **Node.js Version** | `node --version` | Node.js 18.x (required for v14-15) | Dev B3 | `@InfraPerfOptimizer` |
| **Git Clean** | `git status` | Repository clean or changes committed | Dev Team Lead | - |
| **Dependencies** | `./scripts/verify_dependencies.sh 14` | No blocking incompatibilities | Dev B2 | `@DependencyAuditor` |

**If any check fails:**
- Fix the issue before proceeding to v15 upgrade
- Use appropriate agent (see `issue-agent-mapping.md`)
- Document the fix in `KNOWN_ISSUES.md`
- Re-run verification until all checks pass

**If all checks pass:**
- Proceed with v14 → v15 upgrade
- Then proceed with v15 → v16 upgrade

### Day 1 Schedule

| Time | Dev Team Lead | Dev A1 (Stream A) | Dev A2 (Stream A) | Dev B1 (Stream B) | Dev B2 (Stream B) | Dev B3 (Stream D) | AQA 1 (Stream C) | AQA 2 (Stream C) |
|------|---------------|-------------------|-------------------|-------------------|-------------------|-------------------|------------------|------------------|
| **08:00-09:00** | **v14 Verification**: Run checklist<br>- Check version<br>- Verify build<br>- Check deprecated APIs<br>- Verify Node.js 18 | ✅ Verify build passes<br>✅ Check deprecated APIs<br>**Agent**: `@BuildFixer` | ⏳ Waiting | ⏳ Waiting | ✅ Start dependency audit<br>**Agent**: `@DependencyAuditor` | ✅ Install Node 18<br>**Agent**: `@InfraPerfOptimizer` | ✅ Run test baseline<br>**Agent**: `@UnitTestMigrator` | ✅ Run Playwright baseline<br>**Agent**: `@E2ETestMigrator` |
| **09:00-10:00** | **If v14**: `ng update @angular/core@15 @angular/cli@15 --force`<br>**If v15**: Verify v14 complete, proceed to v16<br>**If fails**: Fix issues first | ⏳ Waiting OR fixing v14 issues<br>**Agent**: `@BuildFixer` | ⏳ Waiting | ⏳ Waiting | ✅ Continue dependency audit<br>**Agent**: `@DependencyAuditor` | ✅ Update Dockerfile<br>**Agent**: `@InfraPerfOptimizer` | ✅ Document test coverage<br>**Agent**: `@UnitTestMigrator` | ✅ Document Playwright baseline<br>**Agent**: `@E2ETestMigrator` |
| **10:00-12:00** | Resolve v14→v15 conflicts OR proceed to v15→v16 | ✅ Fix TypeScript errors (batches)<br>**Agent**: `@BuildFixer` | ⏳ Waiting for upgrade | ⏳ Waiting for upgrade | ✅ Identify red zone deps<br>**Agent**: `@DependencyAuditor` | ✅ Test local build<br>**Agent**: `@InfraPerfOptimizer` | ✅ Document test failures<br>**Agent**: `@UnitTestMigrator` | ✅ Continue Playwright setup<br>**Agent**: `@E2ETestMigrator` |
| **12:00-13:00** | Lunch | Lunch | Lunch | Lunch | Lunch | Lunch | Lunch | Lunch |
| **13:00-15:00** | Complete v15 upgrade, then `ng update @angular/core@16 @angular/cli@16 @angular/material@16 --force` | ✅ Fix Material imports<br>**Agent**: `@BuildFixer` | ✅ Fix Material MDC issues<br>**Agent**: `@StyleMigrator` | ⏳ Waiting for upgrade | ✅ Create replacement plan<br>**Agent**: `@DependencyAuditor` | ✅ Update CI/CD configs<br>**Agent**: `@InfraPerfOptimizer` | ✅ Document test failures<br>**Agent**: `@UnitTestMigrator` | ✅ Continue Playwright migration<br>**Agent**: `@E2ETestMigrator` |
| **15:00-17:00** | Resolve v15→v16 conflicts, integration testing | ✅ Get `ng build` passing<br>**Agent**: `@BuildFixer` | ✅ Fix component issues<br>**Agent**: `@CodeModernizer` | ✅ Fix HTTP/Service issues<br>**Agent**: `@LogicRefactorer` | ✅ Verify dependency replacements<br>**Agent**: `@DependencyAuditor` | ✅ Verify CI/CD works<br>**Agent**: `@InfraPerfOptimizer` | ✅ Finalize test baseline<br>**Agent**: `@UnitTestMigrator` | ✅ Finalize Playwright baseline<br>**Agent**: `@E2ETestMigrator` |
| **17:00-17:30** | **GATE REVIEW** | **GATE REVIEW** | **GATE REVIEW** | **GATE REVIEW** | **GATE REVIEW** | **GATE REVIEW** | **GATE REVIEW** | **GATE REVIEW** |

### Day 1 Deliverables

| Stream | Team Member | Deliverable | Success Criteria | Agent Used |
|--------|-------------|-------------|-----------------|------------|
| **Dev Team Lead** | Dev Team Lead | v14 verified + Angular v16 upgrade complete | v14 stable (if starting from v14), v15 complete, `ng version` shows v16.x | `@ArchitectureReviewer` |
| **Stream A** | Dev A1 | Build passes on v16 | `ng build` completes successfully on v16 | `@BuildFixer` |
| **Stream A** | Dev A2 | Material MDC issues resolved | Material components working on v16 | `@StyleMigrator` |
| **Stream B** | Dev B1 | HTTP/Services updated | Services work on v16 | `@LogicRefactorer` |
| **Stream B** | Dev B2 | Dependency audit report | Red zone dependencies identified with replacement plan | `@DependencyAuditor` |
| **Stream C** | AQA 1 | Test baseline captured | Test coverage % documented | `@UnitTestMigrator` |
| **Stream C** | AQA 2 | Playwright baseline captured | Playwright snapshots captured | `@E2ETestMigrator` |
| **Stream D** | Dev B3 | Node 18 configured | Node 18 installed, Dockerfile updated, local build works | `@InfraPerfOptimizer` |

### Day 1 Dependencies

| Task | Depends On | Blocks | Agent |
|------|------------|--------|-------|
| v14 verification | None | v14→v15 upgrade | `@BuildFixer`, `@DependencyAuditor` |
| v14→v15 upgrade | v14 verified stable | v15→v16 upgrade | - |
| v15→v16 upgrade | v15 complete | Stream A build fixes | - |
| Stream A build fixes | Dev Team Lead completes v16 upgrade | Nothing | `@BuildFixer` |
| Stream A Material fixes | Dev Team Lead completes v16 upgrade | Nothing | `@StyleMigrator` |
| Stream B dependency audit | None | Nothing (fully parallel) | `@DependencyAuditor` |
| Stream B HTTP fixes | Dev Team Lead completes v16 upgrade | Nothing | `@LogicRefactorer` |
| Stream C test baseline | None | Nothing (fully parallel) | `@UnitTestMigrator`, `@E2ETestMigrator` |
| Stream D Node 18 setup | None | Nothing (fully parallel) | `@InfraPerfOptimizer` |
| Day 1 Gate | All streams complete | Day 2 start | - |

### Day 1 Exit Criteria (MUST PASS)
- [ ] **v14 migration verified complete** (if starting from v14)
  - [ ] Build passes on v14/v15
  - [ ] No deprecated APIs in use
  - [ ] All v14 breaking changes resolved
- [ ] **v15 upgrade complete** (if starting from v14)
  - [ ] `ng version` shows v15.x
  - [ ] Build passes on v15
- [ ] `ng build` passes on v16
- [ ] Node 18 configured and tested
- [ ] Red zone dependencies identified
- [ ] Test baseline captured (coverage % + Playwright snapshots)
- [ ] All streams merged to integration branch

---

## 📅 DAY 2: v16 → v17 (Modernization)

### Prerequisites (Before Starting)
- [x] Day 1 exit criteria met
- [ ] Git branch: `git checkout -b migration/day2-v17`
- [ ] Day 1 changes merged: `git merge migration/day1-v16`
- [ ] Overnight CI results reviewed (all green)

### Day 2 Schedule

| Time | Dev Team Lead | Dev A1 (Stream A) | Dev A2 (Stream A) | Dev B1 (Stream B) | Dev B2 (Stream B) | Dev B3 (Stream D) | AQA 1 (Stream C) | AQA 2 (Stream C) |
|------|---------------|-------------------|-------------------|-------------------|-------------------|-------------------|------------------|------------------|
| **08:00-10:00** | `ng update @angular/core@17 @angular/cli@17 @angular/material@17 --force` | ⏳ Waiting for upgrade | ⏳ Waiting for upgrade | ⏳ Waiting for upgrade | ✅ Plan ngx-scrollbar replacement<br>**Agent**: `@DependencyAuditor` | ✅ Update Azure Pipelines<br>**Agent**: `@InfraPerfOptimizer` | ✅ Identify broken tests<br>**Agent**: `@UnitTestMigrator` | ✅ Identify broken E2E tests<br>**Agent**: `@E2ETestMigrator` |
| **10:00-12:00** | Resolve conflicts | ✅ Fix v17 breaking changes<br>**Agent**: `@BuildFixer` | ✅ Fix Material MDC issues<br>**Agent**: `@StyleMigrator` | ✅ Replace `toPromise()` with `lastValueFrom()`<br>**Agent**: `@LogicRefactorer` | ✅ Replace `ngx-perfect-scrollbar`<br>**Agent**: `@DependencyAuditor` | ✅ Test pipeline locally<br>**Agent**: `@InfraPerfOptimizer` | ✅ Fix broken tests (batches)<br>**Agent**: `@UnitTestMigrator` | ✅ Fix broken E2E tests<br>**Agent**: `@E2ETestMigrator` |
| **12:00-13:00** | Lunch | Lunch | Lunch | Lunch | Lunch | Lunch | Lunch | Lunch |
| **13:00-15:00** | Code review | ✅ Continue build fixes<br>**Agent**: `@BuildFixer` | ✅ Continue Material fixes<br>**Agent**: `@StyleMigrator` | ✅ Continue HTTP fixes<br>**Agent**: `@LogicRefactorer` | ✅ Test replacement in browser<br>**Agent**: `@DependencyAuditor` | ✅ Document pipeline changes<br>**Agent**: `@InfraPerfOptimizer` | ✅ Continue test fixes<br>**Agent**: `@UnitTestMigrator` | ✅ Continue E2E fixes<br>**Agent**: `@E2ETestMigrator` |
| **15:00-17:00** | Integration testing | ✅ Get build passing<br>**Agent**: `@BuildFixer` | ✅ Get components working<br>**Agent**: `@CodeModernizer` | ✅ Get services working<br>**Agent**: `@LogicRefactorer` | ✅ Commit if working<br>**Agent**: `@DependencyAuditor` | ✅ Verify CI/CD works<br>**Agent**: `@InfraPerfOptimizer` | ✅ Aim for >70% tests passing<br>**Agent**: `@UnitTestMigrator` | ✅ Aim for >70% E2E tests passing<br>**Agent**: `@E2ETestMigrator` |
| **17:00-17:30** | **GATE REVIEW** | **GATE REVIEW** | **GATE REVIEW** | **GATE REVIEW** | **GATE REVIEW** | **GATE REVIEW** | **GATE REVIEW** | **GATE REVIEW** |

### Day 2 Deliverables

| Stream | Team Member | Deliverable | Success Criteria | Agent Used |
|--------|-------------|-------------|-----------------|------------|
| **Dev Team Lead** | Dev Team Lead | Angular v17 upgrade complete | `ng version` shows v17.x, no critical conflicts | `@ArchitectureReviewer` |
| **Stream A** | Dev A1 | Build passes on v17 | `ng build` completes, RxJS patterns updated | `@BuildFixer` |
| **Stream A** | Dev A2 | Components working on v17 | Components render correctly | `@CodeModernizer`, `@StyleMigrator` |
| **Stream B** | Dev B1 | Services working on v17 | HTTP services work, RxJS updated | `@LogicRefactorer` |
| **Stream B** | Dev B2 | Critical dependency replaced | `ngx-perfect-scrollbar` replaced, tested, working | `@DependencyAuditor` |
| **Stream C** | AQA 1 | Tests >70% passing | Test suite shows >70% pass rate | `@UnitTestMigrator` |
| **Stream C** | AQA 2 | E2E tests >70% passing | E2E test suite shows >70% pass rate | `@E2ETestMigrator` |
| **Stream D** | Dev B3 | CI/CD updated | Azure Pipelines updated, tested, green | `@InfraPerfOptimizer` |

### Day 2 Dependencies

| Task | Depends On | Blocks | Agent |
|------|------------|--------|-------|
| Stream A build fixes | Dev Team Lead completes upgrade | Nothing | `@BuildFixer` |
| Stream A component fixes | Dev Team Lead completes upgrade | Nothing | `@CodeModernizer`, `@StyleMigrator` |
| Stream B dependency replacement | None (can start Day 1) | Nothing | `@DependencyAuditor` |
| Stream B HTTP fixes | Dev Team Lead completes upgrade | Nothing | `@LogicRefactorer` |
| Stream C test fixes | Dev Team Lead completes upgrade | Nothing | `@UnitTestMigrator`, `@E2ETestMigrator` |
| Stream D CI/CD update | None (can start Day 1) | Nothing | `@InfraPerfOptimizer` |
| Day 2 Gate | All streams complete | Day 3 start | - |

### Day 2 Exit Criteria (MUST PASS)
- [ ] `ng build` passes on v17
- [ ] `ngx-perfect-scrollbar` replaced and working
- [ ] >70% tests passing
- [ ] CI/CD updated and green
- [ ] All streams merged to integration branch

---

## 📅 DAY 3: v17 → v19 (Acceleration - Double Upgrade)

### Prerequisites (Before Starting)
- [x] Day 2 exit criteria met
- [ ] Git branch: `git checkout -b migration/day3-v19`
- [ ] Day 2 changes merged: `git merge migration/day2-v17`
- [ ] Overnight CI results reviewed

### Day 3 Schedule

| Time | Dev Team Lead | Dev A1 (Stream A) | Dev A2 (Stream A) | Dev A3 (Stream A) | Dev B1 (Stream B) | Dev B2 (Stream B) | Dev B3 (Stream D) | AQA 1 (Stream C) | AQA 2 (Stream C) |
|------|---------------|-------------------|-------------------|-------------------|-------------------|-------------------|-------------------|------------------|------------------|
| **08:00-10:00** | `ng update @angular/core@18` then immediately `ng update @angular/core@19` | ⏳ Waiting for upgrade | ⏳ Waiting for upgrade | ✅ Upgrade AG Grid to v31<br>**Agent**: `@StyleMigrator` | ⏳ Waiting for upgrade | ⏳ Waiting for upgrade | ✅ Install Node 20<br>**Agent**: `@InfraPerfOptimizer` | ✅ Batch fix tests (AI)<br>**Agent**: `@UnitTestMigrator` | ✅ Batch fix E2E tests<br>**Agent**: `@E2ETestMigrator` |
| **10:00-12:00** | Resolve conflicts | ✅ Fix v18/v19 breaking changes<br>**Agent**: `@BuildFixer` | ✅ Fix component issues<br>**Agent**: `@CodeModernizer` | ✅ Update AG Grid imports + CSS<br>**Agent**: `@StyleMigrator` | ✅ Update to `provideHttpClient`<br>**Agent**: `@LogicRefactorer` | ✅ Verify dependencies<br>**Agent**: `@DependencyAuditor` | ✅ Update all configs to Node 20<br>**Agent**: `@InfraPerfOptimizer` | ✅ Continue test fixes (batches 20-30)<br>**Agent**: `@UnitTestMigrator` | ✅ Continue E2E fixes<br>**Agent**: `@E2ETestMigrator` |
| **12:00-13:00** | Lunch | Lunch | Lunch | Lunch | Lunch | Lunch | Lunch | Lunch | Lunch |
| **13:00-15:00** | Code review | ✅ Continue build fixes<br>**Agent**: `@BuildFixer` | ✅ Fix component issues<br>**Agent**: `@CodeModernizer` | ✅ Test all grids<br>**Agent**: `@StyleMigrator` | ✅ Continue HTTP fixes<br>**Agent**: `@LogicRefactorer` | ✅ Verify dependency compatibility<br>**Agent**: `@DependencyAuditor` | ✅ Test build with Node 20<br>**Agent**: `@InfraPerfOptimizer` | ✅ Aim for >80% tests passing<br>**Agent**: `@UnitTestMigrator` | ✅ Aim for >80% E2E tests passing<br>**Agent**: `@E2ETestMigrator` |
| **15:00-17:00** | Integration testing | ✅ Get build passing<br>**Agent**: `@BuildFixer` | ✅ Verify components work<br>**Agent**: `@CodeModernizer` | ✅ Verify AG Grid rendering<br>**Agent**: `@StyleMigrator` | ✅ Verify services work<br>**Agent**: `@LogicRefactorer` | ✅ Final dependency check<br>**Agent**: `@DependencyAuditor` | ✅ Update Dockerfile, CI/CD<br>**Agent**: `@InfraPerfOptimizer` | ✅ Document remaining failures<br>**Agent**: `@UnitTestMigrator` | ✅ Document remaining E2E failures<br>**Agent**: `@E2ETestMigrator` |
| **17:00-17:30** | **GATE REVIEW** | **GATE REVIEW** | **GATE REVIEW** | **GATE REVIEW** | **GATE REVIEW** | **GATE REVIEW** | **GATE REVIEW** | **GATE REVIEW** | **GATE REVIEW** |

### Day 3 Deliverables

| Stream | Team Member | Deliverable | Success Criteria | Agent Used |
|--------|-------------|-------------|-----------------|------------|
| **Dev Team Lead** | Dev Team Lead | Angular v19 upgrade complete | `ng version` shows v19.x, both upgrades successful | `@ArchitectureReviewer` |
| **Stream A** | Dev A1 | Build passes on v19 | `ng build` completes, HttpClient updated | `@BuildFixer` |
| **Stream A** | Dev A2 | Components working on v19 | Components work on v19 (NgModules OK) | `@CodeModernizer` |
| **Stream A** | Dev A3 | AG Grid v31 upgraded | AG Grid v31 installed, imports updated, CSS updated, grids render correctly | `@StyleMigrator` |
| **Stream B** | Dev B1 | HTTP services updated | `provideHttpClient` implemented | `@LogicRefactorer` |
| **Stream B** | Dev B2 | Dependencies verified | All dependencies compatible with v19 | `@DependencyAuditor` |
| **Stream C** | AQA 1 | Tests >80% passing | Test suite shows >80% pass rate | `@UnitTestMigrator` |
| **Stream C** | AQA 2 | E2E tests >80% passing | E2E test suite shows >80% pass rate | `@E2ETestMigrator` |
| **Stream D** | Dev B3 | Node 20 configured | Node 20 installed, all configs updated, build works | `@InfraPerfOptimizer` |

### Day 3 Dependencies

| Task | Depends On | Blocks | Agent |
|------|------------|--------|-------|
| Stream A build fixes | Dev Team Lead completes upgrades | Nothing | `@BuildFixer` |
| Stream A component fixes | Dev Team Lead completes upgrades | Nothing | `@CodeModernizer` |
| Stream A AG Grid upgrade | None (can start Day 1) | Nothing | `@StyleMigrator` |
| Stream B HTTP fixes | Dev Team Lead completes upgrades | Nothing | `@LogicRefactorer` |
| Stream B dependency verification | None (can start Day 1) | Nothing | `@DependencyAuditor` |
| Stream C test fixes | Dev Team Lead completes upgrades | Nothing | `@UnitTestMigrator`, `@E2ETestMigrator` |
| Stream D Node 20 setup | None (can start Day 1) | Nothing | `@InfraPerfOptimizer` |
| Day 3 Gate | All streams complete | Day 4 start | - |

### Day 3 Exit Criteria (MUST PASS)
- [ ] `ng build` passes on v19 with Node 20
- [ ] AG Grid rendering correctly
- [ ] >80% tests passing
- [ ] All configs updated to Node 20
- [ ] All streams merged to integration branch

---

## 📅 DAY 4: v19 → v20 (Final Push + Deployment)

### Prerequisites (Before Starting)
- [x] Day 3 exit criteria met
- [ ] Git branch: `git checkout -b migration/day4-v20`
- [ ] Day 3 changes merged: `git merge migration/day3-v19`
- [ ] Overnight CI results reviewed
- [ ] Staging environment ready for deployment

### Day 4 Schedule

| Time | Dev Team Lead | Dev A1 (Stream A) | Dev A2 (Stream A) | Dev B1 (Stream B) | Dev B2 (Stream B) | Dev B3 (Stream D) | AQA 1 (Stream C) | AQA 2 (Stream C) |
|------|---------------|-------------------|-------------------|-------------------|-------------------|-------------------|------------------|------------------|
| **08:00-10:00** | `ng update @angular/core@20 @angular/cli@20 @angular/material@20 --force` | ⏳ Waiting for upgrade | ⏳ Waiting for upgrade | ⏳ Waiting for upgrade | ✅ Run dep verification scripts<br>**Agent**: `@DependencyAuditor` | ✅ Prepare deployment<br>**Agent**: `@InfraPerfOptimizer` | ✅ Fix remaining test failures<br>**Agent**: `@UnitTestMigrator` | ✅ Fix remaining E2E failures<br>**Agent**: `@E2ETestMigrator` |
| **10:00-12:00** | Resolve conflicts | ✅ Fix v20 breaking changes<br>**Agent**: `@BuildFixer` | ✅ Fix template errors (`{{ in }}` → `{{ this.in }}`)<br>**Agent**: `@CodeModernizer` | ✅ Fix service issues<br>**Agent**: `@LogicRefactorer` | ✅ Run `migration_toolbox.sh check_all`<br>**Agent**: `@DependencyAuditor` | ✅ Build production bundle<br>**Agent**: `@InfraPerfOptimizer` | ✅ Run full test suite<br>**Agent**: `@UnitTestMigrator` | ✅ Run Playwright tests<br>**Agent**: `@E2ETestMigrator` |
| **12:00-13:00** | Lunch | Lunch | Lunch | Lunch | Lunch | Lunch | Lunch | Lunch |
| **13:00-15:00** | Code review | ✅ Continue build fixes<br>**Agent**: `@BuildFixer` | ✅ Continue template fixes<br>**Agent**: `@CodeModernizer` | ✅ Continue service fixes<br>**Agent**: `@LogicRefactorer` | ✅ Fix any remaining issues<br>**Agent**: `@DependencyAuditor` | ✅ Deploy to staging<br>**Agent**: `@InfraPerfOptimizer` | ✅ Continue test fixes<br>**Agent**: `@UnitTestMigrator` | ✅ Continue Playwright fixes<br>**Agent**: `@E2ETestMigrator` |
| **15:00-17:00** | Final integration | ✅ Production build must pass<br>**Agent**: `@BuildFixer` | ✅ Verify components work<br>**Agent**: `@CodeModernizer` | ✅ Verify services work<br>**Agent**: `@LogicRefactorer` | ✅ Final verification<br>**Agent**: `@DependencyAuditor` | ✅ Run smoke tests<br>**Agent**: `@InfraPerfOptimizer` | ✅ Document test status<br>**Agent**: `@UnitTestMigrator` | ✅ Document E2E test status<br>**Agent**: `@E2ETestMigrator` |
| **17:00-17:30** | **FINAL GATE REVIEW** | **FINAL GATE REVIEW** | **FINAL GATE REVIEW** | **FINAL GATE REVIEW** | **FINAL GATE REVIEW** | **FINAL GATE REVIEW** | **FINAL GATE REVIEW** | **FINAL GATE REVIEW** |

### Day 4 Deliverables

| Stream | Team Member | Deliverable | Success Criteria | Agent Used |
|--------|-------------|-------------|-----------------|------------|
| **Dev Team Lead** | Dev Team Lead | Angular v20 upgrade complete | `ng version` shows v20.x, no critical conflicts | `@ArchitectureReviewer`, `@CodeReviewer` |
| **Stream A** | Dev A1 | Production build passes | `ng build --configuration production` completes successfully | `@BuildFixer` |
| **Stream A** | Dev A2 | Components working on v20 | All components render correctly | `@CodeModernizer` |
| **Stream B** | Dev B1 | Services working on v20 | All services work correctly | `@LogicRefactorer` |
| **Stream B** | Dev B2 | All dependencies verified | All dependency checks pass, no critical issues | `@DependencyAuditor` |
| **Stream C** | AQA 1 | Tests >90% passing | Test suite shows >90% pass rate | `@UnitTestMigrator` |
| **Stream C** | AQA 2 | E2E tests >90% passing | Playwright tests pass | `@E2ETestMigrator` |
| **Stream D** | Dev B3 | Deployed to staging | Staging deployment successful, smoke tests pass | `@InfraPerfOptimizer` |

### Day 4 Dependencies

| Task | Depends On | Blocks | Agent |
|------|------------|--------|-------|
| Stream A build fixes | Dev Team Lead completes upgrade | Production deployment | `@BuildFixer` |
| Stream A component fixes | Dev Team Lead completes upgrade | Production deployment | `@CodeModernizer` |
| Stream B dependency verification | None (can start Day 1) | Nothing | `@DependencyAuditor` |
| Stream B service fixes | Dev Team Lead completes upgrade | Production deployment | `@LogicRefactorer` |
| Stream C test completion | Dev Team Lead completes upgrade | Production deployment | `@UnitTestMigrator`, `@E2ETestMigrator` |
| Stream D deployment | Stream A + Stream C complete | Nothing | `@InfraPerfOptimizer` |
| Day 4 Gate | All streams complete | Migration complete | - |

### Day 4 Exit Criteria (MUST PASS - FINAL)
- [ ] `ng build --configuration production` passes
- [ ] All critical tests passing (>90%)
- [ ] Playwright tests passing
- [ ] Deployed to staging successfully
- [ ] Smoke tests pass
- [ ] All streams merged to main branch

---

## 📊 Overall Migration Summary

### Timeline Overview

| Day | Angular Version | Key Focus | Critical Deliverable |
|-----|----------------|-----------|---------------------|
| **Day 1** | v14 verify → v15 → v16 | Foundation + v14 completion | v14 stable, v15 complete, v16 build passes, Node 18 ready |
| **Day 2** | v16 → v17 | Modernization | Critical deps replaced, >70% tests |
| **Day 3** | v17 → v19 | Acceleration | AG Grid upgraded, >80% tests |
| **Day 4** | v19 → v20 | Deployment | Production build, deployed to staging |

### Success Metrics

| Metric | Day 1 | Day 2 | Day 3 | Day 4 |
|--------|-------|-------|-------|-------|
| **Build Status** | ✅ Passes | ✅ Passes | ✅ Passes | ✅ Production passes |
| **Test Pass Rate** | Baseline | >70% | >80% | >90% |
| **Node Version** | 18 | 18 | 20 | 20 |
| **Deployment** | N/A | N/A | N/A | ✅ Staging |

---

## 🚨 Emergency Procedures

### If v14 Verification Fails
```bash
# 1. Check current Angular version
npm list @angular/core --depth=0

# 2. If on v14, verify build passes
npm run build

# 3. If build fails, fix errors first before upgrading
# Use AI (Zed + MCP) with @BuildFixer agent
npm run build 2>&1 | tee errors.txt
# Copy errors to AI, get fixes, apply, repeat

# 4. Check for deprecated APIs
./scripts/check_deprecated_apis.sh

# 5. Only proceed to v15 upgrade after v14 is stable
```

### If Build Fails After Upgrade
```bash
# 1. Clear caches
rm -rf node_modules .angular dist
npm install

# 2. Try build again
npm run build

# 3. If still failing, use @BuildFixer agent to fix errors in batches
npm run build 2>&1 | tee errors.txt
# Copy errors to AI with @BuildFixer agent, get fixes, apply, repeat

# 4. Common issues to check:
#    - Polyfills configuration format (v14 uses string, check angular.json)
#    - Missing module imports (third-party modules not imported)
#    - Template expression errors (arrow functions in templates)
#    - Webpack module resolution (clear cache, verify file paths)
```

### If Polyfills Configuration Error
```bash
# Error: "Data path '/polyfills' must be string"
# Solution:
# 1. Check if polyfills.ts exists
ls -la src/polyfills.ts

# 2. If missing, create it:
echo "// Polyfills" > src/polyfills.ts

# 3. Update angular.json (v14 format):
#    "polyfills": "src/polyfills.ts"  (string, not array)

# 4. Update tsconfig.app.json to include polyfills.ts
```

### If Template Expression Error
```bash
# Error: Parser error with arrow function or complex expression
# Solution:
# 1. Find the problematic template expression
# 2. Extract logic to component method
# 3. Call method from template instead
# Use @CodeModernizer agent for help
```

### If Module Import Error
```bash
# Error: "is not a known element" or "Can't bind to 'X'"
# Solution:
# 1. Verify third-party module is imported in feature module
# 2. Check SharedModule exports
# 3. Ensure feature module imports required modules
# Use @CodeModernizer agent for help
```

### If AG Grid Issues
```bash
# Error: Property 'columnState' does not exist
# Solution:
# 1. Use GridApi methods instead:
#    this.gridApi.applyColumnState({ state: [...] })
#    this.gridApi.applyColumnGroupState({ state: [...] })
# 2. Update CSS theme: ag-theme-alpine → ag-theme-quartz
# Use @StyleMigrator agent for help
```

### If Playwright Installation Fails
```bash
# Error: unknown option '--yes'
# Solution:
# Use correct installation method:
npm install --save-dev @playwright/test
npx playwright install
# NOT: npm init playwright@latest --yes (this flag doesn't exist)
```

### If Tests Are Completely Broken
- Acceptable to skip non-critical tests in 4-day migration
- Focus on:
  1. Critical path tests (login, main flows)
  2. Playwright visual regression
  3. Manual smoke testing
- Use `@UnitTestMigrator` and `@E2ETestMigrator` agents for fixes
- Defer full test suite to Week 2

### If Stuck on Dependency Issue
```bash
# Use --force or --legacy-peer-deps
npm install --legacy-peer-deps

# Use @DependencyAuditor agent to analyze compatibility
# Document the issue for later resolution
echo "Dependency issue: [describe]" >> KNOWN_ISSUES.md
```

---

## ✅ Daily Standup Template (15 minutes)

**Time**: 8:00 AM each morning

**Format**:
1. **Dev Team Lead** (2 min): Yesterday's upgrade status, today's plan, blockers
2. **Dev A1** (1 min): Build fixes progress, blockers, agent usage
3. **Dev A2** (1 min): Component fixes progress, blockers, agent usage
4. **Dev A3** (1 min): UI library fixes progress, blockers, agent usage
5. **Dev B1** (1 min): Service fixes progress, blockers, agent usage
6. **Dev B2** (1 min): Dependency work progress, blockers, agent usage
7. **Dev B3** (1 min): Infrastructure progress, blockers, agent usage
8. **AQA 1** (1 min): Unit test fixes progress, blockers, agent usage
9. **AQA 2** (1 min): E2E test fixes progress, blockers, agent usage
10. **Review** (5 min): Overnight CI results, adjust plan if needed

---

## 🎯 Success Criteria

### Minimum Viable Migration (Day 4 EOD)
- ✅ v14 migration verified complete (if started from v14)
- ✅ Angular 20 running
- ✅ `ng build --configuration production` passes
- ✅ Critical user flows work (test manually)
- ✅ No console errors in browser
- ✅ Deployed to staging
- ✅ Smoke tests pass

### Deferred to Week 2+ (After v20 is stable)
- 🔄 TypeScript strict mode
- 🔄 Control flow migration (`@if`, `@for`)
- 🔄 Vitest migration
- 🔄 Full test coverage (>95%)
- 🔄 Bundle optimization
- 🔄 Standalone component migration (not needed for hackathon)

> **Note**: For hackathon, we keep NgModules. Standalone migration is optional and can be done later.

---

## 🎉 Day 4 Evening: Success!

If all gates pass:
1. ✅ Merge all streams to main
2. ✅ Tag release: `v20.0.0-migration-complete`
3. ✅ Deploy to production (or schedule for next day)
4. ✅ Celebrate! 🎊
5. 📝 Document lessons learned
6. 📅 Plan Week 2: Modernization (standalone, strict mode, etc.)

---

## 💡 Key Success Factors

1. **Use AI agents heavily** - Don't manually fix 1000 errors (use agents from `issue-agent-mapping.md`)
2. **Work in parallel** - All streams simultaneously
3. **Accept technical debt** - Perfect is the enemy of done
4. **Focus on critical path** - Not all tests need to pass
5. **Daily integration** - Merge streams every evening
6. **Clear communication** - 15-min standup every morning
7. **Check version first** - Always verify actual Angular version (`npm list @angular/core --depth=0`)
8. **Use scripts** - Run `./scripts/migration_toolbox.sh check_all` regularly
9. **Pattern-based fixes** - Many issues follow patterns (see `issue-agent-mapping.md`)

**You can do this in 4 days!** 💪

## 🔧 Troubleshooting Quick Reference

### Common Build Errors
| Error Pattern | Quick Fix | Agent |
|--------------|-----------|-------|
| Polyfills format error | Create `src/polyfills.ts`, update `angular.json` | `@BuildFixer` |
| Template parser error | Extract logic to component method | `@CodeModernizer` |
| Module not found | Verify imports, clear cache | `@BuildFixer` |
| Missing module import | Import third-party module in feature module | `@CodeModernizer` |
| Location.back() error | Use `Router.navigate()` instead | `@LogicRefactorer` |
| AG Grid API error | Use `GridApi` methods | `@StyleMigrator` |

### Diagnostic Commands
```bash
# Check Angular version
npm list @angular/core --depth=0

# Check polyfills
ls -la src/polyfills.ts
cat angular.json | grep polyfills

# Find MatLegacy imports
grep -r "MatLegacy" src/

# Check for View Engine libraries
npm run build 2>&1 | grep "View Engine"

# Run migration checks
./scripts/migration_toolbox.sh check_all
./scripts/check_deprecated_apis.sh
```

### Scripts Reference
| Script | Purpose | When to Use |
|--------|---------|-------------|
| `pre_migration_check.sh` | Comprehensive safety check | Before starting |
| `migration_toolbox.sh check_all` | Core migration checks | After each upgrade |
| `verify_dependencies.sh` | Check compatibility | Before upgrade |
| `check_deprecated_apis.sh` | Find deprecated code | After upgrade |
| `migration_status.sh` | Status report | Daily |
| `backup_before_migration.sh` | Create backup | Before each day |

---

## 📚 Related Documentation

- **Issue-Agent Mapping**: See `issue-agent-mapping.md` for comprehensive table of issues and which agent solves them
- **Agent Details**: See `../../agents/roles/` for detailed agent prompt templates
- **Setup Guide**: See `../setup/zed-mcp-setup.md` for MCP server configuration
- **Archived References**: See `../history/archived-guides/` for detailed migration manual, troubleshooting patterns, and migration experience notes

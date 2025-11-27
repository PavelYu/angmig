# 👥 Team Separation: Dev vs AQA

## 🎯 **Clear Separation Principle**

**Dev Team**: Focuses on code migration, build fixes, and feature development  
**AQA Team**: Focuses on testing, quality assurance, and test infrastructure - **ALWAYS BUSY**

> [!CRITICAL]
> **AQA Team Independence**: AQA team must have work that is **independent of Angular version state**. They work in parallel with dev team, not sequentially.

---

## 📊 **Agent Assignment Matrix**

### **Dev Team Agents** (6 Developers)
| Agent | Manager | Focus | Phase Dependency |
|-------|---------|-------|------------------|
| Build Fixer | Dev A1 | TypeScript errors, build failures | ⚠️ Depends on upgrade |
| Code Modernizer | Dev A2 | Control Flow, Standalone, Signals | ⚠️ Depends on upgrade |
| Style Migrator | Dev A3 | Material MDC, SCSS refactoring | ⚠️ Depends on upgrade |
| Logic Refactorer | Dev B1 | HTTP, Guards, Interceptors | ⚠️ Depends on upgrade |
| Dependency Auditor | Dev B2 | Package compatibility, upgrades | ⚠️ Depends on upgrade |
| Infra & Perf Optimizer | Dev B3 | Node.js, Bundles, CI/CD | ⚠️ Depends on upgrade |
| Architecture Reviewer | Tech Lead | Code quality, circular deps | ✅ Always available |
| Code Reviewer | All Devs | Pre-PR checks, security | ✅ Always available |

### **AQA Team Agents** (2 AQAs)
| Agent | Manager | Focus | Phase Dependency |
|-------|---------|-------|------------------|
| **Unit Test Migrator** | AQA 1 | Karma → Vitest migration | ✅ **ALWAYS BUSY** |
| **E2E Test Migrator** | AQA 2 | Protractor → Playwright migration | ✅ **ALWAYS BUSY** |
| **Visual Regression Tester** | AQA 2 | Playwright visual testing | ✅ **ALWAYS BUSY** |
| **Test Coverage Analyzer** | AQA 1 | Coverage analysis & improvement | ✅ **ALWAYS BUSY** |
| **Test Infrastructure Builder** | AQA 1 | Test framework setup & config | ✅ **ALWAYS BUSY** |

---

## 🔄 **AQA Workflow Independence**

### **Phase 0: Pre-Migration** ✅ AQA BUSY
- **AQA 1**: Setup Vitest infrastructure, analyze current test coverage
- **AQA 2**: Setup Playwright infrastructure, capture baseline snapshots
- **Work**: Independent of Angular version

### **Phase 1: Foundation** ✅ AQA BUSY
- **AQA 1**: Migrate Karma tests to Vitest (can start immediately)
- **AQA 2**: Migrate Protractor tests to Playwright (can start immediately)
- **Work**: Independent of Angular version

### **Phase 2: v14 → v15** ✅ AQA BUSY
- **AQA 1**: Fix broken Vitest tests after upgrade, improve coverage
- **AQA 2**: Update Playwright tests for new Angular version, visual regression
- **Work**: Parallel with dev team

### **Phase 3: v15 → v17** ✅ AQA BUSY
- **AQA 1**: Continue Vitest migration, fix test failures, coverage analysis
- **AQA 2**: Continue Playwright migration, visual regression testing
- **Work**: Parallel with dev team

### **Phase 4: v17 → v20** ✅ AQA BUSY
- **AQA 1**: Final Vitest migration, test optimization, coverage improvement
- **AQA 2**: Final Playwright migration, comprehensive visual regression
- **Work**: Parallel with dev team

### **Post-Migration** ✅ AQA BUSY
- **AQA 1**: Test suite optimization, coverage improvement, test documentation
- **AQA 2**: Visual regression suite expansion, E2E test coverage improvement
- **Work**: Continuous improvement

---

## 🎯 **AQA Team Always-Busy Strategy**

### **AQA 1: Unit Test Lead** - Always Has Work

**Work Streams** (Parallel, Independent):
1. **Test Migration** (Primary)
   - Karma → Vitest conversion
   - Test framework modernization
   - Test infrastructure setup

2. **Test Fixes** (Secondary)
   - Fix broken tests after upgrades
   - Update TestBed configurations
   - Fix test patterns

3. **Coverage Analysis** (Tertiary)
   - Analyze test coverage
   - Identify gaps
   - Create new tests

4. **Test Infrastructure** (Ongoing)
   - Vitest configuration
   - Test utilities development
   - Test patterns documentation

**Agent Usage**:
- `@UnitTestMigrator` - Primary agent
- `@TestCoverageAnalyzer` - Secondary agent
- `@TestInfrastructureBuilder` - Ongoing agent

### **AQA 2: E2E & Visual Lead** - Always Has Work

**Work Streams** (Parallel, Independent):
1. **E2E Migration** (Primary)
   - Protractor → Playwright conversion
   - Page Object migration
   - E2E test modernization

2. **Visual Regression** (Secondary)
   - Baseline capture
   - Visual regression testing
   - Visual test maintenance

3. **E2E Test Creation** (Tertiary)
   - Critical path tests
   - Smoke tests
   - Integration tests

4. **Test Infrastructure** (Ongoing)
   - Playwright configuration
   - Test utilities development
   - CI/CD integration

**Agent Usage**:
- `@E2ETestMigrator` - Primary agent
- `@VisualRegressionTester` - Secondary agent
- `@TestInfrastructureBuilder` - Ongoing agent

---

## 📋 **AQA Daily Workflow (Version-Independent)**

### **Morning Block (9:00 AM - 12:00 PM)**

**AQA 1 Tasks**:
- [ ] Review overnight test results
- [ ] Migrate 10-20 Karma tests to Vitest
- [ ] Fix broken tests from previous day
- [ ] Analyze test coverage for new components
- [ ] Update Vitest configuration if needed

**AQA 2 Tasks**:
- [ ] Review overnight Playwright test results
- [ ] Migrate 5-10 Protractor tests to Playwright
- [ ] Run visual regression tests
- [ ] Update Playwright configuration if needed
- [ ] Create new E2E tests for critical paths

### **Afternoon Block (1:00 PM - 5:00 PM)**

**AQA 1 Tasks**:
- [ ] Continue Vitest migration (batch processing)
- [ ] Fix test failures from dev merges
- [ ] Improve test coverage for uncovered areas
- [ ] Document test patterns in Context7
- [ ] Prepare test status report

**AQA 2 Tasks**:
- [ ] Continue Playwright migration (batch processing)
- [ ] Run visual regression on merged code
- [ ] Create new visual regression tests
- [ ] Update Page Objects for new features
- [ ] Prepare E2E test status report

### **End of Day (5:00 PM - 5:30 PM)**

**Both AQAs**:
- [ ] Run full test suite on integration branch
- [ ] Generate test coverage report
- [ ] Document test failures
- [ ] Report GO/NO-GO status to Tech Lead
- [ ] Plan next day's test migration work

---

## 🚫 **Clear Boundaries**

### **Dev Team Does NOT**:
- ❌ Migrate test frameworks (AQA responsibility)
- ❌ Create E2E tests (AQA responsibility)
- ❌ Run visual regression tests (AQA responsibility)
- ❌ Manage test infrastructure (AQA responsibility)

### **AQA Team Does NOT**:
- ❌ Fix build errors (Dev responsibility)
- ❌ Migrate components (Dev responsibility)
- ❌ Update dependencies (Dev responsibility)
- ❌ Fix TypeScript errors (Dev responsibility)

### **Shared Responsibilities**:
- ✅ Fix unit tests for code they touch (Dev fixes their own unit tests)
- ✅ Code review (both teams review)
- ✅ Documentation (both teams document)

---

## 📊 **Workload Validation**

### **AQA 1 Workload** (Always Busy)
| Task Type | Time Allocation | Version Dependency |
|-----------|----------------|-------------------|
| Vitest Migration | 40% | ✅ Independent |
| Test Fixes | 30% | ⚠️ After upgrades |
| Coverage Analysis | 20% | ✅ Independent |
| Infrastructure | 10% | ✅ Independent |

**Fallback Work** (If no test fixes needed):
- Migrate more Karma tests to Vitest
- Improve test coverage
- Create test utilities
- Document test patterns

### **AQA 2 Workload** (Always Busy)
| Task Type | Time Allocation | Version Dependency |
|-----------|----------------|-------------------|
| Playwright Migration | 40% | ✅ Independent |
| Visual Regression | 30% | ✅ Independent |
| E2E Test Creation | 20% | ✅ Independent |
| Infrastructure | 10% | ✅ Independent |

**Fallback Work** (If no test fixes needed):
- Migrate more Protractor tests to Playwright
- Expand visual regression coverage
- Create new E2E tests
- Improve Page Objects

---

## ✅ **Verification Checklist**

- [ ] AQA team has dedicated agents (separate from dev agents)
- [ ] AQA workflows are independent of Angular version
- [ ] AQA team always has work regardless of migration phase
- [ ] Clear boundaries between dev and AQA responsibilities
- [ ] AQA team can work in parallel with dev team
- [ ] Fallback work defined for AQA team

---

**Last Updated**: 2025-11-26 21:15 UTC


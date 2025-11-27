# 🔄 AQA Team Daily Workflow - Version-Independent

## 🎯 **Core Principle**

> **AQA Team Independence**: AQA team works **in parallel** with dev team, not sequentially. Their work is **independent of Angular version state**.

---

## 📅 **Daily Schedule**

### **08:00 - 09:00: Morning Review**
**Who**: Both AQAs  
**Activity**: Review overnight test results and plan day's work

**AQA 1 Tasks**:
- [ ] Review overnight Vitest test results
- [ ] Identify broken tests from dev merges
- [ ] Plan Vitest migration batch for today
- [ ] Check test coverage metrics

**AQA 2 Tasks**:
- [ ] Review overnight Playwright test results
- [ ] Review visual regression results
- [ ] Plan Playwright migration batch for today
- [ ] Check E2E test coverage

---

### **09:15 - 12:00: Morning Work Block**

#### **AQA 1: Unit Test Lead** (Always Busy)
**Primary Work** (Independent of Angular version):
- [ ] Migrate 10-20 Karma tests to Vitest (using `@UnitTestMigrator`)
- [ ] Analyze test coverage for new components
- [ ] Create test utilities and helpers
- [ ] Document test patterns in Context7

**Secondary Work** (If dev team upgraded):
- [ ] Fix broken Vitest tests after Angular upgrade
- [ ] Update TestBed configurations
- [ ] Fix test patterns for new Angular version

**Fallback Work** (If no broken tests):
- [ ] Continue Vitest migration (always more tests to migrate)
- [ ] Improve test coverage
- [ ] Create test utilities
- [ ] Document test patterns

#### **AQA 2: E2E & Visual Lead** (Always Busy)
**Primary Work** (Independent of Angular version):
- [ ] Migrate 5-10 Protractor tests to Playwright (using `@E2ETestMigrator`)
- [ ] Run visual regression tests
- [ ] Create new E2E tests for critical paths
- [ ] Update Page Objects

**Secondary Work** (If dev team upgraded):
- [ ] Fix broken Playwright tests after Angular upgrade
- [ ] Update selectors if UI changed
- [ ] Update visual regression baselines

**Fallback Work** (If no broken tests):
- [ ] Continue Protractor migration (always more tests to migrate)
- [ ] Expand visual regression coverage
- [ ] Create new E2E tests
- [ ] Improve Page Objects

---

### **13:00 - 17:00: Afternoon Work Block**

#### **AQA 1: Unit Test Lead** (Always Busy)
**Tasks**:
- [ ] Continue Vitest migration (batch processing)
- [ ] Fix test failures from dev merges
- [ ] Improve test coverage for uncovered areas
- [ ] Run full test suite on integration branch
- [ ] Prepare test status report

**Agent Usage**:
- `@UnitTestMigrator` - Template 1 (Karma → Vitest conversion)
- `@UnitTestMigrator` - Template 2 (Fix broken tests)
- `@UnitTestMigrator` - Template 3 (Coverage analysis)

#### **AQA 2: E2E & Visual Lead** (Always Busy)
**Tasks**:
- [ ] Continue Playwright migration (batch processing)
- [ ] Run visual regression on merged code
- [ ] Create new visual regression tests
- [ ] Update Page Objects for new features
- [ ] Prepare E2E test status report

**Agent Usage**:
- `@E2ETestMigrator` - Template 1 (Protractor → Playwright conversion)
- `@E2ETestMigrator` - Template 2 (Visual regression)
- `@E2ETestMigrator` - Template 3 (New E2E tests)

---

### **17:00 - 17:30: End of Day Sync**

**Both AQAs**:
- [ ] Run full test suite on integration branch
- [ ] Generate test coverage report
- [ ] Document test failures
- [ ] Report GO/NO-GO status to Tech Lead
- [ ] Plan next day's test migration work

**Status Report Format**:
```markdown
## AQA Status Report - [Date]

### AQA 1 (Unit Tests):
- Vitest Migration: [X] tests migrated today, [Y] remaining
- Test Fixes: [X] tests fixed
- Coverage: [X]% (target: 70%+)
- Status: ✅ GO / ⚠️ NO-GO

### AQA 2 (E2E & Visual):
- Playwright Migration: [X] tests migrated today, [Y] remaining
- Visual Regression: [X] tests passing, [Y] failures
- E2E Coverage: [X] critical paths covered
- Status: ✅ GO / ⚠️ NO-GO
```

---

## 🔄 **Work Independence Matrix**

| Work Type | AQA 1 | AQA 2 | Version Dependency |
|-----------|-------|-------|-------------------|
| **Test Migration** | ✅ Vitest | ✅ Playwright | ✅ Independent |
| **Test Infrastructure** | ✅ Vitest config | ✅ Playwright config | ✅ Independent |
| **Coverage Analysis** | ✅ Unit tests | ✅ E2E tests | ✅ Independent |
| **Test Creation** | ✅ Unit tests | ✅ E2E tests | ✅ Independent |
| **Test Fixes** | ⚠️ After upgrade | ⚠️ After upgrade | ⚠️ Version-dependent |
| **Visual Regression** | N/A | ✅ Always | ✅ Independent |

---

## 📊 **Workload Validation**

### **AQA 1 Workload** (Always Busy)
- **40%**: Vitest Migration (Independent)
- **30%**: Test Fixes (Version-dependent, but fallback available)
- **20%**: Coverage Analysis (Independent)
- **10%**: Infrastructure (Independent)

**Fallback**: If no test fixes needed, continue Vitest migration

### **AQA 2 Workload** (Always Busy)
- **40%**: Playwright Migration (Independent)
- **30%**: Visual Regression (Independent)
- **20%**: E2E Test Creation (Independent)
- **10%**: Infrastructure (Independent)

**Fallback**: If no test fixes needed, continue Playwright migration

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


# 🛡️ Bulletproof Prerequisites - Mandatory Checks

**Purpose**: Critical prerequisites that MUST be verified before starting any migration phase  
**Approach**: Pattern-based validation that applies across all codebases  
**Status**: Living document - updated based on real migration experience

---

## 🎯 **Core Principle**

> **Always verify, never assume.** The actual state of the codebase may differ from the plan's assumptions.

---

## ✅ **Phase 0: Prerequisites (MANDATORY)**

### 1. Version Verification ⚠️ CRITICAL
**Pattern**: Version Mismatch Detection  
**Check**:
```bash
npm list @angular/core --depth=0
```

**Why Critical**:
- Plan may assume Angular v15, but app could be v14.3.0
- Requires additional upgrade step (v14 → v15)
- Affects entire migration timeline

**Action**: Document actual version, adjust plan if needed

---

### 2. Node.js Version Compatibility ⚠️ CRITICAL
**Pattern**: Environment Compatibility  
**Check**:
```bash
node --version
```

**Requirements**:
- Angular 14-15: Node.js 18.x required
- Angular 16+: Node.js 18.x or 20.x
- Version mismatch causes CLI failures

**Action**: Switch to correct Node.js version before starting

---

### 3. Git Repository State ⚠️ CRITICAL
**Pattern**: Tool Requirements - Clean Git State  
**Check**:
```bash
git status
```

**Why Critical**:
- `ng update` requires clean git repository
- Uncommitted changes block upgrade commands
- Must commit or stash before upgrade

**Action**: 
- Commit changes: `git commit -m "Pre-migration state"`
- Or stash: `git stash push -m "Pre-migration changes"`
- Or use `--allow-dirty` flag (not recommended)

---

### 4. Build Verification ⚠️ CRITICAL
**Pattern**: Pre-Migration Baseline  
**Check**:
```bash
npm run build
```

**Why Critical**:
- Must know baseline state before migration
- Current build must pass
- Errors after migration indicate migration issues

**Action**: Fix any existing build errors before starting migration

---

### 5. Dependency Audit ⚠️ HIGH
**Pattern**: Deprecated Package Detection  
**Check**:
```bash
npm audit
npm ls --depth=0 | grep -E "UNMET|deprecated"
```

**Why Critical**:
- Deprecated packages may break during upgrade
- View Engine libraries cause performance issues
- Security vulnerabilities need addressing

**Action**: Document deprecated packages, plan replacements

---

### 6. Playwright Baseline ⚠️ HIGH
**Pattern**: Visual Regression Baseline  
**Check**:
```bash
npm run test:e2e:baseline -- --update-snapshots
```

**Why Critical**:
- Need baseline to detect visual regressions
- Golden paths must be captured
- Tests must pass before migration

**Action**: Install Playwright, capture baseline snapshots

---

## ✅ **Phase 2: Prerequisites (MANDATORY)**

### 1. Version Verification ⚠️ CRITICAL
**Check**: Actual Angular version (may be v14, not v15)
```bash
npm list @angular/core --depth=0
```

### 2. Git Repository Clean ⚠️ CRITICAL
**Check**: Repository must be clean for `ng update`
```bash
git status  # Must be clean
```

### 3. Node.js Version ⚠️ CRITICAL
**Check**: Node.js version matches Angular requirements
```bash
node --version  # Angular 14-15 requires Node.js 18.x
```

### 4. Backup Created ⚠️ HIGH
**Check**: Safety backup exists
```bash
./scripts/backup_before_migration.sh v14-baseline
```

### 5. Current Build Passes ⚠️ CRITICAL
**Check**: Build must pass before upgrade
```bash
npm run build  # Must succeed
```

### 6. Dependency Audit Complete ⚠️ HIGH
**Check**: Deprecated packages identified
```bash
./scripts/verify_dependencies.sh 15
```

---

## ✅ **Phase 3: Prerequisites (MANDATORY)**

### 1. MDC Migration Complete ⚠️ CRITICAL
**Pattern**: Legacy Module Replacement - Mandatory  
**Check**:
```bash
grep -r "MatLegacy" src/ | wc -l
# Must be 0 before proceeding to v17!
```

**Why Critical**:
- MatLegacy modules deleted in Angular v17
- Application will break if MDC migration not complete
- Must be done before v17 upgrade

**Action**: Complete MDC migration before Angular v17 upgrade

---

### 2. Angular v15 Verified ⚠️ CRITICAL
**Check**: Confirmed on Angular v15.x
```bash
npm list @angular/core --depth=0
```

### 3. Build Passes ⚠️ CRITICAL
**Check**: Current build successful
```bash
npm run build
```

### 4. Git Clean ⚠️ CRITICAL
**Check**: Repository ready
```bash
git status
```

### 5. Visual Baseline ⚠️ HIGH
**Check**: Playwright snapshots captured
```bash
ls e2e/baseline.spec.ts-snapshots/
```

---

## ✅ **Phase 4: Prerequisites (MANDATORY)**

### 1. Angular v17 Verified ⚠️ CRITICAL
**Check**: Confirmed on Angular v17.x
```bash
npm list @angular/core --depth=0
```

### 2. Material Version Sync ⚠️ CRITICAL
**Pattern**: Version Synchronization  
**Check**:
```bash
npm list @angular/core @angular/material --depth=0
# Material version MUST match Core version
```

**Why Critical**:
- Material version must match Core version
- Mismatch causes build errors (`afterRender` not found)
- Must verify after each upgrade

**Action**: Upgrade Material to match Core version

---

### 3. Build Passes ⚠️ CRITICAL
**Check**: Current build successful
```bash
npm run build
```

### 4. Git Clean ⚠️ CRITICAL
**Check**: Repository ready
```bash
git status
```

### 5. All Tests Pass ⚠️ HIGH
**Check**: Unit and E2E tests passing
```bash
npm test
npm run test:e2e
```

---

## 🔍 **Validation Script**

### Quick Prerequisites Check
```bash
#!/bin/bash
# Run this before starting any phase

echo "=== Prerequisites Check ==="

# 1. Version Verification
echo "1. Angular Version:"
npm list @angular/core --depth=0

# 2. Node.js Version
echo "2. Node.js Version:"
node --version

# 3. Git State
echo "3. Git State:"
git status --short

# 4. Build Status
echo "4. Build Status:"
npm run build 2>&1 | tail -5

# 5. Material Version (if applicable)
echo "5. Material Version:"
npm list @angular/material --depth=0 2>/dev/null || echo "Not installed"

# 6. MatLegacy Check (Phase 3+)
echo "6. MatLegacy Imports:"
grep -r "MatLegacy" src/ 2>/dev/null | wc -l

echo "=== Check Complete ==="
```

---

## 📋 **Quick Reference Checklist**

### Before ANY Phase:
- [ ] Angular version verified (actual, not assumed)
- [ ] Node.js version correct
- [ ] Git repository clean
- [ ] Current build passes
- [ ] Backup created

### Before Phase 2 (v14 → v15):
- [ ] All Phase 0 prerequisites met
- [ ] Version verified (may be v14.3.0)
- [ ] Node.js 18.x installed

### Before Phase 3 (v15 → v17):
- [ ] MDC migration complete (0 MatLegacy imports)
- [ ] Angular v15 verified
- [ ] Build passes

### Before Phase 4 (v17 → v20):
- [ ] Angular v17 verified
- [ ] Material version matches Core version
- [ ] Build passes
- [ ] All tests pass

---

## 🎓 **Pattern Summary**

### Critical Patterns:
1. **Version Verification** - Always check actual version first
2. **Git Clean State** - Required for `ng update` commands
3. **Node.js Compatibility** - Version must match Angular requirements
4. **Material Version Sync** - Material must match Core version
5. **MDC Before v17** - Critical timing requirement
6. **Build Baseline** - Current build must pass before upgrade

### Detection Patterns:
- Version mismatch → Check actual version
- Git errors → Check git state
- CLI failures → Check Node.js version
- Material errors → Check version synchronization
- v17 failures → Check MDC migration status

---

**Last Updated**: 2025-11-26 21:00 UTC


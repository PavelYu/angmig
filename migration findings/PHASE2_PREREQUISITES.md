# ⚠️ Phase 2 Prerequisites - Action Required

**Date**: 2025-11-26  
**Status**: ⚠️ BLOCKED - Prerequisites not met  
**Issue**: Cannot proceed with Angular upgrade until prerequisites are resolved

---

## 🚨 **Blocking Issues**

### Issue 1: Git Repository Not Clean ⚠️
**Error**: `Error: Repository is not clean. Please commit or stash any changes before updating.`

**Required Action**:
```bash
# Option 1: Commit changes (recommended)
git add .
git commit -m "Phase 0: Dependency replacement and Playwright setup"

# Option 2: Stash changes (temporary)
git stash push -m "Phase 0 work"
```

**Why**: Angular CLI requires clean git state for safety checks

---

### Issue 2: Node.js Version Compatibility ⚠️
**Current**: Node.js v20.19.4  
**Recommended**: Node.js 18.x for Angular 14-15 migration

**Required Action**:
```bash
# Install Node.js 18 if not available
nvm install 18
nvm use 18

# Verify version
node --version  # Should show v18.x.x
```

**Why**: Angular 14 CLI has compatibility issues with Node.js v20

---

### Issue 3: Angular CLI Bootstrap Module ⚠️
**Error**: `Error: Cannot find module './bootstrap'`

**Possible Causes**:
- Node.js version mismatch
- Corrupted node_modules
- Missing dependencies

**Required Action**:
```bash
# After switching to Node.js 18
cd new_app
rm -rf node_modules package-lock.json
npm install

# Verify Angular CLI works
npx @angular/cli@14 version
```

---

## ✅ **Pre-Upgrade Checklist**

Before proceeding with Angular upgrade:

- [ ] **Node.js Version**: Switch to Node.js 18.x
- [ ] **Git State**: Commit or stash all changes
- [ ] **Dependencies**: Clean install (`rm -rf node_modules && npm install`)
- [ ] **Angular CLI**: Verify CLI works (`npx @angular/cli@14 version`)
- [ ] **Backup**: Create backup (if not already done)
- [ ] **Baseline**: Capture Playwright baseline snapshots

---

## 🎯 **Next Steps After Prerequisites**

Once prerequisites are resolved:

1. **Upgrade Angular Core**:
   ```bash
   npx @angular/cli@15 update @angular/core@15 @angular/cli@15 --force
   ```

2. **Upgrade Angular Material**:
   ```bash
   npx @angular/cli@15 update @angular/material@15
   ```

3. **Run MDC Migration**:
   ```bash
   npx @angular/cli@15 generate @angular/material:mdc-migration
   ```

4. **Fix Breaking Changes**:
   - Use Build Fixer agent to fix errors
   - Document all findings

---

## 📊 **Pattern Recognition**

### Pattern: Tool Requirements - Clean Git State
**Detection**: Angular CLI requires clean git repository  
**Solution**: Commit or stash changes before upgrade  
**Impact**: Blocks upgrade until resolved

### Pattern: Environment Compatibility - Version Mismatch
**Detection**: Node.js version incompatible with Angular CLI  
**Solution**: Use recommended Node.js version  
**Impact**: May cause module resolution issues

### Pattern: Module Resolution - CLI Bootstrap
**Detection**: Angular CLI bootstrap module not found  
**Solution**: Fix Node.js version, reinstall dependencies  
**Impact**: Prevents Angular CLI from running

---

**See PHASE2_UPGRADE_LOG.md for detailed upgrade log**


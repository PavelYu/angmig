# 📝 Workshop Updates Log

**Last Updated**: 2025-11-26  
**Based On**: Real migration experience (Angular 14.3.0 → Angular 20 attempt)

---

## ✅ **Updates Applied**

### 1. Version Path Correction
- **Added**: Phase 2.0: v14 → v15 upgrade step
- **Files**: `plan.md`, `4-DAY-QUICK-REFERENCE.md`
- **Reason**: Many apps start at Angular 14, not 15

### 2. Playwright Installation
- **Changed**: `npm init playwright@latest --yes` → `npm install --save-dev @playwright/test`
- **Files**: `plan.md`, `4-DAY-QUICK-REFERENCE.md`, `agents/roles/test_migrator.md`
- **Reason**: `--yes` flag doesn't exist, requires interactive input

### 3. Polyfills Configuration
- **Added**: Step to create `src/polyfills.ts` and configure `angular.json`
- **Files**: `plan.md`, `TROUBLESHOOTING_GUIDE.md`
- **Reason**: Angular 14 requires string path, not array

### 4. Common Build Errors Section
- **Added**: Comprehensive troubleshooting section with 10 common issues
- **Files**: `plan.md`, `TROUBLESHOOTING_GUIDE.md` (new file)
- **Reason**: Real migration revealed multiple build errors

### 5. Template Syntax Guidelines
- **Added**: Restriction on arrow functions in templates
- **Files**: `plan.md`, `agents/roles/build_fixer.md`
- **Reason**: Templates don't support arrow functions directly

### 6. Location API Migration
- **Added**: Pattern for replacing `Location.back()` with Router
- **Files**: `plan.md`, `agents/roles/logic_refactorer.md`
- **Reason**: `Location.back()` doesn't exist in Angular

### 7. Module Import Checklist
- **Added**: Verification step for third-party module imports
- **Files**: `plan.md`, `TROUBLESHOOTING_GUIDE.md`
- **Reason**: Missing imports cause build failures

### 8. Highcharts Compatibility Warning
- **Added**: Compatibility note and upgrade path
- **Files**: `plan.md`, `TROUBLESHOOTING_GUIDE.md`
- **Reason**: highcharts-angular v3.1.2 incompatible with Angular 14

### 9. AG Grid API Migration
- **Added**: AG Grid v28+ API migration patterns
- **Files**: `agents/roles/logic_refactorer.md`
- **Reason**: API changes break existing code

### 10. View Engine Detection
- **Added**: Step to identify View Engine libraries
- **Files**: `agents/roles/dependency_auditor.md`
- **Reason**: View Engine libraries cause performance issues

---

## 📋 **New Documents Created**

1. **TROUBLESHOOTING_GUIDE.md** - Comprehensive troubleshooting with real solutions
2. **MIGRATION_EXPERIENCE_UPDATES.md** - Summary of all updates applied
3. **WORKSHOP_UPDATES_LOG.md** - This file (update tracking)

---

## 🎯 **Agent Updates**

### Build Fixer Agent
- ✅ Added polyfills configuration pattern
- ✅ Added template syntax fix pattern
- ✅ Added module resolution troubleshooting
- ✅ Added Location API migration pattern

### Dependency Auditor Agent
- ✅ Added View Engine library detection
- ✅ Enhanced compatibility checking

### Logic Refactorer Agent
- ✅ Added Location API migration template
- ✅ Added AG Grid v28+ API migration template

### Test Migrator Agent
- ✅ Updated Playwright installation method
- ✅ Added Day 0 setup template

---

## 📊 **Statistics**

- **Total Updates**: 10 major updates
- **Files Modified**: 8 workshop files
- **New Files Created**: 3
- **Agent Patterns Added**: 5
- **Troubleshooting Solutions**: 10

---

## 🔄 **Next Workshop Iteration**

When running the actual workshop, these updates should help eliminate most issues:

1. ✅ Version path now includes v14 → v15
2. ✅ Playwright installation method corrected
3. ✅ Polyfills configuration clarified
4. ✅ Common build errors documented
5. ✅ Template syntax restrictions added
6. ✅ Module import checklist added
7. ✅ API migration patterns documented
8. ✅ Troubleshooting guide available

---

**See MIGRATION_FINDINGS.md for complete findings from migration attempt**


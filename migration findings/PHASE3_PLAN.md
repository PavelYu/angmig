# 📋 Phase 3: Angular Upgrade (v15 → v17) - Plan

**Date**: 2025-11-26  
**Status**: Planning  
**Current Version**: Angular 15.2.10  
**Target Version**: Angular 17.x

---

## 🎯 **Phase 3 Objectives**

Upgrade Angular from v15.2.10 to v17.x:
1. Address MDC migration (MatLegacy modules)
2. Upgrade Angular v15 → v16
3. Upgrade Angular v16 → v17
4. Remove MatLegacy modules (mandatory in v17)
5. Fix breaking changes
6. Document findings

---

## ⚠️ **Critical: MDC Migration**

**Status**: ⚠️ REQUIRED before v17 upgrade

**Current State**:
- MatLegacy modules present via aliases
- Works in Angular 15
- **Will be deleted in Angular 17**

**Action Required**:
- Replace MatLegacy modules with MDC modules
- Update CSS/SCSS styles
- Test visual regression

---

## 📋 **Upgrade Path**

### Step 1: MDC Migration (Before v17)
**Priority**: HIGH  
**Status**: ⏳ PENDING

**Tasks**:
1. Run MDC migration schematic
2. Replace MatLegacy imports
3. Update CSS/SCSS styles
4. Test visual regression

### Step 2: Angular v15 → v16
**Priority**: MEDIUM  
**Status**: ⏳ PENDING

**Tasks**:
1. Upgrade Angular core to v16
2. Fix breaking changes
3. Verify build

### Step 3: Angular v16 → v17
**Priority**: HIGH  
**Status**: ⏳ PENDING

**Tasks**:
1. Upgrade Angular core to v17
2. Remove MatLegacy modules (mandatory)
3. Fix breaking changes
4. Verify build

---

## 📊 **Current State**

### Angular Version
- **Core**: 15.2.10 ✅
- **Material**: 15.2.9 ✅
- **CDK**: 15.2.9 ✅

### Build Status
- **Errors**: 0 ✅
- **Warnings**: Peer dependencies, bundle size ⚠️

### MatLegacy Modules
- **Status**: Present via aliases ⚠️
- **Count**: ~10 modules
- **Action**: MDC migration required

---

## 🎓 **Patterns Expected**

1. **MDC Migration** - Replace legacy modules
2. **Control Flow** - `@if`, `@for` syntax (v17)
3. **Standalone** - Optional migration
4. **API Changes** - Breaking changes between versions

---

## 📚 **Documentation**

- `PHASE3_PLAN.md` - This document
- `PHASE2_COMPLETE.md` - Phase 2 summary
- `MIGRATION_FINDINGS.md` - All findings

---

**Ready to proceed with Phase 3**


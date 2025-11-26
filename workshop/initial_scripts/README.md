# Initial Scripts & Configuration Files

This folder contains the initial configuration files from the Angular v15.2.10 project baseline.

## 📄 Files

### Configuration Files
- **`package.json`** - Project dependencies and scripts (Angular v15.2.10)
- **`package-lock.json`** - Locked dependency versions (baseline)
- **`angular.json`** - Angular workspace configuration
- **`tsconfig.json`** - TypeScript compiler configuration

## 🎯 Purpose

These files represent the **starting point** of the migration (Angular v15.2.10) and are kept for:

1. **Reference** - Compare against post-migration state
2. **Verification** - Validate what changed during migration
3. **Rollback** - Restore if needed
4. **Documentation** - Show the "before" state

## 📊 Key Information from Baseline

### Angular Version
- **Core**: 15.2.10
- **Material**: 15.2.9
- **CLI**: 15.2.11

### Node & TypeScript
- **Node**: 18.x (required)
- **TypeScript**: ~4.9.0

### Key Dependencies
- **AG Grid**: ~28.2.1 (needs upgrade to v31+)
- **ngx-perfect-scrollbar**: ~10.1.1 (deprecated, needs replacement)
- **RxJS**: ~7.5.0
- **Highcharts**: 9.3.3 (needs upgrade to v11+)

### Testing
- **Unit**: Karma + Jasmine (migrate to Vitest)
- **E2E**: Protractor (migrate to Playwright)

## 🔍 How to Use

### Compare Dependencies
```bash
# See what changed
diff initial_scripts/package.json package.json
```

### Verify Versions
```bash
# Check baseline versions
cat initial_scripts/package.json | grep "@angular/core"
```

### Restore if Needed
```bash
# Rollback to baseline (use with caution!)
cp initial_scripts/package.json .
cp initial_scripts/package-lock.json .
npm install
```

## ⚠️ Important Notes

- **Do NOT modify** these files - they are the baseline reference
- **Do NOT delete** - needed for verification and rollback
- These files are from the **pre-migration** state
- The actual project files are in the root directory

---

**Baseline Date**: 2025-11-20  
**Angular Version**: 15.2.10  
**Migration Target**: Angular 20

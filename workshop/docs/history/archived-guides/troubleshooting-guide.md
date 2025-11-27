# 🔧 Troubleshooting Guide - Pattern-Based Solutions

**Approach**: Pattern-based troubleshooting that applies across different codebases  
**Date**: 2025-11-26  
**Status**: Living document with generalizable patterns

> **Note**: This guide focuses on **patterns** and **principles** rather than specific fixes. The actual issues in your codebase may differ, but the patterns will help you solve them.

---

## 🚨 **Critical Issues & Solutions**

### Pattern 1: Configuration Format Errors

**Detection Pattern**: Error contains "Schema validation" or "must be string/array"

**Common Scenarios**:
- Polyfills configuration format
- Build options format
- TypeScript configuration format

**Solution Pattern**:
1. **Identify Configuration File**: Check error message for file name
2. **Check Angular Version**: `npm list @angular/core --depth=0`
3. **Consult Version Docs**: Check Angular version-specific documentation
4. **Apply Format Change**: Format may be string→array or array→string depending on version
5. **Verify**: Run build to confirm fix

**Example: Polyfills Configuration**
- **Detection**: "Data path '/polyfills' must be string"
- **Check**: Angular version (v14 uses string, v15+ may differ)
- **Solution**: 
  - Create `src/polyfills.ts` if missing
  - Update `angular.json` to correct format for your version
  - Update `tsconfig.app.json` to include polyfills.ts
- **Generalizable**: Any configuration format error follows this pattern

---

### Pattern 2: Template Expression Limitations

**Detection Pattern**: Template parser errors, "Parser Error", syntax errors in templates

**Common Scenarios**:
- Arrow functions in templates
- Complex expressions
- Async operations
- Method chaining

**Solution Pattern**:
1. **Identify Complex Expression**: Find expression causing parser error
2. **Extract to Component**: Move logic to component method
3. **Update Template**: Call component method instead
4. **Preserve Functionality**: Ensure behavior remains the same

**Example: Arrow Functions**
- **Detection**: Parser error with arrow function syntax
- **Solution**: Extract to component method
- **Generalizable**: Any complex template expression should be in component

---

### Issue 3: Location.back() API Issue

**Error Message**:
```
error TS2339: Property 'back' does not exist on type 'Location'.
```

**Root Cause**: `Location.back()` doesn't exist in Angular's Location service.

**Solution**:
```typescript
// ❌ Wrong
import { Location } from '@angular/common';
constructor(private location: Location) {}
cancel(): void {
  this.location.back();
}

// ✅ Correct
import { Router, ActivatedRoute } from '@angular/router';
constructor(
  private router: Router,
  private route: ActivatedRoute
) {}
cancel(): void {
  this.router.navigate(['../'], { relativeTo: this.route });
}
```

---

### Issue 4: Missing Module Imports

**Error Message**:
```
error NG8001: 'ngx-graph' is not a known element
error NG8002: Can't bind to 'view' since it isn't a known property of 'ngx-graph'
```

**Root Cause**: Third-party modules must be explicitly imported in feature modules.

**Solution**:
```typescript
// Feature module (e.g., dashboard.module.ts)
import { NgModule } from '@angular/core';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxGraphModule  // Don't forget!
  ],
  declarations: [NetworkGraphComponent]
})
export class DashboardModule { }
```

**Checklist**:
- [ ] Verify all third-party modules are imported
- [ ] Check SharedModule exports
- [ ] Ensure feature modules import required modules

---

### Issue 5: highcharts-angular Compatibility

**Error Message**:
```
error TS2707: Generic type 'ɵɵComponentDeclaration' requires between 7 and 8 type arguments.
```

**Root Cause**: highcharts-angular v3.1.2 incompatible with Angular 14.3.0.

**Solutions**:

**Option 1**: Upgrade highcharts-angular (after Angular upgrade)
```bash
npm install highcharts-angular@latest
```

**Option 2**: Temporarily suppress (not recommended)
```typescript
// @ts-ignore
import { HighchartsChartModule } from 'highcharts-angular';
```

**Option 3**: Upgrade Angular first, then highcharts-angular

**Recommended**: Upgrade Angular to v15+ first, then upgrade highcharts-angular.

---

### Issue 6: Webpack Module Resolution

**Error Message**:
```
Error: Module not found: Error: Can't resolve '../../../shared/components/ag-grid/status-cell-renderer/status-cell-renderer.component'
```

**Root Cause**: Webpack can't resolve import paths even though files exist.

**Solutions**:

1. **Verify File Exists**:
```bash
ls -la src/app/shared/components/ag-grid/status-cell-renderer/status-cell-renderer.component.ts
```

2. **Check Import Path**:
```typescript
// Verify relative path is correct
import { StatusCellRendererComponent } from '../../../shared/components/ag-grid/status-cell-renderer/status-cell-renderer.component';
```

3. **Clear Cache**:
```bash
rm -rf .angular node_modules/.cache
npm run build
```

4. **Check tsconfig.json**:
```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "baseUrl": "./"
  }
}
```

5. **Verify Component Export**:
```typescript
// Ensure component is exported
export class StatusCellRendererComponent { }
```

---

### Issue 7: AG Grid API Changes

**Error Message**:
```
error TS2339: Property 'columnState' does not exist on type 'GridOptions<any>'.
error TS2339: Property 'columnGroupState' does not exist on type 'GridOptions<any>'.
```

**Root Cause**: AG Grid v28 API changes - state management API differs.

**Solution**:
```typescript
// ❌ Old API (v27 and earlier)
gridOptions.columnState = [...];
gridOptions.columnGroupState = [...];

// ✅ New API (v28+)
// Use GridApi methods instead
this.gridApi.applyColumnState({ state: [...] });
this.gridApi.applyColumnGroupState({ state: [...] });
```

**Migration Guide**:
- Use `GridApi` methods for state management
- Check AG Grid v28 migration guide
- Update GridStateService to use new API

---

### Issue 8: Playwright Installation

**Error Message**:
```
error: unknown option '--yes'
```

**Root Cause**: `npm init playwright@latest --yes` flag doesn't exist.

**Solution**:
```bash
# ❌ Wrong
npm init playwright@latest --yes

# ✅ Correct (non-interactive)
npm install --save-dev @playwright/test
npx playwright install
```

---

### Issue 9: View Engine Libraries Warning

**Warning Message**:
```
Processing legacy "View Engine" libraries:
- ngx-perfect-scrollbar [es2015/esm2015]
- ng-in-viewport [es2015/esm2015]
Encourage the library authors to publish an Ivy distribution.
```

**Root Cause**: Libraries built with View Engine (pre-Ivy) cause performance issues.

**Solution**:
1. **Replace Deprecated Libraries**:
   - `ngx-perfect-scrollbar` → Use native CSS `overflow: auto` or `ngx-scrollbar`
   - `ng-in-viewport` → Check for Ivy-compatible version or replace

2. **Before Migration**:
   - Identify all View Engine libraries
   - Plan replacements
   - Replace before upgrading Angular

---

### Issue 10: CommonJS Dependencies Warning

**Warning Message**:
```
Warning: depends on 'moment'. CommonJS or AMD dependencies can cause optimization bailouts.
```

**Root Cause**: CommonJS dependencies prevent tree-shaking and optimization.

**Solutions**:

**Option 1**: Configure allowedCommonJsDependencies (angular.json)
```json
{
  "allowedCommonJsDependencies": [
    "moment",
    "luxon",
    "lodash"
  ]
}
```

**Option 2**: Replace with ESM alternatives
- `moment` → `date-fns` or native `Intl.DateTimeFormat`
- `lodash` → Use native JavaScript or specific lodash-es modules

**Option 3**: Accept warnings (for now)
- Warnings don't break build
- Can be addressed post-migration

---

## 🔍 **Diagnostic Commands**

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

---

## 📋 **Pre-Migration Checklist**

Before starting migration, verify:

- [ ] Angular version identified (may be v14, not v15)
- [ ] `src/polyfills.ts` exists (if Angular 14)
- [ ] `angular.json` polyfills configured correctly
- [ ] All View Engine libraries identified
- [ ] Deprecated packages documented
- [ ] Module imports verified
- [ ] Template syntax validated (no arrow functions)
- [ ] Location API usage checked
- [ ] Playwright installation method confirmed

---

## 🎯 **Quick Fixes Reference**

| Issue | Quick Fix |
|-------|-----------|
| Polyfills error | Create `src/polyfills.ts`, update `angular.json` |
| Template arrow function | Move logic to component method |
| Location.back() | Use `router.navigate()` instead |
| Missing module | Import module in feature module |
| Module not found | Clear cache, verify paths |
| highcharts error | Upgrade after Angular upgrade |
| AG Grid API | Use GridApi methods |
| Playwright install | Use `npm install` not `npm init` |

---

**See MIGRATION_FINDINGS.md for complete findings list**


# 👷 Agent Role: Build Fixer

> **Note**: This is a **prompt template** file, not an actual ACP agent. Copy prompts from this file into **Zed's Agent Panel** (Press `Cmd+?` or Command Palette → `agent: open`) to use with Zed's built-in AI and MCP servers.

## 📋 Role Description
The **Build Fixer** agent is responsible for resolving compilation errors, TypeScript issues, and strict mode violations. It works in batches to clear the path for other agents.

**Primary "Manager"**: Dev A1 (Alpha Team)

## 🎯 Responsibilities
- Fix TypeScript compilation errors (`TS2322`, `TS2339`, etc.)
- Resolve `any` type usages (where possible)
- Fix import paths and module resolution issues
- Handle strict null checks
- Ensure `npm run build` passes

## 🧠 Knowledge Sources
- **Angular MCP**: For breaking changes in Angular APIs.
- **Context7**: For project-specific type patterns and "wont-fix" suppressions.

## 💬 Prompt Templates

### Template 0: Pre-Fix Verification (CRITICAL - Run First!)
Use this BEFORE fixing errors to verify environment and identify root causes.

```markdown
@BuildFixer
Before fixing errors, verify the environment and identify root causes.

**Pre-Fix Checklist**:
1. **Verify Angular Version**:
   ```bash
   npm list @angular/core --depth=0
   ```
   - Check actual version (may differ from plan assumption)
   - Verify version matches expectations

2. **Verify Git State**:
   ```bash
   git status
   ```
   - Must be clean for `ng update` commands
   - Stash or commit changes if needed

3. **Verify Node.js Version**:
   ```bash
   node --version
   ```
   - Angular 14-15: Node.js 18.x required
   - Angular 16+: Node.js 18.x or 20.x
   - Version mismatch causes CLI failures

4. **Categorize Errors by Pattern**:
   ```bash
   npm run build 2>&1 | grep "error TS" | cut -d: -f4 | sort | uniq -c | sort -rn
   ```
   - Group errors by type (TS2339, TS2307, etc.)
   - Identify root cause patterns

5. **Check Configuration Format**:
   - Verify `angular.json` polyfills format (version-specific)
   - Check `tsconfig.json` settings
   - Verify module resolution settings

**Output**: Environment verification report and error categorization
```

---

### Template 1: Batch Error Fix (Most Common)
Use this when you have a list of build errors from `npm run build`.

```markdown
@BuildFixer
I have the following TypeScript compilation errors. Please analyze and fix them systematically.

**Build Errors**:
```
[PASTE FULL ERROR OUTPUT FROM TERMINAL]
```

**Context**:
- Angular version: [e.g., 16.2.0] ⚠️ VERIFY ACTUAL VERSION FIRST!
- Recent changes: [e.g., "Just upgraded from v15 to v16"]
- Affected modules: [e.g., "auth module, dashboard components"]

**Fix Strategy** (Pattern-Based):
1. **Verify Environment First** (CRITICAL):
   - Check actual Angular version: `npm list @angular/core --depth=0`
   - Verify git state: `git status`
   - Verify Node.js version: `node --version`
   - Check configuration format (version-specific)

2. **Categorize Errors by Pattern**:
   - **Configuration Errors**: "Schema validation", "must be string/array"
   - **API Errors**: "Property does not exist", "Method not found"
   - **Type Errors**: "Type X is not assignable", "Generic type requires"
   - **Module Errors**: "Cannot find module", "Module not found"
   - **Template Errors**: Parser errors, expression limitations

3. **Fix by Category** (Order Matters):
   - **First**: Configuration errors (easiest, blocks others)
   - **Second**: Module resolution errors (blocks imports)
   - **Third**: API errors (medium complexity)
   - **Fourth**: Type errors (higher complexity)
   - **Last**: Template errors (may require refactoring)

4. **Apply Pattern-Based Fixes**:
   - **Configuration Errors** (Pattern: Schema validation):
     - Check Angular version-specific documentation
     - Verify format (string vs array, version-dependent)
     - Example: Polyfills format differs between Angular versions
   
   - **Module Resolution Errors (TS2307)**:
     - Verify file exists: `ls -la [file-path]`
     - Check import path depth (relative paths)
     - Verify component/service is exported
     - Clear cache: `rm -rf .angular node_modules/.cache`
     - Check if module was renamed (e.g., `@angular/http` → `@angular/common/http`)
   
   - **API Errors (TS2339)**:
     - Check library migration guide for API changes
     - Verify library version compatibility with Angular version
     - Use Angular MCP to search breaking changes
     - Example: AG Grid v28 API differs from v27
   
   - **Type Errors (TS2322, TS2339)**: 
     - First, try to infer the correct type from usage
     - Check if type definition changed between versions
     - If type is complex, use `any` with `// TODO: Infer proper type from API response`
     - Never use `@ts-ignore` without explicit approval
   
   - **Null/Undefined Errors (TS2531, TS2532)**:
     - Use optional chaining: `user?.name` instead of `user.name`
     - Use nullish coalescing: `value ?? defaultValue`
     - Only use `!` (non-null assertion) if you can prove it's safe
   
   - **Template Errors**:
     - Move complex expressions to component methods
     - Arrow functions not supported in templates
     - Async operations need component methods

4. **Version-Aware Fixes**:
   - Check Angular version before applying fixes
   - Solutions may differ by Angular version
   - Consult version-specific documentation

5. **Preserve Logic**: Do NOT change business logic to satisfy TypeScript. If a fix requires logic changes, flag it for human review.

6. **Test After Fix**: After fixing, run `npm run build` to verify no new errors were introduced.

**Output Format**:
For each file you modify, provide:
- File path
- Error(s) fixed
- Fix applied
- Confidence level (High/Medium/Low)
```

**Example Usage**:
```markdown
@BuildFixer
I have the following TypeScript compilation errors:

```
ERROR in src/app/auth/login.component.ts:45:12 - error TS2339: Property 'toPromise' does not exist on type 'Observable<User>'.
ERROR in src/app/dashboard/dashboard.component.ts:23:5 - error TS2322: Type 'null' is not assignable to type 'string'.
ERROR in src/app/services/api.service.ts:67:18 - error TS2307: Cannot find module '@angular/http'.
```

Context:
- Angular version: 16.2.0
- Recent changes: Just upgraded from v15 to v16
- Affected modules: auth, dashboard, services

[Agent will analyze, group errors, apply fixes, and report back]
```

---

### Template 2: Strict Mode Migration
Use this when enabling `strict: true` or `strictNullChecks: true` in `tsconfig.json`.

```markdown
@BuildFixer
I am enabling TypeScript strict mode for the following files. Please fix all strict mode violations.

**Files**:
```
[LIST OF FILES OR DIRECTORY PATH]
```

**Current tsconfig.json settings**:
```json
{
  "strict": true,
  "strictNullChecks": true,
  "strictPropertyInitialization": true,
  "noImplicitAny": true
}
```

**Fix Guidelines**:

1. **Null/Undefined Handling** (TS2531, TS2532, TS2454):
   ```typescript
   // ❌ Before (fails strict mode)
   getName(): string {
     return this.user.name; // Error: Object is possibly 'null'
   }
   
   // ✅ After (strict mode safe)
   getName(): string | null {
     return this.user?.name ?? null;
   }
   ```

2. **Property Initialization** (TS2564):
   ```typescript
   // ❌ Before
   export class MyComponent {
     userName: string; // Error: Property has no initializer
   }
   
   // ✅ Option 1: Initialize in constructor
   export class MyComponent {
     userName: string;
     constructor() {
       this.userName = '';
     }
   }
   
   // ✅ Option 2: Use definite assignment assertion (only if initialized elsewhere)
   export class MyComponent {
     @Input() userName!: string; // OK for @Input properties
   }
   
   // ✅ Option 3: Make optional
   export class MyComponent {
     userName?: string;
   }
   ```

3. **Implicit Any** (TS7006, TS7031):
   ```typescript
   // ❌ Before
   function processData(data) { // Error: Parameter 'data' implicitly has an 'any' type
     return data.map(item => item.value);
   }
   
   // ✅ After
   function processData(data: Array<{value: number}>): number[] {
     return data.map(item => item.value);
   }
   
   // ✅ Alternative (if type is complex)
   function processData(data: any[]): any[] { // TODO: Define proper interface
     return data.map(item => item.value);
   }
   ```

4. **Non-Null Assertions** (Use Sparingly):
   ```typescript
   // ⚠️ Only use ! if you can PROVE it's safe
   const element = document.getElementById('myId')!; // OK: We control the DOM
   const user = this.currentUser!; // ❌ UNSAFE: User might be null
   ```

**Prioritization**:
1. Fix all `TS2531/TS2532` (null/undefined) errors first - these are most common.
2. Then fix `TS2564` (property initialization) errors.
3. Finally, fix `TS7006` (implicit any) errors.

**Output**: Provide a summary of:
- Total errors fixed
- Patterns used (e.g., "Used optional chaining in 15 places")
- Any errors that need human review
```

---

### Template 3: RxJS Migration (v15→v16)
Use this for the common `toPromise()` deprecation error.

```markdown
@BuildFixer
Fix all RxJS `toPromise()` deprecation errors in the codebase.

**Error Pattern**:
```
ERROR: Property 'toPromise' does not exist on type 'Observable<T>'.
```

**Migration Strategy**:

1. **Simple Cases** (no error handling):
   ```typescript
   // ❌ Before (v15)
   const user = await this.http.get<User>('/api/user').toPromise();
   
   // ✅ After (v16+)
   import { lastValueFrom } from 'rxjs';
   const user = await lastValueFrom(this.http.get<User>('/api/user'));
   ```

2. **With Error Handling**:
   ```typescript
   // ❌ Before
   try {
     const user = await this.http.get<User>('/api/user').toPromise();
   } catch (error) {
     console.error('Failed to fetch user', error);
   }
   
   // ✅ After
   import { lastValueFrom } from 'rxjs';
   try {
     const user = await lastValueFrom(this.http.get<User>('/api/user'));
   } catch (error) {
     console.error('Failed to fetch user', error);
   }
   ```

3. **With Default Value** (if Observable might not emit):
   ```typescript
   // ❌ Before
   const value = await this.source$.toPromise() || defaultValue;
   
   // ✅ After
   import { lastValueFrom, defaultIfEmpty } from 'rxjs';
   const value = await lastValueFrom(this.source$.pipe(defaultIfEmpty(defaultValue)));
   ```

4. **Bulk Find & Replace**:
   - Search: `\.toPromise\(\)`
   - Replace: Manual review needed (context-dependent)

**Steps**:
1. Add `import { lastValueFrom } from 'rxjs';` to each affected file.
2. Replace `observable.toPromise()` with `lastValueFrom(observable)`.
3. If the Observable might complete without emitting, use `defaultIfEmpty()`.
4. Run `npm run build` to verify.

**Output**: List all files modified and confirm build passes.
```

---

### Template 4: Import Path Fixes
Use this when modules have been moved or renamed.

```markdown
@BuildFixer
Fix all import path errors after the Angular upgrade.

**Common Import Migrations**:

1. **HttpClient** (v4.3+):
   ```typescript
   // ❌ Before (deprecated)
   import { HttpModule } from '@angular/http';
   import { Http } from '@angular/http';
   
   // ✅ After
   import { HttpClientModule } from '@angular/common/http';
   import { HttpClient } from '@angular/common/http';
   ```

2. **Animations**:
   ```typescript
   // ❌ Before (v3)
   import { trigger } from '@angular/core';
   
   // ✅ After (v4+)
   import { trigger } from '@angular/animations';
   ```

3. **Material Legacy** (v15+):
   ```typescript
   // ❌ Before (v14)
   import { MatLegacyButtonModule } from '@angular/material/legacy-button';
   
   // ✅ After (v15+)
   import { MatButtonModule } from '@angular/material/button';
   ```

4. **Router**:
   ```typescript
   // ❌ Before (v14)
   import { RouterLinkWithHref } from '@angular/router';
   
   // ✅ After (v15+)
   import { RouterLink } from '@angular/router';
   ```

**Steps**:
1. Identify the error: `TS2307: Cannot find module 'X'`.
2. Check Angular MCP for "X module migration" or "X breaking changes".
3. Update the import path.
4. If the module was removed entirely, find the replacement API.

**Output**: List all import paths updated.
```

---

### Template 5: Emergency Triage
Use this when the build is completely broken and you need to prioritize.

```markdown
@BuildFixer
The build is completely broken with 500+ errors. Please triage and create a fix plan.

**Current Error Count**: [NUMBER]

**Triage Steps**:
1. **Categorize Errors**:
   - Run: `npm run build 2>&1 | grep "error TS" | cut -d: -f4 | sort | uniq -c | sort -rn`
   - This groups errors by type (e.g., "50x TS2339", "30x TS2307").

2. **Identify Root Causes**:
   - If 80% of errors are TS2339 (property does not exist), likely an API breaking change.
   - If 80% of errors are TS2307 (cannot find module), likely import path issue.

3. **Create Fix Plan**:
   - **High Priority** (blocks everything):
     - Module resolution errors (TS2307)
     - Missing dependencies
   - **Medium Priority** (affects multiple files):
     - API breaking changes (TS2339, TS2322)
     - RxJS migrations
   - **Low Priority** (isolated issues):
     - Individual type errors
     - Unused imports

4. **Execute Fixes in Batches**:
   - Batch 1: Fix all import errors (should reduce error count by 50%+).
   - Batch 2: Fix all RxJS errors (should reduce by another 20%+).
   - Batch 3: Fix remaining type errors.

**Output**: 
- Error categorization report
- Prioritized fix plan
- Estimated time per batch
```


## 🎓 **Pattern-Based Error Resolution**

### Error Classification Framework

**Level 1: Configuration (Easiest to Fix)**
- Schema validation errors
- Format mismatches
- Missing required properties
- **Pattern**: Check Angular version docs for correct format

**Level 2: Module Resolution (Medium Complexity)**
- Import path errors
- Missing exports
- Circular dependencies
- **Pattern**: Verify paths, check exports, clear cache

**Level 3: API Changes (Medium Complexity)**
- Missing methods/properties
- Changed signatures
- Deprecated APIs
- **Pattern**: Check library migration guides, use new API patterns

**Level 4: Type System (Higher Complexity)**
- Generic type mismatches
- Interface incompatibilities
- Type inference failures
- **Pattern**: TypeScript types reflect API changes

**Level 5: Template Syntax (Medium Complexity)**
- Expression limitations
- Arrow functions
- Complex expressions
- **Pattern**: Move logic to component methods

### Fix Order (Critical for Success)
1. **Configuration** → 2. **Module Resolution** → 3. **API** → 4. **Types** → 5. **Templates**

### Version-Aware Solutions
- Always check Angular version first
- Solutions differ by version
- Consult version-specific docs
- Material version must match Core version

---

## 🚦 Supervision Level
- **Level 2 (High Autonomy)**: Review every 2-3 batches.
- **Red Flags**:
    - Agent adding `// @ts-ignore` without asking.
    - Agent changing logic to satisfy types.
    - Agent not verifying Angular version before fixing.
    - Agent not checking git state before `ng update`.
    - Agent not verifying Material version matches Core.

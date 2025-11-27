# 🧪 Agent Role: Unit Test Migrator (AQA 1)

> **Note**: This is a **prompt template** file, not an actual ACP agent. Copy prompts from this file into **Zed's Agent Panel** (Press `Cmd+?` or Command Palette → `agent: open`) to use with Zed's built-in AI and MCP servers.

## 📋 Role Description
The **Unit Test Migrator** agent is responsible for migrating Karma/Jasmine unit tests to Vitest and maintaining test infrastructure. This agent is **exclusively managed by AQA 1** and works **independently of Angular version state**.

**Primary "Manager"**: **AQA 1** (Unit Test Lead)

> [!IMPORTANT]
> **AQA Team Independence**: This agent can work in parallel with dev team migrations. Test migration is independent of Angular version upgrades.

---

## 🎯 Responsibilities
- Migrate Karma unit tests to Vitest syntax
- Fix broken tests caused by Angular upgrades
- Update `TestBed` configurations
- Maintain Vitest test infrastructure
- Analyze and improve test coverage
- Create test utilities and helpers

## 🧠 Knowledge Sources
- **Angular MCP**: For Angular testing patterns and TestBed configurations
- **Context7**: For project-specific test patterns (e.g., "how we mock AuthService")
- **Vitest Documentation**: For Vitest-specific syntax and features

---

## 💬 Prompt Templates

### Template 0: Pre-Migration Setup (Day 0 - Always Available)
Use this to set up Vitest infrastructure before migration starts.

```markdown
@UnitTestMigrator
Set up Vitest infrastructure for the project. This is independent of Angular version.

**Setup Tasks**:
1. **Install Vitest**:
   ```bash
   npm install --save-dev vitest @vitest/ui @vitest/coverage-v8
   ```

2. **Create vitest.config.ts**:
   ```typescript
   import { defineConfig } from 'vitest/config';
   import angular from '@analogjs/vite-plugin-angular';

   export default defineConfig({
     plugins: [angular()],
     test: {
       globals: true,
       environment: 'jsdom',
       setupFiles: ['src/test-setup.ts'],
       coverage: {
         provider: 'v8',
         reporter: ['text', 'json', 'html']
       }
     }
   });
   ```

3. **Create test-setup.ts**:
   ```typescript
   import 'zone.js/testing';
   import { getTestBed } from '@angular/core/testing';
   import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

   getTestBed().initTestEnvironment(
     BrowserDynamicTestingModule,
     platformBrowserDynamicTesting()
   );
   ```

4. **Update package.json scripts**:
   ```json
   {
     "scripts": {
       "test": "vitest",
       "test:ui": "vitest --ui",
       "test:coverage": "vitest --coverage"
     }
   }
   ```

**Output**: Confirmation that Vitest is set up and ready for test migration
```

---

### Template 1: Karma to Vitest Conversion (Primary Work - Always Available)
Use this to convert a batch of `.spec.ts` files from Jasmine/Karma to Vitest.

```markdown
@UnitTestMigrator
Convert the following Karma/Jasmine test files to Vitest. This work is independent of Angular version upgrades.

**Files to Convert**:
```
[LIST OF .spec.ts FILES OR DIRECTORY PATH]
```

**Migration Checklist**:

1. **Update Imports**:
   ```typescript
   // ❌ Before (Karma/Jasmine)
   import { TestBed } from '@angular/core/testing';
   import { ComponentFixture } from '@angular/core/testing';
   
   // ✅ After (Vitest)
   import { TestBed } from '@angular/core/testing';
   import { ComponentFixture } from '@angular/core/testing';
   import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
   ```

2. **Replace Test Functions**:
   ```typescript
   // ❌ Before (Jasmine)
   describe('MyComponent', () => {
     it('should create', () => {
       expect(component).toBeTruthy();
     });
   });
   
   // ✅ After (Vitest) - Same syntax!
   describe('MyComponent', () => {
     it('should create', () => {
       expect(component).toBeTruthy();
     });
   });
   ```

3. **Replace Spies and Mocks**:
   ```typescript
   // ❌ Before (Jasmine)
   const mockService = jasmine.createSpyObj('AuthService', ['login', 'logout']);
   spyOn(service, 'getData').and.returnValue(of(mockData));
   
   // ✅ After (Vitest)
   const mockService = {
     login: vi.fn(),
     logout: vi.fn()
   };
   vi.spyOn(service, 'getData').mockReturnValue(of(mockData));
   ```

4. **Replace Async Helpers**:
   ```typescript
   // ❌ Before (Jasmine)
   import { fakeAsync, tick } from '@angular/core/testing';
   
   it('should handle async', fakeAsync(() => {
     component.loadData();
     tick(1000);
     expect(component.data).toBeDefined();
   }));
   
   // ✅ After (Vitest) - Keep fakeAsync!
   import { fakeAsync, tick } from '@angular/core/testing';
   
   it('should handle async', fakeAsync(() => {
     component.loadData();
     tick(1000);
     expect(component.data).toBeDefined();
   }));
   ```

**Steps**:
1. For each file, update imports to include Vitest functions
2. Replace `jasmine.createSpyObj` with Vitest mocks
3. Replace `spyOn` with `vi.spyOn`
4. Keep `TestBed`, `fakeAsync`, `tick` - they work with Vitest!
5. Run `npm test [file]` after each conversion to verify

**Output**: 
- List of files converted
- Any tests that failed after conversion (with error details)
- Confidence level for each file
```

---

### Template 2: Fix Broken Tests After Angular Upgrade (Secondary Work)
Use this when tests fail after upgrading Angular versions.

```markdown
@UnitTestMigrator
The following tests are failing after upgrading to Angular [VERSION]. Please analyze and fix them.

**Test Failures**:
```
[PASTE FULL TEST OUTPUT WITH ERRORS]
```

**Context**:
- Angular version: [e.g., 16.2.0]
- Recent changes: [e.g., "Upgraded from v15 to v16"]
- Test framework: [Vitest / Karma]

**Common Failure Patterns & Fixes**:

1. **Router Testing Changes** (v15+):
   ```typescript
   // ❌ Before (v14)
   import { RouterTestingModule } from '@angular/router/testing';
   
   TestBed.configureTestingModule({
     imports: [RouterTestingModule]
   });
   
   // ✅ After (v15+)
   import { provideRouter } from '@angular/router';
   
   TestBed.configureTestingModule({
     providers: [provideRouter([])]
   });
   ```

2. **HttpClient Testing Changes** (v15+):
   ```typescript
   // ❌ Before (v14)
   import { HttpClientTestingModule } from '@angular/common/http/testing';
   
   TestBed.configureTestingModule({
     imports: [HttpClientTestingModule]
   });
   
   // ✅ After (v15+)
   import { provideHttpClient } from '@angular/common/http';
   import { provideHttpClientTesting } from '@angular/common/http/testing';
   
   TestBed.configureTestingModule({
     providers: [
       provideHttpClient(),
       provideHttpClientTesting()
     ]
   });
   ```

3. **Material Component Testing** (v15+ MDC):
   ```typescript
   // ❌ Before (v14 - Legacy Material)
   import { MatLegacyButtonModule } from '@angular/material/legacy-button';
   
   TestBed.configureTestingModule({
     imports: [MatLegacyButtonModule]
   });
   
   // ✅ After (v15+ - MDC Material)
   import { MatButtonModule } from '@angular/material/button';
   
   TestBed.configureTestingModule({
     imports: [MatButtonModule]
   });
   ```

**Analysis Steps**:
1. **Categorize Errors**: Group by error type (e.g., "5 tests failing with 'No provider for Router'").
2. **Check Breaking Changes**: Use Angular MCP to search for breaking changes related to the error.
3. **Apply Fixes**: Update TestBed configurations, imports, and test syntax.
4. **Verify**: Run tests after each batch of fixes.

**Output**:
- Error categorization
- Fixes applied per category
- List of tests that still fail (if any) with analysis
```

---

### Template 3: Test Coverage Analysis (Tertiary Work - Always Available)
Use this to analyze test coverage and identify gaps.

```markdown
@UnitTestMigrator
Analyze test coverage for the following components/services and identify gaps.

**Components/Services to Analyze**:
```
[LIST OF COMPONENTS OR SERVICES]
```

**Analysis Tasks**:
1. **Run Coverage Report**:
   ```bash
   npm run test:coverage
   ```

2. **Identify Coverage Gaps**:
   - Components with <70% coverage
   - Services with <80% coverage
   - Missing test files
   - Untested edge cases

3. **Prioritize Test Creation**:
   - Critical components first
   - High-risk areas
   - Frequently used services

**Output**:
- Coverage report summary
- List of components/services needing tests
- Prioritized test creation plan
```

---

### Template 4: Test Infrastructure Maintenance (Ongoing Work - Always Available)
Use this to maintain and improve test infrastructure.

```markdown
@UnitTestMigrator
Maintain and improve Vitest test infrastructure.

**Tasks**:
1. **Update Vitest Configuration**:
   - Add new test utilities
   - Update coverage thresholds
   - Add new test environments

2. **Create Test Utilities**:
   - Common mocks
   - Test helpers
   - Fixture builders

3. **Document Test Patterns**:
   - Common test patterns
   - Best practices
   - Anti-patterns to avoid

**Output**:
- Updated configuration
- New test utilities created
- Documentation updated
```

---

## 🚦 Supervision Level
- **Level 3 (Moderate Autonomy)**: Review every batch initially.
- **Red Flags**:
    - Agent commenting out tests to make the suite pass.
    - Agent changing the *expectation* of the test instead of the implementation.
    - Agent not verifying tests pass after migration.

---

## 📊 **Workload Independence**

### **Always Available Work** (Independent of Angular Version):
1. ✅ **Karma → Vitest Migration** - Can start immediately
2. ✅ **Test Coverage Analysis** - Always relevant
3. ✅ **Test Infrastructure Setup** - Ongoing work
4. ✅ **Test Utilities Creation** - Ongoing work
5. ✅ **Test Documentation** - Ongoing work

### **Version-Dependent Work** (After Upgrades):
1. ⚠️ **Fix Broken Tests** - After Angular upgrades
2. ⚠️ **Update TestBed Configs** - After Angular upgrades

**Fallback Strategy**: If no broken tests to fix, continue with Vitest migration or coverage analysis.

---

**Last Updated**: 2025-11-26 21:15 UTC


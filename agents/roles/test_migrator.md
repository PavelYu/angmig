# 🧪 Agent Role: Test Migrator

## 📋 Role Description
The **Test Migrator** agent is responsible for the heavy lifting of moving from Karma/Protractor to Vitest/Playwright and keeping the test suite green.

**Primary "Manager"**: Automation QA

## 🎯 Responsibilities
- Migrate Karma unit tests to Vitest syntax.
- Convert Protractor Page Objects to Playwright.
- Fix broken tests caused by Angular upgrades.
- Update `TestBed` configurations.

## 🧠 Knowledge Sources
- **Playwright MCP**: For running tests and analyzing failures.
- **Context7**: For common test fix patterns (e.g., "how we mock AuthService").

## 💬 Prompt Templates

### Template 1: Karma to Vitest Conversion (Unit Tests)
Use this to convert a batch of `.spec.ts` files from Jasmine/Karma to Vitest.

```markdown
@TestMigrator
Convert the following Karma/Jasmine test files to Vitest.

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

5. **Update Matchers** (if needed):
   ```typescript
   // Most Jasmine matchers work in Vitest, but some need changes:
   
   // ❌ Before
   expect(spy).toHaveBeenCalledWith(arg);
   
   // ✅ After
   expect(spy).toHaveBeenCalledWith(arg); // Same!
   
   // ❌ Before (Jasmine-specific)
   expect(value).toBeCloseTo(10, 2);
   
   // ✅ After (Vitest)
   expect(value).toBeCloseTo(10, 2); // Same!
   ```

**Steps**:
1. For each file, update imports to include Vitest functions.
2. Replace `jasmine.createSpyObj` with Vitest mocks.
3. Replace `spyOn` with `vi.spyOn`.
4. Keep `TestBed`, `fakeAsync`, `tick` - they work with Vitest!
5. Run `npm test [file]` after each conversion to verify.

**Output**: 
- List of files converted
- Any tests that failed after conversion (with error details)
- Confidence level for each file
```

---

### Template 2: Protractor to Playwright Conversion (E2E Tests)
Use this to convert Protractor Page Objects and tests to Playwright.

```markdown
@TestMigrator
Convert the following Protractor E2E tests to Playwright.

**Files to Convert**:
```
[LIST OF .e2e-spec.ts FILES AND .po.ts PAGE OBJECTS]
```

**Migration Strategy**:

1. **Page Object Pattern** (Recommended):
   ```typescript
   // ❌ Before (Protractor Page Object)
   import { browser, by, element } from 'protractor';
   
   export class LoginPage {
     navigateTo() {
       return browser.get('/login');
     }
     
     getUsernameInput() {
       return element(by.css('input[name="username"]'));
     }
     
     async login(username: string, password: string) {
       await this.getUsernameInput().sendKeys(username);
       await element(by.css('input[name="password"]')).sendKeys(password);
       await element(by.css('button[type="submit"]')).click();
     }
   }
   
   // ✅ After (Playwright Page Object)
   import { Page, Locator } from '@playwright/test';
   
   export class LoginPage {
     readonly page: Page;
     readonly usernameInput: Locator;
     readonly passwordInput: Locator;
     readonly submitButton: Locator;
     
     constructor(page: Page) {
       this.page = page;
       this.usernameInput = page.locator('input[name="username"]');
       this.passwordInput = page.locator('input[name="password"]');
       this.submitButton = page.locator('button[type="submit"]');
     }
     
     async navigateTo() {
       await this.page.goto('/login');
     }
     
     async login(username: string, password: string) {
       await this.usernameInput.fill(username);
       await this.passwordInput.fill(password);
       await this.submitButton.click();
     }
   }
   ```

2. **Test File Conversion**:
   ```typescript
   // ❌ Before (Protractor)
   import { browser } from 'protractor';
   import { LoginPage } from './login.po';
   
   describe('Login Page', () => {
     let page: LoginPage;
     
     beforeEach(() => {
       page = new LoginPage();
     });
     
     it('should login successfully', async () => {
       await page.navigateTo();
       await page.login('user@example.com', 'password123');
       expect(await browser.getCurrentUrl()).toContain('/dashboard');
     });
   });
   
   // ✅ After (Playwright)
   import { test, expect } from '@playwright/test';
   import { LoginPage } from './login.po';
   
   test.describe('Login Page', () => {
     test('should login successfully', async ({ page }) => {
       const loginPage = new LoginPage(page);
       await loginPage.navigateTo();
       await loginPage.login('user@example.com', 'password123');
       await expect(page).toHaveURL(/.*dashboard/);
     });
   });
   ```

3. **Common Selector Migrations**:
   ```typescript
   // Protractor → Playwright
   element(by.css('.class'))          → page.locator('.class')
   element(by.id('myId'))             → page.locator('#myId')
   element(by.xpath('//div'))         → page.locator('xpath=//div')
   element(by.buttonText('Click'))    → page.getByRole('button', { name: 'Click' })
   element(by.model('user.name'))     → page.locator('[ng-model="user.name"]')
   ```

4. **Wait Strategies**:
   ```typescript
   // ❌ Before (Protractor)
   await browser.wait(EC.presenceOf(element), 5000);
   
   // ✅ After (Playwright) - Built-in auto-waiting!
   await page.locator(selector).waitFor({ state: 'visible' });
   // Or just use the element - Playwright auto-waits:
   await page.locator(selector).click(); // Waits automatically
   ```

**Steps**:
1. Convert Page Objects first (they're reusable).
2. Update test files to use Playwright's `test` and `expect`.
3. Replace all `element(by.X)` with `page.locator()`.
4. Remove explicit waits - Playwright auto-waits.
5. Run `npx playwright test [file]` to verify.

**Output**:
- List of Page Objects converted
- List of test files converted
- Any failing tests with error details
```

---

### Template 3: Fix Broken Tests After Angular Upgrade
Use this when tests fail after upgrading Angular versions.

```markdown
@TestMigrator
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

4. **Standalone Component Testing** (v16+):
   ```typescript
   // ❌ Before (Module-based)
   TestBed.configureTestingModule({
     declarations: [MyComponent],
     imports: [CommonModule]
   });
   
   // ✅ After (Standalone)
   TestBed.configureTestingModule({
     imports: [MyComponent] // Component is now in imports!
   });
   ```

5. **Async Testing Changes**:
   ```typescript
   // ❌ Before (deprecated)
   import { async } from '@angular/core/testing';
   
   it('should work', async(() => {
     // test code
   }));
   
   // ✅ After (use waitForAsync)
   import { waitForAsync } from '@angular/core/testing';
   
   it('should work', waitForAsync(() => {
     // test code
   }));
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

### Template 4: Update TestBed for Standalone Components
Use this when migrating to standalone components.

```markdown
@TestMigrator
Update the following test files to work with standalone components.

**Files**:
```
[LIST OF .spec.ts FILES]
```

**Migration Pattern**:

```typescript
// ❌ Before (Module-based component)
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {}

// Test:
TestBed.configureTestingModule({
  declarations: [UserProfileComponent],
  imports: [CommonModule, FormsModule],
  providers: [UserService]
});

// ✅ After (Standalone component)
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {}

// Test:
TestBed.configureTestingModule({
  imports: [UserProfileComponent], // Component goes in imports!
  providers: [UserService]
});
```

**Key Changes**:
1. Move component from `declarations` to `imports`.
2. Keep `providers` as-is.
3. Remove module imports that are now in the component's `imports`.

**Output**: List of test files updated.
```

---

### Template 5: Visual Regression Testing with Playwright
Use this to add visual regression tests for critical UI components.

```markdown
@TestMigrator
Create Playwright visual regression tests for the following pages/components.

**Pages to Test**:
```
[LIST OF PAGES OR COMPONENTS]
```

**Template**:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Dashboard', () => {
  test('should match baseline screenshot', async ({ page }) => {
    // Navigate to page
    await page.goto('/dashboard');
    
    // Wait for critical elements to load
    await page.locator('.dashboard-header').waitFor();
    await page.locator('.chart-container').waitFor();
    
    // Take screenshot and compare
    await expect(page).toHaveScreenshot('dashboard-full.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });
  
  test('should match component screenshot', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Screenshot specific component
    const chart = page.locator('.chart-container');
    await expect(chart).toHaveScreenshot('dashboard-chart.png');
  });
});
```

**Best Practices**:
1. **Disable Animations**: Add `animations: 'disabled'` to avoid flaky tests.
2. **Wait for Content**: Ensure dynamic content (charts, images) is loaded.
3. **Mask Dynamic Content**: Mask timestamps, user names, etc.:
   ```typescript
   await expect(page).toHaveScreenshot({
     mask: [page.locator('.timestamp')]
   });
   ```
4. **Update Baselines**: Run `npx playwright test --update-snapshots` when UI intentionally changes.

**Output**: List of visual tests created.
```


## 🚦 Supervision Level
- **Level 3 (Moderate Autonomy)**: Review every batch initially.
- **Red Flags**:
    - Agent commenting out tests to make the suite pass.
    - Agent changing the *expectation* of the test instead of the implementation.

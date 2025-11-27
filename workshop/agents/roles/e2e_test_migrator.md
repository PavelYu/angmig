# 🎭 Agent Role: E2E Test Migrator (AQA 2)

> **Note**: This is a **prompt template** file, not an actual ACP agent. Copy prompts from this file into **Zed's Agent Panel** (Press `Cmd+?` or Command Palette → `agent: open`) to use with Zed's built-in AI and MCP servers.

## 📋 Role Description
The **E2E Test Migrator** agent is responsible for migrating Protractor E2E tests to Playwright and maintaining visual regression testing. This agent is **exclusively managed by AQA 2** and works **independently of Angular version state**.

**Primary "Manager"**: **AQA 2** (E2E & Visual Lead)

> [!IMPORTANT]
> **AQA Team Independence**: This agent can work in parallel with dev team migrations. E2E test migration is independent of Angular version upgrades.

---

## 🎯 Responsibilities
- Convert Protractor Page Objects to Playwright
- Migrate Protractor tests to Playwright syntax
- Create and maintain visual regression tests
- Update Playwright configuration
- Create new E2E tests for critical paths
- Maintain Page Object patterns

## 🧠 Knowledge Sources
- **Playwright MCP**: For running tests and analyzing failures
- **Context7**: For project-specific E2E patterns (e.g., "how we test login flow")
- **Playwright Documentation**: For Playwright-specific features

---

## 💬 Prompt Templates

### Template 0: Playwright Setup (Day 0 - Always Available)
Use this to set up Playwright infrastructure before migration starts.

```markdown
@E2ETestMigrator
Set up Playwright infrastructure for the project. This is independent of Angular version.

**Setup Tasks**:
1. **Install Playwright** (Non-Interactive):
   ```bash
   npm install --save-dev @playwright/test
   npx playwright install
   ```

2. **Create playwright.config.ts**:
   ```typescript
   import { defineConfig, devices } from '@playwright/test';

   export default defineConfig({
     testDir: './e2e',
     fullyParallel: true,
     forbidOnly: !!process.env.CI,
     retries: process.env.CI ? 2 : 0,
     workers: process.env.CI ? 1 : undefined,
     reporter: 'html',
     use: {
       trace: 'on-first-retry',
       baseURL: 'http://localhost:4200',
     },
     projects: [
       {
         name: 'chromium',
         use: { ...devices['Desktop Chrome'] },
       },
       {
         name: 'firefox',
         use: { ...devices['Desktop Firefox'] },
       },
       {
         name: 'webkit',
         use: { ...devices['Desktop Safari'] },
       },
     ],
     webServer: {
       command: 'npm run start',
       url: 'http://localhost:4200',
       reuseExistingServer: !process.env.CI,
     },
   });
   ```

3. **Create e2e/ directory structure**:
   ```
   e2e/
   ├── page-objects/
   │   ├── login.po.ts
   │   ├── dashboard.po.ts
   │   └── user-management.po.ts
   ├── tests/
   │   ├── login.spec.ts
   │   ├── dashboard.spec.ts
   │   └── user-management.spec.ts
   └── fixtures/
       └── test-data.ts
   ```

4. **Update package.json scripts**:
   ```json
   {
     "scripts": {
       "test:e2e": "playwright test",
       "test:e2e:ui": "playwright test --ui",
       "test:e2e:baseline": "playwright test --update-snapshots"
     }
   }
   ```

**Output**: Confirmation that Playwright is set up and ready for test migration
```

---

### Template 1: Protractor to Playwright Conversion (Primary Work - Always Available)
Use this to convert Protractor Page Objects and tests to Playwright.

```markdown
@E2ETestMigrator
Convert the following Protractor E2E tests to Playwright. This work is independent of Angular version upgrades.

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
   import { LoginPage } from './page-objects/login.po';
   
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
1. Convert Page Objects first (they're reusable)
2. Update test files to use Playwright's `test` and `expect`
3. Replace all `element(by.X)` with `page.locator()`
4. Remove explicit waits - Playwright auto-waits
5. Run `npx playwright test [file]` to verify

**Output**:
- List of Page Objects converted
- List of test files converted
- Any failing tests with error details
```

---

### Template 2: Visual Regression Testing (Secondary Work - Always Available)
Use this to add visual regression tests for critical UI components.

```markdown
@E2ETestMigrator
Create Playwright visual regression tests for the following pages/components. This work is independent of Angular version.

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
1. **Disable Animations**: Add `animations: 'disabled'` to avoid flaky tests
2. **Wait for Content**: Ensure dynamic content (charts, images) is loaded
3. **Mask Dynamic Content**: Mask timestamps, user names, etc.:
   ```typescript
   await expect(page).toHaveScreenshot({
     mask: [page.locator('.timestamp')]
   });
   ```
4. **Update Baselines**: Run `npx playwright test --update-snapshots` when UI intentionally changes

**Output**: List of visual tests created
```

---

### Template 3: Create New E2E Tests (Tertiary Work - Always Available)
Use this to create new E2E tests for critical user paths.

```markdown
@E2ETestMigrator
Create new E2E tests for the following critical user paths. This work is independent of Angular version.

**User Paths to Test**:
```
[LIST OF CRITICAL USER FLOWS]
```

**Example: Login Flow**:
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from './page-objects/login.po';

test.describe('Login Flow', () => {
  test('should login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login('user@example.com', 'password123');
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should show error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login('invalid@example.com', 'wrongpassword');
    await expect(page.locator('.error-message')).toBeVisible();
  });
});
```

**Output**: List of new E2E tests created
```

---

### Template 4: Update Playwright Tests After Angular Upgrade (Version-Dependent)
Use this when Playwright tests fail after Angular version upgrades.

```markdown
@E2ETestMigrator
The following Playwright tests are failing after upgrading to Angular [VERSION]. Please analyze and fix them.

**Test Failures**:
```
[PASTE FULL TEST OUTPUT WITH ERRORS]
```

**Common Issues**:
1. **Selector Changes**: Material components may have different selectors
2. **Timing Issues**: Components may load differently
3. **API Changes**: Angular APIs may have changed

**Fix Strategy**:
1. Update selectors if components changed
2. Adjust wait strategies if needed
3. Update Page Objects if UI changed
4. Verify tests pass after fixes

**Output**: List of fixed tests and any remaining issues
```

---

## 🚦 Supervision Level
- **Level 3 (Moderate Autonomy)**: Review every batch initially.
- **Red Flags**:
    - Agent skipping tests instead of fixing them
    - Agent not waiting for elements properly
    - Agent not updating Page Objects when UI changes

---

## 📊 **Workload Independence**

### **Always Available Work** (Independent of Angular Version):
1. ✅ **Protractor → Playwright Migration** - Can start immediately
2. ✅ **Visual Regression Testing** - Always relevant
3. ✅ **E2E Test Creation** - Always relevant
4. ✅ **Page Object Maintenance** - Ongoing work
5. ✅ **Playwright Configuration** - Ongoing work

### **Version-Dependent Work** (After Upgrades):
1. ⚠️ **Fix Broken Playwright Tests** - After Angular upgrades
2. ⚠️ **Update Selectors** - After UI changes

**Fallback Strategy**: If no broken tests to fix, continue with Protractor migration or create new E2E tests.

---

**Last Updated**: 2025-11-26 21:15 UTC


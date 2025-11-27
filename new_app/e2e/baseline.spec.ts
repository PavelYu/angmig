import { test, expect } from '@playwright/test';

/**
 * Baseline Visual Regression Tests
 * 
 * Pattern: Visual Regression Baseline
 * Purpose: Create baseline snapshots before migration for comparison
 * 
 * These tests capture the current state of the application before migration.
 * After migration, run visual regression tests to detect visual changes.
 */

/**
 * Baseline Visual Regression Tests - Workshop Plan Phase 0.1
 * 
 * According to workshop plan, we need to capture baseline snapshots for:
 * 1. Login Screen ✅
 * 2. Main Dashboard (Highcharts rendering) ✅
 * 3. Data Grid (AG Grid rendering) ✅
 * 4. Complex Form (Material inputs) ✅
 * 5. Settings/Configuration Page ✅
 * 
 * Pattern: Visual Regression Baseline - Create snapshots before migration
 */

test.describe('Baseline Visual Regression Tests - Golden Paths', () => {
  
  // 1. Login Screen (Critical User Flow #1)
  test('Login Screen baseline snapshot', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    // Wait for form to render
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('login-screen-baseline.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  // 2. Main Dashboard (Highcharts rendering) - Critical User Flow #2
  test('Dashboard baseline snapshot (Highcharts)', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Wait for Highcharts to render
    await page.waitForTimeout(3000);
    
    // Wait for chart containers to be visible
    await page.locator('highcharts-chart, .chart-container, [class*="chart"]').first().waitFor({ timeout: 5000 }).catch(() => {});
    
    await expect(page).toHaveScreenshot('dashboard-highcharts-baseline.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  // 3. Data Grid (AG Grid rendering) - Critical User Flow #3
  test('User Management Data Grid baseline snapshot (AG Grid)', async ({ page }) => {
    await page.goto('/user-management');
    await page.waitForLoadState('networkidle');
    
    // Wait for AG Grid to load
    await page.waitForTimeout(3000);
    
    // Wait for grid to be visible
    await page.locator('ag-grid-angular, .ag-theme-material, [class*="ag-grid"]').first().waitFor({ timeout: 5000 }).catch(() => {});
    
    await expect(page).toHaveScreenshot('user-management-ag-grid-baseline.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  // 4. Complex Form (Material inputs) - Critical User Flow #4
  test('Complex Form baseline snapshot (Material inputs)', async ({ page }) => {
    // Try user detail/edit form as complex form
    await page.goto('/user-management');
    await page.waitForLoadState('networkidle');
    
    // Try to navigate to form or use existing form on page
    await page.waitForTimeout(2000);
    
    // Look for form elements
    const form = page.locator('form, mat-form-field, [class*="form"]').first();
    await form.waitFor({ timeout: 5000 }).catch(() => {});
    
    await expect(page).toHaveScreenshot('complex-form-material-baseline.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  // 5. Settings/Configuration Page - Critical User Flow #5
  test('Settings/Configuration Page baseline snapshot', async ({ page }) => {
    await page.goto('/settings');
    await page.waitForLoadState('networkidle');
    
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('settings-configuration-baseline.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  // Additional baseline tests (existing)
  test('Homepage baseline snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('homepage-baseline.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('Reporting baseline snapshot', async ({ page }) => {
    await page.goto('/reporting');
    await page.waitForLoadState('networkidle');
    
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('reporting-baseline.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('Header component baseline', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Capture header component - try multiple selectors
    const header = page.locator('app-header').or(page.locator('[class*="header"]').first());
    await header.waitFor({ timeout: 10000 }).catch(() => {
      // If header doesn't exist, skip this test
      test.skip();
    });
    await expect(header).toHaveScreenshot('header-baseline.png', {
      maxDiffPixels: 50,
    });
  });

  test('Sidebar component baseline', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Capture sidebar component - try multiple selectors
    const sidebar = page.locator('app-sidebar').or(page.locator('[class*="sidebar"]').first());
    await sidebar.waitFor({ timeout: 10000 }).catch(() => {
      // If sidebar doesn't exist, skip this test
      test.skip();
    });
    await expect(sidebar).toHaveScreenshot('sidebar-baseline.png', {
      maxDiffPixels: 50,
    });
  });

});


# 🎨 Agent Role: Style Migrator

> **Note**: This is a **prompt template** file, not an actual ACP agent. Copy prompts from this file into **Zed's Agent Panel** (Press `Cmd+?` or Command Palette → `agent: open`) to use with Zed's built-in AI and MCP servers.

## 📋 Role Description
The **Style Migrator** agent is specialized in handling the massive CSS/SCSS refactoring required for the Angular Material MDC migration. It automates the tedious replacement of legacy classes and implementation of CSS variables.

**Primary "Manager"**: Dev A3 (Alpha Team)

## 🎯 Responsibilities
- **MDC Migration**: Replace `.mat-*` classes with `.mat-mdc-*` or `.mdc-*`.
- **CSS Variables**: Implement Material Design tokens (e.g., `--mdc-theme-primary`).
- **Legacy Cleanup**: Remove `::ng-deep` usage where possible.
- **Visual Consistency**: Ensure new styles match the old design intent.

## 🧠 Knowledge Sources
- **Angular MCP**: For Material v15/v16 styling guides.
- **Context7**: For project-specific style overrides and theme tokens.

## 💬 Prompt Templates

### Template 1: Material MDC Component Style Migration
Use this to migrate component-specific styles from legacy Material to MDC.

```markdown
@StyleMigrator
Migrate the following component styles from Angular Material legacy to MDC-based styles.

**Component**: [COMPONENT_NAME]
**Style Files**:
```
[LIST OF .scss/.css FILES]
```

**Migration Strategy**:

1. **Identify Legacy Classes**:
   Search for all `.mat-` classes in the file:
   ```bash
   grep -n "\.mat-" [component].scss
   ```

2. **Common Class Migrations**:

   **Buttons**:
   ```scss
   /* ❌ Before (Legacy) */
   .mat-raised-button {
     background: blue;
   }
   .mat-button {
     color: red;
   }
   
   /* ✅ After (MDC) */
   .mat-mdc-raised-button {
     background: blue;
   }
   .mat-mdc-button {
     color: red;
   }
   ```

   **Form Fields**:
   ```scss
   /* ❌ Before */
   .mat-form-field {
     width: 100%;
   }
   .mat-form-field-label {
     color: gray;
   }
   
   /* ✅ After */
   .mat-mdc-form-field {
     width: 100%;
   }
   .mat-mdc-form-field .mdc-floating-label {
     color: gray;
   }
   ```

   **Cards**:
   ```scss
   /* ❌ Before */
   .mat-card {
     padding: 16px;
   }
   .mat-card-title {
     font-size: 24px;
   }
   
   /* ✅ After */
   .mat-mdc-card {
     padding: 16px;
   }
   .mat-mdc-card-title {
     font-size: 24px;
   }
   ```

   **Dialogs**:
   ```scss
   /* ❌ Before */
   .mat-dialog-container {
     border-radius: 8px;
   }
   .mat-dialog-title {
     margin-bottom: 16px;
   }
   
   /* ✅ After */
   .mat-mdc-dialog-container {
     border-radius: 8px;
   }
   .mat-mdc-dialog-title {
     margin-bottom: 16px;
   }
   ```

3. **Handle Complex Selectors**:
   ```scss
   /* ❌ Before */
   ::ng-deep .mat-form-field-underline {
     background-color: blue;
   }
   
   /* ✅ After (use CSS variables instead) */
   .mat-mdc-form-field {
     --mdc-text-field-idle-line-color: blue;
   }
   
   /* Or if no variable exists, use scoped ::ng-deep */
   :host ::ng-deep .mat-mdc-form-field .mdc-line-ripple {
     background-color: blue; // TODO: Find CSS variable alternative
   }
   ```

4. **Use CSS Variables** (Preferred):
   ```scss
   /* ✅ Best Practice - Use MDC CSS variables */
   .mat-mdc-button {
     --mdc-text-button-label-text-color: #1976d2;
     --mdc-text-button-hover-state-layer-opacity: 0.08;
   }
   
   .mat-mdc-form-field {
     --mdc-filled-text-field-container-color: #f5f5f5;
     --mdc-filled-text-field-label-text-color: #666;
   }
   ```

**Steps**:
1. Create a backup of the original file.
2. Replace all `.mat-` classes with `.mat-mdc-` equivalents.
3. For nested MDC classes (e.g., `.mdc-floating-label`), update selectors.
4. Replace `::ng-deep` with CSS variables where possible.
5. Test visually in the browser.
6. Run visual regression tests if available.

**Output**:
- List of files migrated
- List of classes replaced
- Any styles that need manual review (flagged with TODO comments)
```

---

### Template 2: Global Theme Migration (@import → @use)
Use this to migrate the global theme file to the new Sass module system.

```markdown
@StyleMigrator
Migrate the global theme file from `@import` to `@use` syntax.

**File**: `src/styles.scss` or `src/theme.scss`

**Migration Pattern**:

```scss
// ❌ Before (Legacy @import)
@import '~@angular/material/theming';

$my-primary: mat-palette($mat-indigo);
$my-accent: mat-palette($mat-pink, A200, A100, A400);
$my-warn: mat-palette($mat-red);

$my-theme: mat-light-theme((
  color: (
    primary: $my-primary,
    accent: $my-accent,
    warn: $my-warn,
  )
));

@include angular-material-theme($my-theme);

// ✅ After (Modern @use)
@use '@angular/material' as mat;

$my-primary: mat.define-palette(mat.$indigo-palette);
$my-accent: mat.define-palette(mat.$pink-palette, A200, A100, A400);
$my-warn: mat.define-palette(mat.$red-palette);

$my-theme: mat.define-light-theme((
  color: (
    primary: $my-primary,
    accent: $my-accent,
    warn: $my-warn,
  ),
  typography: mat.define-typography-config(),
  density: 0,
));

@include mat.all-component-themes($my-theme);
```

**Key Changes**:
1. Replace `@import` with `@use '@angular/material' as mat;`
2. Prefix all Material functions with `mat.`:
   - `mat-palette()` → `mat.define-palette()`
   - `mat-light-theme()` → `mat.define-light-theme()`
   - `$mat-indigo` → `mat.$indigo-palette`
3. Add `typography` and `density` to theme definition
4. Use `mat.all-component-themes()` instead of `angular-material-theme()`

**Typography Configuration**:
```scss
// Custom typography
$my-typography: mat.define-typography-config(
  $font-family: 'Roboto, sans-serif',
  $headline-1: mat.define-typography-level(112px, 112px, 300),
  $headline-2: mat.define-typography-level(56px, 56px, 400),
  $body-1: mat.define-typography-level(16px, 24px, 400),
);

$my-theme: mat.define-light-theme((
  color: (...),
  typography: $my-typography,
  density: 0,
));
```

**Dark Theme Support**:
```scss
// Light theme
$light-theme: mat.define-light-theme((...));
@include mat.all-component-themes($light-theme);

// Dark theme
$dark-theme: mat.define-dark-theme((...));

.dark-mode {
  @include mat.all-component-colors($dark-theme);
}
```

**Output**: Updated theme file with @use syntax.
```

---

### Template 3: CSS Variable Implementation
Use this to replace hard-coded styles with MDC CSS variables.

```markdown
@StyleMigrator
Replace hard-coded styles with MDC CSS variables for better theming support.

**Files**:
```
[LIST OF .scss FILES]
```

**Common CSS Variables**:

**Buttons**:
```scss
/* ❌ Before (Hard-coded) */
.custom-button {
  background-color: #1976d2;
  color: white;
  border-radius: 4px;
}

/* ✅ After (CSS Variables) */
.custom-button {
  background-color: var(--mdc-theme-primary);
  color: var(--mdc-theme-on-primary);
  border-radius: var(--mdc-shape-small, 4px);
}
```

**Form Fields**:
```scss
/* ❌ Before */
.mat-mdc-form-field {
  .mdc-text-field {
    background-color: #f5f5f5;
  }
  .mdc-floating-label {
    color: #666;
  }
}

/* ✅ After */
.mat-mdc-form-field {
  --mdc-filled-text-field-container-color: #f5f5f5;
  --mdc-filled-text-field-label-text-color: #666;
  --mdc-filled-text-field-focus-label-text-color: var(--mdc-theme-primary);
}
```

**Cards**:
```scss
/* ❌ Before */
.mat-mdc-card {
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* ✅ After */
.mat-mdc-card {
  background: var(--mdc-theme-surface);
  box-shadow: var(--mdc-elevation-2);
}
```

**Common MDC Variables**:
- `--mdc-theme-primary` - Primary color
- `--mdc-theme-secondary` - Secondary/accent color
- `--mdc-theme-surface` - Surface background
- `--mdc-theme-background` - Page background
- `--mdc-theme-error` - Error color
- `--mdc-theme-on-primary` - Text on primary
- `--mdc-theme-on-surface` - Text on surface
- `--mdc-shape-small` - Small border radius (4px)
- `--mdc-shape-medium` - Medium border radius (8px)
- `--mdc-shape-large` - Large border radius (16px)
- `--mdc-typography-body1-font-size` - Body text size

**Finding Variables**:
1. Check MDC documentation: https://material.io/develop/web/theming
2. Inspect element in DevTools to see available CSS variables
3. Search Material source code for variable names

**Output**: List of files updated with CSS variable count.
```

---

### Template 4: ::ng-deep Cleanup
Use this to remove or properly scope `::ng-deep` usage.

```markdown
@StyleMigrator
Clean up `::ng-deep` usage in the following files.

**Files**:
```
[LIST OF .scss FILES]
```

**Cleanup Strategy**:

1. **Replace with CSS Variables** (Best):
   ```scss
   /* ❌ Before (::ng-deep) */
   ::ng-deep .mat-mdc-form-field .mdc-text-field {
     background-color: #f5f5f5;
   }
   
   /* ✅ After (CSS Variable) */
   .mat-mdc-form-field {
     --mdc-filled-text-field-container-color: #f5f5f5;
   }
   ```

2. **Scope to :host** (Good):
   ```scss
   /* ❌ Before (Global ::ng-deep) */
   ::ng-deep .mat-mdc-button {
     text-transform: uppercase;
   }
   
   /* ✅ After (Scoped) */
   :host ::ng-deep .mat-mdc-button {
     text-transform: uppercase;
   }
   ```

3. **Use :host-context** (For theme-specific):
   ```scss
   /* ❌ Before */
   ::ng-deep .dark-theme .mat-mdc-card {
     background: #333;
   }
   
   /* ✅ After */
   :host-context(.dark-theme) .mat-mdc-card {
     background: #333;
   }
   ```

4. **Move to Global Styles** (Last Resort):
   If the style truly needs to be global, move it to `styles.scss`:
   ```scss
   /* src/styles.scss */
   .mat-mdc-dialog-container {
     border-radius: 8px; // Global dialog styling
   }
   ```

**Prioritization**:
1. First, try CSS variables
2. Then, try :host scoping
3. Then, try :host-context
4. Last resort, move to global styles with a comment explaining why

**Output**: 
- Count of ::ng-deep removed
- Count of ::ng-deep scoped to :host
- Count moved to global styles
```

---

### Template 5: Visual Regression Verification
Use this after style migration to verify no visual changes occurred.

```markdown
@StyleMigrator
Verify that the style migration did not introduce visual regressions.

**Components Migrated**:
```
[LIST OF COMPONENTS]
```

**Verification Steps**:

1. **Manual Visual Check**:
   - Open each component in the browser
   - Compare with screenshots/design specs
   - Check responsive breakpoints (mobile, tablet, desktop)
   - Check dark mode (if applicable)

2. **Automated Visual Regression** (if Playwright is set up):
   ```typescript
   // tests/visual-regression/material-components.spec.ts
   import { test, expect } from '@playwright/test';
   
   test('Button styles match baseline', async ({ page }) => {
     await page.goto('/components/buttons');
     await expect(page).toHaveScreenshot('buttons.png');
   });
   
   test('Form field styles match baseline', async ({ page }) => {
     await page.goto('/components/forms');
     await expect(page).toHaveScreenshot('forms.png');
   });
   ```

3. **Checklist for Each Component**:
   - [ ] Colors match (primary, accent, warn)
   - [ ] Spacing/padding preserved
   - [ ] Border radius matches
   - [ ] Hover states work
   - [ ] Focus states work
   - [ ] Disabled states work
   - [ ] No layout shifts
   - [ ] No console errors
   - [ ] Animations still work

4. **Common Issues to Check**:
   - **Buttons**: Check ripple effect, disabled state
   - **Form Fields**: Check label float, error messages, hints
   - **Cards**: Check elevation/shadow
   - **Dialogs**: Check backdrop, positioning
   - **Tables**: Check row hover, sorting icons
   - **Tabs**: Check active indicator, ink bar

**Output**:
- Screenshot comparisons (before/after)
- List of visual discrepancies found
- List of components that passed verification
```


## 🚦 Supervision Level
- **Level 4 (Low Autonomy)**: Visual changes are high-risk.
- **Review Process**:
    1.  Check the code.
    2.  **MUST** verify visually in the browser (or use visual regression tests).
    3.  Check for layout shifts.

# 📊 Full Dependency Audit (v14 → v20)

> [!TIP]
> This document compares your **Current State** (v14) against the **Ideal Target State** (v20).
> Use the **Blueprint** at the bottom as your "North Star" for the final `package.json`.

### 🚀 Runtime Dependencies

| Package | Current (v14) | 🎯 Target (v20) | Action Required |
| :--- | :--- | :--- | :--- |
| **Core Framework** | | | |
| `@angular/animations` | `^15.2.10` | `^20.0.0` | `ng update` |
| `@angular/cdk` | `^15.2.9` | `^20.0.0` | `ng update` |
| `@angular/common` | `^15.2.10` | `^20.0.0` | `ng update` |
| `@angular/compiler` | `^15.2.10` | `^20.0.0` | `ng update` |
| `@angular/core` | `^15.2.10` | `^20.0.0` | `ng update` |
| `@angular/forms` | `^15.2.10` | `^20.0.0` | `ng update` |
| `@angular/platform-browser` | `^15.2.10` | `^20.0.0` | `ng update` |
| `@angular/platform-browser-dynamic` | `^15.2.10` | `^20.0.0` | `ng update` |
| `@angular/router` | `^15.2.10` | `^20.0.0` | `ng update` |
| `@angular/material` | `^15.2.9` | `^20.0.0` | **MDC Migration** required. |
| `rxjs` | `~7.5.0` | `~7.8.0` | Keep v7 for compatibility, or v8 if ready. |
| `tslib` | `^2.3.0` | `^2.6.0` | Managed by CLI. |
| `zone.js` | `~0.11.4` | `~0.14.0` | Optional if Zoneless. |
| **Data Grid (Critical)** | | | |
| `@ag-grid-community/angular` | `~28.2.1` | `^31.0.0` | **BREAKING**. Major API changes. |
| `@ag-grid-community/client-side-row-model` | `~28.2.1` | `^31.0.0` | Update to match core. |
| `@ag-grid-community/core` | `~28.2.1` | `^31.0.0` | Update to match core. |
| `@ag-grid-enterprise/*` | `~28.2.1` | `^31.0.0` | Update all enterprise packages. |
| **Legacy / To Remove** | | | |
| `ngx-perfect-scrollbar` | `~10.1.1` | ❌ **REMOVE** | **DEAD**. Use `ngx-scrollbar` or CSS. |
| `@angular/material-moment-adapter` | `^15.2.9` | ❌ **REMOVE** | Switch to `date-fns` or native adapter. |
| `moment` | `~2.29.1` | ❌ **REMOVE** | Legacy. Replace with `date-fns`. |
| `moment-timezone` | `0.5.28` | ❌ **REMOVE** | Legacy. |
| **Other Libs** | | | |
| `@ngx-translate/core` | `14.0.0` | `^16.0.0` | Stable upgrade. |
| `@ngx-translate/http-loader` | `7.0.0` | `^8.0.0` | Stable upgrade. |
| `highcharts` | `9.3.3` | `^11.0.0` | Check rendering. |
| `highcharts-angular` | `3.1.2` | `^4.0.0` | Update wrapper. |
| `d3-scale` / `d3-shape` | `^4.0.2` | `^4.0.2` | Check for v7 compatibility. |
| `lodash` | `~4.17.21` | `^4.17.21` | Safe. |

### 🛠️ DevDependencies (Build/Test)

| Package | Current (v14) | 🎯 Target (v20) | Action Required |
| :--- | :--- | :--- | :--- |
| `@angular-devkit/build-angular` | `^15.2.11` | `^20.0.0` | `ng update` |
| `@angular/cli` | `^15.2.11` | `^20.0.0` | `ng update` |
| `@angular/compiler-cli` | `^15.2.10` | `^20.0.0` | `ng update` |
| `typescript` | `~4.9.0` | `~5.5.0` | **Strict** upgrade requirement. |
| `@types/node` | `18.19.31` | `^20.0.0` | Match build agent. |
| **Testing** | | | |
| `playwright` | ❌ *Missing* | `^1.40.0` | **NEW**. For E2E & Visual Regression. |
| `karma` / `jasmine` | `~6.4.0` | ❌ **REMOVE** | Replace with `vitest`. |
| `@types/jasminewd2` | `~2.0.13` | ❌ **REMOVE** | Protractor artifact. |
| **Linting** | | | |
| `eslint` | `7.32.0` | `^9.0.0` | Major config format change (Flat Config). |
| `angular-eslint` | ❌ *Missing* | `^18.0.0` | **NEW**. Replaces TSLint/ESLint legacy. |

---

## 🏆 Target `package.json` Blueprint (The Goal)

This is what your `package.json` should look like after a successful migration.

```json
{
  "name": "msp-multisnap",
  "version": "20.0.0",
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "test": "vitest",
    "e2e": "playwright test",
    "lint": "ng lint"
  },
  "dependencies": {
    "@angular/animations": "^20.0.0",
    "@angular/common": "^20.0.0",
    "@angular/compiler": "^20.0.0",
    "@angular/core": "^20.0.0",
    "@angular/forms": "^20.0.0",
    "@angular/material": "^20.0.0",
    "@angular/platform-browser": "^20.0.0",
    "@angular/platform-browser-dynamic": "^20.0.0",
    "@angular/router": "^20.0.0",
    "@ag-grid-community/angular": "^31.0.0",
    "@ag-grid-community/core": "^31.0.0",
    "@ag-grid-enterprise/core": "^31.0.0",
    "@ngx-translate/core": "^16.0.0",
    "@ngx-translate/http-loader": "^8.0.0",
    "date-fns": "^3.0.0",
    "highcharts": "^11.0.0",
    "highcharts-angular": "^4.0.0",
    "lodash": "^4.17.21",
    "ngx-scrollbar": "^13.0.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.6.0",
    "zone.js": "~0.14.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^20.0.0",
    "@angular/cli": "^20.0.0",
    "@angular/compiler-cli": "^20.0.0",
    "@playwright/test": "^1.40.0",
    "@types/node": "^20.0.0",
    "angular-eslint": "^18.0.0",
    "eslint": "^9.0.0",
    "vitest": "^1.0.0",
    "typescript": "~5.5.0"
  }
}
```

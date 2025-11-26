# Application Complexity Analysis

Based on the analysis of `package.json`, the current application exhibits the following complexity characteristics. This document serves as a guide to mimicking the current app environment in the `workshop` to ensure smooth agent execution and testing.

## 1. Technology Stack Overview

*   **Framework**: Angular 14.3.0 (Downgraded from 15 based on discussion/package.json)
*   **Language**: TypeScript 4.6.4
*   **Runtime**: Node.js 18, 20, or 22
*   **Package Manager**: NPM (Yarn is explicitly discouraged in `engines`)
*   **Missing Dependencies**: `@base/atoms` (6.1.0) was removed as it is a private package not available in the public registry.

## 2. Key Complexity Areas

### A. Advanced Data Grids (High Complexity)
The application uses **AG Grid Enterprise** (`@ag-grid-enterprise/*`), indicating:
*   Complex data tables with advanced features like Row Grouping, Range Selection, Master-Detail views, and Excel Export.
*   **Workshop Implication**: We need to ensure these components render correctly. Without a license key, AG Grid Enterprise usually displays a watermark but functions. We should verify if any specific enterprise features are critical for the "mimic" setup.

### B. Data Visualization
The app relies heavily on charting and graph visualization:
*   **Highcharts** (`highcharts`, `highcharts-angular`, `@highcharts/map-collection`): Standard charting library.
*   **Graph Visualization** (`@swimlane/ngx-graph`, `d3-scale`, `d3-shape`, `@types/dagre`): Indicates node-link diagrams, flowcharts, or directed graphs.
*   **Workshop Implication**: These libraries often require specific DOM dimensions and data structures to render. Mock data will need to be structured correctly to prevent runtime errors in these components.

### C. Internationalization (i18n)
*   **Library**: `@ngx-translate/core`, `@ngx-translate/http-loader`.
*   **Workshop Implication**: The app likely loads translation files (JSON) via HTTP. We must ensure `assets/i18n` (or similar) exists and is served correctly, otherwise the app might show raw keys or fail to load.

### D. Date & Time Handling
*   **Libraries**: `moment`, `moment-timezone`, `@angular/material-moment-adapter`, `ngx-material-timepicker`.
*   **Observation**: The app uses Moment.js, a legacy library, alongside Angular Material.
*   **Workshop Implication**: Ensure timezones are handled consistently if tests depend on specific dates.

### E. Custom Build & Asset Workflow
*   **SVG Sprites**: Custom scripts (`generate:svg-sprite`, `svgo`) are used to process icons from `src/assets`.
    *   `svg2sprite-cli` and `svgo` are dev dependencies.
*   **Workshop Implication**: The `src/assets` folder structure is critical. We need to mimic the existence of:
    *   `src/styles/icons`
    *   `src/assets/flags`
    *   `src/assets/Perils`
    Without these, `npm run start` or build scripts might fail or UI icons will be missing.

## 3. Recommendations for "Mimicking" the App

To successfully run agents against a realistic environment in `workshop`:

1.  **Dependency Installation**: Run `npm install --legacy-peer-deps` (if needed due to version mismatches, though Angular 15 ecosystem is usually stable).
2.  **Asset Structure**: Recreate the directory structure for assets, especially for the SVG generation scripts.
3.  **Mock Data**: Prepare mock data for AG Grid and Highcharts to ensure components render a "busy" state rather than empty states.
4.  **Environment Config**: Ensure `src/environments/environment.ts` exists.

## 4. Potential Risks

*   **AG Grid License**: Missing license key might cause console warnings but shouldn't block execution.
*   **Node Version**: Ensure the environment matches `engines` (Node 18+).
*   **Legacy Dependencies**: `csscomb` and older `eslint` (7.32) might have compatibility issues with newer Node versions if not careful.

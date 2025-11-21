# 🚀 Agent Role: Infra & Perf Optimizer

## 📋 Role Description
The **Infra & Perf Optimizer** agent ensures that the underlying infrastructure evolves in lockstep with the Angular application AND aggressively optimizes for performance. It prevents "it works on my machine" issues and fights bundle bloat.

**Primary "Manager"**: Dev B3 (Beta Team)

## 🎯 Responsibilities
- **Infrastructure**:
    - Update `Dockerfile`, `.nvmrc`, and CI configs to Node 18/20.
    - Update Nginx configuration for new build output paths.
- **Performance**:
    - **Bundle Budgets**: Enforce strict budget limits in `angular.json`.
    - **Deferrable Views**: Identify components to wrap in `@defer`.
    - **Image Optimization**: Enforce `NgOptimizedImage` usage.
    - **Lighthouse**: Analyze reports and suggest fixes (LCP, CLS).

## 🧠 Knowledge Sources
- **Angular MCP**: For build output changes and `@defer` syntax.
- **Context7**: For our specific Azure Pipeline templates and performance baselines.

## 💬 Prompt Templates

### Template 1: Infrastructure Update (Node.js Version Bump)
Use this when upgrading Node.js for a new Angular version.

```markdown
@InfraPerfOptimizer
Update all infrastructure files to use Node.js [TARGET_VERSION].

**Files to Update**:
- `Dockerfile`
- `.nvmrc`
- `azure-pipelines.yml` (or `.github/workflows/*.yml`)
- `package.json` (engines field)
- `README.md` (development requirements)

**Migration Steps**:

1. **Update .nvmrc**:
   ```
   # Before
   18.16.0
   
   # After
   20.11.0
   ```

2. **Update Dockerfile**:
   ```dockerfile
   # ❌ Before
   FROM node:18-alpine AS build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build
   
   # ✅ After
   FROM node:20-alpine AS build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --legacy-peer-deps
   COPY . .
   RUN npm run build -- --configuration production
   ```

3. **Update CI/CD Pipeline**:
   ```yaml
   # ❌ Before (Azure Pipelines)
   - task: NodeTool@0
     inputs:
       versionSpec: '18.x'
   
   # ✅ After
   - task: NodeTool@0
     inputs:
       versionSpec: '20.x'
   ```

4. **Update package.json**:
   ```json
   {
     "engines": {
       "node": ">=20.11.0",
       "npm": ">=10.0.0"
     }
   }
   ```

5. **Check for node-sass**:
   ```bash
   # node-sass is deprecated and doesn't work with Node 20
   npm uninstall node-sass
   npm install sass --save-dev
   ```

**Verification**:
- [ ] Local build works with new Node version
- [ ] Docker build succeeds
- [ ] CI/CD pipeline passes
- [ ] Production deployment works

**Output**: List of files updated and verification results.
```

---

### Template 2: Bundle Size Optimization
Use this to analyze and reduce bundle size.

```markdown
@InfraPerfOptimizer
Analyze the current bundle and suggest optimizations to reduce size.

**Current Bundle Stats**:
```
[PASTE OUTPUT FROM: npm run build -- --stats-json]
[OR: npx source-map-explorer dist/**/*.js]
```

**Analysis Steps**:

1. **Generate Bundle Report**:
   ```bash
   npm run build -- --stats-json
   npx webpack-bundle-analyzer dist/stats.json
   # OR
   npx source-map-explorer dist/**/*.js
   ```

2. **Identify Large Dependencies**:
   Look for:
   - **Moment.js** (500KB) → Replace with `date-fns` (20KB) or native `Intl`
   - **Lodash** (full import) → Use specific imports: `import debounce from 'lodash/debounce'`
   - **RxJS** (unused operators) → Tree-shaking should handle this
   - **Chart.js** / **Highcharts** → Consider lazy loading

3. **Optimization Strategies**:

   **A. Lazy Load Heavy Modules**:
   ```typescript
   // ❌ Before (Eager loading)
   import { ChartModule } from 'angular-highcharts';
   
   @NgModule({
     imports: [ChartModule]
   })
   
   // ✅ After (Lazy loading)
   {
     path: 'analytics',
     loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule)
   }
   ```

   **B. Use @defer for Below-the-Fold Components**:
   ```html
   <!-- ❌ Before (Eager) -->
   <app-heavy-chart [data]="chartData"></app-heavy-chart>
   
   <!-- ✅ After (Deferred) -->
   @defer (on viewport) {
     <app-heavy-chart [data]="chartData"></app-heavy-chart>
   } @placeholder {
     <div class="chart-skeleton"></div>
   }
   ```

   **C. Replace Heavy Libraries**:
   ```typescript
   // ❌ Before (Moment.js - 500KB)
   import * as moment from 'moment';
   const formatted = moment(date).format('YYYY-MM-DD');
   
   // ✅ After (date-fns - 20KB, tree-shakeable)
   import { format } from 'date-fns';
   const formatted = format(date, 'yyyy-MM-dd');
   
   // ✅ Or use native Intl (0KB)
   const formatted = new Intl.DateTimeFormat('en-CA').format(date);
   ```

   **D. Optimize Lodash Imports**:
   ```typescript
   // ❌ Before (imports entire library)
   import _ from 'lodash';
   _.debounce(fn, 300);
   
   // ✅ After (tree-shakeable)
   import debounce from 'lodash-es/debounce';
   debounce(fn, 300);
   ```

4. **Set Bundle Budgets** in `angular.json`:
   ```json
   {
     "budgets": [
       {
         "type": "initial",
         "maximumWarning": "1.5mb",
         "maximumError": "2mb"
       },
       {
         "type": "anyComponentStyle",
         "maximumWarning": "6kb",
         "maximumError": "10kb"
       }
     ]
   }
   ```

**Output**:
- Top 5 largest dependencies
- Recommended replacements
- Estimated size savings
- Updated bundle budget configuration
```

---

### Template 3: Deferrable Views Implementation
Use this to implement `@defer` for performance optimization.

```markdown
@InfraPerfOptimizer
Identify and implement deferrable views for the following pages.

**Pages**: [LIST OF PAGES OR COMPONENTS]

**Defer Strategies**:

1. **On Viewport** (Lazy load when scrolled into view):
   ```html
   @defer (on viewport) {
     <app-product-reviews [productId]="productId"></app-product-reviews>
   } @placeholder {
     <div class="reviews-skeleton">Loading reviews...</div>
   } @loading (minimum 500ms) {
     <mat-spinner diameter="40"></mat-spinner>
   }
   ```

2. **On Interaction** (Load when user clicks/hovers):
   ```html
   @defer (on interaction) {
     <app-advanced-filters></app-advanced-filters>
   } @placeholder {
     <button>Show Advanced Filters</button>
   }
   ```

3. **On Idle** (Load when browser is idle):
   ```html
   @defer (on idle) {
     <app-analytics-dashboard></app-analytics-dashboard>
   } @placeholder {
     <div>Dashboard will load shortly...</div>
   }
   ```

4. **On Timer** (Load after delay):
   ```html
   @defer (on timer(2s)) {
     <app-promotional-banner></app-promotional-banner>
   } @placeholder {
     <!-- Empty, banner appears after 2s -->
   }
   ```

5. **Prefetch** (Load in background):
   ```html
   @defer (on viewport; prefetch on idle) {
     <app-related-products></app-related-products>
   } @placeholder {
     <div class="skeleton-grid"></div>
   }
   ```

**Best Practices**:
- ✅ **DO** defer: Heavy charts, analytics, below-the-fold content
- ✅ **DO** defer: Third-party widgets (chat, social media embeds)
- ❌ **DON'T** defer: Critical above-the-fold content
- ❌ **DON'T** defer: Navigation, headers, footers
- ❌ **DON'T** defer: Content needed for SEO

**Measurement**:
Before and after metrics:
- Initial bundle size
- Time to Interactive (TTI)
- Largest Contentful Paint (LCP)

**Output**: List of components deferred with strategy used.
```

---

### Template 4: Lighthouse Performance Audit
Use this to fix Core Web Vitals issues.

```markdown
@InfraPerfOptimizer
Analyze and fix the following Lighthouse performance issues.

**Lighthouse Report**:
```
[PASTE LIGHTHOUSE JSON OR KEY METRICS]
```

**Target Metrics**:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **Performance Score**: > 90

**Common Issues & Fixes**:

1. **Slow LCP (> 2.5s)**:
   
   **Cause**: Large hero image without optimization
   ```html
   <!-- ❌ Before -->
   <img src="/assets/hero.jpg" alt="Hero">
   
   <!-- ✅ After -->
   <img ngSrc="/assets/hero.jpg" 
        alt="Hero" 
        width="1920" 
        height="1080" 
        priority>
   ```

   **Cause**: Render-blocking CSS/JS
   ```html
   <!-- ✅ Preload critical resources -->
   <link rel="preload" href="styles.css" as="style">
   <link rel="preload" href="main.js" as="script">
   ```

2. **High CLS (> 0.1)**:
   
   **Cause**: Images without dimensions
   ```html
   <!-- ❌ Before -->
   <img src="product.jpg" alt="Product">
   
   <!-- ✅ After -->
   <img src="product.jpg" alt="Product" width="300" height="200">
   ```

   **Cause**: Web fonts causing layout shift
   ```css
   /* ✅ Use font-display: swap */
   @font-face {
     font-family: 'Roboto';
     src: url('/fonts/roboto.woff2');
     font-display: swap;
   }
   ```

3. **Slow FID (> 100ms)**:
   
   **Cause**: Large JavaScript bundles
   - Use code splitting and lazy loading
   - Defer non-critical JavaScript
   
   **Cause**: Long tasks blocking main thread
   ```typescript
   // ❌ Before (blocks main thread)
   processLargeDataset(data);
   
   // ✅ After (use Web Worker)
   const worker = new Worker(new URL('./data.worker', import.meta.url));
   worker.postMessage(data);
   ```

4. **Unused JavaScript**:
   ```bash
   # Analyze bundle
   npx webpack-bundle-analyzer dist/stats.json
   
   # Remove unused dependencies
   npm uninstall [unused-package]
   ```

5. **Unoptimized Images**:
   ```bash
   # Use modern formats (WebP, AVIF)
   # Set up image CDN with automatic optimization
   # Use NgOptimizedImage directive
   ```

**Verification**:
- [ ] Run Lighthouse again
- [ ] Check all metrics improved
- [ ] Test on slow 3G network
- [ ] Test on low-end devices

**Output**: 
- Before/after metrics comparison
- List of fixes applied
- Remaining issues (if any)
```

---

### Template 5: CI/CD Pipeline Optimization
Use this to speed up build and deployment pipelines.

```markdown
@InfraPerfOptimizer
Optimize the CI/CD pipeline to reduce build and deployment time.

**Current Pipeline Time**: [X minutes]
**Target**: < [Y minutes]

**Optimization Strategies**:

1. **Enable Build Caching**:
   ```yaml
   # Azure Pipelines
   - task: Cache@2
     inputs:
       key: 'npm | "$(Agent.OS)" | package-lock.json'
       path: $(npm_config_cache)
     displayName: Cache npm
   
   - task: Cache@2
     inputs:
       key: 'angular | "$(Agent.OS)" | package-lock.json'
       path: .angular/cache
     displayName: Cache Angular build
   ```

2. **Parallel Jobs**:
   ```yaml
   # Run lint, test, and build in parallel
   jobs:
   - job: Lint
     steps:
       - script: npm run lint
   
   - job: Test
     steps:
       - script: npm run test:ci
   
   - job: Build
     steps:
       - script: npm run build
   ```

3. **Incremental Builds**:
   ```json
   // angular.json
   {
     "projects": {
       "app": {
         "architect": {
           "build": {
             "options": {
               "buildOptimizer": true,
               "optimization": true,
               "sourceMap": false
             }
           }
         }
       }
     }
   }
   ```

4. **Skip Unnecessary Steps**:
   ```yaml
   # Only run tests on PR, not on every commit
   trigger:
     branches:
       include:
         - main
         - develop
   
   pr:
     branches:
       include:
         - '*'
   ```

5. **Use Faster Test Runner**:
   ```bash
   # Replace Karma with Vitest (10x faster)
   npm run test -- --run --reporter=junit
   ```

**Output**:
- Pipeline configuration updates
- Estimated time savings
- Before/after build times
```

## 🚦 Supervision Level
- **Level 3 (Moderate Autonomy)**: Infrastructure breaks are obvious. Performance fixes need verification.
- **Red Flags**:
    - Agent removing security headers from Nginx.
    - Agent setting budgets so high they are meaningless.
    - Agent using `@defer` on critical above-the-fold content.

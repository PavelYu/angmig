# 🏛️ Agent Role: Architecture Reviewer

## 📋 Role Description
The **Architecture Reviewer** agent acts as a high-level auditor, helping the Tech Lead spot structural issues, circular dependencies, and bundle bloat before they become critical.

**Primary "Manager"**: Tech Lead

## 🎯 Responsibilities
- **Circular Dependencies**: Detect cycles in imports using `madge`.
- **Bundle Analysis**: Analyze `source-map-explorer` output for bloat.
- **Module Boundaries**: Ensure features are properly isolated (or standalone).
- **Migration Progress**: Track the % of components migrated to Standalone/OnPush.

## 🧠 Knowledge Sources
- **Angular MCP**: For architectural best practices.
- **Context7**: For project-specific architectural rules (e.g., "CoreModule only imports singleton services").

## 💬 Prompt Templates

### Template 1: Circular Dependency Detection
Use this daily or before major merges to prevent import cycles.

```markdown
@ArchitectureReviewer
Analyze the project for circular dependencies and suggest fixes.

**Analysis Command**:
```bash
npx madge --circular --extensions ts,js src/
```

**Output Analysis**:

1. **Identify Cycles**:
   ```
   Circular dependency found:
   src/app/user/user.service.ts > src/app/auth/auth.service.ts > src/app/user/user.service.ts
   ```

2. **Categorize by Severity**:
   - **CRITICAL**: Cycles involving core services (AuthService, HttpClient wrappers)
   - **HIGH**: Cycles in feature modules
   - **MEDIUM**: Cycles in shared utilities
   - **LOW**: Type-only circular references

3. **Common Fixes**:

   **A. Extract Shared Interface**:
   ```typescript
   // ❌ Before (Circular)
   // user.service.ts
   import { AuthService } from './auth.service';
   
   // auth.service.ts
   import { UserService } from './user.service';
   
   // ✅ After (Shared interface)
   // user.interface.ts
   export interface User {
     id: string;
     name: string;
   }
   
   // user.service.ts
   import { User } from './user.interface';
   
   // auth.service.ts
   import { User } from './user.interface';
   ```

   **B. Use Dependency Injection**:
   ```typescript
   // ❌ Before (Direct import causes cycle)
   import { ServiceB } from './service-b';
   
   export class ServiceA {
     constructor(private serviceB: ServiceB) {}
   }
   
   // ✅ After (Inject at usage point)
   export class ServiceA {
     private serviceB = inject(ServiceB);
   }
   ```

   **C. Move to Shared Module**:
   ```typescript
   // Create src/app/shared/models/user.model.ts
   // Both services import from shared location
   ```

   **D. Refactor to Remove Dependency**:
   ```typescript
   // Sometimes the cycle indicates poor design
   // Consider if both services should depend on a third service
   ```

**Refactoring Plan**:
For each cycle found:
1. Identify the root cause
2. Suggest the appropriate fix (A, B, C, or D)
3. Estimate refactoring effort (Low/Medium/High)
4. Prioritize by severity

**Output**:
- List of circular dependencies found
- Categorized by severity
- Refactoring plan for top 3 critical cycles
- Estimated effort for each fix
```

---

### Template 2: Bundle Bloat Analysis
Use this after major builds or when bundle size increases unexpectedly.

```markdown
@ArchitectureReviewer
Analyze the production bundle for bloat and suggest optimizations.

**Generate Bundle Stats**:
```bash
npm run build -- --configuration production --stats-json
npx webpack-bundle-analyzer dist/stats.json
# OR
npx source-map-explorer dist/**/*.js --html bundle-report.html
```

**Analysis Tasks**:

1. **Identify Top Dependencies by Size**:
   ```
   Example output:
   1. @angular/material - 450KB (30%)
   2. highcharts - 380KB (25%)
   3. moment - 280KB (18%)
   4. lodash - 150KB (10%)
   5. rxjs - 120KB (8%)
   ```

2. **Check for Duplicate Dependencies**:
   ```bash
   npm ls [package-name]
   # Look for multiple versions of the same package
   ```

3. **Identify Barely-Used Libraries**:
   - Library takes 200KB but only 1-2 functions are used
   - Example: Importing all of Lodash for just `debounce`

4. **Optimization Recommendations**:

   **A. Replace Heavy Libraries**:
   ```markdown
   | Current | Size | Replacement | Size | Savings |
   |---------|------|-------------|------|---------|
   | moment.js | 280KB | date-fns | 20KB | 260KB |
   | lodash (full) | 150KB | lodash-es (tree-shakeable) | 30KB | 120KB |
   | chart.js | 200KB | Lazy load on /analytics route | 0KB (initial) | 200KB |
   ```

   **B. Lazy Load Heavy Features**:
   ```typescript
   // Move heavy modules to lazy-loaded routes
   {
     path: 'reports',
     loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
     // This moves Highcharts out of main bundle
   }
   ```

   **C. Use @defer for Components**:
   ```html
   @defer (on viewport) {
     <app-heavy-chart></app-heavy-chart>
   }
   ```

   **D. Check for Accidental Imports**:
   ```typescript
   // ❌ Bad (imports entire library)
   import * as _ from 'lodash';
   
   // ✅ Good (tree-shakeable)
   import { debounce } from 'lodash-es';
   ```

5. **Set/Update Bundle Budgets**:
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
         "maximumWarning": "6kb"
       }
     ]
   }
   ```

**Output**:
- Top 10 largest dependencies
- Recommended replacements with size savings
- Lazy loading opportunities
- Updated bundle budget configuration
- Estimated total size reduction
```

---

### Template 3: Module Boundary Enforcement
Use this to ensure proper separation of concerns and prevent feature coupling.

```markdown
@ArchitectureReviewer
Audit module boundaries and ensure proper architectural separation.

**Architecture Rules**:

1. **Core Module** (Singleton services only):
   ```typescript
   // ✅ ALLOWED in CoreModule
   - AuthService
   - HttpInterceptors
   - Global error handlers
   - App-wide configuration
   
   // ❌ NOT ALLOWED in CoreModule
   - Components
   - Feature-specific services
   - Pipes/Directives
   ```

2. **Shared Module** (Reusable components/pipes/directives):
   ```typescript
   // ✅ ALLOWED in SharedModule
   - UI components (buttons, cards, modals)
   - Common pipes (date, currency formatters)
   - Common directives (tooltip, highlight)
   
   // ❌ NOT ALLOWED in SharedModule
   - Services with state
   - Feature-specific components
   - Business logic
   ```

3. **Feature Modules** (Self-contained features):
   ```typescript
   // ✅ ALLOWED in Feature Module
   - Feature components
   - Feature services
   - Feature routing
   - Feature state management
   
   // ❌ NOT ALLOWED
   - Importing other feature modules
   - Accessing other feature's services directly
   ```

**Audit Checklist**:

1. **Check for Cross-Feature Imports**:
   ```bash
   # Find imports from other features
   grep -r "from.*features/user" src/app/features/product/
   # Should return nothing!
   ```

2. **Verify SharedModule Exports**:
   ```typescript
   // SharedModule should only export:
   @NgModule({
     exports: [
       // Angular modules
       CommonModule,
       FormsModule,
       
       // Shared components
       ButtonComponent,
       CardComponent,
       
       // Shared pipes
       DateFormatPipe
     ]
   })
   ```

3. **Check for Proper Lazy Loading**:
   ```typescript
   // Each feature should be lazy-loaded
   {
     path: 'users',
     loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule)
   }
   ```

4. **Verify Service Scope**:
   ```typescript
   // ✅ App-wide service
   @Injectable({ providedIn: 'root' })
   export class AuthService {}
   
   // ✅ Feature-scoped service
   @Injectable() // Provided in feature module
   export class UserListService {}
   ```

**Common Violations & Fixes**:

```typescript
// ❌ VIOLATION: Feature importing another feature
// src/app/features/product/product.service.ts
import { UserService } from '../user/user.service';

// ✅ FIX: Extract to shared service or use events
// Create src/app/core/services/user-api.service.ts
// Both features import from core

// ❌ VIOLATION: Shared module with state
@Injectable({ providedIn: 'root' })
export class SharedDataService {
  private data = new BehaviorSubject([]);
}

// ✅ FIX: Move to CoreModule or feature module

// ❌ VIOLATION: CoreModule with components
@NgModule({
  declarations: [HeaderComponent] // Components don't belong in Core!
})

// ✅ FIX: Move to SharedModule or make standalone
```

**Output**:
- List of boundary violations
- Recommended fixes for each violation
- Updated module structure diagram
```

---

### Template 4: Migration Progress Tracking
Use this to track progress of large-scale refactorings.

```markdown
@ArchitectureReviewer
Generate a progress report for the [MIGRATION_NAME] migration.

**Tracking Metrics**:

1. **Standalone Component Migration**:
   ```bash
   # Count total components
   find src/app -name "*.component.ts" | wc -l
   
   # Count standalone components
   grep -r "standalone: true" src/app --include="*.component.ts" | wc -l
   
   # Calculate percentage
   ```

2. **OnPush Change Detection**:
   ```bash
   # Count components with OnPush
   grep -r "changeDetection: ChangeDetectionStrategy.OnPush" src/app | wc -l
   ```

3. **Control Flow Syntax** (@if, @for):
   ```bash
   # Count old syntax
   grep -r "\*ngIf" src/app --include="*.html" | wc -l
   grep -r "\*ngFor" src/app --include="*.html" | wc -l
   
   # Count new syntax
   grep -r "@if" src/app --include="*.html" | wc -l
   grep -r "@for" src/app --include="*.html" | wc -l
   ```

4. **Typed Forms**:
   ```bash
   # Find untyped FormGroup
   grep -r "FormGroup" src/app --include="*.ts" | grep -v "FormGroup<"
   ```

5. **inject() Function**:
   ```bash
   # Count services using inject()
   grep -r "inject(" src/app --include="*.service.ts" | wc -l
   ```

**Progress Report Template**:

```markdown
## Migration Progress Report - [DATE]

### Standalone Components
- **Total Components**: 245
- **Migrated to Standalone**: 180 (73%)
- **Remaining**: 65 (27%)
- **Target**: 100% by [DATE]

### OnPush Change Detection
- **Total Components**: 245
- **Using OnPush**: 120 (49%)
- **Default**: 125 (51%)
- **Target**: 80% by [DATE]

### Control Flow Syntax
- **Old Syntax (*ngIf, *ngFor)**: 450 usages
- **New Syntax (@if, @for)**: 200 usages
- **Progress**: 31%
- **Target**: 100% by [DATE]

### Typed Forms
- **Total Forms**: 85
- **Typed**: 40 (47%)
- **Untyped**: 45 (53%)
- **Target**: 100% by [DATE]

### inject() Function
- **Total Services**: 120
- **Using inject()**: 75 (62%)
- **Using constructor**: 45 (38%)
- **Target**: 90% by [DATE]

### Blockers
1. Component X depends on legacy module Y
2. Form Z has complex dynamic controls (hard to type)

### Next Steps
1. Migrate remaining components in /features/admin
2. Add OnPush to all list components
3. Convert all forms in /features/checkout
```

**Output**: Detailed progress report with metrics and next steps.
```

---

### Template 5: Code Quality Metrics
Use this to establish and track code quality baselines.

```markdown
@ArchitectureReviewer
Generate a code quality report for the project.

**Metrics to Track**:

1. **TypeScript Strictness**:
   ```bash
   # Check tsconfig.json settings
   cat tsconfig.json | grep -A 10 "compilerOptions"
   
   # Count 'any' types
   grep -r ": any" src/app --include="*.ts" | wc -l
   ```

2. **Test Coverage**:
   ```bash
   npm run test:coverage
   # Target: >80% coverage
   ```

3. **Linting Issues**:
   ```bash
   npm run lint -- --format json > lint-report.json
   # Count errors vs warnings
   ```

4. **Complexity**:
   ```bash
   npx ts-complex src/app/**/*.ts
   # Flag functions with complexity > 10
   ```

5. **Code Duplication**:
   ```bash
   npx jscpd src/app
   # Target: <5% duplication
   ```

**Quality Report Template**:

```markdown
## Code Quality Report - [DATE]

### TypeScript Strictness
- **strict**: ✅ Enabled
- **strictNullChecks**: ✅ Enabled
- **noImplicitAny**: ✅ Enabled
- **'any' usages**: 45 (Target: <20)

### Test Coverage
- **Statements**: 78% (Target: >80%)
- **Branches**: 65% (Target: >75%)
- **Functions**: 82% (Target: >80%)
- **Lines**: 77% (Target: >80%)

### Linting
- **Errors**: 0 ✅
- **Warnings**: 12 (Target: <10)
- **Most common**: Missing return types (8 occurrences)

### Complexity
- **Average**: 4.2 ✅
- **Max**: 15 (in UserService.processData)
- **Functions >10**: 3 (Target: 0)

### Code Duplication
- **Total**: 3.2% ✅
- **Largest duplicate**: 15 lines in auth components

### Recommendations
1. Add return types to 8 functions
2. Refactor UserService.processData (complexity 15)
3. Extract common auth logic to shared function
4. Add tests for uncovered branches in PaymentService
```

**Output**: Comprehensive quality report with actionable recommendations.
```

## 🚦 Supervision Level
- **Level 2 (High Autonomy)**: This agent suggests, it doesn't modify code directly.
- **Red Flags**:
    - Agent suggesting to split a module that *must* be eager loaded.
    - Agent misidentifying a type-only import as a runtime dependency.

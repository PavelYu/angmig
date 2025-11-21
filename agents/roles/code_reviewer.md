# 🧐 Agent Role: Code Reviewer

## 📋 Role Description
The **Code Reviewer** agent acts as a "Gatekeeper" that any developer can use to pre-validate their work before sending it to the Tech Lead. It catches style violations, common anti-patterns, and missing tests.

**Primary "Manager"**: Any Developer (Self-Service)

## 🎯 Responsibilities
- **Style Check**: Enforce Angular Style Guide (e.g., file naming, component structure).
- **Pattern Validation**: Check if `Context7` patterns are followed (e.g., "Did you use `inject()`?").
- **Smell Detection**: Find `any` types, `console.log`, or commented-out code.
- **Test Verification**: Ensure every new component has a corresponding `.spec.ts` file.

## 🧠 Knowledge Sources
- **Angular MCP**: For official style guide rules.
- **Context7**: For team-specific "Do's and Don'ts".

## 💬 Prompt Templates

### Template 1: Pre-PR Code Review
Use this before opening a Pull Request to catch issues early.

```markdown
@CodeReviewer
Review my changes for code quality, style violations, and potential issues.

**Files Changed**:
```
[PASTE GIT DIFF OR LIST OF FILES]
```

**Review Checklist**:

1. **Angular Style Guide Compliance**:
   
   **File Naming**:
   ```typescript
   // ✅ Correct
   user-profile.component.ts
   auth.service.ts
   date-format.pipe.ts
   
   // ❌ Incorrect
   UserProfile.component.ts  // Should be kebab-case
   authService.ts            // Missing .service suffix
   dateFormat.ts             // Missing .pipe suffix
   ```

   **Component Structure**:
   ```typescript
   // ✅ Correct order
   @Component({...})
   export class UserComponent {
     // 1. Inputs
     @Input() user: User;
     
     // 2. Outputs
     @Output() userChanged = new EventEmitter<User>();
     
     // 3. Public properties
     displayName: string;
     
     // 4. Private properties
     private userId: string;
     
     // 5. Constructor
     constructor() {}
     
     // 6. Lifecycle hooks (in order)
     ngOnInit() {}
     ngOnDestroy() {}
     
     // 7. Public methods
     saveUser() {}
     
     // 8. Private methods
     private validateUser() {}
   }
   ```

2. **Type Safety**:
   ```typescript
   // ❌ Avoid 'any'
   function processData(data: any): any {
     return data.map(item => item.value);
   }
   
   // ✅ Use proper types
   function processData(data: DataItem[]): number[] {
     return data.map(item => item.value);
   }
   
   // ❌ Implicit any
   const users = [];  // Type: any[]
   
   // ✅ Explicit type
   const users: User[] = [];
   ```

3. **Observable Management**:
   ```typescript
   // ❌ Memory leak
   ngOnInit() {
     this.dataService.data$.subscribe(data => {
       this.data = data;
     });
   }
   
   // ✅ Use takeUntilDestroyed
   private destroyRef = inject(DestroyRef);
   
   ngOnInit() {
     this.dataService.data$
       .pipe(takeUntilDestroyed(this.destroyRef))
       .subscribe(data => this.data = data);
   }
   
   // ✅ Or use async pipe in template
   data$ = this.dataService.data$;
   // Template: {{ data$ | async }}
   ```

4. **Code Smells**:
   ```typescript
   // ❌ console.log in production code
   console.log('User data:', user);
   
   // ✅ Use proper logging service
   this.logger.debug('User data:', user);
   
   // ❌ Commented-out code
   // const oldMethod = () => {
   //   // old implementation
   // };
   
   // ✅ Remove dead code
   
   // ❌ Magic numbers
   if (user.age > 18) {
     // ...
   }
   
   // ✅ Named constants
   const LEGAL_AGE = 18;
   if (user.age > LEGAL_AGE) {
     // ...
   }
   ```

5. **Performance**:
   ```typescript
   // ❌ Default change detection
   @Component({
     selector: 'app-user-list',
     template: '...'
   })
   
   // ✅ OnPush for better performance
   @Component({
     selector: 'app-user-list',
     changeDetection: ChangeDetectionStrategy.OnPush,
     template: '...'
   })
   
   // ❌ Heavy computation in template
   <div>{{ calculateTotal() }}</div>
   
   // ✅ Use computed signal or pipe
   total = computed(() => this.items().reduce((sum, item) => sum + item.price, 0));
   <div>{{ total() }}</div>
   ```

**Output Format**:

```markdown
## Code Review Results

### ✅ Passed (5)
- File naming follows conventions
- All components have tests
- No console.log statements
- Proper use of OnPush
- Observable subscriptions properly managed

### ⚠️ Warnings (3)
1. **user.service.ts:45** - Method `getUser` missing return type
   - Severity: MEDIUM
   - Fix: Add `: Observable<User>` return type

2. **dashboard.component.ts:23** - Using `any` type
   - Severity: HIGH
   - Fix: Define proper interface for dashboard data

3. **auth.guard.ts:12** - Complex conditional (complexity: 8)
   - Severity: LOW
   - Fix: Consider extracting to separate method

### ❌ Errors (1)
1. **payment.component.ts:67** - Unsubscribed Observable
   - Severity: CRITICAL
   - Fix: Add `takeUntilDestroyed()` or use async pipe

### Summary
- Total Issues: 4
- Critical: 1
- High: 1
- Medium: 1
- Low: 1

**Recommendation**: Fix critical issue before merging.
```
```

---

### Template 2: Test Coverage Verification
Use this to ensure adequate test coverage for new code.

```markdown
@CodeReviewer
Verify test coverage for the following component/service.

**File**: [COMPONENT_OR_SERVICE_FILE]

**Test Coverage Checklist**:

1. **Test File Exists**:
   ```bash
   # Check for .spec.ts file
   ls -la user.component.spec.ts
   ```

2. **Test Structure**:
   ```typescript
   // ✅ Good test structure
   describe('UserComponent', () => {
     let component: UserComponent;
     let fixture: ComponentFixture<UserComponent>;
     
     beforeEach(() => {
       TestBed.configureTestingModule({
         imports: [UserComponent]
       });
       fixture = TestBed.createComponent(UserComponent);
       component = fixture.componentInstance;
     });
     
     it('should create', () => {
       expect(component).toBeTruthy();
     });
     
     describe('loadUser', () => {
       it('should load user data', () => {
         // Test implementation
       });
       
       it('should handle errors', () => {
         // Error case
       });
     });
   });
   ```

3. **Coverage Requirements**:
   - **Public methods**: 100% covered
   - **Edge cases**: Error handling, empty states, null checks
   - **User interactions**: Click, input, form submission
   - **Lifecycle hooks**: ngOnInit, ngOnDestroy if they contain logic

4. **Common Missing Tests**:
   ```typescript
   // ❌ Only testing happy path
   it('should save user', () => {
     component.saveUser();
     expect(component.saved).toBe(true);
   });
   
   // ✅ Test error cases too
   it('should handle save errors', () => {
     spyOn(service, 'save').and.returnValue(throwError(() => new Error()));
     component.saveUser();
     expect(component.error).toBeTruthy();
   });
   
   // ❌ Not testing user interactions
   // ✅ Test button clicks, form inputs
   it('should emit event on button click', () => {
     spyOn(component.userSaved, 'emit');
     const button = fixture.debugElement.query(By.css('button'));
     button.nativeElement.click();
     expect(component.userSaved.emit).toHaveBeenCalled();
   });
   ```

5. **Test Quality**:
   ```typescript
   // ❌ Testing implementation details
   it('should call private method', () => {
     spyOn(component as any, 'privateMethod');
     component.publicMethod();
     expect((component as any).privateMethod).toHaveBeenCalled();
   });
   
   // ✅ Test behavior, not implementation
   it('should update display name when user changes', () => {
     component.user = { name: 'John' };
     component.ngOnInit();
     expect(component.displayName).toBe('John');
   });
   ```

**Output**:

```markdown
## Test Coverage Report

### Coverage Metrics
- **Statements**: 85% ✅
- **Branches**: 70% ⚠️
- **Functions**: 90% ✅
- **Lines**: 83% ✅

### Missing Coverage
1. **Error handling** in `saveUser()` method
   - Lines 45-48 not covered
   - Add test for API error scenario

2. **Edge case** in `calculateTotal()`
   - Empty array case not tested
   - Add test with empty items array

3. **User interaction** - Delete button
   - Click handler not tested
   - Add test for delete confirmation

### Test Quality Issues
1. **Line 67**: Testing private method (implementation detail)
   - Refactor to test public behavior

2. **Line 89**: Hardcoded timeout in test
   - Use `fakeAsync` and `tick` instead

### Recommendations
- Add 3 missing test cases
- Refactor 2 tests to focus on behavior
- Target: >80% coverage on all metrics
```
```

---

### Template 3: Security & Best Practices Audit
Use this to check for security issues and anti-patterns.

```markdown
@CodeReviewer
Audit the following code for security issues and anti-patterns.

**Files**: [LIST OF FILES]

**Security Checklist**:

1. **XSS Prevention**:
   ```typescript
   // ❌ Dangerous - XSS vulnerability
   @Component({
     template: `<div [innerHTML]="userContent"></div>`
   })
   
   // ✅ Safe - Sanitized
   import { DomSanitizer } from '@angular/platform-browser';
   
   constructor(private sanitizer: DomSanitizer) {}
   
   get safeContent() {
     return this.sanitizer.sanitize(SecurityContext.HTML, this.userContent);
   }
   ```

2. **Sensitive Data**:
   ```typescript
   // ❌ Hardcoded secrets
   const API_KEY = 'sk_live_1234567890';
   
   // ✅ Use environment variables
   const API_KEY = environment.apiKey;
   
   // ❌ Logging sensitive data
   console.log('User password:', password);
   
   // ✅ Never log sensitive data
   this.logger.debug('User authenticated');
   ```

3. **Input Validation**:
   ```typescript
   // ❌ No validation
   saveUser(user: any) {
     this.http.post('/api/users', user);
   }
   
   // ✅ Validate input
   saveUser(user: User) {
     if (!this.isValidUser(user)) {
       throw new Error('Invalid user data');
     }
     this.http.post('/api/users', user);
   }
   ```

4. **Authentication**:
   ```typescript
   // ❌ Client-side only auth check
   canAccess() {
     return this.user?.role === 'admin';
   }
   
   // ✅ Server-side verification
   canAccess() {
     // Client check for UX
     if (this.user?.role !== 'admin') return false;
     // Server validates on API call
     return this.http.get('/api/admin/verify');
   }
   ```

5. **Common Anti-Patterns**:
   ```typescript
   // ❌ Mutating input
   @Input() user: User;
   
   updateUser() {
     this.user.name = 'New Name'; // Mutates parent's data!
   }
   
   // ✅ Emit changes
   @Input() user: User;
   @Output() userChanged = new EventEmitter<User>();
   
   updateUser() {
     this.userChanged.emit({ ...this.user, name: 'New Name' });
   }
   
   // ❌ Side effects in constructor
   constructor(private service: DataService) {
     this.service.loadData(); // Don't do this!
   }
   
   // ✅ Use lifecycle hooks
   ngOnInit() {
     this.service.loadData();
   }
   ```

**Output**:

```markdown
## Security Audit Results

### 🔴 Critical Issues (1)
1. **auth.service.ts:23** - Hardcoded API key
   - Risk: HIGH
   - Fix: Move to environment.ts

### 🟡 Warnings (2)
1. **user.component.ts:45** - Unsanitized HTML binding
   - Risk: MEDIUM (XSS)
   - Fix: Use DomSanitizer

2. **payment.service.ts:67** - Logging sensitive data
   - Risk: MEDIUM
   - Fix: Remove password from logs

### ✅ Best Practices (3)
1. Proper input validation ✅
2. Server-side auth verification ✅
3. No mutation of @Input properties ✅

### Recommendations
- Fix critical issue immediately
- Address warnings before production
- Consider adding CSP headers
```
```

---

### Template 4: Dependency & Import Analysis
Use this to check for proper imports and dependency usage.

```markdown
@CodeReviewer
Analyze imports and dependencies in the following files.

**Files**: [LIST OF FILES]

**Import Checklist**:

1. **Unused Imports**:
   ```typescript
   // ❌ Unused imports
   import { Component, OnInit, Input } from '@angular/core';
   import { HttpClient } from '@angular/common/http';
   import { map, filter, debounce } from 'rxjs/operators';
   
   // Only Component and OnInit are used
   
   // ✅ Remove unused
   import { Component, OnInit } from '@angular/core';
   ```

2. **Barrel Imports** (Performance):
   ```typescript
   // ❌ Imports entire library
   import { Button, Card, Dialog } from '@angular/material';
   
   // ✅ Specific imports (better tree-shaking)
   import { MatButtonModule } from '@angular/material/button';
   import { MatCardModule } from '@angular/material/card';
   import { MatDialogModule } from '@angular/material/dialog';
   ```

3. **Relative vs Absolute Paths**:
   ```typescript
   // ❌ Deep relative imports
   import { User } from '../../../shared/models/user';
   
   // ✅ Use path aliases (tsconfig.json)
   import { User } from '@shared/models/user';
   ```

4. **Circular Dependencies**:
   ```typescript
   // ❌ Circular import
   // service-a.ts imports service-b.ts
   // service-b.ts imports service-a.ts
   
   // ✅ Extract shared interface
   // Create shared/interfaces/user.interface.ts
   ```

5. **Deprecated Imports**:
   ```typescript
   // ❌ Deprecated
   import { Http } from '@angular/http';
   
   // ✅ Use HttpClient
   import { HttpClient } from '@angular/common/http';
   ```

**Output**:

```markdown
## Import Analysis

### Unused Imports (5)
1. **user.component.ts** - Remove `Input, ViewChild`
2. **auth.service.ts** - Remove `map, filter`
3. **dashboard.component.ts** - Remove `HttpClient`

### Optimization Opportunities (3)
1. **material.module.ts** - Use specific imports instead of barrel
   - Potential savings: ~200KB

2. **utils/index.ts** - Deep relative paths detected
   - Recommendation: Set up path aliases

### Issues (2)
1. **Circular dependency** detected:
   - user.service.ts ↔ auth.service.ts
   - Fix: Extract shared User interface

2. **Deprecated import** in legacy.service.ts:
   - Using @angular/http (deprecated)
   - Fix: Migrate to HttpClient

### Summary
- Unused imports: 5
- Optimization opportunities: 3
- Issues: 2
```
```

---

### Template 5: Performance Review
Use this to identify performance issues in code.

```markdown
@CodeReviewer
Review the following code for performance issues.

**Files**: [LIST OF FILES]

**Performance Checklist**:

1. **Change Detection**:
   ```typescript
   // ❌ Default change detection
   @Component({
     selector: 'app-list',
     template: '...'
   })
   
   // ✅ OnPush for lists
   @Component({
     selector: 'app-list',
     changeDetection: ChangeDetectionStrategy.OnPush,
     template: '...'
   })
   ```

2. **Template Expressions**:
   ```html
   <!-- ❌ Function calls in template -->
   <div *ngFor="let item of items">
     {{ calculatePrice(item) }}
   </div>
   
   <!-- ✅ Use computed or pipe -->
   <div *ngFor="let item of items">
     {{ item.price | currency }}
   </div>
   ```

3. **TrackBy Functions**:
   ```html
   <!-- ❌ No trackBy -->
   <div *ngFor="let item of items">
     {{ item.name }}
   </div>
   
   <!-- ✅ With trackBy -->
   <div *ngFor="let item of items; trackBy: trackById">
     {{ item.name }}
   </div>
   ```

4. **Unnecessary Re-renders**:
   ```typescript
   // ❌ Creates new object on every check
   get userConfig() {
     return { name: this.user.name, age: this.user.age };
   }
   
   // ✅ Use signal or memoization
   userConfig = computed(() => ({
     name: this.user().name,
     age: this.user().age
   }));
   ```

5. **Large Lists**:
   ```html
   <!-- ❌ Rendering 10,000 items -->
   <div *ngFor="let item of allItems">
     {{ item.name }}
   </div>
   
   <!-- ✅ Virtual scrolling -->
   <cdk-virtual-scroll-viewport itemSize="50">
     <div *cdkVirtualFor="let item of allItems">
       {{ item.name }}
     </div>
   </cdk-virtual-scroll-viewport>
   ```

**Output**:

```markdown
## Performance Review

### Issues Found (4)

1. **user-list.component.ts** - Missing OnPush
   - Impact: HIGH
   - Fix: Add `changeDetection: ChangeDetectionStrategy.OnPush`

2. **dashboard.component.html** - Function call in template
   - Impact: MEDIUM
   - Fix: Use computed signal or pipe

3. **product-list.component.html** - Missing trackBy
   - Impact: MEDIUM
   - Fix: Add trackBy function

4. **search-results.component.html** - Large list without virtual scrolling
   - Impact: HIGH (10,000+ items)
   - Fix: Implement CDK virtual scrolling

### Estimated Impact
- OnPush migration: 30-50% faster change detection
- Remove template functions: 20% faster rendering
- Add trackBy: 40% faster list updates
- Virtual scrolling: 90% faster initial render

### Priority
1. Fix #4 (virtual scrolling) - CRITICAL
2. Fix #1 (OnPush) - HIGH
3. Fix #2, #3 - MEDIUM
```
```

## 🚦 Supervision Level
- **Level 1 (Low Risk)**: This agent *reads* code, it doesn't write it.
- **Red Flags**:
    - Agent flagging valid code as an error (false positive).
    - Agent missing obvious bugs (false negative).

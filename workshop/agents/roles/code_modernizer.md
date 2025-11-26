# 🎨 Agent Role: Code Modernizer

## 📋 Role Description
The **Code Modernizer** agent focuses on refactoring and updating syntax to match newer Angular versions. It handles repetitive code transformations.

**Primary "Manager"**: Dev A2 (Alpha Team)

## 🎯 Responsibilities
- **RxJS Migration**: `toPromise()` → `lastValueFrom()`, pipeable operators.
- **Control Flow**: `*ngIf` → `@if`, `*ngFor` → `@for`.
- **Standalone**: Convert NgModules to Standalone Components.
- **Typed Forms**: Convert legacy forms to Typed Forms.
- **Image Optimization**: Implement `NgOptimizedImage`.

## 🧠 Knowledge Sources
- **Angular MCP**: For official migration schematics and syntax guides.
- **Context7**: For team decisions (e.g., "we prefer `inject()` over constructor DI").

## 💬 Prompt Templates

### Template 1: Control Flow Migration (*ngIf → @if)
Use this to convert templates to Angular 17+ control flow syntax.

```markdown
@CodeModernizer
Convert the following templates from structural directives to the new control flow syntax.

**Files**:
```
[LIST OF .html FILES OR DIRECTORY PATH]
```

**Migration Patterns**:

1. **Simple *ngIf**:
   ```html
   <!-- ❌ Before (v16 and earlier) -->
   <div *ngIf="user">
     Welcome, {{ user.name }}
   </div>
   
   <!-- ✅ After (v17+) -->
   @if (user) {
     <div>Welcome, {{ user.name }}</div>
   }
   ```

2. ***ngIf with else**:
   ```html
   <!-- ❌ Before -->
   <div *ngIf="isLoggedIn; else loginPrompt">
     <app-dashboard></app-dashboard>
   </div>
   <ng-template #loginPrompt>
     <app-login></app-login>
   </ng-template>
   
   <!-- ✅ After -->
   @if (isLoggedIn) {
     <app-dashboard></app-dashboard>
   } @else {
     <app-login></app-login>
   }
   ```

3. ***ngIf with as (aliasing)**:
   ```html
   <!-- ❌ Before -->
   <div *ngIf="user$ | async as user">
     {{ user.name }}
   </div>
   
   <!-- ✅ After -->
   @if (user$ | async; as user) {
     <div>{{ user.name }}</div>
   }
   ```

4. **Complex conditions**:
   ```html
   <!-- ❌ Before -->
   <div *ngIf="user && user.isAdmin && !user.isBanned">
     Admin Panel
   </div>
   
   <!-- ✅ After -->
   @if (user && user.isAdmin && !user.isBanned) {
     <div>Admin Panel</div>
   }
   ```

**Steps**:
1. Identify all `*ngIf` usages in the file.
2. Check for `else` blocks and convert `ng-template` to `@else`.
3. Preserve `as` aliasing syntax.
4. Ensure proper nesting for complex conditions.
5. Test the component after conversion.

**Output**: List of files converted with any issues encountered.
```

---

### Template 2: Control Flow Migration (*ngFor → @for)
Use this to convert loops to the new syntax with proper tracking.

```markdown
@CodeModernizer
Convert *ngFor loops to @for syntax in the following files.

**Files**:
```
[LIST OF .html FILES]
```

**Migration Patterns**:

1. **Simple *ngFor**:
   ```html
   <!-- ❌ Before -->
   <li *ngFor="let item of items">
     {{ item.name }}
   </li>
   
   <!-- ✅ After -->
   @for (item of items; track item.id) {
     <li>{{ item.name }}</li>
   }
   ```

2. ***ngFor with index**:
   ```html
   <!-- ❌ Before -->
   <li *ngFor="let item of items; let i = index">
     {{ i + 1 }}. {{ item.name }}
   </li>
   
   <!-- ✅ After -->
   @for (item of items; track item.id; let i = $index) {
     <li>{{ i + 1 }}. {{ item.name }}</li>
   }
   ```

3. ***ngFor with trackBy**:
   ```html
   <!-- ❌ Before -->
   <li *ngFor="let item of items; trackBy: trackByFn">
     {{ item.name }}
   </li>
   
   // Component:
   trackByFn(index: number, item: Item): number {
     return item.id;
   }
   
   <!-- ✅ After -->
   @for (item of items; track item.id) {
     <li>{{ item.name }}</li>
   }
   
   // trackByFn can be removed if not used elsewhere
   ```

4. ***ngFor with empty state**:
   ```html
   <!-- ❌ Before -->
   <div *ngIf="items.length > 0; else noItems">
     <li *ngFor="let item of items">{{ item.name }}</li>
   </div>
   <ng-template #noItems>
     <p>No items found</p>
   </ng-template>
   
   <!-- ✅ After -->
   @for (item of items; track item.id) {
     <li>{{ item.name }}</li>
   } @empty {
     <p>No items found</p>
   }
   ```

**Track Key Selection**:
- **Prefer unique ID**: `track item.id` (best performance)
- **Use composite key**: `track item.id + item.type` (if no single unique field)
- **Last resort**: `track $index` (add TODO comment: "// TODO: Use unique identifier")

**Steps**:
1. Identify all `*ngFor` loops.
2. Determine the best `track` key (prefer unique ID).
3. Convert index/first/last/even/odd to `$index`, `$first`, `$last`, `$even`, `$odd`.
4. Convert empty states to `@empty` blocks.
5. Remove unused `trackBy` functions from component.

**Output**: List of files converted and track keys used.
```

---

### Template 3: Standalone Component Migration
Use this to convert NgModule-based components to standalone.

```markdown
@CodeModernizer
Convert the following components to standalone architecture.

**Components**:
```
[LIST OF COMPONENT FILES]
```

**Migration Steps**:

1. **Update Component Decorator**:
   ```typescript
   // ❌ Before (Module-based)
   @Component({
     selector: 'app-user-profile',
     templateUrl: './user-profile.component.html',
     styleUrls: ['./user-profile.component.scss']
   })
   export class UserProfileComponent {}
   
   // ✅ After (Standalone)
   @Component({
     selector: 'app-user-profile',
     standalone: true,
     imports: [
       CommonModule,
       FormsModule,
       MatButtonModule,
       MatCardModule
     ],
     templateUrl: './user-profile.component.html',
     styleUrls: ['./user-profile.component.scss']
   })
   export class UserProfileComponent {}
   ```

2. **Identify Required Imports**:
   - Check template for directives: `*ngIf`, `*ngFor` → `CommonModule`
   - Check template for forms: `[(ngModel)]`, `formControl` → `FormsModule` or `ReactiveFormsModule`
   - Check template for Material components: `<mat-button>` → `MatButtonModule`
   - Check template for pipes: `| async`, `| date` → `CommonModule` or specific pipe module

3. **Update Module (if removing component)**:
   ```typescript
   // ❌ Before
   @NgModule({
     declarations: [UserProfileComponent],
     imports: [CommonModule, FormsModule],
     exports: [UserProfileComponent]
   })
   export class UserModule {}
   
   // ✅ After (if component is now standalone)
   @NgModule({
     imports: [UserProfileComponent], // Standalone components go in imports!
     exports: [UserProfileComponent]
   })
   export class UserModule {}
   
   // Or remove the module entirely if no longer needed
   ```

4. **Update Routing** (if applicable):
   ```typescript
   // ❌ Before
   {
     path: 'profile',
     loadChildren: () => import('./user/user.module').then(m => m.UserModule)
   }
   
   // ✅ After (lazy load component directly)
   {
     path: 'profile',
     loadComponent: () => import('./user/user-profile.component').then(m => m.UserProfileComponent)
   }
   ```

**Common Imports Needed**:
- `CommonModule` - for *ngIf, *ngFor, pipes
- `FormsModule` - for [(ngModel)]
- `ReactiveFormsModule` - for [formControl]
- `RouterModule` - for routerLink
- Material modules - for mat-* components

**Output**: 
- List of components converted
- Modules that can now be deleted
- Routing updates needed
```

---

### Template 4: Inject() Function Migration
Use this to modernize dependency injection to use the `inject()` function.

```markdown
@CodeModernizer
Refactor the following components/services to use the `inject()` function instead of constructor injection.

**Files**:
```
[LIST OF .ts FILES]
```

**Migration Pattern**:

```typescript
// ❌ Before (Constructor injection)
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-dashboard',
  template: '...'
})
export class DashboardComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
  
  loadData() {
    this.http.get('/api/data').subscribe(...);
  }
}

// ✅ After (inject() function)
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-dashboard',
  template: '...'
})
export class DashboardComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService);
  
  loadData() {
    this.http.get('/api/data').subscribe(...);
  }
}
```

**Benefits**:
- Cleaner, more concise code
- Easier to add/remove dependencies
- Enables functional composition
- Required for some modern Angular patterns

**Steps**:
1. Add `inject` to imports from `@angular/core`.
2. Move each constructor parameter to a class property with `inject()`.
3. Remove the constructor if it's now empty.
4. Preserve access modifiers (private/protected/public).
5. Test the component/service after conversion.

**Output**: List of files converted.
```

---

### Template 5: Typed Forms Migration
Use this to convert legacy forms to strongly-typed forms (Angular 14+).

```markdown
@CodeModernizer
Convert the following forms to use strongly-typed FormGroup and FormControl.

**Files**:
```
[LIST OF COMPONENT FILES WITH FORMS]
```

**Migration Pattern**:

```typescript
// ❌ Before (Untyped forms)
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class UserFormComponent {
  userForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [null]
    });
  }
  
  onSubmit() {
    const name = this.userForm.value.name; // Type: any
    const email = this.userForm.value.email; // Type: any
  }
}

// ✅ After (Typed forms)
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface UserForm {
  name: string;
  email: string;
  age: number | null;
}

export class UserFormComponent {
  userForm: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    age: FormControl<number | null>;
  }>;
  
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: this.fb.control('', { nonNullable: true, validators: Validators.required }),
      email: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      age: this.fb.control<number | null>(null)
    });
  }
  
  onSubmit() {
    const name = this.userForm.value.name; // Type: string | undefined
    const email = this.userForm.getRawValue().email; // Type: string
  }
}

// ✅ Better: Use NonNullableFormBuilder
import { FormBuilder, NonNullableFormBuilder, FormGroup, Validators } from '@angular/forms';

export class UserFormComponent {
  private fb = inject(NonNullableFormBuilder);
  
  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    age: [null as number | null]
  });
  
  onSubmit() {
    const formValue = this.userForm.getRawValue();
    // formValue is fully typed!
    console.log(formValue.name); // Type: string
    console.log(formValue.email); // Type: string
    console.log(formValue.age); // Type: number | null
  }
}
```

**Steps**:
1. Define an interface for the form shape.
2. Add type parameters to `FormGroup` and `FormControl`.
3. Use `NonNullableFormBuilder` for cleaner syntax.
4. Use `getRawValue()` instead of `value` for full type safety.
5. Update form validation logic to use typed controls.

**Output**: List of forms converted with type safety improvements.
```

---

### Template 6: NgOptimizedImage Implementation
Use this to replace `<img>` tags with `NgOptimizedImage` for better performance.

```markdown
@CodeModernizer
Implement NgOptimizedImage for the following components.

**Components**:
```
[LIST OF COMPONENTS WITH IMAGES]
```

**Migration Pattern**:

```html
<!-- ❌ Before (Regular img tag) -->
<img src="/assets/hero-image.jpg" alt="Hero" width="1200" height="600">

<!-- ✅ After (NgOptimizedImage) -->
<img ngSrc="/assets/hero-image.jpg" alt="Hero" width="1200" height="600" priority>
```

**Component Setup**:
```typescript
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgOptimizedImage],
  template: '...'
})
```

**Key Attributes**:
- `ngSrc` - replaces `src`
- `width` and `height` - **REQUIRED** (prevents layout shift)
- `priority` - for LCP images (above the fold)
- `fill` - for responsive images that fill container
- `sizes` - for responsive images with different sizes

**Examples**:

1. **Hero Image (LCP)**:
   ```html
   <img ngSrc="/hero.jpg" alt="Hero" width="1920" height="1080" priority>
   ```

2. **Responsive Image**:
   ```html
   <img ngSrc="/product.jpg" 
        alt="Product" 
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw">
   ```

3. **Lazy Loaded Image**:
   ```html
   <img ngSrc="/thumbnail.jpg" alt="Thumbnail" width="300" height="200">
   <!-- No 'priority' = lazy loaded by default -->
   ```

**Steps**:
1. Add `NgOptimizedImage` to component imports.
2. Replace `src` with `ngSrc`.
3. Ensure `width` and `height` are specified.
4. Add `priority` to above-the-fold images.
5. Use `fill` for responsive images.

**Output**: List of components updated with image count.
```


## 🚦 Supervision Level
- **Level 2 (High Autonomy)**: Review every 2-3 batches.
- **Red Flags**:
    - Agent misinterpreting complex `*ngIf` else blocks.
    - Agent choosing poor `track` keys in `@for`.

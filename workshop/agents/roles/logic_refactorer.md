# 🧠 Agent Role: Logic Refactorer

## 📋 Role Description
The **Logic Refactorer** agent handles complex backend logic migrations, focusing on Services, HTTP, and State Management. It ensures that business logic remains intact while APIs are modernized.

**Primary "Manager"**: Dev B1 (Beta Team)

## 🎯 Responsibilities
- **HTTP Migration**: Convert `HttpClientModule` to `provideHttpClient`.
- **Injection**: Replace constructor DI with `inject()`.
- **State Management**: Refactor NgRx/Services to newer patterns.
- **Interceptors**: Convert class-based interceptors to functional interceptors.

## 🧠 Knowledge Sources
- **Angular MCP**: For functional API documentation (Guards, Interceptors).
- **Context7**: For architectural decisions (e.g., "we use functional guards").

## 💬 Prompt Templates

### Template 1: HTTP Client Migration (Module → Functional)
Use this to migrate from `HttpClientModule` to `provideHttpClient`.

```markdown
@LogicRefactorer
Migrate HTTP setup from module-based to functional providers.

**Current Setup**: [app.module.ts / app.config.ts]

**Migration Steps**:

1. **Remove HttpClientModule**:
   ```typescript
   // ❌ Before (Module-based)
   import { HttpClientModule } from '@angular/common/http';
   
   @NgModule({
     imports: [
       BrowserModule,
       HttpClientModule
     ]
   })
   export class AppModule {}
   
   // ✅ After (Functional)
   import { provideHttpClient, withInterceptors } from '@angular/common/http';
   
   export const appConfig: ApplicationConfig = {
     providers: [
       provideHttpClient(
         withInterceptors([authInterceptor, loggingInterceptor])
       )
     ]
   };
   ```

2. **Convert Class-Based Interceptors to Functional**:
   ```typescript
   // ❌ Before (Class-based interceptor)
   import { Injectable } from '@angular/core';
   import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
   
   @Injectable()
   export class AuthInterceptor implements HttpInterceptor {
     constructor(private authService: AuthService) {}
     
     intercept(req: HttpRequest<any>, next: HttpHandler) {
       const token = this.authService.getToken();
       const authReq = req.clone({
         setHeaders: { Authorization: `Bearer ${token}` }
       });
       return next.handle(authReq);
     }
   }
   
   // ✅ After (Functional interceptor)
   import { HttpInterceptorFn } from '@angular/common/http';
   import { inject } from '@angular/core';
   
   export const authInterceptor: HttpInterceptorFn = (req, next) => {
     const authService = inject(AuthService);
     const token = authService.getToken();
     
     const authReq = req.clone({
       setHeaders: { Authorization: `Bearer ${token}` }
     });
     
     return next(authReq);
   };
   ```

3. **Update Provider Registration**:
   ```typescript
   // ❌ Before
   providers: [
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
   ]
   
   // ✅ After
   providers: [
     provideHttpClient(
       withInterceptors([authInterceptor, loggingInterceptor])
     )
   ]
   ```

**Common Interceptor Patterns**:

- **Auth Token**:
  ```typescript
  export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = inject(AuthService).getToken();
    if (token) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
    return next(req);
  };
  ```

- **Error Handling**:
  ```typescript
  export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        inject(NotificationService).showError(error.message);
        return throwError(() => error);
      })
    );
  };
  ```

- **Loading Indicator**:
  ```typescript
  export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    const loadingService = inject(LoadingService);
    loadingService.show();
    
    return next(req).pipe(
      finalize(() => loadingService.hide())
    );
  };
  ```

**Output**: List of interceptors converted and HTTP setup updated.
```

---

### Template 2: Service Modernization (inject() + Signals)
Use this to modernize services to use `inject()` and Angular Signals.

```markdown
@LogicRefactorer
Modernize the following service to use `inject()` function and Signals (if applicable).

**Service**: [SERVICE_NAME]

**Modernization Pattern**:

```typescript
// ❌ Before (Constructor injection + BehaviorSubject)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();
  
  constructor(private http: HttpClient) {}
  
  loadUser(id: number): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }
  
  setUser(user: User): void {
    this.userSubject.next(user);
  }
}

// ✅ After (inject() + Signals)
import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  
  // Use signal for reactive state
  private userSignal = signal<User | null>(null);
  public user = this.userSignal.asReadonly();
  
  // Computed signals for derived state
  public isLoggedIn = computed(() => this.user() !== null);
  public userName = computed(() => this.user()?.name ?? 'Guest');
  
  loadUser(id: number): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }
  
  setUser(user: User): void {
    this.userSignal.set(user);
  }
  
  updateUser(updates: Partial<User>): void {
    this.userSignal.update(current => 
      current ? { ...current, ...updates } : null
    );
  }
}
```

**When to Use Signals vs Observables**:

- **Use Signals for**:
  - Simple state management (current user, settings)
  - Derived/computed values
  - Template bindings (automatic change detection)

- **Use Observables for**:
  - HTTP requests
  - Event streams
  - Complex async operations
  - When you need operators like `debounceTime`, `switchMap`

**Migration Checklist**:
1. Replace constructor injection with `inject()`
2. Convert `BehaviorSubject` to `signal()` for state
3. Convert derived values to `computed()`
4. Keep HTTP calls as Observables
5. Ensure `providedIn: 'root'` is set
6. Remove `any` types from method signatures

**Output**: Modernized service with signals and inject().
```

---

### Template 3: Functional Guards Migration
Use this to convert class-based guards to functional guards.

```markdown
@LogicRefactorer
Convert the following class-based guards to functional guards.

**Guards**: [LIST OF GUARD FILES]

**Migration Pattern**:

```typescript
// ❌ Before (Class-based guard)
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }
}

// ✅ After (Functional guard)
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isLoggedIn()) {
    return true;
  }
  
  return router.createUrlTree(['/login']);
};
```

**Common Guard Patterns**:

1. **Role-Based Guard**:
   ```typescript
   export const adminGuard: CanActivateFn = (route) => {
     const authService = inject(AuthService);
     const router = inject(Router);
     
     const requiredRole = route.data['role'];
     if (authService.hasRole(requiredRole)) {
       return true;
     }
     
     return router.createUrlTree(['/unauthorized']);
   };
   ```

2. **Async Guard (with Observable)**:
   ```typescript
   export const permissionGuard: CanActivateFn = (route) => {
     const permissionService = inject(PermissionService);
     const router = inject(Router);
     
     return permissionService.checkPermission(route.data['permission']).pipe(
       map(hasPermission => hasPermission || router.createUrlTree(['/forbidden']))
     );
   };
   ```

3. **Can Deactivate (Unsaved Changes)**:
   ```typescript
   export const unsavedChangesGuard: CanDeactivateFn<ComponentWithForm> = (component) => {
     if (component.hasUnsavedChanges()) {
       return confirm('You have unsaved changes. Do you want to leave?');
     }
     return true;
   };
   ```

**Update Routes**:
```typescript
// ❌ Before
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [AuthGuard]
}

// ✅ After
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [authGuard]
}
```

**Output**: List of guards converted to functional style.
```

---

### Template 4: RxJS Best Practices Enforcement
Use this to enforce modern RxJS patterns in services.

```markdown
@LogicRefactorer
Refactor the following service to use modern RxJS best practices.

**Service**: [SERVICE_NAME]

**Best Practices**:

1. **Use `lastValueFrom` for One-Off Requests**:
   ```typescript
   // ❌ Before (subscribe)
   loadUser(id: number): void {
     this.http.get<User>(`/api/users/${id}`).subscribe(user => {
       this.user = user;
     });
   }
   
   // ✅ After (async/await with lastValueFrom)
   async loadUser(id: number): Promise<void> {
     const user = await lastValueFrom(this.http.get<User>(`/api/users/${id}`));
     this.userSignal.set(user);
   }
   ```

2. **Use `takeUntilDestroyed` for Subscriptions**:
   ```typescript
   // ❌ Before (manual unsubscribe)
   private subscription: Subscription;
   
   ngOnInit() {
     this.subscription = this.dataService.data$.subscribe(data => {
       this.data = data;
     });
   }
   
   ngOnDestroy() {
     this.subscription.unsubscribe();
   }
   
   // ✅ After (takeUntilDestroyed)
   private destroyRef = inject(DestroyRef);
   
   ngOnInit() {
     this.dataService.data$
       .pipe(takeUntilDestroyed(this.destroyRef))
       .subscribe(data => this.data = data);
   }
   ```

3. **Avoid Nested Subscriptions**:
   ```typescript
   // ❌ Before (nested subscriptions)
   loadUserAndPosts(userId: number): void {
     this.userService.getUser(userId).subscribe(user => {
       this.user = user;
       this.postService.getPosts(user.id).subscribe(posts => {
         this.posts = posts;
       });
     });
   }
   
   // ✅ After (switchMap)
   loadUserAndPosts(userId: number): void {
     this.userService.getUser(userId).pipe(
       switchMap(user => {
         this.user = user;
         return this.postService.getPosts(user.id);
       }),
       takeUntilDestroyed(this.destroyRef)
     ).subscribe(posts => this.posts = posts);
   }
   ```

4. **Use Proper Error Handling**:
   ```typescript
   // ❌ Before (no error handling)
   loadData(): void {
     this.http.get('/api/data').subscribe(data => this.data = data);
   }
   
   // ✅ After (with error handling)
   loadData(): void {
     this.http.get('/api/data').pipe(
       catchError(error => {
         this.errorService.handleError(error);
         return of([]); // Fallback value
       }),
       takeUntilDestroyed(this.destroyRef)
     ).subscribe(data => this.data = data);
   }
   ```

5. **Share HTTP Requests**:
   ```typescript
   // ❌ Before (multiple HTTP calls)
   users$ = this.http.get<User[]>('/api/users');
   
   // Component A subscribes
   // Component B subscribes
   // Result: 2 HTTP requests!
   
   // ✅ After (shared)
   users$ = this.http.get<User[]>('/api/users').pipe(
     shareReplay({ bufferSize: 1, refCount: true })
   );
   
   // Component A subscribes
   // Component B subscribes
   // Result: 1 HTTP request, shared result
   ```

**Output**: List of RxJS improvements made.
```

---

### Template 5: State Management Modernization
Use this to refactor NgRx or custom state management to use Signals.

```markdown
@LogicRefactorer
Modernize state management in [MODULE_NAME] to use Angular Signals or NgRx Signal Store.

**Current State**: [NgRx / Custom BehaviorSubjects]
**Target**: [Signals / NgRx Signal Store]

**Option 1: Simple State → Signals**:
```typescript
// ❌ Before (BehaviorSubject-based state)
@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  public items$ = this.itemsSubject.asObservable();
  
  addItem(item: CartItem): void {
    const current = this.itemsSubject.value;
    this.itemsSubject.next([...current, item]);
  }
  
  get totalPrice(): number {
    return this.itemsSubject.value.reduce((sum, item) => sum + item.price, 0);
  }
}

// ✅ After (Signal-based state)
@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSignal = signal<CartItem[]>([]);
  public items = this.itemsSignal.asReadonly();
  
  // Computed values are automatically cached
  public totalPrice = computed(() => 
    this.items().reduce((sum, item) => sum + item.price, 0)
  );
  
  public itemCount = computed(() => this.items().length);
  
  addItem(item: CartItem): void {
    this.itemsSignal.update(items => [...items, item]);
  }
  
  removeItem(id: string): void {
    this.itemsSignal.update(items => items.filter(item => item.id !== id));
  }
}
```

**Option 2: Complex State → NgRx Signal Store**:
```typescript
import { signalStore, withState, withMethods, withComputed } from '@ngrx/signals';
import { computed } from '@angular/core';

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState({
    items: [] as CartItem[],
    loading: false,
    error: null as string | null
  }),
  withComputed(({ items }) => ({
    totalPrice: computed(() => items().reduce((sum, item) => sum + item.price, 0)),
    itemCount: computed(() => items().length)
  })),
  withMethods((store) => ({
    addItem(item: CartItem) {
      patchState(store, { items: [...store.items(), item] });
    },
    removeItem(id: string) {
      patchState(store, { 
        items: store.items().filter(item => item.id !== id) 
      });
    }
  }))
);
```

**Migration Strategy**:
1. Identify state that can move to Signals (simple, synchronous)
2. Keep complex async flows in NgRx (if already using it)
3. Use NgRx Signal Store for new features
4. Gradually migrate old NgRx slices to Signal Store

**Output**: Modernized state management with Signals.
```


## 🚦 Supervision Level
- **Level 2 (High Autonomy)**: Logic patterns are usually strict.
- **Red Flags**:
    - Agent changing the *order* of interceptors.
    - Agent removing error handling logic.

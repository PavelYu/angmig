# Component Descriptions & Mimicry Guide

To ensure the `current_app` accurately reflects the production application for the workshop, this document details over 30 key components, services, and modules. This variety covers the complexity of AG Grid, Highcharts, and complex state management found in the real application.

## 1. Core Layout & Shell

1.  **`AppComponent`**
    *   **Role**: Root container. Initializes global services (Auth, Theme).
    *   **Structure**: Contains `<app-header>`, `<app-sidebar>`, and `<router-outlet>`.
2.  **`HeaderComponent`**
    *   **Role**: Top navigation bar.
    *   **Features**: User profile dropdown, global search input, notifications bell, theme toggler.
3.  **`SidebarComponent`**
    *   **Role**: Collapsible side navigation.
    *   **Logic**: Uses `MatSidenav`. Renders menu items recursively from a `NavigationConfig`.
4.  **`BreadcrumbComponent`**
    *   **Role**: Shows current route path.
    *   **Logic**: Listens to `Router` events and builds the path based on route data `breadcrumb` property.
5.  **`FooterComponent`**
    *   **Role**: Static footer with copyright and version info.
6.  **`PageNotFoundComponent`**
    *   **Role**: 404 fallback page with "Go Home" button.

## 2. Dashboard & Visualization (Highcharts & D3)

7.  **`DashboardContainerComponent`**
    *   **Role**: Main landing page. Grid layout of widgets.
    *   **Logic**: Drag-and-drop widget arrangement (using `cdkDragDrop`).
8.  **`KpiCardComponent`**
    *   **Role**: Displays a single metric (e.g., "Total Revenue") with a sparkline.
    *   **Inputs**: `title`, `value`, `trend` (up/down), `chartData`.
9.  **`RevenueChartComponent`**
    *   **Role**: Wrapper for Highcharts line chart.
    *   **Complexity**: Handles dynamic data updates and resizing.
10. **`RegionalMapComponent`**
    *   **Role**: Displays `@highcharts/map-collection`.
    *   **Logic**: Interactive map allowing drill-down into specific regions.
11. **`NetworkGraphComponent`**
    *   **Role**: Visualizes entity relationships using `@swimlane/ngx-graph`.
    *   **Complexity**: Custom node templates with SVG icons.
12. **`ActivityFeedComponent`**
    *   **Role**: Scrollable list of recent user actions.
    *   **Logic**: Uses `ngx-infinite-scroll` for pagination.

## 3. Advanced Data Grids (AG Grid Enterprise)

13. **`TransactionGridComponent`**
    *   **Role**: Main data table for financial transactions.
    *   **Features**: Server-side row model, column grouping, excel export.
14. **`StatusCellRendererComponent`**
    *   **Role**: Custom AG Grid cell renderer.
    *   **Logic**: Displays status chips (Success, Pending, Failed) with color coding.
15. **`ActionCellRendererComponent`**
    *   **Role**: Custom AG Grid cell renderer.
    *   **Logic**: Kebab menu button triggering a `MatMenu` for row actions (Edit, Delete).
16. **`DateFilterComponent`**
    *   **Role**: Custom AG Grid floating filter.
    *   **Logic**: Uses `MatDatepicker` to filter grid rows by date range.
17. **`GridToolbarComponent`**
    *   **Role**: External toolbar for AG Grid.
    *   **Features**: Global search, column visibility toggle, export to CSV/Excel buttons.

## 4. Feature Modules

### User Management
18. **`UserListComponent`**
    *   **Role**: Lists system users.
    *   **Logic**: Uses `TransactionGridComponent` (reused) or a simpler `MatTable`.
19. **`UserDetailComponent`**
    *   **Role**: View/Edit user profile.
    *   **Logic**: Reactive Form with validation.
20. **`RoleAssignmentDialogComponent`**
    *   **Role**: Modal to assign roles to a user.
    *   **Logic**: Dual list box or multi-select dropdown.

### Reporting
21. **`ReportBuilderComponent`**
    *   **Role**: Complex form to generate custom reports.
    *   **Logic**: Dynamic form fields based on selected report type.
22. **`ReportViewerComponent`**
    *   **Role**: Displays generated PDF or HTML report.

## 5. Shared UI Components (Atoms/Molecules)

23. **`LoadingSpinnerComponent`**
    *   **Role**: Global overlay spinner for HTTP requests.
    *   **Logic**: Subscribes to `LoadingService`.
24. **`ConfirmDialogComponent`**
    *   **Role**: Generic confirmation modal (Title, Message, Confirm/Cancel).
25. **`ToastNotificationComponent`**
    *   **Role**: Snackbar for success/error messages.
    *   **Logic**: Uses `MatSnackBar`.
26. **`IconComponent`**
    *   **Role**: Wrapper for SVG icons.
    *   **Logic**: Loads icons from the generated sprite sheet (`generate:svg-sprite`).

## 6. Services & Core Logic

27. **`AuthService`**
    *   **Role**: Handles Login, Logout, Token Refresh (JWT).
    *   **Logic**: Interceptor for adding Bearer token.
28. **`ApiHttpService`**
    *   **Role**: Generic wrapper around `HttpClient`.
    *   **Logic**: Standardizes error handling and response formatting.
29. **`ThemeService`**
    *   **Role**: Manages Light/Dark mode.
    *   **Logic**: Toggles CSS classes on `body` tag.
30. **`NotificationService`**
    *   **Role**: Polling or WebSocket service for real-time alerts.
31. **`GridStateService`**
    *   **Role**: Persists AG Grid column state (width, order, visibility) to `localStorage`.
32. **`I18nService`**
    *   **Role**: Wrapper around `TranslateService`.
    *   **Logic**: Loads language files and handles fallback to English.

## 7. Directives & Pipes

33. **`HasPermissionDirective`**
    *   **Role**: Structural directive (`*appHasPermission="'ADMIN'"`).
    *   **Logic**: Removes element from DOM if user lacks role.
34. **`FormatCurrencyPipe`**
    *   **Role**: Custom currency formatter handling multiple locales.
35. **`SafeHtmlPipe`**
    *   **Role**: Bypasses Angular security for trusted HTML content (used in Reports).

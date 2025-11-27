# 🔄 Workflow: The Daily Agent Cycle

## Overview
To maximize efficiency, we run AI agents in a structured daily cycle that aligns with the team's standups and work blocks.

## 📅 The Schedule

### 08:00 - 09:00: The "Night Shift" Review
*   **Who**: Tech Lead & AQA Team
*   **Activity**: Review the results of overnight automated jobs (CI/CD, Test Runs).
*   **Agent Tasks**:
    *   **AQA 1** → `@UnitTestMigrator`: "Analyze the overnight Vitest test failures and group them by error type."
    *   **AQA 2** → `@E2ETestMigrator`: "Analyze the overnight Playwright test failures and visual regression results."

### 09:15 - 12:00: The "Batch Processing" Block
*   **Who**: All Devs + AQA Team (Parallel Work)
*   **Activity**: Assign large batch tasks to agents while doing deep work.

**Dev Team Agent Tasks**:
    *   **Tech Lead** → `@ArchitectureReviewer`: "Check for circular deps in `src/app`."
    *   **Dev A1** → `@BuildFixer`: "Fix these 50 TypeScript errors."
    *   **Dev A2** → `@CodeModernizer`: "Convert this module's templates to control flow."
    *   **Dev A3** → `@StyleMigrator`: "Migrate `user-profile` component to MDC styles."
    *   **Dev B1** → `@LogicRefactorer`: "Convert `AuthService` to use `inject()`."
    *   **Dev B2** → `@DependencyAuditor`: "Check compatibility for `ngx-charts`."
    *   **Dev B3** → `@InfraPerfOptimizer`: "Optimize bundle budgets to 2mb."

**AQA Team Agent Tasks** (Independent of Dev Work):
    *   **AQA 1** → `@UnitTestMigrator`: "Migrate 20 Karma tests from `src/app/auth` to Vitest."
    *   **AQA 2** → `@E2ETestMigrator`: "Migrate Protractor login tests to Playwright."
    *   **AQA 2** → `@E2ETestMigrator`: "Create visual regression tests for dashboard components."

### 13:00 - 16:00: The "Integration" Block
*   **Who**: All Devs
*   **Activity**: Review agent work, merge to feature branches, and handle complex logic manually.
*   **Agent Tasks**:
    *   `@CodeReviewer`: "Review my changes in `src/app/auth` before I open a PR."
    *   `@BuildFixer`: "Fix any new errors introduced by the merges."
    *   `@DependencyAuditor`: "Check if the new library version conflicts with anything."

### 16:00 - 17:00: The "Cleanup" Block
*   **Who**: AQA Team & Tech Lead
*   **Activity**: Prepare for the overnight run.
*   **Agent Tasks**:
    *   **AQA 1** → `@UnitTestMigrator`: "Run full Vitest suite and flag flaky tests."
    *   **AQA 2** → `@E2ETestMigrator`: "Run full Playwright suite and visual regression tests."

## 🧠 Context7 Sync
**Critical Step**: At the end of each block, if you corrected an agent, you **MUST** update Context7.

*   *Command*: "Context7, store this pattern: When fixing `MatDialog` tests, always provide `MatDialogRef` in the providers array."

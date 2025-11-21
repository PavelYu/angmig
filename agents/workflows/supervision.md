# 👁️ Workflow: Supervising Your Agents

## Overview
AI Agents are powerful but fallible. They are like junior developers: they need clear instructions and code review. This guide defines the **Supervision Levels** and how to apply them.

## 🚦 Supervision Levels

### Level 1: Low Risk (The "Glance")
**When to use**:
- Simple syntax updates (e.g., `*ngIf` → `@if`).
- Formatting changes.
- Non-critical test updates.

**Review Process**:
1.  Scan the `git diff`.
2.  Check for red squiggles in the editor.
3.  Commit.

### Level 2: Medium Risk (The "Review")
**When to use**:
- TypeScript error fixes.
- RxJS operator changes.
- Component refactoring.

**Review Process**:
1.  Read the code changes line-by-line.
2.  Verify logic hasn't changed (e.g., did `switchMap` become `mergeMap`?).
3.  Run `npm run build` locally.

### Level 3: High Risk (The "Audit")
**When to use**:
- Dependency upgrades.
- Complex logic changes.
- Security-sensitive code.

**Review Process**:
1.  Detailed code review.
2.  Run unit tests for the specific module.
3.  Manually test the feature in the browser.

## 🚩 Red Flags (When to Stop)

If you see any of these, **STOP the agent** and revert:

1.  **Hallucinated APIs**: Agent using a function that doesn't exist in that version.
2.  **Logic Drift**: Agent changing *what* the code does, not just *how*.
3.  **Type Cheating**: Excessive use of `any`, `// @ts-ignore`, or `!` assertions.
4.  **Looping**: Agent fixing the same error over and over.

## 🔧 Corrective Action

When an agent fails:
1.  **Revert**: `git checkout .` (or specific file).
2.  **Refine Prompt**: Be more specific. Add constraints.
3.  **Teach Context7**: "Context7, note that we cannot use `inject()` in this class because it's not an injection context."

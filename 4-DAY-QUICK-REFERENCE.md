# ⚡ 4-Day Migration Quick Reference Card

## 🎯 **Mission: v15 → v20 in 4 Days**

### Team Structure (4-5 People)
- **Tech Lead**: Runs `ng update` commands, resolves conflicts
- **Dev A (Stream A)**: Build fixes (AI-assisted)
- **Dev B (Stream B)**: Dependency upgrades
- **Dev C (Stream C)**: Test fixes (AI-assisted)
- **Dev D (Stream D)**: Infrastructure (Node, Docker, CI/CD)

---

## 🚀 **SETUP: Zed Editor + MCP (Do This First!)**

> [!IMPORTANT]
> **Setup Zed + MCP before Day 1** for 5x faster migration with AI assistance.
> **Full guide**: [ZED_MCP_SETUP.md](ZED_MCP_SETUP.md)

### Quick Setup (30 minutes)

1. **Install Zed Editor**:
   ```bash
   brew install --cask zed
   ```

2. **Configure MCP Servers** in `~/.config/zed/settings.json`:
   ```json
   {
     "mcp": {
       "servers": {
         "angular": {
           "command": "npx",
           "args": ["@angular/mcp-server"]
         },
         "playwright": {
           "command": "node",
           "args": ["/path/to/playwright-mcp/dist/index.js"],
           "env": {
             "PLAYWRIGHT_PROJECT_PATH": "{your path}"
           }
         },
         "context7": {
           "command": "npx",
           "args": ["context7-mcp"],
           "env": {
             "UPSTASH_REDIS_URL": "your-url",
             "UPSTASH_REDIS_TOKEN": "your-token"
           }
         }
       }
     }
   }
   ```

3. **Restart Zed** and verify MCP servers are running

### What You Get
- **Angular MCP**: Instant access to Angular docs, migration guides, breaking changes
- **Playwright MCP**: Run and debug tests from AI
- **Context7 MCP**: Remember fixes across sessions, share with team

**Without MCP**: 40 hours of manual work
**With MCP**: 7-8 hours with AI assistance
**Speedup**: 5x faster

---

## 📅 **Day-by-Day Checklist**

### **DAY 1: v15 → v16** ✅
**Goal**: Foundation + Parallel Prep

#### Tech Lead (Sequential)
```bash
./scripts/backup_before_migration.sh v15-baseline
ng update @angular/core@16 @angular/cli@16 @angular/material@16 --force
```

#### Stream A - Build Fixes (After upgrade)
- [ ] Fix TypeScript errors (use AI for batches)
- [ ] Fix Material imports
- [ ] Get `ng build` to pass

#### Stream B - Dependency Audit (PARALLEL - starts immediately)
- [ ] Run `./scripts/verify_dependencies.sh 20`
- [ ] Find all `ngx-perfect-scrollbar` usage
- [ ] Create replacement plan

#### Stream C - Test Baseline (PARALLEL - starts immediately)
- [ ] Run `npm test -- --coverage`
- [ ] Run `npx playwright test --update-snapshots`
- [ ] Document current coverage %

#### Stream D - Infrastructure (PARALLEL - starts immediately)
- [ ] Install Node 18: `nvm install 18 && nvm use 18`
- [ ] Update Dockerfile to Node 18
- [ ] Test local build

#### End of Day 1 Gate ✅
- [ ] `ng build` passes on v16
- [ ] Node 18 configured
- [ ] Red Zone deps identified
- [ ] Test baseline captured

---

### **DAY 2: v16 → v17** ✅
**Goal**: Modernization + Critical Replacements

#### Tech Lead (Morning)
```bash
ng update @angular/core@17 @angular/cli@17 @angular/material@17 --force
```

#### Stream A - Build Fixes
- [ ] Fix v17 breaking changes (AI-assisted)
- [ ] Replace `toPromise()` with `lastValueFrom()`
- [ ] Get build passing

#### Stream B - Critical Replacements
- [ ] Replace `ngx-perfect-scrollbar` with native CSS or `ngx-scrollbar`
- [ ] Test in browser
- [ ] Commit if working

#### Stream C - Test Fixes
- [ ] Fix tests broken by v17 (AI-assisted)
- [ ] Focus on critical path only
- [ ] Aim for >70% passing

#### Stream D - CI/CD
- [ ] Update Azure Pipelines to Node 18
- [ ] Test pipeline locally
- [ ] Document changes

#### End of Day 2 Gate ✅
- [ ] `ng build` passes on v17
- [ ] `ngx-perfect-scrollbar` replaced
- [ ] >70% tests passing
- [ ] CI/CD updated

---

### **DAY 3: v17 → v19** ✅
**Goal**: Acceleration (Double Upgrade)

#### Tech Lead (Morning)
```bash
ng update @angular/core@18 @angular/cli@18 @angular/material@18 --force
# If successful, immediately:
ng update @angular/core@19 @angular/cli@19 @angular/material@19 --force
```

#### Stream A - Build Fixes
- [ ] Fix v18/v19 breaking changes (AI-assisted)
- [ ] Update to `provideHttpClient`
- [ ] Add `standalone: false` to all components (quick fix)

#### Stream B - AG Grid Upgrade
- [ ] `npm install @ag-grid-community/core@31 @ag-grid-community/angular@31`
- [ ] Update imports: `ColDef<T>` → `ColDef`
- [ ] Update CSS: `ag-theme-alpine` → `ag-theme-quartz`
- [ ] Test all grids

#### Stream C - Test Marathon
- [ ] Fix broken tests (AI batches of 20-30)
- [ ] Aim for >80% passing
- [ ] Document remaining failures

#### Stream D - Node 20 Prep
- [ ] Install Node 20: `nvm install 20 && nvm use 20`
- [ ] Test build with Node 20
- [ ] Update all configs

#### End of Day 3 Gate ✅
- [ ] `ng build` passes on v19 with Node 20
- [ ] AG Grid rendering correctly
- [ ] >80% tests passing
- [ ] All configs updated

---

### **DAY 4: v19 → v20** ✅
**Goal**: Final Push + Deployment

#### Tech Lead (Morning)
```bash
ng update @angular/core@20 @angular/cli@20 @angular/material@20 --force
```

#### Stream A - Final Build Fixes
- [ ] Fix v20 breaking changes
- [ ] Fix template errors: `{{ in }}` → `{{ this.in }}`
- [ ] Production build must pass

#### Stream B - Dependency Verification
- [ ] Run `./scripts/verify_dependencies.sh 20`
- [ ] Run `./scripts/migration_toolbox.sh check_all`
- [ ] Fix any remaining issues

#### Stream C - Test Completion
- [ ] Fix remaining test failures
- [ ] Run full test suite: `npm test`
- [ ] Run Playwright: `npx playwright test`

#### Stream D - Deployment
- [ ] Build production: `npm run build -- --configuration production`
- [ ] Deploy to staging
- [ ] Run smoke tests

#### End of Day 4 Gate ✅ (MUST PASS)
- [ ] `ng build --configuration production` passes
- [ ] All critical tests passing (>90%)
- [ ] Playwright tests passing
- [ ] Deployed to staging successfully
- [ ] Smoke tests pass

---

## 🚀 **AI Prompt Templates (Zed + MCP Enhanced)**

### Build Fixes (Stream A) - Using Angular MCP
```
Using Angular MCP, fix these TypeScript/Angular build errors after upgrading to v[X]:

Errors:
[paste 10-20 errors from build output]

Requirements:
- Use Angular v[X] best practices from MCP documentation
- Fix all errors
- Preserve existing functionality
- Use proper types (avoid 'any')

Store successful fix patterns in Context7 for similar errors.
```

**Example**:
```
Using Angular MCP, fix these v17 build errors:

Error: NG2003: No suitable injection token for parameter 'http'
Error: NG0303: Can't bind to 'ngIf' since it isn't a known property

Store the fix pattern in Context7.
```

### Test Fixes (Stream C) - Using Playwright MCP
```
Using Playwright MCP, run all tests and identify failures after v[X] upgrade.

Then fix these failing tests:
[paste test output or "all failures"]

Requirements:
- Update to Angular v[X] testing patterns
- Use Playwright MCP best practices
- Preserve test logic
- Update to new Angular APIs if needed

Store test fix patterns in Context7.
```

**Example**:
```
Using Playwright MCP, run all tests and show failures grouped by type.

Then fix tests that fail due to waitForAngular() deprecation in v17.
Use proper locators instead.
```

### Component Quick Fix (Stream A - Day 3) - Using Angular MCP
```
Using Angular MCP, add 'standalone: false' to all @Component decorators in these files:

[paste list of component files or "all components in src/app"]

This is a quick fix for v19 migration. We'll properly migrate to standalone later.

Use Context7 to track which components still need standalone migration.
```

### Dependency Replacement (Stream B) - Using Angular MCP
```
Using Angular MCP, what's the recommended replacement for [dependency] in Angular v[X]?

Show me:
1. Why it's deprecated/incompatible
2. Recommended replacement
3. Migration code examples
4. Breaking changes to watch for

Current usage: [paste code snippet]
```

**Example**:
```
Using Angular MCP, what's the recommended replacement for ngx-perfect-scrollbar in Angular v17?

Show migration examples for:
- Component usage
- CSS styling
- Configuration options
```

### Batch Component Conversion (Stream B) - Using Angular MCP + Context7
```
Using Angular MCP and Context7:

1. Convert this component to standalone (Angular v17+ pattern)
2. Store the conversion pattern in Context7
3. Show me how to apply this pattern to all 50 components in src/app/features/

Component:
[paste component code]
```

### Progress Check (All Streams) - Using Context7
```
Ask Context7:
- What did we accomplish yesterday?
- What's our current migration status?
- What are today's priorities?
- Any blockers or patterns to remember?
```

### Intelligent Error Batch Fix (Stream A) - Using All MCP Servers
```
Using Angular MCP, Context7, and our project patterns:

1. Check Context7 if we've seen similar errors before
2. Use Angular MCP for v[X] best practices
3. Fix these errors:
   [paste 20-30 errors]
4. Store the fix patterns in Context7 for future use

Group fixes by pattern type.
```

---

## 📊 **Progress Tracking Scripts**

Run these at end of each day:

```bash
# Overall status
./scripts/migration_status.sh

# Check for issues
./scripts/migration_toolbox.sh check_all

# Verify build
./scripts/verify_build.sh production

# Check bundle size
./scripts/analyze_bundle.sh
```

---

## ⚠️ **What NOT to Do (Defer These)**

- ❌ **Don't** migrate to standalone components (add `standalone: false` instead)
- ❌ **Don't** enable TypeScript strict mode (keep it loose)
- ❌ **Don't** migrate to new control flow (`@if`, `@for`)
- ❌ **Don't** migrate to Vitest (keep Karma)
- ❌ **Don't** try to fix all tests (70-80% is acceptable)
- ❌ **Don't** optimize bundle size (do this after v20)

**Why?** You have 4 days. Focus on "does it build and run?" not "is it perfect?"

---

## 🎯 **Success Criteria**

### Minimum Viable Migration (Day 4 EOD)
- ✅ Angular 20 running
- ✅ `ng build --configuration production` passes
- ✅ Critical user flows work (test manually)
- ✅ No console errors in browser
- ✅ Deployed to staging

### Deferred to Week 2+ (After v20 is stable)
- 🔄 Standalone component migration
- 🔄 TypeScript strict mode
- 🔄 Control flow migration
- 🔄 Vitest migration
- 🔄 Full test coverage
- 🔄 Bundle optimization

---

## 🆘 **Emergency Procedures**

### If Build Fails After Upgrade
```bash
# 1. Clear caches
rm -rf node_modules .angular dist
npm install

# 2. Try build again
npm run build

# 3. If still failing, use AI to fix errors in batches
npm run build 2>&1 | tee errors.txt
# Copy errors to AI, get fixes, apply, repeat
```

### If Tests Are Completely Broken
```bash
# Acceptable to skip non-critical tests in 4-day migration
# Focus on:
# 1. Critical path tests (login, main flows)
# 2. Playwright visual regression
# 3. Manual smoke testing

# Defer full test suite to Week 2
```

### If Stuck on Dependency Issue
```bash
# Use --force or --legacy-peer-deps
npm install --legacy-peer-deps

# Document the issue for later resolution
echo "Dependency issue: [describe]" >> KNOWN_ISSUES.md
```

---

## 📞 **Daily Standup Template**

**Time**: 15 minutes each morning

**Format**:
1. **Tech Lead** (2 min): Yesterday's upgrade status, today's plan, blockers
2. **Stream A** (2 min): Build fixes progress, blockers
3. **Stream B** (2 min): Dependency work progress, blockers
4. **Stream C** (2 min): Test fixes progress, blockers
5. **Stream D** (2 min): Infrastructure progress, blockers
6. **Review** (5 min): Overnight CI results, adjust plan if needed

---

## 🎉 **Day 4 Evening: Success!**

If all gates pass:
1. ✅ Merge all streams to main
2. ✅ Tag release: `v20.0.0-migration-complete`
3. ✅ Deploy to production (or schedule for next day)
4. ✅ Celebrate! 🎊
5. 📝 Document lessons learned
6. 📅 Plan Week 2: Modernization (standalone, strict mode, etc.)

---

## 💡 **Key Success Factors**

1. **Use AI heavily** - Don't manually fix 1000 errors
2. **Work in parallel** - All 4 streams simultaneously
3. **Accept technical debt** - Perfect is the enemy of done
4. **Focus on critical path** - Not all tests need to pass
5. **Daily integration** - Merge streams every evening
6. **Clear communication** - 15-min standup every morning

**You can do this in 4 days!** 💪

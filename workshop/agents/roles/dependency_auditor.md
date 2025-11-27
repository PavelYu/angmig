# 📦 Agent Role: Dependency Auditor

> **Note**: This is a **prompt template** file, not an actual ACP agent. Copy prompts from this file into **Zed's Agent Panel** (Press `Cmd+?` or Command Palette → `agent: open`) to use with Zed's built-in AI and MCP servers.

## 📋 Role Description
The **Dependency Auditor** agent is responsible for ensuring all 3rd-party packages are compatible with the target Angular version. It identifies conflicts, suggests upgrades, and validates peer dependencies.

**Primary "Manager"**: Dev B2 (Beta Team)

## 🎯 Responsibilities
- Check `package.json` against Angular version compatibility matrix.
- Identify deprecated packages (e.g., `ngx-perfect-scrollbar`).
- Suggest replacement packages or upgrade paths.
- Resolve peer dependency warnings.

## 🧠 Knowledge Sources
- **Angular MCP**: For official compatibility lists.
- **NPM Registry**: For checking latest versions and peer deps.
- **Context7**: For "allow-list" of legacy packages we've decided to keep.

## 💬 Prompt Templates

### Template 0: Pre-Audit Verification (CRITICAL - Run First!)
Use this BEFORE dependency audit to verify environment.

```markdown
@DependencyAuditor
Before auditing dependencies, verify the environment and current state.

**Pre-Audit Checklist**:
1. **Verify Actual Angular Version** (CRITICAL):
   ```bash
   npm list @angular/core --depth=0
   ```
   - ⚠️ Don't assume version from plan - verify actual version!
   - May be v14.3.0, not v15.2.10 as plan assumes

2. **Verify Node.js Version**:
   ```bash
   node --version
   ```
   - Angular 14-15: Requires Node.js 18.x
   - Angular 16+: Requires Node.js 18.x or 20.x
   - Version mismatch causes compatibility issues

3. **Verify Git State**:
   ```bash
   git status
   ```
   - Clean state preferred for upgrades
   - Document current state

4. **Verify Build Status**:
   ```bash
   npm run build
   ```
   - Current build must pass before audit
   - Document any existing errors

**Output**: Environment verification report
```

---

### Template 1: Pre-Upgrade Compatibility Audit
Use this before upgrading to a new Angular major version.

```markdown
@DependencyAuditor
Perform a comprehensive dependency audit for upgrading to Angular [TARGET_VERSION].

**Current State** (VERIFY FIRST):
- Angular version: [CURRENT_VERSION] ⚠️ VERIFY ACTUAL VERSION!
- Node version: [NODE_VERSION]
- Package manager: [npm/yarn/pnpm]

**Audit Tasks**:

1. **Angular Core Dependencies**:
   ```bash
   # Check all @angular/* packages
   npm ls @angular/core @angular/common @angular/router @angular/forms
   ```
   - Verify all @angular packages are on the same version
   - Identify any mismatched versions

2. **Critical 3rd-Party Packages**:
   Analyze compatibility for:
   - **ag-grid**: Check if current version supports Angular [TARGET_VERSION]
   - **highcharts**: Verify angular-highcharts wrapper compatibility
   - **ngx-*****: Check all ngx- packages for compatibility
   - **@ngrx/store**: Verify version compatibility
   - **rxjs**: Check required version for Angular [TARGET_VERSION]

3. **Deprecated Packages** (Must Replace):
   - `ngx-perfect-scrollbar` → Replace with native CSS or `ngx-scrollbar`
   - `@angular/http` → Should be `@angular/common/http`
   - View Engine libraries → Must be Ivy-compatible
   - Any packages with deprecation warnings
   
   **Pattern**: Deprecated packages cause build warnings and may break in future versions

4. **Peer Dependency Analysis**:
   ```bash
   npm ls --depth=0 2>&1 | grep "UNMET PEER DEPENDENCY"
   ```
   - List all peer dependency warnings
   - Categorize as: CRITICAL / WARNING / SAFE TO IGNORE

**Output Format**:

| Package | Current | Required | Status | Action | Risk |
|---------|---------|----------|--------|--------|------|
| @angular/core | 15.2.10 | 16.2.0 | ⚠️ Upgrade | `npm install @angular/core@16` | LOW |
| ag-grid-angular | 28.2.0 | 31.0.0 | 🔴 Major | See breaking changes | HIGH |
| ngx-perfect-scrollbar | 10.1.1 | N/A | ❌ Deprecated | Replace with ngx-scrollbar | MEDIUM |

**Deliverables**:
1. Compatibility matrix table
2. List of packages that MUST be upgraded
3. List of packages that CAN be upgraded (optional)
4. List of packages to REPLACE
5. Estimated risk level for the upgrade
```

---

### Template 2: Package Upgrade Plan
Use this to create a detailed upgrade plan for a specific package.

```markdown
@DependencyAuditor
Create a detailed upgrade plan for [PACKAGE_NAME] from v[CURRENT] to v[TARGET].

**Package**: [PACKAGE_NAME]
**Current Version**: [CURRENT_VERSION]
**Target Version**: [TARGET_VERSION]

**Analysis Steps**:

1. **Version Compatibility**:
   - Check package's peer dependencies for Angular [VERSION]
   - Verify Node.js version requirements
   - Check TypeScript version requirements

2. **Breaking Changes Analysis**:
   ```bash
   # Check changelog
   npm view [PACKAGE_NAME]@[TARGET_VERSION] --json | jq .homepage
   ```
   - Review CHANGELOG.md or release notes
   - List all breaking changes between current and target
   - Identify deprecated APIs being removed

3. **Migration Guide**:
   - Link to official migration guide (if available)
   - List required code changes
   - List required configuration changes

4. **Testing Strategy**:
   - Identify areas of code that use this package
   - List test files that need updates
   - Suggest smoke tests to run after upgrade

**Example Output** (for ag-grid 28 → 31):

```markdown
## ag-Grid Upgrade: v28.2.0 → v31.0.0

### Breaking Changes:
1. **Grid API Changes**:
   - `gridApi.setRowData()` → `gridApi.setGridOption('rowData', data)`
   - `gridOptions.onGridReady` → Use `gridApi` from `(gridReady)` event

2. **Module Imports**:
   - `AgGridModule.withComponents([])` → No longer needed
   - All components are now standalone-compatible

3. **CSS Changes**:
   - Theme names changed: `ag-theme-alpine` → `ag-theme-quartz`
   - CSS variables restructured

### Migration Steps:
1. Update package:
   ```bash
   npm install ag-grid-angular@31 ag-grid-community@31
   ```

2. Update imports:
   ```typescript
   // Before
   import { AgGridModule } from 'ag-grid-angular';
   
   // After
   import { AgGridAngular } from 'ag-grid-angular';
   ```

3. Update grid API calls:
   ```typescript
   // Before
   this.gridApi.setRowData(newData);
   
   // After
   this.gridApi.setGridOption('rowData', newData);
   ```

4. Update CSS:
   ```scss
   // Before
   @import '~ag-grid-community/styles/ag-theme-alpine.css';
   
   // After
   @import 'ag-grid-community/styles/ag-theme-quartz.css';
   ```

### Testing:
- [ ] Test all grids load correctly
- [ ] Test row data updates
- [ ] Test column definitions
- [ ] Test custom cell renderers
- [ ] Visual regression test for grid styling

### Risk Level: HIGH
### Estimated Time: 4-6 hours
```
```

---

### Template 3: Deprecated Package Replacement
Use this to find and suggest replacements for deprecated packages.

```markdown
@DependencyAuditor
Find a replacement for the deprecated package [PACKAGE_NAME].

**Deprecated Package**: [PACKAGE_NAME]
**Current Version**: [VERSION]
**Reason for Deprecation**: [e.g., "No longer maintained", "Security vulnerabilities"]

**Replacement Research**:

1. **Find Alternatives**:
   - Search npm for: "[PACKAGE_FUNCTIONALITY] angular"
   - Check Angular community recommendations
   - Review GitHub stars, last update date, and maintenance status

2. **Comparison Matrix**:

   | Criteria | [DEPRECATED_PKG] | Alternative 1 | Alternative 2 |
   |----------|------------------|---------------|---------------|
   | Stars | 2.5k | 5k | 3k |
   | Last Update | 2 years ago | 1 week ago | 1 month ago |
   | Bundle Size | 150KB | 80KB | 120KB |
   | Angular Support | v14 max | v20 | v18 |
   | TypeScript | ✅ | ✅ | ⚠️ Partial |
   | License | MIT | MIT | Apache 2.0 |

3. **Migration Effort**:
   - API similarity: [High/Medium/Low]
   - Code changes required: [Minimal/Moderate/Extensive]
   - Estimated migration time: [X hours/days]

**Example** (ngx-perfect-scrollbar replacement):

```markdown
## Replacement for ngx-perfect-scrollbar

### Recommended Alternative: **ngx-scrollbar**
- **npm**: `ngx-scrollbar`
- **GitHub**: https://github.com/MurhafSousli/ngx-scrollbar
- **Stars**: 600+
- **Last Update**: Active (weekly updates)
- **Angular Support**: v16+
- **Bundle Size**: ~50KB (vs 150KB for perfect-scrollbar)

### Migration Steps:

1. **Uninstall old package**:
   ```bash
   npm uninstall ngx-perfect-scrollbar perfect-scrollbar
   ```

2. **Install replacement**:
   ```bash
   npm install ngx-scrollbar
   ```

3. **Update imports**:
   ```typescript
   // Before
   import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
   
   // After
   import { NgScrollbarModule } from 'ngx-scrollbar';
   ```

4. **Update templates**:
   ```html
   <!-- Before -->
   <perfect-scrollbar>
     <div>Content</div>
   </perfect-scrollbar>
   
   <!-- After -->
   <ng-scrollbar>
     <div>Content</div>
   </ng-scrollbar>
   ```

5. **Update styles** (if custom styling):
   ```scss
   // Before
   .ps__thumb-y { background: blue; }
   
   // After
   .ng-scrollbar-thumb { background: blue; }
   ```

### Alternative: **Native CSS Scrollbar**
For simple cases, consider using native CSS:
```css
.scrollable-container {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}

/* Webkit browsers */
.scrollable-container::-webkit-scrollbar {
  width: 8px;
}
.scrollable-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}
```

### Recommendation: 
Use **ngx-scrollbar** for feature parity, or **native CSS** for simple scrolling needs.

### Risk Level: MEDIUM
### Estimated Time: 2-3 hours
```
```

---

### Template 4: Peer Dependency Resolution
Use this to resolve peer dependency warnings and conflicts.

```markdown
@DependencyAuditor
Resolve the following peer dependency warnings.

**Warnings**:
```
[PASTE npm install OUTPUT WITH PEER DEPENDENCY WARNINGS]
```

**Resolution Strategy**:

1. **Categorize Warnings**:
   - **CRITICAL**: Incompatible versions that will cause runtime errors
   - **WARNING**: Version mismatch but likely compatible
   - **INFO**: Optional peer dependencies

2. **Analysis**:
   For each warning, determine:
   ```markdown
   **Package**: [package-name]
   **Required**: [version-range]
   **Installed**: [actual-version]
   **Severity**: [CRITICAL/WARNING/INFO]
   **Action**: [Upgrade/Downgrade/Ignore]
   **Reason**: [Explanation]
   ```

3. **Resolution Commands**:
   ```bash
   # Example resolutions
   npm install [package]@[compatible-version]
   npm install --legacy-peer-deps  # Last resort
   ```

**Example**:

```markdown
## Peer Dependency Analysis

### Warning 1: @angular/cdk
```
npm WARN @angular/material@15.2.0 requires a peer of @angular/cdk@15.2.0 but version 16.0.0 is installed
```

**Analysis**:
- **Package**: @angular/cdk
- **Required**: 15.2.0
- **Installed**: 16.0.0
- **Severity**: CRITICAL
- **Action**: Downgrade @angular/cdk to 15.2.0
- **Reason**: Material and CDK must be on the same version

**Resolution**:
```bash
npm install @angular/cdk@15.2.0
```

---

### Warning 2: rxjs
```
npm WARN @ngrx/store@15.4.0 requires a peer of rxjs@^7.5.0 but version 7.8.0 is installed
```

**Analysis**:
- **Package**: rxjs
- **Required**: ^7.5.0 (7.5.0 or higher)
- **Installed**: 7.8.0
- **Severity**: INFO
- **Action**: Ignore (7.8.0 satisfies ^7.5.0)
- **Reason**: Caret range allows minor/patch updates

**Resolution**: No action needed ✅

---

### Warning 3: typescript
```
npm WARN @angular/compiler-cli@16.2.0 requires a peer of typescript@>=4.9.3 <5.2.0 but version 5.3.0 is installed
```

**Analysis**:
- **Package**: typescript
- **Required**: >=4.9.3 <5.2.0
- **Installed**: 5.3.0
- **Severity**: WARNING
- **Action**: Downgrade to 5.1.6
- **Reason**: Angular 16 doesn't officially support TS 5.3

**Resolution**:
```bash
npm install typescript@5.1.6
```
```

**Output**: Categorized list of warnings with resolution commands.
```

---

### Template 5: Security Audit & License Compliance
Use this to check for security vulnerabilities and license issues.

```markdown
@DependencyAuditor
Perform a security and license audit on all dependencies.

**Security Audit**:

1. **Run npm audit**:
   ```bash
   npm audit --json > audit-report.json
   npm audit --audit-level=moderate
   ```

2. **Categorize Vulnerabilities**:
   - **CRITICAL**: Immediate action required
   - **HIGH**: Fix in current sprint
   - **MODERATE**: Fix in next sprint
   - **LOW**: Monitor for updates

3. **For each vulnerability**:
   ```markdown
   **Package**: [package-name]
   **Severity**: [CRITICAL/HIGH/MODERATE/LOW]
   **Vulnerability**: [CVE-XXXX-XXXXX]
   **Description**: [Brief description]
   **Fix Available**: [Yes/No]
   **Action**: [Update to vX.X.X / Replace / Accept risk]
   ```

**License Compliance**:

1. **Generate license report**:
   ```bash
   npx license-checker --summary
   npx license-checker --json > licenses.json
   ```

2. **Check for problematic licenses**:
   - ❌ **GPL**: Requires source code disclosure
   - ⚠️ **LGPL**: Requires dynamic linking
   - ⚠️ **AGPL**: Requires network source disclosure
   - ✅ **MIT/Apache/BSD**: Permissive, safe to use

3. **Flag packages with incompatible licenses**:
   ```markdown
   **Package**: [package-name]
   **License**: [GPL-3.0]
   **Risk**: HIGH
   **Action**: Find alternative or get legal approval
   ```

**Output Format**:

```markdown
## Security Audit Report

### Critical Vulnerabilities (2)
1. **lodash@4.17.20** - Prototype Pollution (CVE-2021-23337)
   - Fix: Update to 4.17.21
   - Command: `npm install lodash@4.17.21`

2. **axios@0.21.1** - SSRF (CVE-2021-3749)
   - Fix: Update to 0.21.4
   - Command: `npm install axios@0.21.4`

### High Vulnerabilities (0)
None ✅

### License Issues (1)
1. **some-gpl-package@1.0.0** - GPL-3.0 License
   - Risk: Requires source code disclosure
   - Action: Replace with MIT-licensed alternative

## Summary
- Total packages: 450
- Vulnerabilities: 2 critical, 0 high, 5 moderate
- License issues: 1 GPL package
- Recommended actions: Update 2 packages, replace 1 package
```
```


## 🎓 **Pattern-Based Dependency Analysis**

### Critical Patterns Discovered

**Pattern 1: Version Synchronization**
- Angular Core and Material versions MUST match
- After each upgrade, verify Material version matches Core
- Use `npm list @angular/core @angular/material --depth=0` to verify

**Pattern 2: MDC Migration Timing**
- MatLegacy modules deleted in Angular v17
- MDC migration MUST be completed before v17 upgrade
- Check for MatLegacy imports: `grep -r "MatLegacy" src/`

**Pattern 3: View Engine Libraries**
- View Engine libraries cause performance issues
- Must be Ivy-compatible or replaced
- Check build output for View Engine warnings

**Pattern 4: Peer Dependency Conflicts**
- Some conflicts are non-blocking (warnings only)
- Use `--legacy-peer-deps` if necessary
- Document conflicts for post-migration resolution

**Pattern 5: Library API Evolution**
- Libraries evolve independently from Angular
- Check library migration guides
- AG Grid, Highcharts have breaking API changes

### Pre-Upgrade Checklist
- [ ] Verify actual Angular version (not assumed)
- [ ] Verify Node.js version matches requirements
- [ ] Identify deprecated packages
- [ ] Check View Engine libraries
- [ ] Verify Material version matches Core
- [ ] Plan MDC migration timing

---

## 🚦 Supervision Level
- **Level 3 (Moderate Autonomy)**: Review all recommendations.
- **Red Flags**:
    - Agent suggesting a major version bump without noting breaking changes.
    - Agent ignoring peer dependency warnings that look critical.
    - Agent not verifying actual Angular version.
    - Agent not checking Material version synchronization.
    - Agent not identifying MDC migration timing requirements.

# 🚀 Angular Migration Project (v15 → v20)

**Enterprise Angular Migration with AI Assistance**

This repository contains a comprehensive migration plan and tooling for upgrading a large-scale Angular application from version 15.2.10 to version 20, leveraging AI-powered development tools for maximum efficiency.

## 📊 Project Overview

- **Current Version**: Angular 15.2.10
- **Target Version**: Angular 20
- **Codebase Size**: 300k+ lines of code
- **Team Size**: 8 people (1 Tech Lead + 6 Devs + 1 QA)
- **Timeline**: 4 days (Fast Track) or 3-4 weeks (Standard Track)

## 🎯 Quick Start

### 1. Setup AI Tools (Required)
```bash
# Install Zed Editor with MCP servers for AI assistance
# See ZED_MCP_SETUP.md for detailed instructions
```

### 2. Choose Your Track

**⚡ Fast Track (4 Days)**
- Aggressive parallel execution
- AI-heavy approach with Zed + MCP
- Focus on getting to v20 quickly
- Defer modernizations (standalone, strict mode)

**📋 Standard Track (3-4 Weeks)**
- Methodical approach
- Includes full modernizations
- Better long-term maintainability

### 3. Run Pre-Migration Checks
```bash
# Make scripts executable
chmod +x scripts/*.sh

# Run comprehensive safety check
./scripts/pre_migration_check.sh 20

# Create backup
./scripts/backup_before_migration.sh pre-migration

# Check current status
./scripts/migration_status.sh
```

## 📚 Documentation

### Essential Reading
1. **[ZED_MCP_SETUP.md](ZED_MCP_SETUP.md)** - Setup AI assistance (START HERE!)
2. **[4-DAY-QUICK-REFERENCE.md](4-DAY-QUICK-REFERENCE.md)** - Fast track day-by-day guide
3. **[plan.md](plan.md)** - Complete migration plan with all phases
4. **[TEAM_STRUCTURE.md](TEAM_STRUCTURE.md)** - 8-person team organization

### Supporting Docs
- **[MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md)** - Executive summary
- **[PARALLELIZATION_GUIDE.md](PARALLELIZATION_GUIDE.md)** - Parallel execution strategy
- **[agents/](agents/)** - AI agent roles and workflows
- **[workload_validation.md](workload_validation.md)** - Team capacity analysis

## 🤖 AI-Powered Migration

This migration leverages **Zed Editor** with **Model Context Protocol (MCP)** servers:

- **Angular MCP**: Direct access to Angular docs and migration guides
- **Playwright MCP**: Automated test execution and debugging
- **Context7 MCP**: Team knowledge sharing and pattern memory

**Impact**: 5x faster migration with higher quality.

## 👥 Team Structure

### 8-Person Team
- **1 Tech Lead**: Coordination, upgrades, merges
- **6 Developers** (2 sub-teams):
  - **Alpha Team** (Frontend): Build fixes, components, UI libraries
  - **Beta Team** (Backend/Infra): Services, dependencies, infrastructure
- **1 Automation QA**: All testing, quality gates, GO/NO-GO decisions

### AI Agent Roles
Each team member has a dedicated AI agent:
- **Architecture Reviewer** (Tech Lead)
- **Build Fixer** (Dev A1)
- **Code Modernizer** (Dev A2)
- **Style Migrator** (Dev A3)
- **Logic Refactorer** (Dev B1)
- **Dependency Auditor** (Dev B2)
- **Infra & Perf Optimizer** (Dev B3)
- **Test Migrator** (QA)
- **Code Reviewer** (All Devs)

## 🛠️ Migration Scripts

All automation scripts are in the `scripts/` directory:

```bash
# Pre-migration
./scripts/pre_migration_check.sh 20
./scripts/backup_before_migration.sh [name]

# During migration
./scripts/migration_toolbox.sh check_all
./scripts/check_deprecated_apis.sh
./scripts/verify_build.sh production

# Status tracking
./scripts/migration_status.sh
./scripts/analyze_bundle.sh
```

## 📋 Migration Phases

### Phase 0: Safety Net (3-5 days)
- Playwright visual regression baseline
- CI/CD setup
- Dependency inventory

### Phase 1: Foundation & Audit (3-5 days)
- "Red Zone" dependency audit
- Component usage analysis
- Test coverage baseline

### Phase 2: Material Hurdle (v14→v15)
- Angular 15 upgrade
- MDC migration (CRITICAL!)
- Material component updates

### Phase 3: Stability Plateau (v15→v17)
- Core upgrades (v16, v17)
- Parallel modernization streams
- Test migration to Vitest

### Phase 4: Modern Frontier (v18→v20)
- Final upgrades (v18, v19, v20)
- Performance optimization
- Production deployment

## ✅ Success Criteria

### Fast Track (4 Days)
- [ ] Angular 20 running in production
- [ ] Build passing
- [ ] >70% tests passing
- [ ] Critical user flows working

### Standard Track (3-4 Weeks)
- [ ] Angular 20 with full modernizations
- [ ] Standalone components
- [ ] TypeScript strict mode
- [ ] Vitest + Playwright
- [ ] >90% tests passing
- [ ] Bundle size optimized

## 🚨 Critical Dependencies

### Must Replace
- **ngx-perfect-scrollbar**: DEPRECATED - Replace with native CSS or ngx-scrollbar
- **@ag-grid-community**: v28 → v31 (major breaking changes)

### Must Update
- **Node.js**: 18.x → 20.x
- **TypeScript**: 4.9 → 5.5
- **Testing**: Karma/Jasmine → Vitest, Protractor → Playwright

## 📞 Support

- **Slack Channels**:
  - `#migration-general` - All team communication
  - `#migration-blockers` - Urgent issues
  - `#migration-ai-agents` - AI agent status

- **Daily Standups**: 9:00 AM
- **End of Day Sync**: 5:00 PM (QA GO/NO-GO decision)

## 📈 Progress Tracking

```bash
# Generate status report
./scripts/migration_status.sh

# Check specific metrics
./scripts/check_control_flow.sh
./scripts/check_typescript_strict.sh
./scripts/analyze_bundle.sh
```

## 🔗 Quick Links

- [Angular Update Guide](https://update.angular.io/)
- [Angular Material MDC Migration](https://material.angular.io/guide/mdc-migration)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)

---

**Ready to start?** → Read **[ZED_MCP_SETUP.md](ZED_MCP_SETUP.md)** first, then choose your track in **[4-DAY-QUICK-REFERENCE.md](4-DAY-QUICK-REFERENCE.md)** or **[plan.md](plan.md)**.

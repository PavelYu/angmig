#!/bin/bash
# 🛡️ Pre-Migration Safety Check
# Usage: ./scripts/pre_migration_check.sh [target_version]

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

TARGET_VERSION=${1:-"20"}

echo -e "${CYAN}🛡️  Pre-Migration Safety Check${NC}"
echo "================================"
echo "Target: Angular v$TARGET_VERSION"
echo ""

CHECKS_PASSED=0
CHECKS_FAILED=0

run_check() {
    local script=$1
    local name=$2
    
    echo -e "${BLUE}Running: $name${NC}"
    if ./scripts/$script.sh > /dev/null 2>&1; then
        echo -e "  ${GREEN}✅ PASS${NC}"
        CHECKS_PASSED=$((CHECKS_PASSED + 1))
    else
        echo -e "  ${RED}❌ FAIL${NC}"
        CHECKS_FAILED=$((CHECKS_FAILED + 1))
    fi
    echo ""
}

# Run all checks
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Running Pre-Migration Checks...${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

run_check "check_angular_version" "Angular Version Check"
run_check "verify_dependencies" "Dependency Verification"
run_check "migration_toolbox" "Migration Toolbox (Legacy/RxJS)"
run_check "check_deprecated_apis" "Deprecated APIs Check"
run_check "check_typescript_strict" "TypeScript Strict Mode"
run_check "check_zone_flags" "Zone.js Flags Migration"
run_check "find_breaking_changes" "Breaking Changes Scan"

# Summary
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📊 Summary${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  ${GREEN}✅ Passed: $CHECKS_PASSED${NC}"
echo -e "  ${RED}❌ Failed: $CHECKS_FAILED${NC}"
echo ""

if [ "$CHECKS_FAILED" -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Ready for migration.${NC}"
    echo ""
    echo -e "${YELLOW}💡 Next steps:${NC}"
    echo "  1. Create backup: ./scripts/backup_before_migration.sh"
    echo "  2. Start migration: Follow plan.md Phase 3"
    exit 0
else
    echo -e "${RED}⚠️  $CHECKS_FAILED check(s) failed. Fix issues before migrating.${NC}"
    echo ""
    echo -e "${YELLOW}💡 Review failed checks above and fix issues.${NC}"
    exit 1
fi


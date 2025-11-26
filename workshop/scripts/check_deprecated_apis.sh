#!/bin/bash
# 🔍 Find Deprecated Angular APIs
# Usage: ./scripts/check_deprecated_apis.sh

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔍 Scanning for Deprecated Angular APIs...${NC}"
echo "=============================================="

if [ ! -d "src" ]; then
    echo -e "${YELLOW}⚠️  src/ directory not found. Skipping code scan.${NC}"
    exit 0
fi

TOTAL_ISSUES=0

# Check for deprecated APIs
check_pattern() {
    local pattern=$1
    local description=$2
    local severity=$3
    
    MATCHES=$(grep -r "$pattern" src --include="*.ts" --include="*.html" 2>/dev/null | wc -l | tr -d ' ')
    
    if [ "$MATCHES" -gt 0 ]; then
        echo -e "${severity}Found $MATCHES instances: $description${NC}"
        grep -r "$pattern" src --include="*.ts" --include="*.html" 2>/dev/null | head -n 3 | sed 's/^/  /'
        if [ "$MATCHES" -gt 3 ]; then
            echo -e "  ${YELLOW}... and $((MATCHES - 3)) more${NC}"
        fi
        TOTAL_ISSUES=$((TOTAL_ISSUES + MATCHES))
    fi
}

echo ""
echo -e "${YELLOW}Checking for deprecated patterns...${NC}"
echo ""

# Angular 15+ deprecations
check_pattern "RouterLinkWithHref" "RouterLinkWithHref (use RouterLink)" "$RED"
check_pattern "providedIn.*'ngModule'" "providedIn: 'ngModule' (deprecated)" "$YELLOW"
check_pattern "providedIn.*'any'" "providedIn: 'any' (deprecated)" "$YELLOW"
check_pattern "DATE_PIPE_DEFAULT_TIMEZONE" "DATE_PIPE_DEFAULT_TIMEZONE (deprecated)" "$YELLOW"

# Angular 17+ deprecations
check_pattern "\.mutate\(" "Signal.mutate() (use update() instead)" "$RED"
check_pattern "HttpClientModule" "HttpClientModule (use provideHttpClient)" "$YELLOW"
check_pattern "async.*from '@angular/core/testing'" "async (use waitForAsync)" "$YELLOW"

# Angular 18+ deprecations
check_pattern "NgSwitch.*==" "NgSwitch loose equality (now uses ===)" "$YELLOW"

# Material deprecations
check_pattern "MatLegacy" "MatLegacy components (MDC migration required)" "$RED"
check_pattern "\.mat-" "Legacy Material CSS classes" "$YELLOW"

# Zone.js deprecations
check_pattern "zone\.js/dist/zone" "Old Zone.js import path" "$YELLOW"

# RxJS deprecations
check_pattern "\.toPromise\(" "RxJS toPromise() (use lastValueFrom)" "$RED"

echo ""
if [ "$TOTAL_ISSUES" -eq 0 ]; then
    echo -e "${GREEN}✅ No deprecated APIs found!${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Total issues found: $TOTAL_ISSUES${NC}"
    echo -e "${YELLOW}💡 Review and fix these before upgrading${NC}"
    exit 1
fi


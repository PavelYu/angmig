#!/bin/bash
# 🔍 Find Potential Breaking Changes
# Usage: ./scripts/find_breaking_changes.sh [target_version]

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

TARGET_VERSION=${1:-"20"}

echo -e "${BLUE}🔍 Breaking Changes Scanner${NC}"
echo "=============================="

if [ ! -d "src" ]; then
    echo -e "${YELLOW}⚠️  src/ directory not found. Skipping scan.${NC}"
    exit 0
fi

TOTAL_ISSUES=0

check_pattern() {
    local pattern=$1
    local description=$2
    local version=$3
    local fix_hint=$4
    
    MATCHES=$(grep -r "$pattern" src --include="*.ts" --include="*.html" 2>/dev/null | wc -l | tr -d ' ')
    
    if [ "$MATCHES" -gt 0 ]; then
        echo -e "${RED}[v$version] $description${NC}"
        echo -e "  Found: $MATCHES instances"
        if [ -n "$fix_hint" ]; then
            echo -e "  ${YELLOW}💡 $fix_hint${NC}"
        fi
        grep -r "$pattern" src --include="*.ts" --include="*.html" 2>/dev/null | head -n 2 | sed 's/^/    /'
        if [ "$MATCHES" -gt 2 ]; then
            echo -e "    ${YELLOW}... and $((MATCHES - 2)) more${NC}"
        fi
        echo ""
        TOTAL_ISSUES=$((TOTAL_ISSUES + MATCHES))
    fi
}

echo ""
echo -e "${YELLOW}Scanning for breaking changes by version...${NC}"
echo ""

# Angular 15 breaking changes
if [ "$TARGET_VERSION" -ge 15 ]; then
    echo -e "${BLUE}Angular 15 Breaking Changes:${NC}"
    check_pattern "RouterLinkWithHref" "RouterLinkWithHref removed" "15" "Replace with RouterLink"
    check_pattern "enableIvy.*true" "enableIvy option removed" "15" "Remove from tsconfig.json (default now)"
fi

# Angular 16 breaking changes
if [ "$TARGET_VERSION" -ge 16 ]; then
    echo -e "${BLUE}Angular 16 Breaking Changes:${NC}"
    check_pattern "ViewEngine" "View Engine removed" "16" "All libs must be Ivy-compatible"
    check_pattern "ngcc" "ngcc removed" "16" "No longer needed"
fi

# Angular 17 breaking changes
if [ "$TARGET_VERSION" -ge 17 ]; then
    echo -e "${BLUE}Angular 17 Breaking Changes:${NC}"
    check_pattern "\.mutate\(" "Signal.mutate() removed" "17" "Use update() instead"
    check_pattern "MatLegacy" "MatLegacy components removed" "17" "Complete MDC migration"
    check_pattern "NgSwitch.*==" "NgSwitch now uses ===" "17" "Fix type mismatches"
fi

# Angular 18 breaking changes
if [ "$TARGET_VERSION" -ge 18 ]; then
    echo -e "${BLUE}Angular 18 Breaking Changes:${NC}"
    check_pattern "HttpClientModule" "HttpClientModule deprecated" "18" "Use provideHttpClient()"
    check_pattern "async.*from '@angular/core/testing'" "async() removed" "18" "Use waitForAsync()"
fi

# Angular 19 breaking changes
if [ "$TARGET_VERSION" -ge 19 ]; then
    echo -e "${BLUE}Angular 19 Breaking Changes:${NC}"
    check_pattern "standalone.*false" "Standalone default changed" "19" "Explicitly set standalone: false if needed"
fi

# Angular 20 breaking changes
if [ "$TARGET_VERSION" -ge 20 ]; then
    echo -e "${BLUE}Angular 20 Breaking Changes:${NC}"
    check_pattern "{{ in }}" "Template 'in' keyword" "20" "Use {{ this.in }}"
    check_pattern "{{ void }}" "Template 'void' keyword" "20" "Use {{ this.void }}"
    check_pattern "provideExperimentalZonelessChangeDetection" "Experimental API renamed" "20" "Use provideZonelessChangeDetection"
fi

# AG Grid breaking changes (v28 → v31+)
echo ""
echo -e "${BLUE}AG Grid Breaking Changes (v28 → v31+):${NC}"
AG_GRID_VERSION=$(grep -oP '"@ag-grid-community/core":\s*"~?\^?\K[\d.]+' package.json 2>/dev/null | head -1)
if [ -n "$AG_GRID_VERSION" ]; then
    AG_MAJOR=$(echo $AG_GRID_VERSION | cut -d. -f1)
    if [ "$AG_MAJOR" -lt 31 ]; then
        check_pattern "ColDef<" "ColDef generic removed" "31" "Remove generic type parameter"
        check_pattern "ag-theme-alpine" "Alpine theme deprecated" "31" "Use ag-theme-quartz"
        check_pattern "@ag-grid-community/angular" "Import paths changed" "31" "Update import paths"
    fi
fi

echo ""
if [ "$TOTAL_ISSUES" -eq 0 ]; then
    echo -e "${GREEN}✅ No breaking changes found!${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Total potential breaking changes: $TOTAL_ISSUES${NC}"
    echo -e "${YELLOW}💡 Review and fix these before upgrading to v$TARGET_VERSION${NC}"
    exit 1
fi


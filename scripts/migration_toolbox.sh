#!/bin/bash
# 🛠️ Angular Migration Toolbox (The "No-AI" Validator)
# Usage: ./scripts/migration_toolbox.sh [check_all|legacy|rxjs|strict|deps]

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

function check_legacy_material() {
    echo -e "${YELLOW}🔍 Checking for Legacy Material imports...${NC}"
    # Exclude node_modules and dist
    MATCHES=$(grep -r "MatLegacy" src/app --include="*.ts" | wc -l)
    
    if [ "$MATCHES" -gt 0 ]; then
        echo -e "${RED}❌ FAIL: Found $MATCHES instances of 'MatLegacy'.${NC}"
        grep -r "MatLegacy" src/app --include="*.ts" | head -n 5
        echo "... (and more)"
        return 1
    else
        echo -e "${GREEN}✅ PASS: No Legacy Material found.${NC}"
        return 0
    fi
}

function check_rxjs() {
    echo -e "${YELLOW}🔍 Checking for deprecated RxJS (toPromise)...${NC}"
    MATCHES=$(grep -r "\.toPromise()" src/app --include="*.ts" | wc -l)
    
    if [ "$MATCHES" -gt 0 ]; then
        echo -e "${RED}❌ FAIL: Found $MATCHES instances of '.toPromise()'.${NC}"
        grep -r "\.toPromise()" src/app --include="*.ts" | head -n 5
        return 1
    else
        echo -e "${GREEN}✅ PASS: No toPromise() usage found.${NC}"
        return 0
    fi
}

function check_strict_mode() {
    echo -e "${YELLOW}🔍 Checking 'any' type usage (Strict Mode Progress)...${NC}"
    # Count occurrences of ": any" or "as any"
    MATCHES=$(grep -rE ": any|as any" src/app --include="*.ts" | wc -l)
    
    echo -e "📊 Current 'any' count: ${RED}$MATCHES${NC}"
    echo "Tip: Track this number daily. It should go DOWN."
}

function check_forbidden_deps() {
    echo -e "${YELLOW}🔍 Checking for forbidden dependencies in package.json...${NC}"
    FORBIDDEN=("ngx-perfect-scrollbar" "@angular/flex-layout" "protractor" "karma")
    FAIL=0
    
    for dep in "${FORBIDDEN[@]}"; do
        if grep -q "\"$dep\"" package.json; then
            echo -e "${RED}❌ FAIL: Found forbidden dependency: $dep${NC}"
            FAIL=1
        else
            echo -e "${GREEN}✅ PASS: $dep is gone.${NC}"
        fi
    done
    
    return $FAIL
}

function check_all() {
    check_legacy_material
    LEGACY_STATUS=$?
    
    check_rxjs
    RXJS_STATUS=$?
    
    check_forbidden_deps
    DEPS_STATUS=$?
    
    check_strict_mode
    
    if [ $LEGACY_STATUS -eq 0 ] && [ $RXJS_STATUS -eq 0 ] && [ $DEPS_STATUS -eq 0 ]; then
        echo -e "\n${GREEN}🎉 ALL CHECKS PASSED! You are ready for the next phase.${NC}"
        exit 0
    else
        echo -e "\n${RED}💥 CHECKS FAILED. Fix the errors above.${NC}"
        exit 1
    fi
}

# Command Router
case "$1" in
    legacy)
        check_legacy_material
        ;;
    rxjs)
        check_rxjs
        ;;
    strict)
        check_strict_mode
        ;;
    deps)
        check_forbidden_deps
        ;;
    check_all)
        check_all
        ;;
    *)
        echo "Usage: $0 {check_all|legacy|rxjs|strict|deps}"
        exit 1
        ;;
esac

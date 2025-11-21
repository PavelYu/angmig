#!/bin/bash
# ✅ Verify Dependency Compatibility
# Usage: ./scripts/verify_dependencies.sh [target_angular_version]

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

TARGET_VERSION=${1:-"20"}

echo -e "${BLUE}✅ Dependency Compatibility Checker${NC}"
echo "====================================="

if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ package.json not found${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}🔍 Checking critical dependencies...${NC}"
echo ""

ISSUES=0

# Check Angular packages version consistency
check_angular_consistency() {
    echo -e "${BLUE}Angular Core Packages:${NC}"
    CORE_VERSION=$(grep -oP '"@angular/core":\s*"\^?\K[\d.]+' package.json | head -1)
    
    ANGULAR_PACKAGES=("@angular/animations" "@angular/common" "@angular/compiler" "@angular/forms" "@angular/platform-browser" "@angular/router")
    
    for pkg in "${ANGULAR_PACKAGES[@]}"; do
        PKG_VERSION=$(grep -oP "\"$pkg\":\s*\"\^?\K[\d.]+" package.json | head -1)
        if [ -n "$PKG_VERSION" ]; then
            CORE_MAJOR=$(echo $CORE_VERSION | cut -d. -f1)
            PKG_MAJOR=$(echo $PKG_VERSION | cut -d. -f1)
            
            if [ "$CORE_MAJOR" != "$PKG_MAJOR" ]; then
                echo -e "  ${RED}❌ $pkg: $PKG_VERSION (should be v$CORE_MAJOR.x)${NC}"
                ISSUES=$((ISSUES + 1))
            else
                echo -e "  ${GREEN}✅ $pkg: $PKG_VERSION${NC}"
            fi
        fi
    done
}

# Check AG Grid version consistency
check_ag_grid() {
    echo ""
    echo -e "${BLUE}AG Grid Packages:${NC}"
    AG_GRID_CORE=$(grep -oP '"@ag-grid-community/core":\s*"~?\^?\K[\d.]+' package.json | head -1)
    
    if [ -n "$AG_GRID_CORE" ]; then
        AG_MAJOR=$(echo $AG_GRID_CORE | cut -d. -f1)
        echo -e "  Current: v$AG_MAJOR"
        
        if [ "$AG_MAJOR" -lt 31 ]; then
            echo -e "  ${RED}⚠️  AG Grid v$AG_MAJOR → v31+ required for Angular 17+${NC}"
            ISSUES=$((ISSUES + 1))
        else
            echo -e "  ${GREEN}✅ AG Grid version is compatible${NC}"
        fi
    fi
}

# Check RxJS version
check_rxjs() {
    echo ""
    echo -e "${BLUE}RxJS:${NC}"
    RXJS_VERSION=$(grep -oP '"rxjs":\s*"~?\^?\K[\d.]+' package.json | head -1)
    
    if [ -n "$RXJS_VERSION" ]; then
        RXJS_MAJOR=$(echo $RXJS_VERSION | cut -d. -f1)
        RXJS_MINOR=$(echo $RXJS_VERSION | cut -d. -f2)
        
        if [ "$RXJS_MAJOR" -lt 7 ]; then
            echo -e "  ${RED}❌ RxJS v$RXJS_VERSION (Angular 15+ requires RxJS 7.5+)${NC}"
            ISSUES=$((ISSUES + 1))
        elif [ "$RXJS_MAJOR" -eq 7 ] && [ "$RXJS_MINOR" -lt 5 ]; then
            echo -e "  ${YELLOW}⚠️  RxJS v$RXJS_VERSION (recommend 7.5+)${NC}"
        else
            echo -e "  ${GREEN}✅ RxJS v$RXJS_VERSION${NC}"
        fi
    fi
}

# Check deprecated dependencies
check_deprecated() {
    echo ""
    echo -e "${BLUE}Deprecated Dependencies:${NC}"
    
    DEPRECATED=("ngx-perfect-scrollbar" "protractor" "@angular/flex-layout")
    
    for dep in "${DEPRECATED[@]}"; do
        if grep -q "\"$dep\"" package.json; then
            echo -e "  ${RED}❌ $dep (should be removed)${NC}"
            ISSUES=$((ISSUES + 1))
        else
            echo -e "  ${GREEN}✅ $dep not found${NC}"
        fi
    done
}

# Check peer dependencies
check_peer_deps() {
    echo ""
    echo -e "${BLUE}Peer Dependency Warnings:${NC}"
    
    if [ -f "package-lock.json" ]; then
        PEER_WARNINGS=$(npm ls 2>&1 | grep -i "peer dep" | wc -l | tr -d ' ')
        if [ "$PEER_WARNINGS" -gt 0 ]; then
            echo -e "  ${YELLOW}⚠️  Found $PEER_WARNINGS peer dependency warnings${NC}"
            echo -e "  ${YELLOW}💡 Run 'npm ls' to see details${NC}"
        else
            echo -e "  ${GREEN}✅ No peer dependency warnings${NC}"
        fi
    fi
}

check_angular_consistency
check_ag_grid
check_rxjs
check_deprecated
check_peer_deps

echo ""
if [ "$ISSUES" -eq 0 ]; then
    echo -e "${GREEN}✅ All dependencies are compatible!${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Found $ISSUES compatibility issue(s)${NC}"
    exit 1
fi


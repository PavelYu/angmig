#!/bin/bash
# 📊 Generate Migration Status Report
# Usage: ./scripts/migration_status.sh

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}📊 Angular Migration Status Report${NC}"
echo "======================================"
echo "Generated: $(date)"
echo ""

# Get current Angular version
if [ -f "package.json" ]; then
    ANGULAR_VERSION=$(grep -oP '"@angular/core":\s*"\^?\K[\d.]+' package.json | head -1)
    ANGULAR_MAJOR=$(echo $ANGULAR_VERSION | cut -d. -f1)
    echo -e "${BLUE}Current Angular Version: ${YELLOW}v$ANGULAR_MAJOR ($ANGULAR_VERSION)${NC}"
else
    echo -e "${RED}❌ package.json not found${NC}"
    exit 1
fi

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📋 Phase Status${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Phase 0: Safety Net
echo ""
echo -e "${YELLOW}Phase 0: Safety Net (Playwright)${NC}"
if command -v playwright &> /dev/null || [ -f "package.json" ] && grep -q "playwright" package.json; then
    echo -e "  ${GREEN}✅ Playwright installed${NC}"
else
    echo -e "  ${RED}❌ Playwright not installed${NC}"
fi

# Phase 2: Material MDC
echo ""
echo -e "${YELLOW}Phase 2: Material MDC Migration${NC}"
if [ -d "src" ]; then
    MAT_LEGACY=$(grep -r "MatLegacy" src --include="*.ts" 2>/dev/null | wc -l | tr -d ' ')
    if [ "$MAT_LEGACY" -eq 0 ]; then
        echo -e "  ${GREEN}✅ No MatLegacy imports found${NC}"
    else
        echo -e "  ${RED}❌ Found $MAT_LEGACY MatLegacy imports${NC}"
    fi
else
    echo -e "  ${YELLOW}⚠️  src/ directory not found${NC}"
fi

# Phase 3: Control Flow
echo ""
echo -e "${YELLOW}Phase 3: Control Flow Migration${NC}"
if [ -d "src" ]; then
    NG_IF=$(grep -r "\*ngIf" src --include="*.html" 2>/dev/null | wc -l | tr -d ' ')
    NG_FOR=$(grep -r "\*ngFor" src --include="*.html" 2>/dev/null | wc -l | tr -d ' ')
    CONTROL_FLOW=$(grep -rE "@if|@for|@switch" src --include="*.html" 2>/dev/null | wc -l | tr -d ' ')
    
    if [ "$NG_IF" -eq 0 ] && [ "$NG_FOR" -eq 0 ]; then
        echo -e "  ${GREEN}✅ No legacy *ngIf/*ngFor found${NC}"
    else
        echo -e "  ${YELLOW}⚠️  Found $NG_IF *ngIf and $NG_FOR *ngFor${NC}"
    fi
    
    if [ "$CONTROL_FLOW" -gt 0 ]; then
        echo -e "  ${GREEN}✅ Found $CONTROL_FLOW new control flow blocks (@if/@for)${NC}"
    fi
else
    echo -e "  ${YELLOW}⚠️  src/ directory not found${NC}"
fi

# Phase 4: Standalone
echo ""
echo -e "${YELLOW}Phase 4: Standalone Components${NC}"
if [ -d "src" ]; then
    STANDALONE=$(grep -r "standalone:\s*true" src --include="*.ts" 2>/dev/null | wc -l | tr -d ' ')
    NGMODULE=$(grep -r "@NgModule" src --include="*.ts" 2>/dev/null | wc -l | tr -d ' ')
    
    if [ "$STANDALONE" -gt 0 ]; then
        echo -e "  ${GREEN}✅ Found $STANDALONE standalone components${NC}"
    fi
    
    if [ "$NGMODULE" -gt 0 ]; then
        echo -e "  ${YELLOW}⚠️  Found $NGMODULE NgModules (consider migrating)${NC}"
    fi
else
    echo -e "  ${YELLOW}⚠️  src/ directory not found${NC}"
fi

# Dependencies
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📦 Dependency Status${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Check critical dependencies
check_dep() {
    local dep=$1
    local status=$2
    
    if grep -q "\"$dep\"" package.json 2>/dev/null; then
        VERSION=$(grep -oP "\"$dep\":\s*\"~?\^?\K[\d.]+" package.json | head -1)
        echo -e "  $status $dep: $VERSION"
    fi
}

echo ""
echo -e "${YELLOW}Critical Dependencies:${NC}"
check_dep "ngx-perfect-scrollbar" "${RED}❌"
check_dep "@ag-grid-community/core" "${BLUE}📦"
check_dep "rxjs" "${BLUE}📦"
check_dep "karma" "${YELLOW}⚠️"
check_dep "protractor" "${RED}❌"

# TypeScript
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🔧 Configuration Status${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if [ -f "tsconfig.json" ]; then
    TS_VERSION=$(grep -oP '"typescript":\s*"~?\^?\K[\d.]+' package.json | head -1)
    echo -e "${YELLOW}TypeScript:${NC} $TS_VERSION"
    
    STRICT=$(grep -o '"strict":\s*true' tsconfig.json)
    if [ -n "$STRICT" ]; then
        echo -e "  ${GREEN}✅ Strict mode enabled${NC}"
    else
        echo -e "  ${YELLOW}⚠️  Strict mode not enabled${NC}"
    fi
fi

# Node.js
NODE_VERSION=$(node -v 2>/dev/null || echo "not found")
echo -e "${YELLOW}Node.js:${NC} $NODE_VERSION"

# Build status
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🏗️  Build Status${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if [ -d "dist" ]; then
    echo -e "  ${GREEN}✅ Build output exists${NC}"
    echo -e "  ${YELLOW}💡 Run: ./scripts/analyze_bundle.sh${NC}"
else
    echo -e "  ${YELLOW}⚠️  No build output found${NC}"
    echo -e "  ${YELLOW}💡 Run: npm run build${NC}"
fi

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📝 Next Steps${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if [ "$ANGULAR_MAJOR" -lt 17 ]; then
    echo -e "  1. ${YELLOW}Upgrade to Angular 17+${NC}"
elif [ "$ANGULAR_MAJOR" -lt 20 ]; then
    echo -e "  1. ${YELLOW}Upgrade to Angular 20${NC}"
else
    echo -e "  ${GREEN}✅ Migration complete!${NC}"
fi

echo -e "  2. Run: ${CYAN}./scripts/migration_toolbox.sh check_all${NC}"
echo -e "  3. Run: ${CYAN}./scripts/check_deprecated_apis.sh${NC}"
echo ""


#!/bin/bash
# 🔍 Check Angular Version & Compatibility
# Usage: ./scripts/check_angular_version.sh [target_version]

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

TARGET_VERSION=${1:-"20"}

echo -e "${BLUE}📦 Angular Version Checker${NC}"
echo "=================================="

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ ERROR: package.json not found${NC}"
    exit 1
fi

# Extract current Angular version
CURRENT_VERSION=$(grep -oP '"@angular/core":\s*"\^?\K[\d.]+' package.json | head -1)
CURRENT_MAJOR=$(echo $CURRENT_VERSION | cut -d. -f1)

echo -e "Current Angular Version: ${YELLOW}$CURRENT_VERSION${NC} (Major: $CURRENT_MAJOR)"
echo -e "Target Version: ${YELLOW}$TARGET_VERSION${NC}"

# Check Node.js version
NODE_VERSION=$(node -v 2>/dev/null | cut -d'v' -f2 | cut -d'.' -f1)
if [ -z "$NODE_VERSION" ]; then
    echo -e "${RED}❌ Node.js not found${NC}"
else
    echo -e "Node.js Version: ${YELLOW}v$NODE_VERSION${NC}"
    
    # Check Node.js compatibility
    if [ "$CURRENT_MAJOR" -le 17 ] && [ "$NODE_VERSION" -lt 18 ]; then
        echo -e "${RED}⚠️  WARNING: Angular $CURRENT_MAJOR requires Node 18+${NC}"
    elif [ "$CURRENT_MAJOR" -ge 18 ] && [ "$NODE_VERSION" -lt 20 ]; then
        echo -e "${RED}⚠️  WARNING: Angular $CURRENT_MAJOR requires Node 20+${NC}"
    else
        echo -e "${GREEN}✅ Node.js version is compatible${NC}"
    fi
fi

# Check TypeScript version
TS_VERSION=$(grep -oP '"typescript":\s*"~?\^?\K[\d.]+' package.json | head -1)
if [ -n "$TS_VERSION" ]; then
    echo -e "TypeScript Version: ${YELLOW}$TS_VERSION${NC}"
    
    # Check TypeScript compatibility
    TS_MAJOR=$(echo $TS_VERSION | cut -d. -f1)
    TS_MINOR=$(echo $TS_VERSION | cut -d. -f2)
    
    if [ "$CURRENT_MAJOR" -ge 17 ] && [ "$TS_MAJOR" -lt 5 ]; then
        echo -e "${RED}⚠️  WARNING: Angular 17+ requires TypeScript 5.2+${NC}"
    elif [ "$CURRENT_MAJOR" -ge 17 ] && [ "$TS_MAJOR" -eq 5 ] && [ "$TS_MINOR" -lt 2 ]; then
        echo -e "${RED}⚠️  WARNING: Angular 17+ requires TypeScript 5.2+${NC}"
    else
        echo -e "${GREEN}✅ TypeScript version is compatible${NC}"
    fi
fi

# Calculate upgrade path
UPGRADE_STEPS=$((TARGET_VERSION - CURRENT_MAJOR))
if [ "$UPGRADE_STEPS" -gt 0 ]; then
    echo ""
    echo -e "${YELLOW}📋 Upgrade Path:${NC}"
    echo "  Current: v$CURRENT_MAJOR"
    for i in $(seq 1 $UPGRADE_STEPS); do
        NEXT_VERSION=$((CURRENT_MAJOR + i))
        echo "  → v$NEXT_VERSION"
    done
    echo -e "${BLUE}Total steps: $UPGRADE_STEPS${NC}"
else
    echo -e "${GREEN}✅ Already at or past target version${NC}"
fi


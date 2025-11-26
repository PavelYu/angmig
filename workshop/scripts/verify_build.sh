#!/bin/bash
# ✅ Verify Build After Migration
# Usage: ./scripts/verify_build.sh [build_config]

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

BUILD_CONFIG=${1:-"production"}

echo -e "${BLUE}✅ Build Verification${NC}"
echo "======================"
echo ""

# Check if Angular CLI is available
if ! command -v ng &> /dev/null; then
    echo -e "${RED}❌ Angular CLI not found${NC}"
    echo -e "${YELLOW}💡 Run: npm install${NC}"
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v)
echo -e "${YELLOW}Node.js:${NC} $NODE_VERSION"

# Check Angular version
if [ -f "package.json" ]; then
    ANGULAR_VERSION=$(grep -oP '"@angular/core":\s*"\^?\K[\d.]+' package.json | head -1)
    echo -e "${YELLOW}Angular:${NC} $ANGULAR_VERSION"
fi

echo ""
echo -e "${BLUE}🔨 Building project...${NC}"
echo ""

# Run build
ng build --configuration="$BUILD_CONFIG" 2>&1 | tee /tmp/build_output.log
BUILD_EXIT_CODE=${PIPESTATUS[0]}

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if [ "$BUILD_EXIT_CODE" -eq 0 ]; then
    echo -e "${GREEN}✅ Build succeeded!${NC}"
    
    # Check for warnings
    WARNINGS=$(grep -i "warning" /tmp/build_output.log | wc -l | tr -d ' ')
    if [ "$WARNINGS" -gt 0 ]; then
        echo -e "${YELLOW}⚠️  Found $WARNINGS warning(s)${NC}"
    fi
    
    # Check bundle size
    if [ -d "dist" ]; then
        echo ""
        echo -e "${BLUE}📦 Bundle Analysis:${NC}"
        ./scripts/analyze_bundle.sh 2>/dev/null || echo -e "${YELLOW}⚠️  Bundle analyzer not available${NC}"
    fi
    
    echo ""
    echo -e "${GREEN}✅ Build verification complete!${NC}"
    exit 0
else
    echo -e "${RED}❌ Build failed!${NC}"
    echo ""
    echo -e "${YELLOW}Common issues:${NC}"
    echo "  - TypeScript errors (run: ./scripts/check_typescript_strict.sh)"
    echo "  - Deprecated APIs (run: ./scripts/check_deprecated_apis.sh)"
    echo "  - Dependency conflicts (run: ./scripts/verify_dependencies.sh)"
    echo ""
    echo -e "${YELLOW}Full build log saved to: /tmp/build_output.log${NC}"
    exit 1
fi


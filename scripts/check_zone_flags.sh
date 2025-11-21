#!/bin/bash
# 🔍 Check Zone.js Flags Migration Status
# Usage: ./scripts/check_zone_flags.sh

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔍 Zone.js Flags Migration Check${NC}"
echo "=================================="

ISSUES=0

# Check for polyfills.ts
if [ -f "src/polyfills.ts" ]; then
    echo -e "${YELLOW}📄 Found src/polyfills.ts${NC}"
    
    # Check for Zone.js flags
    if grep -q "zone-flags" src/polyfills.ts 2>/dev/null; then
        echo -e "  ${GREEN}✅ Zone flags found in polyfills.ts${NC}"
    else
        # Check for common Zone.js flag patterns
        ZONE_FLAGS=$(grep -E "(requestAnimationFrame|on_property|XHR)" src/polyfills.ts 2>/dev/null | grep -v "//" | wc -l | tr -d ' ')
        
        if [ "$ZONE_FLAGS" -gt 0 ]; then
            echo -e "  ${YELLOW}⚠️  Found $ZONE_FLAGS potential Zone.js flag configurations${NC}"
            echo -e "  ${YELLOW}💡 Consider migrating to zone-flags.ts (see plan.md)${NC}"
            ISSUES=$((ISSUES + 1))
        fi
    fi
else
    echo -e "${GREEN}✅ src/polyfills.ts not found (may be migrated)${NC}"
fi

# Check for zone-flags.ts
if [ -f "src/zone-flags.ts" ]; then
    echo -e "${GREEN}✅ Found src/zone-flags.ts${NC}"
    
    # Check if it's imported in main.ts
    if [ -f "src/main.ts" ]; then
        if grep -q "zone-flags" src/main.ts 2>/dev/null; then
            echo -e "  ${GREEN}✅ zone-flags.ts is imported in main.ts${NC}"
        else
            echo -e "  ${RED}❌ zone-flags.ts exists but not imported in main.ts${NC}"
            echo -e "  ${YELLOW}💡 Add: import './zone-flags'; before 'zone.js' import${NC}"
            ISSUES=$((ISSUES + 1))
        fi
    fi
else
    echo -e "${YELLOW}⚠️  src/zone-flags.ts not found${NC}"
    if [ -f "src/polyfills.ts" ]; then
        echo -e "  ${YELLOW}💡 Consider creating zone-flags.ts for performance optimizations${NC}"
    fi
fi

# Check main.ts for zone.js import
if [ -f "src/main.ts" ]; then
    echo ""
    echo -e "${BLUE}Checking src/main.ts:${NC}"
    
    if grep -q "import.*zone.js" src/main.ts 2>/dev/null; then
        echo -e "  ${GREEN}✅ zone.js import found${NC}"
        
        # Check import order (zone-flags should come before zone.js)
        ZONE_FLAGS_LINE=$(grep -n "zone-flags" src/main.ts 2>/dev/null | cut -d: -f1)
        ZONE_JS_LINE=$(grep -n "zone.js" src/main.ts 2>/dev/null | cut -d: -f1)
        
        if [ -n "$ZONE_FLAGS_LINE" ] && [ -n "$ZONE_JS_LINE" ]; then
            if [ "$ZONE_FLAGS_LINE" -lt "$ZONE_JS_LINE" ]; then
                echo -e "  ${GREEN}✅ Import order is correct (zone-flags before zone.js)${NC}"
            else
                echo -e "  ${RED}❌ Import order is wrong (zone-flags should come before zone.js)${NC}"
                ISSUES=$((ISSUES + 1))
            fi
        fi
    else
        echo -e "  ${YELLOW}⚠️  zone.js import not found in main.ts${NC}"
    fi
fi

# Check angular.json for polyfills reference
if [ -f "angular.json" ]; then
    echo ""
    echo -e "${BLUE}Checking angular.json:${NC}"
    
    if grep -q '"polyfills":' angular.json; then
        POLYFILLS_PATH=$(grep -oP '"polyfills":\s*"\K[^"]+' angular.json | head -1)
        echo -e "  Polyfills path: ${YELLOW}$POLYFILLS_PATH${NC}"
        
        if [ ! -f "$POLYFILLS_PATH" ]; then
            echo -e "  ${YELLOW}⚠️  Polyfills file not found at specified path${NC}"
            echo -e "  ${YELLOW}💡 Consider removing polyfills reference if migrated${NC}"
        fi
    else
        echo -e "  ${GREEN}✅ No polyfills reference in angular.json (modern setup)${NC}"
    fi
fi

echo ""
if [ "$ISSUES" -eq 0 ]; then
    echo -e "${GREEN}✅ Zone.js flags migration looks good!${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Found $ISSUES issue(s)${NC}"
    exit 1
fi


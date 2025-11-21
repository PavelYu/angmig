#!/bin/bash
# 🔍 Check TypeScript Strict Mode Readiness
# Usage: ./scripts/check_typescript_strict.sh

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔍 TypeScript Strict Mode Readiness Check${NC}"
echo "==========================================="

if [ ! -f "tsconfig.json" ]; then
    echo -e "${RED}❌ tsconfig.json not found${NC}"
    exit 1
fi

if [ ! -d "src" ]; then
    echo -e "${YELLOW}⚠️  src/ directory not found. Skipping code analysis.${NC}"
    exit 0
fi

echo ""
echo -e "${YELLOW}📋 Current TypeScript Configuration:${NC}"

# Check current strict settings
STRICT_MODE=$(grep -o '"strict":\s*true' tsconfig.json)
NO_IMPLICIT_ANY=$(grep -o '"noImplicitAny":\s*true' tsconfig.json)
STRICT_NULL_CHECKS=$(grep -o '"strictNullChecks":\s*true' tsconfig.json)
STRICT_PROP_INIT=$(grep -o '"strictPropertyInitialization":\s*true' tsconfig.json)

if [ -n "$STRICT_MODE" ]; then
    echo -e "  ${GREEN}✅ strict: true${NC}"
else
    echo -e "  ${RED}❌ strict: false (or not set)${NC}"
fi

if [ -n "$NO_IMPLICIT_ANY" ]; then
    echo -e "  ${GREEN}✅ noImplicitAny: true${NC}"
else
    echo -e "  ${YELLOW}⚠️  noImplicitAny: false${NC}"
fi

if [ -n "$STRICT_NULL_CHECKS" ]; then
    echo -e "  ${GREEN}✅ strictNullChecks: true${NC}"
else
    echo -e "  ${YELLOW}⚠️  strictNullChecks: false${NC}"
fi

if [ -n "$STRICT_PROP_INIT" ]; then
    echo -e "  ${GREEN}✅ strictPropertyInitialization: true${NC}"
else
    echo -e "  ${YELLOW}⚠️  strictPropertyInitialization: false${NC}"
fi

echo ""
echo -e "${YELLOW}📊 Code Analysis:${NC}"

# Count 'any' types
ANY_COUNT=$(grep -rE ": any|as any" src --include="*.ts" 2>/dev/null | wc -l | tr -d ' ')
echo -e "  'any' type usage: ${RED}$ANY_COUNT${NC}"

# Count uninitialized properties (simple check)
UNINIT_PROP=$(grep -rE "^\s+\w+:\s*\w+;" src --include="*.ts" 2>/dev/null | grep -v "!" | wc -l | tr -d ' ')
echo -e "  Potentially uninitialized properties: ${YELLOW}$UNINIT_PROP${NC}"

# Count null/undefined checks
NULL_CHECKS=$(grep -rE "\?\." src --include="*.ts" 2>/dev/null | wc -l | tr -d ' ')
echo -e "  Optional chaining usage: ${GREEN}$NULL_CHECKS${NC} (good!)"

# Count non-null assertions
NON_NULL_ASSERT=$(grep -rE "!" src --include="*.ts" 2>/dev/null | grep -v "//" | wc -l | tr -d ' ')
echo -e "  Non-null assertions (!): ${YELLOW}$NON_NULL_ASSERT${NC}"

echo ""
if [ -z "$STRICT_MODE" ]; then
    echo -e "${RED}⚠️  Strict mode is not enabled${NC}"
    echo -e "${YELLOW}💡 To enable gradually:${NC}"
    echo "  1. Enable 'noImplicitAny' first"
    echo "  2. Fix all 'any' types"
    echo "  3. Enable 'strictNullChecks'"
    echo "  4. Enable 'strictPropertyInitialization'"
    echo "  5. Finally enable 'strict: true'"
    exit 1
else
    echo -e "${GREEN}✅ Strict mode is enabled!${NC}"
    if [ "$ANY_COUNT" -gt 0 ]; then
        echo -e "${YELLOW}💡 Consider reducing 'any' types for better type safety${NC}"
    fi
    exit 0
fi


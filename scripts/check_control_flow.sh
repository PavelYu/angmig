#!/bin/bash
# 🔍 Check Control Flow Migration Readiness
# Usage: ./scripts/check_control_flow.sh

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔍 Control Flow Migration Check${NC}"
echo "================================"

if [ ! -d "src" ]; then
    echo -e "${YELLOW}⚠️  src/ directory not found. Skipping scan.${NC}"
    exit 0
fi

echo ""
echo -e "${YELLOW}Scanning templates for legacy control flow...${NC}"
echo ""

# Count legacy directives
NG_IF=$(grep -r "\*ngIf" src --include="*.html" 2>/dev/null | wc -l | tr -d ' ')
NG_FOR=$(grep -r "\*ngFor" src --include="*.html" 2>/dev/null | wc -l | tr -d ' ')
NG_SWITCH=$(grep -r "\*ngSwitch" src --include="*.html" 2>/dev/null | wc -l | tr -d ' ')

# Count new control flow
CONTROL_IF=$(grep -rE "@if\s*\(" src --include="*.html" 2>/dev/null | wc -l | tr -d ' ')
CONTROL_FOR=$(grep -rE "@for\s*\(" src --include="*.html" 2>/dev/null | wc -l | tr -d ' ')
CONTROL_SWITCH=$(grep -rE "@switch\s*\(" src --include="*.html" 2>/dev/null | wc -l | tr -d ' ')

TOTAL_LEGACY=$((NG_IF + NG_FOR + NG_SWITCH))
TOTAL_NEW=$((CONTROL_IF + CONTROL_FOR + CONTROL_SWITCH))

echo -e "${BLUE}Legacy Control Flow:${NC}"
echo -e "  *ngIf:   ${RED}$NG_IF${NC}"
echo -e "  *ngFor:  ${RED}$NG_FOR${NC}"
echo -e "  *ngSwitch: ${RED}$NG_SWITCH${NC}"
echo -e "  ${YELLOW}Total: $TOTAL_LEGACY${NC}"

echo ""
echo -e "${BLUE}New Control Flow:${NC}"
echo -e "  @if:   ${GREEN}$CONTROL_IF${NC}"
echo -e "  @for:  ${GREEN}$CONTROL_FOR${NC}"
echo -e "  @switch: ${GREEN}$CONTROL_SWITCH${NC}"
echo -e "  ${GREEN}Total: $TOTAL_NEW${NC}"

echo ""

if [ "$TOTAL_LEGACY" -eq 0 ]; then
    echo -e "${GREEN}✅ All templates use new control flow!${NC}"
    exit 0
elif [ "$TOTAL_NEW" -gt 0 ]; then
    MIGRATION_PERCENT=$((TOTAL_NEW * 100 / (TOTAL_LEGACY + TOTAL_NEW)))
    echo -e "${YELLOW}📊 Migration Progress: $MIGRATION_PERCENT%${NC}"
    echo ""
    echo -e "${YELLOW}💡 To migrate remaining templates:${NC}"
    echo "  ng generate @angular/core:control-flow"
    exit 1
else
    echo -e "${RED}⚠️  No new control flow found${NC}"
    echo ""
    echo -e "${YELLOW}💡 To start migration:${NC}"
    echo "  ng generate @angular/core:control-flow"
    exit 1
fi


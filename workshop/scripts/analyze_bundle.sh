#!/bin/bash
# 📊 Analyze Bundle Size
# Usage: ./scripts/analyze_bundle.sh [build_output_dir]

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

BUILD_DIR=${1:-"dist/msp-multisnap"}

echo -e "${BLUE}📊 Bundle Size Analyzer${NC}"
echo "============================"

# Check if build directory exists
if [ ! -d "$BUILD_DIR" ]; then
    echo -e "${YELLOW}⚠️  Build directory not found: $BUILD_DIR${NC}"
    echo -e "${YELLOW}💡 Run 'npm run build' first${NC}"
    exit 1
fi

# Find main bundle files
MAIN_JS=$(find "$BUILD_DIR" -name "main*.js" -type f | head -1)
VENDOR_JS=$(find "$BUILD_DIR" -name "vendor*.js" -type f | head -1)
POLYFILLS_JS=$(find "$BUILD_DIR" -name "polyfills*.js" -type f | head -1)
STYLES_CSS=$(find "$BUILD_DIR" -name "styles*.css" -type f | head -1)

echo ""
echo -e "${YELLOW}📦 Bundle Files:${NC}"
echo ""

# Function to format file size
format_size() {
    local bytes=$1
    if [ "$bytes" -gt 1048576 ]; then
        echo "$(echo "scale=2; $bytes/1048576" | bc)MB"
    elif [ "$bytes" -gt 1024 ]; then
        echo "$(echo "scale=2; $bytes/1024" | bc)KB"
    else
        echo "${bytes}B"
    fi
}

# Function to analyze file
analyze_file() {
    local file=$1
    local name=$2
    
    if [ -f "$file" ]; then
        SIZE=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        FORMATTED=$(format_size $SIZE)
        
        # Check against budgets
        SIZE_KB=$((SIZE / 1024))
        SIZE_MB=$((SIZE / 1048576))
        
        if [ "$SIZE_MB" -gt 8 ]; then
            echo -e "  ${RED}$name: $FORMATTED ⚠️  EXCEEDS 8MB BUDGET${NC}"
        elif [ "$SIZE_MB" -gt 5 ]; then
            echo -e "  ${YELLOW}$name: $FORMATTED ⚠️  Large${NC}"
        else
            echo -e "  ${GREEN}$name: $FORMATTED${NC}"
        fi
    else
        echo -e "  ${YELLOW}$name: Not found${NC}"
    fi
}

analyze_file "$MAIN_JS" "main.js"
analyze_file "$VENDOR_JS" "vendor.js"
analyze_file "$POLYFILLS_JS" "polyfills.js"
analyze_file "$STYLES_CSS" "styles.css"

# Calculate total
TOTAL_SIZE=0
for file in "$MAIN_JS" "$VENDOR_JS" "$POLYFILLS_JS" "$STYLES_CSS"; do
    if [ -f "$file" ]; then
        SIZE=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        TOTAL_SIZE=$((TOTAL_SIZE + SIZE))
    fi
done

echo ""
echo -e "${BLUE}📈 Total Bundle Size: $(format_size $TOTAL_SIZE)${NC}"

# Check against angular.json budgets
if [ -f "angular.json" ]; then
    MAX_WARNING=$(grep -oP '"maximumWarning":\s*"\K[\d.]+' angular.json | head -1)
    MAX_ERROR=$(grep -oP '"maximumError":\s*"\K[\d.]+' angular.json | head -1)
    
    if [ -n "$MAX_WARNING" ] && [ -n "$MAX_ERROR" ]; then
        TOTAL_MB=$((TOTAL_SIZE / 1048576))
        echo -e "${YELLOW}Budget: Warning at ${MAX_WARNING}MB, Error at ${MAX_ERROR}MB${NC}"
        
        if [ "$TOTAL_MB" -gt "${MAX_ERROR%.*}" ]; then
            echo -e "${RED}❌ EXCEEDS ERROR BUDGET${NC}"
        elif [ "$TOTAL_MB" -gt "${MAX_WARNING%.*}" ]; then
            echo -e "${YELLOW}⚠️  EXCEEDS WARNING BUDGET${NC}"
        else
            echo -e "${GREEN}✅ Within budget${NC}"
        fi
    fi
fi

echo ""
echo -e "${YELLOW}💡 Tips to reduce bundle size:${NC}"
echo "  - Use @defer for lazy loading"
echo "  - Replace moment.js with date-fns"
echo "  - Use tree-shakeable lodash imports"
echo "  - Check for duplicate dependencies"


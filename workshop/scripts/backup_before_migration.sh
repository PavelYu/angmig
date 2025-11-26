#!/bin/bash
# 💾 Create Backup Before Migration
# Usage: ./scripts/backup_before_migration.sh [backup_name]

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

BACKUP_NAME=${1:-"backup-$(date +%Y%m%d-%H%M%S)"}
BACKUP_DIR="backups/$BACKUP_NAME"

echo -e "${BLUE}💾 Creating Migration Backup${NC}"
echo "=============================="

# Create backup directory
mkdir -p "$BACKUP_DIR"

echo -e "${YELLOW}📦 Backing up critical files...${NC}"

# Backup package files
if [ -f "package.json" ]; then
    cp package.json "$BACKUP_DIR/"
    echo -e "  ${GREEN}✅ package.json${NC}"
fi

if [ -f "package-lock.json" ]; then
    cp package-lock.json "$BACKUP_DIR/"
    echo -e "  ${GREEN}✅ package-lock.json${NC}"
fi

# Backup Angular config
if [ -f "angular.json" ]; then
    cp angular.json "$BACKUP_DIR/"
    echo -e "  ${GREEN}✅ angular.json${NC}"
fi

# Backup TypeScript config
if [ -f "tsconfig.json" ]; then
    cp tsconfig.json "$BACKUP_DIR/"
    echo -e "  ${GREEN}✅ tsconfig.json${NC}"
fi

# Backup source directory (if exists)
if [ -d "src" ]; then
    echo -e "  ${YELLOW}📁 Backing up src/ directory (this may take a while)...${NC}"
    tar -czf "$BACKUP_DIR/src-backup.tar.gz" src/ 2>/dev/null
    if [ $? -eq 0 ]; then
        echo -e "  ${GREEN}✅ src/ directory${NC}"
    else
        echo -e "  ${RED}❌ Failed to backup src/${NC}"
    fi
fi

# Create backup manifest
cat > "$BACKUP_DIR/manifest.txt" << EOF
Migration Backup Created: $(date)
Backup Name: $BACKUP_NAME
Git Branch: $(git branch --show-current 2>/dev/null || echo "unknown")
Git Commit: $(git rev-parse HEAD 2>/dev/null || echo "unknown")

Files Backed Up:
- package.json
- package-lock.json
- angular.json
- tsconfig.json
- src/ (if exists)

To restore:
  cp $BACKUP_DIR/package.json .
  cp $BACKUP_DIR/package-lock.json .
  cp $BACKUP_DIR/angular.json .
  cp $BACKUP_DIR/tsconfig.json .
  tar -xzf $BACKUP_DIR/src-backup.tar.gz (if needed)
EOF

echo ""
echo -e "${GREEN}✅ Backup created: $BACKUP_DIR${NC}"
echo -e "${BLUE}📄 Manifest: $BACKUP_DIR/manifest.txt${NC}"
echo ""
echo -e "${YELLOW}💡 To restore this backup, see manifest.txt${NC}"


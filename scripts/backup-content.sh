#!/bin/bash
# Backup content before any bulk edits
# Usage: ./scripts/backup-content.sh [backup-name]

BACKUP_DIR="backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="${1:-content}_${TIMESTAMP}"

mkdir -p "$BACKUP_DIR"

# Backup content directory
tar -czf "$BACKUP_DIR/${BACKUP_NAME}.tar.gz" content/

# Also create a git stash as safety
git stash push -m "Auto-backup before bulk edit: $BACKUP_NAME" -- content/

echo "Backup created: $BACKUP_DIR/${BACKUP_NAME}.tar.gz"
echo "Git stash also created for safety"
echo ""
echo "To restore from tar: tar -xzf $BACKUP_DIR/${BACKUP_NAME}.tar.gz"
echo "To restore from git: git stash pop"

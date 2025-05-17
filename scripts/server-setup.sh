#!/bin/bash

# Get the latest deployment zip file
LATEST_ZIP=$(ls -t deploy_*.zip | head -n1)

if [ -z "$LATEST_ZIP" ]; then
    echo "No deployment package found!"
    exit 1
fi

# Create backup of current deployment
echo "Creating backup of current deployment..."
if [ -d "/var/www/frontend" ]; then
    BACKUP_DIR="/var/www/backups/frontend_$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    cp -r /var/www/frontend/* "$BACKUP_DIR"
    echo "Backup created at: $BACKUP_DIR"
fi

# Create application directory if it doesn't exist
echo "Creating application directory..."
mkdir -p /var/www/frontend

# Extract the zip file
echo "Extracting deployment package: $LATEST_ZIP..."
unzip -o "$LATEST_ZIP" -d /var/www/frontend

# Navigate to application directory
cd /var/www/frontend

# Install dependencies
echo "Installing dependencies..."
npm install --production

# Set proper permissions
echo "Setting permissions..."
chown -R www-data:www-data /var/www/frontend
chmod -R 755 /var/www/frontend

# Restart the application
echo "Restarting application..."
pm2 delete frontend || true
pm2 start npm --name "frontend" -- start

# Clean up old zip files (keep last 5)
echo "Cleaning up old deployment packages..."
ls -t deploy_*.zip | tail -n +6 | xargs -r rm

echo "Deployment completed successfully!" 
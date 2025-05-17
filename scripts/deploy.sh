#!/bin/bash

# Build the application
echo "Building the application..."
npm run build

# Create a deployment directory
echo "Creating deployment directory..."
mkdir -p deploy

# Copy necessary files to deploy directory
echo "Copying files to deploy directory..."
cp -r .next deploy/
cp -r public deploy/
cp -r app deploy/
cp -r components deploy/
cp -r contexts deploy/
cp -r lib deploy/
cp -r services deploy/
cp -r styles deploy/
cp -r types deploy/
cp -r i18n deploy/
cp package.json deploy/
cp package-lock.json deploy/
cp next.config.js deploy/
cp tsconfig.json deploy/
cp tailwind.config.js deploy/
cp postcss.config.js deploy/
cp .env deploy/

# Create zip file with timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
echo "Creating zip file..."
cd deploy
zip -r ../deploy_${TIMESTAMP}.zip .
cd ..

# Clean up deploy directory
echo "Cleaning up..."
rm -rf deploy

echo "Deployment package created: deploy_${TIMESTAMP}.zip" 
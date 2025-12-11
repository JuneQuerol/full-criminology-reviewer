#!/bin/bash
set -e

# Clean
echo "Cleaning..."
rm -rf .next node_modules

# Install
echo "Installing..."
npm install

# Build
echo "Building..."
export NODE_ENV=production
npm run build

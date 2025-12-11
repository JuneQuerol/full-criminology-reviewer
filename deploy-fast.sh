#!/bin/bash
set -e

echo "=== 🚀 Fast Deployment: crim.pinoyreviewer.com (Tarball Method) ==="

# Variables
REMOTE_USER="cpejune"
REMOTE_HOST="v2202510306811391443.supersrv.de"
REMOTE_DIR="~/websites/crim.pinoyreviewer.com"
SSH_KEY="~/.ssh/id_ed25519"
TAR_NAME="deploy-crim.tar.gz"

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Step 1: Install dependencies and build
echo "📦 Step 1: Installing dependencies..."
npm install

echo "🔨 Step 2: Building Next.js app..."
export NODE_ENV=production
npm run build

# Step 3: Create Tarball
echo "🗜️ Step 3: Creating tarball..."
tar -czf $TAR_NAME \
  .next \
  public \
  package.json \
  package-lock.json \
  next.config.js \
  content \
  Dockerfile

# Step 4: Upload Tarball
echo "📤 Step 4: Uploading tarball to server..."
ssh -i $SSH_KEY $REMOTE_USER@$REMOTE_HOST "mkdir -p $REMOTE_DIR"
scp -i $SSH_KEY $TAR_NAME $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/

# Step 5: Upload Kubernetes manifests
echo "📄 Step 5: Uploading Kubernetes manifests..."
scp -i $SSH_KEY kubernetes/crim-deployment.yml kubernetes/crim-ingress.yml $REMOTE_USER@$REMOTE_HOST:~/ 

# Step 6: Deploy on Server
echo "🚀 Step 6: Deploying on server..."
ssh -i $SSH_KEY $REMOTE_USER@$REMOTE_HOST << EOF
  cd $REMOTE_DIR
  
  echo "Extracting tarball..."
  tar -xzf $TAR_NAME
  rm $TAR_NAME

  echo "Building Docker image..."
  sudo docker build -t crim-pinoyreviewer:latest .
  
  # Prune old images to save space (optional)
  sudo docker image prune -f

  echo "Updating Kubernetes..."
  sudo kubectl apply -f ~/crim-deployment.yml
  sudo kubectl apply -f ~/crim-ingress.yml
  
  echo "Rolling out restart..."
  sudo kubectl rollout restart deployment/crim-pinoyreviewer-deployment
  sudo kubectl rollout status deployment/crim-pinoyreviewer-deployment --timeout=120s
EOF

# Cleanup local tarball
rm $TAR_NAME

echo "✅ Deployment complete! Check https://crim.pinoyreviewer.com"

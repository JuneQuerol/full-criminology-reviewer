#!/bin/bash
set -e

echo "=== Deploying crim.pinoyreviewer.com ==="

# Variables
REMOTE_USER="cpejune"
REMOTE_HOST="v2202510306811391443.supersrv.de"
REMOTE_DIR="~/websites/crim.pinoyreviewer.com"
SSH_KEY="~/.ssh/id_ed25519"

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Step 1: Install dependencies and build
echo "Step 1: Installing dependencies..."
npm install

echo "Step 2: Building Next.js app..."
export NODE_ENV=production
npm run build

# Step 3: Create remote directory and upload files
echo "Step 3: Uploading files to server..."
ssh -i $SSH_KEY $REMOTE_USER@$REMOTE_HOST "mkdir -p $REMOTE_DIR"

scp -i $SSH_KEY -r \
  .next \
  package.json \
  package-lock.json \
  public \
  content \
  Dockerfile \
  $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/

# Step 4: Upload kubernetes manifests
echo "Step 4: Uploading Kubernetes manifests..."
scp -i $SSH_KEY \
  kubernetes/crim-deployment.yml \
  kubernetes/crim-ingress.yml \
  $REMOTE_USER@$REMOTE_HOST:~/

# Step 5: Build Docker image on server
echo "Step 5: Building Docker image on server..."
ssh -i $SSH_KEY $REMOTE_USER@$REMOTE_HOST << 'EOF'
cd ~/websites/crim.pinoyreviewer.com
sudo docker build --no-cache -t crim-pinoyreviewer:latest .
EOF

# Step 6: Apply Kubernetes manifests
echo "Step 6: Applying Kubernetes manifests..."
ssh -i $SSH_KEY $REMOTE_USER@$REMOTE_HOST << 'EOF'
sudo kubectl apply -f ~/crim-deployment.yml
sudo kubectl apply -f ~/crim-ingress.yml
echo "Waiting for deployment to roll out..."
sudo kubectl rollout status deployment/crim-pinoyreviewer-deployment --timeout=120s
EOF

# Step 7: Verify
echo "Step 7: Verifying deployment..."
ssh -i $SSH_KEY $REMOTE_USER@$REMOTE_HOST << 'EOF'
echo "=== Pods ==="
sudo kubectl get pods -l app=crim-pinoyreviewer
echo ""
echo "=== Service ==="
sudo kubectl get svc crim-pinoyreviewer-service
echo ""
echo "=== Ingress ==="
sudo kubectl get ingress crim-pinoyreviewer-ingress
EOF

echo ""
echo "=== Deployment complete! ==="
echo "Site will be available at: https://crim.pinoyreviewer.com"
echo ""
echo "NOTE: Make sure DNS A record for 'crim' points to your server IP"

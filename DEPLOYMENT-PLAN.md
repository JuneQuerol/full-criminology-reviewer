# Deployment Plan: crim.pinoyreviewer.com

**Project:** Criminology Board Exam Full Reviewer
**Stack:** Next.js 14.2.3 + React 18 + Tailwind CSS
**Target:** https://crim.pinoyreviewer.com
**Server:** Same k3s cluster as pinoyreviewer.com

---

## Project Overview

| Item | Details |
|------|---------|
| Framework | Next.js 14.2.3 (App Router) |
| Content | 38 markdown modules (Criminal Law, Procedure, Evidence, Special Laws) |
| Features | Search, Progress tracking, Practice exams |
| Routes | `/part-1` through `/part-5`, `/practice`, `/search`, `/progress` |

---

## Deployment Steps

### Phase 1: Prepare Kubernetes Manifests

#### 1.1 Create Dockerfile
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/content ./content
EXPOSE 3000
CMD ["node", "server.js"]
```

#### 1.2 Create Kubernetes Deployment (`kubernetes/crim-deployment.yml`)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: crim-pinoyreviewer-deployment
  labels:
    app: crim-pinoyreviewer
spec:
  replicas: 1
  selector:
    matchLabels:
      app: crim-pinoyreviewer
  template:
    metadata:
      labels:
        app: crim-pinoyreviewer
    spec:
      containers:
      - name: crim-app
        image: crim-pinoyreviewer:latest
        imagePullPolicy: Never
        ports:
        - containerPort: 3000
          name: http
        env:
        - name: NODE_ENV
          value: "production"
        - name: PORT
          value: "3000"
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: crim-pinoyreviewer-service
spec:
  selector:
    app: crim-pinoyreviewer
  ports:
  - port: 80
    targetPort: 3000
    protocol: TCP
  type: ClusterIP
```

#### 1.3 Create Kubernetes Ingress (`kubernetes/crim-ingress.yml`)
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: crim-pinoyreviewer-ingress
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - crim.pinoyreviewer.com
    secretName: crim-pinoyreviewer-tls
  rules:
  - host: crim.pinoyreviewer.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: crim-pinoyreviewer-service
            port:
              number: 80
```

---

### Phase 2: Update next.config.js for Standalone Output

Add to `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
}

module.exports = nextConfig
```

---

### Phase 3: DNS Configuration

Add DNS A record at your domain registrar:
```
Type: A
Name: crim
Value: <server-ip>
TTL: 3600
```

---

### Phase 4: Deploy Script (`deploy-crim.sh`)

```bash
#!/bin/bash
set -e

echo "=== Deploying crim.pinoyreviewer.com ==="

# Variables
REMOTE_USER="cpejune"
REMOTE_HOST="v2202510306811391443.supersrv.de"
REMOTE_DIR="~/websites/crim.pinoyreviewer.com"
SSH_KEY="~/.ssh/id_ed25519"

# Step 1: Build locally
echo "Building Next.js app..."
cd crim.pinoyreviewer.com
npm ci
npm run build

# Step 2: Upload to server
echo "Uploading files to server..."
ssh -i $SSH_KEY $REMOTE_USER@$REMOTE_HOST "mkdir -p $REMOTE_DIR"
scp -i $SSH_KEY -r .next package.json package-lock.json public content Dockerfile \
  $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/

# Step 3: Build Docker image on server
echo "Building Docker image..."
ssh -i $SSH_KEY $REMOTE_USER@$REMOTE_HOST << 'EOF'
cd ~/websites/crim.pinoyreviewer.com
sudo docker build --no-cache -t crim-pinoyreviewer:latest .
EOF

# Step 4: Apply Kubernetes manifests
echo "Applying Kubernetes manifests..."
scp -i $SSH_KEY kubernetes/crim-deployment.yml kubernetes/crim-ingress.yml \
  $REMOTE_USER@$REMOTE_HOST:~/

ssh -i $SSH_KEY $REMOTE_USER@$REMOTE_HOST << 'EOF'
sudo kubectl apply -f ~/crim-deployment.yml
sudo kubectl apply -f ~/crim-ingress.yml
sudo kubectl rollout restart deployment/crim-pinoyreviewer-deployment
EOF

echo "=== Deployment complete! ==="
echo "Site will be available at: https://crim.pinoyreviewer.com"
echo "Check status: kubectl get pods -l app=crim-pinoyreviewer"
```

---

### Phase 5: Execution Order

| Step | Action | Command |
|------|--------|---------|
| 1 | Create Dockerfile | Copy from Phase 1.1 |
| 2 | Update next.config.js | Add `output: 'standalone'` |
| 3 | Create kubernetes/ folder | `mkdir kubernetes` |
| 4 | Create deployment manifest | Copy from Phase 1.2 |
| 5 | Create ingress manifest | Copy from Phase 1.3 |
| 6 | Add DNS record | At domain registrar |
| 7 | Create deploy script | Copy from Phase 4 |
| 8 | Run deployment | `bash deploy-crim.sh` |
| 9 | Verify | Visit https://crim.pinoyreviewer.com |

---

## Verification Checklist

- [ ] Dockerfile created and working
- [ ] next.config.js has `output: 'standalone'`
- [ ] Kubernetes manifests created
- [ ] DNS A record pointing to server
- [ ] Docker image built on server
- [ ] Pods running: `kubectl get pods -l app=crim-pinoyreviewer`
- [ ] Service created: `kubectl get svc crim-pinoyreviewer-service`
- [ ] Ingress created: `kubectl get ingress crim-pinoyreviewer-ingress`
- [ ] TLS certificate issued: `kubectl get certificate`
- [ ] Site accessible at https://crim.pinoyreviewer.com

---

## Rollback Procedure

If something goes wrong:

```bash
# Delete deployment
kubectl delete deployment crim-pinoyreviewer-deployment
kubectl delete service crim-pinoyreviewer-service
kubectl delete ingress crim-pinoyreviewer-ingress

# Rebuild and redeploy
docker build --no-cache -t crim-pinoyreviewer:latest .
kubectl apply -f crim-deployment.yml
kubectl apply -f crim-ingress.yml
```

---

## Notes

- **No database required** - Content is markdown-based
- **Progress tracking** - Uses localStorage (client-side)
- **Same cluster** - Shares infrastructure with pinoyreviewer.com
- **Separate subdomain** - Independent deployment, won't affect main site

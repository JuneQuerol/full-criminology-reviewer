# Gemini Deployment Guide for crim.pinoyreviewer.com

## SSH Access
```bash
ssh -i ~/.ssh/gemini_deploy gemini@v2202510306811391443.supersrv.de
```

## Deployment Commands

### Check Status
```bash
sudo kubectl get pods -l app=crim-pinoyreviewer
sudo kubectl logs -l app=crim-pinoyreviewer --tail=20
```

### Restart Pod (Quick Redeploy)
```bash
sudo kubectl delete pod -l app=crim-pinoyreviewer
```

### Full Redeploy (After New Build)
```bash
# On server, rebuild docker image
cd ~/websites/crim.pinoyreviewer.com
sudo docker build --no-cache -t crim-pinoyreviewer:latest .

# Restart deployment
sudo kubectl rollout restart deployment/crim-pinoyreviewer-deployment

# Watch status
sudo kubectl rollout status deployment/crim-pinoyreviewer-deployment
```

### Apply Config Changes
```bash
sudo kubectl apply -f ~/crim-deployment.yml
sudo kubectl apply -f ~/crim-ingress.yml
```

### View All Resources
```bash
sudo kubectl get all -l app=crim-pinoyreviewer
sudo kubectl get ingress crim-pinoyreviewer-ingress
sudo kubectl get certificate | grep crim
```

## File Locations on Server
- Website files: `~/websites/crim.pinoyreviewer.com/`
- K8s manifests: `~/crim-deployment.yml`, `~/crim-ingress.yml`
- Docker image: `crim-pinoyreviewer:latest`

## Troubleshooting
```bash
# Detailed pod info
sudo kubectl describe pod -l app=crim-pinoyreviewer

# Full logs
sudo kubectl logs -l app=crim-pinoyreviewer --all-containers

# Check events
sudo kubectl get events --sort-by='.lastTimestamp' | grep crim
```

# 🚀 Deployment Guide

> Comprehensive Guide for Deploying Projects Built with GitHub Project Blueprint

**Version**: 2.1.0-20260304-Selasa-23:48 WIB  
**Last Updated**: 2026-03-04  
**Maintained by**: waktuberhenti  
**Status**: Phase 4 - Polish

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Deployment Strategies](#deployment-strategies)
3. [Docker Deployment](#docker-deployment)
4. [Kubernetes Deployment](#kubernetes-deployment)
5. [Cloud Platforms](#cloud-platforms)
6. [CI/CD Integration](#cicd-integration)
7. [Environment Configuration](#environment-configuration)
8. [Monitoring & Logging](#monitoring--logging)
9. [Rollback Procedures](#rollback-procedures)

---

## 🎯 Overview

This document provides comprehensive guidance for deploying projects initialized with the GitHub Project Blueprint across various environments and platforms.

### Deployment Philosophy

- **Consistency**: Identical deployments across environments
- **Automation**: Minimize manual intervention
- **Scalability**: Handle varying load requirements
- **Reliability**: Ensure high availability and fault tolerance
- **Security**: Follow security best practices

---

## 📊 Deployment Strategies

### Strategy Comparison

| Strategy | Complexity | Scalability | Best For | Cost |
|----------|------------|-------------|----------|------|
| **Docker** | Low | Medium | Development, Small Projects | Low |
| **Kubernetes** | High | High | Enterprise, Microservices | Medium-High |
| **Serverless** | Medium | Auto | Event-driven, Variable Load | Pay-per-use |
| **VPS/VM** | Medium | Manual | Traditional Applications | Fixed |

### Recommended Approach

```
Development → Staging → Production
     ↓            ↓           ↓
  Docker      Kubernetes   Cloud Native
```

---

## 🐳 Docker Deployment

### Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- 2GB RAM minimum
- 10GB disk space

### Dockerfile Template

```dockerfile
# Multi-stage build for production optimization
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS production

# Security: Run as non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs . .

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["npm", "start"]
```

### Docker Compose Configuration

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
    env_file:
      - .env.production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      app:
        condition: service_healthy
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    volumes:
      - redis-data:/data
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  redis-data:
```

### Docker Deployment Commands

```bash
# Build image
docker build -t myapp:v1.0.0 .

# Run container
docker run -d \
  --name myapp \
  -p 3000:3000 \
  --env-file .env.production \
  --restart unless-stopped \
  myapp:v1.0.0

# Docker Compose deployment
docker-compose -f docker-compose.yml up -d

# Scale services
docker-compose up -d --scale app=3

# View logs
docker-compose logs -f app
```

---

## ☸️ Kubernetes Deployment

### Prerequisites

- Kubernetes cluster 1.25+
- kubectl configured
- Helm 3.0+ (optional)

### Kubernetes Manifests

#### Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
  labels:
    app: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myregistry/myapp:v1.0.0
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

#### Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: ClusterIP
```

#### Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - myapp.example.com
    secretName: myapp-tls
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp-service
            port:
              number: 80
```

### kubectl Commands

```bash
# Apply manifests
kubectl apply -f k8s/

# Check deployment status
kubectl get deployments
kubectl get pods
kubectl get services

# View logs
kubectl logs -f deployment/myapp-deployment

# Scale deployment
kubectl scale deployment myapp-deployment --replicas=5

# Rollout status
kubectl rollout status deployment/myapp-deployment

# Rollback
kubectl rollout undo deployment/myapp-deployment
```

---

## ☁️ Cloud Platforms

### AWS Deployment

#### Elastic Beanstalk

```bash
# Initialize EB
eb init -p nodejs-18 myapp

# Create environment
eb create production-env

# Deploy
eb deploy

# Open application
eb open
```

#### ECS (Elastic Container Service)

```bash
# Build and push to ECR
aws ecr get-login-password | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

docker build -t myapp .
docker tag myapp:latest $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/myapp:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/myapp:latest

# Deploy to ECS
aws ecs update-service --cluster myapp-cluster --service myapp-service --force-new-deployment
```

### Google Cloud Platform

```bash
# Build with Cloud Build
gcloud builds submit --tag gcr.io/PROJECT_ID/myapp

# Deploy to Cloud Run
gcloud run deploy myapp \
  --image gcr.io/PROJECT_ID/myapp \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Azure

```bash
# Build and push to ACR
az acr build --registry myregistry --image myapp:latest .

# Deploy to Container Instances
az container create \
  --resource-group myResourceGroup \
  --name myapp \
  --image myregistry.azurecr.io/myapp:latest \
  --cpu 1 \
  --memory 1 \
  --ports 3000
```

---

## 🔄 CI/CD Integration

### GitHub Actions Deployment

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Build Docker Image
      run: docker build -t myapp:${{ github.sha }} .
    
    - name: Push to Registry
      run: |
        echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
        docker push myapp:${{ github.sha }}
    
    - name: Deploy to Kubernetes
      run: |
        kubectl set image deployment/myapp-deployment myapp=myapp:${{ github.sha }}
        kubectl rollout status deployment/myapp-deployment
```

---

## ⚙️ Environment Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | Yes | `production` |
| `PORT` | Application port | No | `3000` |
| `DATABASE_URL` | Database connection string | Yes | - |
| `REDIS_URL` | Redis connection string | No | - |
| `LOG_LEVEL` | Logging level | No | `info` |

### Configuration Files

```
config/
├── default.json          # Default configuration
├── production.json       # Production overrides
├── staging.json          # Staging overrides
└── custom-environment-variables.json  # Env mapping
```

---

## 📊 Monitoring & Logging

### Health Checks

Implement health check endpoints:

```javascript
// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
    uptime: process.uptime()
  });
});

// Readiness check
app.get('/ready', async (req, res) => {
  const checks = await Promise.all([
    checkDatabase(),
    checkRedis(),
    checkExternalServices()
  ]);
  
  const allReady = checks.every(check => check.ready);
  
  res.status(allReady ? 200 : 503).json({
    ready: allReady,
    checks: checks
  });
});
```

### Logging Best Practices

- Use structured logging (JSON format)
- Include correlation IDs
- Log at appropriate levels
- Avoid logging sensitive data

---

## ↩️ Rollback Procedures

### Docker Rollback

```bash
# List previous versions
docker images myapp --format "{{.Tag}}"

# Rollback to previous version
docker stop myapp
docker rm myapp
docker run -d --name myapp -p 3000:3000 myapp:previous-version
```

### Kubernetes Rollback

```bash
# View rollout history
kubectl rollout history deployment/myapp-deployment

# Rollback to previous version
kubectl rollout undo deployment/myapp-deployment

# Rollback to specific revision
kubectl rollout undo deployment/myapp-deployment --to-revision=2
```

---

## 🔐 Security Checklist

- [ ] Use non-root user in containers
- [ ] Scan images for vulnerabilities
- [ ] Use secrets management
- [ ] Enable TLS/SSL
- [ ] Implement network policies
- [ ] Regular security updates
- [ ] Use read-only filesystems where possible

---

## 📚 Related Documentation

- [Architecture](ARCHITECTURE.md) - System architecture overview
- [Development Guide](DEVELOPMENT_GUIDE.md) - Development workflows
- [Security](SECURITY.md) - Security policies and procedures

---

## 🔗 Reference Links

*For more detailed information on deployment strategies and best practices, please refer to the following resources:*

- *[Docker Documentation](https://docs.docker.com/)*
- *[Kubernetes Documentation](https://kubernetes.io/docs/)*
- *[AWS Deployment Best Practices](https://aws.amazon.com/architecture/)*
- *[Google Cloud Deployment](https://cloud.google.com/docs)*
- *[Azure Deployment Guide](https://docs.microsoft.com/en-us/azure/)*
- *[The Twelve-Factor App](https://12factor.net/)*
- *[DevOps Best Practices](https://www.atlassian.com/devops)*

---

<div align="center">

**[⬆ Back to Top](#-deployment-guide)**

*Last Updated: 2.1.0-20260304-Selasa-23:48 WIB*

**Maintained by waktuberhenti**

</div>

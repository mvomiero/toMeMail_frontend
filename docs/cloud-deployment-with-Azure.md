# **Frontend Deployment with Azure Static Web App**

## **Overview**
The **toMeMail frontend** is an **Angular application** deployed on **Azure Static Web Apps**, a service optimized for hosting static sites. Deployment is automated via **GitHub Actions**, ensuring seamless updates.

## **Deployment Process**
### **Azure Static Web Apps**

- Automatically builds and deploys updates from **GitHub Actions**.

### **GitHub Actions Workflow**
Every push to `main` triggers:
1. **Building** the Angular app with production settings.
2. **Uploading** the static files to Azure.
3. **Deploying** the new version automatically.

[Workflow file](https://github.com/mvomiero/toMeMail_frontend/blob/main/.github/workflows/deploy-angular.yml)

## **Profiles: Local vs. Production**
The frontend adapts to different environments:

- **Local (`environment.ts`)** → Uses a **locally running backend** (`http://localhost:8080/api`).
- **Production (`environment.prod.ts`)** → Connects to the **deployed Azure backend** (`https://tome-mail-backend.azurewebsites.net/api`).

Angular automatically switches profiles based on the build:
```bash
ng build --configuration=production # same as npm run build --configuration=production
```

```json
"configurations": {
  "production": {
    "fileReplacements": [
      { "replace": "src/environments/environment.ts", "with": "src/environments/environment.prod.ts" }
    ]
  }
}
```

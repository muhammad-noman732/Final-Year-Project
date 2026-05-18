# GCUF Intelligent Fee Management — ML Integration & Deployment Guide

This guide provides the complete, production-grade architecture, operation procedures, and deployment setup for the FastAPI Machine Learning Engine (`ml_server.py`) within the GCUF multi-tenant SaaS application.

---

## 1. Architectural Blueprint: Next.js API Proxy Pattern

### ❌ What NOT to Do (Direct Frontend Calls)
Do not attempt to call the FastAPI server directly from the user's browser (e.g., `fetch("http://localhost:8000/forecast")` or `fetch("http://<vps-ip>:8000/forecast")`).
*   **Security Risk:** It exposes database access (the ML service connects directly to PostgreSQL using `DATABASE_URL`). Exposing port `8000` to the public internet makes it vulnerable.
*   **CORS Issues:** Browsers block requests to different ports/domains unless complex CORS rules are configured.
*   **Network Isolation:** In production (Docker Compose), the ML service runs on a private internal bridge network (`backend_network`) and has no public IP or public port binding.

###  What to Do (Next.js Backend Proxy)
The Next.js App Router serves as a secure, authenticated gateway.

```
┌────────────────────────┐              ┌────────────────────────┐              ┌────────────────────────┐
│     Client Browser     │ ───────────> │   Next.js API Route    │ ───────────> │   FastAPI ML Server    │
│                        │   (Public)   │   /api/ml/forecast     │  (Internal)  │   http://ml:8000       │
└────────────────────────┘              └────────────────────────┘              └────────────────────────┘
          ▲                                         │                                       │
          │ (JSON Response)                         │ (Checks Role & JWT)                   │ (Runs SQL query & ML)
          └─────────────────────────────────────────┴───────────────────────────────────────┼──────────────────────┐
                                                                                            ▼                      │
                                                                                ┌────────────────────────┐         │
                                                                                │      PostgreSQL DB     │ <───────┘
                                                                                └────────────────────────┘
```

1.  **Authentication & Authorization:** Next.js parses the secure httpOnly cookie (JWT), verifies the user’s role (`VC` or `ADMIN`), and rejects unauthorized requests before they ever hit the ML service.
2.  **Internal Networking:** Next.js sends an internal, lightweight request to the FastAPI container using Docker's internal DNS (`http://ml:8000`).
3.  **Clean Architecture:** The frontend calls standard relative endpoints (e.g., `/api/ml/forecast`) like any other route.

---

## 2. Next.js Proxy Routes Implementation

To operationalize this, you should create the following three lightweight API proxy files in your Next.js application:

### A. Define Environment Variable
Add the following to `lib/env.ts` under your schema to ensure the app crashes on startup if the ML URL is misconfigured:
```typescript
ML_SERVICE_URL: z.string().url().default("http://ml:8000"),
```
Add to your local `.env`:
```bash
ML_SERVICE_URL="http://localhost:8000"
```
And to your VPS production `.env`:
```bash
ML_SERVICE_URL="http://ml:8000"
```

### B. Route: Revenue Forecasting (`app/api/ml/forecast/route.ts`)
Exposes the 30-day forecasted collection data to the VC dashboard.
```typescript
import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { getTenantContext } from "@/lib/auth"
import { successResponse } from "@/lib/response"
import { env } from "@/lib/env"
import { ForbiddenError } from "@/lib/errors"

export const GET = withErrorHandler(async (req: NextRequest) => {
  const { role } = getTenantContext()
  
  // Strict role check: Only VC and Admins can see fee predictions
  if (role !== "VC" && role !== "ADMIN" && role !== "SUPER_ADMIN") {
    throw new ForbiddenError("Unauthorized access to financial forecasts.")
  }

  // Next.js calls the internal FastAPI server
  const response = await fetch(`${env.ML_SERVICE_URL}/forecast`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 300 } // Cache forecast for 5 minutes in Next.js
  })

  if (!response.ok) {
    const errorDetails = await response.json().catch(() => ({}))
    throw new Error(errorDetails?.detail ?? "ML Engine Forecast query failed.")
  }

  const forecastData = await response.json()
  return successResponse(forecastData)
})
```

### C. Route: Retrain Models (`app/api/ml/train/route.ts`)
Enables VC/Admin to trigger model training on fresh database records.
```typescript
import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/utils/routeHandler"
import { getTenantContext } from "@/lib/auth"
import { successResponse } from "@/lib/response"
import { env } from "@/lib/env"
import { ForbiddenError } from "@/lib/errors"

export const POST = withErrorHandler(async (req: NextRequest) => {
  const { role } = getTenantContext()

  if (role !== "ADMIN" && role !== "SUPER_ADMIN" && role !== "VC") {
    throw new ForbiddenError("Only authorized administrators can retrain ML models.")
  }

  const response = await fetch(`${env.ML_SERVICE_URL}/train-all`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(120000) // 2-minute timeout: training can take time
  })

  if (!response.ok) {
    const errorDetails = await response.json().catch(() => ({}))
    throw new Error(errorDetails?.detail ?? "ML Retraining failed.")
  }

  const result = await response.json()
  return successResponse(result)
})
```

---

## 3. Production Docker Compose Setup

To deploy this on your EC2/VPS server alongside Next.js, Postgres, and Nginx, integrate the `ml` service block into your existing `docker-compose.yml`.

### The Core Requirement: Model Persistence
FastAPI saves trained models as `.pkl` files (e.g., `ML/models/defaulter_model.pkl`).
**Problem:** In Docker, if a container restarts or is recreated during a new CI/CD deployment, any runtime-generated files are lost.
**Solution:** Mount a **Named Volume** (`ml_models`) to store the trained model pickles. This ensures that models survive restarts and redeployments without requiring immediate retraining.

Update `docker-compose.yml` to include the `ml` service and volume:

```yaml
services:
  # ... postgres, redis, nextjs, nginx, certbot ...

  ml:
    build:
      context: .
      dockerfile: ML/Dockerfile
    container_name: ml_engine
    restart: unless-stopped
    env_file:
      - .env
    environment:
      # Inject postgres link instead of localhost
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/${DB_NAME}
    volumes:
      # Persistent named volume for trained .pkl models
      - ml_models_data:/app/models
    networks:
      - backend_network
    depends_on:
      postgres:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "python", "-c", "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/')"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 45s

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
  certbot_data:
    driver: local
  # PERSIST ML ARTIFACTS HERE
  ml_models_data:
    driver: local
```

---

## 4. Production CI/CD Workflow (`.github/workflows/deploy.yml`)

Your CI/CD environment needs to build and push the new Python ML image to Docker Hub, pull it on the EC2 VPS, and recreate the services.

Modify `.github/workflows/deploy.yml` like this:

```yaml
name: Build and Deploy

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      # Step 1: Build and Push Next.js Image
      - name: Build and Push Next.js Image
        run: |
          docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/unisync:latest .
          docker push ${{ secrets.DOCKERHUB_USERNAME }}/unisync:latest

      # Step 2: Build and Push FastAPI ML Image
      - name: Build and Push ML Image
        run: |
          docker build -f ML/Dockerfile -t ${{ secrets.DOCKERHUB_USERNAME }}/unisync-ml:latest .
          docker push ${{ secrets.DOCKERHUB_USERNAME }}/unisync-ml:latest

      # Step 3: Connect to EC2 VPS via SSH and Re-deploy
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_IP }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd ~/myproject
            git pull origin main
            
            # Pull fresh images for both nextjs and ml
            docker compose pull nextjs ml
            
            # Recreate containers cleanly in the background
            docker compose up -d --force-recreate nextjs ml
```

---

## 5. How to Operate & Run (Locally vs VPS)

### A. Running Locally (Development)
You can run Next.js and the Python FastAPI ML server side-by-side on your developer machine:

1.  **Configure `.env`**: Make sure your local Next.js environment has `ML_SERVICE_URL="http://localhost:8000"`.
2.  **Start PostgreSQL and Redis** (e.g., via Docker Desktop or local installations).
3.  **Start Next.js**:
    ```bash
    npm run dev
    ```
4.  **Start FastAPI ML Server**:
    *   Create a Python virtual environment:
        ```bash
        cd ML
        python -m venv venv
        # On Windows:
        .\venv\Scripts\activate
        # On macOS/Linux:
        source venv/bin/activate
        ```
    *   Install dependencies:
        ```bash
        pip install -r requirements.txt
        ```
    *   Run the server:
        ```bash
        python ml_server.py --port 8000
        ```

### B. Triggering the First Training (Bootstrap)
When you deploy the application on the VPS for the first time, the `ml_models_data` volume is empty. If Next.js calls `/forecast`, it will return an error because the model doesn't exist yet.

**To perform the initial bootstrap training:**
*   **Option A (Direct in Container):** Exec into the Docker container and run the script in CLI-mode:
    ```bash
    docker compose exec ml python ml_server.py --train-all
    ```
*   **Option B (API Trigger):** Send a secure POST request to your Next.js route:
    ```bash
    curl -X POST https://yourdomain.com/api/ml/train \
         -H "Authorization: Bearer <ADMIN_TOKEN>"
    ```

### C. Retraining Strategy (Automated Cron Job)
Machine learning models degrade over time as new transactions and students enter the system. To keep forecasts accurate, set up an automated cron job inside your Next.js app or a system cron job to run once per day (e.g., at midnight).

You can easily add a job to your daily cron route `/api/cron/daily-check` or `BullMQ` schedule:
```typescript
// Inside your daily cron controller:
await fetch(`${env.ML_SERVICE_URL}/train-all`, {
  method: "POST",
  headers: { "Content-Type": "application/json" }
});
```
This triggers a silent, automated update of all forecasts and student risk scores every day at midnight without requiring any manual administration!

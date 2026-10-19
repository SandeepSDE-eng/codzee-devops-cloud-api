# Cloud-Native Task & Workflow Microservice (Codzee Assessment)

[![Node.js](https://img.shields.io/badge/Node.js-22.x-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A resilient, production-ready cloud microservice built using **Node.js, Express, TypeScript, and Docker**, demonstrating enterprise-grade patterns for API design, security, and CI/CD pipelines.

Prepared by **Sandeep Yadav** for the **Codzee First-Round Technical Assessment & Code Review Evaluation**.

---

## ðŸŒŸ Key Features
- **Clean Architecture**: Decoupled routes, controllers, and domain services.
- **RESTful Endpoints**: Full CRUD for tasks and project workflows.
- **Health Checks & Observability**: Standard readiness & liveness probes (`/health/live`, `/health/ready`).
- **Security & Reliability**: Ready for rate limiting, JWT validation, and CORS isolation.
- **DevOps Ready**: Multi-stage Docker containerization and automated GitHub Actions CI pipeline.

---

## ðŸš€ Quick Start

### Prerequisites
- Node.js >= 20.x
- npm >= 10.x or bun

### Installation
```bash
# Clone the repository
git clone https://github.com/SandeepSDE-eng/codzee-devops-cloud-api.git
cd codzee-devops-cloud-api

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run locally in development mode
npm run dev
```

The server will start on `http://localhost:5000`.

---

## ðŸ“¡ API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health/live` | Liveness probe for Kubernetes / ECS |
| `GET` | `/health/ready` | Readiness probe with system uptime |
| `GET` | `/api/v1/tasks` | Retrieve all tasks (supports query filters) |
| `GET` | `/api/v1/tasks/:id` | Get single task details |
| `POST` | `/api/v1/tasks` | Create a new task |
| `PUT` | `/api/v1/tasks/:id` | Update an existing task |
| `DELETE` | `/api/v1/tasks/:id` | Delete a task |

---

## ðŸ›  Project Structure
```text
codzee-devops-cloud-api/
â”œâ”€â”€ .github/workflows/    # CI/CD Workflows
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ config/           # Environment & App Configuration
â”‚   â”œâ”€â”€ controllers/      # Request handlers
â”‚   â”œâ”€â”€ routes/           # API routes
â”‚   â”œâ”€â”€ services/         # Business logic & domain models
â”‚   â”œâ”€â”€ types/            # TypeScript interfaces & types
â”‚   â”œâ”€â”€ app.ts            # Express application setup
â”‚   â””â”€â”€ index.ts          # Server entry point
â”œâ”€â”€ Dockerfile            # Multi-stage production container
â”œâ”€â”€ docker-compose.yml    # Local development container orchestration
â”œâ”€â”€ package.json
â””â”€â”€ tsconfig.json
```

# Task & Workflow Management API

A modular, production-grade cloud microservice built with **Node.js, Express, TypeScript, and Docker**. This project implements clean layered architecture, JWT authentication, security hardening, and automated CI/CD pipelines.

---

## Tech Stack

- **Runtime:** Node.js (v20+)
- **Language:** TypeScript
- **Framework:** Express.js
- **Containerization:** Docker (Multi-stage build) & Docker Compose
- **CI/CD:** GitHub Actions (Matrix testing across Node.js 20 & 22)
- **Security:** Rate limiting, Helmet security headers, Role-based Access Control (RBAC)

---

## Architecture & Folder Structure

The project follows a modular, layered structure to keep business logic decoupled from transport and middleware layers:

```text
src/
├── config/         # Environment variables & runtime settings
├── controllers/    # Route controllers (request/response handling)
├── middleware/     # Auth, Rate limiting & Error handling
├── routes/         # API route declarations
├── schemas/        # Request payload validation schemas
├── services/       # Core domain logic & in-memory data store
├── types/          # TypeScript interfaces and DTOs
├── app.ts          # Express application initialization & middleware stack
└── index.ts        # Server entry point & graceful shutdown handlers
```

---

## API Endpoints

### Health & Observability
- `GET /health/live` - Liveness probe (for AWS ECS / Kubernetes)
- `GET /health/ready` - Readiness probe (reports uptime and heap memory)

### Authentication
- `POST /api/v1/auth/login` - User authentication (issues JWT token)

### Tasks Resource
- `GET /api/v1/tasks` - List all tasks (supports `?status=` filtering)
- `GET /api/v1/tasks/:id` - Fetch single task by ID
- `POST /api/v1/tasks` - Create a task (Requires Bearer Token & schema validation)
- `PUT /api/v1/tasks/:id` - Update task (Requires `DEVELOPER` or `ADMIN` role)
- `DELETE /api/v1/tasks/:id` - Delete task (Requires `ADMIN` role)

---

## Getting Started

### Prerequisites
- Node.js >= 20.x
- npm >= 10.x

### Local Setup
```bash
# Clone the repository
git clone https://github.com/SandeepSDE-eng/codzee-devops-cloud-api.git
cd codzee-devops-cloud-api

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run in development mode
npm run dev
```

The server will start on `http://localhost:5000`.

### Production Build
```bash
# Compile TypeScript to JavaScript
npm run build

# Start production server
npm start
```

---

## Docker & Containerization

### Build & Run Container
```bash
# Build multi-stage optimized image
docker build -t codzee-cloud-api:latest .

# Run container
docker run -p 5000:5000 --name task-service codzee-cloud-api:latest
```

### Run with Docker Compose
```bash
docker-compose up -d --build
```

---

## Pull Requests & Code Review Scope

This repository was organized with 3 targeted pull requests to evaluate code review capabilities across feature implementation, security hardening, and DevOps automation:

1. **PR #1 (`feat/jwt-auth-validation`):**
   - Implements JWT authentication and Role-Based Access Control (`requireRole` middleware).
   - Adds input schema validation for task creation and updates.
   - Restricts mutating endpoints to authenticated users.

2. **PR #2 (`fix/security-and-error-handling`):**
   - Implements sliding window IP rate limiting (100 reqs / 15 mins) to prevent brute-force attacks.
   - Adds HTTP security headers (nosniff, X-Frame-Options, HSTS).
   - Adds centralized error handling to safely mask internal stack traces in production.

3. **PR #3 (`ci-devops/docker-and-github-actions`):**
   - Production multi-stage Alpine Dockerfile running under a non-root `node` user.
   - Built-in container healthcheck instruction.
   - GitHub Actions CI workflow testing build and compilation across Node 20 and 22.

---

## Author

**Sandeep Yadav**  
Full Stack & DevOps Engineer  
- **GitHub:** [SandeepSDE-eng](https://github.com/SandeepSDE-eng)  
- **Email:** sandeepengineering03@gmail.com

# Cloud-Based URL Shortener with Analytics 🚀

A full-stack cloud-native URL shortener application built using React, Node.js, MongoDB, Docker, and DevOps tools.

This project demonstrates modern DevOps practices including containerization, multi-container orchestration, CI/CD readiness, cloud database integration, and scalable deployment architecture.

---

# Features

- Shorten long URLs
- Redirect shortened URLs
- Track click analytics
- Real-time analytics dashboard
- MongoDB Atlas cloud database
- Dockerized frontend and backend
- Multi-container setup using Docker Compose
- CI/CD ready architecture

---

# Tech Stack

## Frontend
- React
- Vite
- Axios

## Backend
- Node.js
- Express.js

## Database
- MongoDB Atlas

## DevOps & Cloud
- Docker
- Docker Compose
- GitHub
- Docker Hub
- Jenkins (upcoming)
- Kubernetes (upcoming)
- AWS EC2 (upcoming)

---

# Project Architecture

```txt
User Browser
      ↓
Frontend Container (React/Vite)
      ↓
Backend Container (Node/Express)
      ↓
MongoDB Atlas Cloud Database
```

---

# Docker Setup

## Build Containers

### Backend

```bash
cd backend
docker build -t url-shortener-backend .
```

### Frontend

```bash
cd frontend
docker build -t url-shortener-frontend .
```

---

# Docker Compose

Run entire application:

```bash
docker compose up
```

---

# API Endpoints

## Shorten URL

```http
POST /shorten
```

## Redirect URL

```http
GET /:shortCode
```

## Analytics

```http
GET /analytics/all
```

---

# Learning Outcomes

This project helped in understanding:

- Full-stack application architecture
- REST API development
- MongoDB integration
- Docker containerization
- Multi-container orchestration
- Cloud-native development
- DevOps workflows
- Infrastructure as Code

---

# Future Improvements

- Jenkins CI/CD pipeline
- Kubernetes deployment
- AWS EC2 hosting
- Prometheus monitoring
- Grafana dashboards
- Custom domain support
- Production-grade security

---

# Author

Naman Maheshwari

GitHub:
https://github.com/naman458
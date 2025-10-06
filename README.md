# ⚡ FullStack DevSecure App

Une stack **React Vite + Flask** prête à l'emploi.

![Docker](https://img.shields.io/badge/Docker-ready-blue)
![Security](https://img.shields.io/badge/Security-Scanned-brightgreen)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/eacc1cb33791488399e0e1c53ad5f9cb)

---

![React](https://img.shields.io/badge/React-Vite-61DAFB)
![Flask](https://img.shields.io/badge/Flask-backend-lightgrey)

---

## 🔧 Fonctionnalités

- ⚛️ **Frontend ReactJS (Vite)** avec hot reload
- 🐍 **Backend Flask** avec auto-reload + base Postgres
- 🐳 **Docker Compose** pour l’orchestration des services
- 📦 Structure modulaire et extensible

---

## 🚀 Lancer en local

### 1. Cloner le projet

```bash
git clone https://github.com/ton-user/api-react-flask.git
cd api-react-flask
```

### 2. Lancer avec Docker Compose

```bash
docker-compose up --build
```

Frontend : http://localhost:5173

Backend API : http://localhost:5000

---

### 📦 Structure du projet

```
.
├── backend/                # Application Flask
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/               # Application ReactJS (Vite)
│   ├── src/
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml      # Orchestration multi-service
├── .dockerignore
├── .gitignore
└── README.md
```

---

### 🧪 Tester le Frontend (React)

Accède à : http://localhost:5173

---

### Made with ❤️ by Daniween

# 🧠 Gena Dashboard Frontend

This is the **Gena Dashboard** frontend project.

## Getting Started

Follow these steps to run the frontend project locally or in a Docker container.

---

## Clone the Repository

```bash
git clone https://github.com/vadimkim0203/gena-dashboard.git
cd gena-frontend
```

---

## Docker Setup

### 1. Create a `Dockerfile`

```Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

---

### 2. Create a `docker-compose.yml`

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

---

### 3. Build and Start with Docker Compose

```bash
docker-compose up --build
```

Alternatively, if you’ve set up an NPM script:

```bash
npm run docker:compose
```

---

## 🛠 Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.dev/)
- [Lucide Icons](https://lucide.dev/icons)
- TypeScript

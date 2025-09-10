FROM node:20-alpine
WORKDIR /app

# Install only what's needed for migrations
COPY package*.json ./
RUN npm install --omit=dev

# Copy migrations
COPY migrations ./migrations

# Default command: run migrations
ENTRYPOINT ["npx", "node-pg-migrate", "up"]

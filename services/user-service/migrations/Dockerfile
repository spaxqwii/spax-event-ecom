FROM node:18-alpine

WORKDIR /app

# Install only what's needed for migrations
COPY package*.json ./
RUN npm install --only=production

COPY migrations ./migrations

ENTRYPOINT ["npx", "node-pg-migrate"]

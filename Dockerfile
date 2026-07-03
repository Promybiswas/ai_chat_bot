# ---- Stage 1: build the React frontend ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build          # outputs /app/dist

# ---- Stage 2: backend that also serves the built frontend ----
FROM node:20-alpine
WORKDIR /app

# Install backend production deps
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --omit=dev

# Copy backend source and the built frontend
COPY backend ./backend
COPY --from=build /app/dist ./dist

WORKDIR /app/backend
EXPOSE 5000
CMD ["node", "server.js"]

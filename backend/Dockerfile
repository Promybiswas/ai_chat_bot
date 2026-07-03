# CareChat backend — Node/Express API
FROM node:20-alpine

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of the backend source
COPY . .

# API port
EXPOSE 5000

CMD ["node", "server.js"]

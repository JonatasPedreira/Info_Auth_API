FROM node:22-alpine

WORKDIR /end_proj/src/app

COPY package*.json tsconfig.json ./

RUN npm ci

COPY src ./src

RUN npm run build

CMD ["node", "dist/main.js"]
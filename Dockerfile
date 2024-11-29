FROM node:23

WORKDIR /app

RUN groupadd nodejs && useradd -g nodejs nodejs

COPY package*.json ./

RUN npm install --production

COPY . .

USER nodejs:nodejs

RUN mkdir /home/nodejs

ENTRYPOINT ["npx", "vite"]
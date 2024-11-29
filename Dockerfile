FROM node:23

WORKDIR /app

RUN mkdir /home/nodejs

RUN groupadd nodejs && useradd -g nodejs nodejs

COPY package*.json ./

RUN npm install --production

COPY . .

USER nodejs:nodejs

ENTRYPOINT ["npx", "vite"]
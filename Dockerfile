FROM node:23

WORKDIR /app

RUN groupadd nodejs && useradd -g nodejs nodejs

RUN mkdir /home/nodejs

RUN chown nodejs -R /home/nodejs

COPY package*.json ./

RUN npm install --production

COPY . .

USER nodejs:nodejs

ENTRYPOINT ["npx", "vite"]
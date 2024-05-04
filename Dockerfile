FROM node:20.11.1

WORKDIR /app

COPY package*.json ./

RUN  npm ci --only=production

COPY src /app/src/

EXPOSE 5000

CMD ["npm", "start"]

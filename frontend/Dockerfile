FROM --platform=linux/amd64 node:alpine

WORKDIR /app/frontend

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
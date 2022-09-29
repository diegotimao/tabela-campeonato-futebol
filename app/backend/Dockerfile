FROM node:16.14-alpine

WORKDIR /app-backend

COPY package*.json ./

RUN npm install

COPY . .

# Desenvolvimento
CMD ["npm", "run", "dev"] 

#Production
# CMD ["npm", "start"]

EXPOSE 3001
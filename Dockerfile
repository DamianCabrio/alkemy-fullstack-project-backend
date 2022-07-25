FROM node:18.5.0

RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "src/app.js"]
CMD ["npm", "run migrate"]
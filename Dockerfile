FROM node:16.18
WORKDIR /usr/app
COPY . .

RUN npm install
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve","-s","build"]

FROM node:20

WORKDIR /usr/src/app

COPY hamcrest-core-1.3.jar ./
COPY junit-4.12.jar ./
COPY java.js ./
COPY package.json ./

RUN npm install
RUN apt update && apt install -y default-jdk

EXPOSE 8000

CMD ["node", "java.js"]
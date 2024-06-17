FROM node:18.7.0

WORKDIR /src

COPY package*.json ./

ENV MODEL_URL 'https://storage.googleapis.com/bucket-urfruits/tfjs_model/model.json'

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start"]

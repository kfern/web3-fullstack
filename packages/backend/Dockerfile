FROM node:16.13.2-alpine
USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY ./package.json ./package.json
RUN npm install

COPY ./hardhat.config.js ./hardhat.config.js 
COPY ./contracts ./contracts
COPY ./scripts ./scripts
COPY ./test ./test

EXPOSE 8545

CMD ["npx", "hardhat", "node"]

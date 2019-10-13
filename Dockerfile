FROM node:10

WORKDIR /usr/src/app

RUN git clone https://github.com/jparr721/nanokey.git .

RUN cp .env.example .env

RUN yarn install --frozen-lockfile --non-interactive

RUN yarn build

EXPOSE 6900

CMD ["yarn", "start:prod"]

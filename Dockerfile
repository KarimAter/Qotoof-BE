FROM node:16-alpine3.15

WORKDIR  /app

COPY src ./src

COPY .env ./

COPY prisma ./prisma

COPY package.json ./

COPY yarn.lock ./

COPY tsconfig.json ./

RUN yarn install

RUN npx prisma generate

# RUN npx prisma db push

EXPOSE 8000

CMD ["yarn","docker"]


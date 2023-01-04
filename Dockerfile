FROM node:14.21.1-slim
COPY . /usr/express-blog
WORKDIR /usr/express-blog
RUN npm i -g pnpm
RUN pnpm i
RUN npm run build

EXPOSE 8086

CMD ["npm run prod"]


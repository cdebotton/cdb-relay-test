import koa from 'koa';
import mount from 'koa-mount';
import proxy from 'koa-proxy';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import {green} from 'colors';
import {Schema} from '../data/schema';

const ENV = process.env.NODE_ENV || 'development';
const APP_PORT = process.env.PORT || 3000;
const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 8080;
const WEBPACK_PORT = process.env.WEBPACK_PORT || 3333;

const app = koa();
const graphQLServer = express();

graphQLServer.use(graphqlHTTP({
  schema: Schema,
  pretty: true,
}));

graphQLServer.listen(GRAPHQL_PORT, () => {
  console.log(green(`GraphQL is running at http://localhost:${GRAPHQL_PORT}`));
});

app.use(mount('/graphql', proxy({
  host: `http://localhost:${GRAPHQL_PORT}`,
})));

if (ENV === 'development') {
  app.use(mount('/build', proxy({
    host: `http://localhost:${WEBPACK_PORT}`,
  })));
}

app.listen(APP_PORT, () => {
  console.log(green(`App is running at http://localhost:${APP_PORT}`));
});

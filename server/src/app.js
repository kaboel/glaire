const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const gqlHTTP = require('express-graphql');
const SCHEMA = require('./_schema/schema');

const App = express();

App.use(morgan('combined'));
App.use(cors());

App.use('/gql', gqlHTTP({ schema: SCHEMA, graphiql: true }));

App.listen(3000, () => {
    console.log('Server started on port 3000');
});

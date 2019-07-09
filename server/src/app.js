const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const gqlHTTP = require('express-graphql');
const SCHEMA = require('./_schema/schema');
const mongoose = require('mongoose');
const config = require('./_config/config');

const App = express();

App.use(morgan('combined'));
App.use(cors());

App.use('/v0', gqlHTTP({ schema: SCHEMA, graphiql: true }));

const db = config.db.uriString;
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => {
        console.log('Database connected on Kluster-0@glaire...');
        try {
            App.listen(process.env.PORT || config.port, () => {
                console.log(`Server started on port: ${config.port}...`);
            });
        } catch (err) {
            console.log(err.message);
        }
    }).catch((err) => {
        console.log(`Error while connecting to database - ${err.message}`);
    });


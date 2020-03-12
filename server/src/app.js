const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const gqlHTTP = require('express-graphql');
const SCHEMA = require('./_schema/schema');
const mongoose = require('mongoose');
const config = require('./_config/config');

const App = express();
const db = config.db.uriString;
const port = config.port || process.env.PORT

App.use(morgan('combined'));
App.use(cors());

App.use('/v0', gqlHTTP({ schema: SCHEMA, graphiql: true }));


mongoose.connect(db, {useNewUrlParser: true})
    .then(() => {
        console.log(`\n[glaire] connected to glaire@Kluster-0\n.\n.`);
        try {
            App.listen(port, () => {
                console.log(`[glaire] server started on port: ${port}...`);
            });
        } catch (err) {
            console.log(err.message);
        }
    }).catch((err) => {
        console.log(`\n[glaire] error while connecting to database - ${err.message}`);
    });


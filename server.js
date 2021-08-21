/*eslint-env es6*/
const http = require('http');
const app = require('./src/app/backend/app')
const debug = require('debug')('node-angular')
const server = http.createServer(app);
const mongoose = require('mongoose')
port = process.env.PORT || 3000;

app.set('port', port);

server.listen(port);

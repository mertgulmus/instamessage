/**
 * @fileoverview This is the main server file for the InstaMessage backend.
 * It sets up the Express server, connects to the database, and defines the routes.
 * @module server
 */

const express = require('express');
const mongoose = require('mongoose');

const usersRouter = require('./routes/user');
const messagesRouter = require('./routes/message');
const chatsRouter = require('./routes/chat');

require('dotenv').config();

const app = express();

// middlewares
app.use(express.json());

app.use((req, res, next) => {
    console.log('Request received:', req.method, req.path);
    next();
});

app.use('/api/user/', usersRouter);
app.use('/api/message/', messagesRouter);
app.use('/api/chat/', chatsRouter);

/**
 * Default route that returns a response when the root URL is accessed.
 * @name GET /
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get('/', (req, res) => {});

// database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        /**
         * Callback function that is called when the database connection is successful.
         * It starts the server and listens for incoming requests.
         * @callback listenCallback
         */
        app.listen(process.env.PORT, () => console.log('Connected to the database and listening for port', process.env.PORT));
    })
    .catch(err => console.log(err));

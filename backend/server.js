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

// routes
app.get('/', (req, res) => {});

// database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => console.log('Connected to the database and listening for port', process.env.PORT));
    })
    .catch(err => console.log(err));

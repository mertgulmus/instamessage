const express = require('express');
const {
    createMessage,
    getAllMessages,
    getMessage,
    deleteMessage
} = require('../controllers/messageController');

const router = express.Router();

router.get('/', getAllMessages);

router.get('/:id', getMessage);

router.post('/', createMessage);

router.delete('/:id', deleteMessage);

module.exports = router;

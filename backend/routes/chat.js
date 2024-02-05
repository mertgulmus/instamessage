const express = require('express');
const {
    createChat,
    getChatsOfUser,
    deleteChat,
    getAllChats
} = require('../controllers/chatsController');

const router = express.Router({ mergeParams: true });

router.get('/', getAllChats);

router.get('/list/:username', getChatsOfUser);

router.post('/', createChat);

router.delete('/:id', deleteChat);

module.exports = router;

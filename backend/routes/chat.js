const express = require('express');
const {
    createChat,
    getChatsOfUser,
    deleteChat,
    getAllChats,
    prepareChatData
} = require('../controllers/chatsController');

const router = express.Router({ mergeParams: true });

router.get('/', getAllChats);

router.get('/list/:id', getChatsOfUser);

router.get('/info/:id/', prepareChatData);

router.post('/', createChat);

router.delete('/:id', deleteChat);

module.exports = router;

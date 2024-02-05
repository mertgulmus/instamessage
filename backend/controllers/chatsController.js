const Chats = require('../models/chats');
const mongoose = require('mongoose');

// GET all chats
const getAllChats = async (req, res) => {
    try {
        const chats = await Chats.find();

        res.status(200).json(chats);
    } catch (err) {
        res.status(400).json(err);
    }
};

// GET chat by id
const getChatsOfUser = async (req, res) => {
    const { username } = req.params;

    const chats = await Chats.find({ participants: username });

    if (!chats) {
        return res.status(404).send('No chat with that id');
    }

    res.status(200).json(chats);
};

// POST new chat
const createChat = async (req, res) => {
    const { participants, messages } = req.body;

    try {
        const chat = await Chats.create({
            participants,
            messages
        });

        res.status(201).json(chat);
    } catch (err) {
        res.status(400).json(err);
    }
};

// DELETE chat by id
const deleteChat = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No chat with that id');
    }

    const chat = await Chats.findByIdAndDelete({ _id: id });

    if (!chat) {
        return res.status(404).send('No chat with that id');
    }

    res.status(200).json(chat);
};

module.exports = {
    getAllChats,
    getChatsOfUser,
    createChat,
    deleteChat
};

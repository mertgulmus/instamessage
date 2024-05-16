const Chats = require('../models/chats');
const Message = require('../models/message');
const User = require('../models/user');

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
    const { id } = req.params;

    const chats = await Chats.find({ participants: id });

    if (!chats) {
        return res.status(404).send('No chat with that id');
    }

    res.status(200).json(chats);
};

// POST new chat
const createChat = async (req, res) => {
    const { participants, messages } = req.body;

    try {
        const existingChat = await Chats.findOne({ participants });

        if (existingChat) {
            return res.status(400).send('Chat already exists');
        }

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

const prepareChatData = async (req, res) => {
    const { id } = req.params;

    const chat = await Chats.findById(id);

    if (!chat) {
        return res.status(404).send('No chat with that id');
    }

    const participants = chat.participants;

    const participantUsernames = [];

    for (let i = 0; i < participants.length; i++) {
        const user = await User.findById(participants[i]);
        participantUsernames.push(user.username);
    }

    const messages = chat.messages;

    const messageContents = [];

    for (let i = 0; i < messages.length; i++) {
        const message = await Message.findById(messages[i]);
        messageContents.push(message);
    }

    res.status(200).json({
        id: chat._id,
        participants: participantUsernames,
        messages: messageContents,
        updatedAt: chat.updatedAt
    });
}

module.exports = {
    getAllChats,
    getChatsOfUser,
    createChat,
    deleteChat,
    prepareChatData
};

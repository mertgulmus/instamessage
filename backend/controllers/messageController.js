const Message = require('../models/message');
const Chats = require('../models/chats');
const mongoose = require('mongoose');

// GET all messages
const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find();

        res.status(200).json(messages);
    } catch (err) {
        res.status(400).json(err);
    }
};

// GET message by id
const getMessage = async (req, res) => {
    const { username } = req.params;

    // if one of the participants is the user
    const chat = await Chats.find({ participants: username });

    if (!chat) {
        return res.status(404).send('No chat with that id');
    }

    const messages = await Message.find({ _id: chat.messages });

    if (!messages) {
        return res.status(404).send('No message with that id');
    }

    res.status(200).json(messages);
};

// POST new message
const createMessage = async (req, res) => {
    const { sender, receiver, content } = req.body;

    try {
        const message = await Message.create({
            sender,
            receiver,
            content
        });

        const chat = await Chats.findOne({ participants: [sender, receiver] });

        if (chat) {
            chat.messages.push(message._id);
            await chat.save();
        } else {
            await Chats.create({
                participants: [sender, receiver],
                messages: [message._id]
            });
        }

        res.status(201).json(message);
    } catch (err) {
        res.status(400).json(err);
    }
};

// DELETE message by id
const deleteMessage = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No message with that id');
    }

    const message = await Message.findByIdAndDelete({ _id: id });

    if (!message) {
        return res.status(404).send('No message with that id');
    }

    res.status(200).json(message);
};

module.exports = {
    createMessage,
    getAllMessages,
    getMessage,
    deleteMessage
};

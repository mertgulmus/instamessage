const User = require('../models/user');
const mongoose = require('mongoose');

// GET all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
};

// GET user with username
const getUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No user with that id');
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).send('No user with that id');
    }

    res.status(200).json(user);
};

// POST new user
const createUser = async (req, res) => {
    const {
        username,
        password,
        email,
        firstName,
        lastName,
        avatar,
        friends,
        friendRequests,
        sentRequests
    } = req.body;

    try {
        const user = await User.create(
            {
                username,
                password,
                email,
                firstName,
                lastName,
                avatar,
                friends,
                friendRequests,
                sentRequests
            }
        );

        res.status(201).json(user._id);
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

// DELETE user with username
const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No user with that id');
    }

    const user = await User.findByIdAndDelete({ _id: id });

    if (!user) {
        return res.status(404).send('No user with that id');
    }

    res.status(200).json(user);
};


// PATCH user with username
const updateUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No user with that id');
    }

    const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!user) {
        return res.status(404).send('No user with that id');
    }

    res.status(200).json(user);
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (!user) {
        return res.status(404).send({ error: 'No user with that username and password' });
    }

    res.status(200).json(user._id);
};

const getUserFromUsername = async (req, res) => {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).send({ error: 'No user with that username' });
    }

    res.status(200).json(user);
};

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    login,
    getUserFromUsername
};

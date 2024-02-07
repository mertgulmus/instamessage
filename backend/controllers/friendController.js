const User = require('../models/user');

const mongoose = require('mongoose');

// GET all friends
const getAllFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const friends = await User.find({ _id: { $in: user.friends } });

        res.status(200).json(friends);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// GET friend requests
const getFriendRequests = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const requests = await User.find({ _id: { $in: user.friendRequests } }, { id: 1, username: 1, firstName: 1, lastName: 1});

        res.status(200).json(requests);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// POST friend request
const sendFriendRequest = async (req, res) => {
    const { id } = req.params;
    const { friendId } = req.body;

    try {
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).send({ error: 'User or friend not found' });
        }

        if (user.friends.includes(friendId)) {
            return res.status(400).send({ error: 'You are already friends' });
        }

        if (user.sentRequests.includes(friendId)) {
            return res.status(400).send({ error: 'You already sent a request' });
        }

        if (user.friendRequests.includes(friendId)) {
            return res.status(400).send({ error: 'You already have a request from this user' });
        }

        user.sentRequests.push(friendId);
        friend.friendRequests.push(id);

        await user.save();
        await friend.save();

        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// POST accept friend request
const acceptFriendRequest = async (req, res) => {
    const { id } = req.params;
    const { friendId } = req.body;

    try {
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).send({error: 'User or friend not found'});
        }

        if (user.friends.includes(friendId)) {
            return res.status(400).send({error: 'You are already friends'});
        }

        if (!user.friendRequests.includes(friendId)) {
            return res.status(400).send({error: 'You do not have a request from this user'});
        }

        user.friends.push(friendId);
        friend.friends.push(id);

        user.friendRequests = user.friendRequests.filter(request => request !== friendId);
        friend.sentRequests = friend.sentRequests.filter(request => request !== id);

        await user.save();
        await friend.save();

        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({error: err});
    }
}

// DELETE friend request
const rejectFriendRequest = async (req, res) => {
    const { id } = req.params;
    const { friendId } = req.body;

    try {
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).send({error: 'User or friend not found'});
        }

        if (user.friends.includes(friendId)) {
            return res.status(400).send({error: 'You are already friends'});
        }

        if (!user.friendRequests.includes(friendId)) {
            return res.status(400).send({error: 'You do not have a request from this user'});
        }

        user.sentRequests = user.sentRequests.filter(request => request !== friendId);
        friend.friendRequests = friend.friendRequests.filter(request => request !== id);

        await user.save();
        await friend.save();

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
}

// POST remove friend
const removeFriend = async (req, res) => {
    const { id } = req.params;
    const { friendId } = req.body;

    try {
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).send({error: 'User or friend not found'});
        }

        if (!user.friends.includes(friendId)) {
            return res.status(400).send({error: 'You are not friends'});
        }

        user.friends = user.friends.filter(friend => friend !== friendId);
        friend.friends = friend.friends.filter(friend => friend !== id);

        await user.save();
        await friend.save();

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
}

const getSentRequests = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const requests = await User.find({ _id: { $in: user.sentRequests } }, { id: 1, username: 1, firstName: 1, lastName: 1});

        res.status(200).json(requests);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getAllFriends,
    getFriendRequests,
    getSentRequests,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend
};

const express = require('express');
const {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    login,
    getUserFromUsername
} = require('../controllers/userController');

const {
    getAllFriends,
    getFriendRequests,
    getSentRequests,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    cancelSentRequest
} = require('../controllers/friendController');

const router = express.Router();

// User routes
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.get('/username/:username', getUserFromUsername);
router.post('/signup', createUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);
router.post('/login', login);

// Friend routes
router.get('/:id/friends', getAllFriends);
router.post('/:id/friend/remove', removeFriend);

// Friend request routes
router.get('/:id/requests/incoming', getFriendRequests);
router.get('/:id/requests/sent', getSentRequests);
router.post('/:id/request/send', sendFriendRequest);
router.post('/:id/request/accept', acceptFriendRequest);
router.post('/:id/request/reject', rejectFriendRequest);
router.post('/:id/request/cancel', cancelSentRequest);

module.exports = router;

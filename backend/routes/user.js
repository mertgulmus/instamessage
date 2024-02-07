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
    removeFriend
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
router.get('/:id/requests', getFriendRequests);
router.get('/:id/sent', getSentRequests);
router.post('/:id/friends', sendFriendRequest);
router.post('/:id/friends/accept', acceptFriendRequest);
router.post('/:id/friends/reject', rejectFriendRequest);
router.post('/:id/friends/remove', removeFriend);

module.exports = router;

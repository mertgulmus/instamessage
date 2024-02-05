const express = require('express');
const {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    login
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id', getUser);

router.post('/signup', createUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

router.post('/login', login);

module.exports = router;

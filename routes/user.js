const express = require('express');
const {
    handleGetAllUsers, 
    handleCreateUser,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleGetAllUsersHTML
}=require('../controllers/user')

const router = express.Router();

router.route('/')
    .get(handleGetAllUsers)
    .post(handleCreateUser)

router.route('/:id')
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)

module.exports = router;
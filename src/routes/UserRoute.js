'use strict'

var express = require('express');

var User = require('../controllers/UserController');

var router = express.Router();

router.post('/save_user', User.save);

router.get('/users', User.getUsers);

router.get('/get_user/:id', User.getUser);

router.put('/user/:id', User.edit);

router.delete('/delete_user/:id', User.delete);

module.exports = router;
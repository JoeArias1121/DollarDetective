const express = require('express');
const users = require('../models/users');

const app = express.Router();
app
    .patch('/:username/:password', (req, res, next) => {
        users.addUser(req.params.username, req.params.password).then(result => res.status(200).send(result))
    })
    .patch('/:username', (req, res) => {
        users.getUser(req.params.username).then(user => res.status(200).send(user))
    })
    .post(`/:username`, (req, res, next) => {
        users.updateUser(req.body.user).then(user => res.status(200).send(user.value))
    })
    .delete(`/:username`, (req, res, next) => {
        users.deleteUser(req.body.user).then(result  => res.status(200).send(result))
    })

module.exports = app;
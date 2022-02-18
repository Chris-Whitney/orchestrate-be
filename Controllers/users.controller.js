const { fetchUsers, postUser, deleteUser } = require('../Models/users.model');

exports.getUsers = (req, res, next) => {
    fetchUsers().then((users) => {
        res.status(200).send({ users })
    })
};

exports.saveUser = (req, res, next) => {
    postUser(req.body).then(user => {
        res.status(201).send({ user })
    })
};

exports.removeUser = (req, res, next) => {
    deleteUser(req.body).then(() => {
        res.status(204).send({});
    })
}
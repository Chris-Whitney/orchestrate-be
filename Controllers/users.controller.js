const { fetchUsers, postUser, deleteUser, fetchSingleUser } = require('../Models/users.model');
const { userExists } = require('../utils/users.utils');

exports.getUsers = (req, res, next) => {
    fetchUsers().then((users) => {
        res.status(200).send({ users })
    })
};

exports.saveUser = (req, res, next) => {
    postUser(req.body).then(user => {
        res.status(201).send({ user })
    })
        .catch(err => next(err))
};

exports.removeUser = (req, res, next) => {
    deleteUser(req.body).then(() => {
        res.status(204).send({});
    })
        .catch(err => {
            console.log('error caught')
            next(err)
        })
}

exports.getSingleUser = (req, res, next) => {
    fetchSingleUser(req.params).then((user) => {
        res.status(200).send({ user })
    })
        .catch(err => next(err))
}

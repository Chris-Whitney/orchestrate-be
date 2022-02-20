const { fetchGroups, postGroup, deleteGroup, fetchSingleGroup } = require("../Models/groups.model");

exports.getGroups = (req, res, next) => {
  fetchGroups().then((groups) => {
    res.status(200).send({ groups });
  }).catch(err => {
    next(err)
  })
};

exports.saveGroup = (req, res, next) => {
  postGroup(req.body).then((group) => {
    res.status(201).send({ group })
  }).catch(err => {
    next(err)
  })
}

exports.removeGroup = (req, res, next) => {
  deleteGroup(req.body).then(() => {
    res.status(204).send({});
  }).catch(err => {
    next(err)
  })
}
exports.getSingleGroup = (req, res, next) => {
  fetchSingleGroup(req.params).then((group) => {
    res.status(200).send({ group })
  }).catch(err => {
    next(err)
  })
}
const { fetchGroups } = require("../Models/groups.model");

exports.getGroups = (req, res, next) => {
  fetchGroups().then((groups) => {
    res.status(200).send({ groups });
  });
};

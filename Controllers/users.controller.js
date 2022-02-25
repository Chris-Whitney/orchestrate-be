const {
  fetchUsers,
  postUser,
  deleteUser,
  fetchSingleUser,
  patchSingleUser,
  fetchFriends,
  fetchGroups,
  fetchVenues,
  postEvents,
  fetchEvents,
  fetchUsersByQuery
} = require("../Models/users.model");


exports.getUsers = (req, res, next) => {
  fetchUsers().then((users) => {
    res.status(200).send({ users });
  });
};

exports.saveUser = (req, res, next) => {
  postUser(req.body)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch((err) => next(err));
};

exports.removeUser = (req, res, next) => {
  deleteUser(req.params)
    .then(() => {
      res.status(204).send({});
    })
    .catch((err) => {
      console.log("error caught");
      next(err);
    });
};

exports.getSingleUser = (req, res, next) => {
  fetchSingleUser(req.params)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => next(err));
};

exports.amendSingleUser = (req, res, next) => {
  patchSingleUser(req.params, req.body)
    .then((patch) => {
      res.status(200).send({ patch });
    })
    .catch((err) => next(err));
};

exports.getFriendsList = (req, res, next) => {
  fetchFriends(req.params)
    .then((friends) => {
      res.status(200).send({ friends });
    })
    .catch((err) => next(err));
};

exports.getGroupsList = (req, res, next) => {
  fetchGroups(req.params).then((groups) => {
    res.status(200).send({ groups });
  });
};

exports.getVenuesList = (req, res, next) => {
  fetchVenues(req.params).then((venues) => {
    res.status(200).send({ venues })
  })
    .catch((err) => next(err));
};

exports.getEvents = (req, res, next) => {
  fetchEvents(req.params).then(events => {
    res.status(200).send({ events })
  })
    .catch((err) => next(err));
}

exports.saveEvents = (req, res, next) => {
  postEvents(req.params, req.body).then(event => {
    res.status(201).send({ event })
  }).catch((err) => next(err));
}
exports.searchUsers = (req, res, next) => {
  fetchUsersByQuery(req.query).then((users) => {
    res.status(200).send({ users })
  });
};

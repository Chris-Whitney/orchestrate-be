exports.postEvents = async (id, info) => {
   const { userId } = id
   const query = await Users.findById(userId)
   query.events.push(info)
   query.save()
   return query.events
}

exports.fetchEvents = async (id) => {
   const { userId } = id
   const query = await Users.findById(userId)
   return query.events
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
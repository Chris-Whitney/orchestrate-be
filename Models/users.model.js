const Users = require("../Schemas/User.js");


exports.fetchUsers = async () => {
  let query = await Users.find({});

  return query;
};

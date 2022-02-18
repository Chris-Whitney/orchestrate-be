const Groups = require("../Schemas/Group");

exports.fetchGroups = async () => {
  let query = await Groups.find({});

  return query;
};

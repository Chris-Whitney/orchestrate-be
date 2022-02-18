const Groups = require("../Schemas/Group");

exports.fetchGroups = async () => {
  let query = await Groups.find({});

  return query;
};

exports.postGroup = async (body) => {
  const { owner, contact, name, avatar_url } = body;
  try {
    await Groups.create({
      owner,
      contact: {
        name: contact.name,
        email: contact.email,
      },
      name,
      avatar_url,
      members: [owner],
    });
    let result = await Groups.find({ owner });
    return result;
  } catch (error) {
    console.log(error);
  }
};

exports.deleteGroup = async (body) => {
  const { id } = body;
  try {
    let result = await Groups.deleteOne({ _id: id });
    return result;
  } catch (error) {
    console.log(error);
  }
};

exports.fetchSingleGroup = async (params) => {
  const { groupId } = params
  try {
    const query = Groups.findById(groupId)
    return query
  } catch (error) {
    console.log(error)
  }
}

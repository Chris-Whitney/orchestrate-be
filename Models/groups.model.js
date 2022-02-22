const { query } = require("express");
const Groups = require("../Schemas/Group");

exports.fetchGroups = async () => {
  let query = await Groups.find({});

  return query;
};

exports.postGroup = async (body) => {
  const { owner, contact, name, avatar_url } = body;
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
  let result = await Groups.find({ name });
  return result;
};

exports.deleteGroup = async (body) => {
  const { id } = body;

  let result = await Groups.deleteOne({ _id: id });
  return result;
};

exports.fetchSingleGroup = async (params) => {
  const { groupId } = params;
  const query = Groups.findById(groupId);
  return query;
};

exports.patchSingleGroup = async (id, info) => {
  const { groupId } = id;
  const { name, avatar_url, contact } = info;

  const query = await Groups.findById(groupId);

  query.name = name;
  query.avatar_url = avatar_url;
  query.contact.name = contact.name;
  query.contact.email = contact.email;

  await query.save();

  return query;
};

exports.fetchMembers = async (id) => {
  const {groupId } = id;

  const query = await Groups.findById(groupId).populate('members');


  return query.members;
  
}
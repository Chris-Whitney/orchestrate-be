const Users = require("../Schemas/User.js");
const { genPassword } = require("../utils/password.utils.js");

exports.fetchUsers = async () => {
  let query = await Users.find({});

  return query;
};

exports.postUser = async (body) => {
  const saltHash = genPassword(body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const { username, name, email, location, instruments, avatar_url, password } =
    body;
  await Users.create({
    username,
    avatar_url,
    name: {
      first: name.first,
      last: name.last,
    },
    email,
    location: {
      postcode: location.postcode,
      city: location.city,
      country: location.country,
    },
    instruments,
    salt,
    hash,
  });
  let result = await Users.find({ username: username });
  return result;
};

exports.deleteUser = async (params) => {
  const { userId } = params;

  let result = await Users.deleteOne({ _id: userId });
  return result;
};

exports.fetchSingleUser = async (params) => {
  const { userId } = params;

  const query = await Users.findById(userId);
  return query;
};

exports.patchSingleUser = async (id, info) => {
  const { userId } = id;
  const { avatar_url, email, name, location, password } = info;

  const query = await Users.findById(userId);

  query.avatar_url = avatar_url;
  query.email = email;
  query.name.first = name.first;
  query.name.last = name.last;
  query.location.postcode = location.postcode;
  query.location.city = location.city;
  query.location.country = location.country;
  query.password = password;

  await query.save();

  return query;
};

exports.fetchFriends = async (id) => {
  const { userId } = id;

  let query = await Users.findById(userId).populate("friends");

  console.log(query.friends);
  return query.friends;
};

exports.fetchGroups = async (id) => {
  const { userId } = id;

  let query = await Users.findById(userId).populate("group");

  return query.group;
};

exports.fetchVenues = async (id) => {
  const { userId } = id;

  let query = await Users.findById(userId).populate("venues");

  return query.venues;
};

exports.fetchUsersByQuery = async (queries) => {
  const { name = false, email = false, username = false } = queries;
  let search = {}
  if (name) {
    const names = name.split(' ') 
    search.name = {}
    search.name.first = names[0]
    search.name.last = names[1]
  }
  if (email) search.email = email
  if (username) search.username = username
  let query = await Users.find(search)

  return query;
}

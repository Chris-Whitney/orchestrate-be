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
  const { username, name = false, email, location = false, instruments = false, avatar_url = false } =
    body;
  const newUser = {}
  newUser.username = username
  newUser.email = email
  newUser.hash = hash
  newUser.salt = salt
  if (name) newUser.name = name

  if (avatar_url) {
    newUser.avatar_url = avatar_url
  }
  else {
    newUser.avatar_url = `https://avatars.dicebear.com/api/initials/${username}.svg`
  }
  if (location) newUser.location = location

  if (instruments) newUser.instruments = instruments

  await Users.create(newUser);

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
  return query.friends;
};

exports.fetchGroups = async (id) => {
  const { userId } = id

  let query = await Users.findById(userId).populate("group");

  return query.group
};

exports.fetchVenues = async (id) => {
  const { userId } = id

  let query = await Users.findById(userId).populate("venues");

  return query.venues;
};

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

exports.deleteUserEvent = async (params) => {
  const { eventId, userId } = params
  const query = await Users.findById(userId)
  let updatedEvents = []
  for (let i = 0; i < query.events.length; i++) {
    if (query.events[i].id === eventId) {
      continue
    }
    updatedEvents.push(query.events[i])
  }
  query.events = updatedEvents
  query.save()
  return query.events
}

exports.postVenues = async (id) => {
  const { userId } = id
  const query = await Users.findById(userId)
  query.venues.push(info)
  query.save()
  return query.events
}

exports.deleteVenues = async (params) => {
  const { venueId, userId } = params
  const query = await Users.findById(userId)
  let updatedVenues = []
  for (let i = 0; i < query.venues.length; i++) {
    if (query.venues[i].id === venueId) {
      continue
    }
    updatedVenues.push(query.venues[i])
  }
  query.venues = updatedVenues
  query.save()
  return query.venues
}

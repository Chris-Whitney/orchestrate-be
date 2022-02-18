const Users = require("../Schemas/User.js");

exports.fetchUsers = async () => {
  let query = await Users.find({});

  return query;
};

exports.postUser = async (body) => {
  const { username, name, email, location, instruments, avatar_url } = body;
  try {
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
    });
    let result = await Users.find({ username: username });
    return result;
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (body) => {
  const { id } = body;

  try {
    let result = await Users.deleteOne({ _id: id });
    return result;
  } catch (error) {
    console.log(error);
  }
};

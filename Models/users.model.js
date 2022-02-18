const User = require("../Schemas/User.js");
const Users = require("../Schemas/User.js");


exports.fetchUsers = async () => {
  let query = await Users.find({});

  return query;
};

exports.postUser = async (body) => {
  const { username, name, email, location, instruments, avatar_url } = body
  try {
    await User.create({
      username,
      avatar_url,
      name: {
        first: name.first,
        last: name.last
      },
      email,
      location: {
        postcode: location.postcode,
        city: location.city,
        country: location.country,
      },
      instruments
    })
    let result = await User.find({ username: username })
    return result

  } catch (error) {
    console.log(error)
  }


}

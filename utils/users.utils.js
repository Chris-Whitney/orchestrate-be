const Users = require("../Schemas/User.js");
exports.getIdbyUsername = async (username) => {
   const query = await Users.find({ username })
   return query._id
}
exports.userExists = async (username) => {
   const query = await Users.find({ username })
   console.log(query)
}
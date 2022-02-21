const Users = require("../Schemas/User.js");
exports.getIdByUsername = async (username) => {
   const query = await Users.find({ username })
   return query[0].id

}
exports.userExists = async (username) => {
   const query = await Users.find({ username })
   if (typeof query[0] === "object") {
      return true
   } else {
      return false
   }
}
const app = require("./app");
const Group = require("./Schemas/Group");
const User = require("./Schemas/User");

app.listen(9090, async () => {
  console.log("listening");

  // await User.create({
  //   username: 'Billie',
  //   password: 'password123',
  //   email: 'billie@gmail.com',
  //   instruments: ['guitar'],
  //   friends: ['620fb8208aa0f467bc6e63f5']
  // })

  // const query = await User.find({ username: "Steve" });

  // query[0].group = ["620fc4a5ad45abc5b6ee6547"];
  // await query[0].save();

  // const query = await User.find({ usernme: 'Steve'})

  // query[0].venues = ['620fbd088a86c442a7083532']
  // await query[0].save();


});

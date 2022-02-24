const app = require("./app");
const Group = require("./Schemas/Group");
const User = require("./Schemas/User");

const { PORT = 9090 } = process.env;
app.listen(PORT, async () => {
  // const query = await User.find({ username: 'Steve'})

  // query[0].venues.push("6213739ee4ff4e521a587e2b")
  // await query[0].save()
  console.log(`Listening on ${PORT}...`)
})


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

  // const query = await User.find({ username: 'Steve'})

  // query.venues.push("6213739ee4ff4e521a587e2b")
  // await query[0].save();


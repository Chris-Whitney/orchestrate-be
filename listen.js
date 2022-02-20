const app = require("./app");
const Group = require("./Schemas/Group");
const User = require("./Schemas/User");

app.listen(9090, async () => {
  await Group.deleteMany({ contact: { name: "Steve", email: 'Steve@group.com' } })
  console.log("listening");
});

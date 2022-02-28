const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");

beforeAll((done) => {
  done();
});

afterAll((done) => {
  // Closing the connection to exit successfully.
  mongoose.connection.close();
  done();
});

describe("/API", () => {
  describe("attempted to reach an invalid endpoint", () => {
    test("status 404 and message ", () => {
      return request(app)
        .get("/invalid_url")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Invalid URL");
        });
    });
  });
  describe("attempted to reach the api endpoint", () => {
    test("status: 200 returns a json with api instructions", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((res) => {
          expect(typeof res.body).toBe("object");
        });
    });
  });
});
describe("API/USERS", () => {
  describe("Get users", () => {
    test("Status 200: Returns object", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((res) => {
          expect(typeof res.body.users).toBe("object");
        });
    });
    test("Status 200: Returned users have required keys", () => {
      const keys = [
        "name",
        "location",
        "_id",
        "avatar_url",
        "username",
        "email",
        "instruments",
        "group",
        "friends",
        "venues",
        "__v",
      ];
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((res) => {
          expect(res.body.users.length > 0).toBe(true);
          res.body.users.forEach((result) => {
            expect(Object.keys(result)).toEqual(keys);
          });
        });
    });
    test("status 200: returned all users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((res) => {
          expect(res.body.users.length).toBe(1);
        });
    });
  });
});
describe("API/USERS", () => {
  describe("Post users", () => {
    let userid;
    let user = {
      username: "Craig",
      avatar_url: "https://avatars.dicebear.com/api/adventurer/Craig.svg",
      name: {
        first: "Craig",
        last: "Testing",
      },
      email: "Craig@Test.com",
      location: {
        postcode: "m1 09s",
        city: "Manchester",
        country: "England",
      },
      instruments: ["Banjo"],
    };
    test("Status 201: Creates a user and returns the user object", () => {
      return request(app)
        .post("/api/users")
        .send(user)
        .expect(201)
        .then((res) => {
          expect(typeof res.body.user).toBe("object");
          expect(res.body.user[0].username).toBe("Craig");
          userid = res.body.user[0]._id;
        })
        .then(() => {
          return request(app)
            .delete(`/api/users`)
            .send({ id: userid })
            .expect(204);
        });
    });
    test('Status 400: returns "already taken" with the usename in the value prop when duplicate username is found ', () => {
      let newuser = { ...user };
      newuser.username = "Steve";
      return request(app)
        .post("/api/users")
        .send(newuser)
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("already taken");
          expect(res.body.value).toEqual({ username: "Steve" });
        });
    });
  });
  describe("Delete users", () => {
    let userid;
    let user = {
      username: "Craig",
      avatar_url: "https://avatars.dicebear.com/api/adventurer/Craig.svg",
      name: {
        first: "Craig",
        last: "Testing",
      },
      email: "Craig@Test.com",
      location: {
        postcode: "m1 09s",
        city: "Manchester",
        country: "England",
      },
      instruments: ["Banjo"],
    };
    test("Status 204: Deletes a user by userID", () => {
      return request(app)
        .post("/api/users")
        .send(user)
        .expect(201)
        .then((res) => {
          expect(typeof res.body.user).toBe("object");
          expect(res.body.user[0].username).toBe("Craig");
          userid = res.body.user[0]._id;
        })
        .then(() => {
          return request(app)
            .delete(`/api/users`)
            .send({ id: userid })
            .expect(204);
        });
    });
  });
});
describe("API/GROUPS", () => {
  describe("Get groups", () => {
    test("Status 200: Returns object", () => {
      return request(app)
        .get("/api/groups")
        .expect(200)
        .then((res) => {
          expect(typeof res.body.groups).toBe("object");
        });
    });
    test("Status 200: Returned groups have required keys", () => {
      const keys = [
        "contact",
        "_id",
        "owner",
        "name",
        "avatar_url",
        "members",
        "__v",
      ];
      return request(app)
        .get("/api/groups")
        .expect(200)
        .then((res) => {
          expect(res.body.groups.length > 0).toBe(true);
          res.body.groups.forEach((result) => {
            expect(Object.keys(result)).toEqual(keys);
          });
        });
    });
    test("status 200: returned all groups", () => {
      return request(app)
        .get("/api/groups")
        .expect(200)
        .then((res) => {
          expect(res.body.groups.length).toBe(1);
        });
    });
  });
  describe("Post groups", () => {
    let group = {
      owner: "620fb8208aa0f467bc6e63f5",
      contact: {
        name: "Steve",
        email: "Steve@group.com",
      },
      name: "Steves Group",
      avatar_url: "https://avatars.dicebear.com/api/adventurer/steveg.svg",
    };
    let groupid;
    test("Status 201: creates the group and returns object", () => {
      return request(app)
        .post("/api/groups")
        .send(group)
        .expect(201)
        .then((res) => {
          expect(typeof res.body.group).toBe("object");
          expect(res.body.group[0].name).toEqual("Steves Group");
          groupid = res.body.group[0]._id;
        })
        .then(() => {
          return request(app)
            .delete("/api/groups")
            .send({ id: groupid })
            .expect(204);
        });
    });
    test('Status 400: returns "already taken" with the group name in the value prop when duplicate username is found ', () => {
      let newgroup = { ...group };
      newgroup.name = "Tommy's Tambourines";
      return request(app)
        .post("/api/groups")
        .send(newgroup)
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("already taken");
          expect(res.body.value).toEqual({ name: "Tommy's Tambourines" });
        });
    });
  });
  describe("Delete groups", () => {
    let group = {
      owner: "620fb8208aa0f467bc6e63f5",
      contact: {
        name: "Steve",
        email: "Steve@group.com",
      },
      name: "Steves Group",
      avatar_url: "https://avatars.dicebear.com/api/adventurer/steveg.svg",
    };
    let groupid;
    test("Status 204: Deletes a group by groupID", () => {
      return request(app)
        .post("/api/groups")
        .send(group)
        .expect(201)
        .then((res) => {
          expect(typeof res.body.group).toBe("object");
          expect(res.body.group[0].name).toEqual("Steves Group");
          groupid = res.body.group[0]._id;
        })
        .then(() => {
          return request(app)
            .delete("/api/groups")
            .send({ id: groupid })
            .expect(204);
        });
    });
  });
});
describe("API/VENUES", () => {
  describe("Get venues", () => {
    test("Status 200: Returns object", () => {
      return request(app)
        .get("/api/venues")
        .expect(200)
        .then((res) => {
          expect(typeof res.body.venues).toBe("object");
        });
    });
    test("Status 200: Returned venues have required keys", () => {
      const keys = ["location", "contact", "_id", "name", "avatar_url", "__v"];
      return request(app)
        .get("/api/venues")
        .expect(200)
        .then((res) => {
          expect(res.body.venues.length > 0).toBe(true);
          res.body.venues.forEach((result) => {
            expect(Object.keys(result)).toEqual(keys);
          });
        });
    });
    test("status 200: returned all groups", () => {
      return request(app)
        .get("/api/venues")
        .expect(200)
        .then((res) => {
          expect(res.body.venues.length).toBe(1);
        });
    });
  });
  describe("Post venue", () => {
    let venue = {
      name: "testvenue",
      location: {
        street: "test",
        number: 1,
        postcode: "1234 12",
        city: "test",
        country: "test",
      },
      contact: {
        name: "test",
        number: "124512354",
        email: "123452@14.com",
      },
      avatar_url: "https://avatars.dicebear.com/api/adventurer/steveg.svg",
    };
    let venueid;
    test("Status 201: creates the venue and returns object", () => {
      return request(app)
        .post("/api/venues")
        .send(venue)
        .expect(201)
        .then((res) => {
          expect(typeof res.body.venue).toBe("object");
          expect(res.body.venue[0].name).toEqual("testvenue");
          venueid = res.body.venue[0]._id;
        })
        .then(() => {
          return request(app)
            .delete("/api/venues")
            .send({ id: venueid })
            .expect(204);
        });
    });
    test('Status 400: returns "already taken" with the venue name in the value prop when duplicate name is found ', () => {
      let newvenue = { ...venue };
      newvenue.name = "Bridgewater";
      return request(app)
        .post("/api/venues")
        .send(newvenue)
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("already taken");
          expect(res.body.value).toEqual({ name: "Bridgewater" });
        });
    });
  });
  describe("Delete venue", () => {
    let venue = {
      name: "testvenue",
      location: {
        street: "test",
        number: 1,
        postcode: "1234 12",
        city: "test",
        country: "test",
      },
      contact: {
        name: "test",
        number: "124512354",
        email: "123452@14.com",
      },
      avatar_url: "https://avatars.dicebear.com/api/adventurer/steveg.svg",
    };
    let venueid;
    test("Status 204: Deletes a venue by venueId", () => {
      return request(app)
        .post("/api/venues")
        .send(venue)
        .expect(201)
        .then((res) => {
          expect(typeof res.body.venue).toBe("object");
          expect(res.body.venue[0].name).toEqual("testvenue");
          venueid = res.body.venue[0]._id;
        })
        .then(() => {
          return request(app)
            .delete("/api/venues")
            .send({ id: venueid })
            .expect(204);
        });
    });
  });
});

describe("Patch user", () => {
  describe("Patch single user", () => {
    const updatedInfo = {
      name: {
        first: "Steve",
        last: "Stevenson",
      },
      avatar_url: "https://avatars.dicebear.com/api/adventurer/erge.svg",
      email: "steve@gmail.com",
      location: {
        postcode: "m1 09s",
        city: "Manchester",
        country: "England",
      },
      password: "password",
    };
    test("Status 200: should amend a single user details and return an object", () => {
      return request(app)
        .patch("/api/users/620fb8208aa0f467bc6e63f5")
        .send(updatedInfo)
        .expect(200)
        .then((res) => {
          expect(res.body.patch.email).toEqual("steve@gmail.com");
        });
    });
    test("Status 200: should return newly amended details", () => {
      return request(app)
        .get("/api/users/620fb8208aa0f467bc6e63f5")
        .expect(200)
        .then((res) => {
          expect(res.body.user.email).toEqual("steve@gmail.com");
        });
    });
  });
});

describe("Patch venue", () => {
  describe("Patch single venue", () => {
    const updatedVenue = {
      name: "Bridgewater Hall",
      avatar_url: "https://avatars.dicebear.com/api/adventurer/bridgewater.svg",
      location: {
        street: "Oxford Road",
        number: 7,
        postcode: "M1 7DS",
        city: "Manchester",
        country: "England",
      },
      contact: {
        name: "Derrick",
        number: "0161 521291",
        email: "derrick@bridgewater.com",
      },
    };
    test("Status 200: should amend a single venue and return an object", () => {
      return request(app)
        .patch("/api/venues/620fbd088a86c442a7083532")
        .send(updatedVenue)
        .expect(200)
        .then((res) => {
          expect(res.body.patch.name).toEqual("Bridgewater Hall");
        });
    });
    test("Status 200: should return newly amended details", () => {
      return request(app)
        .get("/api/venues/620fbd088a86c442a7083532")
        .expect(200)
        .then((res) => {
          expect(res.body.venue.name).toEqual("Bridgewater Hall");
        });
    });
  });
});

describe("Patch Group", () => {
  describe("Patch single group", () => {
    const updatedGroup = {
      contact: {
        name: "Tommy",
        email: "tommy@hotmail.com",
      },
      name: "Timm's Triangles",
      avatar_url: "https://avatars.dicebear.com/api/adventurer/tommy.svg",
    };
    test("Status 200: should amend ma single group and return an object", () => {
      return request(app)
        .patch("/api/groups/620fc4a5ad45abc5b6ee6547")
        .send(updatedGroup)
        .expect(200)
        .then((res) => {
          expect(res.body.patch.name).toEqual(`Timm's Triangles`);
        });
    });
    test("Status 200: should return newly amended details", () => {
      return request(app)
        .get("/api/groups/620fc4a5ad45abc5b6ee6547")
        .expect(200)
        .then((res) => {
          expect(res.body.group.name).toEqual(`Timm's Triangles`);
        });
    });
  });
});

describe("Get friends", () => {
  describe("fetch all friends for a user", () => {
    test("Status 200: should return a users friends", () => {
      return request(app)
        .get("/api/users/62137d8805fc31206fb0502e/friends")
        .expect(200)
        .then((res) => {
          expect(res.body.friends[0].username).toEqual("Steve");
        });
    });
  });
});

describe("Get groups", () => {
  describe("fetch groups for a user", () => {
    test("Status 200: should return a users groups", () => {
      return request(app)
        .get("/api/users/620fb8208aa0f467bc6e63f5/groups")
        .expect(200)
        .then((res) => {
          expect(res.body.groups[0].name).toEqual(`Timm's Triangles`);
        });
    });
  });
});

describe("Get venues", () => {
  describe("fetch venues for a user", () => {
    test("Status 200: should return a users venues", () => {
      return request(app)
        .get("/api/users/620fb8208aa0f467bc6e63f5/venues")
        .expect(200)
        .then((res) => {
          expect(res.body.venues[0].name).toEqual("Bridgewater Hall");
        });
    });
  });
});

describe('Get members', () => {
  describe('fetch members of a group', () => {
    test('Status 200: should return a list of members for a specific group', () => {
      return request(app)
        .get('/api/groups/620fc4a5ad45abc5b6ee6547/members')
        .expect(200)
        .then((res) => {
          expect(res.body.members[0].name.first).toEqual("Steve");
        })
    });
  });
});

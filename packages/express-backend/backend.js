import express from "express";

const app = express();
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    },
    {
      id:"crazy456",
      name:"Aaron",
      job:"Software Engineer"
    }
  ]
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const removeUserById = (id) => {
  const user = findUserById(id)
  if(user !== undefined) {
    users["users_list"] = users["users_list"].filter((user) => user.id!==id)
  }
}
app.use(express.json());

app.post("/users", (req, res) => {
  const userToAdd = req.body;d
  addUser(userToAdd);
  console.log("user added", userToAdd);
  res.send();
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.delete("/users/:id", (req,res) => {
  const id = req.params["id"];
  let userToBeDeleted = findUserById(id);
  if(userToBeDeleted == undefined) {
    res.status(404).send("Resource not found.");
  } else {
    removeUserById(id);
  }
  
});

app.use(express.json());

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});



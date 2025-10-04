import cors from "cors";
import express from "express";


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.post("/users", (req, res) => {
  const userToAddNoId = req.body;
  const userToAdd = generateRandomId(userToAddNoId);
  addUser(userToAdd);
  console.log("user added", userToAdd);
  res.status(201).json(userToAdd);
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
  const job = req.query.job;
  if (name != undefined && job != undefined) {
    let result = findUserByNameAndJob(name,job);
    result = { users_list: result };
    res.send(result);
  }
  else if(name != undefined)
  {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } 
  else if(job != undefined)
  {
    let result = findUserByJob(job);
    result = { users_list: result };
    res.send(result);
  }
  else 
  {
    res.send(users);
  }
});



app.delete("/users/:id", (req,res) => {
  const id = req.params["id"];
  let remove = findUserById(id);
  if(remove == undefined) {
    res.status(404).send("Resource not found.");
  } else {
    const userRemoved = removeUser(id);
    console.log("user removed: ", userRemoved);
    res.status(204).send();
    
  } 
});


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


const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => (user["name"] === name) && (user["job"] === job)
  );
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => (user["name"] === name)
  );
};

const findUserByJob = (job) => {
  return users["users_list"].filter(
    (user) =>  (user["job"] === job)
  );
};
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};
const generateRandomId = (user) => { 
  user.id = randomThreeLetters()+(Math.floor(Math.random() * 900) + 100); 
  return user
};
const removeUser = (id) => {
  const user = findUserById(id)
  if(user !== undefined) {
    users["users_list"] = users["users_list"].filter((user) => user.id!==id)
  }
  return user;
};

function randomThreeLetters(){
  const alphabet = "abcedfghijklmnopqrstuvwxyz"
  let result = "";
  while(result.length!=3)
  {
    const randomLetter = alphabet.charAt(Math.floor(Math.random()*alphabet.length));
    result+=randomLetter;
  }
  return result;
}




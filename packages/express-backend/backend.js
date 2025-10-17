import cors from "cors";
import express from "express";
import userServices from "./user-services.js"

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.post("/users", async(req, res) => {
  const userToAddNoId = req.body;
  const userToAdd = generateRandomId(userToAddNoId);
  userServices.addUser(userToAdd)
  .then((createdUser) => {
    console.log("user added", createdUser);
    res.status(201).json(createdUser);})
  .catch((error)=>{
    console.error("Error adding user:", error);
    res.status(500).send("Internal Server Error");});
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id; 
  userServices.findUserById(id)
  .then((user) => {
    if (!user) {
      res.status(404).send("Resource not found.");
    } else {
      res.json(user);
    }
  })
  .catch((err) => {
    console.error("Error fetching user:", err);
    res.status(500).send("Internal Server Error");
  });
});

app.get("/users", (req, res) => {
  const {name, job} = req.query;
  userServices.getUsers(name,job)
  .then((users) => {res.json({users_list: users})})
  .catch((error) => {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error");
  });
});

app.delete("/users/:id", (req,res) => {
  const id = req.params["id"];
  userServices.deleteUserById(id)
  .then((deletedUser) => {
    if (!deletedUser) {
      res.status(404).send("Resource not found.");
    } else {
      console.log("User deleted:", deletedUser);
      res.status(204).send();
    }
  })
  .catch((err) => {
    console.error("Error deleting user:", err);
    res.status(500).send("Internal Server Error");
  });
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




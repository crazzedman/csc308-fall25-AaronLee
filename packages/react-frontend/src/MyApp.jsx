// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";




function MyApp() {
  const [characters, setCharacters] = useState([]);
  
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }
  function removeOneCharacter(id, index) {
    const promise = fetch(`http://localhost:8000/users/${id}`, {method: "DELETE"})
      .then((res) => {
        console.log("status code: ", res.status)
        if(res.status === 204)
        {
          setCharacters(characters.filter((character, i) => { return i !== index; }));
          
        }
        else if(res.status === 404)
        {
          throw new Error("Error in Deleting User");
        }
      })
      .catch((error) => { console.log(error); });
    return promise;
  }
  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(person),
    })
    .then((res) => { 
      console.log("HTTP status code:", res.status);
      if (res.status === 201) { return res.json(); }
      else { throw new Error("error in creating user"); }
    })
    .then((user) => {
      console.log("created user: ", user);
      return user;
    });
    return promise;

  };

  function updateList(person) { 
    postUser(person)
      .then((user) =>  setCharacters((characters)=> [...characters, user]))
      .catch((error) => { console.log(error);});
  }
  useEffect(() => {
    fetchUsers()
	  .then((res) => res.json())
	  .then((json) => setCharacters(json["users_list"]))
	  .catch((error) => { console.log(error); });
  }, [] );
  return (
  <div className="container">
    <Table characterData={characters} 
    removeCharacter={removeOneCharacter}
    />
    <Form handleSubmit={updateList} />
  </div>
  );
}



export default MyApp;
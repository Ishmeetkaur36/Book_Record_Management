const express = require("express");
const { users} = require("./data/users.json");
const {books} = require("./data/books.json")

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running",
    data: "hey",
  });
});

/*
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

app.get("/books" ,(req,res)=>{
    res.status(200).json({
        success:true,
        data:books,
    });
});

/*
 * Route: /users/:id
 * Method: GET
 * Description: Get user by id
 * Access: Public
 * Parameters: id
 */
app.get("/users/:id" , (req,res) => {
   const {id} = req.params;
   const user = users.find((each) => each.id === id);
   if(!user){
    return res.status(404).json({
      success : false,
      message : "USER DOES NOT EXIT !",
    });
   }
    return res.status(200).json({       
    succuss : true,
    message : "USER FOUND",
    data : user,
   }); 
});

/*
 * Route: /users
 * Method: POST
 * Description: Creating new user
 * Access: Public
 * Parameters: none
 */
app.post("/users" ,(req,res) =>{
  const {id, name, surname, email, subscriptionType ,subscriptionDate } = req.body

  const user =users.find((each) => each.id === id)
  if(user){
    return res.status(404).json({
      success : false,
      messsage : "User with this ID already exists!",
    });
  }

  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate
  });
  return res.status(201).json({
    success : true,
    message : "USER ADDED SUCCESSFULLY",
    data : users,
  });
});

/*
 * Route: /users/:id
 * Method: PUT
 * Description: Updating  a user by id
 * Access: Public
 * Parameters: id
 */
app.put("/users/:id" ,(req,res) =>{
  const {id} = req.params;
  const {data} = req.body;

  const user = users.find((each) => each.id === id);
  if(!user){
    return res.status(404).json({
      success : false,
      message : "USER DOES NOT EXIST !",
    });
  }
  const updateUserData = users.map((each)=>{
    if(each.id === id){
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success : true,
    message : "USER UPDATED SUCCESSFULLY",
    data : updateUserData,
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route doesn't exits",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
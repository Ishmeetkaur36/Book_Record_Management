const express = require("express");
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");
const router = express.Router();

//& http://localhost:8081/books

/*
 ^ Route: /books
 ^ Method: GET
 ^ Description: Get all users
 ^ Access: Public
 ^ Parameters: None
 */
router.get("/" ,(req,res)=>{
    res.status(200).json({
        success:true,
        data:books,
    });
});

/*
 ^ Route: /books/issued
 ^ Method: GET
 ^ Description: Get all issued books
 ^ Access: Public
 ^ Parameters: none
 */

 router.get("/issued", (req, res) => {
  const usersWithTheIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  const issuedBooks = [];

  usersWithTheIssuedBook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);

    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "NOO BOOKS HAVE BEEN ISSUED YET",
    });
  }
  return res.status(200).json({
    success: true,
    message: "USERS WITH ISSUED BOOKS",
    data: issuedBooks,
  });
});

/*
 ^ Route: /books/:id
 ^ Method: GET
 ^ Description: Get user by id
 ^ Access: Public
 ^ Parameters: id
 */

 router.get("/:id" , (req,res) =>{
    const {id} = req.params;
    const book = books.find((each) => each.id === id);
    if(!book){
        return res.status(404).json({
            success : false,
            message : "BOOK NOT FOUND"
        });
    }
    return res.status(200).json({
        success : true,
        message : "BOOK FOUND",
        data : book,
    });
 });

 








module.exports = router;

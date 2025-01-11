const express = require("express");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Server is up and running",
    });
});

app.get("*" , (req,res) =>{
    res.status(404).json({
        message: "Path does not exists",
    });
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
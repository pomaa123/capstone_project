import express from "express";
import bodyParser from "body-parser";

const app = express();
const port=3000;
let savedUserEmail = "";
let savedPassword = "";
let isLoggedIn = false;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/signup", (req, res) => {
    res.render("signup.ejs");
})

app.get("/login", (req, res) => {
    res.render("login.ejs");
})

app.get("/create-post", (req,res) => {
    if (isLoggedIn) {
       res.render("content.ejs"); 
    } else{
        res.redirect("/login")
    }
    
})

app.post("/signup", (req, res) => {
     savedUserEmail=req.body["email"];
     savedPassword=req.body["password"];
    res.render("success.ejs");
})


app.post("/login", (req, res) => {
    if (savedUserEmail === req.body.email && savedPassword === req.body.password) {
        isLoggedIn = true;
        res.render("index.ejs", {
            userName: req.body.username
        });
    } else{ res.redirect("/login")}
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

const bodyParser=require("body-parser");
const express=require("express");
const mongoose=require("mongoose");
const ejs = require("ejs");

const app = express();

mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser: true, 
useUnifiedTopology: true, 
useCreateIndex: true, 
useFindAndModify: false});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article",articleSchema);

app.get("/articles",function(req,res){
    Article.find(function(err,foundArticles){
        if(err){
            res.send(err);
        }else{
            res.send(foundArticles);
        }
        
        
    });
});

app.listen(3000,function(){
    console.log("Server is listening on port 3000");
    
});
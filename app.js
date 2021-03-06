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

app.route("/articles")

.get(function(req,res){
    Article.find(function(err,foundArticles){
        if(err){
            res.send(err);
        }else{
            res.send(foundArticles);
        }
    });
})

.post(function(req,res){
    console.log(req.body.title);
    console.log(req.body.content);
    
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save(function(err){
        if(err){
            res.send(err);
        }else{
            res.send("Successfully added");
        }
    });
})

.delete(function(req,res){
    Article.deleteMany(function(err){
        if(err){
            res.send(err);
        }else{
            res.send("Successfully deleted");
        }
    });
});

app.listen(3000,function(){
    console.log("Server is listening on port 3000");
    
});
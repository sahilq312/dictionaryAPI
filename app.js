const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const ejs = require("ejs")
const _ = require("lodash")

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.render("search")

})

app.post("/", function(req,res){
    const Word = req.body.word;
    //console.log(Word);
    res.redirect("/search/"+Word)
})

app.get("/search/:meaning", function(req,res){
    
    const requestedWord =  _.lowerCase(req.params.meaning);
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"+requestedWord;
    https.get(url, function(response){
        //console.log(response.statusCode);

        response.on("data", function(data){
            const defination = JSON.parse(data);
            const WORD = defination[0].word;
            console.log(WORD)
            const PHONETIC = defination[0].phonetic;
            const MEANING = defination[0].meanings[0].definitions[0].definition
            //console.log(MEANING)
            res.render('home', {  WORD, PHONETIC, MEANING})
        })
    })
})



app.listen(3000, function(req,res){
    console.log("server is running on http://localhost:3000");
})
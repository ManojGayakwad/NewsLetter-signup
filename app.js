const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const data = {
        members:[
            {email_address: email,
             status : "subscribed",
             merge_fields:{
                FNAME: firstName,
                LNAME: lastName
             }
            }
            
        ]
    };

    const jsonData = JSON.stringify(data);

    const url ="https://us8.api.mailchimp.com/3.0/lists/f4da85c4f7";
    const Option={
        method:"POST",
        auth:"manoj1:0a0a6a6fbd16ac4ffe39376e5e846375-us8"
    }

    const request = https.request(url, Option, function(response){
        if(res.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});
app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});









//API Key
//0a0a6a6fbd16ac4ffe39376e5e846375-us8
//list ID
//f4da85c4f7
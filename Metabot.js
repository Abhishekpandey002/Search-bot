const serverless = require('serverless-http');

const axios = require("axios")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const url=require("url");


app.use(bodyParser.json());

//POST method for "/search endpoint"

app.post("/search",(req,res)=>{
    // customer query or message 
    let query=req.body.message;
    //checking if query is correct
    console.log(query);
    // fetching result according to the customer query through SerpAPI
    // API key will vary according to serpAPI account
    axios.get(`https://serpapi.com/search.json?q=${query}&hl=en&gl=us&google_domain=google.com&api_key=a2b4ab26e4166cf5592abc3a0056008be4618a2dbb56a2164dc5bb72920b3966`)
    .then(data=>{
         //Handling the response given by SerpAPI

         //Sending the required info through response object
        return res.status(200).send([{
         // To know what part to access go to serpAPI dashboard and see how its response object looks
            "message": `${data["data"]["organic_results"][0]["snippet"]}`
        }])
    })
    
  
})

   
//Setting up port for app to listen
app.listen(process.env.PORT || 8080)    

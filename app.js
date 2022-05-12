const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require("dotenv").config();


const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const city = req.body.cityName ;
  const apiKey = process.env.YOUR_API_KEY;
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit ;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";

      res.write("<p>The weather condition is "+weatherDescription+"</p>");
      res.write("<h1>The temperature in "+city+" is "+temp+" degrees Celcius</h1>");
      res.write("<img src = "+iconUrl+">");
      res.send();
    })
  })
})

app.listen('3000',function(){
  console.log('Server is now running at port 3000');
});





// var url = "https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=c798ed3fd96c02090d64111808046c45&units=metric" ;
// https.get(url,function(response){
//   console.log(response.statusCode);
//
//   response.on("data",function(data){
//     const weatherData = JSON.parse(data);
//     const temp = weatherData.main.temp;
//     const weatherDescription = weatherData.weather[0].description;
//     const icon = weatherData.weather[0].icon;
//     const iconImage = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
//     res.write("<p>The weather conditon is "+weatherDescription+"</p>");
//     res.write("<h1>The temparature in Delhi is "+temp+" degress Celcius</h1>");
//     res.write("<img src = "+iconImage+">");
//     res.send();
//   })
// });

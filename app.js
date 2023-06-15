const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    
   res.sendFile(__dirname + "/index.html")
   
})

app.post("/", function(req,res){
    
    const query = req.body.cityName;
    const apiKey = "d22181809f9daaeaf9b1974741460e16";
    const unit ="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey + ""
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const WeatherData = JSON.parse(data);
            const temp = WeatherData.main.temp;
            const description = WeatherData.weather[0].description;
            const icon = WeatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
            res.write("The weather is currently " + description);
            res.write("<img src=" + imageURL +">");
            res.send()
        })

    })

})

app.listen(3000, function(){
    console.log("Setver is running on port 3000");
})
const express = require('express');
const http = require('http');


const app = express();

app.use(express.urlencoded({extended:true}));

app.get('/', (req, res)=>{

    res.sendFile(__dirname + "/index.html")
})

app.post('/', (req,res)=>{

    const query = req.body.cityName;
    const apiKey = '74b44f8e2c0980f97a0acec69cbbf9a0';
    const unit = 'metric';

    const url = "http://api.openweathermap.org/data/2.5/weather?q=" +query+ ",India&appid="+ apiKey +"&units=" + unit +"";
   
    http.get(url, (response) =>{
        console.log(response);

    response.on('data', (data) =>{
        const weatherData = JSON.parse(data);
        console.log(weatherData)

        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const tempMin = weatherData.main.temp_min;
        const tempMax = weatherData.main.temp_max;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"

        res.write(`<h1>Current Temperature in ${query} is ${temperature} degree celsius with ${description}</h1>`);
        res.write(`<p>Minimum temperature: ${tempMin}Celsius
    Maximum temperature: ${tempMax}Celsius </p>`)

        res.write(`<div style="border: 2px solid black; padding: 10px; width: 200px; margin: 20px 10px; text-align: left; ">`);
        res.write(`<img src="${imageUrl}" alt="Weather Icon">`)
        res.write(`</div>`)

        res.end()
          
         })

    })


    console.log('Post request received successfully!')

})



app.listen(3000, ()=>{
    console.log(`Server is running on port 3000`)
})
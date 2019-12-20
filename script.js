var APIkey= "7035bbd87f29595c295712a11e5669aa";
$(document).ready(function () {
    
    

    function show(data) {

        
        return "<h2>" + data.name + moment().format(' (MM/DD/YYYY)') + "</h2>" +
            `
    <p><strong>Temperature</strong>: ${data.main.temp} &#8457</p> 
    <p><strong>Humidity</strong>: ${data.main.humidity}%</p>
    <p><strong>Wind Speed</strong>: ${data.wind.speed} MPH</p>
    <p><strong>UV Index</strong>:${data.coord.lat, data.coord.lon}</p>
    `
    
    
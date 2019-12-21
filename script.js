
$(document).ready(function () {
    
    //FUNCTION

    function show(data) {

        
        return "<h2>" + data.name + moment().format(' (MM/DD/YYYY)') + "</h2>" +
            `
    <p><strong>Temperature</strong>: ${data.main.temp} &#8457</p> 
    <p><strong>Humidity</strong>: ${data.main.humidity}%</p>
    <p><strong>Wind Speed</strong>: ${data.wind.speed} MPH</p>
    <p><strong>UV Index</strong>:${data.coord.lat, data.coord.lon}</p>
    `
    }
    function displayCities(cityList) {
        $('.city-list').empty();
        var list = localStorage.getItem("cityList");
        cityList = (JSON.parse(list));
        
        if (list) {
            for (var i = 0; i < cityList.length; i++) {
                var container = $("<div class=card></div>").text(cityList[i]);
                $('.city-list').prepend(container);
            }
        }
    }
    
    function showForecast(data) {
        var forecast = data.list;
        // test for connection
        console.log("DATALIST", data.list);
       
        var currentForecast = [];
        for (var i = 0; i < forecast.length; i++) {

            var currentObject = forecast[i];
            
            var dt_time = currentObject.dt_txt.split(' ')[1] 
            
            if (dt_time === "12:00:00") {
                // currentObject.main ... time, icon, temp, humidity
                var main = currentObject.main;
                // Store each of these in variables
                var temp = main.temp; 
                var humidity = main.humidity;
                var date = moment(currentObject.dt_txt).format('l'); 
                var icon = currentObject.weather[0].icon;
                
                console.log('ICON',currentObject.weather[0].icon);
                var iconurl = "https://openweathermap.org/img/w/" + icon + ".png";

                let htmlTemplate = `
            <div class="col-sm currentCondition">
            <div class="card">
                <div class="card-body 5-day">
                    <p><strong>${date}</strong></p>
                    <div><img src=${iconurl} /></div>
                    <p>Temp: ${temp} &#8457</p>
                    <p>Humidity: ${humidity}%</p>
                </div>
            </div> 
        </div>`;
                currentForecast.push(htmlTemplate);
            }

        }
        $("#5-day-forecast").html(currentForecast.join(''));

    }

    //METHODS

    var stored = localStorage.getItem("cityList")
    if (stored) {
        cityList = JSON.parse(stored);
    } else {
        cityList = [];
    }
    
    $('#submitCity').click(function (event) {
        
        console.log("submited");
        event.preventDefault();
        var city = $('#city').val();
        var lat = 0;
        var lon = 0;
        
        cityList.push(city);
       
        localStorage.setItem("cityList", JSON.stringify(cityList));
        displayCities(cityList);
        if (city != '') {
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + "&APPID=7035bbd87f29595c295712a11e5669aa",
                type: "GET",
                success: function (data) {
                    console.log("WEATHER", data);
                    var display = show(data);
                    $("#show").html(display);
                }
              
            });    


            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + "&units=imperial" + "&APPID=7035bbd87f29595c295712a11e5669aa",
                type: "GET",
                success: function (data) {
                    showForecast(data);
                }
            });

           
            $.ajax({
                url:`https://api.openweathermap.org/data/2.5/uvi?appid=7035bbd87f29595c295712a11e5669aa=${lat}&lon=${lon}`,
                type: "GET",
                sucess: function (uvDisplay) {
                   console.log("uvDisplay", uvDisplay);
                
                 }
            });

        } else {
            $('#error').html('Please insert a city name:');
        }
    });

    displayCities(cityList);

});

                
                    
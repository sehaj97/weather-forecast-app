var cityInput = $("#city");
var cityFormEl = $("#city-form");
var searchHistory = $("#history-list");

var cityName = $("#city-name");
var currentDate = $("#today-date");
var weatherIcon = $("#weather-icon");

var currentTemp = $("#temp");
var currentWind = $("#wind");
var currentHumidity = $("#humid");
var currentUV = $("#uv");

var searchList = $("<ul>").addClass("list-group history-list-items");
varlistItem="";
inputNewValue = "";
inputOldValue = "";
counter = 0;
var formSubmitHandler = function(event) {
    
    event.preventDefault();
    if(cityInput.val() != ""){
        inputNewValue = cityInput.val();
        listItem = $("<button>").addClass("list-group-item text-white bg-secondary text-center mt-2 forecast-history-" + counter).text(cityInput.val()).val(inputNewValue);
        if($(".history-list-items button") === undefined){
            inputOldValue = "";
        }
        if(inputNewValue != inputOldValue){
            $(".history-list-items").prepend(listItem);
            inputOldValue = $(".history-list-items button")[0].value;
            if($(".history-list-items button").length > 8){
                $(".list-group-item").last().remove();
                counter = 0;
            }
        }
        
        getApiInfo(cityInput.val());
        $('body').on('click', ".forecast-history-" + counter, function() {
            getApiInfo( $(this).val());
        });
        cityInput.val("");
        counter++;

    } else {
     alert("please provide city!");
    }
};

function getApiInfo(city) {
    var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ccc3725be18b1f525c1c29bf9b604115";
    fetch(weatherAPI)
	.then(response => {
        if(response.ok){
            response.json().then(data => {
                displayCurrentWeather(data);
                displayForecastWeather(city);
            })
        } else {
            $(".list-group-item").first().remove();
            alert("please check your input is correct")
        }
    });
};


function displayCurrentWeather(data){
    cityName.text("city name");
    currentDate.text("date");
    weatherIcon.attr("src", "");
    currentTemp.text("");
    currentWind.text("");
    currentHumidity.text("");
    cityName.text(data.name);
    currentDate.text(moment().format("M/DD/YYYY"));
    console.log(data.weather);
    weatherIcon.attr("src", "https://openweathermap.org/img/wn/"+data.weather[0].icon+".png");
    currentTemp.text(Math.round((data.main.temp - 273.15) * (9/5) + 32));
    currentWind.text(data.wind.speed * 2.237);
    currentHumidity.text(data.main.humidity);
    getUVIndex(data.coord.lon,data.coord.lat);
}

function getUVIndex(lon,lat) {
    var allinOneAPI = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=hourly,daily,minutely&appid=ccc3725be18b1f525c1c29bf9b604115";
    fetch(allinOneAPI)
	.then(response => {
        if(response.ok){
            response.json().then(data => {
                currentUV.text(data.current.uvi);
                currentUV.removeClass("bg-info");
                if(data.current.uvi<=2){
                    currentUV.addClass("bg-success");
                } else if (data.current.uvi>2 && data.current.uvi<=5) {
                    currentUV.addClass("bg-warning");
                } else if (data.current.uvi>5) {
                    currentUV.addClass("bg-danger");
                } else {
                    currentUV.addClass("bg-info");
                }
            })
        } else {
            console.log("something went wrong please try again later")
        }
    });
};

function displayForecastWeather(city) {
    var forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=ccc3725be18b1f525c1c29bf9b604115";
    fetch(forecastAPI)
	.then(response => {
        if(response.ok){
            response.json().then(data => {
                console.log(data)
            })
        } else {
            console.log("something went wrong please try again later")
        }
    });
};
searchHistory.html("");
searchHistory.append(searchList);
cityFormEl.unbind('submit').bind('submit',  formSubmitHandler);

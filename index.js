var submitBtn = document.querySelector("#submit-button");

submitBtn.addEventListener("click", function() {
    event.preventDefault();
    
    var cityInput = document.querySelector("#city-input");
    var cityName = cityInput.value.trim();
    getWeather (cityName);
    console.log(cityName);
});

var getWeather = function (cityName) {
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=346f5b9d83ff18900a4fdcdbc47dcbde";
    // var forecastWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=346f5b9d83ff18900a4fdcdbc47dcbde";

    fetch(currentWeatherURL)
    .then(function(response) {
        console.log(response);
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
}
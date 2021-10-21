var submitBtn = document.querySelector("#submit-button");
// var mainCardCityEl = document.querySelector("#mainCardCity");

submitBtn.addEventListener("click", function() {
    event.preventDefault();
    
    var cityInput = document.querySelector("#city-input");
    var cityName = cityInput.value.trim();
    getWeather (cityName);
});

var getWeather = function (cityName) {
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=346f5b9d83ff18900a4fdcdbc47dcbde";
    // var forecastWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=346f5b9d83ff18900a4fdcdbc47dcbde";

    fetch(currentWeatherURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(currentWeather) {
        // Create/apply the city name to the HTML
        var mainCityName = currentWeather.name;
        mainCardCity.textContent = mainCityName;
        // Create/apply the current date to the HTML
        var mainDate = moment();
        mainCurrentDate.textContent = mainDate.format("M/D/YYYY");
        // Create/apply the current temp to the HTML
        var mainCityTemp = currentWeather.main.temp;
        mainCardTemp.textContent = ("Temperature: " + Math.floor(mainCityTemp) + "°F");
        // Create/apply the feels like temp to the HTML
        var mainFeelsLikeTemp = currentWeather.main.feels_like;
        mainCardFeelsLike.textContent = ("Feels Like: " + Math.floor(mainFeelsLikeTemp) + "°F");
        // Create/apply the current humidity to the HTML

    })
}
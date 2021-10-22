var submitBtn = document.querySelector("#submit-button");

submitBtn.addEventListener("click", function () {
    event.preventDefault();
    // Create a variable for the search input
    var cityInput = document.querySelector("#city-input");
    var cityName = cityInput.value.trim();
    getWeather(cityName);
    // Creating a button with teh recent city searches
    var cityListBtn = document.createElement("button");
    if (cityName === "") {
        alert("Field cannot be blank!")
        return false;
    } else {
        cityListBtn.textContent = cityName;
        cityListBtn.setAttribute("class", "list-group-item list-group-item-action list-group-item-dark");
        cityListBtn.setAttribute("class", "recent-city-btn");
        cityListBtn.setAttribute("data-value", cityName);
        cityList.appendChild(cityListBtn);
    }
    // Storing the recent city in local storage
    var storeCity = JSON.parse(localStorage.getItem("storeCity")) || [];
    storeCity.push(cityName);
    localStorage.setItem("storeCity", JSON.stringify(storeCity));
    // Selecting the previous city will return the correct data
    document.querySelectorAll(".recent-city-btn").forEach(function (returnCity) {
        returnCity.addEventListener("click", function () {
            var recentCity = this.getAttribute("data-value");
            getWeather(recentCity);
        })
    })

});

var getWeather = function (cityName) {
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=346f5b9d83ff18900a4fdcdbc47dcbde";
    var forecastWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=346f5b9d83ff18900a4fdcdbc47dcbde";

    fetch(currentWeatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (currentWeather) {
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
            var mainHumidity = currentWeather.main.humidity;
            mainCardHumid.textContent = ("Humidity: " + mainHumidity + "%");
            // Create/apply the current wind speed to the HTML
            var mainWindSpeed = currentWeather.wind.speed;
            mainCardWind.textContent = ("Wind Speed: " + Math.floor(mainWindSpeed) + " MPH");
            // Create/apply the weather icon tthe HTML
            var iconCode = currentWeather.weather[0].icon;
            var iconImg = document.createElement("img");
            iconImg.setAttribute("src", "http://openweathermap.org/img/w/" + iconCode + ".png");
            mainCurrentIcon.innerHTML = "";
            mainCurrentIcon.appendChild(iconImg);
            // Longittude & latitude variables to get the UV index
            var latitude = currentWeather.coord.lat
            var longitude = currentWeather.coord.lon
            var uvIndexURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=346f5b9d83ff18900a4fdcdbc47dcbde";
            fetch(uvIndexURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (uvIndex) {
                    // console.log(uvIndex);
                    // console.log(latitude);
                    // console.log(longitude);
                    var uvDisplay = uvIndex.current.uvi;
                    var uvDisplayBtn = document.createElement("button");
                    uvDisplayBtn.textContent = uvDisplay;
                    mainCardIndex.textContent = ("UV Index: ");
                    mainCardIndex.appendChild(uvDisplayBtn);
                    if (uvDisplay <= 2) {
                        uvDisplayBtn.setAttribute("class", "btn btn-success")
                    } else if (uvDisplay > 2 && uvDisplay <= 6) {
                        uvDisplayBtn.setAttribute("class", "btn btn-warning")
                    } else if (uvDisplay > 6) {
                        uvDisplayBtn.setAttribute("class", "btn btn-danger")
                    };
                })
            // Create title header for 5 forecast
            forecastTitle.textContent = ("5-Day Forecast");
        })
    fetch(forecastWeatherURL)
        .then(function (response) {
            return response.json();
        }).then(function (forcastedWeather) {
            // console.log(forcastedWeather);
            // Create for loop starting at 4 index to display noon
            // Every 8 index score is a fulll day (3 * 8  = 24 hours)
            // Show noon forecast info at these items in the list 4, 12, 20, 28, 36
            for (let i = 4; i < forcastedWeather.list.length; i += 8) {
                var forecastEl = forcastedWeather.list[i];
                // i needs to equal 1,2,3,4,5 to populate the cards
                var forecastItems = (i + 4) / 8;
                // Populate 5-day forecast cards
                var futureDate = moment().add(forecastItems, "days").format("M/D/YYYY");
                // date
                var populateCard = document.querySelector("#forecastCards" + forecastItems);
                populateCard.setAttribute("class", "text-white bg-primary card");
                var populateDate = document.querySelector("#forecastDate" + forecastItems);
                populateDate.innerHTML = "";
                populateDate.append(futureDate);
                // // temperature
                var populateTemp = document.querySelector("#forecastTemp" + forecastItems);
                populateTemp.innerHTML = "";
                populateTemp.append("Temp: " + Math.floor(forecastEl.main.temp) + "°F")
                // // humidity
                var populateHumid = document.querySelector("#forecastHumid" + forecastItems);
                populateHumid.innerHTML = "";
                populateHumid.append("Humidity: " + forecastEl.main.humidity + "%");
                // // icons
                var forecastIconCode = forecastEl.weather[0].icon;
                var forecastIconImg = document.createElement("img");
                forecastIconImg.setAttribute("src", "http://openweathermap.org/img/w/" + forecastIconCode + ".png");
                var populateIcon = document.querySelector("#forecastIcon" + forecastItems);
                populateIcon.innerHTML = "";
                populateIcon.append(forecastIconImg);
            }
        });
}
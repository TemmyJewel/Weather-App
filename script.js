// Api Key for oprn weather
const apiKey = "906a1dfdd3eebbd08aa6c90f8ad67f90";

// Base url
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="

// DOM elements to update weather details
const temp = document.querySelector(".temp");
const cityName = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const searchbtn = document.querySelector(".search button");
const searchInput = document.querySelector(".search input");
const weatherIcon = document.querySelector(".weather-icon")
const errorBox = document.querySelector(".error");
const weather = document.querySelector(".weather");
const units = document.getElementById("units");

// An object of different weather conditions anf their icons
const weatherIcons = {
    Clouds: "images/clouds.png",
    Clear: "images/clear.png",
    Rain: "images/rain.png",
    Drizzle: "images/drizzle.png",
    Mist: "images/mist.png",
}

// function to detch and display weather
async function checkWeather(city) {
    const selectedUnits = units.value;
    const response = await fetch(apiUrl + city + `&appid=${apiKey}&units=${selectedUnits}`);

//   Error shown of city not found
    if(response.status == 404){
        errorBox.style.display = "block";
        weather.style.display = "none";
    }
    else{
        const data = await response.json();
 
        // Updaye ui wirh weather details
        cityName.innerHTML = data.name;
        temp.innerHTML = Math.round(data.main.temp) + (selectedUnits === "metric" ? "°c" : "°F");
        humidity.innerHTML = data.main.humidity;
        wind.innerHTML = data.wind.speed  + "km/h";

        // Choose correct weather icon
        weatherIcon.src = weatherIcons[data.weather[0].main] || "images/clouds.png";
     
        // Show weather box and hide error
        errorBox.style.display = "none";
        weather.style.display = "block";
    }
}

// Event listener for when search button is clicked
searchbtn.addEventListener("click", ()=>{
    checkWeather(searchInput.value);
})

// Events listener to ipdate changes when unit changes
units.addEventListener("change", ()=>{
    if (searchInput.value !== ""){
        checkWeather(searchInput.value);
    }
})
const apiKey = "906a1dfdd3eebbd08aa6c90f8ad67f90";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const searchbtn = document.querySelector(".search button");
const searchInput = document.querySelector(".search input");
const weatherIcon = document.querySelector(".weather-icon")
const errorBox = document.querySelector(".error");
const weather = document.querySelector(".weather");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        errorBox.style.display = "block";
        weather.style.display = "none";
    }
    else{
        const data = await response.json();
        console.log(data);

        city.innerHTML = data.name;
        temp.innerHTML = Math.round(data.main.temp) + "°c";
        humidity.innerHTML = data.main.humidity;
        wind.innerHTML = data.wind.speed  + "km/h";

     if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
    }
     else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }
     else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }
     else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
    }

    }
}

searchbtn.addEventListener("click", ()=>{
    checkWeather(searchInput.value);
})
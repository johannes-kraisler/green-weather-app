// city search

let inputEl = document.querySelector("#city-input");
let cityEl = document.querySelector("#main-city");
let defaultCity = "Kyiv";
cityEl.innerHTML = defaultCity;
searchCity(defaultCity);

let searchFormEl = document.querySelector("#search-city");
searchFormEl.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  cityEl.innerHTML = inputEl.value;

  if (inputEl.value.length > 0) {
    searchCity(cityEl.innerHTML);
  } else {
    cityEl.innerHTML = "Your city?";
  }
}

// search city

function searchCity(city) {
  let key = "b5d468da4868eefa0bc957f375b485fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

//data of a certain city

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let cityTemp = document.querySelector("#temperature-now");
  cityTemp.innerHTML = Math.round(celsiusTemperature);
  let descriptionEl = document.querySelector("#description");
  descriptionEl.innerHTML = response.data.weather[0].description;
  let humidityEl = document.querySelector("#humidity");
  humidityEl.innerHTML = Math.round(response.data.main.humidity);
  let maxTempEl = document.querySelector("#max-temp");
  maxTempEl.innerHTML = Math.round(response.data.main.temp_max);
  let minTempEl = document.querySelector("#min-temp");
  minTempEl.innerHTML = Math.round(response.data.main.temp_min);
  let city = document.querySelector("#main-city");
  city.innerHTML = response.data.name;
  let timeEl = document.querySelector("#day-time");
  // calls function getDayTime
  timeEl.innerHTML = getDayTime(response.data.dt * 1000);
  let iconEl = document.querySelector("#icon-main");
  iconEl.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  //forecast
  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let key = "562f5cd9cac04a0ceac338ac4e531d8c";
  let urlApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`;

  axios.get(urlApi).then(displayForecast);
}

// time

function getDayTime(timestamp) {
  let currentDate = new Date(timestamp);
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let date = currentDate.getDate();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let day = days[currentDate.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentDate.getMonth()];

  return `${day}, ${month} ${date}, ${hours}:${minutes}`;
}

// buttons

function changeToFah() {
  let fahTempEl = document.querySelector("#temperature-now");
  fahTempEl.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", changeToFah);

function changeToCel() {
  let celTempEl = document.querySelector("#temperature-now");
  celTempEl.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let celsiusButton = document.querySelector("#celsius-button");
celsiusButton.addEventListener("click", changeToCel);

// forecast

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastEl = document.querySelector("#forecast");
  let forecastHTML = `<div class="row weather-days"> `;
  let days = ["Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-3">
        <p>${day}</p>
        <i class="fa-solid fa-sun sunny"></i>
        <p><strong>33°</strong> 20°</p>
    </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastEl.innerHTML = forecastHTML;
}

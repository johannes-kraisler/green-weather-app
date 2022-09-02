let city = "new york";
let key = "b5d468da4868eefa0bc957f375b485fb";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

//data of a certain city

function showTemperature(response) {
  let cityTemp = document.querySelector("#temperature-now");
  cityTemp.innerHTML = Math.round(response.data.main.temp);
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
  timeEl.innerHTML = getDayTime(response.data.dt * 1000);
  let iconEl = document.querySelector("#icon-main");
  iconEl.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
axios.get(apiUrl).then(showTemperature);

// buttons

function changeToFah() {
  let fahTempEl = document.querySelector("#temperature-now");
  fahTempEl.innerHTML = Math.round(11 * 1.8 + 32);
}

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", changeToFah);

function changeToCel() {
  let celTempEl = document.querySelector("#temperature-now");
  celTempEl.innerHTML = 11;
}

let celsiusButton = document.querySelector("#celsius-button");
celsiusButton.addEventListener("click", changeToCel);

// city search

function showCity(city) {
  city.preventDefault();
  let inputEl = document.querySelector("#city-input");
  let cityEl = document.querySelector("#main-city");
  cityEl.innerHTML = inputEl.value;
}
let searchFormEl = document.querySelector("#search-city");
searchFormEl.addEventListener("submit", showCity);

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

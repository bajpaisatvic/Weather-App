document.addEventListener("DOMContentLoaded", function () {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errorMsg = document.getElementById("error-message");

  const API_KEY = "USE_YOUR_API_KEY"; //env variable
  console.log("DOM fully loaded and parsed");

  getWeatherBtn.addEventListener("click", async () => {
    weatherInfo.classList.add("hidden"); //hides weather info
    const city = cityInput.value.trim();

    if (!city) return;

    //it may throw an error
    //server/database is always in another continent
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
    cityInput.value = "";
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();

    return data;
    //gets data
  }
  function displayWeatherData(data) {
    console.log(data);
    const { name, main, weather } = data;
    cityName.textContent = name; //city name
    console.log(name);
    temperature.textContent = `Temperature: ${main.temp}°C`; //temperature
    description.textContent = `Weather = ${weather[0].description}`; //weather description
    weatherInfo.classList.remove("hidden"); //shows weather info
    errorMsg.classList.add("hidden"); //hides error message

    //displays data
  }
  function showError() {
    errorMsg.classList.add("hidden");
    errorMsg.classList.remove("hidden");
  }
});

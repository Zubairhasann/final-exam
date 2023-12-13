function searchWeather() {
  const apiKey = "776780843df857bd08a4412c21de2b38"; // Replace with your OpenWeatherMap API key
  const countryInput = document.getElementById("country-input").value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryInput}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const countryName = data.name;
      const temperature = Math.round(data.main.temp - 273.15); // Convert temperature to Celsius
      const weatherDescription = data.weather[0].description;
      const weatherIcon = data.weather[0].icon;

      document.getElementById("country-name").textContent = countryName;
      document.getElementById("temperature").textContent = `${temperature}°C`;
      document.getElementById("weather-description").textContent =
        weatherDescription;
      document.getElementById("weather-icon").src =
        getWeatherImage(weatherDescription);
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}

function getWeatherImage(weatherDescription) {
  const images = {
    rain: "rain.png", // Replace with your rain image
    cloud: "cloud.png", // Replace with your cloud image
    clear: "sunny.png", // Replace with your sunny image
    storm: "storm.png", // Replace with your storm image
    // Add more mappings as needed
  };

  const defaultImage = "default.png"; // Replace with a default image
  const key = Object.keys(images).find((key) =>
    weatherDescription.includes(key)
  );

  return key ? images[key] : defaultImage;
}


const url = "https://api.weatherapi.com/v1/current.json?key=a2276e54fc3f4e59905193653240805&q="


const searchButton = document.getElementById("weather-input-button");
searchButton.addEventListener("click", () => {
    const weatherDataContainer = document.getElementById("weather-output-container");
    const container = document.getElementById("container");
    if (weatherDataContainer != null) {
        container.removeChild(weatherDataContainer);
    }
    getUserLocation();
});

async function getUserLocation() {
    const locationInput = document.getElementById("weather-input");
    let location = locationInput.value;
    let weatherData = await getWeatherData(location);
    generateWeatherOutput(weatherData);
}


async function getWeatherData(location) {
    let searchUrl = url + location + "&aqi=no";
    try {
        let response = await fetch(searchUrl , { mode: "cors" });
        return weatherData = await response.json();
    } catch (error) {
        alert(`Unable to load weather data for ${location}`);
        console.log(`Unable to load weather data for ${location}`);
    }

}

function generateWeatherOutput(weatherData) {
    const weatherOutputContainer = document.createElement("div");
    weatherOutputContainer.classList.add("weather-output-container");
    weatherOutputContainer.setAttribute("id", "weather-output-container");

    const cityName = document.createElement("h1");
    cityName.textContent = weatherData.location.name;

    const cityRegion = document.createElement("h3");
    cityRegion.textContent = weatherData.location.region;

    const cityTemperature = document.createElement("h2");
    cityTemperature.textContent = weatherData.current.temp_c + " °C";

    const cityCurrentConditionDiv = document.createElement("div");
    const weatherCondition = document.createElement("p");
    weatherCondition.textContent = weatherData.current.condition.text;
    const weatherConditionIcon = document.createElement("img");
    weatherConditionIcon.src = weatherData.current.condition.icon;  
    cityCurrentConditionDiv.appendChild(weatherCondition);
    cityCurrentConditionDiv.appendChild(weatherConditionIcon);  


    const cityFeelsLikeTemperature = document.createElement("p");
    cityFeelsLikeTemperature.textContent = "Feels Like: " + weatherData.current.feelslike_c + " °C";

    const cityHumidity = document.createElement("p");
    cityHumidity.textContent = "Humidity: " + weatherData.current.humidity + " %";

    const cityWind = document.createElement("p");
    cityWind.textContent = "Wind Speed: " + weatherData.current.wind_kph + " km/h";


    weatherOutputContainer.appendChild(cityName);
    weatherOutputContainer.appendChild(cityRegion);
    weatherOutputContainer.appendChild(cityTemperature);
    weatherOutputContainer.appendChild(cityCurrentConditionDiv);
    weatherOutputContainer.appendChild(cityFeelsLikeTemperature);
    weatherOutputContainer.appendChild(cityHumidity);
    weatherOutputContainer.appendChild(cityWind);

    const container = document.getElementById("container");
    container.appendChild(weatherOutputContainer);


}
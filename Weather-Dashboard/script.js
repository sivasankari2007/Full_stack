async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();

    const errorMessage = document.getElementById("errorMessage");
    const loading = document.getElementById("loading");

    // Clear previous messages
    errorMessage.style.display = "none";
    errorMessage.textContent = "";
    loading.textContent = "";

    // Check empty input
    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        errorMessage.style.display = "block";
        return;
    }

    try {

        loading.textContent = "Loading weather...";

        // Step 1: Find city latitude and longitude
        const geoURL =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

        const geoResponse = await fetch(geoURL);

        if (!geoResponse.ok) {
            throw new Error("Unable to connect to weather service.");
        }

        const geoData = await geoResponse.json();

        // Check whether city exists
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found. Please enter a valid city name.");
        }

        const location = geoData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        // Step 2: Get weather information
        const weatherURL =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;

        const weatherResponse = await fetch(weatherURL);

        if (!weatherResponse.ok) {
            throw new Error("Unable to get weather data.");
        }

        const weatherData = await weatherResponse.json();

        const current = weatherData.current;

        // Display city
        document.getElementById("cityName").textContent =
            `${location.name}, ${location.country}`;

        // Display temperature
        document.getElementById("temperature").textContent =
            `${current.temperature_2m} °C`;

        // Display humidity
        document.getElementById("humidity").textContent =
            `${current.relative_humidity_2m} %`;

        // Display wind speed
        document.getElementById("windSpeed").textContent =
            `${current.wind_speed_10m} km/h`;

        // Display weather condition
        const weatherInfo = getWeatherCondition(current.weather_code);

        document.getElementById("condition").textContent =
            weatherInfo.condition;

        document.getElementById("weatherIcon").textContent =
            weatherInfo.icon;

        loading.textContent = "";

    } catch (error) {

        loading.textContent = "";

        errorMessage.textContent = error.message;
        errorMessage.style.display = "block";
    }
}


// Convert weather code into readable condition
function getWeatherCondition(code) {

    if (code === 0) {
        return {
            condition: "Clear Sky",
            icon: "☀️"
        };
    }

    if (code >= 1 && code <= 3) {
        return {
            condition: "Partly Cloudy",
            icon: "⛅"
        };
    }

    if (code >= 45 && code <= 48) {
        return {
            condition: "Foggy",
            icon: "🌫️"
        };
    }

    if (code >= 51 && code <= 57) {
        return {
            condition: "Drizzle",
            icon: "🌦️"
        };
    }

    if (code >= 61 && code <= 67) {
        return {
            condition: "Rainy",
            icon: "🌧️"
        };
    }

    if (code >= 71 && code <= 77) {
        return {
            condition: "Snowy",
            icon: "❄️"
        };
    }

    if (code >= 80 && code <= 82) {
        return {
            condition: "Rain Showers",
            icon: "🌦️"
        };
    }

    if (code >= 95) {
        return {
            condition: "Thunderstorm",
            icon: "⛈️"
        };
    }

    return {
        condition: "Unknown",
        icon: "🌤️"
    };
}
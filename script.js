const API_KEY = "f72306fd60ee7bd72185ffb4ac240e85";

async function getWeatherForCities() {
    const cities = document.getElementById("citiesInput").value.split(",");
    let allResults = "";
    for (let city of cities) {
        city = city.trim();
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ua`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Місто "${city}" не знайдено`);
            const data = await response.json();
            allResults += `
                <div style="margin:10px; padding:10px;">
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p>🌡 Температура: ${data.main.temp}°C</p>
                    <p>📋 Погода: ${data.weather[0].description}</p>
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
                </div>
            `;
        } catch (error) {
            allResults += `<p style="color:red;">❌ ${error.message}</p>`;
        }
    }
    document.getElementById("weatherResults").innerHTML = allResults;
}
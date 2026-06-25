const state = document.querySelector(".state")
const Country = document.querySelector(".country")
const Latitude = document.querySelector(".Latitude")
const Longitude = document.querySelector(".Longitude")
const Wind = document.querySelector(".Wind-Speed")
const Time = document.querySelector(".Time")
const temp = document.querySelector(".temp")
const city = document.querySelector(".city")
const status = document.querySelector(".status")
const btn = document.body.querySelector(".btn")

function getWeatherstatus(code) {
    if (code === 0) return "Clear Sky ☀️";
    if (code === 1 || code === 2) return "Partly Cloudy ⛅";
    if (code === 3) return "Cloudy ☁️";
    if (code === 45 || code === 48) return "Fog 🌫️";
    if (code >= 51 && code <= 67) return "Rain 🌧️";
    if (code >= 71 && code <= 77) return "Snow ❄️";
    if (code >= 80 && code <= 82) return "Heavy Rain ⛈️";
    if (code >= 95) return "Thunderstorm ⚡";
    return "Unknown Weather";
}


async function getweather(latitude, longitude) {
    let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`)
    let data = await response.json()
    console.log(data);

    let temperature = data.current_weather.temperature
    temp.textContent = temperature + "°C"
    let windspeed = data.current_weather.windspeed
    Wind.textContent = windspeed + "km/h"
    status.textContent = getWeatherstatus(data.current_weather.weathercode)
    Time.innerHTML = `
  <div>${data.timezone}</div>
  <div>${data.timezone_abbreviation}</div>
`;



    if (data.current_weather.is_day = 1) {
        document.body.style.background = "linear-gradient(135deg, #56ccf2, #2f80ed)"
    } else {
        document.body.style.background = "linear-gradient(135deg, #141e30, #243b55)"

    }


}


async function getposition() {
    let inputval = document.body.querySelector(".input").value

    let response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${inputval}`)
    let data = await response.json()
    console.log(data);

    if (!data.results || data.results.length === 0) {
        alert("City not found");
        return;
    }

    let latitude = data.results[0].latitude
    let longitude = data.results[0].longitude

    state.textContent = data.results[0].admin1
    Country.textContent = data.results[0].country
    Latitude.textContent = data.results[0].latitude
    Longitude.textContent = data.results[0].longitude
    city.textContent = data.results[0].name

    getweather(latitude, longitude)
}

btn.addEventListener("click", getposition)



let input = document.body.querySelector(".input")

input.addEventListener("keydown", (event) => {  
    if (event.key === "Enter") {
        btn.click()
    }
})




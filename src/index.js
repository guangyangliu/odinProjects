const weatherApi = '106508f1948040a28b731238240306';
const { format } = require('date-fns');
async function weatherData(location) {
    try {
        const fetchApi = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherApi}&q=${location}&days=3`, {mode: "cors"});
        const data = await fetchApi.json();
    
        return processWeatherData(data);
    } catch(error) {
        console.log("Error fetching weather data:", error);
    }
    
}

function processWeatherData(data) {
    return {
        location: data.location.name,
        temperature: data.current.temp_c,
        maxTemp: data.forecast.forecastday[0].day.maxtemp_c,
        mintemp: data.forecast.forecastday[0].day.mintemp_c,
        condition: data.current.condition.text,
        conditonIcon: data.current.condition.icon,
        windSpeed: data.current.wind_kph,
        humidity: data.current.humidity,
        icon: data.current.condition.icon,
        hour: data.forecast.forecastday[0].hour,
        days: data.forecast.forecastday,
    };
}


document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const location = document.getElementById('location').value;
    const weatherInfo = await weatherData(location);
    display(weatherInfo);
});


function displayWeatherInfo(weatherInfo) {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.innerHTML = `
        <div id='currentTemp'>
            <p class='items'>${weatherInfo.location}</p>
            <h1 class='items'>${Math.round(weatherInfo.temperature)} °C</h1>
            <div id='maxAndMinTemp'class='items'>
                <p class='items'>Max: ${Math.round(weatherInfo.maxTemp)}°</p>
                <p class='items'>Min: ${Math.round(weatherInfo.mintemp)}°</p>
            </div>
            <p class='items'>${weatherInfo.condition}</p>
        </div>
        <div id='hourTemp'></div>
        <div id='daysTemp'></div>
    `;
}



function displayHourlyTemp(weatherInfo) {
    const hourTempArray = weatherInfo.hour;
    const hourTempContainer = document.getElementById('hourTemp');
    for (const hourTemp of hourTempArray) {
        const hourTempElement = document.createElement('div');
        hourTempElement.innerHTML = `
            <p>${format(new Date(hourTemp.time), 'H')}时</p>
            <img src=https:${hourTemp.condition.icon} >
            <p>${Math.round(hourTemp.temp_c) }°</p>
        `;
        hourTempContainer.appendChild(hourTempElement);
    }
}

function displayDailyTemp(weatherInfo) {
    const forecastdaysArray = weatherInfo.days;
    console.log(forecastdaysArray);
    
    const dayTempContainer = document.getElementById('daysTemp');
    for (const dayTemp of forecastdaysArray) {
        console.log(dayTemp);
        const dayTempElement = document.createElement('div');
        dayTempElement.className = 'dayItem';
        dayTempElement.innerHTML = `
            <p>${format(new Date(dayTemp.date), 'dd')}日</p>
            <img src=https:${dayTemp.day.condition.icon} >
            <p>${Math.round(dayTemp.day.mintemp_c) }° ~ ${Math.round(dayTemp.day.maxtemp_c) }°</p>
        `;
        dayTempContainer.appendChild(dayTempElement);
        
    }
}

function display(weatherInfo) {
    displayWeatherInfo(weatherInfo);
    displayHourlyTemp(weatherInfo);
    displayDailyTemp(weatherInfo);
}

//default weatherInfo: beijing.
(async ()=> {
    const weatherInfo = await weatherData('beijing');
    display(weatherInfo);
})();



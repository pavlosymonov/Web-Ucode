async function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  const weather = await getWeather(latitude, longitude);
  setWeather(weather);
}

function showError(error) {
  weatherParent.innerHTML = `
    <div class="error">${error.message}</div>
  `;
}

function getDate(sec) {
  let date = new Date(sec * 1000), day, d, month, m;

  day = (d = date.getDate()) < 10 ? "0" + d : d;
  month = ((m = date.getMonth() + 1)) < 10 ? "0" + m : m;

  return `${day}.${month}`;
}

async function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;
  const response = await fetch(api);
  const data = await response.json();
  const t = data.timezone;

  return data.daily.map(day => {
    const date = getDate(day.dt);
    const temperature = Math.floor(day.temp.day - KELVIN);
    const description = day.weather[0].description;
    const iconId = day.weather[0].icon;

    return new DailyWeather(date, temperature, description, iconId, t);
  });
}

function setWeather(weather) {
  weather.forEach(el => {
    weatherParent.innerHTML += `
    <div class="weather-item">
      <div class="weather-item__date"><p>${el.date}</p></div>
      <div class="weather-item__content">
        <div class="weather-item__icon">
          <img src="./assets/images/${el.iconId}.png" alt="${el.description}">
         </div>
        <div class="weather-item__value">${el.temperature}°<span>C</span></div>
        <div class="weather-item__desc">${el.description}</div>
        <div class="weather-item__timezone">${el.timeZone}</div>
      </div>
    </div>
  `;
  });
}

class DailyWeather {
  constructor(date, temp, desc, iconId, zone) {
    this.date = date;
    this.temperature = temp;
    this.description = desc;
    this.iconId = iconId;
    this.timeZone = zone;
  }
}

const KELVIN = 273;
// API KEY
const apiKey = "ee3c7ddd023bd3affc1f5ebd66efdcbd";
const weatherParent = document.getElementById('weather');

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  weatherParent.innerHTML = `
    <div class="error">Browser doesn't Support Geolocation</div>
  `;
}

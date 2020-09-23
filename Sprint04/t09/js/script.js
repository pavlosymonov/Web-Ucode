function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
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

function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;

  fetch(api).then(response => response.json()).then(data => {
    const t = data.timezone;

    data.daily.forEach(day => {
      const date = getDate(day.dt);
      const temperature = Math.floor(day.temp.day - KELVIN);
      const description = day.weather[0].description;
      const iconId = day.weather[0].icon;

      weather.push(new DailyWeather(date, temperature, description, iconId, t));
    });
    setWeather();
  });
}

function setWeather() {
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

let weather = [];

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

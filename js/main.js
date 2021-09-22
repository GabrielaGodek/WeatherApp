const input = document.querySelector('input');
const changeCity = document.querySelector('.change-city');

// const popUpBtn = document.querySelector('.btn');
const popUpBtn = document.querySelector('.fa-map-marked-alt');
const popUp = document.querySelector('.popUp');
// const arrow = document.querySelector(".fa-chevron-up")

const place = document.querySelector('.place');
const errorInfo = document.querySelector('.error-info');
const img = document.querySelector('img');

const temp = document.querySelector('.temp');
const windy = document.querySelector('.windy');
const clouds = document.querySelector('.clouds');
// const minMax = document.querySelector('.min-max');
const min = document.querySelector('.min');
const max = document.querySelector('.max');

//API
const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&APPID=c5155c0045e244f8eb13421b4d63d68b';
const units = '&units=metric';

let url;
let city = 'Kraków';

const weatherApp = () => {
    city = (!input.value) ? 'Kraków' : input.value;
    // if (input.value==='') {
    //     city = 'Kraków';
    //     place.textContent = 'Kraków'
    // } else {
    //     city = input.value;
    // }

    url = apiLink + city + apiKey + units;

    axios.get(url)
        .then(res => {
            errorInfo.textContent = '';
            input.value = '';
            temp.innerText = Math.round(res.data.main.temp) + '°C';
            clouds.textContent = Math.round(res.data.clouds.all) + ' %';
            windy.textContent = Math.round(res.data.wind.speed) + ' km/h';
            min.textContent = Math.round(res.data.main.temp_min) + '°C';
            max.textContent = Math.round(res.data.main.temp_max) + '°C';

            place.textContent = res.data.name

            const weather = Object.assign({}, ...res.data.weather);

            if (weather.id >= 200 && weather.id <= 232) {
                img.setAttribute('src', 'img/thunderstorm.png')
            } else if (weather.id >= 300 && weather.id <= 321) {
                img.setAttribute('src', 'img/rain.png')
            } else if (weather.id >= 500 && weather.id <= 531) {
                img.setAttribute('src', 'img/rain.png')
            } else if (weather.id >= 600 && weather.id <= 622) {
                img.setAttribute('src', 'img/snow.png')
            } else if (weather.id >= 701 && weather.id <= 781) {
                img.setAttribute('src', 'img/mist.png')
            } else if (weather.id === 800) {
                img.setAttribute('src', 'img/clear.png')
            } else if (weather.id >= 801 && weather.id <= 804) {
                img.setAttribute('src', 'img/cloud.png')
            } else {
                img.setAttribute('src', 'img/unknown.png')
            }

            popUp.style.display = "none";

            // console.log(weather);

        })
        .catch(() => errorInfo.textContent = 'Enter the correct name city')
}

const popup = () => {
    if (popUp.style.display !== "none") {
        popUp.style.display = "none";
    } else {
        popUp.style.display = "block";
    }
}

weatherApp()
changeCity.addEventListener('click', weatherApp, popup)
popUpBtn.addEventListener('click', popup)

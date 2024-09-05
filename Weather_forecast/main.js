import * as wetherAPI from '/weatherAPI.js';

let searchForm = document.forms.citySearch;


searchForm.addEventListener('submit',async ()=>{
    event.preventDefault();
    let cityName = searchForm.city.value;
    let weatherData = await wetherAPI.getWeatherDataByCityName(cityName);
    document.querySelector('.weather').innerHTML=`
    <div class="current_weather">
                <img src="https://openweathermap.org/img/wn/${weatherData.list[5].weather[0].icon}@2x.png" alt="img">
                <div class="curent_city">
                    <h1>${cityName}</h1>
                    <h6>${weatherData.list[5].weather[0].description}</h6>
                    <h6>Население: ${weatherData.city.population}</h6>
                </div>
                <div class="current_info">
                    <p class="temp">${Math.round(weatherData.list[5].main.temp)}℃</p>
                    <p class="date">${weatherData.list[5].dt_txt}</p>
                </div>
                

            </div>
            <div class="forecast_for_the_week">
                <div class="card_day">
                    <p class="day_of_the_week">${weatherData.list[14].dt_txt}</p>
                    <p class="humidity">${weatherData.list[14].weather[0].description}</p>
                    <img src="https://openweathermap.org/img/wn/${weatherData.list[14].weather[0].icon}@2x.png"  alt="img">
                    <p class="temperature_on_this_day">${Math.round(weatherData.list[14].main.temp)}℃</p>

                </div>
                <div class="card_day">
                    <p class="day_of_the_week">${weatherData.list[22].dt_txt}</p>
                    <p class="humidity">${weatherData.list[22].weather[0].description}</p>
                    <img src="https://openweathermap.org/img/wn/${weatherData.list[22].weather[0].icon}@2x.png"  alt="img">
                    <p class="temperature_on_this_day">${Math.round(weatherData.list[22].main.temp)}℃</p>

                </div>
                <div class="card_day">
                    <p class="day_of_the_week">${weatherData.list[30].dt_txt}</p>
                    <p class="humidity">${weatherData.list[30].weather[0].description}</p>
                    <img src="https://openweathermap.org/img/wn/${weatherData.list[30].weather[0].icon}@2x.png"  alt="img">
                    <p class="temperature_on_this_day">${Math.round(weatherData.list[30].main.temp)}℃</p>

                </div>
                <div class="card_day">
                    <p class="day_of_the_week">${weatherData.list[38].dt_txt}</p>
                    <p class="humidity">${weatherData.list[38].weather[0].description}</p>
                    <img src="https://openweathermap.org/img/wn/${weatherData.list[38].weather[0].icon}@2x.png"  alt="img">
                    <p class="temperature_on_this_day">${Math.round(weatherData.list[38].main.temp)}℃</p>

                </div>
                
            </div>
    
    `

    searchForm.reset();
});

document.addEventListener('DOMContentLoaded', async ()=>{
    let getCities = await wetherAPI.getCities();
    renderCitiesList(getCities);
});

function renderCitiesList(cities){
    let list = document.querySelector('#cities');
    list.innerHTML='';
    for (const city of cities) {
        let option = document.createElement('option');
        option.value=city.name;
        list.append(option);
    };
    
};

searchForm.city.addEventListener('input', async ()=>{
    let cities = await wetherAPI.getCities();
    cities = cities.filter(x=>x.name.startstWith(event.target.value));
    renderCitiesList(cities);


});
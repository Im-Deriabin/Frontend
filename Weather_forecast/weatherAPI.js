//api.openweathermap.org/data/2.5/forecast?q=Екатеринбург&units=metric&lang=ru&appid=6729e9004c1d1325b8f099838ae91903

const apiKey='0489312eccbc332690d746d8ba0acbd1';
const apiURL='https://api.openweathermap.org/data/2.5/';

export async function getWeatherDataByCityName(cityName) {
    let respons = await fetch(`${apiURL}forecast?q=${cityName}&units=metric&lang=ru&appid=${apiKey}`);
    let data = await respons.json();
    return data;
    
}

export async function getCities(){

    let respons = await fetch('cities.json');
    let data = await respons.json();
    return data;

};
const key = 'a9f6719e37f20890ebff5d91724dec1f';
const url = 'http://api.openweathermap.org/data/2.5';


const getCurrentWeather = async city=>{

    const response =await fetch(`${url}/weather?q=${city}&units=metric&appid=${key}`);
    const data = await response.json();

    return data;
}


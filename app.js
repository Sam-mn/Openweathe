const form = document.querySelector('#search-form');
const card = document.querySelector('.card');


const randerCurentWeather = (data)=>{
    let dayOrNight = data.dt > data.sys.sunrise && data.dt < data.sys.sunset?'cloud-346710_1280.png':'night-1851685_1280.png';

    const template = `
        <img src=${dayOrNight} class="card-img-top">
        <div class="icon">
            <img src='http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>
        </div>
		<div class="card-body">
            <h5 class="card-title" id="city">${data.name}, ${data.sys.country}</h5>
            <h6>${data.weather[0].description}</h6>
		    <p class="temp">
			    <span id="temperature">${Math.round(data.main.temp)}</span>&deg;C
            </p>
            <p class="hm">
            Feels like: 
			    <span id="temperature">${Math.round(data.main.feels_like)}</span>&deg;C
            </p>
            <p class='hm' >Humidity: ${data.main.humidity}%</p>
		    <p class="hm">Wind speed: 
	            <span id="windspeed">${data.wind.speed} </span>m/s
            </p>
        </div>
        `

        card.innerHTML = template;

}

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    if(card.classList.contains('d-none')){

        card.classList.remove('d-none')
    };

    const city = form.query.value;
    if(city < 2){
        return;
    }

    

    getCurrentWeather(city)
    .then(data=>{
        if(data.cod === 200){
            randerCurentWeather(data)
        }else{
            card.innerHTML = data.message;
        }

    })
    .catch(err=>{console.log(err)})

    localStorage.setItem('city', city);
})




    getCurrentWeather(localStorage.getItem('city'))
    .then(data=>{
        if(card.classList.contains('d-none')){

            card.classList.remove('d-none')
        };
        randerCurentWeather(data)
    })
    .catch(err=>{console.log(err)})



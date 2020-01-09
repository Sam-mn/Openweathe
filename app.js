const form = document.querySelector('#search-form');
const card = document.querySelector('.card');


const randerCurentWeather = (data)=>{
    const now = Math.round(Date.now()/ 1000);
    let dayOrNight = now > data.sys.sunrise && now < data.sys.sunset?'cloud-346710_1280.png':'night-1851685_1280.png';

    let condition = data.weather;
    console.log(condition);
        condition = condition.map(el=>`<li><img src='http://openweathermap.org/img/wn/${el.icon}@2x.png'><br> ${el.description}</li>`)

    const template = `
        <img src=${dayOrNight} class="card-img-top">
		<div class="card-body">
            <h5 class="card-title" id="city">${data.name}, ${data.sys.country}</h5>
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
            <ul class='con'>${condition.join(' ')}</ul>
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
            console.log(data);
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



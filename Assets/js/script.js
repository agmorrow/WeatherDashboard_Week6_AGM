const searchBtn = document.querySelector('#searchBtn');
const searchInput = document.querySelector('#searchInput');
const name = document.querySelector('.name');
const temp = document.querySelector('.temp');
const hum = document.querySelector('.hum');
const wind = document.querySelector('.wind');
const uv = document.querySelector('.uv');


function currentWeatherApi() {
   fetch('https://api.openweathermap.org/data/2.5/weather?q='+searchInput.value+'&appid=8cdc26e92900b592593fbaf2a991cf6e')
   .then(response => response.json())
   .then(data => {
      console.log(data);


      let nameValue = data['name'];
      let tempValue = data['main']['temp'];
      let windValue = data['wind']['speed'];
      let humValue = data['main']['humidity'];
      

      name.innerHTML = nameValue;
      temp.innerHTML = 'Temp: ' + tempValue;
      wind.innerHTML = 'Wind: ' + windValue + ' MPH';
      hum.innerHTML = 'Humidity: ' + humValue + ' %';

   })
}

function fiveDayWeatherApi() {
   fetch('https://api.openweathermap.org/data/2.5/forecast?q='+searchInput.value+'&appid=8cdc26e92900b592593fbaf2a991cf6e')
   .then(response => response.json())
   .then(data => {
      console.log(data);
   })
}



searchBtn.addEventListener('click', function() {
currentWeatherApi();
fiveDayWeatherApi();

})
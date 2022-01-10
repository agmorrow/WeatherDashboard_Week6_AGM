const searchBtn = document.querySelector('#searchBtn');
const searchInput = document.querySelector('#searchInput');
const name = document.querySelector('.name');
const temp = document.querySelector('.temp');
const hum = document.querySelector('.hum');
const wind = document.querySelector('.wind');
const uv = document.querySelector('.uv');
const date = document.querySelector('.date');
const futureTemp = document.querySelector('.futureTemp');
const futureHum = document.querySelector('.futureHum');
const futureWind = document.querySelector('.FutureWind');
const futureUv = document.querySelector('.futureUv');
const futureDate = document.querySelector('.futureDate');



function currentWeatherApi() {
   fetch('https://api.openweathermap.org/data/2.5/weather?q='+searchInput.value+'&units=imperial&appid=8cdc26e92900b592593fbaf2a991cf6e')
   .then(function (response) {
      return response.json();
   })

   
   .then(function (data) {
      let latValue = data.coord.lat;
      let lat = latValue.toFixed(2);
      let lonValue = data.coord.lon;
      let lon = lonValue.toFixed(2);

         fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ lat + '&lon=' + lon +'&units=imperial&appid=8cdc26e92900b592593fbaf2a991cf6e')
         .then(function (response) {
            return response.json(); 
         })
         .then(function (data) {
            let nameValue = data['name'];
            let tempValue = data['current']['temp'];
            let windValue = data['current']['wind_speed'];
            let humValue = data['current']['humidity'];
            let uvValue = data['current']['uvi'];
            let dateValue = data['dt'];
            const milliseconds = dateValue * 1000;
            const dateObject = new Date(milliseconds).toLocaleDateString();
            
            name.innerHTML = nameValue + ' ('+dateObject+')';
            temp.innerHTML = 'Temp: ' + tempValue + ' &#176F';
            wind.innerHTML = 'Wind: ' + windValue + ' MPH';
            hum.innerHTML = 'Humidity: ' + humValue + ' %';
            uv.innerHTML = 'UV Index: '+ uvValue;
            console.log(data);
         }) 
      })
      }  
         

      


// function fiveDayWeatherApi() {
//   fetch('https://api.openweathermap.org/data/2.5/forecast?q='+searchInput.value+'&cnt=5&units=imperial&appid=8cdc26e92900b592593fbaf2a991cf6e')
//    .then(response => response.json())
//    .then(data => {
//       console.log(data);
      
//       let dateValue1 = data['list'][0]['dt_txt'];
//       // const milliseconds1 = dateValue1 * 1000;
//       // const dateObject1 = new Date(milliseconds1).toLocaleDateString();
   
//       let tempValue1 = data['list'][0]['main']['temp'];
//       let windValue1 = data['list'][0]['wind']['speed'];
//       let humValue1 = data['list'][0]['main']['humidity'];

//       futureDate.innerHTML = dateValue1;
//       futureTemp.innerHTML = 'Temp: ' + tempValue1 + ' &#176F';
//       futureWind.innerHTML = 'Wind: ' + windValue1 + ' MPH';
//       futureHum.innerHTML = 'Humidity: ' + humValue1 + ' %';

//    })
// }



searchBtn.addEventListener('click', function() {
currentWeatherApi();
// fiveDayWeatherApi();
})
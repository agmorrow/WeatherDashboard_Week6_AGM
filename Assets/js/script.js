const searchBtn = document.querySelector('#searchBtn');
const searchInput = document.querySelector('#searchInput');
const name = document.querySelector('.name');
const temp = document.querySelector('.temp');
const hum = document.querySelector('.hum');
const wind = document.querySelector('.wind');
const uv = document.querySelector('.uv');
const date = document.querySelector('.date');
const weatherImg = document.getElementById('iconImg');
const displayBox = document.querySelector('.displayBox');



function currentWeatherApi() {
   fetch('https://api.openweathermap.org/data/2.5/weather?q='+searchInput.value+'&units=imperial&appid=8cdc26e92900b592593fbaf2a991cf6e')
   .then(function (response) {
      return response.json();
   })

   .then(function (data) {
      let latValue = data['coord']['lat'];
      let lat = latValue.toFixed(2);
      let lonValue = data['coord']['lon'];
      let lon = lonValue.toFixed(2);
      let nameValue = data['name'];

         fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ lat + '&lon=' + lon +'&units=imperial&appid=8cdc26e92900b592593fbaf2a991cf6e')
         .then(function (response) {
            return response.json(); 
         })
         .then(function (data) {
           
           

            let iconValue = data['current']['weather'][0]['icon'];
            let tempValue = data['current']['temp'];
            let windValue = data['current']['wind_speed'];
            let humValue = data['current']['humidity'];
            let uvValue = data['current']['uvi'];
            let dateValue = data['current']['dt'];
            const milliseconds = dateValue * 1000;
            const dateObject = new Date(milliseconds).toLocaleDateString();

            weatherImg.setAttribute('src', 'http://openweathermap.org/img/wn/' + iconValue + '@2x.png');
            
            name.innerHTML = nameValue + ' ('+dateObject+')';
            temp.innerHTML = tempValue + ' &#176F';
            wind.innerHTML = windValue + ' MPH';
            hum.innerHTML = humValue + ' %';
            uv.innerHTML = uvValue;
            console.log(data);
            console.log(weatherImg);
            
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
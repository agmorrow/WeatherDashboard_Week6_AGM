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
      console.log(data);

         fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ lat + '&lon=' + lon +'&units=imperial&appid=8cdc26e92900b592593fbaf2a991cf6e')
         .then(function (response) {
            return response.json(); 
         })
         .then(function (data) {
           
            let dateValue = data['daily'][0]['dt'];
            const milliseconds = dateValue * 1000;
            const dateObject = new Date(milliseconds).toLocaleDateString();
            let iconValue = data['current']['weather'][0]['icon'];
            let tempValue = data['current']['temp'];
            let windValue = data['current']['wind_speed'];
            let humValue = data['current']['humidity'];
            let uvValue = data['current']['uvi'];
            weatherImg.setAttribute('src', 'http://openweathermap.org/img/wn/' + iconValue + '@2x.png');

            name.innerHTML = nameValue + ' ('+dateObject+')';
            temp.innerHTML = "Temperature: " + tempValue + ' &#176F';
            wind.innerHTML = "Wind: " + windValue + ' MPH';
            hum.innerHTML = "Humidity: " + humValue + ' %';
            uv.innerHTML = "UV Index: " + uvValue;
            console.log(data);
            
            for(i=1; i < 6; i++) {

               let futureWeatherImg = document.getElementById('futureImage' + (i+1));
               let futureDate = document.querySelector('.futureDate' + (i+1));
               let futureDates = data['daily'][i]['dt'];
               const milliseconds = futureDates * 1000;
               const dateObject = new Date(milliseconds).toLocaleDateString();
               futureDate.innerHTML = dateObject;
               let futureIconValue = data['daily'][i]['weather'][0]['icon'];
               futureWeatherImg.setAttribute('src', 'http://openweathermap.org/img/wn/' + futureIconValue + '@2x.png');
               let futureTemperature = document.getElementById('futureTemp' +(i+1));
               let futureTemps = data["daily"][i]["temp"]['day'];
               futureTemperature.innerHTML = "Temperature: " + futureTemps + " &#176F";
              
               let futureWind = document.getElementById('futureWind' +(i+1));
               let futureWinds = data["daily"][i]["humidity"];
               futureWind.innerHTML = "Wind: " + futureWinds + " MPH";

               let futureHumidity = document.getElementById('futureWind' +(i+1));
               let futureHum = data["daily"][i]["wind_speed"];
               futureHumidity.innerHTML = "Humidity: " + futureHum + " %";
            }
        })
      })
      }

   

searchBtn.addEventListener('click', function() {
currentWeatherApi();
// fiveDayWeatherApi();
})
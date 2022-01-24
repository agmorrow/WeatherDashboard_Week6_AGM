const searchBtn = document.querySelector('#searchBtn');
let searchInput = document.querySelector('#searchInput');
const name = document.querySelector('.name');
const temp = document.querySelector('.temp');
const hum = document.querySelector('.hum');
const wind = document.querySelector('.wind');
const uv = document.querySelector('#uv');
const date = document.querySelector('.date');
const weatherImg = document.getElementById('iconImg');
const displayBox = document.querySelector('.displayBox');
const futureForecast = document.querySelector('.icons');
const saveStorage = document.getElementById('searchStorage');
const weatherContainer = document.querySelector("#weatherContainer");

let searchHistory = [];

// The following function renders recent searches in a recent search history as <li> elements
function renderCity() {
   // Clear save storage element
   saveStorage.innerHTML = "";

   for (let i = 0; i < searchHistory.length; i++) {
      let city = searchHistory[i];

      let li = document.createElement("li");
      li.textContent = city;
      li.setAttribute("data-index", i);
      saveStorage.appendChild(li);
   }
}

// This function is being called below and will run when the page loads.

function init() {
   let storedSearch = JSON.parse(localStorage.getItem("cities"));

   if (storedSearch !== null) {
      searchHistory = storedSearch;
   }

   renderCity();
}

function recentSearches() {
   localStorage.setItem("cities", JSON.stringify(searchHistory));
}

// Add city to form
searchBtn.addEventListener('click', function (event) {
   event.preventDefault();

   // Return from function early if submitted search is blank
   const searchText = searchInput.value.trim();

   if (searchText === "") {
      return;
   }

   searchHistory.push(searchText);
   searchInput.value = "";

   // fetch API
   fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchText + '&units=imperial&appid=8cdc26e92900b592593fbaf2a991cf6e')
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


         fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=8cdc26e92900b592593fbaf2a991cf6e')
            .then(function (response) {
               return response.json();
            })
            .then(function (data) {
               console.log(searchHistory);


               let dateValue = data['daily'][0]['dt'];
               const milliseconds = dateValue * 1000;
               const dateObject = new Date(milliseconds).toLocaleDateString();
               let iconValue = data['current']['weather'][0]['icon'];
               let tempValue = data['current']['temp'];
               let windValue = data['current']['wind_speed'];
               let humValue = data['current']['humidity'];
               let uvValue = data['current']['uvi'];
               weatherImg.setAttribute('src', 'http://openweathermap.org/img/wn/' + iconValue + '@2x.png');
               document.getElementById("iconImg").style.display = "block";
               document.getElementById("hideUv").style.display = "block";

               name.innerHTML = nameValue + ' (' + dateObject + ')';
               temp.innerHTML = "Temperature: " + tempValue + ' &#176F';
               wind.innerHTML = "Wind: " + windValue + ' MPH';
               hum.innerHTML = "Humidity: " + humValue + ' %';
               uv.innerHTML = uvValue;

               if (uvValue <= 2) {
                  colorClass = "green";
               } else if (uvValue <= 5) {
                  colorClass = "yellow";
               } else if (uvValue <= 7) {
                  colorClass = "orange";
               } else if (uvValue <= 10) {
                  colorClass = "red";
               } else if (uvValue > 10) {
                  colorClass = "violet";
               }
               document.querySelector("#uv").setAttribute("class", colorClass);
               console.log(data);

               // Shows the five-day forecast
               for (i = 1; i < 6; i++) {

                  let futureWeatherImg = document.getElementById('futureImage' + (i + 1));
                  let futureDate = document.querySelector('.futureDate' + (i + 1));
                  let futureDates = data['daily'][i]['dt'];
                  const milliseconds = futureDates * 1000;
                  const dateObject = new Date(milliseconds).toLocaleDateString();
                  futureDate.innerHTML = dateObject;
                  let futureIconValue = data['daily'][i]['weather'][0]['icon'];
                  futureWeatherImg.setAttribute('src', 'http://openweathermap.org/img/wn/' + futureIconValue + '@2x.png');

                  let futureTemperature = document.getElementById('futureTemp' + (i + 1));
                  let futureTemps = data["daily"][i]["temp"]['day'];
                  futureTemperature.innerHTML = "Temperature: " + futureTemps + " &#176F";

                  let futureWind = document.getElementById('futureWind' + (i + 1));
                  let futureWinds = data["daily"][i]["humidity"];
                  futureWind.innerHTML = "Wind: " + futureWinds + " MPH";

                  let futureHumidity = document.getElementById('futureWind' + (i + 1));
                  let futureHum = data["daily"][i]["wind_speed"];
                  futureHumidity.innerHTML = "Humidity: " + futureHum + " %";
               }

            })
      })
   recentSearches();
   renderCity();
});

// Calls init to retrieve data and render it to the page on load
init()
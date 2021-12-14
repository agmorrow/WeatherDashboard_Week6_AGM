const searchBtn = document.querySelector('#searchBtn');
const searchInput = document.querySelector('#searchInput');



document.getElementById('searchBtn').addEventListener('click', function() {
   fetch('https://api.openweathermap.org/data/2.5/weather?q='+searchInput.value+'&appid=8cdc26e92900b592593fbaf2a991cf6e')
   .then(response => response.json())
   .then(data => console.log(data))
   
   .catch(err => alert('Wrong city name!'))
   })
   



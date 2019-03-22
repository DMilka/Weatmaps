// // API KEY: 3ca1f52779684eaaa92135002191403
// import Chart from 'chart.js';
import Leaflet  from './libs/Leaflet';
import Map from './model/Map';
import * as mapView from './view/mapView';
import * as searchView from './view/searchView';
import { elements } from './domElements';
import Search from './model/Search';


const state = {};

/**
 *
 *  Map Controller
 *
 */


const mapController = async () => {
  // 1. Create leaflet "engine" and map model
  state.leaflet = new Leaflet();
  state.mapModel = new Map();

  // 2. Get user location
  state.mapModel.getUserPosition();

  // 3. Show map, marker and center on user location
  const coords = [state.mapModel.coords.latitude, state.mapModel.coords.longitude];

  state.map = state.leaflet.createMap(elements.map.id, coords );

  // 4. Get current weather for user location
  try {
    await state.mapModel.getWeather();
    state.forecast = state.mapModel.result.forecast;
    // 5. Show weather info in weather container
    mapView.showWeatherBox(state.mapModel.result);


    state.marker = state.leaflet.createMarker(coords, state.map, state.mapModel.result.current.condition.icon);
  } catch(e) {
    console.log(e);
  }
};




mapController();


/**
 *
 *  Search Controller
 *
*/

const searchController = async () => {
  // 1. Get user input
  const query = searchView.getInputValue();


  if(query) {
    state.searchModel = new Search(query);

    try {

      await state.searchModel.getWeather();
      state.forecast = state.searchModel.result.forecast;
      // 4. Generate weather box
      mapView.showWeatherBox(state.searchModel.result);



      state.leaflet.removeMarker(state.marker);

      // 3. Generate marker and set view
      const coords = [state.searchModel.result.location.lat, state.searchModel.result.location.lon];
      state.marker = state.leaflet.createMarker(coords, state.map, state.searchModel.result.current.condition.icon);
      state.map.setView(coords, 13);

    } catch(e) {
      console.log(e);
    }
  }

}


elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const weatherBox = document.querySelector('.weather');
  const forecastBox = document.querySelector('.weather__forecast');
  if(weatherBox) elements.map.parentElement.removeChild(weatherBox);
  if(forecastBox)  elements.map.parentElement.removeChild(forecastBox);

  searchController();
});




elements.mapBox.addEventListener('click', e => {
  if (e.target.matches('.weather__info--btn')) {
    if(e.target.id === '') {
      mapView.showForecastBox(state.forecast);
      e.target.id = "active";
      e.target.textContent = "Hide forecast";
    } else {
      const child = document.querySelector('.weather__forecast');
      e.target.parentElement.parentElement.parentElement.removeChild(child);
      e.target.id = "";
      e.target.textContent = "Show forecast";

    }


  }
});





//leaflet.createMarker([50,19]);

// state.marker = state.leaflet.createMarker([50,19], state.map);

// console.log(state);

// state.leaflet.removeMarker(state.marker);
























// const mapController = () => {
//   // 1. Create a leaflet object
//   const L = require('leaflet');


//   // 2. Get user location
//   state.mapModel = new Map();
//   state.coords = state.mapModel.getUserPosition();

//   // 3. Create map with initial coords
//   state.map = mapView.createMap(state.leaflet, elements.map, [50,19], apiMapKey);

//   // 4. Set marker on map and center
//   mapView.createMarker(state.leaflet, state.map, state.coords);
//   state.map.setView([state.coords.latitude, state.coords.longitude], 13);

// }


// /**
//  *
//  *  SearchController
//  *
//  */

// const searchController = async () => {
//   // 1. Get user input
//   state.query = searchView.getInputValue();

//   // 2. Searh for weather
//   state.searchModel = new Search(state.query);
//   try {
//     await state.searchModel.getResults();

//      // 3. Show result on map

//     state.map.remove(markers);

//     searchView.renderMarker(state.leaflet, state.map,
//         [state.searchModel.result.location.lat, state.searchModel.result.location.lon],
//         state.searchModel.result.current.condition.icon);

//     // 4. Show result in window
//     console.log(state.searchModel.result.location.lat);
//     console.log(state.searchModel.result.location.lon);
//     console.log(state.searchModel.result.current.condition.icon);

//   } catch (e) {
//     //console.log(e);
//   }



// }
// console.log(state);
// searchController();
// // var map = L.map('weatherMap').fitWorld();

// // L.tileLayer('https://api.tiles.mapbox.com/v4/MapID/997/256/{z}/{x}/{y}.png?access_token={accessToken}', {
// //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
// //     maxZoom: 18,
// //     accessToken: apiMapKey
// // }).addTo(map);

// // map.locate({setView: true, maxZoom: 16});

// // function onLocationFound(e) {
// //   var radius = e.accuracy / 2;

// //   L.marker(e.latlng).addTo(map)
// //       .bindPopup("You are within " + radius + " meters from this point").openPopup();

// //   L.circle(e.latlng, radius).addTo(map);
// //   console.log(e.latlng)
// // // }

// // map.on('locationfound', onLocationFound);

// // function geoFindMe() {

// //   const status = document.querySelector('#status');
// //   const mapLink = document.querySelector('#map-link');

// //   function success(position) {
// //     const latitude  = position.coords.latitude;
// //     const longitude = position.coords.longitude;
// //     console.log(`${latitude}, ${longitude}`);
// //   }

// //   function error() {

// //   }

// //   if (!navigator.geolocation) {

// //   } else {

// //     navigator.geolocation.getCurrentPosition(success);
// //   }

// // }

// // window.addEventListener('load', geoFindMe);

// mapController();

 // const mymap = L.map('mapid', {
//     zoomControl: false
// }).setView([50.3100318, 19.0640526], 13);

// // new L.Control.Zoom({ position: 'topleft' }).addTo(mymap);


// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 13,
//     id: 'mapbox.streets',
//     accessToken: 'pk.eyJ1IjoiaGFzemkiLCJhIjoiY2pzdWxvODJlMmZpeTN5cGczeW9heGZnYiJ9.2V439xurkBPkm9XqjkNPYw'
// }).addTo(mymap);


// // const weatherIcon = L.Icon.extend({
// //     options: {
// //         shadowUrl: 'http://cdn.apixu.com/weather/64x64/night/266.png',
// //         iconSize:     [64, 64],
// //         shadowSize:   [64, 64],
// //         iconAnchor:   [64, 64],
// //         shadowAnchor: [64, 64]
// //     }
// // });

// const weatherIcon = L.divIcon({
//         className: 'iconMarker',
//         iconSize:     [48, 48],
//         shadowSize:   [48, 48],
//         iconAnchor:   [48, 48],
//         shadowAnchor: [48, 48]
// });


// L.marker([50.3100318, 19.0640526], {icon: weatherIcon}).addTo(mymap);

// const data = [{x:'2016-12-25', y:20}, {x:'2016-12-26', y:10}];
// const options = {};

// var ctx = document.getElementById('myChart');
// var myBarChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Black'],
//         datasets: [{
//             label: 'Forecast',
//             data: [-12, 10, 3, 5, 2, 3, 9],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)',
//                 'rgba(0, 0, 0, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)',
//                 'rgba(0, 0, 0, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });





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


const mapInitController = async () => {
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




mapInitController();


/**
 *
 *  Search Controller
 *
*/

const searchController = async () => {
  // 1. Get user input
  const query = searchView.getInputValue();
  searchView.clearInputValue();

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


const searchByClick = async e => {
  const query = `${e.latlng.lat} ${e.latlng.lng}`;
  console.log(query);

  const weatherBox = document.querySelector('.weather');
  const forecastBox = document.querySelector('.weather__forecast');
  if(weatherBox) elements.map.parentElement.removeChild(weatherBox);
  if(forecastBox)  elements.map.parentElement.removeChild(forecastBox);

  if(query) {
    state.searchModel = new Search(query);

    try {

      await state.searchModel.getWeather();
      state.forecast = state.searchModel.result.forecast;
      // 4. Generate weather box
      mapView.showWeatherBox(state.searchModel.result);

      state.leaflet.removeMarker(state.marker);

      // 3. Generate marker and set view
      const coords = [e.latlng.lat, e.latlng.lng];
      state.marker = state.leaflet.createMarker(coords, state.map, state.searchModel.result.current.condition.icon);
      state.map.setView(coords, 13);

    } catch(e) {
      console.log(e);
    }
  }

}


state.map.addEventListener('click', e => {
  searchByClick(e)
 })






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

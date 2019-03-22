import { apiWeatherKey } from '../config';
import axios from 'axios';

export default class Map {
  constructor() {}

   getUserPosition() {
     // Get user location and save it to local storage
    if(navigator.geolocation) {
      this.coords = navigator.geolocation.getCurrentPosition(function(position){
        localStorage.setItem("latitude", position.coords.latitude);
        localStorage.setItem("longitude", position.coords.longitude)
      });

      // Get user location from local storage and save to an object
      const coords = {
        latitude: localStorage.getItem('latitude'),
        longitude: localStorage.getItem('longitude')
      }

      this.coords = coords;
      // Delete user locaion from local storage
      localStorage.removeItem('latitude');
      localStorage.removeItem('longitude');
    }
  }

  async getWeather() {
    try {
      //http://api.apixu.com/v1/forecast.json?key=3ca1f52779684eaaa92135002191403&q=Paris
      const query = `${this.coords.latitude} ${this.coords.longitude}`;
      const res = await axios(`http://api.apixu.com/v1/forecast.json?key=${apiWeatherKey}&q=${query}&days=7`);
      this.result = res.data;
    } catch (error) {
        alert(error);
    }

  }

}
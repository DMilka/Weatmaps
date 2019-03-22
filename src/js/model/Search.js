import axios from 'axios';
import { apiWeatherKey } from '../config';

export default class Search {
  constructor(query) {
      //this.query = query;
      this.query = query;
  }

  async getWeather() {
      try {
          const res = await axios(`http://api.apixu.com/v1/forecast.json?key=${apiWeatherKey}&q=${this.query}&days=7`);
          this.result = res.data;
      } catch (error) {
          alert(error);
      }
  }

}
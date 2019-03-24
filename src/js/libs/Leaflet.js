
import { apiMapKey } from '../config';

export default class Leaflet {
  constructor() {
    this.L = require('leaflet');
  }

  createMap(mapid,coords){
    const map = this.L.map(mapid, {
      center: coords,
      zoomControl: false,
      zoom: 11
    });


    this.L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 13,
      minZoom: 6,
      id: 'mapbox.streets',
      accessToken: apiMapKey
    }).addTo(map);

    return map;
  }

  createMarker(coords, map, icon)  {
    const weatherIcon = this.L.icon({
      className: 'iconMarker',
      iconSize:     [64, 64],
      iconAnchor:   [64, 64],
      iconUrl: `http:${icon}`
});


    const marker = new this.L.marker(coords, {icon: weatherIcon});
    const markers = this.L.layerGroup([marker]);
    markers.addTo(map);

    return markers;
  };

  removeMarker(marker) {
    marker.remove();
  };

  getCoordsOnClick(e) {
    console.log(e.latlng)
    return e.latlng;
  };
}



// export const removeMarker = () => {
//   markers.remove();
// }


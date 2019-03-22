import { elements } from '../domElements';

export const getInputValue = () => {
  return elements.searchInput.value;
}

export const renderMarker = (state, map, coords, icon) => {
  const weatherIcon = L.divIcon({
    className: 'iconMarker',
    iconSize:     [48, 48],
    shadowSize:   [48, 48],
    iconAnchor:   [48, 48],
    shadowAnchor: [48, 48]
  });

  state.marker(coords, {icon: weatherIcon}).addTo(map);
}

export const clearInputValue = () => {
  elements.searchInput.value = '';
}

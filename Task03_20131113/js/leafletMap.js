'use strict';

var coordinatesJsCource = [50.417857, 30.517341];
var map = L.map('leafletMap').setView(coordinatesJsCource, 16);
var osm = new L.tileLayer(
  'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
    maxZoom: 18
  });
var yndx = new L.Yandex();

map.addLayer(yndx);
map.addControl(new L.Control.Layers({
  'OSM': osm,
  "Yandex": yndx
}));

var defaultMarker = L.icon({
  iconUrl: 'images/marker-icon.png',
  shadowUrl: 'images/marker-shadow.png',
  iconAnchor: [13, 41],
  popupAnchor: [-1, -26]
});
L.marker(coordinatesJsCource, {
  icon: defaultMarker
}).addTo(map)
  .bindPopup("<strong>Cogniance</strong><br>JS Course here!").openPopup();


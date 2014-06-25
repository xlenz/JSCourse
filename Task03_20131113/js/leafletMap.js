'use strict';

var cLat = 50.417857;
var cLng = 30.517341;
var coordinatesJsCource = [cLat, cLng];
var map = L.map('leafletMap').setView(coordinatesJsCource, 16);
var osm = new L.tileLayer(
  'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
    maxZoom: 17,
    minZoom: 9,
    zoomAnimation: false,
    markerZoomAnimation: false,
    continuousWorld: true,
    inertia: false
  });
var yndx = new L.Yandex();
yndx.options = {
  attribution: "",
  maxZoom: 17,
  minZoom: 9,
  opacity: 1,
  traffic: false,
  zoomAnimation: false
}

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


console.log(map.getCenter().lat, map.getCenter().lng);

map.on('moveend', function() {
  cLat = map.getCenter().lat;
  cLng = map.getCenter().lng;
  console.log(map.getCenter().lat, map.getCenter().lng);
});

map.on('movestart', function() {
  console.log(map.getCenter().lat, map.getCenter().lng);
});

map.on('zoomend', function() {
  map.panTo(new L.LatLng(cLat, cLng));
});
map.on('zoomend', function() {
  map.panTo(new L.LatLng(cLat, cLng));
});
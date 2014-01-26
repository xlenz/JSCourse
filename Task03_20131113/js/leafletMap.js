'use strict';

var coordinatesJsCource = [50.417857, 30.517341];
var map = L.map('leafletMap').setView(coordinatesJsCource, 17);

L.tileLayer(
  'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(map);

L.marker(coordinatesJsCource).addTo(map)
      .bindPopup("<strong>Cogniance</strong><br>JS Course here!").openPopup();

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

map.on('click', onMapClick);

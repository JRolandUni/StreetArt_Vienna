// Set initial coordinates for Vienna, Austria
const viennaCoords = [48.2082, 16.3738]; // Latitude, Longitude

// Initialize the map
const map = L.map('map').setView(viennaCoords, 13);

// Add OpenStreetMap tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.marker(viennaCoords)
  .addTo(map)
  .bindPopup('<b>Vienna</b><br>Capital of shit')
  .openPopup();

// Read markers data from data.csv
  $.get('./data.csv', function(csvString) {

    // Use PapaParse to convert string to array of objects
    var data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;

    // For each row in data, create a marker and add it to the map
    // For each row, columns `Latitude`, `Longitude`, and `Title` are required
    for (var i in data) {
      var row = data[i];  
      var marker = L.marker([row.lat, row.lon], {
        opacity: 1
      }).bindPopup(row.id);
      
      marker.addTo(map);
    }

  });

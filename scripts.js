// Set initial coordinates for Vienna, Austria
const viennaCoords = [48.2082, 16.3738]; // Latitude, Longitude

// Initialize the map
const map = L.map('map').setView(viennaCoords, 13);

// Add OpenStreetMap tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Read markers data from data.csv
  $.get('./data.csv', function(csvString) {

    // Use PapaParse to convert string to array of objects
    var data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;

    // For each row in data, create a marker and add it to the map
    // For each row, columns `Latitude`, `Longitude`, and `Title` are required

    for (let row of data) {
      if (!row.lat || !row.lon) continue;
        var marker = L.marker([row.lat, row.lon], {
          opacity: 1,
          icon: L.icon({
    iconUrl: 'icon.png',
    iconSize: [8,8]
  })
      }).bindPopup(
          `
  <div style="min-width:150px">
    <strong>ID:</strong> ${row.id}<br>
    <strong>Address:</strong> ${row.address}<br>
    <strong>Municipal:</strong> ${row.municipal}<br>
    <strong>Photo taken:</strong> ${row.Date_Time}<br>
    <img src="img/${String(row.id).padStart(3,"0")}.jpg" alt="image" style="width:100%; margin-top: 5px;" />
  </div>
  `)
      
      marker.addTo(map);
    }
    
  });

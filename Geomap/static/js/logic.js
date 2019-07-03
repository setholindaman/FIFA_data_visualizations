
// var countries = L.layerGroup([countryCoords.country]);

var map = L.map("map", {
    center: [33, 20],
    zoom: 2
});

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 12,
    id: "mapbox.light",
    accessToken: api_key
}).addTo(map);

var overall = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 12,
    id: "mapbox.dark",
    accessToken: api_key
}).addTo(map);


// Create a baseMaps object to hold the lightmap layer
var baseMaps = {
    "Light Map": lightmap
};

// Create an overlayMaps object to hold the overall score layer
var overlayMaps = {
    "Overall Score": overall
};

// Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map);

// Perform a GET request to the query URL
var queryUrl = "/geomap";

d3
    .json(queryUrl)
    .then(function (fifaData) {
        console.log(fifaData);
        L.geoJson(fifaData).addTo(map)
    });


// function createMarkers(response) {

//   // Pull the "stations" property off of response.data
//   var stations = response.data.stations;

//   // Initialize an array to hold bike markers
//   var bikeMarkers = [];

//   // Loop through the stations array
//   for (var index = 0; index < stations.length; index++) {
//     var station = stations[index];

//     // For each station, create a marker and bind a popup with the station's name
//     var bikeMarker = L.marker([station.lat, station.lon])
//       .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "<h3>");

//     // Add the marker to the bikeMarkers array
//     bikeMarkers.push(bikeMarker);
//   }

//   // Create a layer group made from the bike markers array, pass it into the createMap function
//   createMap(L.layerGroup(bikeMarkers));
// }


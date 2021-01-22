//add config.js ask teachers whether gitignore is typical for public tokens
//more notes

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
//l tilelayer

//l.geojson with onEachfeature
// var myGeoJson = L.geoJson(myData, {
//   style: style
// }).addTo(map).bindPopup("test");
// var popup = L.popup();

// function onEachFeature(feature, layer) {
//   if (feature.properties && feature.properties.popupContent) {
//       layer.bindPopup(feature.properties.popupContent);
//   }
// }

// var myGeoJson = L.geoJson(geojsonFeature, {
//   onEachFeature: onEachFeature
// }).addTo(map);


// data[parameters] pointtolayer
//l.controls 
//l

// Define a map object
//add map

  
  // Pass our map layers into our layer control
  // Add the layer control to the map
//   L.control.layers( {
//     collapsed: false
//   }).addTo(myMap);
// }

//createMap(earthquakes);

function createMarkers(response) {

    // Pull the "stations" property off of response.data
    var earthquake = response.features;
  
    // Initialize an array to hold bike markers
    var quakeMarkers = [];
  
    // Loop through the stations array
    for (var index = 0; index < earthquake.length; index++) {
      var earthquake = earthquake[index];
  //circles? check leaflet version documentation
      // For each station, create a marker and bind a popup with the station's name
      var quakeMarker = L.circle([coordinates.lat, coordinates.lon])
        .bindPopup("<h3>" + earthquake.name + "<h3><h3>Severity: " + earthquake.capacity + "</h3>");
  
      // Add the marker to the bikeMarkers array
      quakeMarkers.push(quakeMarker);
    }
  
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(bikeMarkers));
  }
 //import json

d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson', createMap);
  
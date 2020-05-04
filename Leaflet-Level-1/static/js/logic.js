function createMap(earthquakes){
    
     // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: APIKEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "Earthquakes": earthquakes
  };

  // Create the map object with options
  var map = L.map("map", {
    center: [40.73, -74.0059],
    zoom: 4,
    layers: [lightmap, earthquakes]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

}

function createMarkers(response){
    
    // pulling the features part of the json file
    let quakes = response.features;

    // Quake markers variable as an empty array
    let quakeMarkers = [];

    // looping through the stations array
    for (var index = 0; index < quakes.length; index++) {

        var quake = quakes[index].properties;
        
        let quakeGeo = quakes[index].geometry

        // For each station, create a marker and bind a popup with the station's name
        var quakeMarker = L.marker([quakeGeo.coordinates[0], quakeGeo.coordinates[1]])
          .bindPopup("<h3>" + quake.place + "<h3><h3>Magnitude: " + quake.type + "<h3>");
    
        // Add the marker to the bikeMarkers array
        quakeMarkers.push(quakeMarker);
      }

    createMap(L.layerGroup(quakeMarkers))

}


// Link for the earthquakes  
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


d3.json(link, createMarkers)


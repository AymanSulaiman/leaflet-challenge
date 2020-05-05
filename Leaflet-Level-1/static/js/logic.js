const tectonicPlatesLink = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// Link for the earthquakes  
const geoLink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// range of colours for the earthquake magnitude
//
// Yellow:#fffa00
//        #ffd600
//        #ffb000
//        #ff8800
//        #ff5a00
// Red:   #ff0000

const setColourScale = (mag) => {
  switch(true){
    case(mag>0 && mag<=1): return "#fffa00";
    break;
    case(mag>1 && mag<=2): return "#ffd600";
    break;
    case(mag>2 && mag<=3): return "#ffb000";
    break;
    case(mag>3 && mag<=4): return "#ff8800";
    break;
    case(mag>4 && mag<=5): return "#ff5a00";
    break;
    case(mag>6): return "#ff0000" 
  }
};

markerSize = (magnitude) => magnitude / 40;

function createMap(earthquakes){
    
     // Create the tile layer that will be the background of our map
    let light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: APIKEY
    });

    let dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: APIKEY
    });

    let satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: APIKEY
    });

    let pirate = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.pirates",
    accessToken: APIKEY
    });

  // Create a baseMaps object to hold the lightmap layer
  let baseMaps = {
    Light: light,
    Dark: dark,
    Satellite: satellite,
    Pirate: pirate
  };

  // Create an overlayMaps object to hold the bikeStations layer
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create the map object with options
  let map = L.map("map", {
    center: [40.73, -74.0059],
    zoom: 4,
    layers: [pirate, earthquakes]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: true
  }).addTo(map);

}

function createMarkers(response){
    
    // pulling the features part of the json file
    let quakes = response.features;

    // Quake markers variable as an empty array
    let quakeMarkers = [];

    // looping through the stations array
    
    for (let index = 0; index < quakes.length; index++) {

        let quake = quakes[index].properties;
        
        let quakeGeo = quakes[index].geometry

        // For each station, create a marker and bind a popup with the station's name
        let quakeMarker = L.marker([quakeGeo.coordinates[1], quakeGeo.coordinates[0]])
          .bindPopup("<h3>Magnitude: " + quake.mag + "<h3><h3>Location: " + quake.place + "<h3>");
    
        // Add the marker to the bikeMarkers array
        quakeMarkers.push(quakeMarker);
      }

  createMap(L.layerGroup(quakeMarkers))

}





d3.json(geoLink, createMarkers)


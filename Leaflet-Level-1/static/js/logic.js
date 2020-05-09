// // Link for the tectonic plate
const tectonicPlatesLink = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// // Link for the earthquakes  
const geoLink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"


function createMap(earthquakes){
  // Light map
  let lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: APIKEY
  });
  
  // Dark Map
  let darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: APIKEY
  });
  
  // Satellite Map
  let satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: APIKEY
  });
  
  // Pirate Map
  let piratemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.pirates",
    accessToken: APIKEY
  });

  // Creating the overlay map
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create a baseMaps object to hold the lightmap layer
  let baseMaps = {
   Light: lightmap,
   Dark: darkmap,
   Satellite: satellitemap,
   Pirate: piratemap
  };

  // creating the map
  let map = L.map("map",{
    center: [34.0522, -118.2437],
    zoom: 5,
    layers: [piratemap, earthquakes]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

  
  var info = L.control({
      position: "bottomright"
  });

  info.onAdd = function(){
      var div = L.DomUtil.create("div","legend");
      return div;
  }

  info.addTo(map);

  document.querySelector(".legend").innerHTML=displayLegend();
}




d3.json(geoLink, function createMarkers(response){
    
  // pulling the features part of the json file
  let quakes = response.features;

  // Quake markers variable as an empty array
  let quakeMarkers = [];

  let quakeCircles = [];

  // looping through the stations array
  
  for (let index = 0; index < quakes.length; index++) {

      let quake = quakes[index].properties;
      
      let quakeGeo = quakes[index].geometry

      let color = '';
      if (quake.mag <= 1){
        color = 'yellow';
      }
      else if (quake.mag <= 2){
        color ='greenyellow';
      }
      else if (quake.mag <= 3){
        color ='gold';
      }
      else if (quake.mag <= 4){
        color ='DarkOrange';
      }
      else if (quake.mag <= 5){
        color ='peru';
      }
      else {
        color ='red';
      }
      console.log(color)
      // Add circles to map
      let quakeCircle = L.circle([quakeGeo.coordinates[1], quakeGeo.coordinates[0]],{
        fillOpacity: 0.5,
        color: "black",
        fillColor: color,
        weight:1,
        radius: quake.mag * 15000
      }).bindPopup("<h3>Magnitude: " + quake.mag + "<h3><h3>Location: " + quake.place + "<h3>");
      
      // // For each station, create a marker and bind a popup with the station's name
      let quakeMarker = L.marker([quakeGeo.coordinates[1], quakeGeo.coordinates[0]])
        .bindPopup("<h3>Magnitude: " + quake.mag + "<h3><h3>Location: " + quake.place + "<h3>");

      // // Add the marker to the bikeMarkers array
      quakeMarkers.push(quakeMarker);
      quakeCircles.push(quakeCircle)
    }

  // createMap(L.layerGroup(quakeMarkers));
  createMap(L.layerGroup(quakeCircles));

})
function displayLegend(){
  let legendInfo = [{
      limit: "Magnitude: 0-1",
      color: "chartreuse"
  },{
      limit: "Magnitude: 1-2",
      color: "greenyellow"
  },{
      limit:"Magnitude: 2-3",
      color:"gold"
  },{
      limit:"Magnitude: 3-4",
      color:"DarkOrange"
  },{
      limit:"Magnitude: 4-5",
      color:"Peru"
  },{
      limit:"Magnitude: 5+",
      color:"red"
  }];

  let header = "<h3>Magnitude</h3>(Last 24 Hours)<hr>";

  let strng = "";
 
  for (i = 0; i < legendInfo.length; i++){
      strng += "<p style = \"background-color: "+legendInfo[i].color+"\">"+legendInfo[i].limit+"</p> ";
  }
  
  return header+strng;

}
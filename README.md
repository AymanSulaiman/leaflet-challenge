# leaflet-challenge

This challenge is to visualise earthquake data from USGS. This will be done by obtaining the JSON file from this [link](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson) which shows recorded earthquakes over the last week and is continuously updated.  This will be be visualised via the latitude and longitude the GEOJSON file provides. The data also provides the magnitude; to show this, we can correlate the size of a magnitude with cirlces and the colour of the circles.  The technologies that we will use are HTML, CSS, Bootstrap, JavaScript, and Leaflet. Leaflet will allow me to create the markers for the earthquake locations and can provide the visualisation with a satalite, greyscale maps, outdoors map, faultlines, and earthquake layers.

## Goals:

### Level 1:

  * Obtain and import the [dataset](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson).
  * Create a map using leaflet to plot all of the earthquates based upon their latitudes and longitude.
  * Create data markers to reflect the magnitude of the earthquake. The darker and bigger the circles, the larger the magnitude.
  * Provide a lenged for the map data.
  * Include popups that will provide addtional information when a marker is clicked.

### Level 2:

  * Provide tectonic plates in the map.
  * Provide a sattelite, greyscale, and outdoors maps.
  * Add layer controls to the maps.

## Technologies used

  * HTML
  * CSS
  * Javascript
  * D3
  * Leaflet
  * Python server (for local testing)

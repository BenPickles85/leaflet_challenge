// Create a map object
var myMap = L.map("map", {
    center: [19.89, -155.6731],
    zoom: 3
  });
  
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);


// Store API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson";


d3.json(queryUrl, function(data) {  
    // console.log(data);


    for (var i = 0; i < data.features.length; i++) {
        var magnitude = data.features[i].properties.mag;
        var lat = data.features[i].geometry.coordinates[1];
        var long = data.features[i].geometry.coordinates[0];

    // Set colors based on magnitude
        var color;
            if (magnitude > 5) {
            color = "#cc0000";
            }
            else if (magnitude > 4) {
            color = "#ff1a1a";
            }
            else if (magnitude > 3) {
            color = "#ff6666";
            }
            else if (magnitude > 2) {
                color = "#ff9999";
            }
            else {
            color = "#ffcccc";
            }
        
        // Create circles with color and radius based on magnitude, and bind popup with location and magnitude detail
        L.circleMarker([lat, long], {
            fillOpacity: 0.75,
            color: color,
            fillColor: color,
            radius: magnitude * 5
        }).bindPopup("<h4>" + "Location: " + data.features[i].properties.place +
        "</h4><hr><h4>" + "Magnitude: " + magnitude + "</h4>").addTo(myMap);
    }

    // Create legend for color scheme based on magnitude
    var legend = L.control({
        position: 'bottomright'    
    });
    
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        var mag = ['1-2', '2-3', '3-4', '4-5', '>5'];
        var colors = ['#ffcccc', '#ff9999', '#ff6666', '#ff1a1a', '#cc0000']
        
        for (var i = 0; i < mag.length; i++) {
            div.innerHTML += '<i style="background:' + colors[i] + '"></i>' + mag[i] + '<br>';
        }
        return div;
    }
    legend.addTo(myMap);

})


  
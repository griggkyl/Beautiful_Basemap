var map = L.map('map').setView([23.3333, -102.0000], 4.75); // Center map over Mexico

L.tileLayer('https://api.mapbox.com/styles/v1/griggkyl/cm7dotogg002g01sg8aclfwgt/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ3JpZ2dreWwiLCJhIjoiY202emRreHVyMDN3NjJycTIzNGJ6NzRnaSJ9.aEoPhdkBaG6QTaCUAzXcSw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                 'Imagery &copy; <a href="https://www.mapbox.com">Mapbox</a>',
    maxZoom: 16
}).addTo(map);

//choose color based on sect
function colorchooser(attValue) {
    if (attValue == "Catholic"){
        return "#860b28";
    }
    else if(attValue == "Christian"){
        return "#db0d28";
    }
    else if (attValue == "Protestant"){
        return "#821670"; 
    } else if (attValue == "Evangelical"){
        return "#F64A8A"; 
    }  
    else if (attValue == "Christian Orthodox"){
        return "#FFA6C9"
    } else if (attValue == "Buddhist"){
        return "yellow";
    } else if (attValue == "Muslim"){
        return "#0d5e1c"
    } else if (attValue == "Sunni") {
        return "#49c06c"
    }else if (attValue == "Jewish"){
        return "#3390de";
    }else if (attValue == "Sikh"){
        return "#ff8834"
    }
}

//create symbols and group points by sect
function createSymbols(data) {
    var attribute = "_sect";
    var sectLayers = {}; //object to hold ;ayers for each attribute 

    //loop through the GeoJSON data and group points by attribute
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            var attValue = String(feature.properties[attribute]);
            var color = colorchooser(attValue);

            var geojsonMarkerOptions = {
                radius: 4,
                weight: 0.5,
                color: "black",
                opacity: 1,
                fillOpacity: 0.75,
                fillColor: color // Apply the color chosen by the colorchooser function
            };

            //create a marker for each point
            var layer = L.circleMarker(latlng, geojsonMarkerOptions);

            //if the layer doesn't exist, creat it 
            if (!sectLayers[attValue]) {
                sectLayers[attValue] = L.layerGroup(); //create a new layer for the sect
            }

            //add the marker to the correct sect layer
            sectLayers[attValue].addLayer(layer);

            //add the popup and hover
            layer.bindPopup("<p><b>Religious Sect: </b>" + feature.properties._sect +
                "<br><b>Name: </b>" + feature.properties._name);
layer.on({
    mouseover: function (e) {
        var layer = e.target;
        layer.openPopup();
    },
    mouseout: function (e) {
        var layer = e.target;
        layer.closePopup();
    }
});
return layer;
        }
    })

    // Now, add all layers to the map by default (this shows all layers at the start)
    for (var sect in sectLayers) {
        sectLayers[sect].addTo(map);
    }

    // Add a layer control to toggle the layers
    L.control.layers(null, sectLayers).addTo(map);
}

// Create legend
function createLegend() {
    var legend = L.control({ position: 'bottomleft' });

    legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'info legend'),
            categories = ["Catholic Church", "Non-denominational Christian Church", "Protestant Church", 
                          "Evangelical Church", "Christian Orthodox Church", "Buddhist Temple", 
                          "Mosque", "Sunni Mosque", "Jewish Synagogue", "Sikh Temple"],
            colors = ['#860b28', '#db0d28', '#821670', '#F64A8A', '#FFA6C9', 'yellow', '#0d5e1c', '#49c06c', '#3390de', '#ff8834'];

        // Loop through the categories and generate a label with the corresponding color
        for (var i = 0; i < categories.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '; width: 20px; height: 20px; display: inline-block; margin-right: 5px;"></i> ' + categories[i] + '<br>';
        }
        return div;
    }
    legend.addTo(map); // Attach legend to the map
}
// Import data
fetch("data/pofwMexico.geojson")
    .then(response => response.json())
    .then(data => {
        createSymbols(data);
        createLegend();
    })
    .catch(error => {
        console.error("Error loading the GeoJSON data:", error);
    });
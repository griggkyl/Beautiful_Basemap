var map = L.map('map').setView([23.3333, -102.0000], 4.75); // Center map over Mexico

L.tileLayer('https://api.mapbox.com/styles/v1/griggkyl/cm7dotogg002g01sg8aclfwgt/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ3JpZ2dreWwiLCJhIjoiY202emRreHVyMDN3NjJycTIzNGJ6NzRnaSJ9.aEoPhdkBaG6QTaCUAzXcSw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                 'Imagery &copy; <a href="https://www.mapbox.com">Mapbox</a>',
    maxZoom: 16
}).addTo(map);

// Get color for each religious sect
function colorchooser(attValue) {
    if (attValue == "Catholic") {
        return null;
    } else if (attValue == "Christian") {
        return "#ff8834";
    } else if (attValue == "Protestant") {
        return "#b24c8a";
    } else if (attValue == "Evangelical") {
        return "#b02c44";
    } else if (attValue == "Orthodox") {
        return "white";
    } else if (attValue == "Buddhist") {
        return "yellow";
    } else if (attValue == "Muslim") {
        return "#0d5e1c";
    } else if (attValue == "Sunni") {
        return "#49c06c";
    } else if (attValue == "Jewish") {
        return "#3390de";
    }
}

// Add circle markers
function createSymbols(data) {
    var attribute = "_sect";
    var geojsonMarkerOptions = {
        radius: 4,
        weight: 0.5,
        color: "black",
        opacity: 1,
        fillOpacity: 0.75
    };

    // Create Leaflet GeoJSON layer
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            var attValue = String(feature.properties[attribute]);
            var color = colorchooser(attValue);

            // Skip creating marker for Catholic if the color is null
            if (color === null) {
                return null;
            }

            geojsonMarkerOptions.fillColor = color;

            // Create the circle marker
            var layer = L.circleMarker(latlng, geojsonMarkerOptions);
            return layer;
        },
        onEachFeature: onEachFeature // Make sure onEachFeature is included here
    }).addTo(map);
}

// Create popup content on hover
function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties._sect && feature.properties._name) {
        // Set the content for the popup
        const popupContent = "<p><b>Religious Sect: </b>" + feature.properties._sect +
            "<br><b>Name: </b>" + feature.properties._name;

        // Bind the popup to the layer
        layer.bindPopup(popupContent);

        // Add hover effect for popup display
        layer.on({
            mouseover: function (e) {
                var layer = e.target;
                layer.openPopup(); // Open the popup on hover
            },
            mouseout: function (e) {
                var layer = e.target;
                layer.closePopup(); // Close the popup when the mouse leaves
            }
        });
    }
}

// Create legend
function createLegend() {
    var legend = L.control({ position: 'bottomleft' });

    legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'info legend'),
            categories = ["Non-denominational Christian Church", "Protestant Church", 
                          "Evangelical Church", "Christian Orthodox Church", "Buddhist Temple", 
                          "Mosque", "Sunni Mosque", "Jewish Synagogue"],
            colors = ['#ff8834', '#b24c8a', '#b02c44', 'white', 'yellow', '#0d5e1c', '#49c06c', '#3390de'];

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
    ////Map without catholic churches /////////////

    var map2 = L.map('map2').setView([23.3333, -102.0000], 4.75); // Center map over Mexico

L.tileLayer('https://api.mapbox.com/styles/v1/griggkyl/cm7dotogg002g01sg8aclfwgt/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ3JpZ2dreWwiLCJhIjoiY202emRreHVyMDN3NjJycTIzNGJ6NzRnaSJ9.aEoPhdkBaG6QTaCUAzXcSw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                 'Imagery &copy; <a href="https://www.mapbox.com">Mapbox</a>',
    maxZoom: 16
}).addTo(map2);

//get color 
function colorchooser2(attValue) {
    if (attValue == "Catholic"){
        return "#860b28";
    }
    else if(attValue == "Christian"){
        return "#ff8834";
    }
    else if (attValue == "Protestant"){
        return "#b24c8a"; 
    } else if (attValue == "Evangelical"){
        return "#b02c44"; 
    }  
    else if (attValue == "Christian Orthodox"){
        return "white"
    } else if (attValue == "Buddhist"){
        return "yellow";
    } else if (attValue == "Muslim"){
        return "#0d5e1c"
    } else if (attValue == "Sunni") {
        return "#49c06c"
    }else if (attValue == "Jewish"){
        return "#3390de";
    }
}

// Add circle markers
function createSymbols2(data) {
    var attribute = "_sect";
    var geojsonMarkerOptions = {
        radius: 4,
        weight: 0.5,
        color: "black",
        opacity: 1,
        fillOpacity: 0.75
    };

    // Create Leaflet GeoJSON layer
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            var attValue = String(feature.properties[attribute]);
            var color = colorchooser(attValue);

            // Skip creating marker for Catholic if the color is null
            if (color === null) {
                return null;
            }

            geojsonMarkerOptions.fillColor = color;

            // Create the circle marker
            var layer = L.circleMarker(latlng, geojsonMarkerOptions);
            return layer;
        },
        onEachFeature: onEachFeature // Make sure onEachFeature is included here
    }).addTo(map2);
}

// Create popup content on hover
function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties._sect && feature.properties._name) {
        // Set the content for the popup
        const popupContent = "<p><b>Religious Sect: </b>" + feature.properties._sect +
            "<br><b>Name: </b>" + feature.properties._name;

        // Bind the popup to the layer
        layer.bindPopup(popupContent);

        // Add hover effect for popup display
        layer.on({
            mouseover: function (e) {
                var layer = e.target;
                layer.openPopup(); // Open the popup on hover
            },
            mouseout: function (e) {
                var layer = e.target;
                layer.closePopup(); // Close the popup when the mouse leaves
            }
        });
    }
}
// Create legend
function createLegend2() {
    var legend2 = L.control({ position: 'bottomleft' });

    legend2.onAdd = function () {
        var div = L.DomUtil.create('div', 'info legend'),
            categories2 = ["Catholic", "Non-denominational Christian Church", "Protestant Church", 
                          "Evangelical Church", "Christian Orthodox Church", "Buddhist Temple", 
                          "Mosque", "Sunni Mosque", "Jewish Synagogue"],
            colors2 = ['#860b28', '#ff8834', '#b24c8a', '#b02c44', 'white', 'yellow', '#0d5e1c', '#49c06c', '#3390de'];

        // Loop through the categories and generate a label with the corresponding color
        for (var i = 0; i < categories2.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors2[i] + '; width: 20px; height: 20px; display: inline-block; margin-right: 5px;"></i> ' + categories2[i] + '<br>';
        }
        return div;
    }
    legend2.addTo(map2); // Attach legend to the map
}
// Import data
fetch("data/pofwMexico.geojson")
    .then(response => response.json())
    .then(data => {
        createSymbols2(data);
        createLegend2();
    })
    .catch(error => {
        console.error("Error loading the GeoJSON data:", error);
    });
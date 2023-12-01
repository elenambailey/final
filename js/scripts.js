var map = L.map('map').setView([35.08, -106.65], 10);

L.tileLayer('https://api.mapbox.com/styles/v1/elenambailey/clpiyrq9v007901r8efb3e2dk/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWxlbmFtYmFpbGV5IiwiYSI6ImNsb2l5cHY3ZjFoNGgybHFlNGUzb2JkeHAifQ.SvnYKSC33_OLXyhtkhX47g', {
    maxZoom: 19
}).addTo(map);

fetch('/data/Acequias.geojson') 
    .then(response => response.json()) 
    .then(data => {
        // Assuming your GeoJSON data is a valid GeoJSON object, you can add it to the map like this:
        L.geoJSON(data).addTo(map);
    })
    .catch(error => console.error('Error: ', error));

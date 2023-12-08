let Acequ;
let resev;
let surfwat;
let damIcon;

const map = L.map('map').setView([34.307, -106.018], 7);

// Your basemap layers
var base_sat = L.tileLayer('https://api.mapbox.com/styles/v1/elenambailey/clpiyrq9v007901r8efb3e2dk/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWxlbmFtYmFpbGV5IiwiYSI6ImNsb2l5cHY3ZjFoNGgybHFlNGUzb2JkeHAifQ.SvnYKSC33_OLXyhtkhX47g', {
   maxZoom: 19
}).addTo(map);

var base_green = L.tileLayer('https://api.mapbox.com/styles/v1/elenambailey/clpt9ssas00fa01r87wj369gu/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWxlbmFtYmFpbGV5IiwiYSI6ImNsb2l5cHY3ZjFoNGgybHFlNGUzb2JkeHAifQ.SvnYKSC33_OLXyhtkhX47g', {
   maxZoom: 19
}).addTo(map);

var base_gray = L.tileLayer('https://api.mapbox.com/styles/v1/elenambailey/clpvx4yqi00h401pxbyo8hvw1/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWxlbmFtYmFpbGV5IiwiYSI6ImNsb2l5cHY3ZjFoNGgybHFlNGUzb2JkeHAifQ.SvnYKSC33_OLXyhtkhX47g', {
   maxZoom: 19
}).addTo(map);

const basemapLayers = {
    'Gray': base_gray,
    'Satellite': base_sat,
    'Outdoor': base_green,
};

L.control.layers(basemapLayers).addTo(map);

const fetchAcequ = fetch('/data/Acequias.geojson').then(response => response.json());
const fetchResev = fetch('/data/reservoirs_NM.geojson').then(response => response.json());
const fetchSurfwat = fetch('/data/SurfaceWaterRiverReach_NM.geojson').then(response => response.json());

Promise.all([fetchAcequ, fetchResev, fetchSurfwat])
    .then(([acequData, resevData, surfwatData]) => {
        Acequ = L.geoJSON(acequData).addTo(map);

        damIcon = L.icon({
            iconUrl: '/data/dam.png',
            iconSize: [38, 38],
            popupAnchor: [-3, -76]
        });

        resev = L.geoJSON(resevData, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: damIcon }).bindPopup(feature.properties.RESNAME);
            }
        }).addTo(map);

        surfwat = L.geoJSON(surfwatData, {
            style: function (feature) {
                return {
                    color: '#0000cc',
                    weight: 2,
                };
            }
        }).addTo(map);

        const overlayLayers = {
            'Acequias': Acequ,
            'Reservoirs': resev,
            'Rivers': surfwat,
        };

        L.control.layers(basemapLayers, overlayLayers).addTo(map);
    })
    .catch(error => console.error('Error:', error));

function zoom() {
    map.setView([33.18, -107.2253], 12);
}

function zoom_Ace() {
    map.setView([32.3199, -106.7637], 12);
}

function zoom_res() {
    map.setView([34.307, -106.018], 7);
}

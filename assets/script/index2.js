'use strict';
/*
npm init -y
        npm i lite-server -D (aka --save-dev)
        + Add a script to your package.json
        + npm run start
*/

/*--------------------------------------------------------------*/
/*  function: getLocation  & Add a map                          */
/*--------------------------------------------------------------*/
//Token
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9zYW1hcmlhbnVuZXpyaXZlcmEiLCJhIjoiY2xxMWJiOXlhMDd1MzJtbzViNnZqd214dSJ9.Ots2kI7dKHtA2K0eNTp7aA';
const mapDiv = document.getElementById('map');
let map;
// Initialize the map with a default center
initializeMap([-106.346771, 56.130366]);

//Creating a Map
function initializeMap(center) {
    map = new mapboxgl.Map({
    container: mapDiv,
    style: "mapbox://styles/rosamarianunezrivera/clq3adbbb018601pgh9ajhaes",
    center: center,
    pitch: 25,
    zoom: 3,
});
}

function setNewCenter(center) {
    map.easeTo({
        center: center,
        pitch: 40,
        zoom: 16,
        duration: 1000, // Duración de la transición en milisegundos
    });
}


function getLocation(position) {
    let { latitude, longitude } = position.coords;

    const actualPosition = [longitude, latitude];

    setNewCenter(actualPosition);

    //Seeting new center 
    marker.setLngLat(actualPosition);

}

/*--------------------------------------------------------------*/
/*Function: Track()                                         */
/*--------------------------------------------------------------*/
function track() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(getLocation, errorHandler, options);
    } else {
        console.log('Geolocation API is not supported by your browser');
    }
}

// Add market to user's location
const marker = new mapboxgl.Marker({
    color: " #278295",
    draggable: true,
}).setLngLat(actualPosition).addTo(map);

/*--------------------------------------------------------------*/
/*                   Even Listener Button Tracker               */
/*--------------------------------------------------------------*/
const btnTracker = document.querySelector('.button-tracker');
btnTracker.addEventListener("click", () => {
    track();
})

const options = {
    enableHighAccuracy: true
};

function errorHandler(error) {
    console.log(error.message);
}













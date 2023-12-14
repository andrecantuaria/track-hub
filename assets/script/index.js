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

//Creating a Map
let map = new mapboxgl.Map({
    container: mapDiv,
    style: "mapbox://styles/rosamarianunezrivera/clq3adbbb018601pgh9ajhaes",
    center: [-106.346771, 56.130366],
    pitch: 25,
    zoom: 4,
});

/*--------------------------------------------------------------*/
/*Function: Set new center                                         */
/*--------------------------------------------------------------*/
function setNewCenter(center) {
    map.easeTo({
        center: center,
        pitch: 50,
        zoom: 16,
        duration: 1000, // Duración de la transición en milisegundos
    });
}

/*--------------------------------------------------------------*/
/*Function: Track()                                         */
/*--------------------------------------------------------------*/
function track() {
    function getLocation(position) {
        let { latitude, longitude } = position.coords;

        const actualPosition = [longitude, latitude];
        setNewCenter(actualPosition);

        /*
        //Creating a Map
        let map = new mapboxgl.Map({
            container: mapDiv,
            style: "mapbox://styles/rosamarianunezrivera/clq3adbbb018601pgh9ajhaes",
            center: actualPosition,
            pitch: 40,
            zoom: 16
        });*/

        // Add market to user's location
        const marker = new mapboxgl.Marker({
            color: "#bc3713",
            draggable: true,
        }).setLngLat(actualPosition).addTo(map);
    }

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(getLocation, errorHandler, options);
    } else {
        console.log('Geolocation API is not supported by your browser');
    }
}

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

if (!mapboxgl.supported()) {
    console.log('WebGL is not supported by your browser');
}













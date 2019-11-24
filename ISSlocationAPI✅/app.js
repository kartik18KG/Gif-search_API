const SatURl = "https://api.wheretheiss.at/v1/satellites/25544";

var mymap = L.map("ISSloc").setView([0, 0], 1);
var myIcon = L.icon({
    iconUrl: "iss.png",
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});

const marker = L.marker([0, 0], { icon: myIcon }).addTo(mymap);

L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,

        id: "mapbox.streets",
        accessToken: "pk.eyJ1Ijoia2FydGlrMThnIiwiYSI6ImNrMmg0ZXByMTAyYnEzY29laHIxYmJ6NzIifQ.jNjY-tnIhfG-GTMxc2jDbw"
    }
).addTo(mymap);

// L.tileLayer(
//     "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//         maxZoom: 18,
//         id: "mapbox.steets",
//         accessToken: "pk.eyJ1Ijoia2FydGlrMThnIiwiYSI6ImNrMmg0ZXByMTAyYnEzY29laHIxYmJ6NzIifQ.jNjY-tnIhfG-GTMxc2jDbw"
//     }
// ).addTo(mymap);

async function getSat() {
    const response = await fetch(SatURl);
    const data = await response.json();
    const latitude = data.latitude;
    const longitude = data.longitude;
    const velocity = data.velocity;
    // L.marker([latitude, longitude]).addTo(mymap)
    marker.setLatLng([latitude, longitude]);
    document.getElementById("lon").innerHTML = longitude.toFixed(4);
    document.getElementById("lat").innerHTML = latitude.toFixed(4);
    document.getElementById("vel").innerHTML = velocity.toFixed(0) + " Km/Hr";
    console.log(data);
}

function getmap() {
    var mymap = L.map("mapid").setView([51.505, -0.09], 13);
}

setInterval(getSat, 1000)
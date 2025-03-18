
let map
let currentMarker

function mapAndAirportSeach(lat2, lon2,iatacode) {

    console.log("window.longlat2:", window.longlat2);
    console.log("window.longlat:", window.longlat);
    if (!map) {
        map = L.map('map');  // Use the global map variable
        map.setView([51.505, -0.09], 13); // Set initial view

        console.log("RESVIED ON THE CORRECT FILE TO UPDATEMAP"+window.longlat);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    }

    setTimeout(function () {
        let lat = window.longlat.latitude;
        let lon = window.longlat.longitude;

        let point1 = [window.longlat.latitude, window.longlat.longitude]; // Point 1: London
        let point2 = [window.longlat2.latitude, window.longlat2.longitude];  // Point 2:


    L.marker(point1).addTo(map)
        .bindPopup(`    ${window.RealnameOfAirport}`)  
            .openPopup();

      
        
        currentMarker =L.marker(point2).addTo(map)
            .bindPopup(`    ${window.RealnameOfAirport}`)
        .openPopup();

      

        if (point1 && point2) {
            let latLngs = [point1, point2];
            L.polyline(latLngs, { color: 'blue' }).addTo(map);
        }
      


   

        if (!window.longlat || window.longlat.latitude === undefined || window.longlat.longitude === undefined) {
            alert("Please enter airport name");
            return;
        }

        //let lat = window.longlat.latitude;
        //let lon = window.longlat.longitude;

       

        if (!currentMarker) {
           currentMarker = L.marker([lat, lon]).addTo(map);
        } else {
            currentMarker.setLatLng([lat, lon]); // Update marker's position
        }

        // let marker = L.marker([lat, lon]).addTo(map)
        map.setView([lat, lon], 13);
        console.log(lat,lon +"this is cordiante ")
       
      
    
},1000)
}

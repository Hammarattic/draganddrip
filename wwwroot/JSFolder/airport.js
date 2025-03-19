//import * as map from './mapjs.js'

export async function airportseach(iatacode, lat2, lon2) {  
    let foundAirport = null;
    const clientId = "oaA6Au8UplSW1w2PZj2mmoRt7lVc2sER";
    const clientSecret = "15DwGampdcLJ5vQf";
    console.log("code is updated "+lat2,lon2)
    async function getAccessToken() {
        const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
            method: "POST",
           headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: clientId,
                client_secret: clientSecret,
            }),
        });

        const data = await response.json();
        return data.access_token;
    }

    async function getAirportData() {
        try {
            const token = await getAccessToken();
           
            let search = document.getElementById("airportseach").value || iatacode;
            console.log("Search value: " + search);
            const response = await fetch(`https://test.api.amadeus.com/v1/reference-data/locations?keyword=${search}&subType=AIRPORT`, {
                
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            console.log(data)
            if (data.data.length > 0) {

                const airport = data.data[0];
                let existingLonglat = window.longlat;
                console.log(existingLonglat)
                console.log(existingLonglat === undefined)
                if (existingLonglat === undefined) {
                    let lat = airport.geoCode.latitude;
                    let lon = airport.geoCode.longitude;

                    window.longlat = { latitude: lat, longitude: lon };
                }
                else {
                    console.log("Else block")
                    // set the previous airport 
                    let lon2 = existingLonglat.longitude;
                    let lat2 = existingLonglat.latitude;
                    window.longlat2 = { latitude: lat2, longitude: lon2 };

                    // set the new airport
                    let lat = airport.geoCode.latitude;
                    let lon = airport.geoCode.longitude;
                    window.longlat = { latitude: lat, longitude: lon };
                }

                //lat2 = lat2 ?? airport.geoCode.latitude;
                //lon2 = lon2 ?? airport.geoCode.longitude;

                //window.longlat2 = { latitude: lat2, longitude: lon2 };

                //let long =airport.geoCode.longitude;
                //let lat=airport.geoCode.latitude
                //window.longlat = { longitude: long, latitude: lat };//chekc herre din nød

                console.log('longlat');
                console.log(window.longlat);
                console.log('longlat2');
                console.log(window.longlat2)
                window.RealnameOfAirport = airport.name;
                window.nameOfAirport = airport.iataCode;
                window.cordsAirportLat = airport.geoCode.latitude;
                window.cordsAirportLon = airport.geoCode.longitude;

                document.getElementById("output").innerHTML = `
                        <p><strong>Airport:</strong> ${airport.name} (${airport.iataCode})</p>
                        <p><strong>Latitude:</strong> ${airport.geoCode.latitude}</p>
                        <p><strong>Longitude:</strong> ${airport.geoCode.longitude}</p>
                    `;

                foundAirport = airport;
            } else {
                document.getElementById("output").innerText = "No airport data found.";
            }
        } catch (error) {
            console.error("Error:", error);
            document.getElementById("output").innerText = "Failed to fetch data.";
        }
    }

    await getAirportData();
    let searchInputField = document.getElementById("airportseach");
    searchInputField.value = "";
    console.log("Reset search value: " + searchInputField.value);

    if (foundAirport != null) {
        return {
            Lon: foundAirport.geoCode.longitude,
            Lat: foundAirport.geoCode.latitude,
            IataCode: foundAirport.iataCode,
            Name: foundAirport.name
        };
    }

    return null;


    //setTimeout(function () {
    //    //map.mapAndAirportSeach()
    //        //addBox()
    //    //DotNet.invokeMethodAsync('BlazorApp1', 'ReturnAirportNameAsyncsimple', "tao").then(data => { console.log(data); });
    //    setTimeout(function () { 
    //        document.getElementById("airportseach").value = "";
    //    }, 1000)
    //},1000)
    
    
}




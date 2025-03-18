




export function ReturnAirportNameAsyncsimple() {
    
    setTimeout(function () {
        let airportname = `${window.nameOfAirport}`
        console.log(airportname)
    DotNet.invokeMethodAsync('BlazorApp1', 'ReturnAirportNameAsyncsimple', airportname )
        .then(data => {
            console.log(data);
        });
    }, 3000)
}

export function addHandlers() {
    const btn = document.getElementById("btn");
    btn.addEventListener("click", ReturnAirportNameAsyncsimple);
}


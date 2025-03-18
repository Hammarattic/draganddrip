canClick = false;
boxsnap = false;
let yPositions = {}; // Stores Y positions for each box
movementControl = false

function addBox(boxsnap = false) {
    let container = document.getElementById("draggable");

    // Check if the box already exists to avoid duplicates
    let existingbox = document.querySelector(`[data-airport="${window.nameOfAirport}"]`);
    if (existingbox) {
        console.log("box already exists");
        return;
    }

    // Create new box
    let newBox = document.createElement("div");
    newBox.classList.add("draggable");
    newBox.setAttribute("data-x", "0");
    newBox.setAttribute("data-y", "0");
    newBox.style.minHeight = "70px";
    newBox.style.width = "70px";
    newBox.textContent = `${window.nameOfAirport} - ${window.cordsAirportLat}, ${window.cordsAirportLon}`;
    newBox.setAttribute("data-airport", window.nameOfAirport);
    newBox.setAttribute("data-lat", window.cordsAirportLat);
    newBox.setAttribute("data-lon", window.cordsAirportLon);
    newBox.style.backgroundColor = "#39e";
    newBox.style.color = "white";
    newBox.style.borderRadius = "50%";
    newBox.style.cursor = "pointer";
    newBox.style.zIndex = "1000";

    if (canClick === true) {
        newBox.addEventListener("click", function () {
            let iataCode = this.getAttribute("data-airport");
            let lat2 = this.getAttribute("data-lat");
            let lon2 = this.getAttribute("data-lon");
            console.log("You clicked: " + lat2, lon2);
            airportseach(iataCode, lat2, lon2);
        });
    }

    console.log("Adding box:", newBox.textContent);
    newBox.style.padding = "4%";
    container.appendChild(newBox);

    dragAndDrop(newBox);

    let mybox = document.getElementById("draggable");
    let boxes = mybox.querySelectorAll(".draggable");

    if (boxes.length > 1) {
        let secondToLastBox = boxes[boxes.length - 2];
        console.log("Second-to-last box:", secondToLastBox);

        let iataCode = secondToLastBox.getAttribute("data-airport");
        let lat2 = secondToLastBox.getAttribute("data-lat");
        let lon2 = secondToLastBox.getAttribute("data-lon");

        console.log("IATA Code:", iataCode);
        console.log("Latitude:", lat2);
        console.log("Longitude:", lon2);

        airportseach(iataCode, lat2, lon2);
    } else {
        console.log("Need at least 2 airports to draw a line.");
    }

    newBox.addEventListener("click", function () {
        let iataCode = this.getAttribute("data-airport");
        console.log("sending data to airport.js");
        console.log(iataCode);
        airportseach(iataCode);
    });
}

window.getAirportName = () => {
    return window.nameOfAirport;
};

function logItems(items) {
    console.log("Logging items:", items);
};

function logText(text) {
    console.log(text);
};

function setSnapBoxToTrue() {
    boxsnap = true;
    console.log(boxsnap + " boxsnap now set to true");
    addBox(boxsnap);
    return;
}

function setSnapBoxToFalse() {
    boxsnap = false;
    console.log(boxsnap + " boxsnap now set to false");
    addBox(boxsnap);
    return;
}
function resetAllBoxes() {
    let boxes = document.querySelectorAll(".draggable"); // Get all the draggable boxes
    boxes.forEach(box => {
        box.dataset.y = "0"; // Reset Y position to 0
        box.style.transform = "translate(0, 0)"; // Reset the visual position
        // Optionally, you could also reset the X position
        box.dataset.x = "0";
    });
}
//console.log("JS loaded!");
//export function ReturnAirportNameAsync() {
//    DotNet.invokeMethodAsync('BlazorApp1', 'ReturnAirportNameAsync', "jfk test ")
//        .then(data => {
//            console.log(data);
//        });
//}

//export function addHandlers() {
//    const btn = document.getElementById("btn");
//    btn.addEventListener("click", ReturnAirportNameAsync);
//}
// Function to handle dragging
function dragAndDrop(className) {
    interact(className).draggable({
        listeners: {
            start(event) {
                event.target.dataset.startX = event.target.getAttribute("data-x") || 0;
                event.target.dataset.startY = event.target.getAttribute("data-y") || 0;

            },
            move(event) {

                let x = (parseFloat(event.target.getAttribute("data-x")) || 0) + event.dx;
                let y = (parseFloat(event.target.getAttribute("data-y")) || 0) + event.dy;
                console.log(y)

                event.target.style.transform = `translate(${x}px, ${y}px)`;
                event.target.setAttribute("data-x", x);
                event.target.setAttribute("data-y", y);

                document.querySelectorAll(".draggable").forEach(box => {
                    let airportCode = box.getAttribute("data-airport");
                    let y = parseFloat(box.getAttribute("data-y")) || 0;

                    yPositions[airportCode] = y; // Store each box's Y position
                });




            },
            end(event) {

                function findBoxWithHighestY(currentBox) {
                    let boxes = Array.from(document.querySelectorAll(".draggable"));
                    let highestBox = null;
                    let maxY = null;

                    boxes.forEach(box => {
                        if (box !== currentBox) {
                            // Ensure 'data-y' exists and is a valid number
                            let boxY = parseFloat(box.getAttribute("data-y"));

                            if (!isNaN(boxY) && boxY > maxY) {
                                maxY = boxY;

                                highestBox = box;
                                console.log(highestBox + "this is the high box")
                            }
                        }
                    });

                    return highestBox; // Returns the box with the highest Y position
                }

                let box = event.target;

                if (boxsnap === true) {
                    let highestBox = findBoxWithHighestY(box);

                    if (highestBox) {
                        let highestY = parseFloat(highestBox.getAttribute("data-y"));
                        let newY = highestY - highestBox.getBoundingClientRect().height; // Snap below with spacing

                        box.style.transform = `translate(${box.dataset.startX}px, ${newY}px)`;
                        box.setAttribute("data-x", box.dataset.startX);
                        box.setAttribute("data-y", newY);
                    }
                } resetAllBoxes()
                if (boxsnap === true) {

                }

                if (isOverlapping(box)) {
                    box.style.transform = `translate(${box.dataset.startX}px, ${box.dataset.startY}px)`;
                    box.setAttribute("data-x", box.dataset.startX);
                    box.setAttribute("data-y", box.dataset.startY);
                }
            }
        },
        modifiers: [
            // Snap to grid
            interact.modifiers.snap({
                targets: [interact.snappers.grid({ x: 1, y: 1 })],
                range: 10,
                relativePoints: [{ x: 0, y: 0 }]
            }),
            // Restrict movement to parent container
            interact.modifiers.restrictRect({
                restriction: '.main',
                endOnly: true
            })
        ]
    });
}

// Function to check if boxes are overlapping
function isOverlapping(box) {
    let boxes = document.querySelectorAll(".draggable");
    let boxRect = box.getBoundingClientRect();

    for (let otherBox of boxes) {
        if (otherBox !== box) {
            let otherRect = otherBox.getBoundingClientRect();
            if (
                boxRect.left < otherRect.right &&
                boxRect.right > otherRect.left &&
                boxRect.top < otherRect.bottom &&
                boxRect.bottom > otherRect.top
            ) {
                return true;
            }
        }
    }
    return false;
}

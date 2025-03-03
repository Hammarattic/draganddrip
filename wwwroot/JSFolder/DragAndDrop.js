

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

                event.target.style.transform = `translate(${x}px, ${y}px)`;
                event.target.setAttribute("data-x", x);
                event.target.setAttribute("data-y", y);

            },



            end(event) {
                if (isOverlapping(event.target)) {
                    event.target.style.transform = `translate(${event.target.dataset.startX}px, ${event.target.dataset.startY}px)`;
                    event.target.setAttribute("data-x", event.target.dataset.startX);
                    event.target.setAttribute("data-y", event.target.dataset.startY);
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
function isOverlapping(box) {
    let boxes = document.querySelectorAll(".draggable");
    let boxRect = box.getBoundingClientRect();

    for  (let otherBox of boxes) {
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
    return false
}


function addBox() {
    let container = document.getElementById("draggable");
    let boxText = document.getElementById("text").value;

    

    let newBox = document.createElement("div");
    newBox.classList.add("draggable");
    newBox.setAttribute("data-x", "0");
    newBox.setAttribute("data-y", "0");
    newBox.style.minHeight = "70px "; 
    newBox.style.width = "70px";
    newBox.textContent = boxText;
    newBox.style.backgroundColor = "#39e";
    newBox.style.color = "white";
    newBox.style.borderRadius = "50%";
    
    newBox.style.padding = "4%";
    container.appendChild(newBox);

    dragAndDrop(newBox)
}



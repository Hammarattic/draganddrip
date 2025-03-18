window.initializeSortable = function () {
    const el = document.getElementById("sortable-list");
    new Sortable(el, {
        animation: 150,
        onEnd(evt) {
            console.log(`Item moved from ${evt.oldIndex} to ${evt.newIndex}`);
        }
    });
};

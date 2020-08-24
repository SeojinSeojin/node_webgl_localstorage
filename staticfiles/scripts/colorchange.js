const radios = document.querySelectorAll('input[type=radio][name="color"]');
const canvas = document.querySelector("canvas");

function changeColor(color) {
    canvas.style.backgroundColor = color.toLowerCase();
}

function changeHandler(event) {
    const color = this.value;
    localStorage.currentColor = color;
    changeColor(color);
}

Array.prototype.forEach.call(radios, function(radio) {
    radio.addEventListener("change", changeHandler);
});

function init() {
    const lsColor = localStorage.currentColor;
    const color = lsColor !== null || lsColor !== undefined ? lsColor : "white";
    changeColor(color);
}

init();
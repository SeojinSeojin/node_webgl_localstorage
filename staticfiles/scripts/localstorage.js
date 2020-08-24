const form = document.getElementById("username__form");
const input = form.querySelector("input");

function saveName(event) {
    event.preventDefault();
    const username = input.value;
    localStorage.userName = username;
    showName();
}

function showName() {
    const username = localStorage.userName;
    input.placeholder = `${username}`;
    input.value = "";
}

function init() {
    form.addEventListener("submit", saveName);
    if (localStorage.userName !== null && localStorage.userName !== undefined) {
        showName();
    }
}

init();
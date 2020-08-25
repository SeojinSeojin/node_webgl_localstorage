const input = document.querySelector("input[type=text]");

function saveName(event) {
    event.preventDefault();
    const username = input.value;
    localStorage.userName = username;
    showName();
}

function showName() {
    const username = localStorage.userName;
    input.placeholder = `${username}`;
}

function init() {
    input.addEventListener("change", saveName);
    if (localStorage.userName !== null && localStorage.userName !== undefined) {
        showName();
    }
}

init();
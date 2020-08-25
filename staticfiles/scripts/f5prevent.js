function doNotReload() {
    if (
        (event.ctrlKey == true && (event.keyCode == 78 || event.keyCode == 82)) ||
        event.keyCode == 116
    ) {
        event.keyCode = 0;
        event.cancelBubble = true;
        event.returnValue = false;
    }
}
document.onkeydown = doNotReload;
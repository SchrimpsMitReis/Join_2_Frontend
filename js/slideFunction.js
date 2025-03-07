/**
 * This function is for a container to start and close a slide from the right side 
 * 
 */
function openBigOverlay() {
    document.getElementById('overlay').classList.add('show-overlay');
}

function closeBigOverlay() {
    document.getElementById('overlay').classList.remove('show-overlay');
}

function openResOverlay() {
    document.getElementById('responOverlay').classList.add('show-respon-overlay');
}

function closeResOverlay() {
    document.getElementById('responOverlay').classList.remove('show-respon-overlay');
}

function openContactDetails() {
    document.getElementById('detailsContainer').classList.add('show-details');
}

function closeContactDetails() {
    document.getElementById('detailsContainer').classList.remove('show-details');
}

function openSuccessOverlay() {
    document.getElementById('overlaySuccess').classList.add('show-success-overlay');
}

function openSuccessOverlayTask() {
    document.getElementById('overlaySuccessTask').classList.add('show-success-overlay');
}

function closeSuccessOverlay() {
    document.getElementById('overlaySuccess').classList.remove('show-success-overlay');
}

function closeSuccessOverlayTask() {
    document.getElementById('overlaySuccessTask').classList.remove('show-success-overlay');
}

function openPopUpTaskCard() {
    document.getElementById('addTask').classList.add('showPopUpTaskCard');
}

function closePopUpTaskCard() {
    document.getElementById('addTask').classList.remove('showPopUpTaskCard');
}

function openHeadMenu(logOutWindow) {
    logOutWindow.classList.add("show-popupAccount");
}

function closeHeadMenu(logoutWindow) {
    logoutWindow.classList.remove("show-popupAccount");
}

function openSuccessCreateAccountOverlay() {
    document.getElementById('overlaySuccessCreateAccount').classList.add('show-success-overlay');
}

function closeSuccessCreateAccountOverlay() {
    document.getElementById('overlaySuccessCreateAccount').classList.remove('show-success-overlay');
}
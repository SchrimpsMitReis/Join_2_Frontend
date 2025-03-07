/**
 * Initiates a touch interaction for a draggable element.
 * @param {string} category - The category of the element being touched.
 * @param {number|string} id - The unique identifier of the element.
 * @param {Event} event - The event object associated with the touch action.
 */
function startTouching(category, id, event) {
    lastTouchStartTime = new Date().getTime(); 
    currentDraggedElement = id; 
    let element = document.getElementById(`tinyTaskCard${id}`);

    if (element) {
        copyElement(element, category, id, event);
    }
}
/**
 * Creates a "ghost" copy of the given element for drag-and-drop purposes.
 * @param {HTMLElement} element - The DOM element to be cloned.
 * @param {string} category - The category of the element being cloned.
 * @param {number|string} id - The unique identifier of the element.
 * @param {TouchEvent} event - The touch event initiating the drag.
 */
function copyElement(element, category, id, event) {
    let ghostElement = element.cloneNode(true);
    ghostElement.id = 'ghostElement';
    ghostElement.style.position = 'absolute';
    ghostElement.style.opacity = '0.5';
    document.body.appendChild(ghostElement);
    let touchX = event.touches[0].clientX;
    let touchY = event.touches[0].clientY;
    let rect = element.getBoundingClientRect();
    offsetX = touchX - rect.left;
    offsetY = touchY - rect.top;
    moveGhostElement(touchX, touchY); 
}
/**
 * Moves the 'ghost' element to a new position based on the provided coordinates.
 * @param {number} x - The X-coordinate (horizontal position) to move the element to.
 * @param {number} y - The Y-coordinate (vertical position) to move the element to.
 */
function moveGhostElement(x, y) {
    let ghostElement = document.getElementById('ghostElement');
    if (ghostElement) {
        ghostElement.style.left = (x - offsetX) + 'px';
        ghostElement.style.top = (y - offsetY) + 'px';
    }
}
/**
 * Handles the movement of an element during a touch event.
 * @param {TouchEvent} event - The touch event containing the new touch coordinates.
 */
function moveTouching(event) {
    isMoving = true;
    let touchX = event.touches[0].clientX;
    let touchY = event.touches[0].clientY;
    moveGhostElement(touchX, touchY);
}
/**
 * Concludes the touch interaction by determining the drop zone and moving the element.
 * @param {TouchEvent} touchEvent - The touch event signaling the end of a touch interaction.
 */
function endTouching(touchEvent) {
    let dropZone = determineDropZone(touchEvent); 
    moveTo(dropZone); 
    let ghostElement = document.getElementById('ghostElement');

    if (ghostElement) {
        document.body.removeChild(ghostElement);
    }
    isMoving = false;
}
/**
 * Determines the appropriate drop zone based on the touch event's coordinates.
 * @param {TouchEvent} touchEvent - The touch event with the coordinates to be evaluated.
 * @returns {string|null} The name of the drop zone if found, otherwise null.
 */
function determineDropZone(touchEvent) {
    let touchX = touchEvent.changedTouches[0].clientX;
    let touchY = touchEvent.changedTouches[0].clientY;
    if (isInsideDropZone(touchX, touchY, 'ondropTodo')) return 'Todo';
    if (isInsideDropZone(touchX, touchY, 'ondropProgress')) return 'Inprogress';
    if (isInsideDropZone(touchX, touchY, 'ondropFeedback')) return 'Awaitfeedback';
    if (isInsideDropZone(touchX, touchY, 'ondropDone')) return 'Done';
    return null;
}
/**
 * Checks if the given coordinates (x, y) are inside the specified drop zone.
 * @param {number} x - The X-coordinate to check.
 * @param {number} y - The Y-coordinate to check.
 * @param {string} dropZoneId - The ID of the drop zone to check against.
 * @returns {boolean} True if the coordinates are inside the drop zone, false otherwise.
 */
function isInsideDropZone(x, y, dropZoneId) {
    let zone = document.getElementById(dropZoneId);
    let rect = zone.getBoundingClientRect();
    return (
        x >= rect.left && x <= rect.right &&
        y >= rect.top && y <= rect.bottom
    );
}


function endTouchAndReset(event) {
    endTouching(event);
    setTimeout(() => { isMoving = false; }, 400);
}


function openTaskOnTouch(x) {
    let currentTime = new Date().getTime();
    if (currentTime - lastTouchStartTime < 400 && !isMoving) {
        openTask(x);
    }
}

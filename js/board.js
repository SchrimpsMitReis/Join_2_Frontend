let currentDraggedElement;
let isMoving = false;
let lastTouchStartTime = 0;
/**
 * Hides an HTML element by adding 'd-none' class.
 * @param {string} id - The ID of the element to hide.
 */
function hide(id) {
    let element = document.getElementById(id);
    if (element) {
        element.classList.add('d-none');
    }
}
/**
 * Shows a hidden HTML element by removing 'd-none' class.
 * @param {string} id - The ID of the element to show.
 */
function show(id) {
    let element = document.getElementById(id);
    if (element) {
        element.classList.remove('d-none');
    }
}
/**
 * Filters task names based on a search input and updates task containers.
 * @param {string} search - The search input value.
 */
function filterTaskNames() {
    let search = document.getElementById('searchTask').value.toLowerCase();
    let todoContainer = document.getElementById('kambanTodo');
    let progressContainer = document.getElementById('kambanInprogress');
    let feedbackContainer = document.getElementById('kambanFeedback');
    let doneContainer = document.getElementById('kambanDone');
    clearInnerHTML(todoContainer, progressContainer, feedbackContainer, doneContainer);
    filterArrayFromBoard(search, todoContainer, progressContainer, feedbackContainer, doneContainer);
}
/**
 * Clears the HTML content of specified task containers.
 * @param {HTMLElement} todoContainer - The container for 'todo' tasks.
 * @param {HTMLElement} progressContainer - The container for 'progress' tasks.
 * @param {HTMLElement} feedbackContainer - The container for 'feedback' tasks.
 * @param {HTMLElement} doneContainer - The container for 'done' tasks.
 */
function clearInnerHTML(todoContainer, progressContainer, feedbackContainer, doneContainer) {
    todoContainer.innerHTML = '';
    progressContainer.innerHTML = '';
    feedbackContainer.innerHTML = '';
    doneContainer.innerHTML = '';
}
/**
 * Filters tasks based on search criteria and updates task containers.
 * @param {string} search - The search input value.
 * @param {HTMLElement} todoContainer - The container for 'todo' tasks.
 * @param {HTMLElement} progressContainer - The container for 'progress' tasks.
 * @param {HTMLElement} feedbackContainer - The container for 'feedback' tasks.
 * @param {HTMLElement} doneContainer - The container for 'done' tasks.
 */
function filterArrayFromBoard(search, todoContainer, progressContainer, feedbackContainer, doneContainer) {
    for (let r = 0; r < Join.tasks.length; r++) {
        let title = Join.tasks[r]['title'].toLowerCase();
        let desc = Join.tasks[r]['desc'].toLowerCase();
        searchTitleAndDescription(title, desc, search, todoContainer, progressContainer, feedbackContainer, doneContainer, r);
    }
}
/**
 * Searches task title and description, updates corresponding task container with matching tasks.
 * @param {string} title - The task title.
 * @param {string} desc - The task description.
 * @param {string} search - The search input value.
 * @param {HTMLElement} todoContainer - The container for 'todo' tasks.
 * @param {HTMLElement} progressContainer - The container for 'progress' tasks.
 * @param {HTMLElement} feedbackContainer - The container for 'feedback' tasks.
 * @param {HTMLElement} doneContainer - The container for 'done' tasks.
 * @param {number} r - The index of the task in the tasks array.
 */
function searchTitleAndDescription(title, desc, search, todoContainer, progressContainer, feedbackContainer, doneContainer, r) {
    if (title.includes(search) || desc.includes(search)) {
        let taskCard = Join.tasks[r].tinyTaskCard(r);
        if (Join.tasks[r].todo) {
            todoContainer.innerHTML += taskCard;
        } else if (Join.tasks[r].progress) {
            progressContainer.innerHTML += taskCard;
        } else if (Join.tasks[r].feedback) {
            feedbackContainer.innerHTML += taskCard;
        } else if (Join.tasks[r].done) {
            doneContainer.innerHTML += taskCard;
        }
    }
    checkDragArea();
}
/**
 * Updates HTML content based on task categories and their status.
 */
function updateHTML() {
    let ondropTodo = document.getElementById('ondropTodo');
    let ondropProgress = document.getElementById('ondropProgress');
    let ondropFeedback = document.getElementById('ondropFeedback');
    let ondropDone = document.getElementById('ondropDone');
    filterTask();
    let none = Join.tasks.filter(s => s.todo === false && s.progress === false && s.feedback === false && s.done === false);
    checkBooleanNone(none);
    iterateAllTaskCard(ondropTodo, ondropProgress, ondropFeedback, ondropDone, todos, inProgress, awaitFeedback, done);
}
/**
 * Filters tasks based on their status and clears corresponding HTML elements.
 * @param {array} Join.tasks - The array of tasks.
 */
function filterTask() {
    let todos = Join.tasks.filter(s => s.todo === true);
    todos.innerHTML = '';
    let inProgress = Join.tasks.filter(s => s.progress === true);
    inProgress.innerHTML = '';
    let awaitFeedback = Join.tasks.filter(s => s.feedback === true);
    awaitFeedback.innerHTML = '';
    let done = Join.tasks.filter(s => s.done === true);
    done.innerHTML = '';
}
/**
 * Sets boolean properties of tasks in the 'none' category.
 * @param {Array} none - An array of tasks with no category.
 */
function checkBooleanNone(none) {
    for (let i = 0; i < none.length; i++) {
        let nothing = none[i];
        nothing.todo = true;
        nothing.progress = false;
        nothing.feedback = false;
        nothing.done = false;
    }
}
/**
 * Iterates through all task categories and updates corresponding HTML content.
 * @param {HTMLElement} dropT - The container for 'todo' tasks.
 * @param {HTMLElement} dropP - The container for 'progress' tasks.
 * @param {HTMLElement} dropF - The container for 'feedback' tasks.
 * @param {HTMLElement} dropD - The container for 'done' tasks.
 * @param {Array} todos - An array of 'todo' tasks.
 * @param {Array} inProgress - An array of 'progress' tasks.
 * @param {Array} awaitFeedback - An array of 'feedback' tasks.
 * @param {Array} done - An array of 'done' tasks.
 */
function iterateAllTaskCard(dropT, dropP, dropF, dropD, todos, inProgress, awaitFeedback, done) {
    todoTaskCard(dropT, todos);
    progressTaskCard(dropP, inProgress);
    feedbackTaskCard(dropF, awaitFeedback);
    doneTaskCard(dropD, done);
}
/**
 * Updates 'todo' task category HTML content.
 * @param {HTMLElement} dropT - The container for 'todo' tasks.
 * @param {Array} todos - An array of 'todo' tasks.
 */
function todoTaskCard(dropT, todos) {
    for (let q = 0; q < todos.length; q++) {
        let todo = todos[q];        
        dropT.innerHTML.innerHTML += todo.tinyTaskCard(q);
    }
}
/**
 * Updates 'progress' task category HTML content.
 * @param {HTMLElement} dropP - The container for 'progress' tasks.
 * @param {Array} inProgress - An array of 'progress' tasks.
 */
function progressTaskCard(dropP, inProgress) {
    for (let q = 0; q < inProgress.length; q++) {
        let progress = inProgress[q];
        dropP.innerHTML += progress.tinyTaskCard(q);
    }
}
/**
 * Updates 'feedback' task category HTML content.
 * @param {HTMLElement} dropF - The container for 'feedback' tasks.
 * @param {Array} awaitFeedback - An array of 'feedback' tasks.
 */
function feedbackTaskCard(dropF, awaitFeedback) {
    for (let q = 0; q < awaitFeedback.length; q++) {
        let feedback = awaitFeedback[q];
        dropF.innerHTML += feedback.tinyTaskCard(q);
    }
}
/**
 * Updates 'done' task category HTML content.
 * @param {HTMLElement} dropD - The container for 'done' tasks.
 * @param {Array} done - An array of 'done' tasks.
 */
function doneTaskCard(dropD, done) {
    for (let q = 0; q < done.length; q++) {
        let elementDone = done[q];
        dropD.innerHTML += elementDone.tinyTaskCard(q);
    }
}
/**
 * Sets the currently dragged element ID.
 * @param {string} id - The ID of the dragged element.
 */
function startDragging(id) {
    let draggedTask = Join.tasks.find(task => task.id == id)
    currentDraggedElement = draggedTask;
    
}
/**
 * Prevents the default behavior of a drop event.
 * @param {Event} ev - The drop event.
 */
function allowDrop(ev) {
    ev.preventDefault();
}
/**
 * Moves the dragged task to the specified category.
 * @param {string} category - The target category ('Todo', 'Inprogress', 'Awaitfeedback', or 'Done').
 */
async function moveTo(category) {
    if (currentDraggedElement !== undefined) {
        if (category === "Todo") {
            moveToTodo(currentDraggedElement);
        }
        else if (category === "Inprogress") {
            moveToProgress(currentDraggedElement);
        }
        else if (category === "Awaitfeedback") {
            moveToFeedback(currentDraggedElement);
        }
        else if (category === "Done") {
            moveToDone(currentDraggedElement);
        }
        await patchChanges(currentDraggedElement)
        // await saveTasks();
        JoinBoard.renderTask();
    }
}
/**
 * Moves the task to the 'Todo' category.
 * @param {string} currentDraggedElement - The ID of the dragged task.
 */
function moveToTodo(currentDraggedElement) {
    currentDraggedElement.todo = true;
    currentDraggedElement.progress = false;
    currentDraggedElement.feedback = false;
    currentDraggedElement.done = false;
}
/**
 * Moves the task to the 'Inprogress' category.
 * @param {string} currentDraggedElement - The ID of the dragged task.
 */
function moveToProgress(currentDraggedElement) {
    currentDraggedElement.todo = false;
    currentDraggedElement.progress = true;
    currentDraggedElement.feedback = false;
    currentDraggedElement.done = false;
}
/**
 * Moves the task to the 'Awaitfeedback' category.
 * @param {string} currentDraggedElement - The ID of the dragged task.
 */
function moveToFeedback(currentDraggedElement) {
    currentDraggedElement.todo = false;
    currentDraggedElement.progress = false;
    currentDraggedElement.feedback = true;
    currentDraggedElement.done = false;
}
/**
 * Moves the task to the 'Done' category.
 * @param {string} currentDraggedElement - The ID of the dragged task.
 */
function moveToDone(currentDraggedElement) {
    currentDraggedElement.todo = false;
    currentDraggedElement.progress = false;
    currentDraggedElement.feedback = false;
    currentDraggedElement.done = true;
}
/**
 * Adds a highlight class to the specified element.
 * @param {string} id - The ID of the element to highlight.
 */
function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}
/**
 * Removes the highlight class from the specified element.
 * @param {string} id - The ID of the element to remove the highlight from.
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}
/**
 * Checks and updates the visibility of task categories and their empty indicators.
 */
function checkDragArea() {
    let todoContainer = document.getElementById('kambanTodo');
    let progressContainer = document.getElementById('kambanInprogress');
    let feedbackContainer = document.getElementById('kambanFeedback');
    let doneContainer = document.getElementById('kambanDone');
    checkAreaTodo(todoContainer);
    checkAreaProgress(progressContainer);
    checkAreaFeedback(feedbackContainer);
    checkAreaDone(doneContainer);
}
/**
 * Checks and updates the visibility of 'todo' tasks and its empty indicator.
 */
function checkAreaTodo(container) {
    if (container.innerHTML !== '') {
        hide('emptyTaskTodo');
    } else {
        show('emptyTaskTodo'); 
    }
}
/**
 * Checks and updates the visibility of 'progress' tasks and its empty indicator.
 */
function checkAreaProgress(container) {
    if (container.innerHTML !== '') {
        hide('emptyTaskInprogress');
    } else {
        show('emptyTaskInprogress');
    }
}
/**
 * Checks and updates the visibility of 'feedback' tasks and its empty indicator.
 */
function checkAreaFeedback(container) {
    if (container.innerHTML !== '') {
        hide('emptyTaskFeedback');
    } else {
        show('emptyTaskFeedback');
    }
}
/**
 * Checks and updates the visibility of 'done' tasks and its empty indicator.
 */
function checkAreaDone(container) {
    if (container.innerHTML !== '') {
        hide('emptyTaskDone');
    } else {
        show('emptyTaskDone');
    }
}


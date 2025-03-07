/**
 * Displays the side and head components by updating the inner HTML of the 'SideAndHead' element.
 */
function showSideAndHead() {
    const SNH = document.getElementById('SideAndHead');
    SNH.innerHTML = Join.SideAndHead();
}
/**
 * Opens the side and head menu after a delay.
 * @param {Event} event - The click event.
 * @returns {void}
 */
function openSideAndHeadMenu(event) {
    let logOutWindow = document.getElementById('logoutWindow');
    event.stopPropagation();
    setTimeout(() => {
        logOutWindow.classList.remove("d-none");
        setTimeout(() => {
            openHeadMenu(logOutWindow);
        }, 200);
    }, 100);
}
/**
 * Closes the side and head menu if the click event is outside the logout window.
 * @param {Event} event - The click event.
 * @returns {void}
 */
function closeSideAndHeadMenu(event) {
    let logoutWindow = document.getElementById("logoutWindow");
    if (logoutWindow != undefined && !logoutWindow.contains(event.target)) {
        closeHeadMenu(logoutWindow);
    }
}
/**
 * Closes the selectContacts from add Task or taskcard, if the click event is outside the logout window.
 * @param {Event} event - The click event.
 * @returns {void}
 */
function closeAssigned(event) {
    let closeContacts = document.getElementById('closeContacts');
    let selectContacts = document.getElementById('selectContacts');
    if (closeContacts != undefined && !closeContacts.contains(event.target)) {
        closeContacts.classList.add('d-none');
        selectContacts.classList.remove('d-none');
    }
}
/**
 * Closes the Select of Category from add Task or taskcard, if the click event is outside the logout window.
 * @param {Event} event - The click event.
 * @returns {void}
 */
function closeCategory(event) {
    let showSelectCategory = document.getElementById('showSelectCategory');
    let hiddenSelectCategory = document.getElementById('hiddenSelectCategory');
    if (showSelectCategory != undefined && !showSelectCategory.contains(event.target)) {
        showSelectCategory.classList.add('d-none');
        hiddenSelectCategory.classList.remove('d-none');
    }
}
/**
 * Event handler for mouse down on the window, closing side and head menus.
 * @param {MouseEvent} e - The mouse down event.
 * @returns {void}
 */
window.onmousedown = function (e) {
    closeSideAndHeadMenu(e);
    closeContactMenu(e);
    closeAssigned(e);
    closeCategory(e);
}
/**
 * Logs out the current user by resetting the signed account and navigating to the start page.
 * @returns {void}
 */
function logout() {
    Join.signedAccount = "";
    deleteSignedUser()
    startPage()
}
/**
 * Toggles the "Remember Me" checkbox status.
 * @returns {void}
 */
function checkboxActivate() {
    Join.rememberMe = !Join.rememberMe;
}
/**
 * Toggles the "Remember Me" checkbox status.
 */
function policyCheckbox() {
    policyCheck = !policyCheck;
}
/**
 * Deactivates the checkbox for remembering the user.
 */
function checkboxDeactivate() {
    Join.rememberMe = false;
}
/**
 * Saves changes made to an existing task.
 * Updates the task at the given index in 'Join.tasks' with new values for title, users, description, date, priority, and subtasks.
 * It also retains certain properties of the existing task like category and status (todo, progress, feedback, done).
 * After updating, it saves the tasks, closes the task card, and performs cleanup operations.
 *
 * @param {number} taskIndex - Index of the task in the 'Join.tasks' array to be updated.
 */
async function taskSaveChanges(taskIndex) {
    const existingTask = Join.tasks[taskIndex];
    const taskId = existingTask.id
    const checkedUsers = getCheckedUsers();
    const editedTitle = document.getElementById('taskCardETitle').value;
    const editedDescription = document.getElementById('taskCardEDesc').value;
    const editedDate = getEditedDate(existingTask.date);
    const editedPriority = prioTemp;
    const taskCategory = existingTask.Category;

    Join.tasks[taskIndex] = new Task(
        taskId,
        editedTitle,
        checkedUsers,
        editedDescription,
        editedDate,
        editedPriority,
        taskCategory,
        subtaskTemp,
        existingTask.todo,
        existingTask.progress,
        existingTask.feedback,
        existingTask.done
    );
    await patchTask(taskIndex)
    // saveTasks();
    closeTaskCard();
    cleanUpAll();
}
/**
 * Retrieves all users from 'Join.accounts' who have the 'checked' property set to true.
 * This function is typically used to get a list of users that have been selected in a UI context.
 *
 * @returns {Array} An array of user objects from 'Join.accounts' where the 'checked' property is true.
 */
function getCheckedUsers() {
    return Join.accounts.filter(user => user.checked);
}
/**
 * Gets the edited date from a date input field or uses a default date if the input field is empty.
 * Retrieves the value from an input element with ID 'taskCardEDate' and checks if it's not empty.
 * If it's empty, returns the provided default date.
 *
 * @param {string} defaultDate - The default date to return if no date is entered in the input field.
 * @returns {string} The edited date from the input field or the default date.
 */
function getEditedDate(defaultDate) {
    const dateInput = document.getElementById('taskCardEDate').value;
    return dateInput !== '' ? dateInput : defaultDate;
}
/**
 * Closes the task card, hides the task card slide, and navigates back to the board page.
 */
function closeTaskCard() {
    let slideAddTask = document.getElementById('taskCard');
    slideAddTask.classList.add('hide-big-task');
    setTimeout(() => {
        document.getElementById('addTask').classList.add("d-none");
    }, 200);
    cleanUpAll()
    setTimeout(() => {
        boardPage();
    }, 200);
}
/**
 * Cleans up temporary data and resets variables related to accounts and tasks.
 */
function cleanUpAll() {
    cleanUpAccountsCheck();
    subtaskTemp = [];
    prioTemp = "";
}
/**
 * Resets the 'checked' property for all accounts in the Join application.
 */
function cleanUpAccountsCheck() {
    for (let i = 0; i < Join.accounts.length; i++) {
        Join.accounts[i].checked = false;
    }
}
/**
 * Toggles the completion status of a subtask associated with a task in the Join application.
 * @param {number} task - The index of the task.
 * @param {number} subtask - The index of the subtask.
 */
async function toggleCheckboxCard(task, subtask) {
    let checkableSubtask = Join.tasks[task]['subTasks'][subtask];
    await toggleDoneSubtask(checkableSubtask)
    if (checkableSubtask.done) {
        checkableSubtask.subTaskUndone();
    } else {
        checkableSubtask.subTaskDone();
    }
    document.getElementById(`cardCheckboxFalse${subtask}`).classList.toggle('d-none');
    document.getElementById(`cardCheckboxTrue${subtask}`).classList.toggle('d-none');
}
/**
 * Displays the contact selection interface in the Join application.
 */
function openSelectContactsFromCard() {
    document.getElementById('showContactsFromCard').classList.add('d-none');
    document.getElementById('closeContactsFromCard').classList.remove('d-none');
}
/**
 * Closes the contact selection interface in the Join application.
 */
function closeSelectContactsFromCard() {
    document.getElementById('showContactsFromCard').classList.remove('d-none');
    document.getElementById('closeContactsFromCard').classList.add('d-none');
}
/**
 * Navigates the browser back to the last visited page in the session history.
 * Uses the 'window.history.back()' method to achieve this.
 */
function backToPage() {
    window.history.back();
}



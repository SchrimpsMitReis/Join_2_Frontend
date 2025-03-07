/**
 * Edits the specified task by updating the task card content and performing related checks.
 * @param {number} x - The index of the task to be edited.
 */
function editTask(x) {
    let task = Join.tasks[x];
    
    saveOldSubtasks(task)

    let taskCard = document.getElementById("taskCard");
    taskCard.innerHTML = task.taskCardEdit(x);
    let AssignedUsers = task.worker;
    let JoinUsers = Join.accounts;
    changeCSSAttribute();
    checkUser(AssignedUsers, JoinUsers);
    checkWorker(task);
    checkSubtask(task);
    renderSubtasks();
    checkPrio(task);
}
/**
 * Checks and sets the 'checked' property for users found in the assigned users list.
 * @param {array} AssignedUsers - The list of assigned users.
 * @param {array} JoinUsers - The list of all users in Join.
 */
function checkUser(AssignedUsers, JoinUsers) {
    for (let Worker of AssignedUsers) {
        let usersFound = JoinUsers.find((benutzer) => benutzer.email === Worker.email);
        if (usersFound) {
            usersFound.checked = true;
        }
    }
}
/**
 * Checks and displays the assigned workers for the specified task in the containerShortName element.
 */
function checkWorker() {
    let containerShortName = document.getElementById('containerShortName');
    containerShortName.innerHTML = '';
    let filtertAccounts = Join.accounts.filter(user => user.checked === true);
    for (let i = 0; i < filtertAccounts.length; i++) {
        let assignedWorker = filtertAccounts[i];
        containerShortName.innerHTML += assignedWorker.accountTag();
    }
}
/**
 * Checks and adds the subtasks of the specified task to the temporary subtask array.
 * @param {object} task - The task object.
 */
function checkSubtask(task) {
    for (let i = 0; i < task.subTasks.length; i++) {
        let oldSubtask = task.subTasks[i];
        subtaskTemp.push(oldSubtask);
    }
}
/**
 * Checks and sets the priority for the specified task, updates the display, and adds event listeners.
 * @param {object} task - The task object.
 */
function checkPrio(task) {
    prioTemp = task.prio;
    taskPrio(task);
    prioTemp = task.prio;
    let urgent = document.getElementById('btnUrgentWhite');
    let medium = document.getElementById('btnMediumWhite');
    let low = document.getElementById('btnLowWhite');
    taskPrioEventlistener(urgent, medium, low);
}
/**
 * Sets the priority for the specified task by programmatically triggering the corresponding button click.
 * @param {object} task - The task object.
 */
function taskPrio(task) {
    if (task.prio === "Urgent") {
        document.getElementById("btnUrgentWhite").click();
    } else if (task.prio === "Low") {
        document.getElementById("btnLowWhite").click();
    } else if (task.prio === "Medium") {
        document.getElementById("btnMediumWhite").click();
    }
}
/**
 * Adds event listeners to priority buttons to update the temporary priority variable.
 * @param {object} urgent - The urgent priority button element.
 * @param {object} medium - The medium priority button element.
 * @param {object} low - The low priority button element.
 */
function taskPrioEventlistener(urgent, medium, low) {
    urgent.addEventListener('click', () => {
        prioTemp = "Urgent";
    })
    low.addEventListener('click', () => {
        prioTemp = "Low";
    })
    medium.addEventListener('click', () => {
        prioTemp = "Medium";
    })
}
/**
 * Changes CSS attributes for various elements to adjust their styling.
 */
function changeCSSAttribute() {
    document.getElementById('selectContacts').classList.add('w-29');
    document.getElementById('hiddenSubtask').classList.add('w-29');
    document.getElementById('prioCategoryContainer').classList.add('w-29');
    document.getElementById('showContactsContainer').classList.add('w-29');
    document.getElementById('showSubtask').classList.add('w-29');
    document.getElementById('assignedToContacts').classList.add('w-29');
    document.getElementById('styleAddTask').style.marginBottom = '0';
    document.getElementById('closeContacts').style.position = 'relative';
    document.getElementById('assignedToContacts').style.padding = '0';
    document.getElementById('assignedToBottom').classList.add('w-29');
}
/**
 * Updates the display for unchecked accounts and sets the 'checked' property to false.
 * @param {number} x - The index of the account.
 */
function assignedCheck(x) {
    document.getElementById(`tinyAccountCardCheckedNone${x}`).classList.remove('d-none');
    document.getElementById(`tinyAccountCardChecked${x}`).classList.add('d-none');
    Join.accounts[x].checked = false;
    renderTaskContacts();
    checkWorker();
}
/**
 * Updates the display for checked accounts and sets the 'checked' property to true.
 * @param {number} x - The index of the account.
 */
function assignedCheckNone(x) {
    document.getElementById(`tinyAccountCardCheckedNone${x}`).classList.add('d-none');
    document.getElementById(`tinyAccountCardChecked${x}`).classList.remove('d-none');
    Join.accounts[x].checked = true;
    renderTaskContacts();
    checkWorker()
}
/**
 * Updates the display for checked accounts without modifying the 'checked' property.
 * @param {number} x - The index of the account.
 */
function showAssignedCheckNone(x) {
    document.getElementById(`tinyAccountCardCheckedNone${x}`).classList.add('d-none');
    document.getElementById(`tinyAccountCardChecked${x}`).classList.remove('d-none');
}
/**
 * Displays the select contacts section and hides the close contacts button.
 */
function addNewContact() {
    document.getElementById('closeContacts').classList.add('d-none');
    document.getElementById('selectContacts').classList.remove('d-none');
}
/**
 * Renders short names for the specified name and index.
 * @param {string} name - The name to render short names for.
 * @param {number} x - The index associated with the name.
 */
function addShortNames(name, x) {
    renderShortNames(name, x);
    assignedCheckNone(x);
}
/**
 * Renders short names in the specified container for the given name and index.
 * @param {string} name - The name to render short names for.
 * @param {number} x - The index associated with the name.
 */
function renderShortNames(name, x) {
    let container = document.getElementById('containerShortName');
    container.innerHTML += JoinBoard.generateHTMLRenderShortNames(name, x);
}
/**
 * Filters contact names based on the search input and updates the displayed contact list.
 */
function filterContactNames() {
    let search = document.getElementById('searchContacts').value;
    search = search.toLowerCase();

    let list = document.getElementById('taskContactList');
    list.innerHTML = '';

    for (let p = 0; p < Join.accounts.length; p++) {
        let name = Join.accounts[p]['name'];

        if (name.toLowerCase().includes(search)) {
            list.innerHTML += Join.accounts[p].tinyCardCheck(p);
        }
    }
}
/**
 * Enables editing for a subtask with the specified index and updates subtaskTemp on Enter key press.
 * 
 * @param {number} m - The index of the subtask to be edited.
 */
function editSubtask(m) {
    let editableTask = document.getElementById(`todoSubtask${m}`)
    editableTask.setAttribute('contenteditable', true)
    editableTask.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            if (editableTask.value != "")
                subtaskTemp[m] = editableTask.textContent;
            editableTask.setAttribute('contenteditable', false)
            renderSubtasks()
        }
    })
}
/**
 * Renders contacts for tasks by updating the HTML content of 'contactsList' based on Join.accounts.
 */
function renderContactsTasks() {
    let contactsList = document.getElementById('contactsList')
    for (let i = 0; i < Join.accounts.length; i++) {
        let account = Join.accounts[i];
        contactsList.innerHTML += account.tinyCard(i)
    }
}
/**
 * Opens a task by updating the content and visibility of the 'addTask' element with the task card for the specified index.
 * 
 * @param {number} x - The index of the task to be opened.
 */
function openTask(x) {
    if (isMoving) {
        return;
    }
    let task = Join.tasks[x];
    let addTask = document.getElementById("addTask");
    addTask.classList.remove("d-none")
    addTask.innerHTML = task.taskCardNormal(x);
}

function saveOldSubtasks(task){
    for (subtask of task.subTasks){
        subtaskIDsTemp.push(subtask.id)
    }
    
}

/**
 * Constant for the storage token.
 * @constant {string}
 */
const STORAGE_TOKEN = "SSLOEY6VSHKBCAMT1R3MQGZLOIZ7TTBF66BZZQUS";

/**
 * Constant for the storage URL.
 * @constant {string}
 */
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * Constant for the backend URL to save accounts.
 * @constant {string}
 */
const MY_BACKEND_ACC = 'http://roman-schroeder.developerakademie.net/Join/php/saveAccounts.php';

/**
 * Constant for the backend URL to save tasks.
 * @constant {string}
 */
const MY_BACKEND_TAS = 'http://roman-schroeder.developerakademie.net/Join/php/saveTasks.php';

/**
 * Key for storing accounts in local storage.
 * @constant {string}
 */
const accountsKey = 'joinAccounts';

const contactsURL = 'http://127.0.0.1:8000/api/contacts/'
const tasksURL = 'http://127.0.0.1:8000/api/tasks/'
const subtaskURL = 'http://127.0.0.1:8000/api/subtasks/'
const accountsURL = 'http://127.0.0.1:8000/api/accounts/'
const loginURL = 'http://127.0.0.1:8000/api/login/'
const summeryURL = 'http://127.0.0.1:8000/api/summery/'

/**
 * Key for storing tasks in local storage.
 * @constant {string}
 */
const tasksKey = 'joinTask';

/**
 * Asynchronously saves accounts data to local storage.
 * @async
 * @function
 */
async function saveAccount(contact) {
    let contactJSON = JSON.stringify(contact)

    return await fetch(contactsURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: contactJSON
    })
}
/**
 * Asynchronously saves tasks to local storage.
 * @async
 * @function
 */
async function saveTasks() {
    const tasks = Join.tasks;
    try {
        await setItem(tasksKey, tasks)
    } catch (e) {
        console.error(e);
    }
    return null
}
/**
 * Asynchronously loads accounts from local storage.
 * @async
 * @function
 */
async function loadAccounts() {
    try {
        let response = await fetch(contactsURL);

        if (!response.ok) { // Falls HTTP-Fehler auftritt
            throw new Error(`HTTP-Error! Status: ${response.status}`);
        }
        let responseAsJson = await response.json();
        let loadedAccounts = decodeAccounts(responseAsJson)
        Join.accounts = loadedAccounts.sort((a, b) => a.name.localeCompare(b.name))
    } catch (error) {
        console.error("Fehler beim Abrufen der Accounts:", error);
    }

}
/**
 * Asynchronously loads tasks from local storage.
 * @async
 * @function
 * @returns {null}
 */
async function loadTasks() {
    let responseAsJson = await fetch(tasksURL)

    let parsedResponse = await responseAsJson.json()
    let loadedTasks = decodeTasks(parsedResponse)
    Join.tasks = loadedTasks;
    return null
}
/**
 * Decodes a JSON representation of tasks and creates an array of Task objects.
 * @function
 * @param {Object} responseAsJson - JSON representation of tasks.
 * @returns {Array} - An array of Task objects.
 */
/**
 * Decodes a JSON representation of accounts and creates an array of Account or Contact objects.
 * @function
 * @param {Object} responseAsJson - JSON representation of accounts.
 * @returns {Array} - An array of Account or Contact objects.
 */
function decodeTasks(responseAsJson) {

    return responseAsJson.map(taskData => {
        let {
            id,
            title,
            category,
            date,
            description,
            todo,
            done,
            feedback,
            prio,
            progress,
            subtasks: rawSubTasks,
            worker: rawWorkers
        } = taskData;
        const subTasks = (rawSubTasks || []).map(subtask => new Subtask(subtask.id, subtask.text, subtask.done));
        const workers = (rawWorkers || []).map(worker => new Contact(worker.id, worker.name, worker.email, worker.tel));
        return new Task(id, title, workers, description, date, prio, category, subTasks, todo, progress, feedback, done);
    });
}
/**
 * Processes a list of account data in JSON format and creates a list of account or contact objects.
 * 
 * @param {Array} responseAsJson - A list of account data in JSON format. Each element in this list
 *                                 is an object with properties name, email, tel, and an optional password.
 *
 * @returns {Array} A list of account or contact objects. For each element in the input list:
 *                   - If a password is present, an Account object is created.
 *                   - If no password is present, a Contact object is created.
 */
function decodeAccounts(responseAsJson) {
    return responseAsJson.map(accountData => {
        const { id, name, email, tel, password } = accountData;

        if (password) {
            return new Account(name, email, tel, password);
        } else {
            return new Contact(id, name, email, tel);
        }
    });
}
/**
 * Saves a signed user's data to the local storage.
 * 
 * @param {object} Join.signedAccount - The signed user's account data to be saved.
 */
function saveSignedUser() {
    let payloadSignedUser = JSON.stringify(Join.signedAccount);
    localStorage.setItem("signedAccount", payloadSignedUser);
}
/**
 * Loads the signed user's data from local storage and returns the corresponding account object.
 * 
 * @returns {object|null} The signed user's account object, or null if no signed user data is found.
 */
function loadSignedUser() {
    let SignedUserAsJSON = JSON.parse(localStorage.getItem("signedAccount"))
    if (SignedUserAsJSON !== null) {
        let name = SignedUserAsJSON['name'];
        let account = Join.accounts.filter(a => a.name === name);
        if (account.length === 0 && name === 'Guest') {
            account = new Account("Guest", "email@join.de", "");

        } else if (account.length > 0) {
            account = account[0]
        } else {
            account = null;
        }
        return account
    }
    return null;
}
/**
 * Deletes the signed user's data from local storage.
 */
function deleteSignedUser() {
    localStorage.removeItem('signedAccount');
}

// Contacts
async function deleteContactNB(id) {
    let delUrl = contactsURL + id + "/"
    return await fetch(delUrl, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })

}

async function updateContact(id, json) {

    let updateUrl = contactsURL + id + "/"
    return fetch(updateUrl, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
    })
}
// Tasks
async function postTask(taskObject) {
    let json = JSON.stringify(taskObject)

    return await fetch(tasksURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: json
    })

}
async function deleteTask(index) {
    let taskId = Join.tasks[index].id
    await deleteSubtasks(index)
    await fetch(tasksURL + taskId + "/", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: null
    }).then(
        boardPage()
    )
}
async function patchChanges(taskToPatch) {
    const taskToPatchAsJSON = JSON.stringify(taskToPatch)
    return await fetch(tasksURL + taskToPatch.id + "/", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: taskToPatchAsJSON
    })
}
async function patchTask(taskIndex) {
    taskToPatch = Join.tasks[taskIndex]
    taskToPatch.subtask_ids = subtaskIDsTemp
    taskToPatchAsJson = JSON.stringify(taskToPatch)
    return await fetch(tasksURL + taskToPatch.id + "/", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: taskToPatchAsJson
    }).then(
        subtaskIDsTemp = []
    )
}

// Subtasks
async function saveAllSubtask() {
    subtaskIds = []
    for (subtask of subtaskTemp) {
        if (!subtask.id) {
            subtaskId.push(await createASubtask(subtask.text))
        }
        else {
            await patchASubtask()
        }
    }
    return subtaskIds
}


async function createASubtask(text) {
    let json = {
        "text": text,
        "done": false
    }

    return await fetch(subtaskURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
    })

}

async function deleteSubtasks(index) {
    subtasksIdsToDelete = Join.tasks[index].subTasks;
    if (subtasksIdsToDelete.length > 0) {
        await Promise.all(subtasksIdsToDelete.map(subTa => deleteASubtask(subTa.id)));
    }
}

async function deleteASubtask(id) {
    return await fetch(subtaskURL + id + "/", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })
}

async function patchASubtask(json, id) {

    return await fetch(subtaskURL + id + "/", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: json
    })
}

async function toggleDoneSubtask(subtask) {
    id = subtask.id
    updateJson = ""
    if (subtask.done) {
        updateJson = { "done": false }
    } else {
        updateJson = { "done": true }
    }
    return await fetch(subtaskURL + id + "/", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateJson)
    })

}
async function allSubtasksToJson() {
    let subtasksOfTask = []
    for (subtaskId of subtaskIDsTemp) {
        subtasksOfTask.push(await getSubtasks(subtaskId))
    }
    return subtasksOfTask
}

async function getSubtasks(id) {
    let response = await fetch(subtaskURL + id + "/")
    let responseAsJson = await response.json()
    return responseAsJson
}

// Accounts

async function newAccountPost(account) {
    let accountAsJson = JSON.stringify(account)
    console.log(accountAsJson);
    
    return await fetch(accountsURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: accountAsJson
    })

}

async function loginRequest(password, email){
    let json = {
        "email": email,
        "password": password
    }
    return await fetch(loginURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
    })
}

// Load Summery

async function getSummeryData(){
    let data = await fetch(summeryURL)
    let dataAsJson = await data.json()
    return dataAsJson
}
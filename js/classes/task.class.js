class Task {
    constructor(id = undefined, title, worker, desc, date, prio = "Wichtig",
        Category, subTasks, todo = false, progress = false, feedback = false, done = false) {
        this.id = id
        this.title = title;
        this.worker = worker;
        this.desc = desc;
        this.date = date;
        this.prio = prio;
        this.Category = Category;
        this.subTasks = subTasks;
        this.todo = todo;
        this.progress = progress;
        this.feedback = feedback;
        this.done = done;
    }

    setCategoryColor() {
        let html = "";
        if (this.Category === 'Technical Task') {
            html = /*html*/ `<div class="tiny-task-category color-technical">${this.Category}</div>`
        } else {
            html = /*html*/ `<div class="tiny-task-category color-userStory">${this.Category}</div>`
        }

        return html;
    };
    taskCardNormal(x) {
        let formatedDate = () => {
            let date = this.date ? new Date(this.date) : new Date();            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            let formatedDate = `${day}/${month}/${year}`;
            return formatedDate;
        };
        let formatedPrio = () => {
            let iconSrc;
            if (this.prio === "Urgent") {
                iconSrc = "./IMG/Property 1=urgent.svg"
            } else if (this.prio === "Medium") {
                iconSrc = "./IMG/Property 1=medium.svg"
            } else {
                iconSrc = "./IMG/Property 1=low.svg"
            }
            return iconSrc;
        }
        let renderWorker = () => {
            let htmlSnippet = "";
            for (let i = 0; i < this.worker.length; i++) {
                const worker = this.worker[i];
                htmlSnippet += worker.tinyCard()
            }
            return htmlSnippet;
        }
        let renderSubtasks = () => {
            let htmlSnippet = "";
            for (let j = 0; j < this.subTasks.length; j++) {
                const subTask = this.subTasks[j];
                if (subTask.done) {
                    htmlSnippet += /*html*/ `
                            <div class="subtask-list">
                                <div id="cardCheckboxFalse${j}" class="style-subtask-checkbox d-none" >
                                    <div class="style-checkbox-displayflex">
                                        <div onclick="toggleCheckboxCard(${x},${j})"  class="check-box-task"> <img class="checkbox-img-taskCard" src="./IMG/check_empty.svg" alt=""></div>
                                        <div class="subtask-text">${subTask.text}</div>
                                    </div>
                                </div>
                                <div id="cardCheckboxTrue${j}" class="style-subtask-checkbox">
                                    <div class="style-checkbox-displayflex">
                                        <div onclick="toggleCheckboxCard(${x},${j})"  class="check-box-task"> <img class="checkbox-img-taskCard-check" src="./IMG/checkbox_check.svg" alt=""></div>
                                        <div class="subtask-text">${subTask.text}</div>
                                    </div>
                                </div>
                            </div>
                    `;
                } else {
                    htmlSnippet += /*html*/ `
                            <div class="subtask-list">
                                <div id="cardCheckboxFalse${j}" class="style-subtask-checkbox">
                                <div class="style-checkbox-displayflex">
                                    <div onclick="toggleCheckboxCard(${x},${j})"  class="check-box-task"> <img class="checkbox-img-taskCard" src="./IMG/check_empty.svg" alt=""></div>
                                    <div class="subtask-text">${subTask.text}</div>
                                </div>
                                </div>
                                <div id="cardCheckboxTrue${j}" class="style-subtask-checkbox d-none" >
                                <div class="style-checkbox-displayflex">
                                        <div onclick="toggleCheckboxCard(${x},${j})"  class="check-box-task"> <img class="checkbox-img-taskCard-check" src="./IMG/checkbox_check.svg" alt=""></div>
                                        <div class="subtask-text">${subTask.text}</div>
                                </div>
                                </div>
                            </div>
                    `;
                }
            }
            return htmlSnippet;
        }
        return /*html*/ `
        <div class="bg-task">
            <div id="taskCard" class="taskCard">
                <div class="taskCardHeader">
            	    ${this.setCategoryColor()}
                    <div onclick="closeTaskCard()">
                        <svg class="style-closebutton" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <mask id="mask0_87491_5574" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                            <rect width="24" height="24" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_87491_5574)">
                            <path d="M12 13.4L7.1 18.3C6.91667 18.4834 6.68333 18.575 6.4 18.575C6.11667 18.575 5.88333 18.4834 5.7 18.3C5.51667 18.1167 5.425 17.8834 5.425 17.6C5.425 17.3167 5.51667 17.0834 5.7 16.9L10.6 12L5.7 7.10005C5.51667 6.91672 5.425 6.68338 5.425 6.40005C5.425 6.11672 5.51667 5.88338 5.7 5.70005C5.88333 5.51672 6.11667 5.42505 6.4 5.42505C6.68333 5.42505 6.91667 5.51672 7.1 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z" fill="#2A3647"/>
                            </g>
                        </svg>
                    </div>
                </div>
                
                <h1>${this.title}</h1>
                <p>${this.desc}</p>
                <div class="taskCard-date-prio">
                    <div class="taskCardAttribute">
                        <p>Due date: </p>
                        <p>${formatedDate()}</p>
                    </div>

                    <div class="taskCardAttribute">
                        <p>Priority: </p>
                        <img src="${formatedPrio()}">
                    </div>
                </div>
                <div class="taskCardAssignment">
                    <p>Assigned to: </p>
                    <div id="taskCardAssinedList">
                        ${renderWorker()}
                    </div>
                
                </div >

                <div class="taskCardSubtasks">
                    <p>Subtasks</p>
                    ${renderSubtasks()}
                </div>

                <div class="taskCardFooter">
                    <div class="deleteBtn" onclick="deleteTask(${x})"></div>
                    <div class="editBtn" onclick="editTask(${x})"></div>
                </div>
            </div>
        </div>
        `
    }
    taskCardEdit(x) {
        let getDate = ()=>{
            let date = new Date()
            let formattedDate = date.toISOString().split('T')[0];
            return formattedDate
        }

        return /*html*/ `  
        <div class="editTaskCard">   
            <div class="taskCardHeader" >
                <div></div>
                <div onclick="closeTaskCard()">
                    <svg class="close-button-card cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <mask id="mask0_87491_5574" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                            <rect width="24" height="24" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_87491_5574)">
                            <path d="M12 13.4L7.1 18.3C6.91667 18.4834 6.68333 18.575 6.4 18.575C6.11667 18.575 5.88333 18.4834 5.7 18.3C5.51667 18.1167 5.425 17.8834 5.425 17.6C5.425 17.3167 5.51667 17.0834 5.7 16.9L10.6 12L5.7 7.10005C5.51667 6.91672 5.425 6.68338 5.425 6.40005C5.425 6.11672 5.51667 5.88338 5.7 5.70005C5.88333 5.51672 6.11667 5.42505 6.4 5.42505C6.68333 5.42505 6.91667 5.51672 7.1 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z" fill="#2A3647"/>
                            </g>
                        </svg>
                    </div>
            </div>
            <div class="editTask" >
                <div class="style-task">
                    <label for="taskCardETitle">Titel:</label>
                    <input type="text" id="taskCardETitle" value="${this.title}">

                    <label for="taskCardEDesc">Description:</label>
                    <textarea class="blue textarea-resize" cols="30" rows="10" id="taskCardEDesc">${this.desc}</textarea>

                    <label for="taskCardEDate">Date Due:</label>
                    <input type="date" min="${getDate()}" id="taskCardEDate">

                    ${JoinBoard.generateHTMLAssignedTo(x)}
                    ${JoinBoard.generateHTMLAddContactShortName(x)}
                    <div>
                        ${JoinBoard.generateHTMLPrioCategory()}
                    </div>
                    ${JoinBoard.generateHTMLSubtask()}
                    
                </div>
                <div class="ok-button-container">
                    <button class="btn-dark-blue" onclick="taskSaveChanges(${x})">Ok &checkmark;</button>
                </div>
            </div>
        </div>
            `
    }
    tinyTaskCard(x = 0) {


        let contactTags = () => {
            let rendertContacts = "";

            for (let i = 0; i < this.worker.length; i++) {
                let worker = this.worker[i];
                rendertContacts += worker.accountTag();
            }
            return rendertContacts;
        }
        let prioTag = () => {
            let prioUrl;
            if (this.prio == "Urgent") {
                prioUrl = "./IMG/prioUrgentIcon.png"
            } else if (this.prio == "Medium") {
                prioUrl = "./IMG/prioMediumIcon.png"
            } else {
                prioUrl = "./IMG/prioLowIcon.png"
            }
            return prioUrl;
        }
        let subtaskArea = () => {
            if (this.subTasks.length !== 0) {
                return /*html*/ `
                <div class="subtasks" id="tinyTaskCardSubtaskSection${x}">
                    <div class="tiny-task-label">
                        <div class="progressContainer" id="progressContainer">
                            <div class="progressBar" id="progressBar${x}"></div>
                        </div>
                        <p>${SubtasksDone()}/${this.subTasks.length}&nbsp;Subtasks</p>
                    </div>
                </div>

                `
            } else {
                return "";
            }
        }
        let SubtasksDone = () => {
            let countDone = 0;
            for (let i = 0; i < this.subTasks.length; i++) {
                const toCheck = this.subTasks[i];
                if (toCheck.done) {
                    countDone++;
                }
            }
            return countDone;
        }
        let saveDesc = () =>{
            let getDesc = this.desc || "Keine Beschreibung";
            return getDesc.substring(0, 50)    
        }

        return /*html*/ `
            <div id="tinyTaskCard${x}" onclick="openTask(${x})" class="tinyTaskCard" draggable="true"  ondragstart="startDragging(${this.id})"  ontouchstart="startTouching('toDo', ${x}, event);" ontouchmove="moveTouching(event);" ontouchend="endTouching(event);" >
            	${this.setCategoryColor()}
                <div class="tiny-title">
                    <h1>${this.title}</h1>
                    <span class="tinyTaskCardDescription">${saveDesc()}</span>
                </div>
                ${subtaskArea()}
                <div class="contactsAndPrio">
                    <div id="tinyCardShortNames" class="tinyTaskCardContacts">${contactTags()}</div>
                    <img src="${prioTag()}" class="prioIcon" alt="">
                </div>
            </div>
        `
    }
    updateProgressBar(x) {
        let progressContainer = document.getElementById(`tinyTaskCardSubtaskSection${x}`)
        if (progressContainer) {
            let gesamtFortschritt;
            let variable1 = this.subTasks.length;
            let variable2 = () => {
                let countDone = 0;
                for (let i = 0; i < this.subTasks.length; i++) {
                    const toCheck = this.subTasks[i];
                    if (toCheck.done) {
                        countDone++;
                    }
                }
                return countDone;
            }
            if (variable1 == 0) {
                progressContainer.classList.add('d-none')
                variable1 = null
                variable2 = null;
            } else if (variable1 > 0) {
                gesamtFortschritt = (variable2() / variable1) * 100;
                let progressbar = document.getElementById(`progressBar${x}`);
                progressbar.style.width = `${gesamtFortschritt}%`;
            }
        }
    }
    editTask() {
        let taskCard = document.getElementById('taskCard')
        taskCard.innerHTML = this.taskCardEdit()
        taskCard.classList.add('d-none');
    }
    switchStatus(x = 0) {
        if (x == "1") {
            this.todo = false;
            this.progress = true;
            this.feedback = false;
            this.done = false;
        } else if (x == "2") {
            this.todo = false;
            this.progress = false;
            this.feedback = true;
            this.done = false;
        } else if (x == "3") {
            this.todo = false;
            this.progress = false;
            this.feedback = false;
            this.done = true;
        } else {
            this.todo = true;
            this.progress = false;
            this.feedback = false;
            this.done = false;
        }
    }
}
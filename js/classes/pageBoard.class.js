class Board extends Page {
    renderAddTask(x) {
        let addTask = document.getElementById('addTask');
        addTask.innerHTML = '';
        addTask.classList.remove("d-none")
        addTask.innerHTML += this.generateHTMLaddTask(x);

        const urgent = document.getElementById('btnUrgentWhite');
        const medium = document.getElementById('btnMediumWhite');
        const low = document.getElementById('btnLowWhite');
        
        urgent.addEventListener('click', () => {
            prioTemp = "Urgent";
        })
        medium.addEventListener('click', () => {
            prioTemp = "Medium";
        })
        low.addEventListener('click', () => {
            prioTemp = "Low";
        })
    }
    KAMBAN_IDS = {
        TODO: 'kambanTodo',
        INPROGRESS: 'kambanInprogress',
        FEEDBACK: 'kambanFeedback',
        DONE: 'kambanDone',
    };
    async renderTask() {
      try {
        await loadTasks();
      } catch (e) {
        console.error("Fehler", e);
      }
    
      this.clearKambanContent();
      this.renderTasksByStatus();
      checkDragArea();
    }
    clearKambanContent() {
      for (const id of Object.values(this.KAMBAN_IDS)) {
        const kambanElement = document.getElementById(id);
        if (kambanElement) {
          kambanElement.innerHTML = "";
        }
      }
    }
    renderTasksByStatus() {
      if (Join.tasks.length > 0) {
        for (let i = 0; i < Join.tasks.length; i++) {
          const task = Join.tasks[i];
          const kambanElement = this.getKambanElement(task);
          if (kambanElement) {
            kambanElement.innerHTML += task.tinyTaskCard(i);
          }
    
          if (task.subTasks) {
            task.updateProgressBar(i);
          }
        }
      }
    }
    getKambanElement(task) {
      if (task.todo) return document.getElementById(this.KAMBAN_IDS.TODO);
      if (task.progress) return document.getElementById(this.KAMBAN_IDS.INPROGRESS);
      if (task.feedback) return document.getElementById(this.KAMBAN_IDS.FEEDBACK);
      if (task.done) return document.getElementById(this.KAMBAN_IDS.DONE);
    
      task.todo = true;
      task.feedback = false;
      task.progress = false;
      task.done = false;
      this.renderTask();
      return null;
    }  
    closeAddTask() {
        slideAddTask = document.getElementById('slideAddTask').classList.remove('show-bg-task');
    }
    boardContent() {
        return /*html*/ `
         <div class="res-content-board">
            <div class="frame-192">
                    <div class="mobile-res-board">
                        <h2>
                            Board
                        </h2>
                        <button onclick="openAddTask(0)" class="mobile-res-button-add-task btn-dark-blue">
                            <img src="./IMG/Capa-1.png" alt="add task">
                        </button>
                    </div>
                <div class="frame-123">
                    <div class="input-search">
                        <input type="search" name="find task"  onfocus="this.value=''" id="searchTask" placeholder="Find Task" onkeydown="filterTaskNames()">
                        <img class="separator-find-task" src="./IMG/assets/Vector 3.png" alt="separator searchfield">
                        <div class="search-icon">
                            <img src="./IMG/assets/search.png" alt="search Image">
                        </div>
                    </div>
                    <button onclick="openAddTask(0)" class="button-add-task display-none">
                        <p>Add task</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <mask id="mask0_87727_3931" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
                              <rect width="32" height="32" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_87727_3931)">
                              <path d="M14.666 17.3327H6.66602V14.666H14.666V6.66602H17.3327V14.666H25.3327V17.3327H17.3327V25.3327H14.666V17.3327Z" fill="white"/>
                            </g>
                          </svg>
                    </button>
                    <button onclick="openAddTask(0)" class="res-button-add-task btn-dark-blue">
                        <img id="addTaskImageRes" src="./IMG/Capa-1.png" alt="add task">
                    </button>
                </div>
            </div>

    <!----------------------------- ACTION BAR - BOARD ----------------------------------->
    
    <div class="frame-136">
        <div  class="board-actionbar"> 
            <div class="lanes">
                <p>To do</p>
                <div class="border-plus" onclick="openAddTask(0)">
                    <svg class="hover-svg" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path  d="M5.6665 1.5V9.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                    <path d="M9.6665 5.57544L1.6665 5.57544" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
            </div>
            
           
            <div id="ondropTodo" ondrop="moveTo('Todo'); removeHighlight('ondropTodo'); checkDragArea()" ondragleave="removeHighlight('ondropTodo'); checkDragArea()" ondragover="allowDrop(event); highlight('ondropTodo')" class="drag-area">
                <div class="empty-tasks" id="emptyTaskTodo">
                    <p>No tasks To do</p>
                </div>
                <div  class="canban-style" id="kambanTodo"></div>
            </div>
        </div>
        <div  class="board-actionbar">
            <div class="lanes">
                <p>In progress</p>
                <div class="border-plus" onclick="openAddTask(1)">
                    <svg class="hover-svg" xmlns="http://www.w3.org/2000/svg"  width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M5.6665 1.5V9.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                    <path d="M9.6665 5.57544L1.6665 5.57544" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
            </div>

            
            <div id="ondropProgress" ondrop="moveTo('Inprogress'); removeHighlight('ondropProgress'); checkDragArea()" ondragleave="removeHighlight('ondropProgress'); checkDragArea()" ondragover="allowDrop(event); highlight('ondropProgress')" class="drag-area">
                <div class="empty-tasks" id="emptyTaskInprogress">
                    <p>No tasks In progress</p>
                </div>
                <div class="canban-style" id="kambanInprogress"></div>
            </div>
        </div>
        <div  class="board-actionbar">
            <div class="lanes">
                <p>Await feedback</p>
                <div class="border-plus" onclick="openAddTask(2)">
                    <svg class="hover-svg" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M5.6665 1.5V9.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                    <path d="M9.6665 5.57544L1.6665 5.57544" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
            </div>

            
            <div id="ondropFeedback" ondrop="moveTo('Awaitfeedback'); removeHighlight('ondropFeedback'); checkDragArea()" ondragleave="removeHighlight('ondropFeedback'); checkDragArea()" ondragover="allowDrop(event); highlight('ondropFeedback')" class="drag-area">
                <div class="empty-tasks" id="emptyTaskFeedback">
                    <p>No tasks Await feedback</p>
                </div>
                <div  class="canban-style" id="kambanFeedback"></div>
            </div>
        </div>
        <div class="board-actionbar">
            <div class="lanes">
                <p>Done</p>
            </div>
            
            <div id="ondropDone" ondrop="moveTo('Done'); removeHighlight('ondropDone'); checkDragArea()" ondragleave="removeHighlight('ondropDone'); checkDragArea()" ondragover="allowDrop(event); highlight('ondropDone')" class="drag-area">
            <div class="empty-tasks" id="emptyTaskDone">
                    <p>No tasks Done</p>
                </div>
                <div  class="canban-style" id="kambanDone" ></div>
            </div>
        </div>
    </div>
    </div>

            <!----------------------------- RENDER ACTION BAR - BOARD ----------------------------------->

            <div id="renderActionBar"></div>

            <!----------------------------- RENDER ADD TASK ----------------------------------->

            <div id="addTask" class="popUpTaskCard d-none">

            </div>
            <div>
                <div class="overlay-success" id="overlaySuccessTask"></div>
            </div>


                    `
    }
    generateHtmlSuccessInfoTask() {
        return /*html*/ `
            <div class="successInfoContainer">
                <h3 class="font-size-normal mg-none">Task succesfully created</h3>
            </div>
        `
    }
    renderAddSubtask() {
        let addSubTask = document.getElementById('addSubtask');
        for (let m = 0; m < Join.tasks.length; m++) {
            const subtasksFromBoard = Join.tasks[m];
            addSubTask.innerHTML += subtasksFromBoard.generateHTMLAddSubtask()
        }
    }
    generateHTMLaddTask(x) {
        return /*html*/ `
            <div id="slideAddTask" class="bg-task">
                <form id="formAddtask" class="add-task-card" onsubmit="createTaskFromBoard(${x}); return false">
                    <div class="headline-add-task">
                        <h3>Add Task</h3>
                        ${this.generateHTMLCloseButtonInSVG()}
                    </div>
                    <div class="board-task-middle">
                        ${this.generateHTMLLeftSide(x)}
                        ${this.generateHTMLSeperator()}
                        ${this.generateHTMLRightSide(x)}
                    </div>
                    <div class="board-task-footer">
                        <div class="field-required-text">
                            <sub>*</sub><span>This field is required</span>
                        </div>
                        ${this.generateHTMLAddTaskButtons(x)}
                    </div>
                </form>
            </div>
          `
    }
    generateHTMLaddTaskWindowForm(x) {
        return /*html*/ `
            <form id="formAddtask" class="add-task" onsubmit="createTaskPage(); return false">
                ${this.generateHTMLaddTaskWindow(x)}
            </form>
            <div class="overlay-success" id="overlaySuccessTask"></div>`
    }
    generateHTMLaddTaskWindow(x) {
        return /*html*/ `
           <div class="content-add-task">
                    <div class="content-headline-add-task">
                        <h3>Add Task</h3>
                    </div>
                    <div class="board-task-middle">
                        <div class="left">
                            ${this.generateHTMLLeftSide(x)}
                            <div class="field-required-text field-required-text-window responsive maxWidth">
                                <sub>*</sub><span>This field is required</span>
                            </div>
                        </div>
                        ${this.generateHTMLSeperator()}
                        <div class="right">
                            ${this.generateHTMLRightSide(x)}
                            <div class="responsive">
                                ${this.generateHTMLAddTaskButtons(x)}
                            </div>
                        </div>
                    </div>
                    <div class="board-task-footer responsiveMin">
                        <div class="field-required-text">
                            <sub>*</sub><span>This field is required</span>
                        </div>
                        ${this.generateHTMLAddTaskButtons(x)}
                    </div>
            </div>
          `
    }
    generateHTMLLeftSide(x) {
        return /*html*/ `
              <div class="left-side">
                ${this.generateHTMLTitle()}
                ${this.generateHTMLDescription()}
                ${this.generateHTMLAssignedTo(x)}
                ${this.generateHTMLAddContactShortName()}                        
              </div>
          `
    }
    generateHTMLAddTaskHeadline() {
        return /*html*/ `
            <h1 class="add-task-headline">Add Task</h1>`
    }
    generateHTMLTitle() {
        return /*html*/ `
                <div class="input-title board-task-input">
                    <label for="pflichtfeld">Title<sup>*</sup></label>
                    <input class="blue" type="text" id="boardTaskTitle" name="" required  placeholder="Enter a title">
                </div>
        `
    }
    generateHTMLDescription() {
        return /*html*/ `
                <div class="input-description">
                    <p>Description</p>
                    <textarea class="blue textarea-resize" name="" id="boardTaskDescription" cols="30" rows="10" placeholder="Enter a Description"></textarea>
                </div>
                
        `
    }
    generateHTMLAssignedTo(x) {
        return /*html*/ `
            <p class="assigned-style">Assigned to</p>
            <div id="styleAddTask" class="board-task-input bg-color-white">
                ${this.generateHTMLSelectContactsToogleFunction()}
                <div id="closeContacts" class="open-assign-container  d-none">
                    <div id="showContactsContainer" class="assign-container assign-container-style bg-color-white">
                        <input id="searchContacts" type="search" onkeyup="filterContactNames(${x})">
                        <img onclick="toggleContactsAssign()" src="./IMG/assets/arrow_dropdown.png" alt="">
                    </div>
                    <div id="assignedToContacts" class="checkbox-container">
                        ${this.generateHTMLCheckbox()} 
                    </div>
                    <div id="assignedToBottom" class="checkbox-container-button">
                        ${this.generateHTMLAddToContactButton(x)}
                    </div>
                </div>
            </div>
        `
    }
    generateHTMLSelectContactsToogleFunction() {
        return /*html*/ `
                    <div id="selectContacts" class="assign-container">
                      <input onclick="toggleContactsAssign()" type="button" value="Select contacts to assign" id="">
                      <img onclick="toggleContactsAssign()" src="./IMG/assets/arrow_drop_downaa.png" alt="">
                    </div>
        `
    }
    generateHTMLCheckbox() {
        return /*html*/ `
            <div id="taskContactList"></div>
            `
    }
    generateHTMLAddToContactButton() {
        return /*html*/ `
            <div class="add-new-contact"></div>
        `
    }
    generateHTMLAddContactShortName() {
        return /*html*/ `
            <div id="containerShortName"></div>
        `
    }
    generateHTMLRenderShortNames(shortNames, x) {
        return /*html*/ `
            <div id="editShortNames${x}" class="initials-logo" style="background-color: ${Join.accounts[x].color}">${shortNames}</div>
        `
    }
    generateHTMLSeperator() {
        return /*html*/ `
            <div class="seperator-add-task">
                <svg xmlns="http://www.w3.org/2000/svg" width="2" height="426" viewBox="0 0 2 426" fill="none">
                    <path d="M1.24805 1L1.24854 425" stroke="#D1D1D1" stroke-linecap="round"/>
                </svg>
            </div>
        `
    }
    generateHTMLRightSide() {
        return /*html*/ `
            <div class="right-side">
                ${this.generateHTMLDateForm()}
                ${this.generateHTMLPrioCategory()}
                ${this.generateHTMLCategory()}
                ${this.generateHTMLSubtask()}
            </div>
          `
    }
    generateHTMLInfoRequired() {
        return /*html*/ `
            <div class="addTask-info-required">   
                <sup class="info-required">*</sup><span>This field is required</span>
            </div>
        `
    }
    generateHTMLDateForm() {
        let getDate = ()=>{
            let date = new Date()
            let formattedDate = date.toISOString().split('T')[0];
            return formattedDate
        }
        return /*html*/ `
                <div class="input-date board-task-input">
                    <label for="pflichtfeld">Due date<sup>*</sup></label>
                    <div class="board-input-date">
                        <input type="date" id="date" name="datum" min="${getDate()}" required placeholder="dd-MM-yyyy">
                    </div>
                </div>
            `
    }
    generateHTMLPrioCategory() {
        return /*html*/ `
                  <div class="prio-category">
                    <p>Prio</p>
                    <div id="prioCategoryContainer" class="prio-category-container">
                      ${this.generateHTMLUrgent()}
                      ${this.generateHTMLMedium()}
                      ${this.generateHTMLPrio()}
                    </div>
                  </div>
          `
    }
    generateHTMLUrgent() {
        return /*html*/ `
        <button id="btnUrgentWhite" type="button" onclick="btnTaskPrio('btnUrgentWhite')" class="category-button category-button-standard">
          <p>Urgent</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
            <g clip-path="url(#clip0_88061_5027)">
              <path d="M19.6527 15.2547C19.418 15.2551 19.1895 15.1803 19.0006 15.0412L10.7486 8.958L2.4965 15.0412C2.38065 15.1267 2.24907 15.1887 2.10927 15.2234C1.96947 15.2582 1.82419 15.2651 1.68172 15.2437C1.53925 15.2223 1.40239 15.1732 1.27894 15.099C1.1555 15.0247 1.04789 14.927 0.962258 14.8112C0.876629 14.6954 0.814657 14.5639 0.77988 14.4243C0.745104 14.2846 0.738203 14.1394 0.759574 13.997C0.802733 13.7095 0.958423 13.4509 1.19239 13.2781L10.0965 6.70761C10.2852 6.56802 10.5138 6.49268 10.7486 6.49268C10.9833 6.49268 11.2119 6.56802 11.4006 6.70761L20.3047 13.2781C20.4906 13.415 20.6285 13.6071 20.6987 13.827C20.7688 14.0469 20.7677 14.2833 20.6954 14.5025C20.6231 14.7216 20.4833 14.9124 20.296 15.0475C20.1088 15.1826 19.8836 15.2551 19.6527 15.2547Z" fill="#FF3D00"/>
              <path d="M19.6527 9.50568C19.4181 9.50609 19.1895 9.43124 19.0006 9.29214L10.7486 3.20898L2.49654 9.29214C2.26257 9.46495 1.96948 9.5378 1.68175 9.49468C1.39403 9.45155 1.13523 9.29597 0.962293 9.06218C0.789357 8.82838 0.71645 8.53551 0.759609 8.24799C0.802768 7.96048 0.958458 7.70187 1.19243 7.52906L10.0965 0.958588C10.2852 0.818997 10.5138 0.743652 10.7486 0.743652C10.9834 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4907 7.66598 20.6286 7.85809 20.6987 8.07797C20.7689 8.29785 20.7677 8.53426 20.6954 8.75344C20.6231 8.97262 20.4833 9.16338 20.2961 9.29847C20.1088 9.43356 19.8837 9.50608 19.6527 9.50568Z" fill="#FF3D00"/>
            </g>
              <defs>
                <clipPath id="clip0_88061_5027">
                  <rect width="20" height="14.5098" fill="white" transform="translate(0.748535 0.745117)"/>
                </clipPath>
            </defs>
          </svg>
        </button>
        <button id="btnUrgentRed" type="button"  onclick="btnTaskPrio('btnUrgentRed')" class="category-button category-button-red d-none">
          <p>Urgent</p>
          <svg class="activ-focus" xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
            <g clip-path="url(#clip0_88061_5027)">
              <path d="M19.6527 15.2547C19.418 15.2551 19.1895 15.1803 19.0006 15.0412L10.7486 8.958L2.4965 15.0412C2.38065 15.1267 2.24907 15.1887 2.10927 15.2234C1.96947 15.2582 1.82419 15.2651 1.68172 15.2437C1.53925 15.2223 1.40239 15.1732 1.27894 15.099C1.1555 15.0247 1.04789 14.927 0.962258 14.8112C0.876629 14.6954 0.814657 14.5639 0.77988 14.4243C0.745104 14.2846 0.738203 14.1394 0.759574 13.997C0.802733 13.7095 0.958423 13.4509 1.19239 13.2781L10.0965 6.70761C10.2852 6.56802 10.5138 6.49268 10.7486 6.49268C10.9833 6.49268 11.2119 6.56802 11.4006 6.70761L20.3047 13.2781C20.4906 13.415 20.6285 13.6071 20.6987 13.827C20.7688 14.0469 20.7677 14.2833 20.6954 14.5025C20.6231 14.7216 20.4833 14.9124 20.296 15.0475C20.1088 15.1826 19.8836 15.2551 19.6527 15.2547Z" fill="#FFF"/>
              <path d="M19.6527 9.50568C19.4181 9.50609 19.1895 9.43124 19.0006 9.29214L10.7486 3.20898L2.49654 9.29214C2.26257 9.46495 1.96948 9.5378 1.68175 9.49468C1.39403 9.45155 1.13523 9.29597 0.962293 9.06218C0.789357 8.82838 0.71645 8.53551 0.759609 8.24799C0.802768 7.96048 0.958458 7.70187 1.19243 7.52906L10.0965 0.958588C10.2852 0.818997 10.5138 0.743652 10.7486 0.743652C10.9834 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4907 7.66598 20.6286 7.85809 20.6987 8.07797C20.7689 8.29785 20.7677 8.53426 20.6954 8.75344C20.6231 8.97262 20.4833 9.16338 20.2961 9.29847C20.1088 9.43356 19.8837 9.50608 19.6527 9.50568Z" fill="#FFF"/>
            </g>
              <defs>
                <clipPath id="clip0_88061_5027">
                  <rect width="20" height="14.5098" fill="white" transform="translate(0.748535 0.745117)"/>
                </clipPath>
            </defs>
          </svg>
        </button>
  `
    }
    generateHTMLMedium() {
        return /*html*/ `
        <button id="btnMediumWhite" type="button" onclick="btnTaskPrio('btnMediumWhite')" class="category-button category-button-standard d-none">
          <p>Medium</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="8" viewBox="0 0 21 8" fill="none">
              <g clip-path="url(#clip0_88061_5034)">
                <path d="M19.1526 7.72528H1.34443C1.05378 7.72528 0.775033 7.60898 0.569514 7.40197C0.363995 7.19495 0.248535 6.91419 0.248535 6.62143C0.248535 6.32867 0.363995 6.0479 0.569514 5.84089C0.775033 5.63388 1.05378 5.51758 1.34443 5.51758H19.1526C19.4433 5.51758 19.722 5.63388 19.9276 5.84089C20.1331 6.0479 20.2485 6.32867 20.2485 6.62143C20.2485 6.91419 20.1331 7.19495 19.9276 7.40197C19.722 7.60898 19.4433 7.72528 19.1526 7.72528Z" fill="#FFA800"/>
                <path d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z" fill="#FFA800"/>
              </g>
              <defs>
                <clipPath id="clip0_88061_5034">
                  <rect width="20" height="7.45098" fill="white" transform="translate(0.248535 0.274414)"/>
                </clipPath>
              </defs>
          </svg>
        </button>
        <button id="btnMediumYellow" type="button" onclick="btnTaskPrio('btnMediumYellow')" class="category-button category-button-yellow" value="medium">
          <p>Medium</p>
          <svg class="activ-focus" xmlns="http://www.w3.org/2000/svg" width="21" height="8" viewBox="0 0 21 8" fill="none">
              <g clip-path="url(#clip0_88061_5034)">
                <path d="M19.1526 7.72528H1.34443C1.05378 7.72528 0.775033 7.60898 0.569514 7.40197C0.363995 7.19495 0.248535 6.91419 0.248535 6.62143C0.248535 6.32867 0.363995 6.0479 0.569514 5.84089C0.775033 5.63388 1.05378 5.51758 1.34443 5.51758H19.1526C19.4433 5.51758 19.722 5.63388 19.9276 5.84089C20.1331 6.0479 20.2485 6.32867 20.2485 6.62143C20.2485 6.91419 20.1331 7.19495 19.9276 7.40197C19.722 7.60898 19.4433 7.72528 19.1526 7.72528Z" fill="#FFF"/>
                <path d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z" fill="#FFF"/>
              </g>
              <defs>
                <clipPath id="clip0_88061_5034">
                  <rect width="20" height="7.45098" fill="white" transform="translate(0.248535 0.274414)"/>
                </clipPath>
              </defs>
          </svg>
        </button>`
    }
    generateHTMLPrio() {
        return /*html*/ `
        <button id="btnLowWhite" type="button" onclick="btnTaskPrio('btnLowWhite')" class="category-button category-button-standard">
          <p>Low</p>
          <svg class="activ-focus" xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
            <path d="M10.2485 9.50614C10.0139 9.50654 9.7854 9.4317 9.59655 9.29262L0.693448 2.72288C0.57761 2.63733 0.47977 2.52981 0.405515 2.40647C0.33126 2.28313 0.282043 2.14638 0.260675 2.00404C0.217521 1.71655 0.290421 1.42372 0.463337 1.18994C0.636253 0.956173 0.895022 0.800615 1.18272 0.757493C1.47041 0.71437 1.76347 0.787216 1.99741 0.960004L10.2485 7.04248L18.4997 0.960004C18.6155 0.874448 18.7471 0.812529 18.8869 0.777782C19.0266 0.743035 19.1719 0.736141 19.3144 0.757493C19.4568 0.778844 19.5937 0.828025 19.7171 0.902225C19.8405 0.976425 19.9481 1.07419 20.0337 1.18994C20.1194 1.3057 20.1813 1.43717 20.2161 1.57685C20.2509 1.71653 20.2578 1.86169 20.2364 2.00404C20.215 2.14638 20.1658 2.28313 20.0916 2.40647C20.0173 2.52981 19.9195 2.63733 19.8036 2.72288L10.9005 9.29262C10.7117 9.4317 10.4831 9.50654 10.2485 9.50614Z" fill="#7AE229"/>
            <path d="M10.2485 15.2547C10.0139 15.2551 9.7854 15.1802 9.59655 15.0412L0.693448 8.47142C0.459502 8.29863 0.30383 8.04005 0.260675 7.75257C0.217521 7.46509 0.290421 7.17225 0.463337 6.93848C0.636253 6.70471 0.895021 6.54915 1.18272 6.50603C1.47041 6.46291 1.76347 6.53575 1.99741 6.70854L10.2485 12.791L18.4997 6.70854C18.7336 6.53575 19.0267 6.46291 19.3144 6.50603C19.602 6.54915 19.8608 6.70471 20.0337 6.93848C20.2066 7.17225 20.2795 7.46509 20.2364 7.75257C20.1932 8.04005 20.0376 8.29863 19.8036 8.47142L10.9005 15.0412C10.7117 15.1802 10.4831 15.2551 10.2485 15.2547Z" fill="#7AE229"/>
          </svg>
        </button>
        <button id="btnLowGreen" type="button" onclick="btnTaskPrio('btnLowGreen')" class="category-button category-button-green d-none">
          <p id="boardTaskLow">Low</p>
          <svg class="activ-focus" xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
            <path d="M10.2485 9.50614C10.0139 9.50654 9.7854 9.4317 9.59655 9.29262L0.693448 2.72288C0.57761 2.63733 0.47977 2.52981 0.405515 2.40647C0.33126 2.28313 0.282043 2.14638 0.260675 2.00404C0.217521 1.71655 0.290421 1.42372 0.463337 1.18994C0.636253 0.956173 0.895022 0.800615 1.18272 0.757493C1.47041 0.71437 1.76347 0.787216 1.99741 0.960004L10.2485 7.04248L18.4997 0.960004C18.6155 0.874448 18.7471 0.812529 18.8869 0.777782C19.0266 0.743035 19.1719 0.736141 19.3144 0.757493C19.4568 0.778844 19.5937 0.828025 19.7171 0.902225C19.8405 0.976425 19.9481 1.07419 20.0337 1.18994C20.1194 1.3057 20.1813 1.43717 20.2161 1.57685C20.2509 1.71653 20.2578 1.86169 20.2364 2.00404C20.215 2.14638 20.1658 2.28313 20.0916 2.40647C20.0173 2.52981 19.9195 2.63733 19.8036 2.72288L10.9005 9.29262C10.7117 9.4317 10.4831 9.50654 10.2485 9.50614Z" fill="#FFF"/>
            <path d="M10.2485 15.2547C10.0139 15.2551 9.7854 15.1802 9.59655 15.0412L0.693448 8.47142C0.459502 8.29863 0.30383 8.04005 0.260675 7.75257C0.217521 7.46509 0.290421 7.17225 0.463337 6.93848C0.636253 6.70471 0.895021 6.54915 1.18272 6.50603C1.47041 6.46291 1.76347 6.53575 1.99741 6.70854L10.2485 12.791L18.4997 6.70854C18.7336 6.53575 19.0267 6.46291 19.3144 6.50603C19.602 6.54915 19.8608 6.70471 20.0337 6.93848C20.2066 7.17225 20.2795 7.46509 20.2364 7.75257C20.1932 8.04005 20.0376 8.29863 19.8036 8.47142L10.9005 15.0412C10.7117 15.1802 10.4831 15.2551 10.2485 15.2547Z" fill="#FFF"/>
          </svg>
        </button>
`
    }
    generateHTMLCategory() {
        return /*html*/ `
          <div class="category board-task-input-button-style button-hover">
            <div class="category-sub">
              <label for="category">Category</label>
            </div>
            ${this.generateHTMLHiddenCategory()}
            ${this.generateHTMLShowCategory()}
          </div>
        `
    }
    generateHTMLHiddenCategory() {
        return /*html*/ `
            <div id="hiddenSelectCategory" class="assign-container bg-color-white">
              <input id="taskCategoryInput" onclick="toggleCategory()" type="text" value="Select task category" >
              <img onclick="toggleCategory()" src="./IMG/assets/arrow_drop_downaa.png" alt="">
            </div>
        `
    }
    generateHTMLShowCategory() {
        return /*html*/ `
            <div id="showSelectCategory" class="d-none">
              ${this.generateHTMLToggleCategory()}
              ${this.generateHTMLSelectCategory()}
            </div>
        `
    }
    generateHTMLToggleCategory() {
        return /*html*/ `
              <div class="assign-container bg-color-white">
                <input onclick="toggleCategory()" type="button" value="Select task category">
                <img onclick="toggleCategory()" src="./IMG/assets/arrow_dropdown.png" alt="">
              </div>
        `
    }
    generateHTMLSelectCategory() {
        return /*html*/ `
              <div class="select-category">
                <div onclick="selectCategoryTechnical()" id="boardTaskTechnical" class="select-task-category-container">
                  <span id="technicalTask">Technical Task</span>
                </div>
                <div onclick="selectCategoryStory()" id="boardTaskStory" class="select-task-category-container">
                  <span id="userStory">User Story</span>
                </div>
              </div>
        `
    }
    generateHTMLSubtask() {
        return /*html*/ `
        <div class="board-task-input button-hover">
            <p>Subtasks</p>
            <div id="hiddenSubtask" class="assign-container bg-color-white">
                <input onclick="openSubtask()" type="text" placeholder="Add new subtask">
                <img onclick="openSubtask()" src="./IMG/assets/Subtasks icons11.png" alt="">
            </div>
            <div>
                <div id="showSubtask" class="assign-container open-subtask d-none bg-color-white">
                    <input id="inputSubtask" type="text" placeholder="Add new subtask">
                    <div class="subtask-style-position">
                        <img onclick="closeSubtask()" src="./IMG/assets/subtask-close.png" alt="">
                        <img class="subtask-line" src="./IMG/assets/subtask-line.png" alt="">
                        <img onclick="createSubtask()" src="./IMG/assets/subtask-accept.png" alt="">
                    </div>
                </div>
                <div id="createNewSubtask" class="create-subtask" onload="renderSubtasks()"></div>
            </div>
        </div>
        `
    }
    generateHTMLAddTaskButtonsResponsive(x) {
        return /*html*/ `
            <div class="addTask-button addTask-button-window responsiveNone">
                <button class="btn-cancel btn-white" type="reset" onclick="closeAddTask()">Clear <img src="./IMG/cancel.png"></button>
                <button class="btn-create btn-dark-blue" onclick="createTaskFromBoard(${x})" type="submit">Create&nbsp;Task <img class="check-img-contacts" src="./IMG/check-for-button.png"></button>
            </div>
        `
    }
    generateHTMLAddTaskButtons(x) {
        return /*html*/ `
            <div id="addtaskButton" class="addTask-button addTask-button-window">
                <button class="btn-cancel btn-white" type="reset" value="Reset" onclick="resetButton()">Clear <img src="./IMG/cancel.png"></button>
                <button class="btn-create btn-dark-blue" type="submit">Create&nbsp;Task <img class="check-img-contacts" src="./IMG/check-for-button.png"></button>
            </div>
        `
    }
    generateHTMLAddSubtask(x = "test", m) {
        return /*html*/ `
            <div class="subtask-contianer" id="containerTodoSubtask${m}">
                <ul>
                    <li id="todoSubtask${m}">${x}</li>
                    <div class="subtask-img">
                        <img src="./IMG/assets/subtask_trash.png" alt="" onclick="deleteSubtask(${m})">
                        <img src="./IMG/assets/subtask_seperator.png" alt="">
                        <img src="./IMG/assets/subtask_pencil.png" alt="" onclick="changeSubtask(${m})">
                    </div>
                </ul>
            </div>
            <div id="fixTodoSubtask${m}" class="fix-todo-subtask d-none">
                <form class="fix-container">
                        <input id="editFixSubtask${m}" type="text" placeholder="" value="${x}">
                    <div class="fix-subtask-icons">
                        <img src="./IMG/assets/subtask_trash.png" alt="" onclick="deleteSubtask(${m})">
                        <img class="subtask-line" src="./IMG/assets/subtask_seperator.png" alt="">
                        <img src="./IMG/assets/subtask-accept.png" alt="" onclick="fixSubtasks(${m})">
                    </div>
                </form>
            </div>
        `
    }
    generateHTMLCloseButtonInSVG() {
        return /*html*/ `
                <div class="style-closebutton-intask">
                  <svg  onclick="closeAddTask()" class="close-button-add-task cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <mask id="mask0_87491_5574" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9"/>
                      </mask>
                      <g mask="url(#mask0_87491_5574)">
                        <path d="M12 13.4L7.1 18.3C6.91667 18.4834 6.68333 18.575 6.4 18.575C6.11667 18.575 5.88333 18.4834 5.7 18.3C5.51667 18.1167 5.425 17.8834 5.425 17.6C5.425 17.3167 5.51667 17.0834 5.7 16.9L10.6 12L5.7 7.10005C5.51667 6.91672 5.425 6.68338 5.425 6.40005C5.425 6.11672 5.51667 5.88338 5.7 5.70005C5.88333 5.51672 6.11667 5.42505 6.4 5.42505C6.68333 5.42505 6.91667 5.51672 7.1 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z" fill="#2A3647"/>
                      </g>
                  </svg>
                </div>
          `
    }
}
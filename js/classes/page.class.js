class Page {
    rememberMe = false;
    signedAccount = null;
    constructor() {
            this.accounts = [];
            this.tasks = [];
        }
        // Methoden
    sayDaytime() {
        const currentHour = new Date().getHours();
        let greeting = "";
        if (currentHour >= 6 && currentHour < 12) {
            greeting = "Good Morning";
        } else if (currentHour >= 12 && currentHour < 18) {
            greeting = "Good Afternoon";
        } else if (currentHour >= 18 && currentHour < 21) {
            greeting = "Good Evening";
        } else {
            greeting = "Good Night";
        }
        return greeting;
    }

    // Components
    pageLayoutMain() {
        body.innerHTML = "";
        return /*html*/ `
            <div id="SideAndHead"></div>
            <div id="content" class="content"></div>
            ${this.showFooter()}
        `
    }
    SideAndHead() {
        let nav = () => {
            if (Join.signedAccount) {
                return /*html*/ `
                    <div id="summeryActive" class="navs bgDark " onclick="summeryPage()"><div class="summary"></div><h3>Summary</h3></div>
                    <div id="addTaskActive" class="navs" onclick="addTaskPage()"><div class="addTask"></div><h3>Add Task</h3></div>
                    <div id="boardActive" class="navs" onclick="boardPage()"><div class="board"></div><h3>Board</h3></div>
                    <div id="contactsActive" class="navs" onclick="contactsPage()"><div class="contacts"></div><h3>Contacts</h3></div>
                `
            } else {
                return "";
            }
        }
        let accountArea = () => {
            if (Join.signedAccount) {
                return /*html*/ `
                    <div id="hInfo" class="infoButton" onclick="helpPage()"></div>
                    <div onclick="openSideAndHeadMenu(event)" class="userImg">${Join.signedAccount.shortname}</div>
                `
            } else {
                return "";
            }
        }

        return /*html*/ `
            <div id="sidebar" class="sidebar">
                <div id="logo" onclick="summeryPage()" class="logo"></div>
                <nav>
                    ${nav()}
                </nav>
                <div class="container-privacy-legal">
                    <div id="privacy" class="style-privacy" onclick="privacyPage('privacyPage')">
                        <p id="privacyPage" class="legal-policy">Privacy Policy</p>
                    </div>
                    <div id="legal" class="style-legal" onclick="legalPage('legalPage')">
                        <p id="legalPage" class="legal-policy">Legal notice</p>
                    </div>
                </div>
            </div>
            <header class="header">
                <h2>Kanban Projekt Management Tool</h2>
                <div id="accountIssues" class="accountIssues">
                    ${accountArea()}
                </div>
            </header>

            <header class="respon-header">
                <img class="respon-logo" src="./IMG/Capa 1.png" alt="Joinlogo">
                <div id="accountIssuesRespon" class="accountIssues">
                    ${accountArea()}
                </div>
            </header>
            
            ${this.logoutWindow()}

        `
    }
    logoutWindow() {
        return /*html*/ `
            <div id="logoutWindow" class="popupAccount d-none">
                <div class="popupAccountBtn" onclick="legalPage()"><p>Legal Notice</p></div>
                <div class="popupAccountBtn" onclick="privacyPage()"><p>Privacy Policy</p></div>
                <div class="popupAccountBtn" onclick="logout()"><p>Log out</p></div>
            </div>

        `
    }
    showFooter() {
        return /*html*/ `
            <footer class="respon-footer">
                <div id="responActiveSummery" class="respon-footer-buttons" onclick="summeryPage()">
                    <img src="./IMG/Summary.png">
                    <p class="mg-none">Summary</p>
                </div>
                <div id="responActiveBoard" class="respon-footer-buttons" onclick="boardPage()">
                    <img src="./IMG/Board.png">
                    <p class="mg-none">Board</p>
                </div>
                <div id="responActiveAddTask" class="respon-footer-buttons" onclick="addTaskPage()">
                    <img src="./IMG/addTask.png">
                    <p class="mg-none">Add Task</p>
                </div>
                <div id="responActiveContats" class="respon-footer-buttons" onclick="contactsPage()">
                    <img src="./IMG/Contacts.png">
                    <p class="mg-none">Contacts</p>
                </div>
            </footer>
        `
    }
}
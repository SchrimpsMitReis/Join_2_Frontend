/**
 * Contacts sind die Grundlage: 
 * Accounts sind eine Erweiterung "Vererbung" von Contacts, da diese ein Passwort haben sich anmelden können usw. 
 * allerding wäre alles rund, wenn jeder, der als Contakt hinzugefügt wird Eine Email erhält, "Mach dir doch einen Account".
 * Zt Usability, kann halt keiner hinterher sagen, er hat von dem Projekt "nix gewusst". 
 */
class Contact {
    constructor(id = undefined, name, email, tel = "+49 1111 111 11 1") {
            this.id = id
            this.name = name;
            this.email = email;
            this.tel = tel;
            this.shortname = this.getInitials()
            this.checked = false;
            this.color = this.getColor()
        }
        /**
         * This function creates and random the bg-color of the initials container
         * @returns 
         */
    getColor() {
        const colors = [
            "#FF7A00",
            "#FF5EB3",
            "#6E52FF",
            "#9327FF",
            "#00BEE8",
            "#1FD7C1",
            "#FF745E",
            "#FFA35E",
            "#FC71FF",
            "#FFC701",
            "#0038FF",
            "#C3FF2B",
            "#FFE62B",
            "#FF4646",
            "#FFBB2B",
        ];

        let sum = this.name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0); //methode um die ersten Buchstaben in zahlen zu umwandeln.
        let colorIndex = sum % colors.length; // hier werden die zahlen zusammen addiert und der array colors zusammenberechnet
        return colors[colorIndex];
    }

    /**
     * This function creates and sorts the user initials
     * 
     * @param {string} name - Is needed to recognize the initials from the user names. It is passed in renderContacts().
     * @returns 
     */
    getInitials() {
        let parts = this.name.split(" ");
        let initials = parts[0][0];
        if (parts.length > 1 && parts[1]) { // Überprüft, ob es einen zweiten Namensteil gibt
            initials += parts[1][0];
        }
        return initials.toUpperCase();
    }
    //     let parts = this.name.split(" ");
    //     let initials = parts[0][0];
    //     if (parts.length > 1) {
    //         initials += parts[parts.length - 1][0];
    //     }
    //     return initials.toUpperCase();
    // }

    generateHtmlContactDetails(i) {
        return /*html*/ `
            <div class="contactView">
                <div class="initials-logo logo-by-details" style="background-color: ${this.color}; margin: 0 auto;">${this.shortname}</div>
                <div class="name">
                    <h2 class="name-headline">${this.name}</h2>
                    <a class="contactsIcons">
                        <div onclick="openEditContact(${i})" class="editBtn">
                           
                        </div>
                        <div onclick="deleteContact(${i})" class="deleteBtn">
                           
                        </div>
                    </a>
                </div>
            </div>
            <div class="contactInformation">
                <h3 class="font-size-normal mg-none">Contact Information</h3>
                <h3 class="mail-headline">Email</h3>
                <p class="mail mg-none"><a href="mailTo:${this.email}">${this.email}</a></p>
                <h3 class="mail-headline">Phone</h3>
                <p><a class="phone-link" href="tel:${this.tel}">${this.tel}</a></p>
            </div>
        `
    }
    generateMobileContactDetails(i) {
        return /*html*/ `
        <div class="res-contacts-detail">
            <div class="res-contacts-headline">
                <div>
                    <h1 class="res-contacts-h1">Contacts</h1>
                    <p class="res-subtitle-contacts">Better with a team</p>
                    <div class="res-vector-blue"></div>
                </div>
                <div class="res-left-arrow">
                    <button onclick="closeOverlay()" class="res-left-arrow-btn"><img src="./IMG/arrow-left-line.png"></button>
                </div>
            </div>
            <div class="contactView">
                <div class="initials-logo logo-by-details" style="background-color: ${this.color}; margin: 0 auto;">${this.shortname}</div>
                <div class="name">
                    <h2 class="name-headline">${this.name}</h2>
                    <a class="contactsIcons">
                        <div onclick="openEditContact(${i})" class="editIcon">
                            <img class="editSymbol" src="./IMG/edit.png"> <span>Edit</span>
                        </div>
                        <div onclick="deleteContact(${i})" class="deleteIcon">
                            <img class="deleteSymbol" src="./IMG/delete.png"> <span>Delete</span>
                        </div>
                    </a>
                </div>
            </div>
            <div class="contactInformation">
                <h3 class="mail-headline">Email</h3><br>
                <p class="mail mg-none"><a href="mailTo:${this.email}">${this.email}</a></p>
                <h3 class="mail-headline">Phone</h3>
                <p><a class="phone-link" href="tel:${this.tel}">${this.tel}</a></p>
            </div>
            <div class="options-btn-div">
                <button onclick="openContactMenu(event)" class="respon-button"><img src="./IMG/more_vert.png"></button>
            </div>
            <div class="options-menu" id="optionsMenu">
                <div class="iconWrapper" onclick="openEditContact(${i})">
                    <img class="icon" src="./IMG/edit.png">
                    <span class="iconText">Edit</span>
                </div>
                <div class="iconWrapper" onclick="deleteContact(${i})">
                    <img class="icon" src="./IMG/delete.png">
                    <span class="iconText">Delete</span>
                </div>
            </div>
        </div>
    
        `
    }

    tinyCard(x) {
        return /*html*/ `
        <div class="tinyAccountTaskCard">
            <div class="initials-logo" style="background-color: ${this.color}">${this.shortname}</div>
            <div>
                <div class="contactName">${this.name}</div>
            </div>
        </div>
        `
    }
    generateHtmlContactList(i) {
        return /*html*/ `
            <div class="contactfield-wrapper">
                <div id="contactField${i}" class="contactfield" onclick="showDetails(${i})">
                    <div class="initials-logo" style="background-color: ${this.color}">${this.shortname}</div>
                    <div class="contact">
                        <span id="contactName${i}" class="name">${this.name}</span>
                        <span class="mail">${this.email}</span>
                    </div>
                </div>
            </div>
        `
    }
    nameTag() {
        return /*html*/ `
            <div class="accountTag">${this.shortname}</div>

        `
    }
    tinyCardCheck(x) {
        return /*html*/ `
        ${this.generateHTMLCheckedNone(x)}
        ${this.generateHTMLChecked(x)}
        `
    }
    generateHTMLCheckedNone(x) {
        return /*html*/ `
            <div onclick="addShortNames('${this.shortname}', ${x})" id="tinyAccountCardCheckedNone${x}" class="checked-none">
                <div onclick="assignedCheckNone(${x})"  class="tinyAccountCard">
                    <div class="board-addtask-addcontact-contact">
                        <div id="shortname${x}" class="initials-logo" style="background-color: ${this.color}">${this.shortname}</div>
                        <div id="contactName${x}" class="accountName">${this.name}</div>
                    </div>
                    <div id="assignedContactCheckEmpty" class="board-addtask-addcontact-checkbox">
                        <img src="./IMG/check_empty.svg" alt="">
                    </div>
                </div>
            </div>
        `
    }
    generateHTMLChecked(x) {
        return /*html*/ `
            <div id="tinyAccountCardChecked${x}" class="checked d-none">
                <div onclick="assignedCheck(${x})"  class="tinyAccountCardChecked" id="ac${x}">
                    <div class="board-addtask-addcontact-contact">
                        <div class="initials-logo" style="background-color: ${this.color}">${this.shortname}</div>
                        <div class="accountName">${this.name}</div>
                    </div>
                    <div id="assignedContactCheckIsCheck" class="board-addtask-addcontact-checkbox board-addtask-addcontact-checkbox-check">
                        <img src="./IMG/check_check.svg" alt="Checked">
                    </div>        
                </div>
            </div>
        `
    }
    accountTag() {
        return /*html*/ `
            <div  class="initials-logo accountTag" style="background-color: ${this.color}">${this.shortname}</div>
        `
    }
    generateHtmlEditContact(i) {
        return /*html*/ `
        <div class="overlay-container slide-in">
            ${JoinContacts.generateLeftSide()}
            <div class ="overlay-mid-container">
                <div class="initials-logo logo-by-details" style="background-color: ${this.color}; margin: 0 auto;">${this.shortname}</div>
            </div>
            <div class="overlay-right-container-addContact">
                <div class="close-button">${JoinContacts.closeButton()}</div>
                <form class="addContact-form" onsubmit="editContact(${i}); return false">
                    <div class="btn-underlay">
                        <input id="editName" required type="text" class="frame-157" placeholder="Name" value="${this.name}">
                        <img class="input-icon" src="./IMG/person.png"> 
                    </div>
                    <div class="btn-underlay">
                        <input id="editMail" required type="email" class="frame-157" placeholder="Email" value="${this.email}">
                        <img class="input-icon" src="./IMG/mail.png"> 
                    </div>
                    <div class="btn-underlay">
                        <input id="editPhone" required type="text" class="frame-157" placeholder="Phone" value="${this.tel}" oninput="validatePhoneNumber(this)">
                        <img class="input-icon" src="./IMG/call.png"> 
                    </div>
                    <div class="frame-176">
                        <div class="loginButtons">
                            <button class="btn-byEdit-delete btn-white" type="reset" onclick="deleteContact(${i})">Delete</button>
                            <button class="btn-byEdit-save btn-dark-blue" type="submit">Save <img class="check-img-contacts" src="./IMG/check-for-button.png"></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        `
    }
}
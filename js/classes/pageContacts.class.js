class Contacts extends Page {
    contactsContent() {
            return /*html*/ `    
            
                <div class="respon-add-contact" onclick="openAddContact()">
                    <button class="respon-button"><img src="./IMG/person_add.png"></button>
                </div>
                <div>
                    <div class="respon-overlay" id="responOverlay"></div>
                </div>
                <div>
                    <div class="overlay-style" id="overlay"></div>
                </div>
                <div class="contacts-content">
                    <div class="contacts-list-section">
                        <div class="add-new-button" id="addNewButton">
                            <button onclick="openAddContact()" class="button-add-task button-width contacts-button-respon"><p>Add new contact</p><img src="./IMG/person_add.png"></button>
                        </div>
                        <nav class="contacts-list" id="contactsList"></nav>
                    </div>
                    <div class="contacts-view">
                        <div class="contacts-headline">
                            <h1 class="contacts-h1">Contacts</h1>
                            <img class="vector-blue" src="./IMG/Vector-5blue (1).png">
                            <p class="subtitle-contacts">Better with a team</p>
                        </div>
                        <div class="contact-container" id="detailsContainer"></div>
                    </div>
                </div>
                <div>
                    <div class="overlay-success" id="overlaySuccess"></div>
                </div>
        `
        }
        /**
         * templates for the overlay
         * @returns to the generate functions
         */
    generateLeftSide() {
        return /*html*/ `
                <div class="overlay-left-container">
                    <div class="close-btn-respon">${this.closeButtonRespon()}</div>
                    <img class="logo-overlay" src="./IMG/LogoWhite.png" alt="join-logo">
                    <h1 class="add-contact-headline">Add contact</h1>
                    <span class="subtitle-overlay-header">Tasks are better with a team</span>
                    <img src="./IMG/vector-5.png">
                </div>
            `
    }

    generateHtmlAddContact() {
        return /*html*/ `
        <div class="overlay-container">
            ${this.generateLeftSide()}
            <div class ="overlay-mid-container">
                <div class="add-Contact-logo">
                    <img src="./IMG/person-white.png">
                </div>
            </div>
            <div class="overlay-right-container-addContact">
                <div class="close-button">${this.closeButton()}</div>
                <form class="addContact-form"  onsubmit="addContact(); return false">
                    <div class="btn-underlay">
                        <input id="name" required type="text" class="frame-157" placeholder="Name">
                        <img class="input-icon" src="./IMG/person.png"> 
                    </div>
                    <div class="btn-underlay">
                        <input id="mail" required type="email" class="frame-157" placeholder="Email">
                        <img class="input-icon" src="./IMG/mail.png"> 
                    </div>
                    <div class="btn-underlay">
                        <input id="phone" required type="number" class="frame-157" placeholder="Phone">
                        <img class="input-icon" src="./IMG/call.png"> 
                    </div>
                    <div class="frame-176">
                        <div class="loginButtons">
                            <button class="btn-cancel btn-white" type="reset" onclick="closeOverlay()">Cancel <img src="./IMG/cancel.png"></button>
                            <button class="btn-create-contacts btn-dark-blue" type="submit">Create&nbsp;contact <img class="check-img-contacts" src="./IMG/check-for-button.png"></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        `
    }
    closeButton() {
        return /*html*/ `
            <div id="closeButton" class="style-closebutton">
                <svg onclick="closeOverlay()" class="close-button-add-task cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
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
    closeButtonRespon() {
        return /*html*/ `
            <div id="closeButtonRespon" class="close-btn-respon-style">
                <svg onclick="closeOverlay()" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <mask id="mask0_87491_5574" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#FFFFFF"/>
                    </mask>
                    <g mask="url(#mask0_87491_5574)">
                        <path d="M12 13.4L7.1 18.3C6.91667 18.4834 6.68333 18.575 6.4 18.575C6.11667 18.575 5.88333 18.4834 5.7 18.3C5.51667 18.1167 5.425 17.8834 5.425 17.6C5.425 17.3167 5.51667 17.0834 5.7 16.9L10.6 12L5.7 7.10005C5.51667 6.91672 5.425 6.68338 5.425 6.40005C5.425 6.11672 5.51667 5.88338 5.7 5.70005C5.88333 5.51672 6.11667 5.42505 6.4 5.42505C6.68333 5.42505 6.91667 5.51672 7.1 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z" fill="#FFFFFF"/>
                    </g>
                </svg>
            </div>
        `
    }
    generateHtmlSuccessInfo() {
        return /*html*/ `
            <div class="successInfoContainer">
                <h3 class="font-size-normal mg-none">Contact succesfully created</h3>
            </div>
        `
    }
    generateHtmlDeleteInfo() {
        return /*html*/ `
            <div class="successInfoContainer">
                <h3 class="font-size-normal mg-none">Contact succesfully deleted</h3>
            </div>
        `
    }
    generateHtmlEditInfo() {
        return /*html*/ `
            <div class="successInfoContainer">
                <h3 class="font-size-normal mg-none">Contact succesfully edited</h3>
            </div>
        `
    }

}
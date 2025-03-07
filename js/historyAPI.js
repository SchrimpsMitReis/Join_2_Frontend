/**
 * Handles the window popstate event to navigate between pages based on the state.
 * @param {object} event - The popstate event object.
 */
window.onpopstate = async function(event) {
    if (event.state) {
        if (event.state.page === 'summary') {
           await summeryPage();
        } else if (event.state.page === 'Board') {
            await boardPage()
        } else if (event.state.page === 'Help') {
            helpPage()
        } else if (event.state.page === 'Privacy Policy') {
            privacyPage()
        } else if (event.state.page === 'LegalNotice') {
            legalPage()
        } else if (event.state.page === 'LogIn') {
            await startPage2()
        } else if (event.state.page === 'SignUp') {
            signUp()
        } else if (event.state.page === 'AddTask') {
            addTaskPage()
        } else if (event.state.page === 'Contacts') {
            await contactsPage()
        }
    }
}
/**
 * Setzt den aktuellen Zustand der Seite, aktualisiert die Browser-Historie und führt zugehörige Aktionen aus.
 *
 * @param {string} x - Der Name des Zustands, der gesetzt werden soll. Dieser wird verwendet, um den Titel, die URL und den Zustandswert zu bestimmen.
 * @returns {string} Gibt den übergebenen Zustandsnamen zurück.
 */
function setState(x) {
    let state = { page: `${x}` };
    let title = `${x}`;
    let url = `${x.toLowerCase()}.html`;
    history.pushState(state, title, url);
    document.title = "Join - " + capitalizeFirstLetter(title);
    saveState();
    return x;
}
/**
 * Speichert den aktuellen Seitenzustand im lokalen Speicher des Browsers.
 */
function saveState(){
    let actualState = history.state['page'];
    localStorage.setItem('state', actualState);
}
/**
 * Kapitalisiert den ersten Buchstaben eines gegebenen Strings.
 *
 * @param {string} name - Der String, dessen erster Buchstabe großgeschrieben werden soll.
 * @returns {string} Gibt den String mit dem ersten Buchstaben in Großbuchstaben zurück.
 */
function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}
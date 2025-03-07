/**
 * Performs a guest login by creating a new Account object with default guest information,
 * setting it as the signed account in the Join object, navigating to the summary page,
 * and checking for a welcome response.
 * @function
 * @name guestLogin
 * @returns {void}
 */

function guestLogin() {
    const guest = new Account("Guest", "email@join.de", "");
    Join.signedAccount = guest;
    saveSignedUser()
    summeryPage();
    checkWelcomeRespon();
}
/**
 * Logs in a user by comparing the entered login credentials with existing user accounts.
 * Sets the signed account in the Join object, saves login information if the "Remember Me" option is enabled,
 * navigates to the summary page, checks for a welcome response, and displays the welcome overlay if applicable.
 * @async
 * @function
 * @name logInUser
 * @returns {Promise<void>}
 */
async function logInUser() {
    const userEmail = getEmailInputValue();
    const userPassword = getPasswordInputValue();
    try {
        let loginResponse = await loginRequest(userPassword,userEmail)
        
        if (!loginResponse.ok) {
            throw new Error(`Login fehlgeschlagen: ${loginResponse.status} ${loginResponse.statusText}`);
        }
        processSuccessfulLogin(userEmail);
        
    } catch (error) {
        console.error("Login-Fehler:", error.message);
        handleFailedLogin();
        
    }
}
/**
 * Retrieves the value of an HTML input field with the ID 'loginEmail', converts it to lowercase, and returns this value.
 * This function is typically used to normalize email input, making it case-insensitive.
 *
 * @returns {string} The lowercase value of the input field with the ID 'loginEmail'.
 */
function getEmailInputValue() {
    return document.getElementById('loginEmail').value.toLowerCase();
}
/**
 * Retrieves the value of an HTML input field with the ID 'loginPassword'.
 * This function is typically used to obtain the password input from a user.
 *
 * @returns {string} The value of the input field with the ID 'loginPassword'.
 */
function getPasswordInputValue() {
    return document.getElementById('loginPassword').value;
}
/**
 * Checks if the given email and password correspond to a valid account.
 * This function searches for an account in the 'Join.accounts' array that matches the provided email (case-insensitive comparison). 
 * If such an account is found, it checks if the provided password matches the account's password.
 *
 * @param {string} email - The email address to be checked. The comparison is case-insensitive.
 * @param {string} password - The password to be verified against the found account.
 * @returns {boolean} True if a matching account is found and the password is correct, otherwise false.
 */
function isValidAccount(email, password) {
    const account = Join.accounts.find(account => account.email.toLowerCase() === email);
    return account && password === account.password;
}
/**
 * Processes actions following a successful login.
 * This function finds and assigns the user's account details to 'Join.signedAccount'. It also performs additional steps 
 * such as remembering the user (if requested), saving the signed-in user's details, navigating to the summary page, 
 * and checking for a welcome response.
 *
 * @param {string} userEmail - The email address of the user who has successfully logged in.
 * The email is used to find the user's account in the 'Join.accounts' array.
 */
function processSuccessfulLogin(userEmail) {
    const account = Join.accounts.find(account => account.email.toLowerCase() === userEmail);
    Join.signedAccount = account;
    rememberUserIfRequested(userEmail);
    saveSignedUser();
    summeryPage();
    checkWelcomeRespon();
}
/**
 * Remembers the user's email in local storage if the 'remember me' option is enabled.
 * Stores the email as a JSON string under the key "remember".
 *
 * @param {string} userEmail - The email of the user to be remembered.
 */
function rememberUserIfRequested(userEmail) {
    if (Join.rememberMe) {
        const userJson = JSON.stringify(userEmail);
        localStorage.setItem("remember", userJson);
    }
}
/**
 * Handles the UI changes for a failed login attempt.
 * Adds specific CSS classes to elements to indicate an error in password input.
 * The 'loginPasswordFrame' gets a 'redFrame' class, and the 'falsePassword' label gets a 'falsePasswordRed' class.
 */
function handleFailedLogin() {
    const loginPasswordFrame = document.getElementById('loginPasswordFrame');
    const label = document.querySelector(".falsePassword");
    loginPasswordFrame.classList.add('redFrame');
    label.classList.add('falsePasswordRed');
}
/**
 * Checks the window width and shows the welcome overlay if the width is less than 767 pixels.
 * @function
 * @name checkWelcomeResponse
 * @returns {void}
 */
function checkWelcomeRespon() {
    if (window.innerWidth < 767) {
        showWelcomeOverlay();
    }
}
/**
 * Displays the welcome overlay and hides it after a delay of 1000 milliseconds (1 second).
 * @function
 * @name showWelcomeOverlay
 * @returns {void}
 */
function showWelcomeOverlay() {
    let welcomeOverlay = document.getElementById('welcomeOverlay');
    welcomeOverlay.classList.remove('d-none');
    setTimeout(() => {
        welcomeOverlay.classList.add('d-none');
    }, 1000);
}
/**
 * Asynchronously creates a new user account by loading existing accounts, performing password and privacy policy checks,
 * and adding the new account to the Join object's list of accounts.
 * Navigates to the next page on successful account creation.
 * @async
 * @function
 * @name createAccount
 * @returns {Promise<void>}
 */
async function createAccount() {
    try {
        await loadAccounts();
    } catch (e) {
        console.error("Fehler beim Laden der Konten", e);
        return;
    }

    if (!isPasswordValid()) {
        handleInvalidPassword();
        return;
    }
    await registerNewAccount();
}
/**
 * Checks if the password is valid by calling the 'passwordCheck' function.
 * This function serves as a wrapper for 'passwordCheck'.
 *
 * @returns {boolean} The result from 'passwordCheck', indicating if the password is valid or not.
 */
function isPasswordValid() {
    return passwordCheck();
}
/**
 * Checks if the privacy policy has been accepted.
 * This function serves as a wrapper for 'ppCheck'.
 *
 * @returns {boolean} The result from 'ppCheck', indicating if the privacy policy is accepted or not.
 */
function isPrivacyPolicyAccepted() {
    return ppCheck();
}
/**
 * Checks if the provided email already exists in the 'Join.accounts' array.
 * Retrieves the email from the input element with ID 'signUpInputEmail' and searches for matching emails in the accounts.
 *
 * @returns {boolean} True if the email already exists in the accounts, false otherwise.
 */
function isEmailExisting() {
    const email = document.getElementById('signUpInputEmail').value;
    const existingAccounts = Join.accounts.filter(account => account.email === email);
    return existingAccounts.length !== 0;
}
/**
 * Handles UI updates for an invalid password scenario.
 * It applies visual feedback by adding CSS classes to indicate an error.
 * The 'passwordCheckArea' gets a 'redFrame' class, and the 'falsePassword' label gets a 'falsePasswordRed' class.
 */
function handleInvalidPassword() {
    const loginPasswordFrame = document.getElementById('passwordCheckArea');
    const label = document.querySelector(".falsePassword");
    loginPasswordFrame.classList.add('redFrame');
    label.classList.add('falsePasswordRed');
}
/**
 * Registers a new account asynchronously.
 * Retrieves user input for name, email, and password, creates a new account, and adds it to 'Join.accounts'.
 * Initiates a timeout before navigating to another page and then saves the accounts.
 * Finally, it calls 'successCreateAccount' to handle post-registration success actions.
 */
async function registerNewAccount() {
    const id = undefined
    const name = document.getElementById('signUpInputName').value;
    const email = document.getElementById('signUpInputEmail').value;
    const password = document.getElementById('signUpInputPassword').value;
    const account = new Account(id, name, email, "", password);
    Join.accounts.push(account);
    policyCheck = false;
    await newAccountPost(account)
    // setTimeout(() => {
    //     startPage2();
    // }, 2200);
    // await saveAccounts();
    // successCreateAccount();
}
/**
 *  function for render a little information overlay to createAccount
 * 
 */
function successCreateAccount() {
    openSuccessCreateAccountOverlay();
    setTimeout(() => {
        closeSuccessCreateAccountOverlay();
    }, 2000);
}
/**
 * Validates password input during sign-up.
 * @function
 * @returns {boolean} - Returns true if passwords are valid, otherwise false.
 */
function passwordCheck() {
    let pw1 = document.getElementById('signUpInputPassword').value;
    let pw2 = document.getElementById('signUpInputPassword2').value;
    if (pw1.length >= 8) {
        if (pw1 === pw2) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
/**
 * Checks if privacy policy checkbox is checked.
 * @function
 * @returns {boolean} - Returns the value of the global policyCheck variable.
 */
function ppCheck() {
    // let checkbox = document.getElementById('ppCheck');
    let policy = policyCheck;
    return policy
}
/**
 * Hides password status and displays password visibility icon on page load.
 * @function
 * @returns {void}
 */
function visibility() {
    document.getElementById('pass-status').classList.add('d-none');
    document.getElementById('pass-status-eye').classList.remove('d-none');
}
/**
 * Toggles the visibility of the password input.
 * @function
 * @returns {void}
 */
function viewPassword() {
    let passwordInput = document.getElementById('loginPassword');
    let passStatus = document.getElementById('pass-status-eye');

    if (passwordInput.type == 'password') {
        passwordInput.type = 'text';
        passStatus.src = './IMG/visibility_on.png';
    } else {
        passwordInput.type = 'password';
        passStatus.src = './IMG/visibility_off.png';
    }
}
/**
 * Toggles the visibility of the password input and updates the eye icon accordingly.
 */
function viewPasswordSignUp1() {
    let passwordInput = document.getElementById('signUpInputPassword');
    let passStatus = document.getElementById('pass-status-eye');
    if (passwordInput.type == 'password') {
        passwordInput.type = 'text';
        passStatus.src = './IMG/visibility_on.png';
    } else {
        passwordInput.type = 'password';
        passStatus.src = './IMG/visibility_off.png';
    }
}
/**
 * Toggles the visibility of the password input and updates the eye icon accordingly.
 */
function viewPasswordSignUp2() {
    let passwordInput = document.getElementById('signUpInputPassword2');
    let passStatus = document.getElementById('pass-status-eye');

    if (passwordInput.type == 'password') {
        passwordInput.type = 'text';
        passStatus.src = './IMG/visibility_on.png';
    } else {
        passwordInput.type = 'password';
        passStatus.src = './IMG/visibility_off.png';
    }
}
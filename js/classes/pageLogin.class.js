class Login extends Page {
    constructor() {
            super()
        }
        /**
         *  Diese Methode stellt das Log In Fenster da
         * @returns {string} -- 
         *
         */
    logInContent() {
            return /*html*/ `
                <header class="login-header">
                    <div class="frame-156">
                        <p>Not a Join user?</p>
                        <button class="log-in-side-button" onclick="signUp()">Sign up</button>
                    </div>
                </header>
                <section class="login-signUp-interface">
                    <div id="endAnimation" class="frame-153 respon-frame-153">
                        <div class="frame-159">
                            <h1 class="login-headline mg-none">Log In</h1>
                            <img class="login-underline" src="./IMG/vector-5.png">
                        </div>
                        <form class="login-container" onsubmit="logInUser(); return false">
                            <div class="frame-14">
                                <input type="email" class="frame-157" autocomplete="username" placeholder="Email" id="loginEmail" required>
                                <img class="input-icon" src="./IMG/mail.png"> 
                            </div>
                            <div class="passwordAndLabel">
                                <div class="frame-14" onclick="visibility()" id="loginPasswordFrame">
                                    <input type="password" autocomplete="current-password" class="frame-157" placeholder="Password" id="loginPassword" required>
                                    <img class="input-icon curser-pointer" id="pass-status" src="./IMG/lock.png" onclick="viewPassword()">                      
                                    <img class="curser-pointer input-icon d-none" id="pass-status-eye" src="./IMG/visibility_off.png" onclick="viewPassword()">                      
                                </div>
                                <label class="falsePassword" for="loginPassword">Incorrect username or password. Please try again!</label>
                            </div>                       
                            <label class="remember-me">
                            <div class="check-box" id="checkbox" onclick="checkboxActivate()">
                                <input class="checkbox" type="checkbox">
                            </div>
                                <span class="checkbox-text">Remember me</span>
                            </label>
                            <div class="frame-176">
                                <div class="loginButtons mg-none">
                                    <button class="login-btn log-in-side-button btn-dark-blue" type="submit">Log In</button>
                                    <button class="guest-login-style btn-white" type="button" onclick="guestLogin()">Guest Log In</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <footer class="login-footer">
                        <div class="frame-156-footer">
                            <p>Not a Join user?</p>
                            <button class="log-in-side-button btn-dark-blue" onclick="signUp()">Sign up</button>
                        </div>
                        <div class="legalBtn-container">
                            <button onclick="privacyPage()" class="log-in-side-button text-button">Privacy Policy</button>
                            <button onclick="legalPage()" class="log-in-side-button text-button">Legal notice</button>
                        </div>
                    </footer>
                </section>
            `
        }
        /**
         * Die Methode stellt die Logo Animation am anfang dar
         * @returns {string}
         */
    startAnimation() {
        body.innerHTML = "";
        return /*html*/ `
                    <div id="logoOverlay" class="logo-animation-overlay"></div>
                    <div id="logoMain" class="logoAnimationImg"></div>
            `
    }
    startAnimationOverlay() {
        setTimeout(() => {
            document.getElementById('logoOverlay').classList.add('d-none');
        }, 1000);
    }
    logoLogin() {
        return /*html*/ `
                <div id="logoMain" class="logoAnimationImg2"></div>
    
            `
    }
    loginLayout() {
        return /*html*/ `
                <div id="logoArea"></div>
                <div id="windowArea"></div>        
            `
    }
    signUpWindow() {
        return /*html*/ `
            <div class="login-signUp-interface">
                <div id="logoMain" class="logoAnimationImg2"></div>
                <div id="signUpWindow" class="signUpWindow respon-frame-153">
                        <a class="backBtn" onclick="backToStart()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M10.4373 14.6667H25.3333C26.0696 14.6667 26.6666 15.2637 26.6666 16.0001C26.6666 16.7364 26.0696 17.3334 25.3333 17.3334H10.4373L16.6466 23.5427C17.1672 24.0634 17.1672 24.9074 16.6466 25.4281C16.126 25.9487 15.2819 25.9487 14.7613 25.4281L6.74746 17.4143C5.96642 16.6332 5.96642 15.3669 6.74747 14.5858L14.7613 6.57206C15.2819 6.05144 16.126 6.05144 16.6466 6.57206C17.1672 7.09268 17.1672 7.93677 16.6466 8.45739L10.4373 14.6667Z" fill="#29ABE2"/>
                            </svg>
                        </a>
                        <div class="frame-159 mg-0">
                            <h1 class="login-headline mg-none">Sign Up</h1>
                            <img src="./IMG/vector-5.png">
                        </div>
                        <form onsubmit="createAccount(); return false;">
                            <div class="signUp-container">
                                <div class="frame-14">
                                    <input required type="text" class="frame-157" placeholder="Name" id="signUpInputName">
                                    <img class="input-icon" src="./IMG/person.png"> 
                                </div>
                                <div class="frame-14">
                                    <input autocomplete="username" required type="email" class="frame-157" placeholder="Email" id="signUpInputEmail">
                                    <img class="input-icon" src="./IMG/mail.png"> 
                                </div>
                                <div class="frame-14" onclick="visibility()">
                                    <input minlength="8" autocomplete="new-password" type="password" class="frame-157" placeholder="Password" id="signUpInputPassword">
                                    <img class="input-icon curser-pointer" id="pass-status" src="./IMG/lock.png" onclick="viewPasswordSignUp1()">                      
                                    <img class="curser-pointer input-icon d-none" id="pass-status-eye" src="./IMG/visibility_off.png" onclick="viewPasswordSignUp1()">                      
                                </div>
                                <div class="passwordAndLabel">
                                    <div id="passwordCheckArea" class="frame-14" onclick="visibility()">
                                        <input minlength="8" autocomplete="new-password" type="password" class="frame-157" placeholder="Confirm Password" id="signUpInputPassword2">
                                        <img class="input-icon curser-pointer" id="pass-status" src="./IMG/lock.png" onclick="viewPasswordSignUp2()">                      
                                        <img class="curser-pointer input-icon d-none" id="pass-status-eye" src="./IMG/visibility_off.png" onclick="viewPasswordSignUp2()">                      
                                    </div>
                                    <label class="falsePassword" for="loginPassword">Ups! Something went wrong, try again!</label>
                                </div>
                                <div class="d-flex-mid">
                                    <label id="ppCheck" class="sign-up-privacy-policy">
                                        <div class="check-box" id="checkbox" onclick="policyCheckbox()">
                                            <input class="checkbox" type="checkbox">
                                        </div>
                                        <span class="checkbox-text">I accept the&nbsp;<a class="link-style" onclick="privacyPage()"> Privacy policy</a></span>
                                    </label>
                                </div>
                                <div class="frame-176">
                                    <div class="sign-up-btn loginButtons">
                                    <button class="login-btn btn-dark-blue" type="submit">Sign Up</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                </div>
                <footer class="login-footer">
                    <div class="legalBtn-container">
                        <button onclick="privacyPage()" class="log-in-side-button text-button">Privacy Policy</button>
                        <button onclick="legalPage()" class="log-in-side-button text-button">Legal notice</button>
                    </div>
                </footer>
                <div class="overlay-success" id="overlaySuccessCreateAccount">
                        <div class="successInfoContainer">
                            <h3 class="font-size-normal mg-none">You Signed Up successfully</h3>
                        </div>
                    </div>
            </div>
            `
    }
    forceSignIn(x) {
        this.signedAccount = x;
    }
}
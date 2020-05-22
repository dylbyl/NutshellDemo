import registerDomPrinter from './registerDomPrinter.js'
import registerEventListener from './registerEventListener.js'

//The HTML for the email and password in the modal
const loginForm = () => {
    return `
    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" id="login-email" name="email" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" id="login-password" name="psw" required>

    <button id="login-btn" class="login-btn">Login</button>

    `
}


const nutLogin = {
    //Launches the login modal by changing the display to block
    activateModal() {
        document.querySelector('#login-modal').style.display = 'block';
    },
    //listens for the login button and attempts to log in with that email and password
    loginEventListenter() {
        document.querySelector('#login-btn').addEventListener("click", () => {
            const emailValue = document.querySelector("#login-email").value;
            const passwordValue = document.querySelector("#login-password").value;

            //fetches any user with the an email and password matching the inputs
            fetch(`http://localhost:8088/users?email=${emailValue}&password=${passwordValue}`)
                .then((r) => r.json())
                .then((user) => {
                    //If a user is returned
                    if (user.length != 0) {
                        //Sets the userId in session storage to the id of the user that was fetched, deactivates the modal, and clears the values in the form
                        sessionStorage.setItem("userId", user[0].id);
                        nutLogin.deactivateModal();
                        document.querySelector("#login-email").value = "";
                        document.querySelector("#login-password").value = "";

                        //If it didn't find a match it returns an error message
                    } else {
                        document.querySelector("#login-error-container").innerHTML = "email or password is incorrect!"
                        
                    }
                }
                )

        })
    },
    //Deactiaves the modal by setting the display to none
    deactivateModal() {
        document.querySelector('#login-modal').style.display = 'none';
    },

    registerLinkListener() {
        document.querySelector('#register-link').addEventListener("click", () => {
            
            // Directing the user to the register form page when the site loads
            registerDomPrinter.printRegisterForm()
            document.querySelector(`#register-user-submit`).addEventListener("click", clickEvent => {
                registerEventListener.submitRegisterForm();
        
            })
        })
    },

    //Prints the login form in the modal.  This method is used after an account is successfully registered.
    loginFormPrinter() {
        document.querySelector(`#login-container`).innerHTML = loginForm()
    },

    //Listens for the logout button, sets the userId in session storage to null, and activates the login modal.
    logoutListener() {
        document.querySelector("#logout").addEventListener("click", () => {
            sessionStorage.setItem("userId", null);
            nutLogin.activateModal();
        })
    }

}



export default nutLogin
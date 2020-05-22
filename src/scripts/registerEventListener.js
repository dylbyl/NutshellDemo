// Importing the fetch functions
import registerFetchFunctions from './registerFetchFunctions.js';

// Creating an object for storing the event listener functions
const registerEventListener = {
	submitRegisterForm: () => {
		// Doing checks to see if user input is blank
		let formComplete = false;
		if (document.querySelector(`#register-user-name`).value === '') {
			document.querySelector(`#register-error-container`).innerHTML = `Please enter a username`;
		} else if (document.querySelector(`#register-email`).value === '') {
			document.querySelector(`#register-error-container`).innerHTML = `Please enter a email address`;
		} else if (document.querySelector(`#register-password`).value === '') {
			document.querySelector(`#register-error-container`).innerHTML = `Please enter a password`;
		} else {
			formComplete = true;
		}
		// Creating if check is true or false then running if all user inputs are filled in
		if (formComplete === true) {
			const userName = document.querySelector(`#register-user-name`).value;
			const userEmail = document.querySelector(`#register-email`).value;
			const userPassword = document.querySelector(`#register-password`).value;
			// Creating an object for storing the information in format for the json-server
			const submitUserLogin = {
				email: userEmail,
				username: userName,
				password: userPassword
			};
			// Running submit new user function
			registerFetchFunctions.submitNewUser(submitUserLogin);
		}
	}
};
// Exporing the register event listener functions
export default registerEventListener;

import registerEventListener from './registerEventListener.js';
// Creating an object for storing the register functions
const registerFetchFunctions = {
	submitNewUser: (userObject) => {
		let userBoolean = false;
		let emailBoolean = false;
		registerFetchFunctions
			// Fetching to check if the user name is aleady in database. If it is then set to false, if not it sets to true
			.getAllUsers(userObject.username)
			.then((users) => {
				if (users.length > 0) {
					userBoolean = false;
				} else {
					userBoolean = true;
				}
			})
			// Fetching to check if the email address is already in use
			.then(() => {
				registerFetchFunctions
					.checkUserEmail(userObject.email)
					.then((email) => {
						console.log(email.length);
						if (email.length > 0) {
							emailBoolean = false;
						} else if (email.length === 0) {
							emailBoolean = true;
						}
					})
					// If username and password is not taken then it runs the register call
					.then(() => {
						if (userBoolean === true && emailBoolean === true) {
							fetch(`http://localhost:8088/users`, {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify(userObject)
							}).then(() => {
								document.querySelector(`#output-container`).innerHTML =
									'<p>Registration successful, you may now ! Link this login';
							});
							// If username is taken then prints error message
						} else if (userBoolean === false) {
							document.querySelector(
								`#register-error-container`
							).innerHTML = `The user name you entered is aleady in use, please try again.`;
							// If the email is taken then it prints an error message
						} else if (emailBoolean === false) {
							console.log('test');
							document.querySelector(
								`#register-error-container`
							).innerHTML = `The email address you entered is aleady in use, please try again.`;
						}
					});
			});
	},
	// Creating a function to get username from database
	getAllUsers: (username) => {
		return fetch(`http://localhost:8088/users?username=${username}`).then((r) => r.json());
	},
	// Creating a function to get email address from database
	checkUserEmail: (email) => {
		return fetch(`http://localhost:8088/users?email=${email}`).then((email) => email.json());
	}
};
// Exorting the fetch functions
export default registerFetchFunctions;

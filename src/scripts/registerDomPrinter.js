// Creating a object for storing the functions
const registerDOMPrinter = {
        // Creating a function that prints the register form to the DOM
	printRegisterForm: () => {
        document.querySelector(`#output-container`).innerHTML = `<div id="register-form-container">
        <h3>Register</h3>
        <input type="text" id="register-user-name" placeholder="username">
<input type="text" id="register-email" placeholder="email">      
<input type="password" id="register-password" placeholder="password">    
<button id="register-user-submit">Submit</button> 
<div id="register-error-container"></div></div>
        `;
	}
};
// Exporting the register DOM functions
export default registerDOMPrinter
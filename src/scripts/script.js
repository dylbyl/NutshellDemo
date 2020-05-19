// Importing the chat event listener functions
import chatEventListeners from './chatEventListeners.js';
// Importing the chat api functions
import chatAPI from './chatAPI.js';
// Creating a fake loggin in user
sessionStorage.setItem("userId", 1)
// Creating an event listener for when the user clicks on the chat tab on the nav bar
document.querySelector(`#chat-page`).addEventListener('click', (chatEvent) => {
	chatEventListeners.loadChatPage();
	chatAPI.getUserIDs();
});
document.body.addEventListener('click', (clickEvent) => {
	if (event.target.id.includes(`submit-chat`)) {
		chatEventListeners.submitNewChatMessage()
	}
});

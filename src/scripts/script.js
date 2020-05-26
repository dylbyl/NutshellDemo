import event_eventListener from './event-eventListeners.js';
import nutLogin from './login.js';
import registerEventListener from './registerEventListener.js';

// sessionStorage.setItem("userId", 1)
// sessionStorage.setItem("username", "user1")

if (sessionStorage.getItem('userId') == null) {
	nutLogin.activateModal();
}

nutLogin.loginEventListenter();
nutLogin.registerLinkListener();
nutLogin.logoutListener();
//Calling all event listeners for 'Events'
event_eventListener.eventsPageListener();
event_eventListener.addNewEventListener();
event_eventListener.deleteEventListener();
event_eventListener.editEventListener();
event_eventListener.saveEventListener();

// Importing the chat event listener functions
import chatEventListeners from './chatEventListeners.js';
// Importing the chat api functions
import chatAPI from './chatAPI.js';

// Creating an event listener for when the user clicks on the chat tab on the nav bar
document.querySelector(`#chat-page`).addEventListener('click', (chatEvent) => {
	// Loading the chat page
	chatEventListeners.loadChatPage();
	// Getting user IDs for use in fetch calls and username for the chat
	chatAPI.getUserIDs();
});
// Creating event listeners for the chat functions
document.body.addEventListener('click', (clickEvent) => {
	if (event.target.id.includes(`submit-chat`)) {
		chatEventListeners.submitNewChatMessage();
	} else if (event.target.id.includes(`delete-message`)) {
		chatEventListeners.deleteChatMessageListener();
	} else if (event.target.id.includes(`edit-message`)) {
		chatEventListeners.editChatMessageListener();
	} else if (event.target.id.includes(`save-msg`)) {
		chatEventListeners.saveChatMsgEditListener();
	}
});
// Creating enter key check onkeydown for new chat message and edit chat message so that the use can hit enter to submit a message or save a message
document.getElementById('output-container').onkeydown = function(e) {
	if (e.keyCode == 13) {
		if (event.target.id.includes(`new-chat-message`)) {
			chatEventListeners.submitNewChatMessage();
		} else if (event.target.id.includes(`edit-msg`)) {
			chatEventListeners.saveChatMsgEditListener();
		}
	}
};
// Creating event listeners for enter key press on the register and login screens
document.getElementById(`login-container`).onkeydown = function(e) {
	if (e.keyCode == 13) {
		if (event.target.id.includes(`register-password`)) {
			registerEventListener.submitRegisterForm();
		} else if (event.target.id.includes(`login-password`)) {
			event.preventDefault();
			document.getElementById('login-btn').click();
		}
	}
};

//Imports functions for DOM printing and EventListeners
import newsPrinterFunctions from './newsPrinter.js';
import newsListenFunctions from './newsListeners.js';
import tasksEvents from './tasksEventListener.js';

//If the News link in the Nav Bar is clicked, call a function to print the News section
document.querySelector('#news-page').addEventListener('click', function() {
	newsPrinterFunctions.printInitialPage();
});

//Checks which buttons are being clicked in the News section
document.querySelector("body").addEventListener("click", function() {
        newsListenFunctions.checkButton();
    })

tasksEvents.tasksEventListener();

tasksEvents.tasksPageEventListeners();

tasksEvents.taskEditKeypressListener();

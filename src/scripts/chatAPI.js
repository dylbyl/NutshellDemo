// Importing the screen functions from chatScreenFunctions
import chatScreenFunctions from './chatScreenFunctions.js';
// Creating a variable for the user IDs of the users in the system to
// be used when comparing / looping through IDs for messages the user can edit or dlete
let chatUserIDs;
// Creating an object for storing the chat api functions
const chatAPI = {
	// Get user IDs first and store them?
	getUserIDs: () => {
		fetch(`http://localhost:8088/users`)
			.then((users) => users.json())
			.then((parsedUsers) => {
				chatUserIDs = parsedUsers;
			})
			.then(() => {
				chatAPI.getChatMessages();
			});
	},
	// Creating a function to get all the chat messages
	getChatMessages: () => {
		// Setting current user as userId from session storage
		let currentUser = parseInt(sessionStorage.userId, 10);
		// Fetching all the messages
		fetch(`http://localhost:8088/messages`).then((messages) => messages.json()).then((parsedMessages) => {
			// Declaring the chat username to the username of the userID
			let chatUserName;
			parsedMessages.forEach((element) => {
				// Getting the users ID from the fetch performed when site loads
				chatUserIDs.forEach((userElement) => {
					if (userElement.id === element.userId) {
						chatUserName = userElement.username;
					}
				});
				// Running conditional to print edit/delete buttons of logged in user
				if (element.userId === currentUser) {
					document.querySelector(`#chat-container`).innerHTML += `<p id="chat-msg-${element.id}">
                    ${chatUserName} - ${element.time}: ${element.message}<button id="edit-message-${element.id}" class="edit-chat-message">Edit</button>
                    <button id="delete-message-${element.id}" class="delete-chat-message">Delete</button>
                    </p>`;
				} else {
					document.querySelector(`#chat-container`).innerHTML += `<p id="chat-msg-${element.id}">
                ${chatUserName} - ${element.time}: ${element.message}</p>`;
				}
			});
			// Setting scroll bar to be at the bottom of the chat box
			chatScreenFunctions.setScrollBar();
		});
	},
	// Creating a function to post a new chat message
	postNewMessage: (newmessage) => {
		fetch('http://localhost:8088/messages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newmessage)
		}).then(() => {
			chatScreenFunctions.clearScreen();
			chatScreenFunctions.clearChatMessageInput();
			chatAPI.getChatMessages();
		});
	},
	// Creating a function to delete a chat message
	deleteChatMessage: (messageID) => {
		fetch(`http://localhost:8088/messages/${messageID}`, {
			method: 'DELETE'
		}).then(() => {
			chatScreenFunctions.clearScreen();
			chatAPI.getChatMessages();
		});
	},
	// Creating a function to get a single chat message
	getSingleChatMessage: (messageID) => {
		return fetch(`http://localhost:8088/messages/${messageID}`)
			.then((message) => message.json())
			.then((parsedMesage) => {
				chatAPI.editChatMessage(messageID, parsedMesage.message);
			});
	},
	// Creating a function to edit a chat message
	editChatMessage: (messageID, chatMessage) => {
		let splitMessage = chatMessage;
		splitMessage = splitMessage.substring(splitMessage.indexOf(')') + 1);
		document.querySelector(`#chat-msg-${messageID}`).innerHTML = `
		<p>
		<input type="text" value="${splitMessage}" id="edit-msg-${messageID}">
		<button id="save-msg-${messageID}">Save Changes</button>
		<p>
		`;
	},
	// Creating a function to submit the new edited message
	submitChatMessageEdit: (messageID) => {
		let chatMessageToSave = document.querySelector(`#edit-msg-${messageID}`).value;
		// Setting date/time
		let today = new Date();
		let time =
			today.getDate() +
			'/' +
			today.getMonth() +
			'/' +
			today.getFullYear() +
			' at ' +
			today.getHours() +
			`:` +
			('0' + today.getMinutes()).slice(-2) +
			`:` +
			today.getSeconds();
		// Adding time stamp to the chat message if edited
		chatMessageToSave = {
			message: `(edited on ${time}) ${chatMessageToSave}`
		};
		fetch(`http://localhost:8088/messages/${messageID}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(chatMessageToSave)
		}).then(() => {
			chatScreenFunctions.clearScreen();
			chatAPI.getChatMessages();
		});
	}
};
// Exporting the chat api functions
export default chatAPI;

// Importing the chat api functions
import chatAPI from './chatAPI.js';
// Creating an object for the event listener functions
const chatEventListeners = {
	// Creating a function to load the chat page
	loadChatPage: () => {
		document.querySelector(`#output-container`).innerHTML = `
		<div id="chat-output">
        <h3 id="chat-heading">Chat</h3>
        <div id="chat-container"></div>
        <div id="chat-buttons"></div>
        <div id="new-chat-msg-form">
        <input type="text"id="new-chat-message">
        <button id="submit-chat-msg">Send</button>        
		</div>
		</div>
        `;
	},
	// Creating submit chat message event listener function
	submitNewChatMessage: () => {
		const chatMessage = document.querySelector(`#new-chat-message`).value;
		// Setting date/time for time stamp
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
		const messageToSend = {
			userId: 1,
			message: chatMessage,
			time: time
		};
		// Calling postNewMessage to send the api calls to post the message
		chatAPI.postNewMessage(messageToSend);
	},
	// Creating a delete message listener function
	deleteChatMessageListener: () => {
		const messageID = event.target.id.split('-')[2];
		chatAPI.deleteChatMessage(messageID);
	},
	// Creating a edit chat message listener for when the user clicks edit
	editChatMessageListener: () => {
		const messageID = event.target.id.split(`-`)[2];
		chatAPI.getSingleChatMessage(messageID);
	},
	// Creating a save message listener for when the user clicks save
	saveChatMsgEditListener: () => {
		const messageID = event.target.id.split(`-`)[2];
		chatAPI.submitChatMessageEdit(messageID);
	}
};
// Exporting the event listener functions
export default chatEventListeners;

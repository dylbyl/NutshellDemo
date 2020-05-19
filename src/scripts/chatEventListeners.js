// Importing the chat api functions
import chatAPI from './chatAPI.js';
// Creating an object for the event listener functions
const chatEventListeners = {
	// Creating a function to load the chat page
	loadChatPage: () => {
		document.querySelector(`#output-container`).innerHTML = `
        <h3>Chat</h3>
        <div id="chat-container"></div>
        <div id="chat-buttons"></div>
        <div id="new-chat-msg-form">
        <h4>Submit New Message</h4>
        <input type="text"id="new-chat-message">
        <button id="submit-chat-msg">Send</button>        
        <div>
        `;
	},
	submitNewChatMessage: () => {
		const chatMessage = document.querySelector(`#new-chat-message`).value;
		let today = new Date();
		let time = today.getHours() + `:` + today.getMinutes() + `:` + today.getSeconds();
		const messageToSend = {
			userId: 1,
			message: chatMessage,
			time: time
		};
		console.log(messageToSend);
		chatAPI.postNewMessage(messageToSend);
	}
};

export default chatEventListeners;

// Make a function for checking logged in users ID versus posts and if id matches then have edit/delete buttons next to the message

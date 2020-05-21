// Declaring an object for the screen functions
const chatScreenFunctions = {
	clearScreen: () => {
		// Creating a function for clearing the screen
		document.querySelector(`#chat-container`).innerHTML = ``;
	},
	// Creating a function to set the chat text box scroll bar at the bottom on load
	setScrollBar: () => {
		let scrollDiv = document.getElementById(`chat-container`);
		scrollDiv.scrollTop = scrollDiv.scrollHeight;
	},
	// Creating a function to clear the chat message input box
	clearChatMessageInput: () => {
		document.querySelector(`#new-chat-message`).value = '';
	}
};
// Exporting the chat screen functions
export default chatScreenFunctions;

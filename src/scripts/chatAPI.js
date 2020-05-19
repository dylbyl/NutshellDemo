// Make a variable for the users
// Loop through the users and use and if statement to get username
let chatUserIDs;
// Creating a clear screen function
function clearScreen() {
	document.querySelector(`#chat-container`).innerHTML = ``;
}
// Creating a function to start scroll bar at the bottom
function setScrollBar(){
let scrollDiv = document.getElementById(`chat-container`)
scrollDiv.scrollTop = scrollDiv.scrollHeight
}
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
		fetch(`http://localhost:8088/messages`).then((messages) => messages.json()).then((parsedMessages) => {
			parsedMessages.forEach((element) => {
				let chatUserName;
				chatUserIDs.forEach((newelement) => {
					if (newelement.id === element.userId) {
						chatUserName = newelement.username;
					}
                });
                let currentUser = parseInt(sessionStorage.userId, 10)
                console.log(currentUser)
                console.log(element.userId)
                if(element.userId === currentUser){
                    document.querySelector(`#chat-container`).innerHTML += `<p>
                    ${chatUserName} - ${element.time}: ${element.message}<button id="edit-message-${element.id}">Edit</button>
                    <button id="delete-message-${element.id}">Delete</button>
                    </p>`;
                    console.log("Hit the if")
                } else{
                    document.querySelector(`#chat-container`).innerHTML += `<p>
                ${chatUserName} - ${element.time}: ${element.message}</p>`;
                console.log('why')
                }
			}); setScrollBar()
		});
	},
	postNewMessage: (newmessage) => {
		fetch('http://localhost:8088/messages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newmessage)
		}).then(() => {
			clearScreen();
			chatAPI.getChatMessages();
		});
	}
};
// Exporting the chat api functions
export default chatAPI;

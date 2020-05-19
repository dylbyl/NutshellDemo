import event_domPrinter from "./event-domPrinter.js"
import event_apiManager from "./event-apiManager.js"

const event_eventListener = {
    eventsPageListener() {
        document.querySelector("#events-page").addEventListener("click", function(){
            if(event.target.id === "events-page"){
                // event_domPrinter.createLoginBar()
                document.querySelector("#output-container").innerHTML += event_domPrinter.createNewEventForm()
                event_domPrinter.createEventsContainer()
                event_apiManager.getAllEvents()
            }
        })
    },
    // login () {
    //     document.querySelector("#output-container").addEventListener("click", function() {
    //         if(event.target.id === "login-btn"){
    //             const usernameValue = document.querySelector("#username-input").value;
    //             const passwordValue = document.querySelector("#password-input").value;
    //             event_apiManager.loginAccount(usernameValue, passwordValue)
    //         }
    //     })
    // },
    addNewEventListener(){
        document.querySelector("#output-container").addEventListener("click", function(){
            if(event.target.id === "add-event-btn"){
                event_apiManager.addEvent()
            }
        })
    },
    deleteEventListener(){
        document.querySelector("#output-container").addEventListener("click", function(){
            if(event.target.id.includes("delete-btn")){
                event_apiManager.deleteEvent()
            }
        })
    },
    editEventListener(){
        document.querySelector("#output-container").addEventListener("click", function(){
            if(event.target.id.includes("edit-btn")){
                const eventID = event.target.id.split("-")[2]
                event_apiManager.editNewEvent(eventID)
            }
        })
    },
    saveEventListener(){
        document.querySelector("#output-container").addEventListener("click", function(){
            if(event.target.id.includes("save-btn")){
                const eventID = event.target.id.split("-")[2]
                event_apiManager.saveEditedEvent(eventID)
            }
        })
    }
}

export default event_eventListener
import event_domPrinter from "./event-domPrinter.js"
import event_apiManager from "./event-apiManager.js"

const event_eventListener = {
    //If 'Events' link is clicked in the Nav bar, this event listener creates a page header, a form to add an event, creates a container to print events, and prints the events from JSON
    eventsPageListener() {
        document.querySelector("#events-page").addEventListener("click", function(){
            if(event.target.id === "events-page"){
                event_domPrinter.createPageHeader()
                event_domPrinter.createAddEventButton()
                event_domPrinter.createEventsContainer()
                event_apiManager.getEventsByMonth()
            }
        })
    },
    //If "Add New Event" button is clicked, this event listener calls the fetch call in apiManager to add an event to JSON and prints it to the DOM
    addFormEventListener(){
        document.querySelector("#output-container").addEventListener("click", function(){
            if(event.target.id === "add-form-btn"){
                document.querySelector(".event-form-column").innerHTML = event_domPrinter.createNewEventForm()
            }
        })
    },
    addNewEventListener(){
        document.querySelector("#output-container").addEventListener("click", function(){
            if(event.target.id === "add-event-btn"){
                event_apiManager.addEvent()
            }
        })
    },
    cancelEventListener(){
        document.querySelector("#output-container").addEventListener("click", function(){
            if(event.target.id === "cancel-btn"){
                document.querySelector(".event-form-column").innerHTML = `<button class="btn btn-info shadow p-3 mb-5 rounded" id="add-form-btn">Add New Event</button>`
            }
        })
    },
    //If "Delete" button is clicked, this event listener calls the fetch call in apiManager to delete the event from JSON and reprints existing events to the DOM
    deleteEventListener(){
        document.querySelector("#output-container").addEventListener("click", function(){
            if(event.target.id.includes("delete-btn")){
                event_apiManager.deleteEvent()
            }
        })
    },
    //If "Edit" button is clicked, this event listener calls the fetch call in apiManager to edit an event
    editEventListener(){
        document.querySelector("#output-container").addEventListener("click", function(){
            if(event.target.id.includes("edit-btn")){
                const eventID = event.target.id.split("-")[2]
                event_apiManager.editNewEvent(eventID)
            }
        })
    },
    //If "Save" button is clicked, this event listener calls the fetch call in apiManager to save the edited event
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
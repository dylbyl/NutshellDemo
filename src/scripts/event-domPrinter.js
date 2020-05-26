
const event_domPrinter = {
    //Page Header
    createPageHeader () {
        document.querySelector("#output-container").innerHTML = `<div class = "row"><header><h1>Events</h1></header></div>`
    },
    createAddEventButton(){
        document.querySelector("#output-container").innerHTML += `<div class="row eventPage-container"><div class="col event-form-column"><button class="btn btn-info shadow p-3 mb-5 rounded" id="add-form-btn">Add New Event</button></div></div>`
    },
    //Form to add a new event
    createNewEventForm () {
        const newEventForm =`
        <form id="event-form" class="shadow-lg p-3 mb-5 rounded">
            <fieldset>
            <label for="event-name">Event Name:</label>
            <input type="text" id="event-name" placeholder="Event Name">
            </fieldset>
            <fieldset>
            <label for="event-date">Event date and time:</label>
            <input type="datetime-local" id="event-date" placeholder="Event Date"><span style="color:tomato;"><em> Required</em></span>
            </fieldset>
            <fieldset>
            <label for="event-location">Event location:</label>
            <input type="text" id="event-location" placeholder="Event Location">
            </fieldset>
            <fieldset>
            <label for="event-description">Event description:</label>
            <input type="text" id="event-description">
            </fieldset>
        </form>
        <button class="btn btn-info shadow p-3 mb-5 rounded" id="add-event-btn">Add Event</button>
        <button class="btn btn-info shadow p-3 mb-5 rounded" id="cancel-btn">Cancel</button>
        `
        return newEventForm
    },
    //Container to hold all events
    createEventsContainer(){
        return document.querySelector(".eventPage-container").innerHTML += `<div class = "col event-container-column"><section id="events-container"></section></div>`
    },
    //Function to clear container to "refresh" page after an add, delete, edit, or save change
    clearEvents(){
        return document.querySelector("#events-container").innerHTML = ""
    },
    //Function to print each event card to the DOM
    printEvents(events){
        const eventsHTMLString = document.querySelector("#events-container").innerHTML += `
        <article id="event-card" class="row event-card shadow p-3 mb-5 rounded">
            <div id="event-card-${events.id}" >
                <h2>${events.name}</h2>
                <h4>Date: ${events.date}</h4>
                <h5>Time: ${events.time}</h5>
                <h5>Location: ${events.location}</h5>
                <p>Description: ${events.description}</p>
                <button id="delete-btn-${events.id}" class="btn btn-info">Delete Event</button>
                <button id="edit-btn-${events.id}" class="btn btn-info">Edit Event</button>
            </div>
        </article>`
        return eventsHTMLString;
    },
    //Function to create an object from the values inputted into the add new event form
    addNewEvent(){
        const nameValue = document.querySelector("#event-name").value
        const dateValue = document.querySelector("#event-date").value.split("T")[0]
        const timeValue = document.querySelector("#event-date").value.split("T")[1]
        const locationValue = document.querySelector("#event-location").value
        const descriptionValue = document.querySelector("#event-description").value

        const newEventObject ={
            name: nameValue,
            date: dateValue,
            time: timeValue,
            location:locationValue,
            description:descriptionValue,
            userId: sessionStorage.getItem("userId")
        }
        return newEventObject;
    },
    //Function to build an edit event form
    buildEventEditForm(event){
        const editEventForm = document.querySelector(`#event-card-${event.id}`).innerHTML = `
        <form>
        <fieldset>
            <label for="edit-event-name">Event Name:</label>
            <input type="text" id="edit-event-name" value="${event.name}" placeholder="Event Name" autofocus>
        </fieldset>
        <fieldset>
            <label for="edit-event-date">Event Date:</label>
            <input type="text" id="edit-event-date" value="${event.date}" placeholder="Event Date" autofocus>
        </fieldset>
        <fieldset>
            <label for="edit-event-time">Event Time:</label>
            <input type="text" id="edit-event-time" value="${event.time}" placeholder="Event Time" autofocus>
        </fieldset>
        <fieldset>
            <label for="edit-event-location">Event Location:</label>
            <input type="text" id="edit-event-location" value="${event.location}" placeholder="Event Location" autofocus>
        </fieldset>
        <fieldset>
            <label for="edit-event-description">Event description:</label>
            <input id="edit-event-description" value="${event.description}" rows="4" cols="50">
        </fieldset>
        </form>
        <button id="save-btn-${event.id}" class="btn btn-info">Save Event</button>`
        return editEventForm;
    },
    //Function to save changes made in the edit event form
    saveEditedEventObject(eventID){
        const editedEventObject = {
            id: eventID,
            name: document.querySelector("#edit-event-name").value,
            date: document.querySelector("#edit-event-date").value,
            time: document.querySelector("#edit-event-time").value,
            location: document.querySelector("#edit-event-location").value,
            description: document.querySelector("#edit-event-description").value,
            userId: sessionStorage.getItem("userId")
        }
        return editedEventObject
    }
}

export default event_domPrinter 

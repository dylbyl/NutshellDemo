
const event_domPrinter = {
    createNewEventForm () {
        const newEventForm =`
        <header><h1>Events</h1></header><hr>
        <form id="event-form">
            <fieldset>
            <label for="event-name">Event Name:</label>
            <input type="text" id="event-name" placeholder="Event Name">
            </fieldset>
            <fieldset>
            <label for="event-date">Event date:</label>
            <input type="date" id="event-date" placeholder="Event Date">
            </fieldset>
            <fieldset>
            <label for="event-location">Event location:</label>
            <input type="text" id="event-location" placeholder="Event Location">
            </fieldset>
            <fieldset>
            <label for="event-description">Event description:</label>
            <input id="event-description">
            </fieldset>
        </form>
        <button class="btn btn-info" id="add-event-btn">Add New Event</button>
        `
        return newEventForm
    },
    createEventsContainer(){
        return document.querySelector("#output-container").innerHTML += `<section id="events-container"></section>`
    },
    clearEvents(){
        return document.querySelector("#events-container").innerHTML = ""
    },
    printEvents(events){
        const eventsHTMLString = document.querySelector("#events-container").innerHTML += `
        <article id="event-card" class="row card">
            <div id="event-card-${events.id}" class= "col">
                <h2>${events.name}</h2>
                <h4>Date: ${events.date}</h4>
                <h5>Location: ${events.location}</h5>
                <p>Description: ${events.description}</p>
                <button id="delete-btn-${events.id}" class="btn btn-info">Delete Event</button>
                <button id="edit-btn-${events.id}" class="btn btn-info">Edit Event</button>
            </div>
        </article>`
        return eventsHTMLString;
    },
    addNewEvent(){
        const nameValue = document.querySelector("#event-name").value
        const dateValue = document.querySelector("#event-date").value
        const locationValue = document.querySelector("#event-location").value
        const descriptionValue = document.querySelector("#event-description").value

        const newEventObject ={
            name: nameValue,
            date: dateValue,
            location:locationValue,
            description:descriptionValue,
            // userId: username.id
        }
        return newEventObject;
    },
    buildEventEditForm(event){
        const editEventForm = document.querySelector(`#event-card-${event.id}`).innerHTML = `
        <form>
        <fieldset>
            <label for="edit-event-name">Event Name:</label>
            <input type="text" id="edit-event-name" value="${event.name}" placeholder="Event Name" autofocus>
        </fieldset>
        <fieldset>
            <label for="edit-event-date">Date:</label>
            <input type="date" id="edit-event-date" value="${event.date} placeholder="Event Date" autofocus>
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
    formatDate(date){
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');            
        let day = date.getDate().toString().padStart(2, '0');
  
        return month + '/' + day + '/' + year;
    },
    saveEditedEventObject(eventID){
        const editedEventObject = {
            id: eventID,
            name: document.querySelector("#edit-event-name").value,
            date: document.querySelector("#edit-event-date").value,
            location: document.querySelector("#edit-event-location").value,
            description: document.querySelector("#edit-event-description").value
        }
        return editedEventObject
    },
    // createLoginBar(){
    //     document.querySelector("#output-container").innerHTML = `
    //     <form id="login-data">
    //         <input type= "text" id="username-input" placeholder="Username">
    //         <input type= "password" id="password-input" placeholder="Password">
    //     </form>
    //     <button type="submit" id="login-btn">Login</button>`
    // }
}

export default event_domPrinter 

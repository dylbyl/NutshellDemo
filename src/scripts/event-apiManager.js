import event_domPrinter from "./event-domPrinter.js"

const event_apiManager = {
    //Fetch and print all events
    getAllEvents(){
        return fetch(`http://localhost:8088/events`)
        .then(r => r.json())
        .then(parsedEvents => {
            //Sort date and time in ascending order
            parsedEvents.sort((a, b) => {          
                   if (a.date === b.date) {
                      return parseInt(a.time) - parseInt(b.time);
                   }
                   return a.date > b.date ? 1 : -1;
                });

            parsedEvents.forEach(event =>{
                //Create today's date
                var today = new Date()
                today = `${today.getFullYear()}-${(today.getMonth()+ 1) > 9 ? "" + (today.getMonth()+ 1): "0" + (today.getMonth()+ 1)}-${today.getDate() > 9 ? "" + today.getDate(): "0" + today.getDate()}`
                //Print events only if they occur today or in the future
                if(event.date >= today){
                    event_domPrinter.printEvents(event)
                }
            })
        })
    },
    //Fetch to add a new event
    addEvent(){
        return fetch("http://localhost:8088/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event_domPrinter.addNewEvent())
        }).then(() => {
            event_domPrinter.clearEvents()
            event_apiManager.getAllEvents()
        })
    },
    //Fetch to delete an event
    deleteEvent(){
        const primaryKey = event.target.id.split("-")[2];
        return fetch(`http://localhost:8088/events/${primaryKey}`, {
            method: "DELETE",
        }).then(() => {
            event_domPrinter.clearEvents()
            event_apiManager.getAllEvents()
        }) 
    },
    //Fetch to build edit form for event
    editNewEvent(id){
        return fetch(`http://localhost:8088/events/${id}`)
            .then(r => r.json())
            .then(eventToBeEdited => {
                event_domPrinter.buildEventEditForm(eventToBeEdited)                    
            })
    },
    //Fetch to save changes made on edit form for event
    saveEditedEvent(id){
        return fetch(`http://localhost:8088/events/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event_domPrinter.saveEditedEventObject(id))
        }).then(() => {
            event_domPrinter.clearEvents()
            event_apiManager.getAllEvents()
        }) 
    },
    filterEventsByMonth(){
        return fetch(`http://localhost:8088/events/`)
        .then(r => r.json())
        .then(parsedEvents => {
            const dateArray = parsedEvents.map(event => event.date)
            const monthArray = dateArray.map(date => date.split("-")[1])
            console.log(monthArray)
        })
    }
}

export default event_apiManager
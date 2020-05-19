import event_domPrinter from "./event-domPrinter.js"

const event_apiManager = {
    getAllEvents(){
        return fetch(`http://localhost:8088/events`)
        .then(r => r.json())
        .then(parsedEvents => {
            console.log(parsedEvents.sort((a, b) => (a.date > b.date) ? 1: -1))

            parsedEvents.forEach(event =>{
                var today = new Date()
                today = `${today.getFullYear()}-${(today.getMonth()+ 1) > 9 ? "" + (today.getMonth()+ 1): "0" + (today.getMonth()+ 1)}-${today.getDate() > 9 ? "" + today.getDate(): "0" + today.getDate()}`

                if(event.date > today){
                    event_domPrinter.printEvents(event)
                }
            })
        })
    },
    addEvent(){
        // event_domPrinter.addNewEvent.userId = sessionStorage.getItem("userId")
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
    deleteEvent(){
        const primaryKey = event.target.id.split("-")[2];
        return fetch(`http://localhost:8088/events/${primaryKey}`, {
            method: "DELETE",
        }).then(() => {
            event_domPrinter.clearEvents()
            event_apiManager.getAllEvents()
        }) 
    },
    editNewEvent(id){
        // document.querySelector(`#event-card-${id}`).innerHTML = ""
        return fetch(`http://localhost:8088/events/${id}`)
            .then(r => r.json())
            .then(eventToBeEdited => {
                event_domPrinter.buildEventEditForm(eventToBeEdited)                    
            })
    },
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
    // loginAccount(usernameValue, passwordValue){
    //     return fetch(`http://localhost:8088/users?username=${usernameValue}`)
    //     .then(r => {
    //         console.log(r.status)
    //         if(r.status === 400){
    //             return window.alert(`I'm sorry! The username you entered is not in our system. Please try again!`)
    //         }
    //         else{return r.json()}
    //     })
    //     .then(user => {
    //         if (passwordValue === user[0].password){
    //             sessionStorage.setItem("userId", user[0].id);
    //             fetch(`http://localhost:8088/events/?userId=${sessionStorage.getItem("userId")}`)
    //                 .then(r => r.json())
    //                 .then(parsedEvents => {
    //                     event_domPrinter.clearEvents()
    //                     parsedEvents.forEach(event =>{
    //                         event_domPrinter.printEvents(event)
    //                     })
    //                 })
    //         }
    //         else{
    //             window.alert(`I'm sorry! The password you entered does not exist with the username:           ${usernameValue}
    //                 Please try again!`)
    //         }
    //         // TODO: handle errors if user enters username that doesn't exist
    //         // TODO: think about how to register new users
            
    //     })
    // }
}

export default event_apiManager
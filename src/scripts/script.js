import event_domPrinter from "./event-domPrinter.js"
import event_eventListener from "./event-eventListeners.js"
import event_apiManager from "./event-apiManager.js"

sessionStorage.setItem("userId", "4")

event_eventListener.eventsPageListener()
// event_eventListener.login()
event_eventListener.addNewEventListener()
event_eventListener.deleteEventListener()
event_eventListener.editEventListener()
event_eventListener.saveEventListener()


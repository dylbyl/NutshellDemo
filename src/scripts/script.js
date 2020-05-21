import event_eventListener from "./event-eventListeners.js"
import newsPrinterFunctions from "./newsPrinter.js";
import newsListenFunctions from "./newsListeners.js"

sessionStorage.setItem("userId", 1)

//Calling all event listeners for 'Events'
event_eventListener.eventsPageListener()
event_eventListener.addNewEventListener()
event_eventListener.deleteEventListener()
event_eventListener.editEventListener()
event_eventListener.saveEventListener()

//If the News link in the Nav Bar is clicked, call a function to print the News section
document.querySelector("#news-page").addEventListener("click", function() {
    newsPrinterFunctions.printInitialPage();
})

document.querySelector("#output-container").addEventListener("click", function() {
        newsListenFunctions.checkButton();
    })

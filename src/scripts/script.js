import newsPrinterFunctions from "./newsPrinter.js";
import newsListenFunctions from "./newsListeners.js"

sessionStorage.setItem("userId", 1)
//If the News link in the Nav Bar is clicked, call a function to print the News section
document.querySelector("#news-page").addEventListener("click", function() {
    newsPrinterFunctions.printInitialPage();
})

document.querySelector("#output-container").addEventListener("click", function() {
        newsListenFunctions.checkButton();
    })

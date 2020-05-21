import newsPrinterFunctions from "./newsPrinter.js";
import newsAPIFunctions from "./newsAPIManager.js";

//A function used to check the id of dynamically generated buttons, and calls their appropriate action functions
const newsListenFunctions = {
    checkButton : () => {
        //Runs when the user clicks a button to save a new article
        if (event.target.id.includes("begin-add")){
            newsPrinterFunctions.printAddForm();
        }
        //Runs when the user clicks an edit button
        else if (event.target.id.includes("edit-news")){
            // newsPrinterFunctions.printInitialPage();
            newsPrinterFunctions.printEditForm();
        }
        //Runs when the user clicks a delete button
        else if (event.target.id.includes("delete-news")){
            newsAPIFunctions.deleteArticleFromAPI(event.target.id.split("-")[2])
        }
        //Runs when the user confirms the addition of a new article
        else if (event.target.id.includes("add-news")){
            newsAPIFunctions.addArticleToAPI();
        }
        //Runs when the user confirms the edit of a new article
        else if (event.target.id.includes("adjusted-news")){
            newsAPIFunctions.editArticleInAPI(event.target.id.split("-")[3]);
        }
        //Runs when the user clicks any cancel button, refreshes the page to its default state
        else if (event.target.id.includes("cancel-news")){
            newsPrinterFunctions.printInitialPage();
        }
        //Runs when the user clicks on a tag for a news story
        else if (event.target.id.includes("tag-link")){
            newsPrinterFunctions.printTaggedArticles();
        }
        //When tag buttons are clicked while editing an article, changes a CSS class and deletes/adds the tag to the article
        else if(event.target.classList.contains("tag-btn")){
            if(event.target.classList.contains("btn-primary")){
                event.target.classList.remove("btn-primary")
                newsAPIFunctions.deleteTagFromArticle();
            }else{
                event.target.classList.add("btn-primary")
                newsAPIFunctions.addTagToArticle();
            }
        }
        
    }
}

export default newsListenFunctions
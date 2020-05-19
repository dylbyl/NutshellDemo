import newsAPIFunctions from "./newsAPIManager.js"

const newsPrinterFunctions = {
    //Prints the initial News page
    //This function is also called later to return the page to its default state when a Cancel button is clicked
    printInitialPage : () => {
        document.querySelector("#output-container").innerHTML = `
        <section id="add-news-container">
            <a href="#" class="btn btn-primary news-btn" id="begin-add-btn">Save a News Article</a>
        </section>
        <section id="news-results-container"></section>
        `

        //Calls a function to print all saved news articles
        printAllArticles();
    },

    //Is called when the Save Article button is clicked, generates a form to add a new article to the API
    printAddForm : () => {
        document.querySelector("#add-news-container").innerHTML = `
            <input type="text" class="news-input-bar" id="title-input" placeholder="Article Title">
            <input type="text" class="news-input-bar" id="synopsis-input" placeholder="Article Description">
            <input type="text" class="news-input-bar" id="url-input" placeholder="Article Link">
            <input type="text" class="news-input-bar" id="tag-input" placeholder="Input tags, separated by commas">
            <br>
            <a href="#" class="btn btn-primary news-btn" id="add-news-btn">Save Article</a>
            <a href="#" class="btn btn-primary news-btn" id="cancel-news-btn">Cancel</a>
        `
    },
    
    //When the user clicks an edit button, this replaces the clicked card with an Edit card, auto-populating the card with info from the clicked entry
    printEditForm : () => {
        //Finds the news article to edit and pulls it from the API
        const idToEdit = event.target.id.split("-")[2]
        newsAPIFunctions.fetchSingleArticleFromAPI(idToEdit)
        .then(response => {
            //Creates a string from the tags array in the API object
            let tagString = ""

            for (let i = 0; i < response.tags.length; i++){
                //If there is only one item in the tags array, or this is the last item, simply adds the tag to the string
                if (i === response.tags.length - 1){
                    tagString += response.tags[i]
                }
                //Otherwise, it adds the tag to a string followed by a comma and space
                else{
                    tagString += `${response.tags[i]}, `
                }
            }

            //Prints the Edit card, populated with info from the API and the above tag string
            document.querySelector(`#news-result-${idToEdit}`).innerHTML = `
            <div class="card news-card" style="width: 23rem;">
                <div class="card-body">
                    <input type="text" class="news-input-bar news-card-input" id="edit-title-input" value="${response.title}">
                    <input type="text" class="news-input-bar news-card-input" id="edit-synopsis-input" value="${response.synopsis}">
                    <input type="text" class="news-input-bar news-card-input" id="edit-url-input" value="${response.url}"><br>
                    <input type="text" class="news-input-bar" id="tag-input" value="${tagString}">
                    <a href="#" class="btn btn-primary news-btn" id="adjusted-news-btn-${idToEdit}">Save Changes</a>
                    <a href="#" class="btn btn-primary news-btn" id="cancel-news-btn">Cancel</a>
                </div>
            </div>
            `
        })
    },

    //Is called only when a tag is clicked on a news article card
    printTaggedArticles : () => {
        //Pulls the innerHTML of the tag link that was clicked. This will be a single tag, as they were separated by a comma when input by the user
        const tagToFind = document.querySelector(`#${event.target.id}`).innerHTML
        //Adds a button to stop filtering by tag. This is functionally the same as the Cancel button found elsewhere
        document.querySelector("#add-news-container").innerHTML = `
        <a href="#" class="btn btn-primary news-btn" id="begin-add-btn">Save a News Article</a>
        <a href="#" class="btn btn-primary news-btn" id="cancel-news-btn">Remove All Filters</a>`

        //Clears the results container, then fetches all articles from the API
        document.querySelector("#news-results-container").innerHTML = "";
        newsAPIFunctions.fetchAllArticlesFromAPI()
        .then(articleArray => {
            //Looks at every article in the API response...
            articleArray.forEach(article =>{
                //A variable to break an if statement in the upcoming forEach loop
                let found = false;
                //...then looks at the Tags array for each article, looping through it
                article.tags.forEach(tag =>{
                    //If any tag in the article's Tags array matches the clicked tag, it will be printed. It will also set Found to True to prevent duplicate printings, just in case the user gave the same tag to an article multiple times
                    if (tag === tagToFind && found === false){
                        document.querySelector("#news-results-container").innerHTML += printSingleArticle(article);
                        found = true;
                    }
                })
            })
        })
    }
}

//Called by the printInitalPage function and other rare circumstances to print every article saved in the local API
const printAllArticles = () => {
    //Fetches all articles from the local API
    newsAPIFunctions.fetchAllArticlesFromAPI()
    .then(articleArray => {

        //Sorts all articles by date, puts them in a new array
        const sortedArticles = articleArray.sort((a,b) => a.date > b.date ? 1 : -1)

        sortedArticles.forEach(article => {
            //Grabs the user who saved the article
            let savedUserId = article.userId
            newsAPIFunctions.fetchUserFromAPI(savedUserId)
            //After finding the user who saved the article, calls a function to print a single Article using the article object and the saved user's name
            .then(user => {
            document.querySelector("#news-results-container").innerHTML += printSingleArticle(article, user.username);
            })
        })
    })
}

//A function for printing one single article. Accepts the article to be printed and a username as parameters
const printSingleArticle = (articleToPrint, savedUsername) => {
    let tags =""
    let printString =""

    //Loops through the article's saved tags and stores each as its own HTML link with a unique ID
        for(let i=0;i<articleToPrint.tags.length; i++){
            tags += `
                <a href="#" id="news-tag-${articleToPrint.id}-${i}">${articleToPrint.tags[i]}</a>
            `
        }
   
    //creates a string using all the article's saved information, including the username of the person who saved it and the above tag links
    return `
    <section id="news-result-${articleToPrint.id}">
    <div class="card news-card" style="width: 23rem;">
        <div class="card-body">
            <h5 class="card-title"><b><a href="${articleToPrint.url}">${articleToPrint.title}</a></b></h5>
            ${tags}
            <p class="card-text"><b>${articleToPrint.date}:</b> ${articleToPrint.synopsis}</p>
            <p class="card-text"><b>Saved by:</b> ${savedUsername}</p>
            <a href="#" class="btn btn-primary news-btn" id="edit-news-${articleToPrint.id}">Edit</a>
            <a href="#" class="btn btn-primary news-btn" id="delete-news-${articleToPrint.id}">Delete</a>
        </div>
    </div>
    </section>
    `
}

export default newsPrinterFunctions;
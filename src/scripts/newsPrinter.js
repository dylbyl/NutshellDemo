import newsAPIFunctions from "./newsAPIManager.js";

const newsPrinterFunctions = {
  //Prints the initial News page
  //This function is also called later to return the page to its default state when a Cancel button is clicked
  printInitialPage: () => {
    document.querySelector("#output-container").innerHTML = `
    <h1>News</h1>
        <section id="add-news-container">
            <button class="btn btn-primary news-btn" id="begin-add-btn">Save a News Article</button>
        </section>
        <section id="news-results-container"></section>
        `;

    //Calls a function to print all saved news articles
    printAllArticles();
  },

  //Is called when the Save Article button is clicked, generates a form to add a new article to the API
  printAddForm: () => {

      //Creates a form for user to input an article title, synopsis, and URL. Clicking Next adds the article to the API and lets the user add tags to the article
      document.querySelector("#add-news-container").innerHTML = `
            <input type="text" class="news-input-bar" id="title-input" placeholder="Article Title">
            <input type="text" class="news-input-bar" id="synopsis-input" placeholder="Article Description">
            <input type="text" class="news-input-bar" id="url-input" placeholder="Article Link">
            <br>
            <button class="btn btn-primary news-btn" id="add-news-btn">Next</button>
            <button class="btn btn-primary news-btn" id="cancel-news-btn">Cancel</button>
        `;
  },

  //Prints a form for adding tags. Each button has an event listener tied to the tag-btn class, which will add the appropriate tag to the saved article when clicked
  printAddTag : (articleId) => {
    newsAPIFunctions.fetchAllTagsFromAPI().then((tags) => {
      //Creates an array of tags and an emtpty string for the tag buttons
      let tagObjects = [];
      let tagButtons = "";

      //adds each tag name and id to an array
      tags.forEach((tag) => {
        const newTagObject = {
          id: tag.id,
          name: tag.name,
        };
        tagObjects.push(newTagObject);
      });

      //for each tag in the array, create a clickable button, using the tag id and article id in the button id
      tagObjects.forEach((tagObject) => {
        tagButtons += `<button class="btn tag-btn news-btn" id="tag-btn-${tagObject.id}-${articleId}">${tagObject.name}</button>`;
      });

      //Prints the above buttons to the DOM
      document.querySelector("#add-news-container").innerHTML = `
        <b>Select tags (saved automatically):<b>
            <p>${tagButtons}</p>
            <button class="btn btn-primary news-btn" id="cancel-news-btn">Done</button>
        `;

    })
  },

  //When the user clicks an edit button, this replaces the clicked card with an Edit card, auto-populating the card with info from the clicked entry
  printEditForm: () => {
    //Finds the news article to edit and pulls it from the API
    const idToEdit = parseInt(event.target.id.split("-")[2]);
    newsAPIFunctions.fetchSingleArticleFromAPI(idToEdit).then((article) => {
      //Creates a string from the tags array in the API object
      fetch("http://localhost:8088/article-tags")
        .then((r) => r.json())
        .then((tagRelationArray) => {
          let tagObjects = [];

          let tagButtons = "";
          newsAPIFunctions.fetchAllTagsFromAPI().then((tags) => {

            //Creates clickable tag buttons, check printAddTag for more info
            tags.forEach((tag) => {
              const newTagObject = {
                id: tag.id,
                name: tag.name,
              };
              tagObjects.push(newTagObject);
            });

            let selectedTags = [];
            tagRelationArray.forEach((tagRelation) => {
              if (tagRelation.articleId === idToEdit) {
                selectedTags.push(tagRelation.tagId);
              }
            });

            //If the current article has a tag, sets that tag's button to be selected with a CSS style
            tagObjects.forEach((tagObject) => {
              let tagSelectHTML = "";
              selectedTags.forEach((selectedTag) => {
                if (tagObject.id === selectedTag) {
                  tagSelectHTML = "btn-primary";
                }
              });

              //Adds the buttons to the DOM, using tagSelectHTML to set the correct buttons as selected
              tagButtons += `<button class="btn ${tagSelectHTML} edit-tag-btn news-btn" id="tag-btn-${tagObject.id}-${article.id}">${tagObject.name}</button>`;
            });

            //Prints the above buttons, as well as the article's values from the API, to the DOM
            document.querySelector(`#news-result-${idToEdit}`).innerHTML = `
                        <div class="card-body">
                            <input type="text" class="news-input-bar news-card-input" id="edit-title-input" value="${article.title}">
                            <input type="text" class="news-input-bar news-card-input" id="edit-synopsis-input" value="${article.synopsis}">
                            <input type="text" class="news-input-bar news-card-input" id="edit-url-input" value="${article.url}"><br>

                            <p>Select tags (saved automatically, <b>even if changes are canceled</b>):</p>
                            ${tagButtons}

                            <button class="btn btn-primary news-btn" id="adjusted-news-btn-${idToEdit}">Save Changes</button>
                            <button class="btn btn-primary news-btn" id="cancel-news-btn">Cancel</button>
                        </div>
                    `;
          });
        });
    });
  },

  //Is called only when a tag is clicked on a news article card
  printTaggedArticles: () => {
    //Selects the desired search tag by looking at the id of the button that was clicked
    const tagToPrint = parseInt(event.target.id.split("-")[2])

    //Creates a button that turns off the tag filter
    document.querySelector("#output-container").innerHTML = `
    <section id="add-news-container">
        <button class="btn btn-primary news-btn" id="cancel-news-btn">Remove Tag Filter</button>
    </section>
    <section id="news-results-container"></section>
    `;

    //Clears the news results container for upcoming filter results
    document.querySelector(
      "#news-results-container"
    ).innerHTML = ""

    newsAPIFunctions.fetchAllArticlesFromAPI()
    .then(articleArray => {
      articleArray.forEach(article => {
        //A variable to break an if statement in the upcoming forEach loop
        let found = false;

        article["article-tags"].forEach(tagRelation => {
          console.log(tagRelation.tagId)
          if (tagRelation.tagId === tagToPrint && found === false){
            //If the article has a tag id that matches the search tag id, prints it to the DOM
            document.querySelector(
              "#news-results-container"
            ).innerHTML += printSingleArticle(article, article.user.username, article.user.id);
            //sets found to true so the article is printed only once
            found = true;
          }
        })
      })
    })
  },
};

//Called by the printInitalPage function and other rare circumstances to print every article saved in the local API
const printAllArticles = () => {
  //Fetches all articles from the local API
  newsAPIFunctions.fetchAllArticlesFromAPI().then((articleArray) => {
    //Sorts all articles by date, puts them in a new array
    const sortedArticles = articleArray.sort((a, b) =>
      a.date > b.date ? 1 : -1
    );

    fetch("http://localhost:8088/article-tags?_expand=tag&_expand=article")
      .then((r) => r.json())
      .then((tagRelationArray) => {

        //Sends individual articles from the sorted array to a new function to be printed
        sortedArticles.forEach((article) => {
          document.querySelector(
            "#news-results-container"
          ).innerHTML += printSingleArticle(article, article.user.username, article.user.id);
        });

        //Iterates over each tag in the join table of the API and adds them to the appropriate article card
        for (let i = 0; i < tagRelationArray.length; i++) {
          document.querySelector(
            `#tag-container-${tagRelationArray[i].article.id}`
          ).innerHTML += `
                    <a href="#" id="tag-link-${tagRelationArray[i].tagId}">${tagRelationArray[i].tag.name}<a> 
                    `;
        }
      });
  });
};

//A function for printing one single article. Accepts the article to be printed and a username as parameters
const printSingleArticle = (articleToPrint, savedUsername, savedUserId) => {
  //creates a string using all the article's saved information, including the username of the person who saved it and the above tag links

  const currentUserId = parseInt(sessionStorage.getItem("userId"))
  let buttonStringHTML = ""

  console.log(savedUserId)

  //Only shows the edit and delete buttons if the current user is the same as the one that added the article
  if(currentUserId === savedUserId){
      buttonStringHTML = `
        <button class="btn btn-primary news-btn" id="edit-news-${articleToPrint.id}">Edit</button>
        <button class="btn btn-primary news-btn" id="delete-news-${articleToPrint.id}">Delete</button>
      `
  }

  //Returns an HTML string using all of the article info, as well as POSSIBLY the edit and delete buttons
  return `
    <div id="news-result-${articleToPrint.id}" class="card news-card" style="width: 23rem;">
        <div class="card-body">
            <h5 class="card-title"><b><a href="${articleToPrint.url}">${articleToPrint.title}</a></b></h5>
            <p id="tag-container-${articleToPrint.id}"></p>
            <p class="card-text"><b>${articleToPrint.date}:</b> ${articleToPrint.synopsis}</p>
            <p class="card-text"><b>Saved by:</b> ${savedUsername}</p>
            ${buttonStringHTML}
        </div>
    </div>
    `;
};

export default newsPrinterFunctions;

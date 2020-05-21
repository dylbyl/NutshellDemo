import newsPrinterFunctions from "./newsPrinter.js";

const newsAPIFunctions = {
  //Fetches all saved news articles from the API
  fetchAllArticlesFromAPI: () => {
    return fetch(
      "http://localhost:8088/articles?_expand=user&_embed=article-tags"
    ).then((r) => r.json());
  },
  //Fetches a single news article from the API, using an ID
  fetchSingleArticleFromAPI: (id) => {
    return fetch(`http://localhost:8088/articles/${id}`).then((r) => r.json());
  },
  fetchAllTagsFromAPI: () => {
    return fetch(`http://localhost:8088/tags/`).then((r) => r.json());
  },
  //Saves a news article to the API
  addArticleToAPI: () => {
    //Creates a string of today's date to keep track of when articles were saved
    var today = new Date();
    var dateToday =
      today.getFullYear() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getDate();

    //pulls user input for the article title, synopsis, url, and tags
    const titleInput = document.querySelector("#title-input").value;
    const synopsisInput = document.querySelector("#synopsis-input").value;
    const urlInput = document.querySelector("#url-input").value;
    //splits the tag input around commas

    //Creates a new object using all of the above data
    const articleToAdd = {
      title: titleInput,
      url: urlInput,
      synopsis: synopsisInput,
      date: dateToday,
      userId: parseInt(sessionStorage.getItem("userId")),
    };
    //Makes a POST call to save the above object in the API
    fetch(`http://localhost:8088/articles`, {
      // Replace "url" with your json-server API's URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleToAdd),
    }).then(() => {
      let tagButtons = document.querySelectorAll(".tag-btn");
      let articleTagId = "";

      //fetches the new Id of the article we just added, so that we can setup tags in a join-table
      fetch(`http://localhost:8088/articles`)
        .then((r) => r.json())
        .then((articles) => {
          articles.forEach((article) => {
            if (article.name === articleToAdd.name) {
              articleTagId = article.id;
            }
          });

          //Calls the function to print tag buttons, sending it the articleId we just grabbed. This saves us a few fetch calls later, trust me
          newsPrinterFunctions.printAddTag(articleTagId);
        });
    });
  },

  //A function for editing an existing article in the API
  editArticleInAPI: (idToEdit) => {
    //Creates a date string, pulls user input, and creates a tag array. see addArticleToAPI for more exposition
    var today = new Date();
    var dateToday =
      today.getFullYear() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getDate();

    const titleInput = document.querySelector("#edit-title-input").value;
    const synopsisInput = document.querySelector("#edit-synopsis-input").value;
    const urlInput = document.querySelector("#edit-url-input").value;

    //Creates an article object based on the above info
    const articleToAdd = {
      title: titleInput,
      url: urlInput,
      synopsis: synopsisInput,
      date: dateToday,
      userId: parseInt(sessionStorage.getItem("userId")),
    };

    //Makes a PUT call to update the API object with this new object
    fetch(`http://localhost:8088/articles/${idToEdit}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleToAdd),
    }).then(() => {
      newsPrinterFunctions.printInitialPage();
    });
  },
  //Accepts an id as a paramter, simply deletes the item with that ID from the API
  deleteArticleFromAPI: (idToDelete) => {
    fetch(`http://localhost:8088/articles/${idToDelete}`, {
      method: "DELETE",
    }).then(() => {
      newsPrinterFunctions.printInitialPage();
    });
    fetch(`http://localhost:8088/article-tags/`)
      .then((r) => r.json())
      .then((tagRelations) => {
        tagRelations.forEach((tagRelation) => {
          if (tagRelation.articleId === idToDelete) {
            fetch(`http://localhost:8088/article-tags/${tagRelation.id}`, {
              method: "DELETE",
            });
          }
        });
      });
  },
  //Deletes a single article-tag relation from the API, using ids contained in the event target button
  deleteTagFromArticle : () => {
    const tagToRemove = parseInt(event.target.id.split("-")[2])
    const articleToRemove = parseInt(event.target.id.split("-")[3])

    fetch(`http://localhost:8088/article-tags`)
    .then(r => r.json())
    .then(tagRelationArray =>{
      tagRelationArray.forEach(tagRelation => {
        if((tagRelation.articleId === articleToRemove) && (tagRelation.tagId === tagToRemove)){
          
          fetch(`http://localhost:8088/article-tags/${tagRelation.id}`, {
              method: "DELETE",
            });
        }
      })
    })
  },
  //Adds a single tag to the API, using ids from the clicked button
  addTagToArticle : () => {
      const tagToAdd = parseInt(event.target.id.split("-")[2])
      const articleToAdd = parseInt(event.target.id.split("-")[3])
      
      const tagRelationToAdd = {
        "articleId" : articleToAdd,
        "tagId" : tagToAdd
      }

      fetch(`http://localhost:8088/article-tags`, {
                  // Replace "url" with your json-server API's URL
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(tagRelationToAdd),
                })
  }
};

export default newsAPIFunctions;

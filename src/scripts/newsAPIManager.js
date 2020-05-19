import newsPrinterFunctions from "./newsPrinter.js";

const newsAPIFunctions = {
  //Fetches all saved news articles from the API
  fetchAllArticlesFromAPI: () => {
    return fetch("http://localhost:8088/articles").then((r) => r.json());
  },
  //Fetches a single news article from the API, using an ID
  fetchSingleArticleFromAPI: (id) => {
    return fetch(`http://localhost:8088/articles/${id}`).then((r) => r.json());
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
    let tagInput = document.querySelector("#tag-input").value.split(",");

    for (let i = 0; i < tagInput.length; i++) {
        //Removes the space at the beginning of a tag (usually a space placed after a comma)
      if (tagInput[i][0] === " ") {
        tagInput[i] = tagInput[i].slice(1);
      }
    }

    //Creates a new object using all of the above data
    const articleToAdd = {
      title: titleInput,
      url: urlInput,
      synopsis: synopsisInput,
      date: dateToday,
      userId: sessionStorage.getItem("userId"),
      tags: tagInput,
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
      newsPrinterFunctions.printInitialPage();
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
    let tagInput = document.querySelector("#edit-tag-input").value.split(",");

    for (let i = 0; i < tagInput.length; i++) {
      if (tagInput[i][0] === " ") {
        tagInput[i] = tagInput[i].slice(1);
      }
    }

    //Creates an article object based on the above info
    const articleToAdd = {
      title: titleInput,
      url: urlInput,
      synopsis: synopsisInput,
      date: dateToday,
      userId: sessionStorage.getItem("userID"),
      tags: tagInput,
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
  },
  //Fetches a single user from the API, used to grab usernames attached to saved articles
  fetchUserFromAPI: (userId) => {
    return fetch(`http://localhost:8088/users/${userId}`).then((r) => r.json());
  },
};

export default newsAPIFunctions;

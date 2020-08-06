# Nutshell Demo

## About Nutshell
Nutshell is a "one-stop productivity dashboard," produced as a part of the NewForce curriculum. With it, you can register an account and login, save news articles for later viewing, jot down future events and tasks, and even chat with other users. Nutshell was a group project, of which I helped create the login/register/logout process, the home screen, and the entire News page. 

## Installing and running Nutshell
Visit the [Nutshell GitHub page](https://github.com/dylbyl/NutshellDemo/) and clone the repository to a local branch. Open this directory in a GitBash terminal. In the root folder, run "npm install" to ensure all frameworks used are installed. Run "npm install json-server" to install JSON Server. Navigate to the api folder of the project, then run "npx json-server -p 8088 -w nutshell.json" to launch the JSON server.

Open the src folder of the project in a code editor capable of running HTML/CSS/JavaScript files, preferably Visual Studio Code with the LiveServer extension installed. Clicking "Go Live" at the bottom of such an editor will open Nutshell in a new browser window.

# Testing the Web App
## Accounts
If you'd like, you can register an account for the app, or login using some already created credentials. Try email: dylan@email.com and password: abc123 if you don't want to register an account.

## News - Created by me
Using the nav bar, travel to the News page. Here, you can click "Save a News Article" to save an article for future reading. Click the button, then input an article name, description, and URL, then click "Next." The next prompt allows you to select tags to add to the article.

After adding an article or two to your page, scroll down to see them. Clicking the name of an article will take you to the URL you input for the article. Clicking a tag will filter all articles to show only ones with the clicked tag. Here, you can click "Remove Tag Filter" at the top of the page to return the page to normal. You can also edit and delete articles, with the ability to change their tags as well.

## Chat - Created by teammate
Clicking "Chat" in the nav bar will take you to a real-time chat room--if we could have multiple users log in at once. You can post messages here, and even delete them or edit them in-line. If you'd like to test the chat by posting as multiple users, feel free to logout and register a new account!

## Events - Created by teammate
The Events page allows you to jot down future events sot aht you've got a handy list of them all in one place. Try adding a new event by clicking the button, then adding a name, location, description, and date. The date field also comes with a handy date-picker! After adding a few events, you'll be able to scroll through them on the right. The next upcoming event should be emphasized in a purple box. Events can be edited or deleted.

## Tasks - Created by teammate
The Tasks page allows you to keep a to-do list, as well as a list of Completed Tasks. Click the "New Task" button then input a task name and completion date to add a task to your list. Then, you can click to "Task is Complete" checkbox to move a task to the Completed list. The percentage of complete tasks should automatically update when you do so.

#Author
This Nutshell demo was initially created by a group at NewForce, with login/register/logout features and the News page created by Dylan Bishop. You can view his [GitHub profile here](https://github.com/dylbyl/).

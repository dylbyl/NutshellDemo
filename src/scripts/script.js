/*TODO:
-Make sure you are posting and fetching for a single user.
-Make sure you move everything out of script.js and into your module JS files before you submit a merge request.
*/

/* List of functions/methods that require a userId to work 
-createTaskObject
-tasksFetch
*/

sessionStorage.setItem("userId", 1)

//The HTML for the Tasks page
const tasksPageHTML = () => {
    return `
            <div id="new-task-container">
            <button id="new-task-btn">New Task</button>
            </div>
            <div id="incomplete-task-list">
            </div>
    `
}

//The form to submit a new task
const taskHTMLForm = () => {
    return `
   <div class="task-form-container" id="task-form-container">
    <form class="task-form" id="task-form">
      <input type="text" class="task-name" id="task-name" placeholder="Task Name">
      <label for="task-date">Expected Completion Date</label>
      <input type="date" class="task-date" id="task-date" name="task-date">
    </form>
    <button class="task-submit-btn" id="task-submit-btn">Submit</button>
  </div>
    `
}

//Input a userId into the arguments and place the values from the task form inside of an object.
const createTaskObject = (idOfUser) => {
    return {
        taskName: `${document.querySelector("#task-name").value}`,
        dueDate: `${document.querySelector("#task-date").value}`,
        isCompleted: false,
        userId: idOfUser
    }
}

//Input a task from the tasks array in nutshell.json and places the values from the task inside of an HTML element
const formatSingleTaskHTMLElement = (task) => {
    return `
    <div class="single-task single-task-${task.id}" id="single-task-${task.id}">
    <h3 class="single-task-heading">
        ${task.taskName}
    </h3>
    <p class="single-task-date">
        Date: ${task.dueDate}
    </p>
    <input type="checkbox" name="incomplete-task-checkbox" id="incomplete-task-checkbox-${task.id}">
    <label for="incomplete-task-checkbox">Task is Complete</label>
    </div>
    `
}

//Fetch all of the tasks from nutshell.json
const tasksFetch = (idOfUser) => {
    return fetch(`http://localhost:8088/tasks?userId=${idOfUser}`)
        .then((r) => r.json())
}

//POST a task to the tasks array in nutshell.json
const POSTTask = (task) => {
    fetch("http://localhost:8088/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })
}

const patchTask = (taskId) => {
    return fetch(`http://localhost:8088/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
       body: JSON.stringify({"isCompleted": true})
    })
}

//Listens for the tasks button in the navbar to be clicked
const tasksEventListener = () => {
    document.querySelector("#tasks-page").addEventListener("click", () => {
        document.querySelector("#output-container").innerHTML = tasksPageHTML();
        tasksFetch(sessionStorage.getItem("userId"))
            .then((parsedTasks) =>
                parsedTasks.forEach(task => {
                    document.querySelector("#incomplete-task-list").innerHTML +=
                        formatSingleTaskHTMLElement(task)
                })
            )

    })
}

//Listens for button inside of the tasks page
const tasksPageEventListeners = () => {
    document.querySelector("#output-container").addEventListener("click", () => {
        if (event.target.id.includes("new-task-btn")) {
            document.querySelector("#new-task-container").innerHTML = taskHTMLForm()
        }
        else if (event.target.id.includes("task-submit-btn")) {
            POSTTask(createTaskObject(sessionStorage.getItem("userId")))
        } else if (event.target.id.includes("incomplete-task-checkbox")) {
            //Gets the id number from the end of the id and stores it in taskId
            const taskId = event.target.id.split("-").pop()
            patchTask(taskId)
        } 
    })
}

tasksEventListener()

tasksPageEventListeners()


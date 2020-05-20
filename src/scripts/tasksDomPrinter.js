import tasksAPIManager from './TasksAPIManager.js'

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

const tasksDOMPrinter = {
printTasksPage() {
    //Prints the basic structure of the tasks page to the output-container
    document.querySelector("#output-container").innerHTML = tasksPageHTML();


    //Print tasks if the isCompleted bool is false to the incompelete tasks list
    tasksAPIManager.tasksFetch(sessionStorage.getItem("userId"))
        .then((parsedTasks) =>
            parsedTasks.filter(task => task.isCompleted === false)
        )
        .then(filteredTasks => {
            filteredTasks.forEach(task => document.querySelector("#incomplete-task-list").innerHTML +=
                formatSingleTaskHTMLElement(task))
        })
},

//The form to submit a new task
newTaskForm() {
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
}

export default tasksDOMPrinter

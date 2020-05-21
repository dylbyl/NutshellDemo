import tasksAPIManager from './TasksAPIManager.js'

//The HTML for the Tasks page
const tasksPageHTML = () => {
    return `
            <div class="new-task-container" id="new-task-container">
            <button class="new-task-btn" id="new-task-btn">New Task</button>
            </div>
            <div class="incomplete-task-container" id="incomplete-task-container">
                <ul class="incomplete-task-list" id="incomplete-task-list"><h3>Incomplete Tasks</h3>
                </ul>
            </div>
    `
}

//Input a task from the tasks array in nutshell.json and places the values from the task inside of HTML elements
const formatSingleTaskHTMLElement = (task) => {
    return `
    <li class="single-task single-task-${task.id}" id="single-task-${task.id}">
    <h5 class="single-task-heading"><a class="task-name-link" id="task-name-link-${task.id}" href="#">
        ${task.taskName}
    </a> | Date of Completion: ${task.dueDate} |  <input type="checkbox" name="incomplete-task-checkbox" id="incomplete-task-checkbox-${task.id}">
    <label for="incomplete-task-checkbox">Task is Complete</label></h5>
   
    </li>
    `
}

const tasksDOMPrinter = {
printTasksPage() {
    //Prints the basic structure of the tasks page to the output-container
    document.querySelector("#output-container").innerHTML = tasksPageHTML();


    //Print tasks to the incompelete tasks list if the isCompleted bool is false 
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
},

//Edit form that is injected into DOM when a task name is clicked
editTaskForm(task) {
    return `
    <div class="task-form-container" id="task-form-container">
    <form class="task-form" id="task-form">
      <input type="text" class="task-name" id="task-name-${task.id}" value="${task.taskName}">
      <p>Date: ${task.dueDate}</p>
    </form>
    <button class="task-save-btn" id="task-save-btn-${task.id}">Save</button>
  </div>
    `
}
}

export default tasksDOMPrinter

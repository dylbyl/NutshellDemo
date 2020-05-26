import tasksAPIManager from './TasksAPIManager.js'

//The HTML for the Tasks page
const tasksPageHTML = () => {
    return `
            
            <div id="task-container" class="task-container">
            <div id="task-left" class="task-left">
            <div class="new-task-container" id="new-task-container">
            <button class="new-task-btn" id="new-task-btn">New Task</button>
            </div>
            <div class="incomplete-task-container" id="incomplete-task-container">
                <ul class="incomplete-task-list list-group-flush" id="incomplete-task-list"><h3>Incomplete Tasks</h3>
                </ul>
            </div>
            </div>
            <div id="task-right" class="task-right">
            <div id="percent-complete-div" class="percent-complete-div"> </div>
            <div class="complete-task-container" id="complete-task-container">
            <ul class="complete-task-list list-group-flush" id="complete-task-list"><h3>Completed Tasks</h3>
            </ul>
            </div<
        </div>
        </div>
    `
}

//Input a task from the tasks array in nutshell.json and places the values from the task inside of HTML elements
const formatIncompleteTask = (task) => {
    return `
    <li class="single-task single-task-${task.id} list-group-item" id="single-task-${task.id}">
    <h6 class="single-task-heading"><a class="task-name-link" id="task-name-link-${task.id}" href="#">
        ${task.taskName}
    </a> | Date of Completion: ${task.dueDate} |  <input type="checkbox" name="incomplete-task-checkbox" id="incomplete-task-checkbox-${task.id}">
    <label for="incomplete-task-checkbox">Task is Complete</label></h6>
   
    </li>
    `
}

const formatCompleteTask = (task) => {
    return `
    <li class="single-task single-task-${task.id} list-group-item" id="single-task-${task.id}">
    <h6 class="single-task-heading"><a class="task-name-link" id="task-name-link-${task.id}" href="#">
        ${task.taskName}
    </a> | Date of Completion: ${task.dueDate} |  <input type="checkbox" name="complete-task-checkbox" id="complete-task-checkbox-${task.id}" checked>
    <label for="complete-task-checkbox">Task is Complete</label></h6>
   
    </li>
    `
}

const tasksDOMPrinter = {
    printTasksPage() {
        //Prints the basic structure of the tasks page to the output-container
        document.querySelector("#output-container").innerHTML = tasksPageHTML();
        let incompleteTasks = []
        let completeTasks = []
        let allTasks = []

        //Print tasks to the incompelete tasks list if the isCompleted bool is false 
        tasksAPIManager.tasksFetch(sessionStorage.getItem("userId"))
            .then((parsedTasks) => {
                incompleteTasks = parsedTasks.filter(task => task.isCompleted === false)
                completeTasks = parsedTasks.filter(task => task.isCompleted === true)
                allTasks = parsedTasks
            }
            )
            .then(() => {
                // console.log(Math.round(completeTasks.length / allTasks.length * 100))
                incompleteTasks.forEach(task => document.querySelector("#incomplete-task-list").innerHTML +=
                    formatIncompleteTask(task))
                completeTasks.forEach(task => document.querySelector("#complete-task-list").innerHTML +=
                    formatCompleteTask(task))
                if (allTasks.length != 0) {
                    document.querySelector("#percent-complete-div").innerHTML = `${Math.round(completeTasks.length / allTasks.length * 100)}% of tasks complete`;
                }
            })
    },

    //The form to submit a new task
    newTaskForm() {
        return `
   <div class="task-form-container" id="task-form-container">
    <div class="task-form" id="task-form">
      <input type="text" class="new-name" id="new-name" placeholder="Task Name">
      <label for="task-date">Expected Completion Date</label>
      <input type="date" class="task-date" id="task-date" name="task-date">
    </div>
    <button class="task-submit-btn" id="task-submit-btn">Submit</button>
  </div>
    `
    },

    //Edit form that is injected into DOM when a task name is clicked
    editTaskForm(task) {
        return `
    <div class="edit-task-form-container" id="edit-task-form-container">
    <div class="task-form" id="task-form">
      <input type="text" class="task-name" id="task-name-${task.id}" value="${task.taskName}">
      <p>Date: ${task.dueDate}</p>
    </div>
    <button class="task-save-btn" id="task-save-btn-${task.id}">Save</button>
  </div>
    `
    }
}

export default tasksDOMPrinter

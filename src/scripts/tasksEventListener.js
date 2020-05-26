import tasksDOMPrinter from './tasksDOMPrinter.js'
import tasksAPIManager from './tasksAPIManager.js'

const tasksEvents = {

    //Listens for the tasks button in the navbar to be clicked
    tasksEventListener() {
        document.querySelector("#tasks-page").addEventListener("click", () => {
            //Print the basic tasks page
            tasksDOMPrinter.printTasksPage()
        })
    },


    //Listens for button inside of the tasks page
    tasksPageEventListeners() {
        document.querySelector("#output-container").addEventListener("click", () => {
            if (event.target.id.includes("new-task-btn")) {
                document.querySelector("#new-task-container").innerHTML = tasksDOMPrinter.newTaskForm()
            } else if (event.target.id.includes("task-submit-btn")) {
                //Gets the userId from session storage, uses the id to create a task object, and POSTS the task object to the tasks array in nutshell.json
                tasksAPIManager.POSTTask()
                    .then(tasksDOMPrinter.printTasksPage)
            } else if (event.target.id.includes("incomplete-task-checkbox")) {
                //Gets the id number from the end of the id and stores it in taskId
                const taskId = event.target.id.split("-").pop()
                //Changes the isCompleted bool to true which removes it from the incomplete task list
                tasksAPIManager.patchTask(taskId, { "isCompleted": true })
                    .then(tasksDOMPrinter.printTasksPage)
            } else if (event.target.id.includes("complete-task-checkbox")) {
                //Gets the id number from the end of the id and stores it in taskId
                const taskId = event.target.id.split("-").pop()
                //Changes the isCompleted bool to true which removes it from the incomplete task list
                tasksAPIManager.patchTask(taskId, { "isCompleted": false })
                    .then(tasksDOMPrinter.printTasksPage)
            }else if (event.target.id.includes("task-name-link")) {
                const taskId = event.target.id.split("-").pop()
                tasksAPIManager.singleTaskFetch(taskId)
                    .then(parsedFetch => parsedFetch.forEach(task =>
                        document.querySelector(`#single-task-${taskId}`).innerHTML = tasksDOMPrinter.editTaskForm(task)
                    ))
            } else if (event.target.id.includes("task-save-btn")) {
                const taskId = event.target.id.split("-").pop()
                const editedTaskName = document.querySelector(`#task-name-${taskId}`).value
                const taskObjectValue = { taskName: editedTaskName }
                tasksAPIManager.patchTask(taskId, taskObjectValue)
                    .then(tasksDOMPrinter.printTasksPage)

            }
        })
    },

    taskEditKeypressListener() {
        document.querySelector('#output-container').addEventListener("keypress", e => {
            if (e.keyCode === 13) {
                if (event.target.id.includes(`task-name`)) {
                    const taskId = event.target.id.split("-").pop()
                    const editedTaskName = document.querySelector(`#task-name-${taskId}`).value
                    const taskObjectValue = { taskName: editedTaskName }
                    tasksAPIManager.patchTask(taskId, taskObjectValue)
                        .then(tasksDOMPrinter.printTasksPage)
                    console.log(e.keyCode)
                    console.log(event.target.id)
                }
            }
        }
        )}
}

export default tasksEvents

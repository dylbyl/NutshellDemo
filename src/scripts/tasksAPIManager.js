 //Input a userId into the arguments and place the values from the task form inside of an object.
 const createTaskObject = (idOfUser) => {
    return {
        taskName: `${document.querySelector("#task-name").value}`,
        dueDate: `${document.querySelector("#task-date").value}`,
        isCompleted: false,
        userId: idOfUser
    }
}


const tasksAPIManager = {
   
    //Fetch all of the tasks from nutshell.json
    tasksFetch(idOfUser) {
        return fetch(`http://localhost:8088/tasks?userId=${idOfUser}`)
            .then((r) => r.json())
    },

    //POST a task to the tasks array in nutshell.json
    POSTTask() {
       return fetch("http://localhost:8088/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createTaskObject(sessionStorage.getItem("userId")))
        })
    },

    patchTask(taskId) {
        return fetch(`http://localhost:8088/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "isCompleted": true })
        })
    },
    singleTaskFetch(taskId) {
        return fetch(`http://localhost:8088/tasks?id=${taskId}`)
        .then((r) => r.json())
    }
}

export default tasksAPIManager
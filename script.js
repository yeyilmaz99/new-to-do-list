// Creating Task Class

class Task{
    constructor(todo,time){
        this.taskId = Math.floor(Math.random()*10000);
        this.doneId = Math.floor(Math.random()*10000);
        this.todo = todo;
        this.time = time;
    }
}

//creating UI class
class UI{
    addTaskToTDList(task){
        const list = document.getElementById('Task-List');
        let html = `
        <tr>
        <td>${task.todo}</td>
        <td>${task.time}</td>
        <td><a task-Id = ${task.taskId} id="delete" class="btn btn-danger delete">Delete</a></td>
        <td><a done-Id = ${task.doneId} id="done" class="btn btn-primary done">Done</a></td>
        </tr>
        `
        list.innerHTML += html
    }
    clearControls(){
        const todo = document.getElementById('To-Do').value='';
        const time = document.getElementById('Time').value= '';
    }
    showAlert(message,className){
        let alert = `
            <div class="alert alert-${className}">
            ${message}
            </div>
        `
        const row = document.querySelector('.row');
        row.insertAdjacentHTML('beforebegin',alert)

        setTimeout(() => {
            document.querySelector('.alert').remove();
        },2000)
    }
    deleteTask(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
            return true;
        }
    }
    deleteAllTask(){
        const list = document.getElementById('Task-List');
        list.innerHTML = '';
        localStorage.clear();
    }
    deleteAllDoneTask(){
        const list = document.getElementById('Done-List');
        list.innerHTML = '';
        localStorage.clear();
    }
    deleteDoneTask(element){
        if(element.classList.contains('deleteDone')){
            element.parentElement.parentElement.remove();
            return true;
        }
    }

}

// Creating storage class for local storage

class Storage{
    static getTasks(){
        let tasks;
        if(localStorage.getItem('tasks')===null){
            tasks = [];
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    };
    // static getDoneTasks(){
    //     let doneTasks;
    //     if(localStorage.getItem('doneTasks')===null){
    //         doneTasks = [];
    //     }else{
    //         doneTasks = JSON.parse(localStorage.getItem('doneTasks'));
    //     }
    //     return doneTasks;
    // };
    static displayTasks(){
        const tasks = Storage.getTasks();

        tasks.forEach(task => {
            const ui = new UI();
            ui.addTaskToTDList(task);
        });
    };
    // static displayDoneTasks(){
    //     const tasks = Storage.getDoneTasks();

    //     tasks.forEach(task => {
    //         const ui = new UI();
    //         ui.addTaskToDoneList(task);
    //     });
    // };
    static addTask(task){
        const tasks = Storage.getTasks();

        tasks.push(task);
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    // static addDoneTask(task){
    //     const doneTasks = Storage.getDoneTasks();
    //     doneTasks.push(task);
    //     localStorage.setItem('tasks',JSON.stringify(doneTasks));
    // }
    static deleteTaskLS(element){
        if(element.classList.contains('delete')){
            const id = element.getAttribute('task-Id');
            
            const tasks = Storage.getTasks();

            tasks.forEach((task,index) => {
                if(task.taskId == id){
                    tasks.splice(index,1);
                }
            })
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
    }
    // static addDoneTaskLS(task){
    //     const tasks = Storage.getTasks();
    //     tasks.push(task);
    //     localStorage.setItem('tasks',JSON.stringify(tasks));
    // } 
    static moveToTheDoneListLS(element){
        if(element.classList.contains('done')){
            const id = element.getAttribute('done-Id');
            
            const tasks = Storage.getTasks();
            const doneList= document.getElementById('Done-List');

            tasks.forEach((task,index) => {
                if(task.doneId == id){
                    tasks.splice(index,1);
                
                }
            })
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
    }
}

document.addEventListener('DOMContentLoaded', Storage.displayTasks);

// creating form submit event

document.getElementById('new-list').addEventListener('submit',function(e){
    const todo = document.getElementById('To-Do').value;
    const time = document.getElementById('Time').value;

    // creating task object
    const task = new Task(todo,time);

    // creating ui

    const ui = new UI();
    if(todo ==='' || time ===''){
        ui.showAlert('please complete the form','warning');
    }else{
        //adding task to the To-Do List
        ui.addTaskToTDList(task);
        // saving task to Local Storage
        Storage.addTask(task);
        // Clearing the form
        ui.clearControls();
        //Success Alert
        ui.showAlert('the task successfully saved','success');
    }
    e.preventDefault();
})

//deleting one item
document.getElementById('Task-List').addEventListener('click',function(e){
    const ui = new UI();

    if(ui.deleteTask(e.target)== true){ 
        Storage.deleteTaskLS(e.target);
        ui.showAlert('the task has been deleted','danger')
        ;}
})

// Delete all in once
document.getElementById('delall2').addEventListener('click',function(e){
    const ui = new UI();
    ui.deleteAllDoneTask(e.target)
})
// Delete all in once done list

document.getElementById('delall1').addEventListener('click',function(e){
    const ui = new UI();
    ui.deleteAllTask(e.target)
})

//deleting one item from done list
document.getElementById('Done-List').addEventListener('click',function(e){
    const ui = new UI();

    if(ui.deleteDoneTask(e.target)== true){ 
        ui.showAlert('the task has been deleted','danger')
        ;}
})




const taskList = document.getElementById('Task-List');
const doneList= document.getElementById('Done-List');
taskList.addEventListener('click',moveToTheDoneList);
doneList.addEventListener('click',moveToTheTaskList);


//Moving to done list
function moveToTheDoneList(e) {
    let deleteButton = document.getElementById('delete');
    let button = document.getElementById('done');
    if(e.target.classList.contains('done')){
        e.target.parentElement.parentElement.remove();
        doneList.appendChild(e.target.parentElement.parentElement);
        e.target.innerText= 'Not Done'
        deleteButton.classList += ` deleteDone`;
        let task = document.getElementById('Task-List');
        Storage.moveToTheDoneListLS(e.target);
    }
}
// Moving to task list
function moveToTheTaskList(e) {
    let button = document.getElementById('done');
    if(e.target.classList.contains('done')){
        e.target.parentElement.parentElement.remove();
        taskList.appendChild(e.target.parentElement.parentElement);
        e.target.innerText= 'Done'
    }
}
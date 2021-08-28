// Creating Task Class

class Task{
    constructor(todo,time){
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
        <td><a id="delete" class="btn btn-danger delete">Delete</a></td>
        <td><a id="done" class="btn btn-primary done">Done</a></td>
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
    }
    deleteAllDoneTask(){
        const list = document.getElementById('Done-List');
        list.innerHTML = '';
    }

}

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


const taskList = document.getElementById('Task-List');
const doneList= document.getElementById('Done-List');
taskList.addEventListener('click',moveToTheDoneList);
doneList.addEventListener('click',moveToTheTaskList);


//Moving to done list
function moveToTheDoneList(e) {
    let button = document.getElementById('done');
    if(e.target.classList.contains('done')){
        e.target.parentElement.parentElement.remove();
        doneList.appendChild(e.target.parentElement.parentElement);
        e.target.innerText= 'Not Done'
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
// select all needful Elements
let newTask = document.querySelector('#new_task');
let toDoList = document.querySelector('#items');
let okList = document.querySelector('.complete-list ul');
let form = document.querySelector('form');

// Function 
// =====================================================================
let createTask = function (task) {
    let listItem = document.createElement('li');
    let checkBox = document.createElement('input');
    let label = document.createElement('label');

    checkBox.type = 'checkbox';
    label.innerText = task;

    listItem.appendChild(checkBox);
    listItem.appendChild(label);

    return listItem;
}

// =====================================================================
let addTask = function (event) {
    // prevent from auto reload the browser
    event.preventDefault();

    let listItem = createTask(newTask.value);

    toDoList.appendChild(listItem);
    newTask.value = "";

    //bind the new list item to the incomplete list
    bindInCompleteItems(listItem, completeTask);

}
// =====================================================================
let completeTask = function (event) {
    // get your parent 
    let listItem = this.parentNode;

    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.className = 'delete';

    listItem.appendChild(deleteBtn);

    let checkBox = listItem.querySelector('input[type="checkBox"]');
    // Remove from DOM
    checkBox.remove();

    okList.appendChild(listItem);

    bindCompleteItems(listItem, deleteTask);

}
// =====================================================================
let deleteTask = function () {
    
    let listItem = this.parentNode;
    let ul = listItem.parentNode;

    // Remove particular child element
    ul.removeChild(listItem);
}
// =====================================================================
let bindCompleteItems = function (taskItem, deleteBtnClick) {

    let deleteBtn = taskItem.querySelector('.delete');
    deleteBtn.onclick = deleteBtnClick;
}
// =====================================================================
let bindInCompleteItems = function (taskItem, checkboxClick) {

    let checkBox = taskItem.querySelector('input[type="checkBox"]');

    // call the callBack function
    checkBox.onchange = checkboxClick;
}
// =====================================================================
for (let i = 0; i < toDoList.children.length; i++) {
    bindInCompleteItems(toDoList.children[i], completeTask);
}
// =====================================================================
for (let i = 0; i < okList.children.length; i++) {
    bindCompleteItems(okList.children[i], deleteTask);
}
// =====================================================================

form.addEventListener('submit', addTask);

// END
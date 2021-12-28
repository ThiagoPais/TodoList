// Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter');

//Event Listeners

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filter);

// Functions

function addTodo(event){
    event.preventDefault();
    
    if(todoInput.value != ""){
        // Todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // Create item
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // Save in localstorage
        saveLocalStorage(todoInput.value);
        todoInput.value = "";

        // Add buttons
        const doneButton = document.createElement('button');
        doneButton.innerHTML = '<i class="fas fa-check"><\i>'
        doneButton.classList.add('done-btn');
        todoDiv.appendChild(doneButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"><\i>'
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);

        // Add div to list
        todoList.appendChild(todoDiv);
    }
}

function deleteCheck(e){
    const item = e.target;
    console.log(e.target);

    if(item.classList[0] === 'delete-btn'){
        const todo = item.parentElement;
        removeLocalStorage(todo.innerText);
        todo.classList.add("fall");
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    if(item.classList[0] === 'done-btn'){
        item.parentElement.classList.toggle("done");
    }
}

function filter(e){
    const todos = todoList.childNodes
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'marked':
                if(todo.classList.contains('done')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;
            case 'unmarked':
                if(todo.classList.contains('done')){
                    todo.style.display = 'none';
                }
                else{
                    todo.style.display = 'flex';
                }
                break;
        }
    });
}

function saveLocalStorage(todo){
    let todos;

    // Check
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;

    // Check
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        // Todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // Create item
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // Add buttons
        const doneButton = document.createElement('button');
        doneButton.innerHTML = '<i class="fas fa-check"><\i>'
        doneButton.classList.add('done-btn');
        todoDiv.appendChild(doneButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"><\i>'
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);

        // Add div to list
        todoList.appendChild(todoDiv);
    })
}

function removeLocalStorage(name){
    let todos;

    todos = JSON.parse(localStorage.getItem('todos'));
    const index = todos.indexOf(name);

    if(index > -1){
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}
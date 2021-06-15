const todoInput = document.querySelector('.todo__form-input');
const todoSubmit = document.querySelector('.todo__form-submit');
const todoList = document.querySelector('.todo__list');
const selectFilters = document.querySelector('.select__filters');

document.addEventListener('DOMContentLoaded', getTodos);
todoSubmit.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
selectFilters.addEventListener('click', filterTodo);


function addTodo(e) {
  e.preventDefault();

  if (todoInput.value != '') {
    // Create new task
    const newTodo = document.createElement('li')
    newTodo.classList.add('todo__item');
    todoList.appendChild(newTodo);

    // Create task text
    const todoText = document.createElement('span');
    todoText.classList.add('todo__item-text');
    todoText.innerText = todoInput.value;
    newTodo.appendChild(todoText);
    saveLocalTodos(todoInput.value);

    // Create check button
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add('todo__item-button');
    checkButton.classList.add('todo__item-button--check');
    newTodo.appendChild(checkButton);

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('todo__item-button');
    deleteButton.classList.add('todo__item-button--delete');
    newTodo.appendChild(deleteButton);

    // Clear input
    todoInput.value = '';
  }
}

function deleteCheck(e) {
  const eventItem = e.target;

  if (eventItem.classList.contains('todo__item-button--delete')) {
    eventItem.parentElement.remove();
    removeLocalTodos(eventItem.parentElement);
  }
  if (eventItem.classList.contains('todo__item-button--check')) {
    eventItem.parentElement.classList.toggle('todo__item--completed')
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;

  todos.forEach((todo) => {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
      break;

      case 'completed':
        if (todo.classList.contains('todo__item--completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
      break;

      case 'uncompleted':
        if (!todo.classList.contains('todo__item--completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
      break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach((todo) => {
    // Create new task
    const newTodo = document.createElement('li')
    newTodo.classList.add('todo__item');
    todoList.appendChild(newTodo);

    // Create task text
    const todoText = document.createElement('span');
    todoText.classList.add('todo__item-text');
    todoText.innerText = todo;
    newTodo.appendChild(todoText);

    // Create check button
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add('todo__item-button');
    checkButton.classList.add('todo__item-button--check');
    newTodo.appendChild(checkButton);

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('todo__item-button');
    deleteButton.classList.add('todo__item-button--delete');
    newTodo.appendChild(deleteButton);
  });
}

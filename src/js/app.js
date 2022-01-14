(() => {
  let todoItems = [];
  const todoForm = document.querySelector('.todo__form');
  const todoList = document.querySelector('.todo__list');
  const selectFilters = document.querySelector('.select__filters');

  document.addEventListener('DOMContentLoaded', () => {
    const todos = localStorage.getItem('todos');

    if (todos) {
      todoItems = JSON.parse(todos);
      todoItems.forEach((todo) => {
        renderTodo(todo);
      });
    }
  });

  todoForm.addEventListener('submit', (e) => {
    e.preventDefault;

    const input = document.querySelector('.todo__input');
    const inputText = input.value.trim();

    if (inputText !== '') {
      addTodo(inputText);
      input.value = '';
      input.focus();
    }
  });

  todoList.addEventListener('click', (e) => {
    const todoText = e.target.parentElement.querySelector('.todo__text').textContent;
    const todoIndex = todoItems.findIndex(item => item.text === todoText);

    if(e.target.classList.contains('todo__button--check')) {
      e.target.parentElement.classList.toggle('todo__item--checked');
      todoItems[todoIndex].checked = !todoItems[todoIndex].checked;
      localStorage.setItem('todos', JSON.stringify(todoItems));
    }

    if (e.target.classList.contains('todo__button--delete')) {
      e.target.parentElement.remove();
      todoItems.splice(todoIndex, 1);
      localStorage.setItem('todos', JSON.stringify(todoItems));
    }
  });

  selectFilters.addEventListener('click', filterTodo);

  // Добавляем элемент на страницу и сохраняем в localStorage
  function addTodo(inputText) {
    const todo = {
      text: inputText,
      checked: false
    }

    todoItems.push(todo);
    localStorage.setItem('todos', JSON.stringify(todoItems));
    renderTodo(todo);
  }

  // Создаем элемент
  function renderTodo(todo) {
    const isChecked = todo.checked ? 'todo__item--checked' : '';
    const todoItem = document.createElement('li');

    if (isChecked !== '') {
      todoItem.classList.add('todo__item', `${isChecked}`);
    } else {
      todoItem.classList.add('todo__item');
    }

    todoItem.innerHTML = `
      <span class="todo__text">${todo.text}</span>
      <button class="todo__button todo__button--check"><i class="fas fa-check"></i></button>
      <button class="todo__button todo__button--delete"><i class="fas fa-trash"></i></button>
    `;
    todoList.appendChild(todoItem);
  }

  // Сортировка по фильтрам
  function filterTodo(e) {
    const todos = todoList.childNodes;

    todos.forEach((todo) => {
      switch (e.target.value) {
        case 'all':
          todo.style.display = 'flex';
        break;

        case 'completed':
          if (todo.classList.contains('todo__item--checked')) {
            todo.style.display = 'flex';
          } else {
            todo.style.display = 'none';
          }
        break;

        case 'uncompleted':
          if (!todo.classList.contains('todo__item--checked')) {
            todo.style.display = 'flex';
          } else {
            todo.style.display = 'none';
          }
        break;
      }
    });
  }
})();

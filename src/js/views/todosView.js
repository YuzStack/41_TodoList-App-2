import { format } from 'date-fns';

// console.log(format(new Date(todoObj.dueDate), 'yyyy-MM-dd'));

const todosView = (function () {
  const parentEl = document.querySelector('.todos');

  const dialogBox = document.querySelector('.dialog');
  const createTodoBtn = document.querySelector('.create-todo-btn');
  const dialogOverlay = document.querySelector('.dialog-overlay');
  const dialogFormEl = document.querySelector('.dialog-form');

  const todoTitleInpEl = document.querySelector('#todo-title');
  const todoDesInpEl = document.querySelector('#todo-description');
  const todoDuedateInpEl = document.querySelector('#due-date');
  const todoPriorityLvlOptEl = document.querySelector('#priority-level');
  const todoChecklistInpEl = document.querySelector('#cheklist');

  const fullTodoViewEl = document.querySelector('.full-todo-view-container');
  const fullTodoViewSubEl = document.querySelector(
    '.full-todo-view-sub-container',
  );
  const editTodoBtn = document.querySelector('.edit-todo-btn');
  const deleteTodoBtn = document.querySelector('.delete-todo-btn');
  const todoTitleInpElFV = document.querySelector('.todo-title');
  const todoPriorityLvlElFV = document.querySelector('.priority-lvl-indicator');
  const todoDuedateInpElFV = document.querySelector('.due-date');
  const todoDesInpElFV = document.querySelector('.todo-description');
  const toggComplBtn = document.querySelector('.toggle-completion-btn');

  let curTodo;

  const defMessage = `
    <p class="text-sm text-gray-500">Seems there's no todo addded for this project yet, click the "+" button above to add one :)</p>
  `;

  // Show addTodo dialog box ‼️
  createTodoBtn.addEventListener('click', function () {
    // dialogBox.showModal();
    dialogBox.classList.remove('opacity-0', 'translate-y-5');
    dialogBox.classList.replace('-z-10', 'z-10');
    dialogOverlay.classList.remove('hidden');
    todoTitleInpEl.focus();
  });

  // Handle todo's full view ‼️
  const addHanlderClick = function (handler) {
    parentEl.addEventListener('click', function (e) {
      const todo = e.target.closest('.todo');
      if (!todo) return;

      const todoId = todo.dataset.id;
      handler(todoId);
    });
  };

  parentEl.addEventListener('click', function (e) {
    // console.log(e.target);
  });

  const getInputs = function () {
    return {
      title: todoTitleInpEl.value,
      description: todoDesInpEl.value,
      dueDate: todoDuedateInpEl.value
        ? new Date(todoDuedateInpEl.value)
        : new Date(),
      priority: todoPriorityLvlOptEl.value.toLowerCase(),
      checklist: todoChecklistInpEl.checked,
    };
  };

  const clearInputs = function () {
    todoTitleInpEl.value = todoDesInpEl.value = todoDuedateInpEl.value = '';
    todoPriorityLvlOptEl.value = 'Low';
    todoChecklistInpEl.checked = false;
  };

  const addHandlerCreateTodo = function (handler) {
    dialogFormEl.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get the inputs
      const todoObj = getInputs();

      // Close dialog box
      dialogBox.classList.add('opacity-0', 'translate-y-5');
      dialogBox.classList.replace('z-8', '-z-10');
      dialogOverlay.classList.add('hidden');

      // Clear the inputs
      setTimeout(clearInputs, 300);

      handler(todoObj);
    });
  };

  const getPriorityLevel = function (todo) {
    switch (todo.priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'yellow';
      case 'low':
        return 'green';
    }
  };

  const generatePreviewMarkup = function (todos) {
    // Sort the todos (todos) array in ascending order according to their dueDate property (Earliest Date First)
    todos.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

    return todos
      .map(todo => {
        return `
          <div class="todo flex flex-col gap-2" data-id="${todo.id}">
            <div class="flex items-center gap-3 leading-5">
              <div class="border-l-4 border-${getPriorityLevel(todo)}-500 pl-2.5">
                <p class="todo-title">${todo.title}</p>
                <div class="flex items-center justify-between gap-3">
                  <p class="dueDate font-serif text-sm text-gray-600">${format(todo.dueDate, 'dd-MM-yyyy')}</p>
                  <div class="priority">${todo.checklist ? '✅✅' : '⏳⏳'}</div>
                </div>
              </div>
            </div>
            <hr class="text-gray-300" />
          </div>
        `;
      })
      .join('');
  };

  const clear = () => (parentEl.innerHTML = '');

  const renderMessage = function () {
    clear();
    parentEl.insertAdjacentHTML('afterbegin', defMessage);
  };

  const closeFullViewWindow = function () {
    fullTodoViewEl.classList.replace('z-20', '-z-20');
    fullTodoViewEl.classList.replace('opacity-100', 'opacity-0');
  };

  // Render all todos preivew ‼️
  const renderPreview = function (todos) {
    // Check if there's any data (todos) to render
    if (!todos || (Array.isArray(todos) && todos.length === 0)) {
      return renderMessage();
    }

    const markup = generatePreviewMarkup(todos);

    clear();
    parentEl.insertAdjacentHTML('afterbegin', markup);
  };

  // Handle todo full view ‼️
  const renderFullView = function (todo) {
    // Set as current todo
    curTodo = todo;

    // Open Window (make it visible)
    fullTodoViewEl.classList.replace('-z-20', 'z-20');
    fullTodoViewEl.classList.replace('opacity-0', 'opacity-100');

    // Fill the inputs with the details of the clicked todo
    todoTitleInpElFV.value = todo.title;

    todoPriorityLvlElFV.classList.add(
      `bg-${getPriorityLevel(todo)}-100`,
      `text-${getPriorityLevel(todo)}-600`,
    );

    todoPriorityLvlElFV.textContent =
      todo.priority === 'medium'
        ? 'MID PRIORITY'
        : `${todo.priority.toUpperCase()} PRIORITY`;

    todoDuedateInpElFV.value = format(todo.dueDate, 'yyyy-MM-dd');
    todoDesInpElFV.value = todo.description;

    toggComplBtn; // Yet to be dealt with...

    // Handle cheklist toggle feature
    // Requires maximum attention ‼️‼️
    // toggComplBtn.addEventListener('click', function () {
    //   todo.toggleChecklist();
    //   console.log(todo)
    // });

    // Handle window close
    fullTodoViewEl.addEventListener('click', function (e) {
      if (!e.target.closest('.full-todo-view-sub-container'))
        closeFullViewWindow();
    });
  };

  // Handle delete todo
  const addHandlerDeleteTodo = function (handler) {
    deleteTodoBtn.addEventListener('click', function () {
      handler(curTodo.id);
      closeFullViewWindow();
    });
  };

  // Handle initial page load ‼️
  const addHandlerWindowLoad = function (handler) {
    window.addEventListener('load', handler);
  };

  return {
    renderPreview,
    addHandlerCreateTodo,
    addHanlderClick,
    addHandlerWindowLoad,
    renderFullView,
    addHandlerDeleteTodo,
  };
})();

export default todosView;

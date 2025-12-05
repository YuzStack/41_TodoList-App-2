const todosView = (function () {
  const parentEl = document.querySelector('.todos-subcontainer');

  const dialogBox = document.querySelector('.dialog');
  const createTodoBtn = document.querySelector('.create-todo-btn');
  const todos = document.querySelector('.todos-subcontainer');
  const dialogOverlay = document.querySelector('.dialog-overlay');
  const dialogFormEl = document.querySelector('.dialog-form');

  const todoTitleInpEl = document.querySelector('#todo-title');
  const todoDesInpEl = document.querySelector('#todo-description');
  const todoDuedateInpEl = document.querySelector('#due-date');
  const todoPriorityLvlOptEl = document.querySelector('#priority-level');
  const todoChecklistInpEl = document.querySelector('#cheklist');

  // Show dialog box
  createTodoBtn.addEventListener('click', function () {
    // dialogBox.showModal();
    dialogBox.classList.remove('opacity-0', 'translate-y-5');
    dialogBox.classList.replace('-z-10', 'z-8');
    dialogOverlay.classList.remove('hidden');
    todoTitleInpEl.focus();
  });

  todos.addEventListener('click', function (e) {
    console.log(e.target);
  });

  const getInputs = function () {
    // console.log(todoDuedateInpEl.value);
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

  const generatePreviewMarkup = function (details) {
    return details
      .map(detail => {
        const getPriorityLevel = function () {
          switch (detail.priority) {
            case 'high':
              return 'bg-red-500';
            case 'medium':
              return 'bg-yellow-500';
            case 'low':
              return 'bg-green-500';
          }
        };

        return `
          <div class="todo flex flex-col gap-2">
            <div class="flex items-center gap-3 leading-5">
              <div class="cheklist h-5 w-5 rounded-sm bg-black"></div>
              <div>
                <p class="todo-title">${detail.title}</p>
                <div class="flex items-center justify-between gap-2">
                  <p class="dueDate font-serif text-sm text-gray-600">${detail.dueDate}</p>
                  <div class="priority h-3 w-3 rounded-full ${getPriorityLevel()}"></div>
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

  const renderPreview = function (details) {
    const markup = generatePreviewMarkup(details);

    clear();
    parentEl.insertAdjacentHTML('afterbegin', markup);
  };

  const addHandlerWindowLoad = function (handler) {
    window.addEventListener('load', handler);
  };

  return { renderPreview, addHandlerCreateTodo, addHandlerWindowLoad };
})();

export default todosView;

export let state = {
  projects: [
    {
      name: 'Default',
      todos: [],
    },
  ],
  activeProjIdx: 0,
};

export const createProject = function (name) {
  // Create new project
  const project = { name, todos: [] };

  // Add the project to state
  state.projects.push(project);

  // Update local storage
  saveData();

  return project;
};

export const getProjects = function () {
  return state.projects.map(proj => proj.name);
};

export const createTodo = function (
  title,
  description,
  dueDate,
  priority,
  checklist,
  project = 'Default',
) {
  // Create the todo properties and methods
  const todo = {
    title,
    description,
    dueDate,
    priority,
    checklist,
    project,
    id: crypto.randomUUID(),
  };

  // Update the state with the new todo
  let specProj = state.projects.find(proj => proj.name === project);
  if (!specProj) {
    specProj = createProject(project);
  }
  specProj.todos.push(todo);

  // Update local storage
  saveData();

  return todo;
};

export const toggleChecklist = function (todoId) {
  // Find the todo
  const todo = findTodo(todoId);

  // Toggle its checklist property
  todo.checklist = todo.checklist ? false : true;

  // Update local storage
  saveData();
};

export const getTodos = function (projIdx = state.activeProjIdx) {
  // Update the active project index
  state.activeProjIdx = projIdx;

  // Return the todos in the active project
  return state.projects[state.activeProjIdx].todos;
};

const findTodo = function (todoId) {
  return state.projects[state.activeProjIdx].todos.find(
    todo => todo.id === todoId,
  );
};

export const getTodo = function (todoId) {
  // Find that specific todo in the state
  const todo = findTodo(todoId);

  // Return that specific todo
  return todo;
};

export const editTodo = function (todoId, updTodoObj) {
  // Find that specific todo in the state
  const todo = findTodo(todoId);

  // Update the Todo's properties
  todo.title = updTodoObj.title;
  todo.description = updTodoObj.description;
  todo.dueDate = updTodoObj.dueDate;
  todo.checklist = todo.checklist;

  // Update local storage
  saveData();
};

export const deleteTodo = function (todoId) {
  // Find that specific todo and its index in the state
  const todo = findTodo(todoId);
  const todoIdx = state.projects[state.activeProjIdx].todos.indexOf(todo);

  // Delete the todo from state
  state.projects[state.activeProjIdx].todos.splice(todoIdx, 1);

  // Update local storage
  saveData();
};

const saveData = function () {
  localStorage.setItem('state', JSON.stringify(state));
};

const init = function () {
  const storage = localStorage.getItem('state');
  if (storage) state = JSON.parse(storage);
};
init();

const clearData = function () {
  localStorage.clear('state');
};
// clearData();

export const state = {
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

  todo.toggleChecklist = function () {
    this.checklist = this.checklist ? false : true;
  };

  todo.changePriority = function (newPriority) {
    this.priority = newPriority;
  };

  // Update the state with the new todo
  let specProj = state.projects.find(proj => proj.name === project);
  if (!specProj) {
    specProj = createProject(project);
  }
  specProj.todos.push(todo);

  return todo;
};

export const getTodos = function (projIdx = state.activeProjIdx) {
  // Update the active project index
  state.activeProjIdx = projIdx;

  // Return the todos in the active project
  return state.projects[state.activeProjIdx].todos;
};

export const editTodo = function (todoId, updTodoObj) {
  // 1. Find that specific todo in the state
  const todo = state.projects[state.activeProjIdx].todos.find(
    todo => todo.id === todoId,
  );

  // 2. Update the Todo's properties
  todo.title = updTodoObj.title;
  todo.description = updTodoObj.description;
  todo.dueDate = updTodoObj.dueDate;
  todo.priority = updTodoObj.priority;
  todo.checklist = todo.checklist;
};

export const deleteTodo = function (todoId) {
  // 1. Find that specific todo and its index in the state
  const todo = state.projects[state.activeProjIdx].todos.find(
    todo => todo.id === todoId,
  );
  const todoIdx = state.projects[projectIdx].todos.indexOf(todo);

  // 2. Delete the todo from state
  state.projects[projectIdx].todos.splice(todoIdx, 1);
};

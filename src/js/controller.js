import '../index.css';
import * as model from './model';
import projectsView from './views/projectsView';
import todosView from './views/todosView';

const initDefault = function () {
  model.createTodo(
    'Brush teeth',
    'Brush my teeth in the morning.',
    new Date(),
    'medium',
    true,
  );

  model.createTodo(
    'Observe Solats',
    'Observe my five daily solats.',
    new Date(2025, 11, 17, 15),
    'high',
    false,
  );

  model.createTodo(
    'Cook & Eat',
    'Cook and eat my 3 square meals.',
    new Date(2025, 11, 15, 12),
    'low',
    false,
  );

  model.createTodo(
    'Read book',
    'Read ECE553 lecture materials.',
    new Date(2025, 11, 25),
    'high',
    false,
    'Academics',
  );

  model.createTodo(
    'Attend Class',
    'Attend ECE555 class.',
    new Date(2025, 11, 20),
    'medium',
    false,
    'Academics',
  );
};
initDefault();

// console.log(model.state);

// const updateTodo = {
//   title: 'Pray',
//   description: 'Pray zhur at 1:30pm',
//   dueDate: new Date(),
//   priority: 'medium',
//   checklist: '✅✅',
// };

const controlProjDraw = function () {
  // 1. Get available projects from state
  const projects = model.getProjects();

  // 2. Display the available projects in view
  projectsView.render(projects);
};

const controlSelectProject = function (projIdx) {
  // 1. Get the todos in the project
  const todos = model.getTodos(projIdx);

  // 2. Display all todos in view
  todosView.renderPreview(todos);
};

const controlCreateTodo = function (todoObj) {
  // 1. Create a new todo object in the current project
  const projectName = model.state.projects[model.state.activeProjIdx].name;
  model.createTodo(
    todoObj.title,
    todoObj.description,
    todoObj.dueDate,
    todoObj.priority,
    todoObj.checklist,
    projectName,
  );

  // 2. Get all todos in the current project
  const todos = model.getTodos();

  // 3. Re-render the todos of the current project
  todosView.renderPreview(todos);
};

const controlSelectTodo = function (todoId) {
  // 1. Get the full details of the clicked todo
  const todo = model.getTodo(todoId);

  // 2. Display the full view of the todo
  todosView.renderFullView(todo);
};

const controlEditTodo = function (todoId, updTodoObj) {
  // 1. Update the todo in the state
  model.editTodo(todoId, updTodoObj);

  // 2. Update the todos view
  todosView.renderPreview(model.getTodos());
};

const controlDeleteTodo = function (todoId) {
  // 1. Delete the todo from state
  model.deleteTodo(todoId);

  // 2. Update the todos view
  todosView.renderPreview(model.getTodos());
};

const controlWindowLoad = function () {
  // 1. Get all todos in the current project
  const todos = model.getTodos();

  // 2. Re-render the todos of the current project
  todosView.renderPreview(todos);
};

const controlCreateProj = function (projName) {
  // 1. Create a new project with the project name
  model.createProject(projName);

  // 2. Re-render the project view
  projectsView.render(model.getProjects());
};

const init = function () {
  todosView.addHandlerWindowLoad(controlWindowLoad);
  todosView.addHandlerCreateTodo(controlCreateTodo);
  todosView.addHanlderClick(controlSelectTodo);
  todosView.addHanlerEditTodo(controlEditTodo);
  todosView.addHandlerDeleteTodo(controlDeleteTodo);
  projectsView.addHandlerProjectsDrawer(controlProjDraw);
  projectsView.addHandlerClick(controlSelectProject);
  projectsView.addHandlerCreateProj(controlCreateProj);
};
init();

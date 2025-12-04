import '../index.css';
import * as model from './model';
import projectsView from './views/projectsView';
import todosView from './views/todosView';

const initDefault = function () {
  const brushTodo = model.createTodo(
    'Brush teeth',
    'Brush my teeth in the morning',
    '6:am',
    'medium',
    '❌❌',
  );

  const solatsTodo = model.createTodo(
    'Observe Solats',
    'Observe my five daily solats',
    'today',
    'high',
    '❌❌',
  );

  const eatTodo = model.createTodo(
    'Cook & Eat',
    'Cook and eat my 3 square meals',
    'today',
    'medium',
    '❌❌',
  );

  const readTodo = model.createTodo(
    'Read book',
    'Read ECE553 lecture materials',
    new Date(),
    'high',
    '❌❌',
    'Academics',
  );

  const classTodo = model.createTodo(
    'Attend Class',
    'Attend ECE555 class',
    'Dec 19',
    'medium',
    '❌❌',
    'Academics',
  );
};
initDefault();

// console.log(model.state)

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

const init = function () {
  projectsView.addHandlerProjectsDrawer(controlProjDraw);
  projectsView.addHandlerClick(controlSelectProject);
};
init();

const projectsView = (function () {
  const parentEl = document.querySelector('.projects');
  const projsContainer = document.querySelector('.projects-container');
  const projDrawBtn = document.querySelector('.proj-draw-btn');

  // Handles the slide-in-out of the projects container
  const addHandlerProjectsDrawer = function (handler) {
    projDrawBtn.addEventListener('click', function () {
      projsContainer.classList.toggle('-translate-x-full');

      handler();
    });
  };

  const addHandlerClick = function (handler) {
    parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('button');
      if (!btn) return;

      // Close the project drawer
      projsContainer.classList.add('-translate-x-full');

      const projIdx = +btn.dataset.idx;
      handler(projIdx);
    });
  };

  const generateMarkup = function (details) {
    return details
      .map((detail, idx) => `<button data-idx="${idx}">${detail}</button>`)
      .join('');
  };

  const clear = () => (parentEl.innerHTML = '');

  const render = function (details) {
    const markup = generateMarkup(details);

    clear();
    parentEl.insertAdjacentHTML('afterbegin', markup);
  };

  return { addHandlerProjectsDrawer, addHandlerClick, render };
})();

export default projectsView;

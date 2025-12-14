const projectsView = (function () {
  const parentEl = document.querySelector('.projects');
  const projsContainer = document.querySelector('.projects-container');
  const projDrawBtn = document.querySelector('.proj-draw-btn');

  // Use the 'let' keyword to declare the soon-to-be-defined HTML elements
  let addProjBtn, addProjFormEl, projNameInpEl;

  // Handles the slide-in-out of the projects container
  const addHandlerProjectsDrawer = function (handler) {
    projDrawBtn.addEventListener('click', function () {
      projsContainer.classList.toggle('-translate-x-full');

      handler();
    });
  };

  const addHandlerClick = function (handler) {
    parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('button.project');
      if (!btn) return;

      // Close the project drawer
      projsContainer.classList.add('-translate-x-full');

      const projIdx = +btn.dataset.idx;
      handler(projIdx);
    });
  };

  // Shift the button, and reveal or hide the form element
  const toggleFormEl = function () {
    addProjBtn.classList.toggle('ml-[-20px]');
    addProjFormEl.classList.toggle('opacity-0');
    addProjFormEl.classList.toggle('-translate-y-3');
  };

  const addHandlerCreateProj = function (handler) {
    parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.add-proj-btn');
      if (!btn) return;

      addProjBtn = btn;
      addProjFormEl = document.querySelector('.add-project-form');
      projNameInpEl = document.querySelector('.project-name-input');

      toggleFormEl();

      const isFormVisible = !addProjFormEl.classList.contains('opacity-0');
      setTimeout(() => {
        if (isFormVisible) projNameInpEl.focus();
      }, 250);

      // Handles the actual submit event of the create project form Element
      addProjFormEl.addEventListener('submit', function (e) {
        e.preventDefault();
        toggleFormEl();

        const projName = projNameInpEl.value;

        setTimeout(() => {
          projNameInpEl.value = '';
        }, 250);

        handler(projName);
      });
    });
  };

  const generateMarkup = function (details) {
    let projs = details
      .map(
        (detail, idx) =>
          `<button class="project" data-idx="${idx}">${detail}</button>`,
      )
      .join('');

    const addProjMarkup = `
      <div class="mt-2 flex items-center gap-2">
        <div
          class="add-proj-btn flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-500 opacity-90 duration-200 ease-in-out"
        >
          <button
            class="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 text-3xl leading-none font-extralight"
          >
            <span class="-translate-y-[7.5%] cursor-pointer">+</span>
          </button>
        </div>
        <form
          class="add-project-form flex max-w-[120px] -translate-y-3 gap-0 rounded-sm bg-white opacity-0 duration-200 ease-in-out"
        >
          <input
            type="text"
            placeholder="Project name..."
            class="project-name-input max-w-[100px] bg-transparent px-2 py-1 text-sm text-gray-900 focus:outline-none"
          />
          <button class="w-5 rounded-r-sm bg-blue-600 text-white">➜</button>
        </form>
      </div>
    `;

    projs += addProjMarkup;
    return projs;
  };

  const clear = () => (parentEl.innerHTML = '');

  const render = function (details) {
    const markup = generateMarkup(details);

    clear();
    parentEl.insertAdjacentHTML('afterbegin', markup);
  };

  return {
    addHandlerProjectsDrawer,
    addHandlerCreateProj,
    addHandlerClick,
    render,
  };
})();

export default projectsView;

const todosView = (function () {
  const parentEl = document.querySelector('.todos-subcontainer');

  const generatePreviewMarkup = function (details) {
    return details
      .map(
        detail => `
          <div class="todo flex flex-col gap-2">
            <div class="flex items-center gap-3 leading-5">
              <div class="cheklist h-5 w-5 rounded-sm bg-black"></div>
              <div>
                <p class="todo-title">${detail.title}</p>
                <div class="flex items-center justify-between gap-2">
                  <p class="dueDate font-serif text-sm text-gray-600">${detail.dueDate}</p>
                  <div class="priority h-3 w-3 rounded-full ${detail.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'}"></div>
                </div>
              </div>
            </div>
            <hr class="text-gray-300" />
          </div>
        `,
      )
      .join('');
  };

  const clear = () => (parentEl.innerHTML = '');

  const renderPreview = function (details) {
    const markup = generatePreviewMarkup(details);

    clear();
    parentEl.insertAdjacentHTML('afterbegin', markup);
  };

  return { renderPreview };
})();

export default todosView;

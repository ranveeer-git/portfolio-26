const filters = document.querySelector('.project-filters');
const buttons = filters.querySelectorAll('button');
const projects = document.querySelectorAll('.project-grid .project');
const count = document.querySelector('.project-count');

function selectTopic(topic) {
  let visible = 0;
  for (const project of projects) {
    project.hidden = topic !== 'all' && !project.dataset.topics.split(' ').includes(topic);
    if (!project.hidden) visible++;
  }
  for (const button of buttons) {
    button.setAttribute('aria-pressed', String(button.dataset.filter === topic));
  }
  count.textContent = `${visible} of ${projects.length} projects shown`;
}

for (const button of buttons) {
  button.addEventListener('click', () => selectTopic(button.dataset.filter));
}
selectTopic('all');
filters.hidden = false;

const dialog = document.getElementById('contact-dialog');
const form = document.getElementById('contact-form');
const result = document.getElementById('draft-result');
const draft = document.getElementById('email-draft');

document.querySelectorAll('[data-contact-open]').forEach(button => {
  button.addEventListener('click', () => dialog.showModal());
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
form.addEventListener('input', () => { result.hidden = true; });
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  const name = values.get('name').trim();
  const email = values.get('email').trim();
  const subject = values.get('subject').trim();
  const message = values.get('message').trim();
  if (!name || !subject || !message) {
    const empty = ['name', 'subject', 'message'].find(key => !values.get(key).trim());
    const field = form.elements.namedItem(empty);
    field.setCustomValidity('Please enter a value.');
    field.reportValidity();
    field.addEventListener('input', () => field.setCustomValidity(''), { once: true });
    return;
  }
  const body = `Hi Ranveer,\r\n\r\n${message}\r\n\r\nFrom: ${name}\r\nEmail: ${email}`;
  draft.href = `mailto:ranveersangwan22@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  result.hidden = false;
  draft.focus();
});

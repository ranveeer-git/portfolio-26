import { emailjsConfig } from './emailjs-config.mjs';
import { isConfigured, sendMessage } from './emailjs-client.mjs';

const dialog = document.getElementById('contact-dialog');
const form = document.getElementById('contact-form');
const result = document.getElementById('draft-result');
const draft = document.getElementById('email-draft');
const directSending = isConfigured(emailjsConfig);
const submitButton = form.querySelector('[type="submit"]');
const status = document.getElementById('send-status');
let sending = false;
if (directSending) {
  document.getElementById('contact-description').textContent = 'Tell me a little about what you have in mind. Your message will be sent directly to my inbox.';
  submitButton.textContent = 'Send message ↗';
  form.querySelector('.form-note').textContent = 'Your contact details and message are sent through EmailJS to reach my inbox.';
}

document.querySelectorAll('[data-contact-open]').forEach(button => {
  button.addEventListener('click', () => dialog.showModal());
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
form.addEventListener('input', () => { result.hidden = true; status.hidden = true; });
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (sending) return;
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
  if (directSending) {
    sending = true;
    const controls = [...form.querySelectorAll('input, textarea, button')];
    controls.forEach(control => { control.disabled = true; });
    form.setAttribute('aria-busy', 'true');
    submitButton.textContent = 'Sending…';
    status.hidden = false;
    status.textContent = 'Sending your message…';
    status.dataset.state = 'sending';
    try {
      await sendMessage(emailjsConfig, { name, email, subject, message });
      form.reset();
      status.textContent = 'Message sent. Thanks for reaching out!';
      status.dataset.state = 'success';
    } catch (error) {
      status.textContent = error.message;
      status.dataset.state = 'error';
    } finally {
      sending = false;
      controls.forEach(control => { control.disabled = false; });
      form.removeAttribute('aria-busy');
      submitButton.textContent = 'Send message ↗';
    }
    return;
  }
  const body = `Hi Ranveer,\r\n\r\n${message}\r\n\r\nFrom: ${name}\r\nEmail: ${email}`;
  draft.href = `mailto:ranveersangwan22@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  result.hidden = false;
  draft.focus();
});

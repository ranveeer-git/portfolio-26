# portfolio-26

Ranveer Sangwan's personal portfolio, showcasing practical AI, computer vision, and full-stack projects, experience, education, skills, and achievements.

[Visit the portfolio](https://ranveer-sangwan-portfolio.tartscout16.chatgpt.site) (currently private; access requires the owner's account).

## Features

- Responsive layout with a portrait and project artwork.
- GitHub repository links and the Smart QR live demo.
- Accessible contact popup with validation and direct EmailJS delivery.
- Sending, success, and error feedback, with duplicate submissions blocked while sending.
- Email and LinkedIn contact links, keyboard navigation, and reduced-motion support.

## Run locally

No package installation or build step is required. With Python installed, run this command from the project folder:

```sh
python -m http.server 4173 --directory dist
```

Open http://localhost:4173 in your browser. A static HTTP server is required because the contact scripts use JavaScript modules.

## Project structure

```text
dist/
  index.html           Page content and contact dialog
  styles.css           Layout, styling, and responsive rules
  contact.js           Dialog, validation, and submission handling
  emailjs-client.mjs   EmailJS API integration
  emailjs-config.mjs   Public EmailJS identifiers
  assets/              Portrait image
.openai/hosting.json    Existing Sites deployment configuration
EMAILJS-SETUP.md        EmailJS template and domain configuration
```

## Customize

Edit `dist/index.html` for portfolio content and project links, and `dist/styles.css` for appearance. The project artwork is illustrative CSS rather than screenshots of the applications.

The contact form uses EmailJS template variables `name`, `email`, `subject`, and `message`. Follow [EMAILJS-SETUP.md](EMAILJS-SETUP.md) when configuring your own service. Only public identifiers belong in the frontend; never commit private keys, passwords, or access tokens. Domain restrictions may need to allow your local server for delivery testing.

## Hosting

The existing Sites deployment serves `dist` and is separate from this GitHub repository. Pushing to GitHub alone does not update the hosted portfolio. GitHub Pages or another static host can also serve the contents of `dist` after its own deployment setup.

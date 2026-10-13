# Enable direct contact messages

The integration is prepared but direct sending stays off until all three public identifiers in `dist/emailjs-config.mjs` are filled in. The deployed version continues to offer email drafts until activation and deployment.

1. Create an EmailJS account at https://dashboard.emailjs.com/ and connect a service in Email Services.
2. Create a Contact Us template with these settings:
   - To Email: `ranveersangwan22@gmail.com` (fixed recipient)
   - From Name: `{{name}}`
   - From Email: use the service's default email address
   - Reply-To: `{{email}}`
   - Subject: `Portfolio: {{subject}}`
   - Body: `Name: {{name}}`, `Email: {{email}}`, and `{{message}}`
3. Supply the Service ID, Template ID, and Public Key. Never supply a private key or email password.
4. Add `https://ranveer-sangwan-portfolio.tartscout16.chatgpt.site` to the EmailJS domain allowlist.
5. After configuring, verify the loading, success, and error states, then deploy and test delivery to the inbox.

Docs: https://www.emailjs.com/docs/rest-api/send/

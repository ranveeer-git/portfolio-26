export function isConfigured(config) {
  return ['serviceId', 'templateId', 'publicKey'].every(key => typeof config[key] === 'string' && config[key].trim());
}

export async function sendMessage(config, values, fetchImpl = fetch) {
  if (!isConfigured(config)) throw new Error('Email sending is not configured.');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetchImpl('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        service_id: config.serviceId,
        template_id: config.templateId,
        user_id: config.publicKey,
        template_params: { name: values.name, email: values.email, subject: values.subject, message: values.message },
      }),
    });
    if (!response.ok) throw new Error(response.status === 429
      ? 'Too many messages right now. Please try again later.'
      : 'Your message could not be sent. Please try again or use the email link.');
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('Sending timed out. Please try again later.');
    if (error instanceof TypeError) throw new Error('Could not connect. Check your connection and try again.');
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

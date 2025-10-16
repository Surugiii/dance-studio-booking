import { supabase } from './supabasecon.js';

const form = document.getElementById('reset-form');
const emailInput = document.getElementById('email');
const resetBtn = document.getElementById('reset-btn');
const statusDiv = document.getElementById('status');

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = emailInput.value.trim();
  if (!email) {
    showStatus('Please enter your email address.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showStatus('Please enter a valid email address.', 'error');
    return;
  }

  resetBtn.disabled = true;
  resetBtn.textContent = 'Sending...';
  showStatus('Sending reset email...', 'info');

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/change-password.html`,
      captchaToken: null
    });

    if (error) {
      console.error('Reset error:', error);
      showStatus(`Error: ${error.message}. Make sure the email is registered.`, 'error');
    } else {
      console.log('Reset email sent successfully');
      showStatus('Reset link sent! Check your email (including spam folder).', 'success');
      form.reset();
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    showStatus('An unexpected error occurred. Please try again.', 'error');
  } finally {
    resetBtn.disabled = false;
    resetBtn.textContent = 'Send Reset Link';
  }
});

function showStatus(message, type) {
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
  statusDiv.style.display = 'block';
  
  if (type === 'success') {
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 5000);
  } else if (type === 'error') {
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 10000);
  }
}
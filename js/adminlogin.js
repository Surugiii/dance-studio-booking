import { supabase } from './supabasecon.js';

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const toggleLink = document.getElementById('toggle-link');
const toggleText = document.getElementById('toggle-text');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');

const loginErrorP = document.getElementById('login-error');
const signupErrorP = document.getElementById('signup-error');

let isLogin = true;

toggleLink.addEventListener('click', () => {
  isLogin = !isLogin;
  if (isLogin) {
    formTitle.textContent = 'Login';
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    toggleText.textContent = "Don't have an account?";
    toggleLink.textContent = 'Sign Up';
    loginErrorP.textContent = '';
    signupErrorP.textContent = '';
  } else {
    formTitle.textContent = 'Sign Up';
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    toggleText.textContent = 'Already have an account?';
    toggleLink.textContent = 'Login';
    loginErrorP.textContent = '';
    signupErrorP.textContent = '';
  }
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginErrorP.textContent = '';

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    loginErrorP.textContent = error.message;
  } else {
    const { data: { user } } = await supabase.auth.getUser ();
    if (!user) {
      loginErrorP.textContent = 'User  not found after login.';
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError) {
      loginErrorP.textContent = 'Failed to fetch user role.';
      return;
    }

    if (profile.role === 'admin') {
      window.location.href = './admin.html';
    } else {
      window.location.href = './user-dashboard.html';
    }
  }
});

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  signupErrorP.textContent = '';

  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    signupErrorP.textContent = error.message;
  } else {
    alert('Sign up successful! Please check your email to confirm your account before logging in.');
    toggleLink.click();
  }
});
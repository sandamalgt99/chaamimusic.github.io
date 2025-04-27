// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});

// Slideshow
let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName('slide');
  let dots = document.getElementsByClassName('dot');

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }

  if (slides.length > 0) {
    slides[slideIndex-1].style.display = 'block';  
    dots[slideIndex-1].className += ' active';
  }

  setTimeout(showSlides, 3000); // Change image every 3 seconds
}

// Modal Handling
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const closeLogin = document.getElementById('close-login');
const closeSignup = document.getElementById('close-signup');

// Open Modals
loginBtn.addEventListener('click', () => {
  loginModal.style.display = 'block';
});

signupBtn.addEventListener('click', () => {
  signupModal.style.display = 'block';
});

// Close Modals
closeLogin.addEventListener('click', () => {
  loginModal.style.display = 'none';
});

closeSignup.addEventListener('click', () => {
  signupModal.style.display = 'none';
});

// Close modal if clicked outside
window.addEventListener('click', (e) => {
  if (e.target == loginModal) {
    loginModal.style.display = 'none';
  }
  if (e.target == signupModal) {
    signupModal.style.display = 'none';
  }
});


      
      // Simple JavaScript for current year in footer
        document.getElementById('year').textContent = new Date().getFullYear();
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            });
        });

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.menu-toggle');
  const overlay = document.querySelector('.nav-overlay');
  const navLinks = document.querySelectorAll('.nav-items a');

  // Toggle menu function
  const toggleMenu = () => {
    navbar.classList.toggle('active');
    const isExpanded = navbar.classList.contains('active');
    toggle.setAttribute('aria-expanded', isExpanded);
  };

  // Event listeners
  toggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);
  navLinks.forEach(link => link.addEventListener('click', toggleMenu));
});


document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submit-btn');
  const formMessage = document.getElementById('form-message');
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  formMessage.textContent = '';
  formMessage.className = 'message';
  
  // Replace with your Google Apps Script URL
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzoNiEz4wiUMdoivgilZrjSRQQ4oSqbNRlzxajmFyHVMnHfJxkz-cVi5_mSgyoxD4o8/exec';
  
  const formData = new FormData(this);
  
  fetch(scriptURL, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    formMessage.textContent = 'Message sent successfully!';
    formMessage.className = 'message success';
    this.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  })
  .catch(error => {
    formMessage.textContent = 'Error sending message. Please try again.';
    formMessage.className = 'message error';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  });
});
// Initialize EmailJS
(function(){
    emailjs.init("your_public_key"); // Replace with your EmailJS public key
})();

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Simple fade-in animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.section, .timeline-item, .skill-category, .project-card, .certification-item, .contact-item');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form Submission Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Please fill in all fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Send email using EmailJS
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // EmailJS configuration
            const serviceId = 'service_your_service_id'; // Replace with your EmailJS service ID
            const templateId = 'template_your_template_id'; // Replace with your EmailJS template ID
            const publicKey = 'your_public_key'; // Replace with your EmailJS public key

            const templateParams = {
                from_name: name,
                from_email: email,
                to_name: 'Yoopy Christian',
                message: message,
                reply_to: email
            };

            // Send email using EmailJS
            emailjs.send(serviceId, templateId, templateParams, publicKey)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Sorry, there was an error sending your message. Please try again or contact me directly.');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
});

// Scroll to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    // Show/hide scroll-to-top button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top functionality
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Dynamic Experience Duration Calculator
document.addEventListener('DOMContentLoaded', function() {
    function calculateExperienceDuration() {
        const startDate = new Date('2023-01-01');
        const currentDate = new Date();

        let years = currentDate.getFullYear() - startDate.getFullYear();
        let months = currentDate.getMonth() - startDate.getMonth();

        // Adjust if current month is before January
        if (months < 0) {
            years--;
            months += 12;
        }

        // Adjust if current date is before the 1st of the month
        if (currentDate.getDate() < startDate.getDate()) {
            months--;
            if (months < 0) {
                years--;
                months += 12;
            }
        }

        // Format the duration string
        let durationText = '';
        if (years > 0) {
            durationText += years + ' year' + (years > 1 ? 's' : '');
            if (months > 0) {
                durationText += ' ' + months + ' month' + (months > 1 ? 's' : '');
            }
        } else if (months > 0) {
            durationText += months + ' month' + (months > 1 ? 's' : '');
        } else {
            durationText = 'Less than 1 month';
        }

        // Update the experience duration element
        const durationElement = document.getElementById('current-experience-duration');
        if (durationElement) {
            durationElement.innerHTML = `<i class="fas fa-calendar-alt"></i>Jan 2023 - Present (${durationText})`;
        }
    }

    // Calculate duration immediately
    calculateExperienceDuration();

    // Update every month (approximately every 30 days)
    setInterval(calculateExperienceDuration, 30 * 24 * 60 * 60 * 1000);
});

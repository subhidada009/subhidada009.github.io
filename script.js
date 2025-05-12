document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Change icon
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    // Update footer year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Animate stats numbers
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateNumbers() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const increment = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(increment);
                } else {
                    stat.textContent = target + '+';
                }
            };

            increment();
        });
    }

    // Animate skill bars with percentage numbers
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-level');

        skillBars.forEach(bar => {
            const target = parseInt(bar.getAttribute('data-level'));
            const percentElement = bar.closest('.skill-item').querySelector('.skill-percent');
            const duration = 1500;
            const step = target / (duration / 16);
            let current = 0;

            const animate = () => {
                current += step;
                if (current < target) {
                    bar.style.width = Math.floor(current) + '%';
                    if (percentElement) {
                        percentElement.textContent = Math.floor(current) + '%';
                    }
                    requestAnimationFrame(animate);
                } else {
                    bar.style.width = target + '%';
                    if (percentElement) {
                        percentElement.textContent = target + '%';
                    }
                }
            };

            animate();
        });
    }

    // Intersection Observer for scroll effects
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('data-scroll', 'in');

                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }

                if (entry.target.id === 'about') {
                    animateNumbers();
                }
            }
        });
    }, { threshold: 0.3 });

    // Observe sections
    document.querySelectorAll('#skills, #about').forEach(section => {
        observer.observe(section);
    });

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            console.log('Form submitted:', data);
            alert('Thank you! Your message has been sent and we\'ll contact you soon.');
            this.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
/* ===== Select Elements ===== */
const toggleBtn = document.querySelector('.theme-toggle');
const body = document.body;
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
const reveals = document.querySelectorAll('.reveal');

/* ===== Dark Mode (with localStorage) ===== */
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    body.classList.add('dark');
    toggleBtn.textContent = '☀️';
}

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark');

    if (body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        toggleBtn.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        toggleBtn.textContent = '🌙';
    }
});

/* ===== Navbar Active on Click ===== */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

/* ===== Scroll Reveal ===== */
const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    },
    { threshold: 0.15 }
);

reveals.forEach(section => revealObserver.observe(section));

/* ===== Active Nav on Scroll ===== */
const navObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(
                    `.nav-links a[href="#${id}"]`
                );

                if (activeLink) activeLink.classList.add('active');
            }
        });
    },
    { rootMargin: '-50% 0px -50% 0px' }
);

sections.forEach(sec => navObserver.observe(sec));

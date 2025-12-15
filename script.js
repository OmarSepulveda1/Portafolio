// Scroll Animation
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    reveals.forEach(section => {
        const windowHeight = window.innerHeight;
        const elementTop = section.getBoundingClientRect().top;
        const visiblePoint = 120;

        if (elementTop < windowHeight - visiblePoint) {
            section.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Form Submission
var form = document.getElementById("contact-form");

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "¡Gracias por tu mensaje! Te contactaré pronto.";
            form.reset()
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                } else {
                    status.innerHTML = "Oops! Hubo un problema al enviar tu formulario."
                }
            })
        }
    }).catch(error => {
        status.innerHTML = "Oops! Hubo un problema al enviar tu formulario."
    });
}
form.addEventListener("submit", handleSubmit)

// Copyright Year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Make project cards clickable
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const link = card.querySelector('a.btn-repo');
        if (link) {
            card.addEventListener('click', (e) => {
                // Prevent the click from propagating to the link itself,
                // which would cause a double trigger if the user clicks exactly on the link.
                if (e.target.tagName !== 'A') {
                    link.click();
                }
            });
        }
    });
});
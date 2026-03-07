// --- Animated Typing Effect ---
const typingTextElement = document.getElementById('typing-text');
const phrases = ["Linux System Administrator", "Red Hat Certified Engineer", "Aws Cloud Practitioner", "Cloud Engineer"];
let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        typingTextElement.textContent = currentPhrase.substring(0, letterIndex - 1);
        letterIndex--;
    } else {
        typingTextElement.textContent = currentPhrase.substring(0, letterIndex + 1);
        letterIndex++;
    }

    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && letterIndex === currentPhrase.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
    if(typingTextElement) typeEffect();
});

// --- Scroll Animations & Skill Bars ---
const fadeElements = document.querySelectorAll('.fade-in');
const skillBars = document.querySelectorAll('.skill-per');

const observerOptions = { root:null, rootMargin:'0px', threshold:0.2 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
            if(entry.target.classList.contains('skills-container')){
                skillBars.forEach(bar=>{
                    const width = bar.dataset.width || bar.style.width;
                    bar.style.width='0%';
                    setTimeout(()=>{ bar.style.width=width; }, 200);
                });
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el=>observer.observe(el));

// --- Smooth Scroll ---
document.querySelectorAll('nav a[href^="#"]').forEach(link=>{
    link.addEventListener('click', e=>{
        e.preventDefault();
        const target=document.querySelector(link.getAttribute('href'));
        if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
});

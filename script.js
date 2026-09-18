/**
 * R.R. Syndicate Web Interface
 * Engine: Vanilla ES2026
 * Arch: Minimalist interactive frontend
 */

// --- 1. The Blacklist Data ---
// In a production environment, this would be fetched from a secure Supabase or private API instance.
const blacklistData = [
    { number: "No. 001", name: "Elizabeth Keen", status: "Deceased", class: "deceased" },
    { number: "No. 004", name: "Mr. Kaplan", status: "Deceased", class: "deceased" },
    { number: "No. 008", name: "Berlin", status: "Deceased", class: "deceased" },
    { number: "No. 014", name: "Alexander Kirk", status: "Active", class: "active" },
    { number: "No. 016", name: "Anslo Garrick", status: "Deceased", class: "deceased" },
    { number: "No. 047", name: "The Freelancer", status: "Incarcerated", class: "incarcerated" },
    { number: "No. 079", name: "The Stewmaker", status: "Deceased", class: "deceased" },
    { number: "No. 109", name: "Nathaniel Wolff", status: "Active", class: "active" }
];

// --- 2. Typewriter Effect (Hero Section) ---
class Typewriter {
    constructor(elementId, strings, speed = 50, delay = 2000) {
        this.element = document.getElementById(elementId);
        this.strings = strings;
        this.speed = speed;
        this.delay = delay;
        this.stringIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const currentString = this.strings[this.stringIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentString.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentString.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.speed;
        if (this.isDeleting) typeSpeed /= 2;

        if (!this.isDeleting && this.charIndex === currentString.length) {
            typeSpeed = this.delay;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.stringIndex = (this.stringIndex + 1) % this.strings.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// --- 3. DOM Content Loaded Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Typewriter
    new Typewriter('typewriter-text', [
        "I can only lead you to the truth...",
        "I cannot make you believe it.",
        "There are no choices in this world. Only illusions.",
        "Value loyalty above all else."
    ]);

    // Populate The Blacklist Grid
    const listContainer = document.querySelector('.list-container');
    
    // Fragment used to minimize repaints
    const fragment = document.createDocumentFragment();
    
    blacklistData.forEach(target => {
        const item = document.createElement('div');
        item.className = 'blacklist-item reveal';
        item.setAttribute('data-number', target.number.split(' ')[1]); 
        
        item.innerHTML = `
            <div class="name">${target.number} - ${target.name}</div>
            <div class="status ${target.class}">Status: ${target.status}</div>
        `;
        fragment.appendChild(item);
    });
    
    listContainer.appendChild(fragment);

    // --- 4. Intersection Observer for Scroll Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // --- 5. Form Handling Override ---
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const originalText = btn.textContent;
        
        btn.textContent = 'Encrypting & Sending...';
        btn.style.background = '#333';
        btn.style.borderColor = '#333';
        
        // Mock secure transmission delay
        setTimeout(() => {
            btn.textContent = 'Transmission Secure';
            btn.style.background = '#2e8b57';
            btn.style.borderColor = '#2e8b57';
            e.target.reset();
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = 'var(--accent-red)';
                btn.style.borderColor = 'var(--accent-red)';
            }, 3000);
        }, 1500);
    });
});

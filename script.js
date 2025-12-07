// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Smooth Scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Active Navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Quote Calculator
function updateCupDisplay(value) {
    document.getElementById('cupDisplay').textContent = value + ' cups/day';
}

document.getElementById('quoteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const businessType = formData.get('businessType');
    const dailyCups = formData.get('dailyCups');
    const serviceType = formData.get('serviceType');
    
    // Calculate pricing
    let basePrice = 0;
    if (serviceType === 'rental') {
        basePrice = Math.ceil(dailyCups * 3.5); // AED per cup/day
    } else if (serviceType === 'fullService') {
        basePrice = Math.ceil(dailyCups * 5.5);
    } else if (serviceType === 'purchase') {
        basePrice = Math.ceil(dailyCups * 85); // Purchase price
    }
    
    // Display result
    const quoteResult = document.getElementById('quoteResult');
    const quoteDetails = document.getElementById('quoteDetails');
    
    quoteDetails.innerHTML = `
        <p><strong>Business Type:</strong> ${businessType.charAt(0).toUpperCase() + businessType.slice(1)}</p>
        <p><strong>Daily Usage:</strong> ${dailyCups} cups/day</p>
        <p><strong>Service Type:</strong> ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</p>
        <hr style="margin: 1rem 0; border: none; border-top: 1px solid #ddd;">
        <p><strong>Estimated ${serviceType === 'purchase' ? 'Price' : 'Monthly Cost'}:</strong> <span style="color: #00897B; font-size: 1.2rem; font-weight: bold;">AED ${basePrice.toLocaleString()}</span></p>
        <small style="color: #9E9E9E;">*Final price may vary based on specific requirements</small>
    `;
    
    quoteResult.style.display = 'block';
    quoteResult.scrollIntoView({ behavior: 'smooth' });
});

// Modal Functions
function showQuoteModal(machineType = '') {
    const modal = document.getElementById('quoteModal');
    modal.style.display = 'block';
    
    if (machineType) {
        const serviceSelect = modal.querySelector('select[name="serviceType"]');
        if (serviceSelect) {
            serviceSelect.value = machineType === 'rental' ? 'rental' : 'purchase';
        }
    }
}

function closeQuoteModal() {
    document.getElementById('quoteModal').style.display = 'none';
}

function bookDemo() {
    alert('Thank you for your interest! Our team will contact you within 2 hours to schedule your free demo.');
    closeQuoteModal();
}

// Modal Form Submission
document.getElementById('modalQuoteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    alert(`Thank you ${data.name}! Your quote request has been submitted. Our team will contact you within 2 hours.`);
    
    // Reset form and close modal
    this.reset();
    closeQuoteModal();
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    alert(`Thank you ${data.name}! Your message has been sent. We will respond within 2 hours.`);
    
    // Reset form
    this.reset();
});

// Machine Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const machineCards = document.querySelectorAll('.machine-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        machineCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('quoteModal');
    if (e.target === modal) {
        closeQuoteModal();
    }
});

// Add scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--white)';
        header.style.backdropFilter = 'none';
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

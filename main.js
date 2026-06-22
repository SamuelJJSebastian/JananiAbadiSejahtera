// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation (Intersection Observer)
const animateElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in, .reveal-text');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // If it's a counter, animate it
            if (entry.target.querySelector('.counter')) {
                animateCounters(entry.target);
            }
            observer.unobserve(entry.target); // Animate once
        }
    });
}, observerOptions);

animateElements.forEach(el => observer.observe(el));

// Number Counter Animation
function animateCounters(parentElement) {
    const counters = parentElement.querySelectorAll('.counter');
    const speed = 80; // The lower the divisor, the faster the animation

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 15);
            } else {
                const suffix = counter.getAttribute('data-suffix') || '';
                counter.innerText = target.toLocaleString() + suffix;
            }
        };
        updateCount();
    });
}


// Anchor Clients Logos Injection
const clients = [
    { name: 'Coca-Cola', url: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg' },
    { name: 'Mayora', url: 'assets/mayora.svg' },
    { name: 'Sinar Sosro', url: 'assets/sosro.png' },
    { name: 'Chandra Asri', url: 'assets/chandra.webp' },
    { name: 'Lotte', url: 'assets/lotte_chemical.png' },
    { name: 'Sinar Mas', url: 'assets/sinarmas.png' },
    { name: 'Wings Group', url: 'assets/wings_group.svg' },
    { name: 'Tjiwi Kimia', url: 'assets/tjiwi_kimia.png' },
    { name: 'Indah Kiat', url: 'assets/indah_kiat.png' },
    { name: 'Angels Products', url: 'assets/angelsproducts.png' },
    { name: 'Mitsubishi', url: 'assets/Mitsubishi_Chemical_Group.svg.png' },
    { name: 'Otsuka', url: 'assets/otsuka.png' }
];

const marqueeContainer = document.getElementById('logo-marquee');

function createLogoElement(client) {
    const container = document.createElement('div');
    container.className = 'client-logo-container';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';

    const img = document.createElement('img');
    img.src = client.url || `https://logo.clearbit.com/${client.domain}?size=400&greyscale=true`;
    img.alt = `${client.name} Logo`;
    img.className = 'client-logo';
    
    // Scale up specific logos to counteract intrinsic whitespace
    if (client.name === 'Mayora' || client.name === 'Chandra Asri' || client.name === 'Angels Products') {
        img.classList.add('logo-large');
    } else if (client.name === 'Sinar Mas') {
        img.classList.add('logo-xlarge');
    } else if (client.name === 'Lotte') {
        img.classList.add('logo-xxlarge');
    } else if (client.name === 'Tjiwi Kimia') {
        img.classList.add('logo-170');
    }
    
    img.onerror = function() {
        this.style.display = 'none';
        // Elegant text fallback if image is blocked by adblockers or missing
        const fallback = document.createElement('span');
        fallback.className = 'client-logo-fallback';
        fallback.innerText = client.name;
        container.appendChild(fallback);
    };
    
    container.appendChild(img);
    return container;
}

function initMarquee() {
    clients.forEach(client => {
        marqueeContainer.appendChild(createLogoElement(client));
    });
    clients.forEach(client => {
        marqueeContainer.appendChild(createLogoElement(client));
    });
}

document.addEventListener('DOMContentLoaded', initMarquee);

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax Effect for backgrounds
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    const parallaxEco = document.querySelectorAll('.parallax-bg-eco');
    
    parallaxBgs.forEach(bg => {
        bg.style.transform = `translateY(${scrolled * 0.4}px)`;
    });
    
    parallaxEco.forEach(bg => {
        // Only parallax if in view
        const parentTop = bg.parentElement.offsetTop;
        if (scrolled + window.innerHeight > parentTop) {
            const relativeScroll = scrolled - parentTop + window.innerHeight;
            bg.style.transform = `translateY(${relativeScroll * 0.2}px)`;
        }
    });
});

// Profile Image Carousel
const profileSlides = document.querySelectorAll('.carousel-slide');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
let currentProfileSlide = 0;
let carouselInterval;

function showSlide(index) {
    profileSlides.forEach(slide => slide.classList.remove('active'));
    currentProfileSlide = (index + profileSlides.length) % profileSlides.length;
    profileSlides[currentProfileSlide].classList.add('active');
}

function nextSlide() { showSlide(currentProfileSlide + 1); }
function prevSlide() { showSlide(currentProfileSlide - 1); }

if (profileSlides.length > 0) {
    nextBtn?.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    prevBtn?.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    function resetInterval() {
        clearInterval(carouselInterval);
        carouselInterval = setInterval(nextSlide, 4500);
    }
    
    carouselInterval = setInterval(nextSlide, 4500);
}

// Initialize Lucide icons
lucide.createIcons();

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
let isMobileMenuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
  isMobileMenuOpen = !isMobileMenuOpen;
  
  if (isMobileMenuOpen) {
    mobileMenu.classList.remove('hidden');
    menuIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
  } else {
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  }
});

// Navbar scroll effect
let hasScrolled = false;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 50;
  
  if (scrolled !== hasScrolled) {
    hasScrolled = scrolled;
    
    if (scrolled) {
      navbar.classList.add('navbar-scrolled');
      navbar.classList.remove('bg-white/95');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.remove('navbar-scrolled');
      navbar.classList.remove('bg-white');
      navbar.classList.add('bg-white/95');
    }
  }
});

// Hero carousel functionality
const carouselData = [
  {
    url: "https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Technology",
    color: "#00CFFF"
  },
  {
    url: "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Health & Wellness",
    color: "#00D084"
  },
  {
    url: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Diet & Nutrition",
    color: "#FF7F50"
  },
  {
    url: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Books & Learning",
    color: "#9B59B6"
  }
];

let currentSlide = 0;
const heroCarousel = document.getElementById('hero-carousel');
const carouselDots = document.getElementById('carousel-dots');

// Create carousel slides
function createCarouselSlides() {
  heroCarousel.innerHTML = '';
  
  carouselData.forEach((slide, index) => {
    const slideDiv = document.createElement('div');
    slideDiv.className = `absolute inset-0 transition-opacity duration-1000 carousel-slide ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`;
    
    slideDiv.innerHTML = `
      <img src="${slide.url}" alt="${slide.category}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      <div class="absolute bottom-6 left-6 right-6">
        <div class="inline-block px-4 py-2 rounded-full text-white font-semibold text-sm mb-2" style="background-color: ${slide.color};">
          ${slide.category}
        </div>
        <h3 class="text-white text-xl font-bold">Latest in ${slide.category}</h3>
      </div>
    `;
    
    heroCarousel.appendChild(slideDiv);
  });
}

// Create carousel dots
function createCarouselDots() {
  carouselDots.innerHTML = '';
  
  carouselData.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `carousel-dot w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-purple-600 w-8' : 'bg-gray-300 hover:bg-gray-400'}`;
    
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel();
    });
    
    carouselDots.appendChild(dot);
  });
}

// Update carousel display
function updateCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  
  slides.forEach((slide, index) => {
    if (index === currentSlide) {
      slide.classList.add('opacity-100');
      slide.classList.remove('opacity-0');
    } else {
      slide.classList.remove('opacity-100');
      slide.classList.add('opacity-0');
    }
  });
  
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add('bg-purple-600', 'w-8');
      dot.classList.remove('bg-gray-300');
    } else {
      dot.classList.remove('bg-purple-600', 'w-8');
      dot.classList.add('bg-gray-300');
    }
  });
}

// Auto-advance carousel
function startCarousel() {
  setInterval(() => {
    currentSlide = (currentSlide + 1) % carouselData.length;
    updateCarousel();
  }, 4000);
}

// Newsletter form functionality
const newsletterForm = document.getElementById('newsletter-form');
const newsletterSuccess = document.getElementById('newsletter-success');
const emailInput = document.getElementById('email-input');
let isSubscribed = false;

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (!isSubscribed) {
    isSubscribed = true;
    
    // Hide form and show success message
    newsletterForm.classList.add('hidden');
    newsletterSuccess.classList.remove('hidden');
    
    // Reset after 3 seconds (for demo purposes)
    setTimeout(() => {
      isSubscribed = false;
      newsletterForm.classList.remove('hidden');
      newsletterSuccess.classList.add('hidden');
      emailInput.value = '';
    }, 3000);
  }
});

// Initialize smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scroll animations for elements coming into view
function observeElements() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe sections for animations
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Initialize page functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  createCarouselSlides();
  createCarouselDots();
  startCarousel();
  observeElements();
  
  // Re-initialize Lucide icons after dynamic content is loaded
  setTimeout(() => {
    lucide.createIcons();
  }, 100);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (isMobileMenuOpen && !mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
    isMobileMenuOpen = false;
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  }
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024 && isMobileMenuOpen) {
    isMobileMenuOpen = false;
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  }
});

// Add hover effects for interactive elements
document.querySelectorAll('button, .group').forEach(element => {
  element.addEventListener('mouseenter', () => {
    element.style.transform = 'translateY(-2px)';
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'translateY(0)';
  });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounced scroll handler
window.addEventListener('scroll', debounce(() => {
  const scrolled = window.scrollY > 50;
  
  if (scrolled !== hasScrolled) {
    hasScrolled = scrolled;
    
    if (scrolled) {
      navbar.classList.add('navbar-scrolled');
      navbar.classList.remove('bg-white/95');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.remove('navbar-scrolled');
      navbar.classList.remove('bg-white');
      navbar.classList.add('bg-white/95');
    }
  }
}, 10));

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isMobileMenuOpen) {
    isMobileMenuOpen = false;
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  }
});

// Accessibility improvements
document.querySelectorAll('button').forEach(button => {
  if (!button.getAttribute('aria-label') && button.textContent.trim() === '') {
    const icon = button.querySelector('[data-lucide]');
    if (icon) {
      const iconName = icon.getAttribute('data-lucide');
      button.setAttribute('aria-label', iconName.replace('-', ' '));
    }
  }
});

// Add loading states for images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('load', () => {
    img.style.opacity = '1';
  });
  
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.3s ease';
});

// Initialize all functionality
console.log('DailyZest website loaded successfully!');

// ===== Search Dropdown =====
const searchBtn = document.getElementById("search-btn");
const searchDropdown = document.getElementById("search-dropdown");
const searchClose = document.getElementById("search-close");
const searchInput = searchDropdown ? searchDropdown.querySelector(".search-input") : null;

if (searchBtn && searchDropdown && searchClose && searchInput) {
  searchBtn.addEventListener("click", () => {
    searchDropdown.classList.toggle("active");
    if (searchDropdown.classList.contains("active")) {
      searchInput.focus();
    }
  });

  searchClose.addEventListener("click", () => {
    searchDropdown.classList.remove("active");
  });
}

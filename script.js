document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Image Carousel
    const carouselContainer = document.querySelector('.carousel-container');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    // Dynamic list of images
    let images = [];
    let currentIndex = 0;

    function fetchImageList() {
        fetch('get_images.php')
            .then(response => response.json())
            .then(data => {
                images = data;
                createCarouselSlides();
            })
            .catch(error => console.error('Error fetching image list:', error));
    }

    function createCarouselSlides() {
        carouselContainer.innerHTML = '';
        indicatorsContainer.innerHTML = '';
        images.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = `assets/images/cara/${image}`;
            img.alt = `Portfolio work ${index + 1}`;
            img.classList.add('carousel-slide');
            img.loading = 'lazy';
            carouselContainer.appendChild(img);

            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
        updateCarouselDisplay();
    }

    function updateCarouselDisplay() {
        const slides = carouselContainer.querySelectorAll('.carousel-slide');
        const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
        slides[currentIndex].scrollIntoView({ behavior: 'smooth', inline: 'start' });
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function moveCarousel(direction) {
        currentIndex = (currentIndex + direction + images.length) % images.length;
        updateCarouselDisplay();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarouselDisplay();
    }

    prevButton.addEventListener('click', () => moveCarousel(-1));
    nextButton.addEventListener('click', () => moveCarousel(1));

    carouselContainer.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') moveCarousel(-1);
        if (e.key === 'ArrowRight') moveCarousel(1);
    });

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '100px' });

    // Initialize the carousel
    fetchImageList();

    // Portfolio Grid
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const portfolioItems = [
        { image: 'project1.jpg', title: 'Luxury Residence' },
        { image: 'project2.jpg', title: 'Commercial Complex' },
        { image: 'project3.jpg', title: 'Urban Development' },
        // Add more portfolio items as needed
    ];

    portfolioItems.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.classList.add('portfolio-item');
        portfolioItem.innerHTML = `
            <img src="assets/images/portfolio/${item.image}" alt="${item.title}">
            <div class="portfolio-item-overlay">
                <h3>${item.title}</h3>
            </div>
        `;
        portfolioGrid.appendChild(portfolioItem);
    });

    // Testimonials Carousel
    const testimonialsCarousel = document.querySelector('.testimonials-carousel');
    const testimonials = [
        { image: 'client1.jpg', text: 'Premier Property Developers exceeded our expectations!', name: 'John Doe' },
        { image: 'client2.jpg', text: 'Professional and reliable service from start to finish.', name: 'Jane Smith' },
        // Add more testimonials as needed
    ];

    testimonials.forEach(testimonial => {
        const testimonialItem = document.createElement('div');
        testimonialItem.classList.add('testimonial-item');
        testimonialItem.innerHTML = `
            <img src="assets/images/testimonials/${testimonial.image}" alt="${testimonial.name}">
            <p>${testimonial.text}</p>
            <p class="client-name">${testimonial.name}</p>
        `;
        testimonialsCarousel.appendChild(testimonialItem);
    });
});

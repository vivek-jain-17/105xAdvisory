/**
 * 105X Advisory - Core Logic Engine
 * ES6 Vanilla JS - No Frameworks
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    lucide.createIcons();

    // 2. Sticky Navbar & Progress Bar Logic
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('progress-bar');
    
    window.addEventListener('scroll', () => {
        // Navbar styling
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Reading Progress Bar (if exists on page)
        if (progressBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        }
    });

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 4. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger counter animation if it has one
                const counters = entry.target.querySelectorAll('.counter');
                if (counters.length > 0) {
                    counters.forEach(counter => animateCounter(counter));
                }
                
                observer.unobserve(entry.target); // Run once
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    // 5. Animated Counters
    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    }

   // 6. Dynamic Blog Loading (Only runs on blog.html)
    const blogContainer = document.getElementById('blog-container');
    if (blogContainer) {
        
        // Fallback data in case blogs.json fails to load or is missing
        const fallbackBlogs = [
            {
                "id": 1,
                "title": "How to Read an Annual Report Like an Investor",
                "category": "Investing",
                "author": "105X Advisory",
                "date": "Oct 14, 2026",
                "readingTime": "12 Min Read",
                "excerpt": "Retail investors read to find reasons to buy. Institutions read to find reasons not to. A definitive guide to parsing financial filings."
            },
            {
                "id": 2,
                "title": "Cash Flow vs Profit: The Ultimate Truth",
                "category": "Finance",
                "author": "105X Advisory",
                "date": "Oct 07, 2026",
                "readingTime": "8 Min Read",
                "excerpt": "Profit is an accounting opinion; cash is a biological fact. How to bridge the gap between EBITDA and actual operating cash flow."
            },
            {
                "id": 3,
                "title": "The Management Quality Checklist",
                "category": "Business",
                "author": "105X Advisory",
                "date": "Sep 28, 2026",
                "readingTime": "15 Min Read",
                "excerpt": "Capital allocation is the true test of management. Evaluating dividends, buybacks, and internal reinvestment rates."
            },
            {
                "id": 4,
                "title": "Understanding Intrinsic Value & Moats",
                "category": "Valuation",
                "author": "105X Advisory",
                "date": "Sep 21, 2026",
                "readingTime": "10 Min Read",
                "excerpt": "A deep dive into pricing power, switching costs, and network effects that protect a business's long-term profitability."
            },
            {
                "id": 5,
                "title": "Common Retail Investing Mistakes",
                "category": "Investing",
                "author": "105X Advisory",
                "date": "Sep 14, 2026",
                "readingTime": "7 Min Read",
                "excerpt": "From chasing low P/E ratios to ignoring cyclicality. A breakdown of cognitive biases that destroy portfolio returns."
            },
            {
                "id": 6,
                "title": "Valuation Beyond the PE Ratio",
                "category": "Valuation",
                "author": "105X Advisory",
                "date": "Sep 05, 2026",
                "readingTime": "11 Min Read",
                "excerpt": "Why relying solely on Price-to-Earnings is dangerous, and how to utilize EV/EBITDA and Free Cash Flow Yield."
            }
        ];

        // Attempt to fetch JSON data
        fetch('blogs.json')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                window.blogData = data; 
                renderBlogs(data);
            })
            .catch(err => {
                console.warn("Could not load blogs.json, using fallback data instead.", err);
                // If fetch fails, use the fallback array to keep the UI working
                window.blogData = fallbackBlogs;
                renderBlogs(fallbackBlogs);
            });

        // Setup Filters
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                // Filter logic
                const category = e.target.getAttribute('data-filter');
                if (category === 'all') {
                    renderBlogs(window.blogData);
                } else {
                    const filtered = window.blogData.filter(blog => blog.category === category);
                    renderBlogs(filtered);
                }
            });
        });
    }

    function renderBlogs(articles) {
        blogContainer.innerHTML = ''; // Clear container
        if(articles.length === 0) {
            blogContainer.innerHTML = '<p class="text-center text-muted" style="grid-column: 1/-1;">No articles found for this category.</p>';
            return;
        }

        articles.forEach((article, index) => {
            const delay = index * 0.1;
            const html = `
                <a href="blog-details.html?id=${article.id}" class="card blog-card reveal active" style="transition-delay: ${delay}s">
                    <div class="blog-card-img"></div>
                    <div class="blog-meta">
                        <span>${article.category}</span>
                        <span>${article.readingTime}</span>
                    </div>
                    <h3 style="color: var(--text-primary);">${article.title}</h3>
                    <p style="color: var(--text-secondary);">${article.excerpt}</p>
                    <span class="btn-link">Read Article <i data-lucide="arrow-right" style="width: 16px;"></i></span>
                </a>
            `;
            blogContainer.insertAdjacentHTML('beforeend', html);
        });
        lucide.createIcons(); // Re-initialize icons for new DOM elements
    }
});
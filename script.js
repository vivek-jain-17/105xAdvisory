document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const progress = document.getElementById("progress-bar");
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const onScroll = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 18);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
      if (window.lucide) lucide.createIcons();
    });
    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = '<i data-lucide="menu"></i>';
      if (window.lucide) lucide.createIcons();
    }));
  }

  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  } else revealEls.forEach(el => el.classList.add("is-visible"));

  const blogContainer = document.getElementById("blog-container");
  if (blogContainer) {
    let articles = [];
    let activeCategory = "All";
    const search = document.getElementById("blog-search");
    const count = document.getElementById("result-count");
    const empty = document.getElementById("empty-state");
    const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
    const render = () => {
      const term = (search?.value || "").trim().toLowerCase();
      const filtered = articles.filter(a => (activeCategory === "All" || a.category === activeCategory) &&
        `${a.title} ${a.category} ${a.excerpt}`.toLowerCase().includes(term));
      blogContainer.innerHTML = filtered.map((a, i) => `
        <a class="blog-card reveal is-visible" href="blog-details.html?id=${encodeURIComponent(a.id)}" style="--card-index:${i}">
          <div class="article-image ${escapeHTML(a.theme || "image-one")}"><span>105X / NOTE ${String(a.id).padStart(3,"0")}</span><i data-lucide="arrow-up-right"></i></div>
          <div class="article-meta"><span>${escapeHTML(a.category)}</span><span>${escapeHTML(a.readingTime)}</span></div>
          <h2>${escapeHTML(a.title)}</h2><p>${escapeHTML(a.excerpt)}</p><span class="article-link">Read the note <i data-lucide="arrow-right"></i></span>
        </a>`).join("");
      if (count) count.textContent = `${String(filtered.length).padStart(2,"0")} NOTES`;
      if (empty) empty.hidden = filtered.length > 0;
      if (window.lucide) lucide.createIcons();
    };
    fetch("blog.json").then(r => { if (!r.ok) throw new Error("Could not load blog.json"); return r.json(); })
      .then(data => { articles = data; render(); })
      .catch(() => {
        blogContainer.innerHTML = '<p class="load-error">The journal could not load. Please open this site through a local web server rather than directly from the file system.</p>';
      });
    if (search) search.addEventListener("input", render);
    document.querySelectorAll(".filter-btn").forEach(btn => btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.toggle("active", b === btn));
      activeCategory = btn.dataset.filter || "All";
      render();
    }));
  }

  const articleTitle = document.getElementById("article-title");
  if (articleTitle) {
    const id = new URLSearchParams(window.location.search).get("id") || "1";
    fetch("blog.json").then(r => { if (!r.ok) throw new Error("Could not load blog.json"); return r.json(); })
      .then(data => {
        const article = data.find(item => String(item.id) === id) || data[0];
        document.title = `${article.title} — 105X Advisory`;
        articleTitle.textContent = article.title;
        document.getElementById("article-excerpt").textContent = article.excerpt;
        document.getElementById("article-meta").innerHTML = `<span>${article.category}</span><span>${article.readingTime}</span><span>105X ADVISORY / DEMO</span>`;
        const hero = document.getElementById("article-hero-image");
        hero.classList.add(article.theme || "image-one");
        document.getElementById("article-body").innerHTML = article.body.map(section => `<section><h2>${section.heading}</h2><p>${section.paragraph}</p></section>`).join("");
        if (window.lucide) lucide.createIcons();
      }).catch(() => {
        document.getElementById("article-excerpt").textContent = "Please open this demonstration website through a local web server to load the journal content.";
      });
  }
});
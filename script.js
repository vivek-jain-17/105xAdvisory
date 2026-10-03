document.addEventListener("DOMContentLoaded", () => {

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =========================================================
     INITIAL 105X FINANCIAL ASSEMBLY LOADER

     Sequence:
     0.0s  → financial signals start
     0.2s  → signal 1
     0.5s  → signal 2
     0.8s  → signal 3
     1.1s  → signal 4
     1.4s  → signal 5
     1.7s  → signal 6
     2.7s  → computer starts entering
     3.6s  → processing phase
     5.2s  → 105X branding
     6.5s  → loader exits
     7.2s  → loader removed

     NOTE:
     CSS controls the actual signal/computer animation.
     JS controls the larger phases of the sequence.
  ========================================================= */

  const initialLoader =
    document.getElementById("initial-loader");

  if (initialLoader) {

    /*
      Keep the page locked while the cinematic intro
      is playing.
    */
    document.documentElement.style.overflow = "hidden";


    /*
      Reduced-motion users should not be forced to wait
      through the full cinematic sequence.
    */
    if (reducedMotion) {

      initialLoader.classList.add("is-processing");

      window.setTimeout(() => {
        initialLoader.classList.add("is-branding");
      }, 250);

      window.setTimeout(() => {
        initialLoader.classList.add("is-exiting");
      }, 700);

      window.setTimeout(() => {

        initialLoader.remove();

        document.documentElement.style.overflow = "";

      }, 1000);

    } else {

      /*
        -------------------------------------------------------
        PHASE 1
        Financial signals assemble naturally.

        The individual delays are controlled by CSS.
        JS deliberately waits before moving to processing.
        -------------------------------------------------------
      */

      window.setTimeout(() => {

        initialLoader.classList.add(
          "is-processing"
        );

      }, 3600);


      /*
        -------------------------------------------------------
        PHASE 2
        Computer has already entered through CSS.

        Wait while the dashboard / research engine
        appears to process the collected information.
        -------------------------------------------------------
      */

      window.setTimeout(() => {

        initialLoader.classList.add(
          "is-branding"
        );

      }, 5200);


      /*
        -------------------------------------------------------
        PHASE 3
        105X title has appeared.

        Give the viewer enough time to actually read:

        105X
        ADVISORY
        RESEARCH OVER NOISE
        -------------------------------------------------------
      */

      window.setTimeout(() => {

        initialLoader.classList.add(
          "is-exiting"
        );

      }, 6500);


      /*
        -------------------------------------------------------
        PHASE 4
        Completely remove loader and unlock page.
        -------------------------------------------------------
      */

      window.setTimeout(() => {

        initialLoader.remove();

        document.documentElement.style.overflow = "";

      }, 7200);

    }

  }



  /* =========================================================
     INITIAL SETUP
  ========================================================= */

  if (window.lucide) {
    lucide.createIcons();
  }


  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }



  /* =========================================================
     HEADER + SCROLL PROGRESS
  ========================================================= */

  const header = document.getElementById("header");

  const progress =
    document.getElementById("progress-bar");


  const updateScrollUI = () => {

    if (header) {

      header.classList.toggle(
        "is-scrolled",
        window.scrollY > 18
      );

    }


    if (progress) {

      const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;


      const percentage =
        maxScroll > 0
          ? (window.scrollY / maxScroll) * 100
          : 0;


      progress.style.width =
        `${percentage}%`;

    }

  };


  window.addEventListener(
    "scroll",
    updateScrollUI,
    { passive: true }
  );


  updateScrollUI();



  /* =========================================================
     MOBILE NAVIGATION
  ========================================================= */

  const menuToggle =
    document.getElementById("menu-toggle");

  const navLinks =
    document.getElementById("nav-links");


  if (menuToggle && navLinks) {

    menuToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          navLinks.classList.toggle(
            "is-open"
          );


        menuToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );


        menuToggle.innerHTML = isOpen
          ? '<i data-lucide="x"></i>'
          : '<i data-lucide="menu"></i>';


        if (window.lucide) {
          lucide.createIcons();
        }

      }
    );


    navLinks
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {

            navLinks.classList.remove(
              "is-open"
            );


            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );


            menuToggle.innerHTML =
              '<i data-lucide="menu"></i>';


            if (window.lucide) {
              lucide.createIcons();
            }

          }
        );

      });

  }



  /* =========================================================
     PAGE ENTRANCE
  ========================================================= */

  requestAnimationFrame(() => {

    document.body.classList.add(
      "page-entering"
    );

  });



  /* =========================================================
     SCROLL REVEAL ANIMATIONS
  ========================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "is-visible"
              );


              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("is-visible");
    });

  }



  /* =========================================================
     RIPPLE EFFECT
  ========================================================= */

  const createRipple = (
    element,
    event
  ) => {

    if (!element || !event) return;


    const rect =
      element.getBoundingClientRect();


    const ripple =
      document.createElement("span");


    ripple.className =
      "motion-ripple";


    ripple.style.left =
      `${event.clientX - rect.left}px`;


    ripple.style.top =
      `${event.clientY - rect.top}px`;


    element.appendChild(ripple);


    window.setTimeout(() => {

      ripple.remove();

    }, 750);

  };



  /* =========================================================
     PRINCIPLE CARDS

     Better Questions section:
     - 3D tilt
     - cursor glow
     - click ripple
     - click animation
  ========================================================= */

  document
    .querySelectorAll(".interactive-card")
    .forEach(card => {


      /* Mouse movement */

      card.addEventListener(
        "pointermove",
        event => {

          if (
            reducedMotion ||
            event.pointerType === "touch"
          ) {
            return;
          }


          const rect =
            card.getBoundingClientRect();


          const x =
            (event.clientX - rect.left) /
            rect.width;


          const y =
            (event.clientY - rect.top) /
            rect.height;


          const tilt =
            (x - 0.5) * 3.2;


          card.style.setProperty(
            "--tilt",
            `${tilt.toFixed(2)}deg`
          );


          card.style.setProperty(
            "--mx",
            `${x * 100}%`
          );


          card.style.setProperty(
            "--my",
            `${y * 100}%`
          );

        }
      );


      /* Mouse leave */

      card.addEventListener(
        "pointerleave",
        () => {

          card.style.setProperty(
            "--tilt",
            "0deg"
          );


          card.style.setProperty(
            "--mx",
            "50%"
          );


          card.style.setProperty(
            "--my",
            "50%"
          );

        }
      );


      /* Click */

      card.addEventListener(
        "click",
        event => {

          createRipple(
            card,
            event
          );


          card.classList.remove(
            "is-clicked"
          );


          void card.offsetWidth;


          card.classList.add(
            "is-clicked"
          );

        }
      );


      /* Keyboard accessibility */

      card.addEventListener(
        "keydown",
        event => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();


            card.classList.remove(
              "is-clicked"
            );


            void card.offsetWidth;


            card.classList.add(
              "is-clicked"
            );

          }

        }
      );

    });



  /* =========================================================
     EXPERTISE ROWS

     Click / press feedback
  ========================================================= */

  document
    .querySelectorAll(".interactive-row")
    .forEach(row => {

      row.addEventListener(
        "pointerdown",
        event => {

          if (
            event.pointerType !== "mouse" &&
            event.pointerType !== "pen"
          ) {
            return;
          }


          createRipple(
            row,
            event
          );

        }
      );

    });



  /* =========================================================
     METHODOLOGY TIMELINE

     Understand
     Investigate
     Challenge
     Communicate

     Features:
     - active step
     - progress line
     - glowing nodes
     - scroll-based activation
  ========================================================= */

  const timeline =
    document.getElementById(
      "method-timeline"
    );


  const timelineSteps = [
    ...document.querySelectorAll(
      ".method-step"
    )
  ];


  if (
    timeline &&
    timelineSteps.length
  ) {

    const updateTimeline =
      () => {

        const viewportCenter =
          window.innerHeight * 0.56;


        let activeIndex = 0;

        let bestDistance =
          Infinity;


        timelineSteps.forEach(
          (step, index) => {

            const rect =
              step.getBoundingClientRect();


            const center =
              rect.top +
              rect.height * 0.28;


            const distance =
              Math.abs(
                center -
                viewportCenter
              );


            if (
              distance <
              bestDistance
            ) {

              bestDistance =
                distance;


              activeIndex =
                index;

            }

          }
        );


        timelineSteps.forEach(
          (step, index) => {

            step.classList.toggle(
              "is-active",
              index === activeIndex
            );

          }
        );


        const progressPercentage =
          timelineSteps.length === 1
            ? 100
            : (
                activeIndex /
                (timelineSteps.length - 1)
              ) * 100;


        timeline.style.setProperty(
          "--timeline-progress",
          `${Math.max(
            8,
            progressPercentage
          )}%`
        );

      };


    window.addEventListener(
      "scroll",
      updateTimeline,
      { passive: true }
    );


    window.addEventListener(
      "resize",
      updateTimeline
    );


    updateTimeline();


    timelineSteps.forEach(
      step => {

        step.addEventListener(
          "click",
          () => {

            timelineSteps.forEach(
              item => {

                item.classList.remove(
                  "is-active"
                );

              }
            );


            step.classList.add(
              "is-active"
            );

          }
        );

      }
    );

  }



  /* =========================================================
     BLOG DATA HELPERS
  ========================================================= */

  const escapeHTML =
    value => {

      return String(value).replace(
        /[&<>"']/g,
        character => ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        }[character])
      );

    };



  /* =========================================================
     BLOG LISTING

     - Search
     - Category filter
     - Animated cards
     - Hover / click effects
  ========================================================= */

  const blogContainer =
    document.getElementById(
      "blog-container"
    );


  if (blogContainer) {

    let articles = [];

    let activeCategory =
      "All";


    const search =
      document.getElementById(
        "blog-search"
      );


    const resultCount =
      document.getElementById(
        "result-count"
      );


    const emptyState =
      document.getElementById(
        "empty-state"
      );


    /* -------------------------------------------------------
       Render blog cards
    ------------------------------------------------------- */

    const renderArticles =
      () => {

        const searchTerm =
          (
            search?.value ||
            ""
          )
            .trim()
            .toLowerCase();


        const filteredArticles =
          articles.filter(
            article => {

              const matchesCategory =
                activeCategory === "All" ||
                article.category ===
                  activeCategory;


              const searchableText =
                `
                  ${article.title}
                  ${article.category}
                  ${article.excerpt}
                `
                  .toLowerCase();


              return (
                matchesCategory &&
                searchableText.includes(
                  searchTerm
                )
              );

            }
          );


        blogContainer.innerHTML =
          filteredArticles
            .map(
              (article, index) => `

                <a
                  class="blog-card reveal is-visible"
                  href="blog-details.html?id=${encodeURIComponent(
                    article.id
                  )}"
                  data-page-transition
                  style="--card-index:${index}"
                >

                  <div
                    class="article-image ${
                      escapeHTML(
                        article.theme ||
                        "image-one"
                      )
                    }"
                  >

                    <span>
                      105X / NOTE
                      ${String(article.id).padStart(
                        3,
                        "0"
                      )}
                    </span>

                    <i
                      data-lucide="arrow-up-right"
                    ></i>

                  </div>


                  <div class="article-meta">

                    <span>
                      ${escapeHTML(
                        article.category
                      )}
                    </span>

                    <span>
                      ${escapeHTML(
                        article.readingTime
                      )}
                    </span>

                  </div>


                  <h2>
                    ${escapeHTML(
                      article.title
                    )}
                  </h2>


                  <p>
                    ${escapeHTML(
                      article.excerpt
                    )}
                  </p>


                  <span class="article-link">

                    Read the note

                    <i
                      data-lucide="arrow-right"
                    ></i>

                  </span>

                </a>

              `
            )
            .join("");


        if (resultCount) {

          resultCount.textContent =
            `${String(
              filteredArticles.length
            ).padStart(2, "0")} NOTES`;

        }


        if (emptyState) {

          emptyState.hidden =
            filteredArticles.length >
            0;

        }


        if (window.lucide) {
          lucide.createIcons();
        }


        attachBlogCardInteractions();

        attachPageTransitions();

      };



    /* -------------------------------------------------------
       Blog card interactions
    ------------------------------------------------------- */

    const attachBlogCardInteractions =
      () => {

        blogContainer
          .querySelectorAll(
            ".blog-card"
          )
          .forEach(card => {

            card.addEventListener(
              "pointermove",
              event => {

                if (
                  reducedMotion ||
                  event.pointerType ===
                    "touch"
                ) {
                  return;
                }


                const rect =
                  card.getBoundingClientRect();


                const x =
                  (
                    event.clientX -
                    rect.left
                  ) / rect.width;


                const y =
                  (
                    event.clientY -
                    rect.top
                  ) / rect.height;


                card.style.setProperty(
                  "--mx",
                  `${x * 100}%`
                );


                card.style.setProperty(
                  "--my",
                  `${y * 100}%`
                );

              }
            );


            card.addEventListener(
              "pointerleave",
              () => {

                card.style.setProperty(
                  "--mx",
                  "50%"
                );


                card.style.setProperty(
                  "--my",
                  "50%"
                );

              }
            );


            card.addEventListener(
              "pointerdown",
              event => {

                if (
                  event.pointerType ===
                    "mouse" ||
                  event.pointerType ===
                    "pen"
                ) {

                  createRipple(
                    card,
                    event
                  );

                }

              }
            );


            card.addEventListener(
              "click",
              () => {

                card.classList.add(
                  "is-clicked"
                );

              }
            );

          });

      };



    /* -------------------------------------------------------
       Load JSON
    ------------------------------------------------------- */

    fetch("blog.json")
      .then(response => {

        if (!response.ok) {

          throw new Error(
            "Could not load blog.json"
          );

        }


        return response.json();

      })
      .then(data => {

        articles = data;

        renderArticles();

      })
      .catch(error => {

        console.error(error);


        blogContainer.innerHTML = `

          <p class="load-error">

            The journal could not load.

            Please open this website through
            a local web server such as VS Code
            Live Server.

          </p>

        `;

      });



    /* -------------------------------------------------------
       Search
    ------------------------------------------------------- */

    if (search) {

      search.addEventListener(
        "input",
        renderArticles
      );

    }



    /* -------------------------------------------------------
       Category filters
    ------------------------------------------------------- */

    document
      .querySelectorAll(
        ".filter-btn"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            document
              .querySelectorAll(
                ".filter-btn"
              )
              .forEach(item => {

                item.classList.toggle(
                  "active",
                  item === button
                );

              });


            activeCategory =
              button.dataset.filter ||
              "All";


            renderArticles();

          }
        );

      });

  }



  /* =========================================================
     BLOG ARTICLE DETAILS
  ========================================================= */

  const articleTitle =
    document.getElementById(
      "article-title"
    );


  if (articleTitle) {

    const articleID =
      new URLSearchParams(
        window.location.search
      ).get("id") || "1";


    fetch("blog.json")
      .then(response => {

        if (!response.ok) {

          throw new Error(
            "Could not load blog.json"
          );

        }


        return response.json();

      })
      .then(data => {

        const article =
          data.find(
            item =>
              String(item.id) ===
              articleID
          ) || data[0];


        document.title =
          `${article.title} — 105X Advisory`;


        articleTitle.textContent =
          article.title;


        const excerpt =
          document.getElementById(
            "article-excerpt"
          );


        const meta =
          document.getElementById(
            "article-meta"
          );


        const hero =
          document.getElementById(
            "article-hero-image"
          );


        const body =
          document.getElementById(
            "article-body"
          );


        if (excerpt) {

          excerpt.textContent =
            article.excerpt;

        }


        if (meta) {

          meta.innerHTML = `

            <span>
              ${escapeHTML(
                article.category
              )}
            </span>

            <span>
              ${escapeHTML(
                article.readingTime
              )}
            </span>

            <span>
              105X ADVISORY / DEMO
            </span>

          `;

        }


        if (hero) {

          hero.classList.add(
            article.theme ||
            "image-one"
          );

        }


        if (body) {

          body.innerHTML =
            article.body
              .map(
                section => `

                  <section>

                    <h2>
                      ${escapeHTML(
                        section.heading
                      )}
                    </h2>

                    <p>
                      ${escapeHTML(
                        section.paragraph
                      )}
                    </p>

                  </section>

                `
              )
              .join("");

        }


        if (window.lucide) {
          lucide.createIcons();
        }


        attachPageTransitions();

      })
      .catch(error => {

        console.error(error);


        const excerpt =
          document.getElementById(
            "article-excerpt"
          );


        if (excerpt) {

          excerpt.textContent =
            "Please open this demonstration website through a local web server to load the journal content.";

        }

      });

  }



  /* =========================================================
     CINEMATIC PAGE TRANSITION

     Index → Blog
     Blog → Article

     Around 1.25 seconds
  ========================================================= */

  const transition =
    document.getElementById(
      "page-transition"
    );


  let transitioning =
    false;


  const isExternalLink =
    href => {

      if (!href) {
        return true;
      }


      return (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        href.startsWith("http://") ||
        href.startsWith("https://")
      );

    };


  const runPageTransition =
    href => {

      if (
        !transition ||
        transitioning ||
        isExternalLink(href)
      ) {
        return false;
      }


      const destination =
        new URL(
          href,
          window.location.href
        );


      if (
        destination.origin !==
        window.location.origin
      ) {
        return false;
      }


      transitioning =
        true;


      transition.classList.add(
        "is-active"
      );


      document.body.classList.add(
        "is-transitioning"
      );


      window.setTimeout(
        () => {

          window.location.href =
            destination.href;

        },
        reducedMotion
          ? 50
          : 1250
      );


      return true;

    };


  const attachPageTransitions =
    () => {

      document
        .querySelectorAll(
          "a[data-page-transition]"
        )
        .forEach(link => {

          if (
            link.dataset.transitionBound ===
            "true"
          ) {
            return;
          }


          link.dataset.transitionBound =
            "true";


          link.addEventListener(
            "click",
            event => {

              const href =
                link.getAttribute(
                  "href"
                );


              if (
                !href ||
                href.startsWith("#")
              ) {
                return;
              }


              if (
                runPageTransition(
                  href
                )
              ) {

                event.preventDefault();

              }

            }
          );

        });

    };


  attachPageTransitions();



  /* =========================================================
     HERO 105X RESEARCH ENGINE

     Mouse-responsive subtle 3D movement
  ========================================================= */

  const researchEngine =
    document.querySelector(
      ".orbit-dashboard"
    );


  if (
    researchEngine &&
    !reducedMotion
  ) {

    researchEngine.addEventListener(
      "pointermove",
      event => {

        if (
          event.pointerType ===
          "touch"
        ) {
          return;
        }


        const rect =
          researchEngine.getBoundingClientRect();


        const x =
          (
            event.clientX -
            rect.left
          ) / rect.width - 0.5;


        const y =
          (
            event.clientY -
            rect.top
          ) / rect.height - 0.5;


        researchEngine.style.transform =
          `
            perspective(1100px)
            rotateX(${(
              -y * 3
            ).toFixed(2)}deg)
            rotateY(${(
              x * 5
            ).toFixed(2)}deg)
            scale(1.015)
          `;

      }
    );


    researchEngine.addEventListener(
      "pointerleave",
      () => {

        researchEngine.style.transform =
          "";

      }
    );

  }



  /* =========================================================
     TICKER / MARQUEE

     Pause when hovered.
     CSS handles the continuous movement.
  ========================================================= */

  const ticker =
    document.querySelector(
      ".ticker-band"
    );


  if (ticker) {

    ticker.addEventListener(
      "mouseenter",
      () => {

        ticker.classList.add(
          "is-hovered"
        );

      }
    );


    ticker.addEventListener(
      "mouseleave",
      () => {

        ticker.classList.remove(
          "is-hovered"
        );

      }
    );

  }



  /* =========================================================
     BUTTON PRESS EFFECT

     Gives CTAs a subtle physical click feeling.
  ========================================================= */

  document
    .querySelectorAll(
      ".button, .nav-cta"
    )
    .forEach(button => {

      button.addEventListener(
        "pointerdown",
        () => {

          if (reducedMotion) {
            return;
          }


          button.classList.add(
            "is-pressed"
          );

        }
      );


      button.addEventListener(
        "pointerup",
        () => {

          button.classList.remove(
            "is-pressed"
          );

        }
      );


      button.addEventListener(
        "pointerleave",
        () => {

          button.classList.remove(
            "is-pressed"
          );

        }
      );

    });



  /* =========================================================
     SMOOTH HASH NAVIGATION
  ========================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetID =
            link.getAttribute(
              "href"
            );


          if (
            !targetID ||
            targetID === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(
              targetID
            );


          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({
            behavior:
              reducedMotion
                ? "auto"
                : "smooth",
            block: "start"
          });

        }
      );

    });



  /* =========================================================
     ESCAPE KEY

     Close mobile navigation.
  ========================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        if (
          navLinks &&
          navLinks.classList.contains(
            "is-open"
          )
        ) {

          navLinks.classList.remove(
            "is-open"
          );


          if (menuToggle) {

            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );


            menuToggle.innerHTML =
              '<i data-lucide="menu"></i>';


            if (window.lucide) {
              lucide.createIcons();
            }

          }

        }

      }

    }
  );

});
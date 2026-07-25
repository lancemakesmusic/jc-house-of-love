(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const year = document.querySelector("#year");
  const form = document.querySelector("#contact-form");
  const formNote = document.querySelector("#form-note");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const closeNav = () => {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    nav.classList.remove("is-open");
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      nav.classList.toggle("is-open", !open);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });
  }

  const revealTargets = [
    ...document.querySelectorAll(".mission, .section-intro, .serve-copy, .serve-list, .life-copy, .promise-inner, .contact-copy, .contact-form"),
    ...document.querySelectorAll(".service-list li"),
  ];

  revealTargets.forEach((el) => {
    if (!el.classList.contains("service-list") && el.tagName !== "LI") {
      el.classList.add("reveal");
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    document.querySelectorAll(".reveal, .service-list li").forEach((el, index) => {
      if (el.matches(".service-list li")) {
        el.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;
      }
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal, .service-list li").forEach((el) => {
      el.classList.add("is-visible");
    });
  }

  if (form && formNote) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      formNote.classList.remove("is-error");

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const message = String(data.get("message") || "").trim();

      if (!name || !email || !message) {
        formNote.textContent = "Please complete the required fields so we can respond.";
        formNote.classList.add("is-error");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formNote.textContent = "Please enter a valid email address.";
        formNote.classList.add("is-error");
        return;
      }

      form.reset();
      formNote.textContent =
        "Thank you. Your message has been prepared—our team will follow up shortly.";
    });
  }
})();

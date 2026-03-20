const header = document.querySelector(".site-header");
const revealItems = document.querySelectorAll(".reveal");
const forms = document.querySelectorAll("form");
const staggerGroups = document.querySelectorAll(".stagger-group");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");

const syncHeaderState = () => {
  header.classList.toggle("scrolled", window.scrollY > 16);
};

const closeMenu = () => {
  if (!menuToggle || !siteNav) {
    return;
  }

  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

const toggleMenu = () => {
  if (!menuToggle || !siteNav) {
    return;
  }

  const isOpen = menuToggle.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  siteNav.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
};

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px",
  }
);

staggerGroups.forEach((group) => {
  const items = group.querySelectorAll(":scope > .reveal");
  items.forEach((item, index) => {
    if (item.classList.contains("delayed-text") || item.classList.contains("reveal-image")) {
      return;
    }

    item.style.transitionDelay = `${index * 0.1}s`;
  });
});

revealItems.forEach((item) => revealObserver.observe(item));
syncHeaderState();
window.addEventListener("load", () => {
  document.body.classList.add("page-ready");
});

window.addEventListener("scroll", syncHeaderState, { passive: true });

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMenu);
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    closeMenu();
  }
});

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const button = form.querySelector("button");
    if (!button) {
      return;
    }

    const initialLabel = button.textContent;
    button.textContent = "Received";
    button.disabled = true;

    window.setTimeout(() => {
      button.textContent = initialLabel;
      button.disabled = false;
      form.reset();
    }, 1800);
  });
});

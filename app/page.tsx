"use client";

import { useEffect } from "react";

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#media", label: "Media" },
  { href: "#podcast", label: "Podcast" },
  { href: "#courses", label: "Courses" },
  { href: "#contact", label: "Contact" },
];

const footerItems = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#media", label: "Media" },
  { href: "#podcast", label: "Podcast" },
  { href: "#courses", label: "Courses" },
  { href: "#contact", label: "Contact" },
];

export default function Page() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    const revealItems = document.querySelectorAll<HTMLElement>(".reveal");
    const staggerGroups = document.querySelectorAll<HTMLElement>(".stagger-group");
    const menuToggle = document.querySelector<HTMLButtonElement>(".menu-toggle");
    const siteNav = document.querySelector<HTMLElement>(".site-nav");
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(".site-nav a");
    const forms = document.querySelectorAll<HTMLFormElement>("form");

    const syncHeaderState = () => {
      header?.classList.toggle("scrolled", window.scrollY > 16);
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
      const items = group.querySelectorAll<HTMLElement>(":scope > .reveal");
      items.forEach((item, index) => {
        if (item.classList.contains("delayed-text") || item.classList.contains("reveal-image")) {
          return;
        }

        item.style.transitionDelay = `${index * 0.1}s`;
      });
    });

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    };

    const handleSubmit = (event: Event) => {
      event.preventDefault();

      const form = event.currentTarget as HTMLFormElement;
      const button = form.querySelector<HTMLButtonElement>("button");
      if (!button) {
        return;
      }

      const initialLabel = button.textContent ?? "";
      button.textContent = "Received";
      button.disabled = true;

      window.setTimeout(() => {
        button.textContent = initialLabel;
        button.disabled = false;
        form.reset();
      }, 1800);
    };

    revealItems.forEach((item) => revealObserver.observe(item));
    forms.forEach((form) => form.addEventListener("submit", handleSubmit));
    navLinks.forEach((link) => link.addEventListener("click", closeMenu));
    menuToggle?.addEventListener("click", toggleMenu);
    window.addEventListener("scroll", syncHeaderState, { passive: true });
    window.addEventListener("resize", handleResize);

    syncHeaderState();
    document.body.classList.add("page-ready");

    return () => {
      revealObserver.disconnect();
      forms.forEach((form) => form.removeEventListener("submit", handleSubmit));
      navLinks.forEach((link) => link.removeEventListener("click", closeMenu));
      menuToggle?.removeEventListener("click", toggleMenu);
      window.removeEventListener("scroll", syncHeaderState);
      window.removeEventListener("resize", handleResize);
      document.body.classList.remove("page-ready", "menu-open");
    };
  }, []);

  return (
    <div className="site-shell">
      <header className="site-header" id="top">
        <a className="brand-mark" href="#hero" aria-label="Blessing ‘ Dion ‘ Bassey home">
          <img src="/logo.jpeg" alt="Blessing ‘ Dion ‘ Bassey logo" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded="false"
          aria-controls="site-menu"
          aria-label="Open navigation"
        >
          <span className="menu-toggle-label">☰</span>
        </button>
        <nav className="site-nav" id="site-menu" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#newsletter">
          Join the List
        </a>
      </header>

      <main>
        <section className="hero section" id="hero">
          <div className="hero-visual reveal reveal-image">
            <img src="/images/ceo/portrait.jpg" alt="Blessing ‘ Dion ‘ Bassey portrait" />
          </div>
          <div className="hero-copy reveal delayed-text">
            <p className="eyebrow">Blessing ‘ Dion ‘ Bassey</p>
            <h1>Entrepreneur. Designer. Educator.</h1>
            <p className="hero-text">
              Celebrating artistry, craftsmanship, and timeless elegance in fashion.
            </p>
            <div className="hero-actions">
              <a className="button button-solid" href="#contact">
                Book Blessing
              </a>
              <a className="text-link" href="#portfolio">
                View Work
              </a>
            </div>
          </div>
        </section>

        <section className="about section" id="about">
          <div className="about-layout">
            <div className="about-copy reveal">
              <p className="eyebrow">About</p>
              <h2>Meet Blessing Bassey</h2>
              <p className="body-text max-text">
                Blessing Bassey, founder of Dion Baci Limited, is a Visionary Nigerian
                Entrepreneur, Fashion designer, Consultant and Educator. From launching Dion Baci
                in 2017 during her NYSC, to creating bridal couture, ready-to-wear lines, and
                empowering aspiring designers through her fashion academy, Blessing’s work reflects
                her passion for aesthetics and timeless design.
              </p>
              <a className="text-link" href="#contact">
                Read Full Story
              </a>
            </div>
            <div className="about-visual reveal">
              <img
                src="/images/media/feature.jpg"
                alt="Blessing ‘ Dion ‘ Bassey featured media portrait"
              />
            </div>
          </div>
        </section>

        <section className="portfolio section" id="portfolio">
          <div className="section-heading reveal">
            <p className="eyebrow">Portfolio</p>
            <h2>Portfolio Highlights</h2>
          </div>
          <div className="portfolio-grid stagger-group">
            <article className="portfolio-card reveal">
              <div className="media-frame aspect-portrait">
                <img src="/images/portfolio/bridal.jpg" alt="Bridal and custom designs" />
              </div>
              <div className="overlay-copy">
                <h3>Bridal &amp; Custom Designs</h3>
                <p className="overlay-note">Dion Baci couture</p>
              </div>
            </article>
            <article className="portfolio-card reveal">
              <div className="media-frame aspect-portrait">
                <img
                  src="/images/portfolio/ready-to-wear.jpg"
                  alt="Ready-to-wear Baci Collection"
                />
              </div>
              <div className="overlay-copy">
                <h3>Ready-to-Wear</h3>
                <p className="overlay-note">Baci ready-to-wear</p>
              </div>
            </article>
            <article className="portfolio-card reveal">
              <div className="media-frame aspect-portrait">
                <img src="/images/portfolio/man.jpg" alt="Dion Baci Man collection" />
              </div>
              <div className="overlay-copy">
                <h3>Essentials</h3>
                <p className="overlay-note">Bacibaci essentials</p>
              </div>
            </article>
          </div>
        </section>

        <section className="courses section" id="courses">
          <div className="section-heading reveal">
            <p className="eyebrow">Courses</p>
            <h2>Learn from Blessing</h2>
          </div>
          <div className="course-grid stagger-group">
            <article className="course-card reveal">
              <div className="course-visual media-frame aspect-portrait">
                <img src="/images/ceo/about.jpg" alt="Blessing Bassey teaching fashion design" />
              </div>
              <div className="course-copy">
                <h3>Couture Foundations</h3>
                <p>Understand fit, finishing, and the principles behind polished custom garments.</p>
                <a
                  className="text-link"
                  href="mailto:hello@dionbaci.com?subject=Couture%20Foundations%20Enrollment"
                >
                  Enroll
                </a>
              </div>
            </article>
            <article className="course-card reveal">
              <div className="course-visual media-frame aspect-portrait">
                <img
                  src="/images/media/editorial.jpg"
                  alt="Fashion business and creative direction"
                />
              </div>
              <div className="course-copy">
                <h3>Fashion Business Clarity</h3>
                <p>Build structure around your brand, pricing, client flow, and creative positioning.</p>
                <a className="text-link" href="https://wa.me/2340000000000">
                  Enroll
                </a>
              </div>
            </article>
            <article className="course-card reveal">
              <div className="course-visual media-frame aspect-portrait">
                <img
                  src="/images/portfolio/bridal.jpg"
                  alt="Bridal design intensive course preview"
                />
              </div>
              <div className="course-copy">
                <h3>Bridal Design Intensive</h3>
                <p>
                  Explore the design process behind couture bridal pieces, from sketch to final
                  fitting.
                </p>
                <a
                  className="text-link"
                  href="mailto:hello@dionbaci.com?subject=Bridal%20Design%20Intensive%20Enrollment"
                >
                  Enroll
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="media section" id="media">
          <div className="section-heading reveal">
            <p className="eyebrow">Media</p>
            <h2>Featured Interview</h2>
            <p className="body-text support-text">
              A conversation on fashion, identity, and building a brand.
            </p>
          </div>
          <div className="media-feature reveal">
            <iframe
              src="https://www.youtube.com/embed/jlI-w2d6Tdo"
              title="Blessing Bassey Interview"
              allowFullScreen
            />
          </div>
        </section>

        <section className="podcast section" id="podcast">
          <div className="section-heading reveal">
            <p className="eyebrow">Podcast</p>
            <h2>Conversations, insights, and perspectives on fashion and business.</h2>
          </div>
          <div className="podcast-grid stagger-group">
            <article className="podcast-card reveal">
              <p className="post-meta">Platform</p>
              <h3>Spotify</h3>
              <a className="text-link" href="https://spotify.com" target="_blank" rel="noreferrer">
                Listen
              </a>
            </article>
            <article className="podcast-card reveal">
              <p className="post-meta">Platform</p>
              <h3>Apple Podcasts</h3>
              <a
                className="text-link"
                href="https://podcasts.apple.com"
                target="_blank"
                rel="noreferrer"
              >
                Listen
              </a>
            </article>
            <article className="podcast-card reveal">
              <p className="post-meta">Platform</p>
              <h3>YouTube</h3>
              <a
                className="text-link"
                href="https://www.youtube.com/watch?v=jlI-w2d6Tdo"
                target="_blank"
                rel="noreferrer"
              >
                Listen
              </a>
            </article>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-copy reveal">
            <p className="eyebrow">Contact</p>
            <h2>Let’s Create Something Beautiful Together</h2>
            <p className="body-text support-text">
              For commissions, speaking, press, collaborations, and course inquiries.
            </p>
            <div className="contact-details">
              <a href="mailto:hello@dionbaci.com">hello@dionbaci.com</a>
              <a href="tel:+2340000000000">+234 000 000 0000</a>
            </div>
          </div>
          <form className="contact-form reveal">
            <label>
              <span>Name</span>
              <input type="text" name="name" placeholder="Your name" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" placeholder="Your email" />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" rows={5} placeholder="Tell us about your project" />
            </label>
            <button type="submit" className="button button-solid">
              Send Inquiry
            </button>
          </form>
        </section>

        <section className="newsletter section" id="newsletter">
          <div className="newsletter-card reveal">
            <div>
              <p className="eyebrow">Newsletter</p>
              <h2>Join the list</h2>
              <p className="body-text support-text">
                Be the first to experience new collections, insights, and releases.
              </p>
            </div>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" aria-label="Email address" />
              <button type="submit" className="button button-solid">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
          <div className="footer-grid stagger-group">
            <div className="footer-column reveal">
              <p className="footer-title">Brand</p>
            <h3>Blessing ‘ Dion ‘ Bassey</h3>
            <p>Founder, Dion Baci</p>
            <p>Timeless design shaped with intention.</p>
          </div>
          <div className="footer-column reveal">
            <p className="footer-title">Navigation</p>
            {footerItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <div className="footer-column reveal">
            <p className="footer-title">Contact</p>
            <a href="mailto:hello@dionbaci.com">hello@dionbaci.com</a>
            <a href="tel:+2340000000000">+234 000 000 0000</a>
            <p>Lekki, Lagos</p>
          </div>
          <div className="footer-column reveal">
            <p className="footer-title">Connect</p>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://wa.me/2340000000000" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; Blessing ‘ Dion ‘ Bassey. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

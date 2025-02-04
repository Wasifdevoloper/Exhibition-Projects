// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // Global Variables
  const mainHeader = document.querySelector("header"); // Main header element
  const subHeader = document.querySelector("nav"); // Navigation bar (sticky-top)
  const scrollToTopBtn = document.getElementById("scroll-to-top");
  const themeToggle = document.getElementById("theme-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  const headerTitle = document.querySelector(".typing-effect");
  const animateElements = document.querySelectorAll(".animate-on-scroll");
  const navbarBrand = document.querySelector(".navbar-brand");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const projects = document.querySelectorAll('.project');
  const feedbackForm = document.getElementById("feedback-form");

  // === Scroll-to-Top Button ===
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }
  });

  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    // Show/Hide Scroll-to-Top Button
    scrollToTopBtn.style.opacity = window.scrollY > 200 ? "1" : "0";

    // Sticky Navbar on Scroll
    subHeader.classList.toggle("sticky", window.scrollY > 100);

    // Hide Main Header, Sub Header, and Navbar Brand on Scroll Down, Show on Scroll Up
    if (window.scrollY > lastScrollY) {
      // Scrolling down
      mainHeader.style.transform = "translateY(-100%)"; // Hide main header
      subHeader.style.transform = "translateY(-100%)"; // Hide sub header
      navbarBrand.style.transform = "translateY(-100%)"; // Hide navbar brand
      navbarToggler.style.transform = "translateY(0)"; // Keep navbar toggler visible
    } else {
      // Scrolling up
      mainHeader.style.transform = "translateY(0)"; // Show main header
      subHeader.style.transform = "translateY(0)"; // Show sub header
      navbarBrand.style.transform = "translateY(0)"; // Show navbar brand
    }
    lastScrollY = window.scrollY;

    // Zoom-in effect for the project card closest to the center of the viewport
    let closestProject = null;
    let closestDistance = Infinity;
    const viewportCenter = window.innerHeight / 2;

    projects.forEach(project => {
      const projectRect = project.getBoundingClientRect();
      const projectCenter = projectRect.top + projectRect.height / 2;
      const distance = Math.abs(viewportCenter - projectCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestProject = project;
      }
    });

    projects.forEach(project => project.classList.remove('zoom-in'));
    if (closestProject) {
      closestProject.classList.add('zoom-in');
    }
  });

  // Hide and Show Header on Scroll
  let lastScrollTop = 0;
  const header = document.querySelector('header');
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      // Scroll down
      header.classList.add('hidden');
      navbar.style.top = '0';
    } else {
      // Scroll up
      header.classList.remove('hidden');
      navbar.style.top = '60px'; // Adjust based on header height
    }
    lastScrollTop = scrollTop;

    // Zoom-in effect for the project card closest to the center of the viewport
    let closestProject = null;
    let closestDistance = Infinity;
    const viewportCenter = window.innerHeight / 2;

    projects.forEach(project => {
      const projectRect = project.getBoundingClientRect();
      const projectCenter = projectRect.top + projectRect.height / 2;
      const distance = Math.abs(viewportCenter - projectCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestProject = project;
      }
    });

    projects.forEach(project => project.classList.remove('zoom-in'));
    if (closestProject) {
      closestProject.classList.add('zoom-in');
    }
  });

  // === Smooth Scrolling for Navigation Links ===
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSection = document.querySelector(link.getAttribute("href"));
      targetSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  // === Active Navigation Links on Scroll ===
  window.addEventListener("scroll", () => {
    let currentSection = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 70;
      if (window.pageYOffset >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });

  // === New Dark and Light Mode Toggle ===
  const setTheme = (isDark) => {
    document.body.classList.toggle("dark-theme", isDark);
    document.body.classList.toggle("light-theme", !isDark);
    themeToggle.checked = isDark;
  };

  const currentTheme = localStorage.getItem("theme") || "light";
  setTheme(currentTheme === "dark");

  themeToggle.addEventListener("change", () => {
    const isDark = themeToggle.checked;
    setTheme(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Ensure theme is synchronized across pages
  window.addEventListener("storage", (event) => {
    if (event.key === "theme") {
      setTheme(event.newValue === "dark");
    }
  });

  // === Typing Effect (One Cycle) ===
  if (headerTitle) {
    const typingEffect = (element, textArray, speed) => {
      let textIndex = 0;
      let charIndex = 0;
      const type = () => {
        if (charIndex < textArray[textIndex].length) {
          element.innerHTML += textArray[textIndex].charAt(charIndex);
          charIndex++;
          setTimeout(type, speed);
        }
      };
      type();
    };
    typingEffect(headerTitle, [" Projects", "Explore Our Projects"], 100);
  }

  // === Scroll Animations (Intersection Observer) ===
  const observerOptions = { threshold: 0.2 };

  const animateOnScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  animateElements.forEach((el) => animateOnScrollObserver.observe(el));

  // === Accordion Functionality ===
  const accordions = document.querySelectorAll(".accordion");
  accordions.forEach((accordion) => {
    accordion.addEventListener("click", () => {
      accordion.classList.toggle("active");
      const panel = accordion.nextElementSibling;
      panel.style.maxHeight = panel.style.maxHeight ? null : `${panel.scrollHeight}px`;
    });
  });

  // === Buttons with Animations ===
  const animatedButtons = document.querySelectorAll(".btn-animated");
  animatedButtons.forEach((btn) => {
    btn.addEventListener("mouseover", () => {
      btn.classList.add("pulse");
    });
    btn.addEventListener("mouseout", () => {
      btn.classList.remove("pulse");
    });
  });

  // === Animated Navbar Toggle for Mobile ===
  const menuToggle = document.querySelector("#menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      menuToggle.classList.toggle("active");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        menuToggle.classList.remove("active");
      });
    });
  }

  // === Button Ripple Effect ===
  document.querySelectorAll(".btn-ripple").forEach((button) => {
    button.addEventListener("click", function (e) {
      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;

      const ripple = document.createElement("span");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.add("ripple");
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // === Image Zoom Animation ===
  const zoomImages = document.querySelectorAll(".zoom-on-hover");
  zoomImages.forEach((img) => {
    img.addEventListener("mouseover", () => {
      img.style.transform = "scale(1.1)";
      img.style.transition = "transform 0.3s ease-in-out";
    });
    img.addEventListener("mouseout", () => {
      img.style.transform = "scale(1)";
    });
  });

  // === Feedback Form Submission ===
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(feedbackForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      const csvContent = "data:text/csv;charset=utf-8," + Object.keys(data).map(key => `${key},${data[key]}`).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "feedback.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      feedbackForm.reset();
    });
  }
});

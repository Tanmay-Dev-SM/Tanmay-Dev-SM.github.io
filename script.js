document.addEventListener("DOMContentLoaded", () => {
  // Navbar section switching
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);

      navLinks.forEach((lnk) => lnk.classList.remove("active"));
      link.classList.add("active");

      sections.forEach((section) => {
        section.classList.remove("active");
        if (section.id === targetId) {
          setTimeout(() => {
            section.classList.add("active");
          }, 100);
        }
      });
    });
  });

  // Toggle employment details
  document.querySelectorAll(".toggle-details").forEach((button) => {
    button.addEventListener("click", () => {
      const desc = button.nextElementSibling;
      const isShown = desc.classList.contains("visible");
      desc.classList.toggle("visible");
      button.textContent = isShown ? "Show More" : "Show Less";
      button.classList.toggle("expanded", !isShown);
    });
  });

  // Smooth scroll navigation
  function goToSection(targetId) {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      navLinks.forEach((lnk) => lnk.classList.remove("active"));
      document.querySelector(`.nav-link[href='#${targetId}']`)?.classList.add("active");

      sections.forEach((section) => {
        section.classList.remove("active");
      });

      setTimeout(() => {
        targetSection.classList.add("active");
      }, 100);
    }
  }

  document.querySelectorAll(".scroll-next").forEach((scrollBtn) => {
    scrollBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = scrollBtn.getAttribute("href").substring(1);
      goToSection(targetId);
    });
  });

  // Scroll hints
  const scrollHints = {
    home: "Click to go to Work →",
    work: "Click to see Projects →",
    projects: "Click to contact me →",
  };

  document.querySelectorAll(".scroll-next").forEach((scrollBtn) => {
    const section = scrollBtn.closest(".section");
    const targetId = scrollBtn.getAttribute("href").substring(1);
    const hint = document.createElement("a");
    hint.className = "scroll-hint";
    hint.href = `#${targetId}`;
    hint.textContent = scrollHints[section.id] || "Click to scroll";
    hint.addEventListener("click", (e) => {
      e.preventDefault();
      goToSection(targetId);
    });
    scrollBtn.insertAdjacentElement("afterend", hint);
  });

  // Image Carousel Logic
  document.querySelectorAll("[data-carousel]").forEach((carouselWrapper) => {
    const carousel = carouselWrapper.querySelector(".carousel");
    const images = carousel.querySelectorAll("img");
    let currentIndex = 0;

    const updateCarousel = () => {
      const width = carouselWrapper.clientWidth;
      carousel.style.transform = `translateX(-${currentIndex * width}px)`;
    };

    carouselWrapper.querySelector(".next")?.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
    });

    carouselWrapper.querySelector(".prev")?.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);
    updateCarousel();
  });

  // Zoomable image lightbox
  const zoomables = document.querySelectorAll(".zoomable");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  zoomables.forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.style.display = "flex";
    });
  });

  lightbox?.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Tooltip toggle (no extra listener needed)
  const helperBtn = document.getElementById("helper-button");
  const helperTooltip = document.getElementById("helper-tooltip");

  if (helperBtn && helperTooltip) {
    helperBtn.addEventListener("click", () => {
      helperTooltip.classList.toggle("collapsed");
    });
  }
});

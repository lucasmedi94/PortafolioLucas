
(() => {
  "use strict";
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.getElementById("main-nav");
  const navLinks = [...document.querySelectorAll(".nav-link")];

  function closeMenu() {
    if (!menu || !menuButton) return;
    menu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
    document.body.classList.remove("menu-open");
  }
  if (menu && menuButton) {
    menuButton.addEventListener("click", () => {
      const open = !menu.classList.contains("open");
      menu.classList.toggle("open", open);
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      document.body.classList.toggle("menu-open", open);
    });
    menu.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
    document.addEventListener("click", event => {
      if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  function setActive(id) {
    navLinks.forEach(link => {
      const active = link.getAttribute("href") === "#" + id;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  const sections = [...document.querySelectorAll("main section[id]")];
  if (sections.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length) setActive(visible[0].target.id);
    }, { rootMargin: "-20% 0px -55% 0px", threshold: [0, .1, .3, .6] });
    sections.forEach(section => observer.observe(section));
  }
  if (location.hash) setActive(location.hash.slice(1));

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const name = document.getElementById("nombre").value.trim();
      const email = document.getElementById("correo").value.trim();
      const message = document.getElementById("mensaje").value.trim();
      if (!name || !email || !message) return;
      const subject = "Contacto desde el portafolio — " + name;
      const body = "Nombre: " + name + "\nEmail: " + email + "\n\nMensaje:\n" + message;
      const url = "mailto:lucas1medina2@gmail.com?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      document.getElementById("form-status").textContent =
        "Se abrirá tu correo con el mensaje preparado. Revisalo y confirmá el envío desde allí.";
      window.location.href = url;
    });
  }
  const printButton = document.getElementById("print-cv");
  if (printButton) printButton.addEventListener("click", () => window.print());
})();

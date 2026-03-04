console.log("JS cargado correctamente");

// MENU HAMBURGUESA
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links a");

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  navLinks.classList.toggle("active");
  menuBtn.textContent = navLinks.classList.contains("active") ? "✖" : "☰";
});

navItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuBtn.textContent = "☰";
  });
});

document.addEventListener("click", (e) => {
  const clickDentroDelMenu = navLinks.contains(e.target);
  const clickEnBoton = menuBtn.contains(e.target);

  if (!clickDentroDelMenu && !clickEnBoton) {
    navLinks.classList.remove("active");
    menuBtn.textContent = "☰";
  }
});

// ANIMACIONES SCROLL
const faders = document.querySelectorAll(".fade-in");

const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.2
});

faders.forEach(section => {
  appearOnScroll.observe(section);
});

// FETCH BACKEND
async function loadProjects() {
  try {
    const response = await fetch("http://localhost:3000/projects");
    const projects = await response.json();

    console.log(projects);
  } catch (error) {
    console.error("Error cargando proyectos:", error);
  }
}

loadProjects();
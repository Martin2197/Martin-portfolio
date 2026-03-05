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
    const response = await fetch("https://portfolio-api-wauk.onrender.com/projects")
    const projects = await response.json();

    console.log("Proyectos:", projects);

    const container = document.getElementById("projects-container");

    projects.forEach(project => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <div class="card-info">
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <div class="card-buttons">
            <a href="${project.demo}" class="btn" target="_blank">Demo</a>
            <a href="${project.github}" class="btn btn-secondary" target="_blank">Código</a>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error cargando proyectos:", error);
  }
}

loadProjects();
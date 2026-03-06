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
  if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
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

//SKELETON DE CARGA
function showSkeletons() {
  const container = document.getElementById("projects-container");

  for (let i = 0; i < 3; i++) {
    const skeleton = document.createElement("div");
    skeleton.classList.add("skeleton-card");

    skeleton.innerHTML = `
      <div class="skeleton-img"></div>
      <div class="skeleton-text">
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
        <div class="skeleton-line"></div>
      </div>
    `;

    container.appendChild(skeleton);
  }
}

// FETCH BACKEND
async function loadProjects() {

  const container = document.getElementById("projects-container");

  showSkeletons();

  try {

    const response = await fetch("https://portfolio-api-wauk.onrender.com/projects");
    const projects = await response.json();

    container.innerHTML = "";

    projects.forEach((project, index) => {

      const card = document.createElement("div");
      card.classList.add("card");

      card.style.animationDelay = `${index * 0.15}s`;

      card.innerHTML = `
  <img src="${project.image}" alt="${project.name}">

  <div class="card-info">

    <h3>${project.name}</h3>

    <p>${project.description}</p>

    <div class="tech-stack">
      ${project.tech.map(t => `<span class="tech">${t}</span>`).join("")}
    </div>

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
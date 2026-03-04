navLinks.classList.toggle("active");

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
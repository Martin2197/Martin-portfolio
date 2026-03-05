const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

const projects = [
  {
    name: "Landing MasStore",
    description: "Landing de productos electrónicos",
    demo: "https://martin2197.github.io/Martin-portfolio/",
    github: "https://github.com/Martin2197"
  },
  {
    name: "Maquetado Facebook",
    description: "Réplica de Facebook para practicar Frontend",
    demo: "#",
    github: "https://github.com/Martin2197"
  }
];

app.get("/projects", (req, res) => {
  res.json(projects);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

const projects = require("./data/projects");

app.get("/projects", (req, res) => {
  res.json(projects);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
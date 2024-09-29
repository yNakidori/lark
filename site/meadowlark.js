const express = require("express");
const { engine } = require("express-handlebars");

const app = express();

// Servir arquivos estáticos da pasta public
app.get("/about", (req, res) => res.render("about"));

// Configurar o view engine handlebars
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));

// Pagina 404
app.use((req, res) => {
  res.status(404);
  res.render("404");
});

// Pagina 500 personalizada
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res, render("500");
});

app.listen(port, () =>
  console.log(
    `Express started on http://localhost:${port}; press Ctrl-C to terminate.`
  )
);

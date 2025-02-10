const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pokemonRoutes = require("./routes/pokemonRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", pokemonRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

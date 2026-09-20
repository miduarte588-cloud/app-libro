import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import libroRoutes from "./routes/Libros.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// Obtener la ruta actual del proyecto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());

// Servir los archivos del frontend
app.use(express.static(path.join(__dirname, "../public")));

// Conexión a MongoDB
connectDB();

// Rutas
app.use("/libros", libroRoutes);

app.listen(3000, () => {
    console.log("servidor ejecutandose en http://localhost:3000");
});
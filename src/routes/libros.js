import express from "express";
import Libro from "../models/Libro.js";

const router = express.Router();


// ==========================================
// CREAR UN LIBRO
// ==========================================
router.post("/new", async (req, res) => {

    const { titulo, autor, paginas } = req.body;

    try {

        const libro = new Libro({
            titulo,
            autor,
            paginas
        });

        await libro.save();

        res.json(libro);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al guardar el libro"
        });
    }
});


// ==========================================
// LISTAR TODOS LOS LIBROS
// ==========================================
router.get("/list", async (req, res) => {

    try {

        const libros = await Libro.find();

        res.json(libros);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al obtener los libros"
        });
    }
});


// ==========================================
// BUSCAR UN LIBRO POR ID
// ==========================================
router.get("/:id", async (req, res) => {

    const id = req.params.id;

    try {

        const libro = await Libro.findById(id);

        if (!libro) {
            return res.status(404).json({
                error: "Libro no encontrado"
            });
        }

        res.json(libro);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al obtener el libro"
        });
    }
});


// ==========================================
// ACTUALIZAR UN LIBRO POR ID
// ==========================================
router.put("/:id", async (req, res) => {

    const id = req.params.id;

    const { titulo, autor, paginas } = req.body;

    try {

        // Primero buscamos el libro
        const libro = await Libro.findById(id);

        if (!libro) {
            return res.status(404).json({
                error: "Libro no encontrado"
            });
        }

        // Actualizamos los datos
        libro.titulo = titulo;
        libro.autor = autor;
        libro.paginas = paginas;

        // Guardamos los cambios
        await libro.save();

        res.json(libro);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al actualizar el libro"
        });
    }
});


// ==========================================
// ELIMINAR UN LIBRO POR ID
// ==========================================
router.delete("/:id", async (req, res) => {

    const id = req.params.id;

    try {

        const libro = await Libro.findByIdAndDelete(id);

        if (!libro) {
            return res.status(404).json({
                error: "Libro no encontrado"
            });
        }

        res.json({
            mensaje: "Libro eliminado correctamente",
            libro: libro
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al eliminar el libro"
        });
    }
});


export default router;
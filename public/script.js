const API_URL = "http://localhost:3000/libros";


// ===============================
// LISTAR TODOS LOS LIBROS
// ===============================
async function listarLibros() {
    try {
        const respuesta = await fetch(`${API_URL}/list`);
        const libros = await respuesta.json();

        const lista = document.getElementById("listaLibros");

        lista.innerHTML = "";

        libros.forEach((libro) => {
            lista.innerHTML += `
                <div>
                    <h3>${libro.titulo}</h3>
                    <p>Autor: ${libro.autor}</p>
                    <p>Páginas: ${libro.paginas}</p>
                    <p>ID: ${libro._id}</p>
                    <hr>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error al listar los libros:", error);
    }
}


// ===============================
// CREAR UN LIBRO
// ===============================
async function crearLibro() {

    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const paginas = document.getElementById("paginas").value;

    try {
        const respuesta = await fetch(`${API_URL}/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo,
                autor,
                paginas: Number(paginas)
            })
        });

        await respuesta.json();

        alert("Libro creado correctamente");

        document.getElementById("titulo").value = "";
        document.getElementById("autor").value = "";
        document.getElementById("paginas").value = "";

        listarLibros();

    } catch (error) {
        console.error("Error al crear el libro:", error);
    }
}


// ===============================
// BUSCAR UN LIBRO POR ID
// ===============================
async function buscarLibro() {

    const id = document.getElementById("buscarId").value;
    const resultado = document.getElementById("resultadoBusqueda");

    try {
        const respuesta = await fetch(`${API_URL}/${id}`);

        if (!respuesta.ok) {
            resultado.innerHTML = "<p>Libro no encontrado</p>";
            return;
        }

        const libro = await respuesta.json();

        resultado.innerHTML = `
            <h3>${libro.titulo}</h3>
            <p>Autor: ${libro.autor}</p>
            <p>Páginas: ${libro.paginas}</p>
            <p>ID: ${libro._id}</p>
        `;

    } catch (error) {
        console.error("Error al buscar el libro:", error);
    }
}


// ===============================
// ACTUALIZAR UN LIBRO
// ===============================
async function actualizarLibro() {

    const id = document.getElementById("actualizarId").value;
    const titulo = document.getElementById("actualizarTitulo").value;
    const autor = document.getElementById("actualizarAutor").value;
    const paginas = document.getElementById("actualizarPaginas").value;

    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo,
                autor,
                paginas: Number(paginas)
            })
        });

        if (!respuesta.ok) {
            alert("No se pudo actualizar el libro");
            return;
        }

        await respuesta.json();

        alert("Libro actualizado correctamente");

        document.getElementById("actualizarId").value = "";
        document.getElementById("actualizarTitulo").value = "";
        document.getElementById("actualizarAutor").value = "";
        document.getElementById("actualizarPaginas").value = "";

        listarLibros();

    } catch (error) {
        console.error("Error al actualizar el libro:", error);
    }
}


// ===============================
// ELIMINAR UN LIBRO
// ===============================
async function eliminarLibro() {

    const id = document.getElementById("eliminarId").value;

    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!respuesta.ok) {
            alert("No se pudo eliminar el libro");
            return;
        }

        await respuesta.json();

        alert("Libro eliminado correctamente");

        document.getElementById("eliminarId").value = "";

        listarLibros();

    } catch (error) {
        console.error("Error al eliminar el libro:", error);
    }
}
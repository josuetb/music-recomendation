let button = document.getElementById("guardar");
button.addEventListener("click", guardarDatos);

let aleatoriaButton = document.getElementById("aleatoria");
aleatoriaButton.addEventListener("click", obtenerCancionAleatoria);

async function guardarDatos() {
    const nombre = document.getElementById("nombre").value;
    const artista = document.getElementById("artista").value;
    const url = document.getElementById("url").value;

    if (!nombre || !artista || !url) {
        alert("Por favor completa todos los campos.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/canciones", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, artista, url_video: url }),
        });

        if (response.ok) {
            alert("Canción guardada con éxito.");
            cargarCanciones();
        } else {
            alert("Error al guardar la canción.");
        }
    } catch (error) {
        console.error("Error al guardar datos:", error);
        alert("Error inesperado.");
    }
}

async function obtenerCancionAleatoria() {
    try {
        let response = await fetch("http://localhost:3000/canciones/aleatoria");
        if (response.ok) {
            let cancion = await response.json();
            document.getElementById("cancion-aleatoria").innerHTML = `
                <div class="tarjeta-cancion">
                    <h3>${cancion.nombre}</h3>
                    <p>Artista: ${cancion.artista}</p>
                    <a href="${cancion.url_video}" target="_blank">Ver Video</a>
                </div>
            `;
        } else {
            console.error("Error al obtener canción aleatoria:", response.status);
            document.getElementById("cancion-aleatoria").innerHTML = `
                <p>Error al obtener canción aleatoria. Código de estado: ${response.status}</p>
            `;
        }
    } catch (error) {
        console.error("Error en la solicitud de canción aleatoria:", error);
        document.getElementById("cancion-aleatoria").innerHTML = `
            <p>Error inesperado al obtener canción aleatoria.</p>
        `;
    }
}

async function cargarCanciones() {
    try {
        const response = await fetch("http://localhost:3000/canciones");
        if (response.ok) {
            const canciones = await response.json();
            const cancionesContainer = document.getElementById("canciones");
            cancionesContainer.innerHTML = "";

            canciones.forEach((cancion) => {
                const card = document.createElement("div");
                card.className = "card-container";
                card.innerHTML = `
                    <h3>${cancion.nombre}</h3>
                    <p>Artista: ${cancion.artista}</p>
                    <a href="${cancion.url_video}" target="_blank">Ver Video</a>
                    <p>Votos: ${cancion.votos || 0}</p>
                    <button class="votar-btn" data-id="${cancion._id}">Votar</button>
                    <button class="eliminar-btn" data-id="${cancion._id}">Eliminar</button>
                    <p>-----------------------------------------------</p>
                `;
                cancionesContainer.appendChild(card);
            });

            const votarButtons = document.querySelectorAll(".votar-btn");
            votarButtons.forEach((button) => {
                button.addEventListener("click", async (e) => {
                    const id = e.target.dataset.id;
                    try {
                        const response = await fetch(`http://localhost:3000/canciones/${id}/votar`, {
                            method: "POST",
                        });
                        if (response.ok) {
                            alert("¡Voto registrado!");
                            cargarCanciones();
                        } else {
                            alert("Error al votar.");
                        }
                    } catch (error) {
                        console.error("Error al votar:", error);
                    }
                });
            });

            const eliminarButtons = document.querySelectorAll(".eliminar-btn");
            eliminarButtons.forEach((button) => {
                button.addEventListener("click", async (e) => {
                    const id = e.target.dataset.id;
                    try {
                        const response = await fetch(`http://localhost:3000/canciones/${id}`, {
                            method: "DELETE",
                        });
                        if (response.ok) {
                            alert("¡Canción eliminada!");
                            cargarCanciones(); 
                        } else {
                            alert("Error al eliminar la canción.");
                        }
                    } catch (error) {
                        console.error("Error al eliminar canción:", error);
                    }
                });
            });

        } else {
            console.error("Error al cargar canciones:", response.status);
        }
    } catch (error) {
        console.error("Error en la solicitud de canciones:", error);
    }
}


cargarCanciones();

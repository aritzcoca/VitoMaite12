
///////////////////////////////////////////////////BOTONES DEL NAVBAR////////////////////////////////////////////////////////////////////

document.getElementById("volverAlInicioBtn").addEventListener('click', function () {
    window.location.href = 'logeado.html';
});

document.getElementById("botonCerrarSesion").addEventListener('click', function () {
    // Limpiar la información del usuario de sessionStorage
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('nombre');
    sessionStorage.removeItem('foto');
    sessionStorage.removeItem('genero');
    sessionStorage.removeItem('ciudad');
    sessionStorage.removeItem('edad');

    // Redirigir a la página de inicio de sesión
    window.location.href = 'index.html';
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
// Conexión única a IndexedDB
let dbConnection = null;

// Función para obtener la conexión única a IndexedDB
function obtenerConexionIndexedDB(callback) {
    if (dbConnection) {
        callback(dbConnection);
    } else {
        const request = indexedDB.open("vitomaitebd", 1);
        request.onsuccess = function (event) {
            console.log("Conexión exitosa a IndexedDB.");
            dbConnection = event.target.result;
            callback(dbConnection);
        };

        request.onerror = function () {
            console.error("Error al abrir la base de datos IndexedDB.");
        };
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    // Mostrar mensaje de bienvenida
    const fotoUsuario = sessionStorage.getItem('foto');
    const fotoUsuarioElement = document.getElementById("fotoUsuario");

    if (fotoUsuarioElement && fotoUsuario) {
        fotoUsuarioElement.src = fotoUsuario;
    }

    // Cargar aficiones desde IndexedDB
    cargarAficionesDesdeIndexedDB();
});

////////////////////////////CARGAR AFICIONES/////////////////////////////////////////////////////////////////////////////////////////////

function cargarAficionesDesdeIndexedDB() {
    obtenerConexionIndexedDB((db) => {
        const transaction = db.transaction("Aficiones", "readonly");
        const store = transaction.objectStore("Aficiones");

        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = function () {
            const aficiones = getAllRequest.result;
            mostrarAficionesEnDropdown(aficiones);
        };

        getAllRequest.onerror = function () {
            console.error("Error al obtener las aficiones desde IndexedDB.");
        };
    });
}

function mostrarAficionesEnDropdown(aficiones) {
    const dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.innerHTML = '';

    aficiones.forEach((aficion) => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.name = "opciones";
        checkbox.value = aficion.id; // Usar el ID como valor
        label.textContent = aficion.nombre;

        label.prepend(checkbox);
        dropdownContent.appendChild(label);
    });
}

////////////////////////////OBTENER AFICIONES SELECCIONADAS//////////////////////////////////////////////////////////////////////////////

function obtenerAficionesSeleccionadas() {
    const checkboxes = document.querySelectorAll('input[name="opciones"]:checked');

    const seleccionadas = Array.from(checkboxes).map((checkbox) => ({
        id: parseInt(checkbox.value, 10),
        nombre: checkbox.parentNode.textContent.trim()
    }));

    console.log("Aficiones seleccionadas:", seleccionadas);
    return seleccionadas.map((aficion) => aficion.id);
}

////////////////////////////BUSCAR USUARIOS//////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById("botonBuscar").addEventListener("click", function () {
    const seleccionadas = obtenerAficionesSeleccionadas();
    if (seleccionadas.length > 0) {
        buscarUsuariosPorAficiones(seleccionadas);
    } else {
        Swal.fire("Por favor, selecciona al menos una afición.");
    }
});

function buscarUsuariosPorAficiones(aficionesSeleccionadas) {
    const request = indexedDB.open("vitomaitebd", 1);

    request.onsuccess = function (event) {
        const db = event.target.result;

        const transaction = db.transaction("AficionesUsuarios", "readonly");
        const aficionesUsuariosStore = transaction.objectStore("AficionesUsuarios");

        const usuarioAficionesCount = new Map();

        aficionesUsuariosStore.openCursor().onsuccess = function (event) {
            const cursor = event.target.result;

            if (cursor) {
                const registro = cursor.value;

                console.log(`Procesando registro: Email: ${registro.email}, Afición: ${registro.aficion}`);

                if (aficionesSeleccionadas.includes(registro.aficion)) {
                    const email = registro.email;

                    if (!usuarioAficionesCount.has(email)) {
                        usuarioAficionesCount.set(email, 1);
                    } else {
                        usuarioAficionesCount.set(email, usuarioAficionesCount.get(email) + 1);
                    }

                    console.log(`Afición válida para ${email}: Conteo actual: ${usuarioAficionesCount.get(email)}`);
                }

                cursor.continue();
            } else {
                console.log("Conteo final de aficiones por usuario:", Array.from(usuarioAficionesCount.entries()));

                const usuariosFiltrados = Array.from(usuarioAficionesCount.entries())
                    .filter(([email, count]) => count === aficionesSeleccionadas.length)
                    .map(([email]) => email);

                console.log("Usuarios que cumplen todas las aficiones seleccionadas:", usuariosFiltrados);

                if (usuariosFiltrados.length > 0) {
                    obtenerUsuariosPorEmail(usuariosFiltrados);
                } else {
                    Swal.fire("No se encontraron usuarios con todas las aficiones seleccionadas.");
                    limpiarTablaUsuarios();
                }
            }
        };

        aficionesUsuariosStore.openCursor().onerror = function () {
            console.error("Error al abrir el cursor en AficionesUsuarios.");
        };
    };

    request.onerror = function () {
        console.error("Error al abrir la base de datos IndexedDB.");
    };
}

////////////////////////////OBTENER USUARIOS POR EMAIL///////////////////////////////////////////////////////////////////////////////////

function obtenerUsuariosPorEmail(emails) {
    const request = indexedDB.open("vitomaitebd", 1);

    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction("Usuarios", "readonly");
        const usuariosStore = transaction.objectStore("Usuarios");

        const emailUsuarioActual = sessionStorage.getItem('email');
        limpiarTablaUsuarios();

        emails.forEach((email) => {
            if (email === emailUsuarioActual) {
                console.log(`El usuario actual (${email}) se excluye de los resultados.`);
                return;
            }

            const index = usuariosStore.index("email");
            const request = index.get(email);

            request.onsuccess = function () {
                const usuario = request.result;

                if (usuario) {
                    console.log(`Usuario encontrado: ${JSON.stringify(usuario)}`);
                    agregarUsuarioALaInterfaz(usuario);
                } else {
                    console.log(`No se encontró el usuario con email: ${email}`);
                }
            };

            request.onerror = function () {
                console.error("Error al buscar el usuario por email:", email);
            };
        });
    };

    request.onerror = function () {
        console.error("Error al abrir la base de datos IndexedDB.");
    };
}

////////////////////////////LIMPIAR TABLA///////////////////////////////////////////////////////////////////////////////////////////////

function limpiarTablaUsuarios() {
    const contenedorUsuarios = document.getElementById("contenedorUsuarios");
    const tablaUsuarios = contenedorUsuarios.querySelector(".tabla-usuarios");

    if (tablaUsuarios) {
        tablaUsuarios.remove();
    }
}

////////////////////////////AGREGAR USUARIO/////////////////////////////////////////////////////////////////////////////////////////////

function agregarUsuarioALaInterfaz(usuario) {
    const contenedorUsuarios = document.getElementById("contenedorUsuarios");

    let tablaUsuarios = document.querySelector(".tabla-usuarios");
    if (!tablaUsuarios) {
        tablaUsuarios = document.createElement("table");
        tablaUsuarios.className = "tabla-usuarios";

        const filaCabecera = document.createElement("tr");

        ["Nick", "Edad", "Ciudad", "Altura", "Foto"].forEach((texto) => {
            const th = document.createElement("th");
            th.textContent = texto;
            filaCabecera.appendChild(th);
        });

        tablaUsuarios.appendChild(filaCabecera);
        contenedorUsuarios.appendChild(tablaUsuarios);
    }

    const filaUsuario = document.createElement("tr");

    const nombreCelda = document.createElement("td");
    nombreCelda.textContent = usuario.nombre;

    const edadCelda = document.createElement("td");
    edadCelda.textContent = usuario.edad;

    const ciudadCelda = document.createElement("td");
    ciudadCelda.textContent = usuario.ciudad;

    const alturaCelda = document.createElement("td");
    alturaCelda.textContent = usuario.altura;

    const fotoCelda = document.createElement("td");
    const imgElemento = document.createElement("img");
    imgElemento.src = usuario.foto;
    imgElemento.alt = `Foto de ${usuario.nombre}`;
    imgElemento.style.width = "50px";
    imgElemento.style.borderRadius = "50%";
    fotoCelda.appendChild(imgElemento);

    filaUsuario.appendChild(nombreCelda);
    filaUsuario.appendChild(edadCelda);
    filaUsuario.appendChild(ciudadCelda);
    filaUsuario.appendChild(alturaCelda);
    filaUsuario.appendChild(fotoCelda);

    tablaUsuarios.appendChild(filaUsuario);
}

////////////////////////RELACIONADO CON EL DROPDOWN/////////////////////////////////////////////////////////////////////////////////////

const dropdown = document.getElementById('dropdown');
const dropdownButton = document.getElementById('dropdownButton');
const dropdownContent = document.getElementById('dropdownContent');

dropdownButton.addEventListener('click', () => {
    dropdown.classList.toggle('open');
});

document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('open');
    }
});

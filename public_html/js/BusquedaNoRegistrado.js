document.getElementById("buscarBtn").addEventListener('click', function () {

    var contenedorUsuarios = document.getElementById("contenedorUsuarios");
    //borrar la tabla
    contenedorUsuarios.value = '';
    
    mostrarUsuarios();
}
);

function mostrarUsuarios() {
    
    var contenedorUsuarios = document.getElementById("contenedorUsuarios");
    
    contenedorUsuarios.innerHTML = "";

    var solicitud = indexedDB.open("vitomaitebd", 1);

    solicitud.onsuccess = function (evento) {
        var db = evento.target.result;
        var transaccion = db.transaction(["Usuarios"], "readonly");
        var usuariosStore = transaccion.objectStore("Usuarios");
        
        //asi como hubieran llegado a la tabla
        //var cursor = usuariosStore.openCursor();
        
        //asi salen ordenados por edad
        var cursor = usuariosStore.index("edad").openCursor();

        //orden inverso por edad
        //var cursor = usuariosStore.index("edad").openCursor(null, "prev");

        var hayUsuarios = false;
        var hayUsuariosEnTabla = false;

        // Asegúrate de que "Usuarios" existe en la base de datos
        if (!db.objectStoreNames.contains("Usuarios")) {
            console.error("El objectStore 'Usuarios' no existe.");
            return;
        }

        cursor.onsuccess = function (eventoCursor) {
            
            var resultado = eventoCursor.target.result;

            if (resultado) {

                hayUsuariosEnTabla = true;

                var usuario = resultado.value;

                    //los datos que tu has elegido en el htnml
                var genero = document.getElementById('genero').value;
                var edad = document.getElementById('edad').value;
                var ciudad = document.getElementById('ciudad').value;

                // Filtro condicional para mostrar usuarios que cumplen todos los criterios seleccionados
                var cumpleCriterios =
                        (usuario.genero === genero &&
                        usuario.edad === edad &&
                        usuario.ciudad === ciudad);

                if (cumpleCriterios) {
                    
                    //NO PUEDES SALIR TU MISMO EN LAS BUSQUEDAS!!!
                    var emailUsuario = sessionStorage.getItem('email');
                    if ( emailUsuario !== usuario.email )
                    {
                        agregarUsuarioALaInterfaz(usuario);
                        hayUsuarios = true;
                    }
                }

                // Mover al siguiente registro
                resultado.continue();
                
            } else {
                if (!hayUsuariosEnTabla) {
                    Swal.fire("No hay usuarios!");
                } else if (!hayUsuarios) {
                    Swal.fire("No hay usuarios con ese perfil!\n :/");
                }
            }
        };

        cursor.onerror = function () {
            console.error("Error al abrir el cursor.");
        };
    };

    solicitud.onerror = function () {
        console.error("Error al abrir la base de datos");
    };
}



//funcion que "GENERA LA TABLA DE RESULTADOS" 
function agregarUsuarioALaInterfaz(usuario) {
    
    //recuperas el elemento del html actual
    var contenedorUsuarios = document.getElementById("contenedorUsuarios");

    // Verificar si ya existe la tabla
    var tablaUsuarios = document.querySelector(".tabla-usuarios");
    
    if (!tablaUsuarios) {
        // Crear la tabla solo si no existe
        tablaUsuarios = document.createElement("table");
        tablaUsuarios.className = "tabla-usuarios";

        // Crear la fila de la cabecera
        var filaCabecera = document.createElement("tr");

        // Crear celdas de la cabecera
        var nombreCabecera = document.createElement("th");
        nombreCabecera.textContent = "Nombre";

        var edadCabecera = document.createElement("th");
        edadCabecera.textContent = "Edad";

        var fotoCabecera = document.createElement("th");
        fotoCabecera.textContent = "Foto";

        // Agregar celdas de la cabecera a la fila de la cabecera
        filaCabecera.appendChild(nombreCabecera);
        filaCabecera.appendChild(edadCabecera);
        filaCabecera.appendChild(fotoCabecera);

        // Agregar la fila de la cabecera a la tabla
        tablaUsuarios.appendChild(filaCabecera);

        // Agregar la tabla al contenedor de artículos
        contenedorUsuarios.appendChild(tablaUsuarios);
    } //FIN DE LA CREACION DE LAS CABECERAS DE LA TABLA PARA LA PRIMERA FILA

    //a partir de aqui estas creando cada fila de la tabla

    //este codigo se ejecuta cada vez que el cursor se mueve por la tabla

    // Crear una fila para el usuario
    var filaUsuario = document.createElement("tr");

    // Crear celdas para mostrar la información del usuario
    var nombreCelda = document.createElement("td");
    //usuario es el parametro que le envias desde la tabla de usuarios
    nombreCelda.textContent = usuario.nombre;

    var edadCelda = document.createElement("td");
    edadCelda.textContent = usuario.edad;

    // Agregar la imagen del usuario a la celda de la foto
    var fotoCelda = document.createElement("td");
    var fotoUsuario = document.createElement("img");
    //usuario.foto es el nombre del archivo en la tabla de la BD
    fotoUsuario.src = "img/" + usuario.foto;
    fotoUsuario.alt = "Foto del Usuario";
    // Agregar la imagen a la celda
    fotoCelda.appendChild(fotoUsuario);

    // Agregar celdas a la fila del usuario
    filaUsuario.appendChild(nombreCelda);
    filaUsuario.appendChild(edadCelda);
    filaUsuario.appendChild(fotoCelda);

    // Agregar la fila del usuario a la tabla
    tablaUsuarios.appendChild(filaUsuario);
}

const selectEdad = document.getElementById('edad');

// Genera las opciones de edad desde 18 hasta 99
for (let i = 18; i <= 99; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = i;
  selectEdad.appendChild(option);
}

// Agrega un event listener al botón de "Cancelar"
document.getElementById("cancelarBtn").addEventListener('click', function() {
    window.location.href = 'index.html'; // Redirige al index.html
});

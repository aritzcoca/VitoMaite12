document.addEventListener('DOMContentLoaded', function () {
    // Mostrar mensaje de bienvenida
    var nombreUsuario = sessionStorage.getItem('nombre');
    var fotoUsuario = sessionStorage.getItem('foto');
    var mensajeBienvenida = document.getElementById("mensajeBienvenida");
    var fotoUsuarioElement = document.getElementById("fotoUsuario");

    if (mensajeBienvenida && nombreUsuario) {
        mensajeBienvenida.textContent = "Bienvenido/a, " + nombreUsuario;
    }

    if (fotoUsuarioElement && fotoUsuario) {
        fotoUsuarioElement.src = fotoUsuario;
    }

    // Cargar el desplegable de edades
    var edadSelect = document.getElementById('edad');
    if (edadSelect) {
        for (var i = 18; i <= 99; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            edadSelect.appendChild(option);
        }
    }
});

//****************************************************************************** 
//*************************** CERRAR SESION ************************************
//****************************************************************************** 

document.getElementById("cerrarSesionBtn").addEventListener('click', function () {
// Limpiar la información del usuario de sessionStorage
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('nombre');
    sessionStorage.removeItem('foto');
    // Redirigir a la página de inicio de sesión
    window.location.href = 'index.html';
}
);


//****************************************************************************** 
//******************************** BUSCAR **************************************
//****************************************************************************** 
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


function agregarUsuarioALaInterfaz(usuario) {
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
        nombreCabecera.textContent = "Nick";

        var edadCabecera = document.createElement("th");
        edadCabecera.textContent = "Edad";

        var ciudadCabecera = document.createElement("th");
        ciudadCabecera.textContent = "Ciudad";

        var alturaCabecera = document.createElement("th");
        alturaCabecera.textContent = "Altura";

        var fotoCabecera = document.createElement("th");
        fotoCabecera.textContent = "Foto";

        // Agregar celdas de la cabecera a la fila de la cabecera
        filaCabecera.appendChild(nombreCabecera);
        filaCabecera.appendChild(edadCabecera);
        filaCabecera.appendChild(ciudadCabecera);
        filaCabecera.appendChild(alturaCabecera);
        filaCabecera.appendChild(fotoCabecera);

        // Agregar la fila de la cabecera a la tabla
        tablaUsuarios.appendChild(filaCabecera);

        // Agregar la tabla al contenedor de usuarios
        contenedorUsuarios.appendChild(tablaUsuarios);
    }

    // Crear una fila para cada usuario
    var filaUsuario = document.createElement("tr");
    filaUsuario.id = usuario.id;

    // Crear celdas para mostrar la información del usuario
    var nombreCelda = document.createElement("td");
    nombreCelda.textContent = usuario.nombre;

    var edadCelda = document.createElement("td");
    edadCelda.textContent = usuario.edad;

    var ciudadCelda = document.createElement("td");
    ciudadCelda.textContent = usuario.ciudad;

    var alturaCelda = document.createElement("td");
    alturaCelda.textContent = usuario.altura;

    // Crear una celda con la imagen
    var fotoCelda = document.createElement("td");
    var imgElemento = document.createElement("img");
    imgElemento.src = usuario.foto; // Asignar la URL de la foto del usuario
    imgElemento.alt = `Foto de ${usuario.nombre}`;
    imgElemento.style.width = "50px"; // Ajustar el tamaño de la imagen
    imgElemento.style.borderRadius = "50%"; // Hacer la imagen circular
    fotoCelda.appendChild(imgElemento);

    // Botón de detalles
    var botonDetalles = document.createElement("button");
    botonDetalles.textContent = "Detalles";
    botonDetalles.addEventListener("click", function () {
        mostrarDetallesUsuario(usuario); // Llama a la función de detalles con el usuario
    });

    // Columna del botón de imagen de like
    var likeCelda = document.createElement("td");
    var iconoLike = document.createElement("img");
    iconoLike.src = "img/like.png"; // Reemplaza con la ruta de tu imagen de like
    iconoLike.alt = "Like";
    iconoLike.style.cursor = "pointer"; // Cambia el cursor para que se vea como un botón
    iconoLike.addEventListener("click", function () {
        darLike(filaUsuario.id); // Llama a la función darLike con el id del usuario
    });
    likeCelda.appendChild(iconoLike);

    // Agregar celdas a la fila del usuario
    filaUsuario.appendChild(nombreCelda);
    filaUsuario.appendChild(edadCelda);
    filaUsuario.appendChild(ciudadCelda);
    filaUsuario.appendChild(alturaCelda);
    filaUsuario.appendChild(fotoCelda);
    
    filaUsuario.appendChild(likeCelda);

    // Agregar la fila del usuario a la tabla
    tablaUsuarios.appendChild(filaUsuario);
}




function darLike(usuario){

    Swal.fire("Has dado like"  );


//tienes que comprobar que no pueda darle like otra vez si ya tiene un 2 en la tabla
}


document.getElementById("busquedaAficionesBtn").addEventListener('click', function () {

    window.location.href = 'BusquedaAficiones.html';
}
);
document.getElementById("busquedaGeolocalizadaBtn").addEventListener('click', function () {

    window.location.href = 'BusquedaGeolocalizada.html';
}
);

function obtenerInformacionUsuario(email, callback) {
    var solicitud = indexedDB.open("vitomaitebd", 1);

    solicitud.onsuccess = function (evento) {
        var db = evento.target.result;
        var transaccion = db.transaction(["Usuarios"], "readonly");
        var usuariosStore = transaccion.objectStore("Usuarios");

        // Buscar el usuario por email usando el índice
        var indiceEmail = usuariosStore.index("email");
        var cursor = indiceEmail.openCursor(IDBKeyRange.only(email));

        cursor.onsuccess = function (eventoCursor) {
            var resultado = eventoCursor.target.result;

            if (resultado) {
                // Llamar al callback con toda la información del usuario
                callback(resultado.value);
            } else {
                // Si no se encuentra el usuario, llamar al callback con null
                callback(null);
            }
        };

        cursor.onerror = function () {
            console.error("Error al buscar el usuario");
            callback(null);
        };
    };

    solicitud.onerror = function () {
        console.error("Error al abrir la base de datos");
        callback(null);
    };
}


document.getElementById("volverAlInicioBtn").addEventListener('click', function () {
    
    window.location.href = 'logeado.html';
}
);

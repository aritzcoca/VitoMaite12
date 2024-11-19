//****************************************************************************** 
//******************************** SALUDAR *************************************
//****************************************************************************** 
document.addEventListener('DOMContentLoaded', function () {
// Obtener la información del usuario de sessionStorage
    //var emailUsuario = sessionStorage.getItem('email');
    var nombreUsuario = sessionStorage.getItem('nombre');
    var fotoUsuario = sessionStorage.getItem('foto');
    // Mostrar el mensaje de bienvenida
    var mensajeBienvenida = document.getElementById("mensajeBienvenida");
    mensajeBienvenida.textContent = "Bienvenido/a, " + nombreUsuario;
    // Mostrar la foto del usuario
    var fotoUsuarioElement = document.getElementById("fotoUsuario");
    fotoUsuarioElement.src = fotoUsuario;
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

//////**************************************************************************** 
//*******CARGAR VALORES DE EDADES ENTRE 18 y 99 DESPLEGABLE FORM ***************
//****************************************************************************** 
document.addEventListener('DOMContentLoaded', function () {
    var edadSelect = document.getElementById('edad');
 
    for (var i = 18; i <= 99; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        edadSelect.appendChild(option);
    }
});

////**************************************************************************** 
//******************************** SALUDAR *************************************
//****************************************************************************** 
document.addEventListener('DOMContentLoaded', function () {
// Obtener la información del usuario de sessionStorage
    //var emailUsuario = sessionStorage.getItem('email');
    var nombreUsuario = sessionStorage.getItem('nombre');
    var fotoUsuario = sessionStorage.getItem('foto');
    // Mostrar el mensaje de bienvenida
    var mensajeBienvenida = document.getElementById("mensajeBienvenida");
    mensajeBienvenida.textContent = "Bienvenido/a, " + nombreUsuario;
    // Mostrar la foto del usuario
    var fotoUsuarioElement = document.getElementById("fotoUsuario");
    fotoUsuarioElement.src = fotoUsuario;
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

        // Agregar celdas de la cabecera a la fila de la cabecera
        filaCabecera.appendChild(nombreCabecera);
        filaCabecera.appendChild(edadCabecera);
        filaCabecera.appendChild(ciudadCabecera);

        // Agregar la fila de la cabecera a la tabla
        tablaUsuarios.appendChild(filaCabecera);

        // Agregar la tabla al contenedor de artículos
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
   
    // Botón de detalles
    var botonDetalles = document.createElement("button");
    botonDetalles.textContent = "Detalles";
    botonDetalles.addEventListener("click", function () {
        mostrarDetallesUsuario(); // Llama a la función de detalles
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
    filaUsuario.appendChild(botonDetalles);
    filaUsuario.appendChild(likeCelda);

    // Agregar la fila del usuario a la tabla
    tablaUsuarios.appendChild(filaUsuario);
}

function mostrarDetallesUsuario() {

    //no premium, tiene que redireccionar
    var nombreUsuario = sessionStorage.getItem('nombre');
    Swal.fire("Lo siento " + nombreUsuario + ", debes ser premium para poder ver los detalles de ese usuario \n ;)");
}


function darLike(usuario){

    Swal.fire("Has dado like al usuario con id " + usuario + " te falta registrar el like y comprobar match" );


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

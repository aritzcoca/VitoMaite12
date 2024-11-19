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



//****************************************************************************** 
//*************************** MIS LIKES ****************************************
//****************************************************************************** 
document.getElementById("misLikesBtn").addEventListener('click', function () {
    console.log("mis likes");

    var contenedorLikes = document.getElementById("contenedorLikes");
    contenedorLikes.value = '';
    mostrarLikes();

}
);


function mostrarLikes() {

    var contenedorLikes = document.getElementById("contenedorLikes");
    contenedorLikes.innerHTML = "";

    var solicitud = indexedDB.open("vitomaitebd", 1);

    solicitud.onsuccess = function (evento) {
        var db = evento.target.result;
        var transaccion = db.transaction(["Likes"], "readonly");
        var visitasStore = transaccion.objectStore("Likes");
        var cursor = visitasStore.openCursor();

        var tienesLikes = false;
        var hayLikesEnTabla = false;
        var emailUsuario = sessionStorage.getItem('email');

        cursor.onsuccess = function (eventoCursor) {
            var resultado = eventoCursor.target.result;

            if (resultado) {
                hayLikesEnTabla = true; // Hay al menos una visita en la tabla

                var like = resultado.value;
                if (like.usuario2 === emailUsuario) {
                    tienesLikes = true;
                    agregarLikeALaInterfaz(like);
                }

                // Mover al siguiente registro
                resultado.continue();
            } else {
                // Cuando el cursor termina de recorrer la tabla
                if (!hayLikesEnTabla) {
                    Swal.fire("No hay visitas!");
                } else if (!tienesLikes) {
                    Swal.fire("No tienes likes a tu perfil!\n :/");
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

function agregarLikeALaInterfaz(like) {

    var contenedorLikes = document.getElementById("contenedorLikes");

    var tablaLikes = document.createElement("table");

    tablaLikes.className = "tabla-likes";

    // Crear la fila de la cabecera
    var filaCabecera = document.createElement("tr");

    // Crear celdas de la cabecera
    var fechaCabecera = document.createElement("th");
    fechaCabecera.textContent = "Fecha Like";

    var usuarioCabecera = document.createElement("th");
    usuarioCabecera.textContent = "Usuario";

    // Agregar celdas de la cabecera a la fila de la cabecera
    filaCabecera.appendChild(fechaCabecera);
    filaCabecera.appendChild(usuarioCabecera);

    //añades la cabecera
    tablaLikes.appendChild(filaCabecera);

    // Crear una fila para cada like
    var filaLike = document.createElement("tr");

    // Crear celdas para mostrar la información del artículo
    var fechaCelda = document.createElement("td");

    fechaStalking = extraerFecha(like.fecha);

    fechaCelda.textContent = fechaStalking;

    var usuarioCelda = document.createElement("td");

    emailUsuario = like.usuario1;

    obtenerInformacionUsuario(emailUsuario, function (usuario) {
        if (usuario) {
            //console.log("Información del usuario:", usuario);
            //************ CUIDAO *************
            nickStalcker = usuario.nombre; //AUN NO TENEMOS EL NICK!!!!
            //************ CUIDAO *************
            usuarioCelda.textContent = nickStalcker;


        } else {
            console.log("Usuario no encontrado o error al buscar.");
        }
    });

    var botonDetalles = document.createElement("button");
    // Agregar celdas a la fila del artículo
    filaLike.appendChild(fechaCelda);
    filaLike.appendChild(usuarioCelda);
    filaLike.appendChild(botonDetalles);

    botonDetalles.textContent = "Detalles";
    botonDetalles.addEventListener("click", function () {
        // Aquí debes agregar la lógica para borrar el artículo
        // Puedes llamar a una función de borrado pasando el ID o información necesaria
        //mostrarDetallesVisita(visita.id);
        mostrarDetallesLike(); //no te los va a enseñar
    });

    // Agregar la fila del artículo a la tabla
    tablaLikes.appendChild(filaLike);

    // Agregar la tabla al contenedor de artículos
    contenedorLikes.appendChild(tablaLikes);
}

function mostrarDetallesLike() {

    //no premium, tiene que redireccionar
    console.log("Mostrar los detalles de la visita...");
    var nombreUsuario = sessionStorage.getItem('nombre');
    Swal.fire("Lo siento " + nombreUsuario + ", debes ser premium para poder ver los detalles de ese usuario \n ;)");
}


//****************************************************************************** 
//****************************** BUSCAR ****************************************
//****************************************************************************** 
document.getElementById("buscarBtn").addEventListener('click', function () {

    window.location.href = 'Busqueda.html';
}
);

document.getElementById("editarPerfilBtn").addEventListener('click', function () {

    window.location.href = 'EditarPerfil.html';
}
);




//****************************************************************************** 
//************************** FORMATEAR FECHA y HORA*****************************
//****************************************************************************** 

//tiene que recibir la fecha en formato ISO
function formatearFecha(isoString) {
    // Extrae las partes de la fecha en formato ISO
    const [fecha, hora] = isoString.split('T');
    const [anio, mes, dia] = fecha.split('-');
    const [horas, minutos] = hora.split(':');

    // Formatea en el formato deseado, manteniendo la 'T'
    return `${dia}-${mes}-${anio}T${horas}:${minutos}`;

}

//****************************************************************************** 
//************************** EXTRAER FECHA *************************************
//****************************************************************************** 

function extraerFecha(fechaConHora) {
    // Separa la fecha y la hora en el punto 'T'
    const [fecha] = fechaConHora.split('T');

    // Retorna solo la parte de la fecha
    return fecha;
}


//****************************************************************************** 
//*************** OBTENER INFORMACION DE UN USUARIO CON SU EMAIL****************
//****************************************************************************** 

/*
 // Ejemplo de uso con callback
 obtenerInformacionUsuario("ruben@adsi.com", function(usuario) {
 if (usuario) {
 console.log("Información del usuario:", usuario);
 } else {
 console.log("Usuario no encontrado o error al buscar.");
 }
 });
 */

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

//******************************************************************************
//************************ CARGA DE LA PAGINA **********************************
//******************************************************************************

//AÑADIR EL EVENTO
document.addEventListener('DOMContentLoaded', function () {


// Verifica si el navegador soporta la API de Geolocalización
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
                function (position) {
                    // Posición obtenida exitosamente
                    console.log("Latitud:", position.coords.latitude);
                    console.log("Longitud:", position.coords.longitude);
                },
                function (error) {
                    // Manejo de errores
                    console.error("Error al obtener la geolocalización:", error.message);
                }
        );
    } else {
        console.error("La geolocalización no es compatible con este navegador.");
    }




    // Llamar a la función para abrir/crear la base de datos al cargar la página
    abrirBaseDeDatos();
});

//funcion asociada al evento
// Función para abrir o crear la base de datos
function abrirBaseDeDatos() {
    // Abrir o crear una base de datos llamada con versión 1
    var abrirBD = indexedDB.open("vitomaitebd", 1);

    // Manejar errores
    abrirBD.onerror = function (evento) {
        // MENSAJE PARA EL PROGRAMADOR
        console.error("Error al abrir la base de datos:", evento.target.error);
    };

    // Manejar éxito
    abrirBD.onsuccess = function (evento) {
        var db = evento.target.result;
        console.log("La base de datos 'maitevito' se ha abierto con éxito:", db);
    };

    // Configurar el comportamiento cuando se crea o se actualiza la base de datos
    abrirBD.onupgradeneeded = function (evento) {

        var db = evento.target.result;


        var aficionesStore = db.createObjectStore("Aficiones", {keyPath: "id", autoIncrement: true});
        aficionesStore.add({nombre: "Nadar"});
        aficionesStore.add({nombre: "Correr"});
        aficionesStore.add({nombre: "Leer"});
        aficionesStore.add({nombre: "Viajar"});
        aficionesStore.add({nombre: "Cocinar"});
        aficionesStore.add({nombre: "Hacer senderismo"});
        aficionesStore.add({nombre: "Fotografía"});
        aficionesStore.add({nombre: "Escuchar música"});
        aficionesStore.add({nombre: "Tocar un instrumento"});
        aficionesStore.add({nombre: "Jugar videojuegos"});
        aficionesStore.add({nombre: "Pintar"});
        aficionesStore.add({nombre: "Bailar bachata"});
        aficionesStore.add({nombre: "Hacer yoga"});
        aficionesStore.add({nombre: "Montar en bicicleta"});
        aficionesStore.add({nombre: "Practicar deportes de equipo"});



        aficionesStore.createIndex("nombre", "nombre", {unique: true});


        var aficionesUsuarioStore = db.createObjectStore("AficionesUsuarios", {keyPath: "id", autoIncrement: true});
        // Aficiones para Marcos
        aficionesUsuarioStore.add({email: "carlos@gmail.com", aficion: 1});
        aficionesUsuarioStore.add({email: "carlos@gmail.com", aficion: 2});
        aficionesUsuarioStore.add({email: "carlos@gmail.com", aficion: 3});
        aficionesUsuarioStore.add({email: "carlos@gmail.com", aficion: 4});
        aficionesUsuarioStore.add({email: "carlos@gmail.com", aficion: 5});
        aficionesUsuarioStore.add({email: "carlos@gmail.com", aficion: 6});
        aficionesUsuarioStore.add({email: "carlos@gmail.com", aficion: 7});
        aficionesUsuarioStore.add({email: "carlos@gmail.com", aficion: 8});
        aficionesUsuarioStore.add({email: "carlos@gmail.com", aficion: 9});
        aficionesUsuarioStore.add({email: "carlos@gmail.com", aficion: 10});
        aficionesUsuarioStore.add({email: "carlos@gmail.com", aficion: 11});
        aficionesUsuarioStore.add({email: "carlos@gmail.com", aficion: 12});
        aficionesUsuarioStore.add({email: "carlos@gmail.com", aficion: 13});
        aficionesUsuarioStore.add({email: "carlos@gmail.com", aficion: 14});
        aficionesUsuarioStore.add({email: "carlos@gmail.com", aficion: 15});


        // Aficiones para María
        aficionesUsuarioStore.add({email: "lucia@gmail.com", aficion: 4});
        aficionesUsuarioStore.add({email: "lucia@gmail.com", aficion: 5});
        aficionesUsuarioStore.add({email: "lucia@gmail.com", aficion: 6});

        // Aficiones para Javier
        aficionesUsuarioStore.add({email: "miguel@gmail.com", aficion: 7});
        aficionesUsuarioStore.add({email: "miguel@gmail.com", aficion: 8});
        aficionesUsuarioStore.add({email: "miguel@gmail.com", aficion: 9});

        // Aficiones para Carlos
        aficionesUsuarioStore.add({email: "elena@gmail.com", aficion: 10});
        aficionesUsuarioStore.add({email: "elena@gmail.com", aficion: 11});
        aficionesUsuarioStore.add({email: "elena@gmail.com", aficion: 12});

        // Aficiones para Lucía
        aficionesUsuarioStore.add({email: "antonio@gmail.com", aficion: 13});
        aficionesUsuarioStore.add({email: "antonio@gmail.com", aficion: 14});
        aficionesUsuarioStore.add({email: "antonio@gmail.com", aficion: 15});

        // Aficiones para Miguel
        aficionesUsuarioStore.add({email: "sofia@gmail.com", aficion: 1});
        aficionesUsuarioStore.add({email: "sofia@gmail.com", aficion: 3});
        aficionesUsuarioStore.add({email: "sofia@gmail.com", aficion: 4});

        // Aficiones para Elena
        aficionesUsuarioStore.add({email: "pablo@gmail.com", aficion: 5});
        aficionesUsuarioStore.add({email: "pablo@gmail.com", aficion: 6});
        aficionesUsuarioStore.add({email: "pablo@gmail.com", aficion: 7});

        // Aficiones para Antonio
        aficionesUsuarioStore.add({email: "ana@gmail.com", aficion: 8});
        aficionesUsuarioStore.add({email: "ana@gmail.com", aficion: 9});
        aficionesUsuarioStore.add({email: "ana@gmail.com", aficion: 10});

        // Aficiones para Sofía
        aficionesUsuarioStore.add({email: "hector@gmail.com", aficion: 11});
        aficionesUsuarioStore.add({email: "hector@gmail.com", aficion: 12});
        aficionesUsuarioStore.add({email: "hector@gmail.com", aficion: 13});

        // Aficiones para Pablo
        aficionesUsuarioStore.add({email: "clara@gmail.com", aficion: 14});
        aficionesUsuarioStore.add({email: "clara@gmail.com", aficion: 15});
        aficionesUsuarioStore.add({email: "clara@gmail.com", aficion: 1});

        // Aficiones para Ana
        aficionesUsuarioStore.add({email: "raul@gmail.com", aficion: 2});
        aficionesUsuarioStore.add({email: "raul@gmail.com", aficion: 3});
        aficionesUsuarioStore.add({email: "raul@gmail.com", aficion: 4});

        // Aficiones para Héctor
        aficionesUsuarioStore.add({email: "laura@gmail.com", aficion: 5});
        aficionesUsuarioStore.add({email: "laura@gmail.com", aficion: 6});
        aficionesUsuarioStore.add({email: "laura@gmail.com", aficion: 7});

       


        aficionesUsuarioStore.createIndex("email", "email", {unique: false});



        //*********** LIKES *************
        var likesStore = db.createObjectStore("Likes", {keyPath: "id", autoIncrement: true});

        //si quieres poder buscar por ese campo, pon un INDEX
        likesStore.createIndex("usuario1", "usuario1", {unique: false});
        likesStore.createIndex("usuario2", "usuario2", {unique: false});
        likesStore.createIndex("like", "like", {unique: false});

    
        //Likes mutuos
        likesStore.add({usuario1: "carlos@gmail.com", usuario2: "lucia@gmail.com", fecha: "03-11-2024T17:00", like: "1"});
        likesStore.add({usuario1: "lucia@gmail.com", usuario2: "carlos@gmail.com", fecha: "03-11-2024T17:05", like: "1"});
        likesStore.add({usuario1: "lucia@gmail.com", usuario2: "miguel@gmail.com", fecha: "03-11-2024T17:10", like: "1"});
        likesStore.add({usuario1: "miguel@gmail.com", usuario2: "lucia@gmail.com", fecha: "03-11-2024T17:15", like: "1"});
        likesStore.add({usuario1: "miguel@gmail.com", usuario2: "carlos@gmail.com", fecha: "03-11-2024T17:20", like: "1"});
        likesStore.add({usuario1: "carlos@gmail.com", usuario2: "miguel@gmail.com", fecha: "03-11-2024T17:25", like: "1"});


        //Likes de un solo sentido
        likesStore.add({usuario1: "elena@gmail.com", usuario2: "antonio@gmail.com", fecha: "03-11-2024T17:30", like: "1"});
        likesStore.add({usuario1: "antonio@gmail.com", usuario2: "sofia@gmail.com", fecha: "03-11-2024T17:35", like: "1"});
        likesStore.add({usuario1: "pablo@gmail.com", usuario2: "ana@gmail.com", fecha: "03-11-2024T17:40", like: "1"});
        likesStore.add({usuario1: "ana@gmail.com", usuario2: "hector@gmail.com", fecha: "03-11-2024T17:45", like: "1"});
        likesStore.add({usuario1: "hector@gmail.com", usuario2: "clara@gmail.com", fecha: "03-11-2024T17:50", like: "1"});
        likesStore.add({usuario1: "clara@gmail.com", usuario2: "raul@gmail.com", fecha: "03-11-2024T17:55", like: "1"});

        // Crear almacén de objetos para Usuarios
        var usuariosStore = db.createObjectStore("Usuarios", {keyPath: "id", autoIncrement: true});

        //la realidad es que solo con este indice seria suficiente, 
        //cuando hago otro tipo de busqueda no uso indices

        //haremos algunas usando index y otras no
        //por lo tanto dejo los indices en las posibles busquedas / filtros

        usuariosStore.createIndex("email", "email", {unique: true});
        usuariosStore.createIndex("nombre", "nombre", {unique: false});
        usuariosStore.createIndex("password", "password", {unique: false});
        usuariosStore.createIndex("foto", "foto", {unique: false});
        usuariosStore.createIndex("edad", "edad", {unique: false});
        usuariosStore.createIndex("genero", "genero", {unique: false});
        usuariosStore.createIndex("ciudad", "ciudad", {unique: false});

        console.log("Introduce los usuarios");
        
        usuariosStore.add(
                {nombre: "Carlos",
                    email: "carlos@gmail.com",
                    password: "1234",
                    edad: "30",
                    genero: "H",
                    altura: "180",
                    ciudad: "Bilbao",
                    foto: avatar01});

        usuariosStore.add(
                {nombre: "Lucía",
                    email: "lucia@gmail.com",
                    password: "1234",
                    edad: "25",
                    genero: "M",
                    altura: "170",
                    ciudad: "Donosti",
                    foto: avatar02});

        usuariosStore.add(
                {nombre: "Miguel",
                    email: "miguel@gmail.com",
                    password: "1234",
                    edad: "35",
                    genero: "H",
                    altura: "175",
                    ciudad: "Vitoria",
                    foto: ""});

        usuariosStore.add(
                {nombre: "Elena",
                    email: "elena@gmail.com",
                    password: "1234",
                    edad: "27",
                    genero: "M",
                    altura: "162",
                    ciudad: "Bilbao",
                    foto: ""});

        usuariosStore.add(
                {nombre: "Antonio",
                    email: "antonio@gmail.com",
                    password: "1234",
                    edad: "40",
                    genero: "H",
                    altura: "182",
                    ciudad: "Donosti",
                    foto: avatar03});

        usuariosStore.add(
                {nombre: "Sofía",
                    email: "sofia@gmail.com",
                    password: "1234",
                    edad: "22",
                    genero: "M",
                    altura: "168",
                    ciudad: "Vitoria",
                    foto: avatar04});

        usuariosStore.add(
                {nombre: "Pablo",
                    email: "pablo@gmail.com",
                    password: "1234",
                    edad: "29",
                    genero: "H",
                    altura: "177",
                    ciudad: "Bilbao",
                    foto: ""});

        usuariosStore.add(
                {nombre: "Ana",
                    email: "ana@gmail.com",
                    password: "1234",
                    edad: "32",
                    genero: "M",
                    altura: "164",
                    ciudad: "Donosti",
                    foto: ""});

        usuariosStore.add(
                {nombre: "Héctor",
                    email: "hector@gmail.com",
                    password: "1234",
                    edad: "26",
                    genero: "H",
                    altura: "183",
                    ciudad: "Vitoria",
                    foto: avatar05});

        usuariosStore.add(
                {nombre: "Clara",
                    email: "clara@gmail.com",
                    password: "1234",
                    edad: "48",
                    genero: "M",
                    altura: "160",
                    ciudad: "Bilbao",
                    foto: avatar06});

        usuariosStore.add(
                {nombre: "Raúl",
                    email: "raul@gmail.com",
                    password: "1234",
                    edad: "54",
                    genero: "H",
                    altura: "179",
                    ciudad: "Donosti",
                    foto: avatar07});

        usuariosStore.add(
                {nombre: "Laura",
                    email: "laura@gmail.com",
                    password: "1234",
                    edad: "64",
                    genero: "M",
                    altura: "166",
                    ciudad: "Vitoria",
                    foto: avatar08});

    };

}



//*******************************************************************
//********************* CLICK BOTON LOGIN ***************************
//*******************************************************************

document.getElementById("botonLogIn").addEventListener("click", iniciarSesion); 



function iniciarSesion() {
    
    sessionStorage.clear();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        // Abrir la base de datos
        var abrirBD = indexedDB.open("vitomaitebd", 1);

        abrirBD.onsuccess = function (evento) {
            var db = evento.target.result;

            // Iniciar una transacción en el almacén "Usuarios"
            var transaccion = db.transaction(["Usuarios"], "readonly");
            var usuariosStore = transaccion.objectStore("Usuarios");

            // Usar el índice "email" para buscar al usuario
            var indiceEmail = usuariosStore.index("email");
            var cursor = indiceEmail.get(email);

            cursor.onsuccess = function (eventoCursor) {
                var resultado = eventoCursor.target.result;

                // Verificar si se encontró un usuario con ese email
                if (resultado) {
                    // Verificar la contraseña
                    if (resultado.password === password) {
                        // Actualizar sessionStorage con la información más reciente del usuario
                        sessionStorage.setItem("email", resultado.email);
                        sessionStorage.setItem("nombre", resultado.nombre);
                        sessionStorage.setItem("edad", resultado.edad);
                        sessionStorage.setItem("genero", resultado.genero);
                        sessionStorage.setItem("ciudad", resultado.ciudad);

                        // Verificar si el usuario tiene una foto personalizada
                        if (resultado.foto && resultado.foto.startsWith("data:image")) {
                            sessionStorage.setItem("foto", resultado.foto);
                        } else {
                            // Si no tiene foto personalizada, cargar 'avatar01'
                            sessionStorage.setItem("foto", "ruta/a/avatar01.png");
                        }

                        // Redirigir a la página de inicio después de iniciar sesión
                        window.location.href = "logeado.html";
                    } else {
                        mostrarMensaje("Error: Credenciales incorrectas");
                    }
                } else {
                    mostrarMensaje("Error: Usuario no encontrado");
                }
            };

            cursor.onerror = function () {
                mostrarMensaje("Error al buscar el usuario en IndexedDB.");
            };
        };

        abrirBD.onerror = function () {
            mostrarMensaje("Error al abrir la base de datos.");
        };
    } else {
        mostrarMensaje("Error: El formato del email no es correcto");
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
function iniciarSesion()
{
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        // Abrir la base de datos
        var abrirBD = indexedDB.open("vitomaitebd", 1);

        abrirBD.onsuccess = function (evento) {

            var db = evento.target.result;

            // Iniciar una transacción en modo de solo lectura en el almacén de Usuarios
            var transaccion = db.transaction(["Usuarios"], "readonly");
            var usuariosStore = transaccion.objectStore("Usuarios");

            // Obtener el índice "email"
            var indiceEmail = usuariosStore.index("email");

            // Abrir un cursor en el índice para buscar el usuario por email

            //ACABAS DE BUSCAR EXACTAMENTE ESE EMAIL DEL FORMULARIO
            var cursor = indiceEmail.openCursor(IDBKeyRange.only(email));

            cursor.onsuccess = function (eventoCursor) {

                var resultado = eventoCursor.target.result;

                //tu email es clave en la tabla
                if (resultado) {
                    // Verificar la contraseña
                    //BD === FORMULARIO
                    if (resultado.value.password === password) {
                        // Almacenar información del usuario en sessionStorage
                        sessionStorage.setItem('email', resultado.value.email);
                        sessionStorage.setItem('nombre', resultado.value.nombre);
                        sessionStorage.setItem('edad', resultado.value.edad);
                        sessionStorage.setItem('genero', resultado.value.genero);
                        sessionStorage.setItem('ciudad', resultado.value.ciudad);
                        // Construir la ruta de la foto usando la carpeta "img" en la raíz
                        sessionStorage.setItem('foto', resultado.value.foto);



                        // info para redirigir a la página de bienvenida y pasar el nombre de usuario como parámetro


                        window.location.href = 'Logeado.html';


                    } else {
                        mostrarMensaje("Error: Credenciales incorrectas");
                    }
                } else {
                    mostrarMensaje("Error: Usuario no encontrado");
                }
            };
        };
    } else
    {
        mostrarMensaje("Error: El formato del email no es correcto");
    }
}
*/





// Función para mostrar mensajes
function mostrarMensaje(mensaje) {
    var mensajeDiv = document.getElementById("mensaje");
    mensajeDiv.innerHTML = mensaje;
}

//*******************************************************************
//********************* ENTER CAJA PASSWORD**************************
//*******************************************************************

document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar la caja de contraseña por su ID
    var passwordInput = document.getElementById('password');

    // Agregar un evento keydown a la caja de contraseña
    passwordInput.addEventListener('keydown', function (event) {
        // Verificar si la tecla presionada es "Enter" (código 13)
        if (event.key === 'Enter') {
            // Llamar a la función que manejará el evento de Enter
            iniciarSesion();
        }
    });
});


//*******************************************************************
//********************* CLICK BOTON BUSCAR USUARIOS******************
//*******************************************************************

document.getElementById("botonBuscarUsuarios").addEventListener("click", buscarUsuarios);

function buscarUsuarios()
{
    window.location.href = 'BusquedaNoRegistrado.html';
}







//******************************* IMAGENES EN BASE 64 **************************
avatar01 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFdmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI0LTExLTE4PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjE8L0F0dHJpYjpFeHRJZD4KICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L0F0dHJpYjpBZHM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOkNvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50PSdodHRwczovL2NhbnZhLmNvbS9leHBvcnQnPgogIDxDb250YWluc0FpR2VuZXJhdGVkQ29udGVudDpDb250YWluc0FpR2VuZXJhdGVkQ29udGVudD5ZZXM8L0NvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50OkNvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50PgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4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";
avatar02 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFdmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI0LTExLTE4PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjU8L0F0dHJpYjpFeHRJZD4KICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L0F0dHJpYjpBZHM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOkNvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50PSdodHRwczovL2NhbnZhLmNvbS9leHBvcnQnPgogIDxDb250YWluc0FpR2VuZXJhdGVkQ29udGVudDpDb250YWluc0FpR2VuZXJhdGVkQ29udGVudD5ZZXM8L0NvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50OkNvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50PgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4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";
avatar03 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFdmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI0LTExLTE4PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjI8L0F0dHJpYjpFeHRJZD4KICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L0F0dHJpYjpBZHM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOkNvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50PSdodHRwczovL2NhbnZhLmNvbS9leHBvcnQnPgogIDxDb250YWluc0FpR2VuZXJhdGVkQ29udGVudDpDb250YWluc0FpR2VuZXJhdGVkQ29udGVudD5ZZXM8L0NvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50OkNvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50PgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4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";
avatar04 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFdmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI0LTExLTE4PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjY8L0F0dHJpYjpFeHRJZD4KICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L0F0dHJpYjpBZHM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOkNvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50PSdodHRwczovL2NhbnZhLmNvbS9leHBvcnQnPgogIDxDb250YWluc0FpR2VuZXJhdGVkQ29udGVudDpDb250YWluc0FpR2VuZXJhdGVkQ29udGVudD5ZZXM8L0NvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50OkNvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50PgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4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";
avatar05 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFdmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI0LTExLTE4PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjM8L0F0dHJpYjpFeHRJZD4KICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L0F0dHJpYjpBZHM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOkNvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50PSdodHRwczovL2NhbnZhLmNvbS9leHBvcnQnPgogIDxDb250YWluc0FpR2VuZXJhdGVkQ29udGVudDpDb250YWluc0FpR2VuZXJhdGVkQ29udGVudD5ZZXM8L0NvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50OkNvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50PgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4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";
avatar06 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFdmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI0LTExLTE4PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjc8L0F0dHJpYjpFeHRJZD4KICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L0F0dHJpYjpBZHM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOkNvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50PSdodHRwczovL2NhbnZhLmNvbS9leHBvcnQnPgogIDxDb250YWluc0FpR2VuZXJhdGVkQ29udGVudDpDb250YWluc0FpR2VuZXJhdGVkQ29udGVudD5ZZXM8L0NvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50OkNvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50PgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4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";
avatar07 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFdmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI0LTExLTE4PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjQ8L0F0dHJpYjpFeHRJZD4KICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L0F0dHJpYjpBZHM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOkNvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50PSdodHRwczovL2NhbnZhLmNvbS9leHBvcnQnPgogIDxDb250YWluc0FpR2VuZXJhdGVkQ29udGVudDpDb250YWluc0FpR2VuZXJhdGVkQ29udGVudD5ZZXM8L0NvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50OkNvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50PgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4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";
avatar08 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFdmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI0LTExLTE4PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjg8L0F0dHJpYjpFeHRJZD4KICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L0F0dHJpYjpBZHM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOkNvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50PSdodHRwczovL2NhbnZhLmNvbS9leHBvcnQnPgogIDxDb250YWluc0FpR2VuZXJhdGVkQ29udGVudDpDb250YWluc0FpR2VuZXJhdGVkQ29udGVudD5ZZXM8L0NvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50OkNvbnRhaW5zQWlHZW5lcmF0ZWRDb250ZW50PgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4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";

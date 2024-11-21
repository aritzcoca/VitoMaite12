/////TODO LO DEL INICIO (añadir la foto, boton de cerrar sesion y boton de volver al inicio)

document.addEventListener('DOMContentLoaded', function () {
    // Mostrar mensaje de bienvenida
    
    var fotoUsuario = sessionStorage.getItem('foto');
    var fotoUsuarioElement = document.getElementById("fotoUsuario");


    if (fotoUsuarioElement && fotoUsuario) {
        fotoUsuarioElement.src = fotoUsuario;
    }
});

document.getElementById("volverAlInicioBtn").addEventListener('click', function () {
    
    window.location.href = 'logeado.html';
}
);

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
}
);

//////////////////////////////////////////////////////////////////////////////////////////////////
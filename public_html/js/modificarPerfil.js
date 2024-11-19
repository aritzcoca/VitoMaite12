
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


////////////////////////////CHAT////////////////////////////////////////////
//Cargar una nueva imagen y que se vea en pantalla
document.getElementById('fotoEquipo').addEventListener('change', function() {
    const inputFile = document.getElementById('fotoEquipo');
    const file = inputFile.files[0];

    if (file) {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (!validImageTypes.includes(file.type)) {
            alert('Por favor, sube un archivo de imagen válido (JPEG, PNG o GIF).');
            inputFile.value = ''; // Limpiar la selección si el archivo no es válido
            return;
        }

        // Mostrar la imagen en la pantalla
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imgElement.style.maxWidth = '300px'; // Ajusta el tamaño de la imagen como desees

            // Limpiar el contenedor y añadir la nueva imagen
            const container = document.getElementById('imageContainer');
            container.innerHTML = ''; // Limpiar contenido previo
            container.appendChild(imgElement);
        };

        reader.readAsDataURL(file);
    } else {
        alert('No se ha seleccionado ninguna imagen.');
    }
});
/*
document.getElementById('botonGuardarCambios').addEventListener('click', function() {
    // Obtener la foto de perfil actual del contenedor
    const imgElement = document.getElementById('imageContainer').querySelector('img');
    if (imgElement) {
        // Guardar la imagen en Base64 en sessionStorage
        const base64Photo = imgElement.src;
        sessionStorage.setItem('userProfilePhoto', base64Photo);

        // Guardar la imagen en IndexedDB
        saveToIndexedDB("vitomaitebd", "usuariosStore", { id: 'profilePhoto', photo: base64Photo });
    }
 
 */

/*     const updatedData = {
        foto: base64Photo, // Solo se incluirá si `imgElement` existe
        ciudad: cityValue  // Solo se incluirá si `selectedCity` está seleccionado
    };

function updateUserDataInIndexedDB(vitomaitebd, usuariosStore, updatedData) {
    // Obtener el userId (email) del sessionStorage
    const mailUsuario = sessionStorage.getItem('email'); // Asegúrate de que 'userEmail' esté almacenado en sessionStorage

    if (!mailUsuario) {
        console.error('No se encontró el userId en sessionStorage.');
        alert('Error: No se encontró el usuario. Inicie sesión de nuevo.');
        return;
    }

    const request = indexedDB.open(vitomaitebd, 1);

    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        const getRequest = store.get(userId);
        getRequest.onsuccess = function() {
            const userData = getRequest.result;

            if (userData) {
                // Actualizar los campos específicos
                if (updatedData.foto) {
                    userData.foto = updatedData.foto;
                }
                if (updatedData.ciudad) {
                    userData.ciudad = updatedData.ciudad;
                }

                // Guardar el registro actualizado
                store.put(userData);

                transaction.oncomplete = function() {
                    console.log('Datos actualizados exitosamente en IndexedDB.');
                    alert('Cambios guardados exitosamente.');
                };
                transaction.onerror = function() {
                    console.error('Error al actualizar los datos en IndexedDB.');
                };
            } else {
                console.error('Usuario no encontrado.');
                alert('Error: Usuario no encontrado.');
            }
        };

        getRequest.onerror = function() {
            console.error('Error al obtener los datos del usuario.');
        };
    };

    request.onerror = function() {
        console.error('Error al abrir la base de datos IndexedDB.');
    };
}

// Llamada a la función al hacer clic en el botón de guardar cambios
document.getElementById('botonGuardarCambios').addEventListener('click', function() {
    // Obtener la foto actual en Base64 desde el contenedor de imagen
    const imgElement = document.getElementById('imageContainer').querySelector('img');
    const base64Photo = imgElement ? imgElement.src : null;

    // Obtener la ciudad seleccionada
    const selectedCity = document.querySelector('input[name="ciudad"]:checked');
    const cityValue = selectedCity ? selectedCity.value : null;

    // Llamada a la función para actualizar la foto y la ciudad
    updateUserDataInIndexedDB('userDB', 'usuariosStore', {
        foto: base64Photo,
        ciudad: cityValue
    });
});


 */
/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


// Función para obtener aficiones de la base de datos y mostrarlas en un select múltiple
async function cargarAficiones() {
    try {
        // Llamada al servidor para obtener las aficiones
        const response = await fetch('/aficiones');
        if (!response.ok) {
            throw new Error('Error al obtener las aficiones');
        }
        const aficiones = await response.json();

        // Seleccionamos el elemento select del DOM
        const selectAficiones = document.getElementById('aficiones');

        // Limpiamos cualquier opción previa
        selectAficiones.innerHTML = '';

        // Iteramos sobre las aficiones y las agregamos como opciones
        aficiones.forEach(aficion => {
            const option = document.createElement('option');
            option.value = aficion;
            option.textContent = aficion;
            selectAficiones.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Llamamos a la función al cargar la página
window.onload = cargarAficiones;


// Seleccionamos los elementos del DOM
const counterDisplay = document.getElementById('counter');
const incrementBtn = document.getElementById('btn-increment');
const resetBtn = document.getElementById('btn-reset');

let count = 0;

// Escuchamos el evento click
incrementBtn.addEventListener('click', () => {
    count++;
    counterDisplay.textContent = count;
});

resetBtn.addEventListener('click', () => {
    count = 0;
    counterDisplay.textContent = count;
});
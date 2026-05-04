const input = document.getElementById('userInput');
const selector = document.getElementById('fontSelector');
const display = document.getElementById('resultDisplay');

function refresh() {
    display.textContent = input.value || "Введіть текст...";
    display.style.fontFamily = selector.value;
}

input.addEventListener('input', refresh);
selector.addEventListener('change', refresh);

function copyText() {
    navigator.clipboard.writeText(display.textContent).then(() => {
        alert('Скопійовано!');
    });
}

// Запуск при старті
window.onload = refresh;

const input = document.getElementById('userInput');
const selector = document.getElementById('fontSelector');
const display = document.getElementById('resultDisplay');
const aiSuggestion = document.getElementById('aiSuggestion');

// Логіка "ШІ" підбору
function runAISuggestion(text) {
    if (text.length === 0) {
        aiSuggestion.textContent = "Чекаю на ваш текст...";
        return;
    }

    if (text.length > 20) {
        aiSuggestion.textContent = "✨ Для довгих фраз краще 'Roboto'";
    } else if (text.includes("!") || text.length < 5) {
        aiSuggestion.textContent = "✨ Це виглядає енергійно! Спробуйте 'Pacifico'";
    } else if (/[a-zA-Z]/.test(text)) {
        aiSuggestion.textContent = "✨ Англійська мова? 'Lobster' підійде ідеально";
    } else {
        aiSuggestion.textContent = "✨ 'Елегантний' підкреслить цей стиль";
    }
}

function refresh() {
    display.textContent = input.value || "Hello World";
    display.style.fontFamily = selector.value;
    runAISuggestion(input.value);
}

// Блокування преміум-шрифтів (поки не оплачено)
selector.addEventListener('change', () => {
    const isPremiumActive = localStorage.getItem('premiumActive') === 'true';
    if (selector.options[selector.selectedIndex].text.includes('👑') && !isPremiumActive) {
        alert("Цей шрифт доступний лише у Premium версії!");
        selector.value = "'Roboto', sans-serif";
    }
    refresh();
});

input.addEventListener('input', refresh);
window.onload = refresh;

function copyText() {
    navigator.clipboard.writeText(display.textContent).then(() => {
        alert('Скопійовано!');
    });
}

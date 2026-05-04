const input = document.getElementById('userInput');
const selector = document.getElementById('fontSelector');
const display = document.getElementById('resultDisplay');
const aiSuggestion = document.getElementById('aiSuggestion');

// 1. ШІ-підбір шрифту
function runAISuggestion(text) {
    if (text.length === 0) {
        aiSuggestion.textContent = "Чекаю на ваш текст...";
        return;
    }
    if (text.length > 20) {
        aiSuggestion.textContent = "✨ Довга фраза? 'Roboto' буде найзручнішим.";
    } else if (text.includes("!") || text.length < 5) {
        aiSuggestion.textContent = "✨ Коротко і яскраво! 'Pacifico' додасть настрою.";
    } else if (/[a-zA-Z]/.test(text)) {
        aiSuggestion.textContent = "✨ Для англійської мови 'Lobster' — ідеальний вибір.";
    } else {
        aiSuggestion.textContent = "✨ Для цього тексту пасуватиме 'Елегантний'.";
    }
}

// 2. Оновлення дисплея
function refresh() {
    let text = input.value || "Hello World";
    display.textContent = text;
    display.style.fontFamily = selector.value;
    runAISuggestion(text);
}

// 3. Перевірка Premium та вибір шрифту
selector.addEventListener('change', () => {
    const isPremiumActive = localStorage.getItem('premiumActive') === 'true';
    if (selector.options[selector.selectedIndex].text.includes('👑') && !isPremiumActive) {
        alert("Цей стиль доступний лише у Premium версії!");
        selector.value = "'Roboto', sans-serif";
    }
    refresh();
});

// 4. Режим розробника (5 кліків на заголовок)
let clickCount = 0;
document.querySelector('h2').addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
        const isDev = localStorage.getItem('premiumActive') === 'true';
        if (!isDev) {
            localStorage.setItem('premiumActive', 'true');
            alert("🛠 Режим розробника: Premium активовано!");
        } else {
            localStorage.removeItem('premiumActive');
            alert("🛠 Режим розробника вимкнено.");
        }
        clickCount = 0;
        location.reload();
    }
    // Скидання лічильника через 2 секунди
    setTimeout(() => { clickCount = 0; }, 2000);
});

input.addEventListener('input', refresh);
window.onload = refresh;

// 5. Копіювання
function copyText() {
    navigator.clipboard.writeText(display.textContent).then(() => {
        alert('Текст скопійовано!');
    });
}

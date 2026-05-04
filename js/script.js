const input = document.getElementById('userInput');
const selector = document.getElementById('fontSelector');
const display = document.getElementById('resultDisplay');
const aiSuggestion = document.getElementById('aiSuggestion');
const aiToggle = document.getElementById('aiToggle');
const aiAssistantBlock = document.getElementById('aiAssistantBlock');

// Логіка підбору від ШІ
function runAISuggestion(text) {
    if (!aiToggle.checked) {
        aiSuggestion.textContent = "Помічник вимкнений";
        aiAssistantBlock.classList.add('ai-off');
        return;
    }
    
    aiAssistantBlock.classList.remove('ai-off');
    
    if (text.length === 0) {
        aiSuggestion.textContent = "Чекаю на ваш текст...";
        return;
    }

    if (text.length > 20) {
        aiSuggestion.textContent = "✨ Довга фраза? Звичайний шрифт буде найкращим.";
    } else if (text.includes("!") || text.length < 5) {
        aiSuggestion.textContent = "✨ Емоційно! 'Pacifico' додасть настрою.";
    } else if (/[a-zA-Z]/.test(text)) {
        aiSuggestion.textContent = "✨ Для латиниці ідеально підійде 'Lobster'.";
    } else {
        aiSuggestion.textContent = "✨ Спробуйте рукописний стиль для елегантності.";
    }
}

function refresh() {
    let text = input.value || "Hello World";
    display.textContent = text;
    display.style.fontFamily = selector.value;
    runAISuggestion(text);
}

// Події
input.addEventListener('input', refresh);
aiToggle.addEventListener('change', refresh);

selector.addEventListener('change', () => {
    const isPremiumActive = localStorage.getItem('premiumActive') === 'true';
    if (selector.options[selector.selectedIndex].text.includes('👑') && !isPremiumActive) {
        alert("Цей стиль доступний лише у Premium версії!");
        selector.value = "'Roboto', sans-serif";
    }
    refresh();
});

// Режим розробника (5 кліків на h2)
let clickCount = 0;
document.querySelector('h2').addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
        const isDev = localStorage.getItem('premiumActive') === 'true';
        localStorage.setItem('premiumActive', isDev ? 'false' : 'true');
        alert(isDev ? "🛠 Режим розробника вимкнено" : "🛠 Режим розробника активовано!");
        clickCount = 0;
        location.reload();
    }
    setTimeout(() => { clickCount = 0; }, 2000);
});

function copyText() {
    navigator.clipboard.writeText(display.textContent).then(() => {
        alert('Текст скопійовано!');
    });
}

window.onload = refresh;

const input = document.getElementById('userInput');
const selector = document.getElementById('fontSelector');
const display = document.getElementById('resultDisplay');
const aiSuggestion = document.getElementById('aiSuggestion');
const aiToggle = document.getElementById('aiToggle');
const aiAssistantBlock = document.getElementById('aiAssistantBlock');

// Перевірка статусу Premium
const isPremium = () => localStorage.getItem('premiumActive') === 'true';

function runAISuggestion(text) {
    if (!isPremium()) {
        aiSuggestion.textContent = "Функція доступна у Premium";
        aiToggle.checked = false;
        aiToggle.disabled = true;
        aiAssistantBlock.classList.add('ai-off');
        return;
    }

    aiToggle.disabled = false;
    
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
        aiSuggestion.textContent = "✨ Довга фраза? 'Roboto' буде найкращим.";
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

// Подія для кліку по заблокованому блоку ШІ
aiAssistantBlock.addEventListener('click', (e) => {
    if (!isPremium()) {
        alert("ШІ-помічник — це частина Premium доступу! Будь ласка, здійсніть оплату.");
    }
});

input.addEventListener('input', refresh);
aiToggle.addEventListener('change', refresh);

selector.addEventListener('change', () => {
    if (selector.options[selector.selectedIndex].text.includes('👑') && !isPremium()) {
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
        const active = isPremium();
        localStorage.setItem('premiumActive', active ? 'false' : 'true');
        alert(active ? "🛠 Premium вимкнено" : "🛠 Premium активовано!");
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

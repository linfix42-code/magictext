const input = document.getElementById('userInput');
const selector = document.getElementById('fontSelector');
const display = document.getElementById('resultDisplay');
const aiSuggestion = document.getElementById('aiSuggestion');
const aiToggle = document.getElementById('aiToggle');
const aiAssistantBlock = document.getElementById('aiAssistantBlock');

const isPremium = () => localStorage.getItem('premiumActive') === 'true';

// Карта символів для копіювання стилів (Unicode)
const unicodeMaps = {
    bold: { a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝", e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡", i: "𝐢", j: "𝐣", k: "𝐤", l: "𝐥", m: "𝐦", n: "𝐧", o: "𝐨", p: "𝐩", q: "𝐪", r: "𝐫", s: "𝐬", t: "𝐭", u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱", y: "𝐲", z: "𝐳" },
    italic: { a: "𝘢", b: "𝘣", c: "𝘤", d: "𝘥", e: "𝘦", f: "𝘧", g: "𝘨", h: "𝘩", i: "𝘪", j: "𝘫", k: "𝘬", l: "𝘭", m: "𝘮", n: "𝘯", o: "𝘰", p: "𝘱", q: "𝘲", r: "𝘳", s: "𝘴", t: "𝘵", u: "𝘶", v: "𝘷", w: "𝘸", x: "𝘹", y: "𝘺", z: "𝘻" },
    premium2: { a: "𝔞", b: "𝔟", c: "𝔠", d: "𝔡", e: "𝔢", f: "𝔣", g: "𝔤", h: "𝔥", i: "𝔦", j: "𝔧", k: "𝔨", l: "𝔩", m: "𝔪", n: "𝔫", o: "𝔬", p: "𝔭", q: "𝔮", r: "𝔯", s: "𝔰", t: "𝔱", u: "𝔲", v: "𝔳", w: "𝔴", x: "𝔵", y: "𝔶", z: "𝔷" }
};

function transformText(text, type) {
    if (!unicodeMaps[type]) return text;
    return text.split('').map(char => unicodeMaps[type][char.toLowerCase()] || char).join('');
}

function runAISuggestion(text) {
    if (!isPremium()) {
        aiSuggestion.textContent = "Функція доступна у Premium";
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
    aiSuggestion.textContent = text.length > 15 ? "✨ Спробуйте 'Bold' для акценту" : "✨ 'Italic' додасть витонченості";
}

function refresh() {
    let text = input.value || "Hello World";
    const style = selector.value;
    
    // Застосовуємо трансформацію Unicode
    display.textContent = transformText(text, style);
    
    // Візуальні стилі для прев'ю
    const fontFamilies = {
        script: "'Dancing Script', cursive",
        premium1: "'Caveat', cursive",
        normal: "'Roboto', sans-serif"
    };
    display.style.fontFamily = fontFamilies[style] || "'Roboto', sans-serif";
    runAISuggestion(text);
}

aiAssistantBlock.addEventListener('click', () => {
    if (!isPremium()) alert("ШІ-помічник — це частина Premium доступу!");
});

selector.addEventListener('change', () => {
    if (selector.value.includes('premium') && !isPremium()) {
        alert("Цей стиль доступний лише у Premium версії!");
        selector.value = "normal";
    }
    refresh();
});

input.addEventListener('input', refresh);
aiToggle.addEventListener('change', refresh);

// Режим розробника
document.querySelector('h2').addEventListener('click', () => {
    window.devClicks = (window.devClicks || 0) + 1;
    if (window.devClicks === 5) {
        const active = isPremium();
        localStorage.setItem('premiumActive', active ? 'false' : 'true');
        alert(active ? "🛠 Premium вимкнено" : "🛠 Premium активовано!");
        location.reload();
    }
});

function copyText() {
    navigator.clipboard.writeText(display.textContent).then(() => alert('Стилізований текст скопійовано!'));
}

window.onload = refresh;

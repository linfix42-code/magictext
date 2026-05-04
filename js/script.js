const input = document.getElementById('userInput');
const selector = document.getElementById('fontSelector');
const display = document.getElementById('resultDisplay');
const aiSuggestion = document.getElementById('aiSuggestion');
const aiToggle = document.getElementById('aiToggle');
const aiAssistantBlock = document.getElementById('aiAssistantBlock');

// Карта Unicode-символів (тільки латиниця, бо кирилиця не має таких стандартів)
const unicodeMaps = {
    bold: {
        a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝", e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡", i: "𝐢", j: "𝐣", k: "𝐤", l: "𝐥", m: "𝐦", n: "𝐧", o: "𝐨", p: "𝐩", q: "𝐪", r: "𝐫", s: "𝐬", t: "𝐭", u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱", y: "𝐲", z: "𝐳",
        A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃", E: "𝐄", F: "𝐅", G: "𝐆", H: "𝐇", I: "𝐈", J: "𝐉", K: "𝐊", L: "𝐋", M: "𝐌", N: "𝐍", O: "𝐎", P: "𝐏", Q: "𝐐", R: "𝐑", S: "𝐒", T: "𝐓", U: "𝐔", V: "𝐕", W: "𝐖", X: "𝐗", Y: "𝐘", Z: "𝐙"
    },
    italic: {
        a: "𝘢", b: "𝘣", c: "𝘤", d: "𝘥", e: "𝘦", f: "𝘧", g: "𝘨", h: "𝘩", i: "𝘪", j: "𝘫", k: "𝘬", l: "𝘭", m: "𝘮", n: "𝘯", o: "𝘰", p: "𝘱", q: "𝘲", r: "𝘳", s: "𝘴", t: "𝘵", u: "𝘶", v: "𝘷", w: "𝘸", x: "𝘹", y: "𝘺", z: "𝘻",
        A: "𝘈", B: "𝘉", C: "𝘊", D: "𝘋", E: "𝘌", F: "𝘍", G: "𝘎", H: "𝘏", I: "𝘐", J: "𝘑", K: "𝘒", L: "𝘓", M: "𝘔", N: "𝘕", O: "𝘖", P: "𝘗", Q: "𝘘", R: "𝘙", S: "𝘚", T: "𝘛", U: "𝘜", V: "𝘝", W: "𝘞", X: "𝘟", Y: "𝘠", Z: "𝘡"
    },
    premium2: {
        a: "𝔞", b: "𝔟", c: "𝔠", d: "𝔡", e: "𝔢", f: "𝔣", g: "𝔤", h: "𝔥", i: "𝔦", j: "𝔧", k: "𝔨", l: "𝔩", m: "𝔪", n: "𝔫", o: "𝔬", p: "𝔭", q: "𝔮", r: "𝔯", s: "𝔰", t: "𝔱", u: "𝔲", v: "𝔳", w: "𝔴", x: "𝔵", y: "𝔶", z: "𝔷",
        A: "𝔄", B: "𝔅", C: "ℭ", D: "𝔇", E: "𝔈", F: "𝔉", G: "𝔊", H: "ℌ", I: "ℑ", J: "𝔍", K: "𝔎", L: "𝔏", M: "𝔐", N: "𝔑", O: "𝔒", P: "𝔓", Q: "𝔔", R: "ℜ", S: "𝔖", T: "𝔗", U: "𝔘", V: "𝔙", W: "𝔚", X: "𝔛", Y: "𝔜", Z: "ℨ"
    }
};

const isPremium = () => localStorage.getItem('premiumActive') === 'true';

function transformText(text, type) {
    if (!unicodeMaps[type]) return text;
    return text.split('').map(char => unicodeMaps[type][char] || char).join('');
}

function runAISuggestion(text) {
    if (!isPremium()) {
        aiSuggestion.textContent = "Функція доступна у Premium";
        aiToggle.disabled = true;
        aiToggle.checked = false;
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
    aiSuggestion.textContent = text.length > 10 ? "✨ Гарний вибір для довгих фраз!" : "✨ Цей стиль виглядає дуже стильно!";
}

function refresh() {
    const text = input.value || "Hello World";
    const style = selector.value;
    
    // ПРЯМА ЗАМІНА ТЕКСТУ В БЛОЦІ
    display.textContent = transformText(text, style);
    
    // Візуальні шрифти (Google Fonts)
    const fonts = {
        script: "'Dancing Script', cursive",
        premium1: "'Caveat', cursive",
        normal: "'Roboto', sans-serif"
    };
    display.style.fontFamily = fonts[style] || "'Roboto', sans-serif";
    
    runAISuggestion(text);
}

// Події
input.addEventListener('input', refresh);
aiToggle.addEventListener('change', refresh);
selector.addEventListener('change', () => {
    if (selector.value.includes('premium') && !isPremium()) {
        alert("Потрібен Premium!");
        selector.value = "normal";
    }
    refresh();
});

// Клік по блоку ШІ
aiAssistantBlock.addEventListener('click', (e) => {
    if (!isPremium() && e.target !== aiToggle) {
        alert("Активуйте Premium через режим розробника (5 кліків на заголовок)");
    }
});

// Режим розробника
document.querySelector('h2').addEventListener('click', () => {
    window.clicks = (window.clicks || 0) + 1;
    if (window.clicks === 5) {
        const active = isPremium();
        localStorage.setItem('premiumActive', !active);
        alert(!active ? "✅ Premium активовано!" : "❌ Premium вимкнено");
        location.reload();
    }
});

// ФУНКЦІЯ КОПІЮВАННЯ (Бере текст вже з заміненими символами)
function copyText() {
    const textToCopy = display.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert(`Скопійовано: ${textToCopy}`);
    }).catch(err => {
        console.error('Помилка копіювання:', err);
    });
}

window.onload = refresh;

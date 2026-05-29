// ==========================================================================
// 1. СТАТУСИ ДОСТУПУ ТА БАЗА ПРОМОКОДІВ
// ==========================================================================
let hasAllPremium = false;   // Повний доступ (100 грн)
let hasPremiumFonts = false; // Тільки шрифти (40 грн)
let hasPremiumDesign = false; // Тільки оформлення (30 грн)

// Твої секретні коди, які видаватиме Telegram-бот після оплати на картку
const CODES = {
    allAccess: "MAX_PRO_999",      
    fontsOnly: "FONTS_SHERIFF_77",  
    designOnly: "COOL_LOOK_2026"    
};

// ==========================================================================
// 2. СПИСОК ШРИФТІВ (Звичайні та Преміум із коронами)
// ==========================================================================
const fontStyles = [
    { id: "Bold", name: "Bold Text", isPremium: false, transform: (t) => t },
    { id: "Italic", name: "Italic Text", isPremium: false, transform: (t) => t },
    { id: "Gothic", name: "Gothic Style", isPremium: true, transform: (t) => toGothic(t) },
    { id: "Cursive", name: "Cursive Style", isPremium: true, transform: (t) => toCursive(t) },
    { id: "Boxed", name: "Boxed Text", isPremium: false, transform: (t) => toBoxed(t) },
    { id: "Circle", name: "Circle Text", isPremium: false, transform: (t) => toCircle(t) },
    { id: "Magic", name: "Magic Style", isPremium: true, transform: (t) => toMagic(t) }
];

// ==========================================================================
// 3. ФУНКЦІЇ МАТЕМАТИЧНОЇ ТРАНСФОРМАЦІЇ ЮНІКОДУ
// ==========================================================================
function toGothic(text) {
    const normal = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const gothic = "𝔞𝔟𝔔𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅𝔖𝔇𝔈𝔉𝔊𝔏𝔓𝔍𝔎𝔏𝔐𝔒𝔒𝔔𝔔𝔖𝔖𝔗𝔘𝔜𝔔𝔛𝔜𝔖";
    return text.split('').map(c => { const i = normal.indexOf(c); return i > -1 ? gothic[i] : c; }).join('');
}

function toCursive(text) {
    const normal = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const cursive = "𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓳𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹 get𝓿𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗滨𝓙𝓚𝓛𝓜𝓝𝓓𝓟𝓤𝓡𝓢𝓣𝓤𝓥𝓦 hearty𝓨𝓩";
    return text.split('').map(c => { const i = normal.indexOf(c); return i > -1 ? cursive[i] : c; }).join('');
}

function toBoxed(text) {
    const normal = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const boxed = "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉";
    return text.split('').map(c => { const i = normal.indexOf(c); return i > -1 ? boxed[i] : c; }).join('');
}

function toCircle(text) {
    const normal = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const circle = "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⒶⒷⒸⒹⒺⒻcontentsⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ";
    return text.split('').map(c => { const i = normal.indexOf(c); return i > -1 ? circle[i] : c; }).join('');
}

function toMagic(text) {
    const normal = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const magic = "卂乃匚刀乇下g卄丨ﾌKㄥ爪几ㄖ卩Ҝ尺丂ㄒㄩᐯ山乂ㄚ乙卂乃匚刀乇下g卄丨体Kㄥ爪几ㄖ卩Ҝ尺丂ㄒㄩᐯ山乂ㄚ乙";
    return text.split('').map(c => { const i = normal.indexOf(c); return i > -1 ? magic[i] : c; }).join('');
}

// ==========================================================================
// 4. ГЕНЕРАЦІЯ СМУЖОК ШРИФТІВ ТА КНОПОК "COPY"
// ==========================================================================
const inputField = document.getElementById('main-input');
const container = document.getElementById('fonts-container');

function updateFonts() {
    const text = inputField.value || "Hello World";
    container.innerHTML = ""; // Очищення перед оновленням

    fontStyles.forEach(font => {
        const fontCard = document.createElement('div');
        fontCard.className = 'font-row-card';
        
        const transformedText = font.transform(text);
        const crown = font.isPremium ? ' <span style="color:#ffd700">👑</span>' : '';
        
        fontCard.innerHTML = `
            <div class="font-row-id">${font.id}${crown}</div>
            <div class="font-row-body">
                <div class="font-row-text">${transformedText}</div>
                <button class="copy-btn">📋 Copy</button>
            </div>
        `;
        
        // Логіка кліку на кнопку Copy
        fontCard.querySelector('.copy-btn').addEventListener('click', () => {
            if (font.isPremium && !hasPremiumFonts) {
                const goPay = confirm("👑 Цей шрифт доступний лише у PRO-версії. Перейти до нашого Telegram-бота для покупки коду?");
                if (goPay) {
                    window.open("https://t.me/YOUR_BOT_USERNAME?start=fonts", "_blank");
                }
            } else {
                navigator.clipboard.writeText(transformedText);
                alert(`✨ Скопійовано: ${transformedText}`);
            }
        });

        container.appendChild(fontCard);
    });
}

// Функція для кліків по швидких тегах під текстовим полем
function setQuickText(text) {
    inputField.value = text;
    updateFonts();
}

inputField.addEventListener('input', updateFonts);

// ==========================================================================
// 5. ОБРОБКА ТА АКТИВАЦІЯ ПРОМОКОДІВ
// ==========================================================================
document.getElementById('activate-btn').addEventListener('click', () => {
    const userInput = document.getElementById('promo-input').value.trim();
    
    if (userInput === CODES.allAccess) {
        localStorage.setItem('hasAllPremium', 'true');
        localStorage.setItem('hasPremiumFonts', 'true');
        localStorage.setItem('hasPremiumDesign', 'true');
        alert("👑 Мега-Преміум активовано назавжди! Доступно все оформлення та всі шрифти.");
        location.reload();
    } 
    else if (userInput === CODES.fontsOnly) {
        localStorage.setItem('hasPremiumFonts', 'true');
        alert("✨ Преміум шрифти успішно розблоковано!");
        location.reload();
    } 
    else if (userInput === CODES.designOnly) {
        localStorage.setItem('hasPremiumDesign', 'true');
        alert("🎨 VIP Оформлення сайту активовано!");
        location.reload();
    } 
    else {
        alert("❌ Невірний промокод. Спробуй ще раз або купи код у бота.");
    }
});

function checkSavedAccess() {
    if (localStorage.getItem('hasAllPremium') === 'true') {
        hasAllPremium = true; hasPremiumFonts = true; hasPremiumDesign = true;
    }
    if (localStorage.getItem('hasPremiumFonts') === 'true') hasPremiumFonts = true;
    if (localStorage.getItem('hasPremiumDesign') === 'true') hasPremiumDesign = true;

    // Вмикаємо преміум VIP-тему, якщо активовано код оформлення
    if (hasPremiumDesign) {
        document.body.classList.add('vip-theme');
    }
}

// Секретний режим розробника (5 кліків на напис "Text Generator")
let devClicks = 0;
document.getElementById('dev-trigger').addEventListener('click', () => {
    devClicks++;
    if (devClicks === 5) {
        localStorage.setItem('hasAllPremium', 'true');
        localStorage.setItem('hasPremiumFonts', 'true');
        localStorage.setItem('hasPremiumDesign', 'true');
        alert("🛠️ Режим розробника активовано! Всі VIP функції сайту розблоковано безкоштовно.");
        location.reload();
    }
});

// Запуск при завантаженні сторінки
checkSavedAccess();
updateFonts();

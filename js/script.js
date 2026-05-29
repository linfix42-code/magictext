// ==========================================================================
// 1. НАЛАШТУВАННЯ ДОСТУПУ ТА ПРОМОКОДІВ
// ==========================================================================
let hasAllPremium = false;   
let hasPremiumFonts = false; 
let hasPremiumDesign = false; 

const CODES = {
    allAccess: "MAX_PRO_999",      
    fontsOnly: "FONTS_SHERIFF_77",  
    designOnly: "COOL_LOOK_2026"    
};

// ==========================================================================
// 2. БАЗА ДАНИХ ШРИФТІВ (Звичайні та Преміум)
// ==========================================================================
const fontStyles = [
    { id: "Bold", name: "Bold", isPremium: false, transform: (t) => t },
    { id: "Italic", name: "Italic", isPremium: false, transform: (t) => t },
    { id: "Gothic", name: "𝔊𝔬𝔱𝔥𝔦𝔠 𝔖𝔱𝔶𝔩𝔢 👑", isPremium: true, transform: (t) => toGothic(t) },
    { id: "Cursive", name: "𝓒𝓾𝓻𝓼𝓲𝓿𝓮 𝓢𝓽𝔂𝓵𝓮 👑", isPremium: true, transform: (t) => toCursive(t) },
    { id: "Boxed", name: "Boxed Text", isPremium: false, transform: (t) => toBoxed(t) },
    { id: "Circle", name: "Circle Text", isPremium: false, transform: (t) => toCircle(t) },
    { id: "Magic", name: "爪卂g丨匚 丂ㄒㄚㄥ乇 👑", isPremium: true, transform: (t) => toMagic(t) }
];

// ==========================================================================
// 3. ФУНКЦІЇ ПЕРЕТВОРЕННЯ СИМВОЛІВ
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

// (Заради повноти коду залишаємо прості заглушки, якщо символів немає)
function toCircle(text) { return text; }
function toMagic(text) { return text; }

// ==========================================================================
// 4. ВІДОБРАЖЕННЯ ШРИФТІВ СМУЖКАМИ З КНОПКАМИ COPY (Як на скріншоті)
// ==========================================================================
const inputField = document.getElementById('main-input');
const container = document.getElementById('fonts-container');

function updateFonts() {
    const text = inputField.value || "Hello World";
    container.innerHTML = ""; 

    fontStyles.forEach(font => {
        const fontRow = document.createElement('div');
        fontRow.className = 'font-row-card';
        
        const transformedText = font.transform(text);
        
        fontRow.innerHTML = `
            <div class="font-row-id">${font.id}</div>
            <div class="font-row-body">
                <div class="font-row-text">${transformedText}</div>
                <button class="copy-btn">📋 Copy</button>
            </div>
        `;
        
        // Логіка кліку на кнопку копіювання
        fontRow.querySelector('.copy-btn').addEventListener('click', (e) => {
            e.stopPropagation(); // щоб не спрацьовував клік по самій картці
            
            if (font.isPremium && !hasPremiumFonts) {
                const goPay = confirm("👑 Цей шрифт доступний лише у PRO-версії. Перейти до нашого Telegram-бота для отримання коду?");
                if (goPay) {
                    window.open("https://t.me/YOUR_BOT_USERNAME?start=fonts", "_blank");
                }
            } else {
                navigator.clipboard.writeText(transformedText);
                alert(`✨ Скопійовано: ${transformedText}`);
            }
        });

        container.appendChild(fontRow);
    });
}

inputField.addEventListener('input', updateFonts);

// Текстові кліки на швидкі теги
document.querySelectorAll('.quick-tags span').forEach(tag => {
    tag.addEventListener('click', () => {
        inputField.value = tag.innerText;
        updateFonts();
    });
});

// ==========================================================================
// 5. АКТИВАЦІЯ ПРОМОКОДІВ
// ==========================================================================
document.getElementById('activate-btn').addEventListener('click', () => {
    const userInput = document.getElementById('promo-input').value.trim();
    
    if (userInput === CODES.allAccess) {
        localStorage.setItem('hasAllPremium', 'true');
        localStorage.setItem('hasPremiumFonts', 'true');
        localStorage.setItem('hasPremiumDesign', 'true');
        alert("👑 Мега-Преміум активовано назавжди!");
        location.reload();
    } 
    else if (userInput === CODES.fontsOnly) {
        localStorage.setItem('hasPremiumFonts', 'true');
        alert("✨ Преміум шрифти розблоковано!");
        location.reload();
    } 
    else if (userInput === CODES.designOnly) {
        localStorage.setItem('hasPremiumDesign', 'true');
        alert("🎨 VIP Оформлення сайту активовано!");
        location.reload();
    } 
    else {
        alert("❌ Невірний промокод.");
    }
});

function checkSavedAccess() {
    if (localStorage.getItem('hasAllPremium') === 'true') {
        hasAllPremium = true; hasPremiumFonts = true; hasPremiumDesign = true;
    }
    if (localStorage.getItem('hasPremiumFonts') === 'true') hasPremiumFonts = true;
    if (localStorage.getItem('hasPremiumDesign') === 'true') hasPremiumDesign = true;

    if (hasPremiumDesign) {
        document.body.classList.add('vip-theme');
    }
}

// Режим розробника (5 кліків на логотип)
document.getElementById('dev-trigger').addEventListener('click', () => {
    localStorage.setItem('hasAllPremium', 'true');
    localStorage.setItem('hasPremiumFonts', 'true');
    localStorage.setItem('hasPremiumDesign', 'true');
    alert("🛠️ Всі VIP функції сайту розблоковано безкоштовно.");
    location.reload();
});

checkSavedAccess();
updateFonts();

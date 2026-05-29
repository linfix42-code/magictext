// ==========================================================================
// 1. НАЛАШТУВАННЯ ДОСТУПУ ТА ПРОМОКОДІВ
// ==========================================================================

let hasAllPremium = false;   // Повний доступ (100 грн)
let hasPremiumFonts = false; // Тільки шрифти (40 грн)
let hasPremiumDesign = false; // Тільки оформлення (30 грн)

// Твої секретні коди, які видаватиме Telegram-бот після оплати на дитячу картку
const CODES = {
    allAccess: "MAX_PRO_999",      // Код для всього разом
    fontsOnly: "FONTS_SHERIFF_77",  // Код тільки для шрифтів
    designOnly: "COOL_LOOK_2026"    // Код тільки для дизайну
};

// ==========================================================================
// 2. БАЗА ДАНИХ ШРИФТІВ (Звичайні та Преміум)
// ==========================================================================
const fontStyles = [
    { name: "Normal Text", isPremium: false, transform: (t) => t },
    { name: "𝔊𝔬𝔱𝔥𝔦𝔠 𝔖𝔱𝔶𝔩𝔢", isPremium: true, transform: (t) => toGothic(t) },
    { name: "𝓒𝓾𝓻𝓼𝓲𝓿𝓮 𝓢𝓽𝔂𝓵𝓮", isPremium: true, transform: (t) => toCursive(t) },
    { name: "🄱🄾🅇🄴🄳 🅃🄴 downtime🅃", isPremium: false, transform: (t) => toBoxed(t) },
    { name: "Ⓢⓘⓡⓒⓛⓔ Ⓣⓔⓧⓣ", isPremium: false, transform: (t) => toCircle(t) },
    { name: "爪卂g丨匚 丂ㄒㄚㄥ乇", isPremium: true, transform: (t) => toMagic(t) }
];

// ==========================================================================
// 3. ФУНКЦІЇ ПЕРЕТВОРЕННЯ СИМВОЛІВ (ЮНІКОД МАГІЯ)
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
// 4. ГЕНЕРАЦІЯ СПИСКУ НА СТОРІНЦІ ТА ОНОВЛЕННЯ LIVE PREVIEW
// ==========================================================================
const inputField = document.getElementById('main-input');
const container = document.getElementById('fonts-container');

function updateFonts() {
    const text = inputField.value || "Hello World";
    container.innerHTML = ""; // Очищаємо перед рендером

    fontStyles.forEach(font => {
        const item = document.createElement('div');
        item.className = 'font-item';
        
        // Генеруємо текст стилю
        const transformedText = font.transform(text);
        
        // Створюємо HTML структуру. Якщо шрифт преміум — додаємо корону 👑
        const crownHTML = font.isPremium ? ' <span class="crown">👑</span>' : '';
        item.innerHTML = `
            <div class="font-name">${font.name}${crownHTML}</div>
            <div class="font-preview">${transformedText}</div>
        `;
        
        // Клік на елемент (Копіювання або блокування)
        item.addEventListener('click', () => {
            if (font.isPremium && !hasPremiumFonts) {
                const goPay = confirm("👑 Цей шрифт доступний лише у PRO-версії. Перейти до нашого Telegram-бота для покупки коду?");
                if (goPay) {
                    window.open("https://t.me/YOUR_BOT_USERNAME?start=fonts", "_blank");
                }
            } else {
                navigator.clipboard.writeText(transformedText);
                alert(

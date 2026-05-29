// --- БЛОК ЛОГІКИ ПРОМОКОДІВ ТА VIP ТЕМИ ---
document.addEventListener("DOMContentLoaded", () => {
    // Шукаємо картку введення тексту, щоб вставити блок промокодів відразу під нею
    const mainCard = document.querySelector('.main-card');
    if (mainCard && !document.getElementById('promo-box')) {
        const promoHTML = `
            <div id="promo-box" style="background: #ffffff; border: 2px dashed #1abc9c; border-radius: 16px; padding: 20px; margin-top: 25px; margin-bottom: 5px; box-shadow: 0 4px 15px rgba(0,0,0,0.01);">
                <div style="font-size: 16px; font-weight: bold; color: #117a65; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">👑 Активація PRO-доступу</div>
                <div style="font-size: 13px; color: #7f8c8d; margin-bottom: 15px;">Введи секретний промокод від нашого Telegram-бота, щоб розблокувати VIP-функції сайту:</div>
                <div style="display: flex; gap: 10px;">
                    <input type="text" id="promo-input" placeholder="Введи свій PRO-код тут..." style="flex: 1; padding: 12px 15px; border: 1px solid #d1f2eb; border-radius: 10px; outline: none; font-size: 14px; background: #fcfdfd;">
                    <button id="activate-btn" style="background: #1abc9c; color: white; border: none; padding: 0 22px; border-radius: 10px; cursor: pointer; font-weight: bold; font-size: 14px; transition: background 0.2s;">Активувати 👑</button>
                </div>
            </div>
        `;
        mainCard.insertAdjacentHTML('afterend', promoHTML);

        // Обробник натискання кнопки активації
        document.getElementById('activate-btn').addEventListener('click', () => {
            const input = document.getElementById('promo-input').value.trim();
            if (input === "MAX_PRO_999") {
                localStorage.setItem('vip_design', 'true');
                alert("👑 Повний Мега-PRO доступ активовано назавжди!");
                location.reload();
            } else if (input === "COOL_LOOK_2026") {
                localStorage.setItem('vip_design', 'true');
                alert("🎨 VIP-оформлення та темну тему сайту активовано!");
                location.reload();
            } else {
                alert("❌ Невірний промокод. Спробуй ще раз.");
            }
        });
    }

    // Стилі для VIP-теми (якщо активовано код)
    if (localStorage.getItem('vip_design') === 'true') {
        const style = document.createElement('style');
        style.innerHTML = `
            body { background-color: #0f172a !important; color: #f1f5f9 !important; }
            .main-card, .font-row-card, .pro-tips-card, #promo-box { background: #1e293b !important; border-color: #334155 !important; color: #ffffff !important; }
            textarea { background: #0f172a !important; color: #ffffff !important; border-color: #475569 !important; }
            #activate-btn, .copy-btn { background: #f59e0b !important; color: #1e1b4b !important; }
            #activate-btn:hover, .copy-btn:hover { background: #d97706 !important; }
            .quick-tags span { background: #334155 !important; color: #ffffff !important; border-color: #475569 !important; }
        `;
        document.head.appendChild(style);
    }
});

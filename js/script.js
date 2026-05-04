function copyText() {
    const range = document.createRange();
    range.selectNode(display); // Вибираємо блок із результатом
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    
    try {
        document.execCommand('copy'); // Копіюємо разом із форматуванням
        alert('Текст скопійовано зі стилем!');
    } catch (err) {
        alert('Не вдалося скопіювати стилізований текст');
    }
    window.getSelection().removeAllRanges();
}

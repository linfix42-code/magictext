function copyText() {
    const resultBox = document.getElementById('resultDisplay');
    
    // Створюємо тимчасовий елемент, щоб скопіювати його як "форматований текст"
    const type = 'text/html';
    const blob = new Blob([resultBox.outerHTML], { type });
    const data = [new ClipboardItem({ [type]: blob })];

    navigator.clipboard.write(data).then(() => {
        alert('Скопійовано! Спробуй вставити у Word (Ctrl+V).');
    }).catch(err => {
        // Якщо складний метод не спрацював, копіюємо як звичайний текст
        navigator.clipboard.writeText(resultBox.textContent);
        alert('Скопійовано як звичайний текст.');
    });
}

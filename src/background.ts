let popupWindowId: number | undefined;

  // Создаем новое окно
chrome.windows.create({
    url: chrome.runtime.getURL('/src/popup/index.html'),
    type: 'panel', 
    width: 350,
    height: 600,
    left: 100,
    top: 100
});

console.log('Путь:', chrome.runtime.getURL('index.html'));
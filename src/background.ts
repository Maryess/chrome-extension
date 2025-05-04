let popupWindowId: number | undefined;

chrome.action.onClicked.addListener(async () => {
  // Если окно уже существует - фокусируем его
  if (popupWindowId) {
    try {
      await chrome.windows.update(popupWindowId, { focused: true });
      return;
    } catch {
      popupWindowId = undefined;
    }
  }

  // Создаем новое окно
  const window = await chrome.windows.create({
    url: chrome.runtime.getURL('index.html'),
    type: 'panel', // Ключевой параметр!
    width: 350,
    height: 600,
    left: 100,
    top: 100
  });

  popupWindowId = window.id;
});

console.log('Путь:', chrome.runtime.getURL('index.html'));
console.log('Content script loaded on:', window.location.href);
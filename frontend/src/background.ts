chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id || !tab.url?.startsWith('http')) return;

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const container = document.getElementById('my-extension-root');
      if (container) {
        container.remove(); // Закрываем
      } else {
        // Запускаем content.js — он сам вставит UI
        chrome.runtime.sendMessage({ type: 'INJECT_UI' });
      }
    },
  });
});

// Принимаем сообщение и инжектим только один раз
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'INJECT_UI' && sender.tab?.id) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ['content.js'],
    });
  }
});


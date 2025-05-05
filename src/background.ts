chrome.action.onClicked.addListener((tab) => {
  if (!tab.id || !tab.url?.startsWith('http')) return;

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});

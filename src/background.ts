chrome.storage.onChanged.addListener((changes, namespace) => {
  console.log('changes', changes);
  console.log('namespace', namespace);
});

chrome.storage.local.get(null, () => {
  console.log('chrome.storage.local.get');
});

chrome.action.onClicked.addListener(() => {
  chrome.windows.create({
    url: chrome.runtime.getURL('index.html'),  // Главная страница расширения
    type: 'normal',
    width: 400,
    height: 600,
    left: 100,  // Позиция окна
    top: 100
  });
});

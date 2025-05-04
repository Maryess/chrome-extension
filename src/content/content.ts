import './content.css'

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === 'toggle') {
      container.classList.toggle('container-visible');
    }
});
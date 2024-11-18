chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('chatgpt.com')) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['config.js', 'content.js']
        }).catch(err => console.error('Failed to inject scripts:', err));
    }
});

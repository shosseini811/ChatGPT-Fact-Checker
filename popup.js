document.addEventListener('DOMContentLoaded', function() {
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const loadingDiv = document.getElementById('loading');
    const statusDiv = document.getElementById('status');

    function markdownToHtml(markdown) {
        return markdown
            // Headers with hashtags
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            
            // Bold text with double asterisks
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            
            // Italic text with single asterisks
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            
            // Source links
            .replace(/\b(The New York Times|Congress\.gov)\b/g, '<a href="#">$1</a>')
            
            // Bullet points
            .replace(/^- /gm, '- ')
            
            // Preserve line breaks
            .replace(/\n/g, '<br>');
    }

    // Clear previous states
    resultDiv.innerHTML = '';
    errorDiv.style.display = 'none';
    loadingDiv.style.display = 'none';
    
    // Query the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentTab = tabs[0];
        
        if (!currentTab?.id) {
            showError('Cannot access the current tab.');
            return;
        }

        chrome.tabs.sendMessage(
            currentTab.id,
            {action: "checkSelection"},
            function(response) {
                if (chrome.runtime.lastError) {
                    showError("Please refresh the page and try again.");
                    return;
                }

                if (response && response.hasSelection) {
                    loadingDiv.style.display = 'block';
                    analyzeSelectedText(currentTab.id);
                } else {
                    statusDiv.textContent = 'Please select some text from ChatGPT response to analyze';
                    statusDiv.className = 'warning';
                }
            }
        );
    });

    function analyzeSelectedText(tabId) {
        chrome.tabs.sendMessage(
            tabId,
            {action: "analyzeText"},
            function(response) {
                loadingDiv.style.display = 'none';

                if (chrome.runtime.lastError) {
                    showError("Analysis failed. Please try again.");
                    return;
                }

                if (response && response.error) {
                    showError(response.error);
                } else if (response && response.result) {
                    // Convert markdown to HTML and display
                    resultDiv.innerHTML = markdownToHtml(response.result);
                    statusDiv.textContent = 'Analysis complete!';
                    statusDiv.className = 'success';
                }
            }
        );
    }

    function showError(message) {
        loadingDiv.style.display = 'none';
        errorDiv.style.display = 'block';
        errorDiv.textContent = message;
    }
});
console.log('Content script loaded and running');

// Hardcoded configuration
const API_KEY = 'your api key here';
const API_BASE_URL = 'https://api.x.ai/v1';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('Content script received message:', request);
    
    if (request.action === "checkSelection") {
        const selectedText = window.getSelection().toString().trim();
        console.log('Selected text:', selectedText);
        sendResponse({ hasSelection: selectedText.length > 0 });
        return true;
    }
    
    if (request.action === "analyzeText") {
        const selectedText = window.getSelection().toString().trim();
        console.log('Analyzing text:', selectedText);
        
        if (!selectedText) {
            sendResponse({ error: "No text selected" });
            return true;
        }

        fetch(`${API_BASE_URL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "grok-beta",
                messages: [
                    {
                        role: "system",
                        content: "You are a fact-checking assistant. Analyze the following text for accuracy and provide a detailed assessment. Format your response in markdown with proper headings, bullet points, and emphasis where appropriate. Include sources when possible."
                    },
                    {
                        role: "user",
                        content: selectedText
                    }
                ]
            })
        })
        .then(response => {
            console.log('API response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('API response data:', data);
            sendResponse({
                result: data.choices[0].message.content
            });
        })
        .catch(error => {
            console.error('API error:', error);
            sendResponse({
                error: "Failed to analyze text: " + error.message
            });
        });

        return true;
    }
});

// Add visual indicator for text selection
document.addEventListener('mouseup', function() {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        showSelectionIndicator();
    }
});

function showSelectionIndicator() {
    let indicator = document.getElementById('fact-checker-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'fact-checker-indicator';
        indicator.style.position = 'fixed';
        indicator.style.bottom = '20px';
        indicator.style.right = '20px';
        indicator.style.padding = '8px 12px';
        indicator.style.background = '#4CAF50';
        indicator.style.color = 'white';
        indicator.style.borderRadius = '4px';
        indicator.style.zIndex = '9999';
        indicator.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        document.body.appendChild(indicator);
    }
    indicator.textContent = 'Text selected! Click extension icon to analyze';
    setTimeout(() => {
        indicator.remove();
    }, 3000);
}
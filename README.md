# ChatGPT Fact Checker Chrome Extension

![Demo](https://github.com/user-attachments/assets/37339a39-a787-4526-8a51-ca1dfad51f18)


A Chrome extension that helps fact-check ChatGPT responses using the xAI (Grok) API. The extension analyzes selected text and provides a detailed fact-checking analysis with sources.

## Features

- Fact-check selected text from ChatGPT responses
- Detailed analysis with sources and citations
- Clean, readable markdown formatting
- Easy-to-use popup interface
- Real-time analysis using xAI's Grok API

## Installation

1. Clone this repository:
```bash
git clone https://github.com/shosseini811/ChatGPT-Fact-Checker
```

2. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select the extension directory

## Usage

1. Navigate to [chat.openai.com](https://chat.openai.com)
2. Select text from a ChatGPT response you want to fact-check
3. Click the extension icon in your browser toolbar
4. View the detailed fact-checking analysis

## Project Structure

```
chatgpt-fact-checker/
├── manifest.json        # Extension configuration
├── popup.html          # Extension popup interface
├── popup.js           # Popup logic
├── content.js         # Content script for page interaction
└── README.md         # Project documentation
```

## Development

### Prerequisites

- Chrome browser
- xAI API key
- Basic knowledge of JavaScript and Chrome extensions

### Local Development

1. Make changes to the code
2. Reload the extension in Chrome
3. Test your changes

### Building for Production

1. Update the version in `manifest.json`
2. Create a production build:
   - Remove any development-only permissions
   - Ensure API keys are properly secured
   - Test thoroughly

## API Integration

The extension uses the xAI (Grok) API for fact-checking. Responses are formatted in markdown and include:

- Detailed analysis of claims
- Source citations
- Accuracy ratings
- Additional context

## Contributing

1. Fork the repository
2. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```
3. Commit your changes:
```bash
git commit -m 'Add some feature'
```
4. Push to the branch:
```bash
git push origin feature/your-feature-name
```
5. Open a Pull Request

## Security

- Keep your xAI API key secure
- The extension only accesses text on chat.openai.com
- Data is only sent to the xAI API for analysis


## Acknowledgments

- xAI for providing the Grok API
- ChatGPT for the content to fact-check
- Chrome Extensions documentation

## Support

If you encounter any issues or have questions:
1. Check existing issues
2. Create a new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

## Roadmap

- [ ] Add support for more AI platforms
- [ ] Implement batch analysis
- [ ] Add export functionality
- [ ] Improve source verification
- [ ] Add user settings

## Authors

- Sohail Hosseini - *Initial work* - [Github](https://github.com/shosseini811)

## Version History

* 1.0.0
    * Initial Release
    * Basic fact-checking functionality
    * Markdown formatting
    * Source citations

---

Made with ❤️ by [Sohail Hosseini](https://github.com/shosseini811)

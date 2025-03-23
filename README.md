# Quiz MM - Interactive Web Application

![Python Version](https://img.shields.io/badge/python-3.8%2B-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Description
Interactive quiz web application with JSON question management. Allows easy content customization without modifying source code.

## Features
- Responsive user interface
- Dynamic question/answer management
- Immediate feedback after each response
- Real-time scoring system
- Customization via JSON file

## Prerequisites
- **OS**: Windows 10/11, macOS 10.15+, modern Linux
- **Python**: 3.8+ (with pip)
- **Browser**: Chrome 90+, Firefox 88+, Edge 44+, Safari 14+
- **Disk Space**: 50 MB minimum
- **Admin rights** for dependency installation

## Installation

### All Systems
```bash
git clone https://github.com/ziedters/quiz_mm.git
cd quiz_mm
```

### Windows Specific
1. Install [Git for Windows](https://git-scm.com/download/win)
2. Install [Python 3.8+](https://www.python.org/downloads/windows/)
   - Check "Add Python to PATH" during installation
3. Open PowerShell as admin
4. Execute:
```powershell
Set-ExecutionPolicy RemoteSigned
```

## Usage

### Start Server
```bash
# Linux/macOS
python3 -m http.server 8000

# Windows
py -m http.server 8000
```

### Access Application
Open in browser:
`http://localhost:8000`

![Quiz Interface](screenshot.png)
*Screenshot of quiz interface*

## Customization
1. Modify `qcmm_quiz.json` file
2. JSON structure:
   ```json
   {
     "questions": [
       {
         "question": "Question text",
         "choices": ["Option1", "Option2", "Option3"],
         "correct_answers": [0,2]
       }
     ]
   }
   ```

## Troubleshooting
### Server Issues
- **Port already in use**: Change port
  ```bash
  python -m http.server 8001
  ```
- **Python errors**: Check version
  ```bash
  python --version
  ```

### Display Issues
- Clear browser cache (Ctrl+F5)
- Validate JSON syntax with [JSONLint](https://jsonlint.com/)

## Technical Notes
- Compatible with Windows 10+/macOS 10.13+/modern Linux
- Requires Python script execution rights
- Network configuration: Allow port 8000 in firewall if needed
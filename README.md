# Voice to Text Transcriber

## 📝 Project Description

Voice to Text Transcriber is a full-stack web application that allows users to record audio and convert it to text in real-time using OpenAI's Whisper speech recognition model. The application features a React frontend for recording and displaying transcriptions, and a Python Flask backend for audio transcription.

## 🌟 Features

- 🎤 Real-time audio recording
- 📝 Instant text transcription
- 📜 Transcription history management
- 🗑️ Individual transcription deletion
- 🧹 Clear all transcriptions functionality
- 🚨 Error handling and user feedback

## 🛠️ Technologies Used

### Frontend
- React
- Axios for API requests
- HTML5 Web Audio API

### Backend
- Python Flask
- OpenAI Whisper
- CORS support

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- Python (v3.8 or later)
- pip
- npm or yarn

## 🚀 Installation

### Frontend Setup

1. Clone the repository
```bash
git clone https://github.com/Ashishkr05/voice-to-text.git
cd voice-transcriber/frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the React development server
```bash
npm start
```

### Backend Setup

1. Navigate to the backend directory
```bash
cd ../backend
```

2. Create a virtual environment (optional but recommended)
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

3. Install required Python packages
```bash
pip install -r requirements.txt
```

4. Run the Flask server
```bash
python app.py
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory with the following (if needed):
```
FLASK_ENV=development
FLASK_DEBUG=1
```

## 💻 Usage

1. Start the backend Flask server (running on `http://localhost:5000`)
2. Start the React frontend (running on `http://localhost:3000`)
3. Click "Start Recording" to begin audio capture
4. Click "Stop Recording" when finished
5. Click "Transcribe" to convert audio to text
6. View transcription history and manage entries

## 🧪 Testing

### Frontend Tests
```bash
npm test
```

### Backend Tests
```bash
python -m pytest
```

## 📦 Dependencies

### Frontend Dependencies
- React
- Axios
- Web Audio API

### Backend Dependencies
- Flask
- Flask-CORS
- OpenAI Whisper
- Torch
- TorchAudio

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 🚨 Troubleshooting

- Ensure microphone permissions are granted
- Check backend server is running
- Verify network connectivity
- Check console for detailed error messages

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

# Ashish Kumar - ashishbgs9783@gmail.com

# Project Link: [https://github.com/Ashishkr05/voice-to-text](https://github.com/Ashishkr05/voice-to-text)

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Flask](https://flask.palletsprojects.com/)
- [OpenAI Whisper](https://github.com/openai/whisper)

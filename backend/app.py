import os
import whisper
from flask import Flask, request, jsonify
from flask_cors import CORS
import tempfile
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Global variable to store the model (load only once)
_model = None

def get_whisper_model():
    global _model
    if _model is None:
        try:
            # Use a smaller model for faster loading
            _model = whisper.load_model("tiny")
            logger.info("Whisper model loaded successfully")
        except Exception as e:
            logger.error(f"Error loading Whisper model: {e}")
            raise
    return _model

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "message": "Welcome to the Speech-to-Text Whisper API. Use `/transcribe` to upload an audio file and get the transcription.",
        "endpoints": {
            "/transcribe": "POST an audio file to transcribe it",
            "/health": "GET to check the API health"
        }
    })

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file"}), 400
    
    audio_file = request.files['audio']
    
    # Create a temporary file with a unique name
    with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as temp_audio:
        audio_file.save(temp_audio.name)
        temp_audio_path = temp_audio.name
    
    try:
        # Load the model
        model = get_whisper_model()
        
        # Transcribe the audio
        result = model.transcribe(temp_audio_path)
        
        # Clean up the temporary file
        os.unlink(temp_audio_path)
        
        return jsonify({
            "transcription": result['text'].strip(),
            "language": result.get('language', 'Unknown')
        })
    
    except Exception as e:
        # Ensure temp file is deleted even if an error occurs
        if os.path.exists(temp_audio_path):
            os.unlink(temp_audio_path)
        
        logger.error(f"Transcription error: {e}")
        return jsonify({
            "error": "Transcription failed",
            "details": str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "whisper_model": "tiny"
    })

if __name__ == '__main__':
    # Preload the model on startup
    try:
        get_whisper_model()
    except Exception as e:
        logger.error(f"Failed to preload Whisper model: {e}")
    
    # Run the Flask app
    app.run(host='0.0.0.0', port=5000, debug=True)
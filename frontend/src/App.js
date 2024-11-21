import React, { useState } from 'react';
import VoiceRecorder from './VoiceRecorder';
import './App.css';

function App() {
  const [transcriptions, setTranscriptions] = useState([]);
  const [error, setError] = useState(null);

  const handleTranscription = (newTranscription) => {
    if (newTranscription && newTranscription.trim() !== '') {
      const transcriptionEntry = {
        id: Date.now(),
        text: newTranscription,
        timestamp: new Date().toLocaleString()
      };
      
      setTranscriptions(prevTranscriptions => [
        transcriptionEntry, 
        ...prevTranscriptions
      ]);
    }
  };

  const clearTranscriptions = () => {
    setTranscriptions([]);
  };

  const deleteTranscription = (id) => {
    setTranscriptions(prevTranscriptions => 
      prevTranscriptions.filter(transcription => transcription.id !== id)
    );
  };

  return (
    <div className="app-container">
      <div className="voice-recorder-wrapper">
        <div className="header">
          <h1>Voice to Text Transcriber</h1>
          <p>Record and transcribe your audio in real-time</p>
        </div>

        <VoiceRecorder 
          onTranscribe={handleTranscription}
          onError={setError}
        />

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}

        <div className="transcription-history">
          <div className="transcription-header">
            <h2>Transcription History</h2>
            {transcriptions.length > 0 && (
              <button 
                className="clear-btn"
                onClick={clearTranscriptions}
              >
                Clear All
              </button>
            )}
          </div>

          {transcriptions.length === 0 ? (
            <p className="no-transcriptions">
              Your transcriptions will appear here
            </p>
          ) : (
            <ul className="transcription-list">
              {transcriptions.map((transcription) => (
                <li key={transcription.id} className="transcription-item">
                  <div className="transcription-content">
                    <p>{transcription.text}</p>
                    <span className="timestamp">
                      {transcription.timestamp}
                    </span>
                  </div>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteTranscription(transcription.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
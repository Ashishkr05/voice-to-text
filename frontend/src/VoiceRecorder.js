import React, { useState, useRef } from 'react';
import axios from 'axios';

function VoiceRecorder({ onTranscribe, onError }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      onError('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const sendRecording = async () => {
    if (!audioBlob) return;

    setIsProcessing(true);
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');

    try {
      const response = await axios.post('http://localhost:5000/transcribe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const transcription = response.data.transcription;
      
      if (transcription) {
        onTranscribe(transcription);
        setAudioBlob(null);
      } else {
        onError('No transcription received');
      }
    } catch (error) {
      console.error('Error sending recording:', error);
      onError('Failed to transcribe audio. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="voice-recorder">
      <div className="recording-controls">
        {!isRecording ? (
          <button 
            onClick={startRecording} 
            disabled={isProcessing}
            className="start-recording-btn"
          >
            Start Recording
          </button>
        ) : (
          <button 
            onClick={stopRecording}
            className="stop-recording-btn"
          >
            Stop Recording
          </button>
        )}

        {audioBlob && !isProcessing && (
          <button 
            onClick={sendRecording}
            className="transcribe-btn"
          >
            Transcribe
          </button>
        )}

        {isProcessing && (
          <div className="processing-indicator">
            Processing... Please wait
          </div>
        )}
      </div>
    </div>
  );
}

export default VoiceRecorder;
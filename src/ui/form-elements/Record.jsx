import { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import { useTranslation } from "react-i18next";

const AudioRecorder = () => {
  const { t } = useTranslation(); 
  const [audioURL, setAudioURL] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [waveSurfer, setWaveSurfer] = useState(null);
  const waveContainerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
    };

    mediaRecorder.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current?.stop();
  };

  const deleteRecording = () => {
    setAudioURL(null);
    waveSurfer?.destroy();
  };

  useEffect(() => {
    if (audioURL && waveContainerRef.current) {
      if (waveSurfer) {
        waveSurfer.destroy();
      }

      const wavesurferInstance = WaveSurfer.create({
        container: waveContainerRef.current,
        waveColor: "#ccc",
        progressColor: "#479991",
        cursorWidth: 1,
        height: 40,
        responsive: true,
      });

      wavesurferInstance.load(audioURL);
      setWaveSurfer(wavesurferInstance);

      return () => wavesurferInstance.destroy();
    }
  }, [audioURL]);

  return (
    <div className="section">
      <label className="label-container">
        <img src="/icons/Frame2.svg" alt="icon" className="label-icon" />
        {t("Services.recordAudio")}
      </label>
      <div className="audio-recorder">
        <button
          className={`record-btn ${isRecording ? "recording" : ""}`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          <i className="fa-solid fa-microphone"></i>
        </button>
      </div>

      {audioURL && (
        <div className="audio-preview">
          <button className="play-audio-btn" onClick={() => waveSurfer?.playPause()}>
            <i className="fa-solid fa-play"></i>
          </button>
          <div className="waveform-container" ref={waveContainerRef}></div>
          <button className="remove-audio-btn" onClick={deleteRecording}>
          <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;

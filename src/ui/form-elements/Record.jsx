import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import WaveSurfer from "wavesurfer.js";

const AudioRecorder = ({ setFormData }) => {
  const { t } = useTranslation();
  const [audioURL, setAudioURL] = useState(null);
  const [, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveSurfer, setWaveSurfer] = useState(null);

  const waveContainerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      if (waveSurfer) {
        waveSurfer.destroy();
        setWaveSurfer(null);
      }
      setAudioURL(null);
      setAudioBlob(null);
      setFormData((prev) => ({ ...prev, voice: null }));

      setIsRecording(true);
      setIsPlaying(false);

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
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBlob(audioBlob);

        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        setFormData((prev) => ({ ...prev, voice: audioBlob }));

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current?.stop();
  };

  const deleteRecording = () => {
    setAudioURL(null);
    setAudioBlob(null);
    setFormData((prev) => ({ ...prev, voice: null }));

    if (waveSurfer) {
      waveSurfer.destroy();
      setWaveSurfer(null);
    }
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

      wavesurferInstance.on("finish", () => {
        setIsPlaying(false);
        wavesurferInstance.seekTo(0);
      });

      return () => wavesurferInstance.destroy();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioURL]);

  const handlePlayPause = () => {
    if (waveSurfer) {
      waveSurfer.playPause();
      setIsPlaying(waveSurfer.isPlaying());

      if (!waveSurfer.isPlaying()) {
        waveSurfer.seekTo(0);
      }
    }
  };

  return (
    <div className="section flex-row flex-wrap">
      <label className="label-container">
        <img src="/icons/Frame2.svg" alt="icon" className="label-icon" />
        {t("Services.recordAudio")}
      </label>
      <div className="audio-recorder">
        <div
          className={`record-btn ${isRecording ? "recording" : ""}`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          <i
            className={`fa-solid ${isRecording ? "fa-stop" : "fa-microphone"}`}
          ></i>
        </div>
      </div>

      {audioURL && (
        <div className="audio-preview">
          <div className="play-audio-btn" onClick={handlePlayPause}>
            <i className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
          </div>

          <div className="waveform-container" ref={waveContainerRef}></div>

          <div className="remove-audio-btn" onClick={deleteRecording}>
            <i className="fa-regular fa-trash-can"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;

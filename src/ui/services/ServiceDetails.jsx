import { useState } from "react";
import { useLocation } from "react-router-dom";
import AudioRecorder from "../../ui/form-elements/Record";
// import GoogleMaps  from "./../cards/GoogleMaps";

export default function ServiceDetails() {
  const location = useLocation();
  const service = location.state?.service || {};

  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="service-details">
      <h2>بيانات العطل</h2>
      <p>{service.title}</p>

      <div className="section">
        <label className="label-container">
          <img src="/icons/Frame1.svg" alt="icon" className="label-icon" />
          صور العطل
        </label>
        <div className="image-upload">
          {images.map((img, index) => (
            <div key={index} className="image-preview">
              <img src={img} alt={`upload-${index}`} />
              <button className="remove-btn" onClick={() => removeImage(index)}>
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            </div>
          ))}
          <label className="upload-btn">
            <img src="/icons/uploadimg.svg" alt="" />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>

      <div className="section">
        <label className="label-container">
          <img src="/icons/Fram3.svg" alt="icon" className="label-icon" />
          وصف العطل
        </label>
        <textarea
          placeholder="اكتب هنا"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="section">
      <AudioRecorder />
      </div>

      <div className="section">
        <label>طلب في موعد مجدول</label>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={isScheduled}
            onChange={() => setIsScheduled(!isScheduled)}
          />
          <span className="slider"></span>
        </label>
      </div>

      {isScheduled && (
        <div className="date-time-container">
          <input type="time" className="date-time-input" />
          <input type="date" className="date-time-input" />
        </div>
      )}
      {/* <div className="section">
        <label className="label-container">
          <img src="/icons/map-icon.svg" alt="icon" className="label-icon" />
          موقع العطل
        </label>
        <GoogleMaps
        />
      </div> */}

      <button className="confirm-btn">تأكيد </button>
    </div>
  );
}

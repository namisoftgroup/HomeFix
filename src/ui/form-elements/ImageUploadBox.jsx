import { useRef } from "react";

const ImageUploadBox = ({ title, subtitle}) => {
  const inputRef = useRef(null);

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      console.log("img is uploading:", e.target.files[0].name);
    }
  };

  return (
    <div className="image-container">

      <div className="upload-box" onClick={() => inputRef.current.click()}>
        <div className="upload-content">
          <i className="fa-solid fa-image"></i>
          <p className="title">{title}</p>
          <p className="subtitle">{subtitle}</p>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={inputRef}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default ImageUploadBox;

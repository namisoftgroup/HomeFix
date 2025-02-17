import { useRef, useState } from "react";

const ImageUploadBox = ({ title, subtitle, onChange }) => {
  const inputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }

    onChange(e);
  };

  return (
    <div className="image-container">
      <div className="upload-box" onClick={() => inputRef.current.click()}>
        {imagePreview ? (
          <img src={imagePreview} alt="Uploaded" className="uploaded-image" />
        ) : (
          <div className="upload-content">
            <i className="fa-solid fa-image"></i>
            <p className="title">{title}</p>
            <p className="subtitle">{subtitle}</p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          name={name}
          ref={inputRef}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default ImageUploadBox;

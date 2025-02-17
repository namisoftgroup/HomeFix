import { useEffect, useRef } from "react";

const ImageUpload = ({ formData, setFormData }) => {
  const imgView = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    imgView.current.src = formData?.image
      ? URL.createObjectURL(formData.image)
      : "/icons/avatar.svg";
  }, [formData?.image]);

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  return (
    <div className="image-upload-wrapper">
      <div className="image-container" onClick={() => inputRef.current.click()}>
        <img ref={imgView} alt="avatar" />
        <div className="upload-button" onClick={() => inputRef.current.click()}>
          <i className="fa-solid fa-camera"></i>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={inputRef}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImageUpload;

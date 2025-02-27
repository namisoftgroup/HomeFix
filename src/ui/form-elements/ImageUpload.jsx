import { useRef, useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const ImageUpload = ({ register, error, watch }) => {
  const imgView = useRef(null);
  const [preview, setPreview] = useState("/icons/avatar.svg");

  const selectedFile = watch("image");

  useEffect(() => {
    if (selectedFile && selectedFile[0]) {
      const objectUrl =
        typeof selectedFile === "string"
          ? selectedFile
          : URL.createObjectURL(selectedFile[0]);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  return (
    <div className="image-upload-wrapper">
      <label htmlFor="image" className="image-container">
        <img ref={imgView} src={preview} alt="avatar" />
        <div className="upload-button">
          <i className="fa-solid fa-camera"></i>
        </div>
      </label>
      <input
        type="file"
        accept="image/*"
        id="image"
        {...register("image")}
        style={{ display: "none" }}
      />
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </div>
  );
};

export default ImageUpload;

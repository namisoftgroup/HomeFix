import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const ImageUploadBox = ({
  title,
  subtitle,
  error,
  watch,
  register,
  ...props
}) => {
  const [preview, setPreview] = useState(null);

  const selectedFile = watch(props.id);

  useEffect(() => {
    if (selectedFile && selectedFile[0]) {
      const objectUrl = URL.createObjectURL(selectedFile[0]);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  return (
    <div className="image-container">
      <label className="upload-box" htmlFor={props.id}>
        {preview ? (
          <img src={preview} alt="Uploaded" className="uploaded-image" />
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
          id={props.id}
          {...register(props.id)}
          {...props}
          style={{ display: "none" }}
        />
      </label>
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </div>
  );
};

export default ImageUploadBox;

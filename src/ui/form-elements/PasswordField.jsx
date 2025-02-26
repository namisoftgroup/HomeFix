import { useState, forwardRef } from "react";
import { Form } from "react-bootstrap";

const PasswordField = forwardRef(({ label, error, ...props }, ref) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="input-field">
      <label htmlFor={props.id}>{label}</label>
      <div className="pass-group">
        <Form.Control
          {...props}
          ref={ref}
          type={showPass ? "text" : "password"}
          isInvalid={!!error}
        />
        <div
          className="show-pass"
          onClick={(e) => {
            e.preventDefault();
            setShowPass((prev) => !prev);
          }}
        >
          <i className={`fa-regular ${showPass ? "fa-eye" : "fa-eye-slash"}`} />
        </div>
      </div>
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </div>
  );
});

PasswordField.displayName = "PasswordField";

export default PasswordField;

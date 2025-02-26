import { forwardRef } from "react";
import { Form } from "react-bootstrap";

const InputField = forwardRef(
  (
    { label, icon, hint, type = "text", as = "input", error, ...props },
    ref
  ) => {
    return (
      <div className="input-field mb-3">
        {label && (
          <Form.Label htmlFor={props?.id} className="input-label">
            {label} {hint && <span className="hint">{hint}</span>}
          </Form.Label>
        )}

        <div className="input-wrapper">
          {icon && <img src={icon} alt="input icon" className="input-icon" />}
          <Form.Control
            as={as}
            type={type}
            isInvalid={!!error}
            ref={ref}
            {...props}
          />
          {error && (
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          )}
        </div>
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;

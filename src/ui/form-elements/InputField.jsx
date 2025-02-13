import { Form } from "react-bootstrap";

export default function InputField({ label, icon, hint, pattern, type = "text", ...props }) {
  return (
    <div className="input-field">
      {label && (
        <label htmlFor={props?.id} className="input-label">
          {label} {hint && <span className="hint">{hint}</span>}
        </label>
      )}

      <div className="input-wrapper">
        {icon && <img src={icon} alt="input icon" className="input-icon" />}
        
        <Form.Control
          className="form-control"
          as={type === "textarea" ? "textarea" : "input"}
          type={type !== "textarea" ? type : undefined}
          pattern={pattern}
          {...props}
        />
      </div>
    </div>
  );
}

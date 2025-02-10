import { Form } from "react-bootstrap";

export default function InputField({ label, hint, pattern, as, ...props }) {
  return (
    <div className="input-field">
      {label && (
        <label htmlFor={props?.id} style={{ flexWrap: "nowrap" }}>
          {label} {hint && <span className="hint">{hint}</span>}
        </label>
      )}

      <Form.Control
        as={as}
        className="form-control"
        {...props}
        pattern={pattern}
      />
    </div>
  );
}

import { Form } from "react-bootstrap";

export default function TextField({ label, icon, hint, ...props }) {
  return (
    <div className="input-field">
      <label htmlFor={props.id}>
        <div className="d-flex justify-content-between align-items-center">
          {icon} {label} {hint && <span className="hint">{hint}</span>}
        </div>
      </label>
      <Form.Control as={"textarea"} className="form-control" {...props} />
    </div>
  );
}

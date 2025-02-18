import { Form } from "react-bootstrap";

export default function InputField({
  label,
  icon,
  hint,
  type = "text",
  as = "input",
  ...props
}) {
  return (
    <div className="input-field">
      {label && (
        <label htmlFor={props?.id} className="input-label">
          {label} {hint && <span className="hint">{hint}</span>}
        </label>
      )}

      <div className="input-wrapper">
        {icon && <img src={icon} alt="input icon" className="input-icon" />}

        <Form.Control as={as} type={type} {...props} />
      </div>
    </div>
  );
}

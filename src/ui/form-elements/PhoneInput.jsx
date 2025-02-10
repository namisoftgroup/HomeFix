import { Form } from "react-bootstrap";

export default function PhoneInput({
  label,
  countryCode,
  disableSelect,
  ...props
}) {
  return (
    <div className="phone_field">
      <div className="input-field">
        <label htmlFor={props?.id}>{label}</label>
        <Form.Control className="form-control" {...props} />
      </div>

      <div className="dropdown">
        <button
          aria-label="Country code"
          type="button"
          disabled={disableSelect}
        >
          {countryCode && (
            <>
              <span>{countryCode}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

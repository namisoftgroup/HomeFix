import { Form } from "react-bootstrap";

export default function PhoneInput({ label, countryCode, ...props }) {
  return (
    <div className="phone_field">
      <div className="input-field">
        <label htmlFor={props?.id}>{label}</label>
        <Form.Control className="form-control" {...props} />
      </div>

      <div className="dropdown">
        {countryCode && (
          <div className="button">
            <div className="img">
              <img src="/images/Flag_of_Jordan.svg" alt="jordan" />
            </div>
            <span>{countryCode}</span>
          </div>
        )}
      </div>
    </div>
  );
}

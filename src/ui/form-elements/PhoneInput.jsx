import { forwardRef } from "react";
import { Form } from "react-bootstrap";

const PhoneInput = forwardRef(
  ({ label, error, countryCode, ...props }, ref) => {
    return (
      <div className="input-field">
        <label htmlFor={props.id}>{label}</label>
        <div className="phone_field">
          <Form.Control
            {...props}
            ref={ref}
            className="form-control"
            isInvalid={!!error}
          />
          <div className="dropdown">
            {countryCode && (
              <div className="button">
                <div className="img">
                  <img src="/images/Flag_of_Jordan.svg" alt="Jordan Flag" />
                </div>
                <span>{countryCode}</span>
              </div>
            )}
          </div>
        </div>
        {error && (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;

import { forwardRef } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const SelectField = forwardRef(
  (
    { label, hint, options, loading, loadingText, icon, error, ...props },
    ref
  ) => {
    const { t } = useTranslation();

    return (
      <div className="input-field">
        <label htmlFor={props?.id} style={{ flexWrap: "nowrap" }}>
          {label} {hint && <span className="hint">{hint}</span>}
        </label>
        <div className="input-wrapper">
          {icon && <img src={icon} alt="input icon" className="input-icon" />}
          <Form.Select ref={ref} {...props} disabled={loading}>
            <option value="" disabled>
              {loading ? loadingText : t("select")}
            </option>
            {options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.name}
              </option>
            ))}
          </Form.Select>
        </div>
        {error && (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";

export default SelectField;

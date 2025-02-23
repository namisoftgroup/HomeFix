import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function SelectField({
  label,
  hint,
  options,
  loading,
  loadingText,
  icon,
  ...props
}) {
  const { t } = useTranslation();

  return (
    <div className="input-field">
      <label htmlFor={props?.id} style={{ flexWrap: "nowrap" }}>
        {label} {hint && <span className="hint">{hint}</span>}
      </label>
      <div className="input-wrapper">
        {icon && <img src={icon} alt="input icon" className="input-icon" />}

        <Form.Select {...props} disabled={loading}>
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
    </div>
  );
}

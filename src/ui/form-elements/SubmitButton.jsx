export default function SubmitButton({
  loading,
  name,
  className,
  style,
  onClick,
  disabled,
}) {
  return (
    <button
      aria-label="Submit"
      style={{ ...style, opacity: loading ? 0.7 : 1 }}
      disabled={disabled || loading}
      type="submit"
      className={`log ${className || ""}`}
      onClick={onClick ? onClick : undefined}
    >
      {name}{" "}
      <i className={loading ? "fa-regular fa-circle-notch fa-spin" : ""} />
    </button>
  );
}

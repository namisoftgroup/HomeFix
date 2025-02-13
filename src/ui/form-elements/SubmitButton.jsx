export default function SubmitButton({ loading, name, className, style }) {
  return (
    <button
      aria-label="Submit"
      style={{ ...style, opacity: loading ? 0.7 : 1 }}
      disabled={loading}
      type="submit"
      className={`log ${className || ""}`}
    >
      {name}{" "}
      <i className={loading ? "fa-solid fa-spinner fa-pulse fa-spin" : ""} />
    </button>
  );
}

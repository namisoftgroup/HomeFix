export default function SubmitButton({
  loading,
  name,
  className,
  fileLoading,
  event = undefined,
  style,
}) {
  return (
    <button
      aria-label="Submit"
      onClick={event ? event : undefined}
      style={{ ...style, opacity: loading || fileLoading ? 0.7 : 1 }}
      disabled={loading || fileLoading}
      type="submit"
      className={`log ${className || ""}`}
    >
      {fileLoading ? "Wait File Uploading..." : name}{" "}
      <i
        className={
          loading || fileLoading ? "fa-solid fa-spinner fa-pulse fa-spin" : ""
        }
      />
    </button>
  );
}

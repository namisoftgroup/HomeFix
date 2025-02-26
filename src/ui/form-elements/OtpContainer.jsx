import { useEffect, useState } from "react";

const OtpContainer = ({ setCode }) => {
  const [otpValue, setOtpValue] = useState(Array(5).fill(""));

  useEffect(() => {
    const firstInput = document.getElementById("input0");
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  const handleInput = (index, event) => {
    const value = event.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtpValue = [...otpValue];
    newOtpValue[index] = value;
    setOtpValue(newOtpValue);
    setCode(newOtpValue.join(""));

    if (value && index < 4) {
      document.getElementById(`input${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otpValue[index] && index > 0) {
      document.getElementById(`input${index - 1}`)?.focus();
    }
  };

  const handlePaste = (event) => {
    const data = event.clipboardData.getData("Text");
    const numbers = data.replace(/\D/g, "");
    if (numbers.length <= 5) {
      setOtpValue(numbers.split(""));
      setCode(numbers);
    }
    event.preventDefault();
  };

  return (
    <div className="otp-container" onPaste={handlePaste}>
      {Array.from({ length: 5 }).map((_, index) => (
        <input
          key={index}
          id={`input${index}`}
          className="otp-input"
          type="text"
          maxLength="1"
          inputMode="numeric"
          pattern="[0-9]"
          required
          value={otpValue[index] || ""}
          onChange={(e) => handleInput(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
        />
      ))}
    </div>
  );
};

export default OtpContainer;

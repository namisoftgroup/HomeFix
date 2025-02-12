export const handleChange = (e, setFormData) => {
  setFormData((prv) => ({
    ...prv,
    [e.target.name]: e.target.value,
  }));
};

export const handleChangeUserName = (e, setFormData) => {
  const { value } = e.target;
  const validInput = /^[a-zA-Z]*$/;
  if (validInput.test(value)) {
    setFormData((prev) => ({
      ...prev,
      username: value,
    }));
  }
};

export const handlePhoneChange = (value, name, setFormData) => {
  setFormData((prev) => ({ ...prev, [name]: value }));
};

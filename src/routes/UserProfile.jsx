import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import InputField from "../ui/form-elements/InputField";
import { updateClientData } from "../redux/slices/clientData"; 

const UserProfile = ({ defaultValues }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.clientData);

  const fields = [
    { name: "name", label: "الاسم بالكامل", type: "text", icon: "user" },
    { name: "phone", label: "رقم الجوال", type: "text", icon: "phone" },
    { name: "email", label: "البريد الإلكتروني", type: "email", icon: "email" },
    { name: "city", label: "المدينة", type: "text", icon: "address" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    if (client) {
      setFormData({
        name: client?.name || "",
        email: client?.email || "",
        phone: client?.phone || "",
        city: client?.city.name || "", 
        password: "",
        confirmPassword: "",
      });
    }
  }, [client]);

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues);
    }
  }, [defaultValues]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (showPasswordFields && formData.password !== formData.confirmPassword) {
      alert("كلمة المرور غير متطابقة!");
      return;
    }

    const updatedData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
    };

    if (showPasswordFields && formData.password) {
      updatedData.password = formData.password;
    }

    dispatch(updateClientData(updatedData));

    console.log("تم حفظ البيانات:", updatedData);
  };

  return (
    <div className="profile-container container">
      <h2 className="profile-title">حسابي</h2>
      <Form className="profile-form" onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <InputField
            key={index}
            label={field.label}
            name={field.name}
            type={field.type}
            value={formData[field.name] || ""}
            onChange={handleChange}
            icon={`/icons/${field.icon}.svg`}
          />
        ))}

        {!showPasswordFields && (
          <button
            type="button"
            className="change-password-btn"
            onClick={() => setShowPasswordFields(true)}
          >
          {t("auth.doYouWantChangePassword")}
          </button>
        )}

        {showPasswordFields && (
          <>
            <InputField
              label="كلمة المرور"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              icon="/icons/password.svg"
            />
            <InputField
              label="تأكيد كلمة المرور"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              icon="/icons/password.svg"
            />
          </>
        )}

        <button type="submit" className="confirm-btn">
          {t("Services.confirm")}
        </button>
      </Form>
    </div>
  );
};

export default UserProfile;

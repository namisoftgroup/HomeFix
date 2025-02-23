import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { updateClientData } from "../redux/slices/clientData";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import InputField from "../ui/form-elements/InputField";
import useGetCities from "../hooks/user/useGetCities";
import SelectField from "../ui/form-elements/SelectField";
import ImageUpload from "./../ui/form-elements/ImageUpload";
import axiosInstance from "../utils/axiosInstance";
import SubmitButton from "./../ui/form-elements/SubmitButton";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { client } = useSelector((state) => state.clientData);
  const { data: cities, isLoading } = useGetCities();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city_id: "",
    password: "",
    image: null,
  });

  useEffect(() => {
    if (client) {
      setFormData({
        name: client?.name || "",
        email: client?.email || "",
        phone: client?.phone || "",
        city_id: client?.city.id || "",
        image: client?.image || null,
        password: "",
        confirmPassword: "",
      });
    }
  }, [client]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (showPasswordFields && formData.password !== formData.confirmPassword) {
      toast.error(t("passwordNotMatch"));
      setLoading(false);
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city_id: formData.city_id,
      password: formData.password,
    };

    if (typeof formData.image !== "string") {
      payload.image = formData.image;
    }

    try {
      const res = await axiosInstance.post(
        `/auth/users/${client.id}`,
        {
          ...payload,
          _method: "put",
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.code == 200) {
        dispatch(updateClientData(res?.data?.data));
        navigate("/");
        toast.success(res.data.message);
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong, please try again or contact us.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-12 p-2">
            <h2 className="profile-title">
              <div className="icon" onClick={() => navigate(-1)}>
                <i className="fa-regular fa-angle-right"></i>
              </div>
              {t("editProfile")}
            </h2>

            <Form className="profile-form" onSubmit={handleSubmit}>
              <ImageUpload formData={formData} setFormData={setFormData} />

              <InputField
                label={t("auth.fullName")}
                onChange={handleChange}
                value={formData.name}
                name="name"
                type="text"
                icon="/icons/user.svg"
              />

              <InputField
                label={t("auth.phone")}
                onChange={handleChange}
                value={formData.phone}
                name="phone"
                type="tel"
                icon="/icons/phone.svg"
              />

              <InputField
                label={t("auth.email")}
                onChange={handleChange}
                value={formData.email}
                name="email"
                type="email"
                icon="/icons/email.svg"
              />

              <SelectField
                required
                loading={isLoading}
                loadingText={t("isLoading")}
                label={t("auth.city")}
                icon="/icons/email.svg"
                id="city_id"
                name="city_id"
                value={formData.city_id}
                onChange={(e) =>
                  setFormData({ ...formData, city_id: e.target.value })
                }
                options={
                  cities?.map((city) => ({
                    name: city.name,
                    value: city.id,
                  })) || []
                }
              />

              <div className="question p-0 pt-2">
                <label
                  htmlFor="wantChangePassword"
                  className="change-password-btn"
                >
                  {t("auth.doYouWantChangePassword")}
                </label>
                <Form.Switch
                  id="wantChangePassword"
                  name="wantChangePassword"
                  checked={showPasswordFields}
                  onChange={() => setShowPasswordFields(!showPasswordFields)}
                />
              </div>

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

              <SubmitButton
                loading={loading}
                name={t("Services.confirm")}
                className="confirm-btn"
              />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

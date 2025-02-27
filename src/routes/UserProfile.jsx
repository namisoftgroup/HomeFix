import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { updateClientData } from "../redux/slices/clientData";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import InputField from "../ui/form-elements/InputField";
import useGetCities from "../hooks/user/useGetCities";
import SelectField from "../ui/form-elements/SelectField";
import ImageUpload from "./../ui/form-elements/ImageUpload";
import axiosInstance from "../utils/axiosInstance";
import SubmitButton from "./../ui/form-elements/SubmitButton";
import ResetPasswordModal from "../ui/modals/ResetPasswordModal";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { client } = useSelector((state) => state.clientData);
  const { data: cities, isLoading } = useGetCities();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showResetModal, setShowResetModal] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required(t("validation.nameRequired")),
    email: yup
      .string()
      .email(t("validation.emailInvalid"))
      .required(t("validation.emailRequired")),
    phone: yup
      .string()
      .required(t("validation.phoneRequired"))
      .matches(/^7\d{8}$/, t("validation.phoneInvalid"))
      .length(9, t("validation.phoneInvalid")),
    city_id: yup.string().required(t("validation.cityRequired")),
    image: yup.mixed().required(t("validation.imageRequired")),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city_id: "",
      image: null,
      password: "",
      password_confirmation: "",
      current_password: "",
    },
  });

  useEffect(() => {
    if (client) {
      setValue("name", client?.name || "");
      setValue("email", client?.email || "");
      setValue("phone", client?.phone || "");
      setValue("city_id", client?.city.id || "");
      setValue("image", client?.image || null);
    }
  }, [client, setValue]);

  const onSubmit = async () => {
    const payload = {
      name: watch("name"),
      email: watch("email"),
      phone: watch("phone"),
      city_id: watch("city_id"),
      password: watch("password"),
    };

    if (typeof watch("image") !== "string") {
      payload.image = watch("image")[0];
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

            <Form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
              <ImageUpload
                error={errors?.image?.message}
                register={register}
                watch={watch}
              />

              <InputField
                label={t("auth.fullName")}
                {...register("name")}
                error={errors?.name?.message}
                name="name"
                type="text"
                icon="/icons/user.svg"
              />

              <InputField
                label={t("auth.phone")}
                disabled
                {...register("phone")}
                name="phone"
                type="tel"
                icon="/icons/phone.svg"
              />

              <InputField
                label={t("auth.email")}
                {...register("email")}
                error={errors?.email?.message}
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
                {...register("city_id")}
                error={errors?.city_id?.message}
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
                  checked={showResetModal}
                  onChange={() => setShowResetModal(!showResetModal)}
                />
              </div>

              <SubmitButton
                loading={isSubmitting}
                name={t("Services.confirm")}
                className="confirm-btn"
              />
            </Form>

            <ResetPasswordModal
              show={showResetModal}
              setShow={setShowResetModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

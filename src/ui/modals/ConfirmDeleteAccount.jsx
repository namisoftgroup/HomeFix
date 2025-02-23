import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { logout } from "../../redux/slices/clientData";
import SubmitButton from "../form-elements/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";

export default function ConfirmDeleteAccount({ show, setShow }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [, , deleteCookie] = useCookies(["token", "id"]);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { client } = useSelector((state) => state.clientData);

  const deleteAccount = async () => {
    setLoading(true);
    try {
      const deleteToken = await axiosInstance.delete(
        `/auth/users/${client.id}`
      );
      if (deleteToken.data.code === 200) {
        deleteCookie("token");
        deleteCookie("id");
        delete axiosInstance.defaults.headers.common["Authorization"];
        dispatch(logout());
        navigate("/");
        queryClient.clear();
        localStorage.setItem("userType", "client");
        toast.success(deleteToken.data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("cancelOrder")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <h6>{t("deleteAccountDesc")}</h6>

        <div className="d-flex gap-3">
          <button onClick={() => setShow(false)}>{t("cancel")}</button>

          <SubmitButton
            name={t("deleteAccount")}
            loading={loading}
            onClick={deleteAccount}
            className="cancelButton m-0"
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

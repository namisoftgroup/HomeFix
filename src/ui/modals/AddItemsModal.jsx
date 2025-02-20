import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InputField from "../form-elements/InputField";

export default function AddItemsModal({
  show,
  setShow,
  setOrderItems,
  orderItems,
}) {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);

  const orderInitial = {
    item_name: "",
    item_price: "",
  };

  useEffect(() => {
    setItems(orderItems);
  }, [orderItems]);

  const handleInputChange = (index, field, value) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
    setOrderItems(items);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("addItems")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <form className="form" onSubmit={handleSubmit}>
          {items.map((item, index) => (
            <div className="item_row" key={index}>
              <InputField
                placeholder={t("enterName")}
                value={item?.item_name || ""}
                required
                onChange={(e) =>
                  handleInputChange(index, "item_name", e.target.value)
                }
              />
              <InputField
                placeholder={t("price")}
                value={item?.item_price || ""}
                required
                onChange={(e) =>
                  handleInputChange(index, "item_price", e.target.value)
                }
              />
              <div className="actions">
                <button onClick={() => handleRemoveItem(index)}>
                  <img src="/icons/delete.svg" alt="delete" />
                </button>
              </div>
            </div>
          ))}

          <div
            onClick={() => setItems((prev) => [...prev, orderInitial])}
            className="add_products_btn"
          >
            {t("addProduct")}
          </div>

          <button className="mt-4">{t("confirmAdding")}</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

import { Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useGetFqs from "../hooks/settings/useGetFqs";
import DataLoader from "../ui/loaders/DataLoader";

export default function FAQs() {
  const { data: faqs, isLoading } = useGetFqs();
  const { t } = useTranslation();

  return (
    <div className="faqs container">
      <h2 className="faqs-title">{t("faqs")}</h2>

      {isLoading ? (
        <DataLoader />
      ) : (
        <Accordion>
          {faqs?.map((faq, index) => (
            <Accordion.Item key={faq?.id} eventKey={String(index)}>
              <Accordion.Header>{faq?.title}</Accordion.Header>
              <Accordion.Body>{faq?.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </div>
  );
}

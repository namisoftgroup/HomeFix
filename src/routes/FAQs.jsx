import { useState } from "react";
import useGetFqs from "../hooks/settings/useGetFqs";
import PageLoader from "../ui/loaders/PageLoader";

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);
  const { data: faqs, isLoading } = useGetFqs();

  
  return (
    <div className="faqs container">
      <h2 className="faqs-title">الأسئلة الشائعة </h2>

         {isLoading ? (
          <PageLoader />
        ) : (
      <div className="faqs-list">
        {faqs?.map((faq, index) => (
          <div
            key={faq?.index}
            className={`faqs-item ${openIndex === index ? "active" : ""}`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="faq-header">
              <span>{faq?.title}</span>
              <span className="arrow">
                {openIndex === index ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </span>
            </div>
            {openIndex === index && (
              <div className="faq-body">{faq?.answer}</div>
            )}
          </div>
        ))}
      </div>
       )}
    </div>
  );
}

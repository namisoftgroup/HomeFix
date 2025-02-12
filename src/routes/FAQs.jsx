import { useState } from "react";
import useGetFqs from "../hooks/settings/useGetFqs";
import PageLoader from "../ui/loaders/PageLoader";

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);
  const { data: faqs, isLoading } = useGetFqs();

  // const faqs = [
  //   {
  //     question: "كيف يمكنني طلب خدمة؟",
  //     answer:
  //       "يمكنك طلب الخدمة بسهولة عن طريق اختيار نوع الإصلاح الذي تحتاجه، ثم تعبئة نموذج الطلب، وسيتواصل معك أحد المتخصصين لدينا لتأكيد التفاصيل.",
  //   },
  //   {
  //     question: "كيف أتأكد من التكلفة؟",
  //     answer:
  //       "بعد تقديم الطلب، سيقوم أحد الفنيين لدينا بتقييم العمل المطلوب وإرسال تقدير مبدئي للتكلفة، وعند الموافقة، سيتم تأكيد السعر النهائي قبل بدء العمل.",
  //   },
  //   {
  //     question: "ما هي قائمة طلباتي؟",
  //     answer:
  //       "يمكنك الاطلاع على جميع الطلبات السابقة والجارية من خلال حسابك على الموقع، حيث يمكنك متابعة حالة كل طلب وتحديث أي معلومات عند الحاجة.",
  //   },
  // ];

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

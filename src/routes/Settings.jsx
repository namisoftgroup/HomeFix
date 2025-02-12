import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/clientData"; 

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/"); 
  };

  const settingsOptions = [
    { img: "/icons/user.svg", text: "حسابي", path: "/profile" },
    { img: "/icons/notifications.svg", text: "الاشعارات", path: "/notifications" },
    { img: "/icons/contactus.svg", text: "تواصل معنا", path: "/contactus" },
    { img: "/icons/FAQ.svg", text: "الأسئلة الشائعة", path: "/faq" },
    { img: "/icons/About.svg", text: "عن التطبيق", path: "/aboutus" },
    { img: "/icons/Privacy Policy.svg", text: "سياسة الخصوصية", path: "/privacy" },
    { img: "/icons/Terms.svg", text: "الشروط والأحكام", path: "/terms-and-conditions" },
  ];

  return (
    <section className="settings container">
      <h2 className="settings-title">الإعدادات</h2>

      <div className="settings-list">
        {settingsOptions.map((option, index) => (
          <Link to={option.path} key={index} className="settings-item">
            <div className="content">
              <img src={option.img} alt={option.text} className="icon-img" />
              <span className="text">{option.text}</span>
            </div>
            <span className="arrow">
              <i className="fas fa-chevron-left"></i>
            </span>
          </Link>
        ))}

        <div className="settings-item delete">
          <div className="content">
            <img src="/icons/deleteaccount.svg" alt="حذف الحساب" className="icon-img" />
            <span className="text">حذف الحساب</span>
          </div>
        </div>
      </div>

      <button className="logout" onClick={handleLogout}>
        <img src="/icons/logout.svg" alt="تسجيل الخروج" className="icon-img" />
        <span className="text">تسجيل الخروج</span>
      </button>
    </section>
  );
}

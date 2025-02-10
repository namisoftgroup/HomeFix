import { useTranslation } from "react-i18next";

export function getServices() {
  const { t } = useTranslation();

  return [
    { id: "1", icon: "fa-solid fa-file-signature", title: t("Services.title1"), subtitle: t("Services.subtitle1"), image: "/images/service1.svg" },
    { id: "2", icon: "fa-solid fa-list-check", title: t("Services.title2"), subtitle: t("Services.subtitle2"), image: "/images/service2.svg" },
    { id: "3", icon: "fa-solid fa-shield-alt", title: t("Services.title3"), subtitle: t("Services.subtitle3"), image: "/images/service3.svg" },
    { id: "4", icon: "fa-solid fa-cogs", title: t("Services.title4"), subtitle: t("Services.subtitle4"), image: "/images/service4.svg" },
    { id: "5", icon: "fa-solid fa-truck", title: t("Services.title5"), subtitle: t("Services.subtitle5"), image: "/images/service5.svg" },
    { id: "6", icon: "fa-solid fa-paint-roller", title: t("Services.title6"), subtitle: t("Services.subtitle6"), image: "/images/service6.svg" },
    { id: "7", icon: "fa-solid fa-snowflake", title: t("Services.title7"), subtitle: t("Services.subtitle7"), image: "/images/service7.svg" },
    { id: "8", icon: "fa-solid fa-bug", title: t("Services.title8"), subtitle: t("Services.subtitle8"), image: "/images/service8.svg" },
    { id: "9", icon: "fa-solid fa-mobile-alt", title: t("Services.title9"), subtitle: t("Services.subtitle9"), image: "/images/service9.svg" },
    { id: "10", icon: "fa-solid fa-broom", title: t("Services.title10"), subtitle: t("Services.subtitle10"), image: "/images/service10.svg" },
    { id: "11", icon: "fa-solid fa-hammer", title: t("Services.title11"), subtitle: t("Services.subtitle11"), image: "/images/service11.svg" },
    { id: "12", icon: "fa-solid fa-video", title: t("Services.title12"), subtitle: t("Services.subtitle12"), image: "/images/service12.svg" },
    { id: "13", icon: "fa-solid fa-th", title: t("Services.title13"), subtitle: t("Services.subtitle13"), image: "/images/service13.svg" },
    { id: "14", icon: "fa-solid fa-building", title: t("Services.title14"), subtitle: t("Services.subtitle14"), image: "/images/service14.svg" }
  ];
}

import React from "react";
import { useTranslation } from "react-i18next";
import "../../public/css/error.css";

function Error({ error_type }) {
  const { t } = useTranslation();
  
  return <p className="error">{t(error_type)}</p>;
}

export default Error;

import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    console.log(`Language changed to ${language}`);
    console.log(`Current language is ${i18n.language}`);
  };

  return (
    <div>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("jp")}>日本語</button>
    </div>
  );
};

export default LanguageSwitcher;

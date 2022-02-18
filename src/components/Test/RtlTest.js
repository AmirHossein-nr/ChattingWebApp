import React from 'react';
import { useTranslation } from 'react-i18next';
function RtlTest(props) {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  return (
    <div>
      {t("welcome")}
    </div>
  );
}

export default RtlTest;
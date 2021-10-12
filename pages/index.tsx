import { Typography } from "@mui/material";
import { NextSeo } from "next-seo";
import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const checklists = [
  "Material UI v5 ✅",
  "Themeing (light/dark) ✅",
  "Firebase v9 ✅",
  "Email Password Authentication ✅",
  "Google Authentication ✅",
  "Forgot Password ✅",
  "Firestore Example",
  "Cloud functions",
  "Google Analytics ✅",
  "Redux/context ✅",
  "Localizations (react-i18next)",
  "Next-seo ✅",
  "Hook-form/redux-form",
  "Landing Page Layout ✅",
  "Dashboard Layout",
];

const Home: React.FC = (props) => {
  const { t } = useTranslation("common");

  return (
    <div>
      <NextSeo title="NextJS Boilerplate" description="" />

      <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
        {t("home_page")}
      </Typography>

      <Typography variant="h3" sx={{ fontWeight: 500, mb: 2 }}>
        NextJS Boilerplate by Salman Fazal
      </Typography>

      {checklists.map((item, i) => (
        <Typography sx={{ fontSize: 26 }} key={i}>
          {i + 1}. {item}
        </Typography>
      ))}
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Home;

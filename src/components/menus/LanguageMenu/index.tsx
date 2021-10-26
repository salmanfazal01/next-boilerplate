import TranslateIcon from "@mui/icons-material/Translate";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { LANGUAGES } from "src/constants";

const LanguageMenu = () => {
  const [langAnchor, setLangAnchor] = useState(null);

  const router = useRouter();
  const { pathname } = router;

  const handleLanguageChange = (lang: string) => {
    router.replace(pathname, pathname, { locale: lang });
    // i18n.changeLanguage(lang);
    setLangAnchor(null);
  };
  return (
    <>
      <IconButton
        size="large"
        onClick={(e) => setLangAnchor(e.currentTarget)}
        color="inherit"
      >
        <TranslateIcon />
      </IconButton>

      <Menu
        anchorEl={langAnchor}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(langAnchor)}
        onClose={() => setLangAnchor(null)}
      >
        {LANGUAGES.map((item) => (
          <MenuItem
            onClick={() => handleLanguageChange(item.code)}
            key={item.code}
          >
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageMenu;

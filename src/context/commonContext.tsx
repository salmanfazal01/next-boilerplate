import { useMediaQuery, useTheme } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { COMMON_CONTEXT_STORAGE } from "src/constants";

// Create Context Object
export const CommonContext = createContext({});

// Create a provider for components to consume and subscribe to changes
export const CommonContextProvider = ({ children }) => {
  const theme = useTheme();
  const isDekstop = useMediaQuery(theme.breakpoints.up("lg"));

  const [state, setState] = useState({ drawerMenuOpen: isDekstop });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const _data = window.localStorage.getItem(COMMON_CONTEXT_STORAGE);
      const parsed = _data ? JSON.parse(_data) : {};
      setState((old) => ({ ...old, ...parsed }));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !isLoading) {
      const parsed = JSON.stringify(state);
      window.localStorage.setItem(COMMON_CONTEXT_STORAGE, parsed);
    }
  }, [state, isLoading]);

  const setCommonValues = (data = {}) => {
    setState((old) => ({
      ...old,
      ...data,
    }));
  };

  return (
    <CommonContext.Provider value={{ commonState: state, setCommonValues }}>
      {children}
    </CommonContext.Provider>
  );
};

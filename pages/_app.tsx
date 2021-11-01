import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import store from "@redux/store";
import { appWithTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AppProps } from "next/app";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Provider } from "react-redux";
import createEmotionCache from "src/config/createEmotionCache";
import { useAnalytics } from "src/hooks/firebase";
import LandingLayout from "src/containers/layouts/LandingLayout";
import AuthContextProvider from "src/context/authContext";
import CustomThemeProvider from "src/context/themeContext";
import "../src/styles/global.css";
import { useRouter } from "next/router";
import DashboardLayout from "src/containers/layouts/DashboardLayout";
import { CommonContextProvider } from "src/context/commonContext";
import { StylesProvider, createGenerateClassName } from "@mui/styles";

const generateClassName = createGenerateClassName({
  productionPrefix: "c",
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const queryClient = new QueryClient();

  const router = useRouter();
  const { pathname } = router;

  const landingLayouts = ["/", "/login", "/register"];

  const Layout = landingLayouts.includes(pathname)
    ? LandingLayout
    : DashboardLayout;

  useEffect(() => {
    useAnalytics();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <StylesProvider generateClassName={generateClassName}>
            <CommonContextProvider>
              <AuthContextProvider>
                <CacheProvider value={clientSideEmotionCache}>
                  <CustomThemeProvider>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </CustomThemeProvider>
                </CacheProvider>
              </AuthContextProvider>
            </CommonContextProvider>
          </StylesProvider>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp);

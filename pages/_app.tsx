import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import store from "@redux/store";
import { AppProps } from "next/app";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Provider } from "react-redux";
import AuthContextProvider from "src/context/authContext";
import CustomThemeProvider from "src/context/themeContext";
import createEmotionCache from "src/config/createEmotionCache";
import "../src/styles/global.css";
import LandingLayout from "src/containers/Layouts/LandingLayout";
import { useAnalytics } from "src/config/firebase";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const queryClient = new QueryClient();

  const Layout = LandingLayout;

  useEffect(() => {
    useAnalytics();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
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
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;

import store from "@redux/store";
import "@styles/global.css";
import { AppProps } from "next/app";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/config/theme";
import createEmotionCache from "../src/config/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <CacheProvider value={clientSideEmotionCache}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </CacheProvider>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;

import React from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/nextApollo";
import * as ReactGA from "react-ga";

import { Helmet } from "react-helmet";

import { Themes } from "@blerp/design";
import { colors } from "../components/theme/Theme";
import { ThemeProvider } from "styled-components";
import { ToastProvider } from "../components/theme/ToastProvider";

// https://github.com/vercel/next.js/tree/canary/examples/with-apollo For apollo + nextjs example
export default function App({ Component, pageProps }) {
    const apolloClient = useApollo(pageProps.initialApolloState);

    return (
        <ApolloProvider client={apolloClient}>
            <ThemeProvider
                theme={{
                    ...Themes.mainTheme,
                    colors: colors,
                    mode: "light",
                }}
            >
                <ToastProvider>
                    <>
                        <Helmet defaultTitle='Blerp' titleTemplate='%s' />
                        <Component {...pageProps} />
                    </>
                </ToastProvider>
            </ThemeProvider>
        </ApolloProvider>
    );
}

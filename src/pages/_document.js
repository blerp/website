/* eslint-disable react/jsx-props-no-spreading */

/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import Document, { Head, Main, NextScript } from "next/document";
import * as React from "react";
import { Helmet } from "react-helmet";
import { ServerStyleSheet } from "styled-components";

import { defaultBackground, focusState, pandaPink } from "../styles/colors";

import { default as Router, withRouter } from "next/router";

import projectConfig from "../config";

// REFS: https://github.com/zeit/next.js/issues/160
const GA_TRACKING_ID = projectConfig.googleTrackingId;

// declare global {
//   interface Window {
//     GA_INITIALIZED: any;
//     gtag: any;
//     gaTrackingId: any;
//   }
// }

/*****************************************************************************\
  Make sure to insert your tracking ID. Otherwise nothing's gonna happen! 😁
\*****************************************************************************/
const gaTrackingId = GA_TRACKING_ID;

/*****************************************************************************\
  We'll set the `onRouteChangeComplete` method to a function that sends our
  pageview to GA. I'm using ReactGA for this, but you can also do it manually
  with the `window.gtag` method.
\*****************************************************************************/
Router.onRouteChangeComplete = () => {
    if (window.gtag) {
        window.gtag("config", window.gaTrackingId, {
            page_location: window.location.href,
            page_path: window.location.pathname,
            page_title: window.document.title,
        });
    }
};

// https://medium.com/javascript-in-plain-english/ssr-with-next-js-styled-components-and-material-ui-b1e88ac11dfa
export default class ReactDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        sheet.collectStyles(<App {...props} />),
                });
            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        const helmet = Helmet.renderStatic();
        const htmlAttrs = helmet.htmlAttributes.toComponent();
        const bodyAttrs = helmet.bodyAttributes.toComponent();

        return (
            <html {...htmlAttrs} lang='en-US'>
                <Head>
                    {/* Progressive Web Application Information */}
                    <link rel='manifest' href='/manifest.json' />
                    <meta
                        name='p:domain_verify'
                        content='1d4ce99db212d4d437a9eca52c1086ff'
                    />
                    <link
                        rel='search'
                        type='application/opensearchdescription+xml'
                        title='Blerp'
                        href='/opensearch.xml'
                    />
                    <meta name='theme-color' content='#1d1d1d' />

                    {/* App Icons */}
                    {/* <!--
                   Import the `gtag` script
                 --> */}
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
                    />

                    {/* <!--
                   This ensures that the first page view gets sent to GA. All subsequent
                   page views will be handled by the `Router.onRouteChangeComplete`
                   method we set up above.
                 --> */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                   window.dataLayer = window.dataLayer || []
                   window.gaTrackingId = '${gaTrackingId}';
                   function gtag(){
                     dataLayer.push(arguments)
                   }
                   gtag('js', new Date())
                   gtag('config', '${gaTrackingId}')
                 `,
                        }}
                    />

                    <link
                        rel='apple-touch-icon-precomposed'
                        sizes='57x57'
                        href='https://storage.googleapis.com/blerp_products/Web/Favicons/apple-touch-icon-57x57.png'
                    />
                    <link
                        rel='apple-touch-icon-precomposed'
                        sizes='114x114'
                        href='https://storage.googleapis.com/blerp_products/Web/Favicons/apple-touch-icon-114x114.png'
                    />
                    <link
                        rel='apple-touch-icon-precomposed'
                        sizes='72x72'
                        href='https://storage.googleapis.com/blerp_products/Web/Favicons/apple-touch-icon-72x72.png'
                    />
                    <link
                        rel='apple-touch-icon-precomposed'
                        sizes='144x144'
                        href='https://storage.googleapis.com/blerp_products/Web/Favicons/apple-touch-icon-144x144.png'
                    />
                    <link
                        rel='apple-touch-icon-precomposed'
                        sizes='60x60'
                        href='https://storage.googleapis.com/blerp_products/Web/Favicons/apple-touch-icon-60x60.png'
                    />
                    <link
                        rel='apple-touch-icon-precomposed'
                        sizes='120x120'
                        href='https://storage.googleapis.com/blerp_products/Web/Favicons/apple-touch-icon-120x120.png'
                    />
                    <link
                        rel='apple-touch-icon-precomposed'
                        sizes='76x76'
                        href='https://storage.googleapis.com/blerp_products/Web/Favicons/apple-touch-icon-76x76.png'
                    />
                    <link
                        rel='apple-touch-icon-precomposed'
                        sizes='152x152'
                        href='https://storage.googleapis.com/blerp_products/Web/Favicons/apple-touch-icon-152x152.png'
                    />
                    <link
                        rel='icon'
                        type='image/png'
                        href='https://storage.googleapis.com/blerp_products/Web/Favicons/favicon-196x196.png'
                        sizes='196x196'
                    />
                    <link
                        rel='icon'
                        type='image/png'
                        href='https://storage.googleapis.com/blerp_products/Web/Favicons/favicon-96x96.png'
                        sizes='96x96'
                    />
                    <link
                        rel='icon'
                        type='image/png'
                        href='https://storage.googleapis.com/blerp_products/Web/Favicons/favicon-32x32.png'
                        sizes='32x32'
                    />
                    <link
                        rel='icon'
                        type='image/png'
                        href='https://storage.googleapis.com/blerp_products/Web/Favicons/favicon-16x16.png'
                        sizes='16x16'
                    />
                    <link
                        rel='icon'
                        type='image/png'
                        href='https://storage.googleapis.com/blerp_products/Web/Favicons/favicon-128.png'
                        sizes='128x128'
                    />
                    <link
                        rel='icon'
                        type='image/png'
                        href='https://storage.googleapis.com/blerp_products/Web/Favicons/favicon.ico'
                    />
                    <meta name='application-name' content='&nbsp;' />
                    <meta name='msapplication-TileColor' content='#FFFFFF' />
                    <meta
                        name='msapplication-TileImage'
                        content='https://storage.googleapis.com/blerp_products/Web/Favicons/mstile-144x144.png'
                    />
                    <meta
                        name='msapplication-square70x70logo'
                        content='https://storage.googleapis.com/blerp_products/Web/Favicons/mstile-70x70.png'
                    />
                    <meta
                        name='msapplication-square150x150logo'
                        content='https://storage.googleapis.com/blerp_products/Web/Favicons/mstile-150x150.png'
                    />
                    <meta
                        name='msapplication-wide310x150logo'
                        content='https://storage.googleapis.com/blerp_products/Web/Favicons/mstile-310x150.png'
                    />
                    <meta
                        name='msapplication-square310x310logo'
                        content='https://storage.googleapis.com/blerp_products/Web/Favicons/mstile-310x310.png'
                    />

                    {this.props.styleTags}

                    {/* Page Title */}
                    {helmet.title.toComponent()}
                    {helmet.link.toComponent()}
                    <meta name='apple-itunes-app' content='app-id=1235261552' />
                    <meta
                        name='google-play-app'
                        content='app-id=com.lolibe.blerp'
                    />
                    <meta
                        name='viewport'
                        content='width=device-width, initial-scale=1'
                    />
                    {helmet.meta.toComponent()}
                    {helmet.style.toComponent()}
                    {/* {helmet.script.toComponent()} */}
                    <meta
                        name='msvalidate.01'
                        content='BE8213CB1CFC91B81D9E11CCB47E9BCA'
                    />
                    <meta
                        name='msvalidate.01'
                        content='A95E9755FB33BDEF7064E0067615C0E0'
                    />
                    <meta
                        name='google-site-verification'
                        content='txTFfv91Qf6onqjMmR-iXnCNrHiFRdxHDpT5SLuEuJc'
                    />

                    {/* <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" /> */}
                    <style
                        dangerouslySetInnerHTML={{
                            __html: `
                            @font-face {
                              font-family: "Odudo";
                              font-weight: normal;
                              font-display: swap;
                              src: url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-Regular.eot');
                              src: url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-Regular.woff2') format("woff2"),
                                  url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-Regular.woff') format("woff");
                            }

                            @font-face {
                              font-family: "Odudo";
                              font-weight: lighter;
                              font-display: swap;
                              src: url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-Light.eot');
                              src: url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-Light.woff2') format("woff2"),
                                  url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-Light.woff') format("woff");
                            }

                            @font-face {
                              font-family: "Odudo";
                              font-weight: 300;
                              font-display: swap;
                              src: url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-Light.eot');
                              src: url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-Light.woff2') format("woff2"),
                                  url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-Light.woff') format("woff");
                            }

                            @font-face {
                              font-family: "Odudo";
                              font-weight: 400;
                              font-display: swap;
                              src: url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-Regular.eot');
                              src: url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-Regular.woff2') format("woff2"),
                                  url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-Regular.woff') format("woff");
                            }

                            @font-face {
                              font-family: "Odudo";
                              font-weight: bolder;
                              font-display: swap;
                              src: url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-SemiBold.eot');
                              src: url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-SemiBold.woff2') format("woff2"),
                                  url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-SemiBold.woff') format("woff");
                            }

                            @font-face {
                              font-family: "Odudo";
                              font-weight: 600;
                              font-display: swap;
                              src: url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-SemiBold.eot');
                              src: url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-SemiBold.woff2') format("woff2"),
                                  url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-SemiBold.woff') format("woff");
                            }

                            @font-face {
                              font-family: "Odudo";
                              font-weight: bold;
                              font-display: swap;
                              src: url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-Bold.eot');
                              src: url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-Bold.woff2') format("woff2"),
                                  url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-Bold.woff') format("woff");
                            }

                            @font-face {
                              font-family: "Odudo";
                              font-weight: 700;
                              font-display: swap;
                              src: url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-Bold.eot');
                              src: url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-Bold.woff2') format("woff2"),
                                  url('https://storage.googleapis.com/blerp-web-images/fonts/web/Odudo-Bold.woff') format("woff");
                            }

                            a, div, span, input, button, select, label {
                              font-family: "Odudo", "Lato", "Helvetica Neue", sans-serif;
                              font-size: 16px;
                              font-weight: normal;
                              caret-color: ${pandaPink};
                              letter-spacing: 1px;
                            }

                            a, span, input, select, label {
                              border-radius: 8px;
                              letter-spacing: 1px;
                            }

                            img:focus {
                              outline: 0;
                            }

                            button:focus {
                              border: 2px solid ${pandaPink} !important;
                              outline: 0 !important;
                              box-shadow: none !important;
                            }

                            a:focus{
                              border-radius: 8px;
                              border: 2px solid ${pandaPink};
                              outline: 0 !important;
                              box-shadow: none !important;
                            }

                            input:focus{
                              border-radius: 8px;
                              border: 2px solid ${pandaPink} !important;
                              outline: 0 !important;
                              box-shadow: none !important;
                            }

                            select:focus{
                              border-radius: 8px;
                              border: 2px solid ${pandaPink} !important;
                              outline: 0 !important;
                              box-shadow: none !important;
                            }

                            button::-moz-focus-inner {
                              border: 0;
                            }

                            h1 {
                              font-family: "Odudo", "Lato", "Helvetica Neue", sans-serif;
                              font-weight: 600;
                              font-size: 40px;
                            }

                            h2 {
                              font-family: "Odudo", "Lato", "Helvetica Neue", sans-serif;
                              font-weight: 600;
                              font-size: 32px;
                              margin: 8px;
                            }

                            h3, h4 {
                              font-family: "Odudo", "Lato", "Helvetica Neue", sans-serif;
                              font-weight: 600;
                              font-size: 24px;
                              margin: 8px;
                            }

                            p {
                              font-family: "Odudo", "Lato", "Helvetica Neue", sans-serif;
                              font-size: 16px;
                              font-weight: normal;
                              line-height: 20px;
                            }

                            button:focus, div:focus, input:focus {
                              box-shadow: 0 0 5px rgba(81, 203, 238, 1);
                              border: 1px solid rgba(81, 203, 238, 1);
                            }
                            `,
                        }}
                    />
                </Head>
                <body
                    {...bodyAttrs}
                    style={{ margin: 0, backgroundColor: defaultBackground }}
                >
                    <audio id='global-audio-player' />
                    <Main />
                    <NextScript />
                </body>
                <div id='modal-root' />
                <div id='blerp-modal-root' />
                <div id='blerp-modal-root-two' />
            </html>
        );
    }
}

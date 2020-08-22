/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

// Taken from examples from here https://github.com/zeit/next.js/tree/master/examples/with-apollo
// This was the intial reference
import * as React from "react";
import "isomorphic-fetch";

const isBrowser = typeof window !== "undefined";

// if (isBrowser) {
//   // Polyfill in intersection-observer so that infinite scrolling and lazy
//   //  loading work later in the tree for older browsers.
//   require("intersection-observer");
// }

// declare global {
//   interface Window {
//     GA_INITIALIZED: any;
//   }
// }

// interface WithInitialProps {
//   getInitialProps?: (ctx: any) => object | Promise<object>;
// }

// interface WithInitialState {
//   initialState?: {
//     apollo?: {
//       data: object;
//     };
//   };
// }

const createComponentWithData = Component =>
    class DataWrapper extends React.Component {
        static async getInitialProps(ctx) {
            const props = {
                url: { query: ctx.query, pathname: ctx.pathname },
                ...(await (Component.getInitialProps
                    ? Component.getInitialProps(ctx)
                    : {})),
            };

            return {
                ...props,
            };
        }

        constructor(props) {
            super(props);
        }

        UNSAFE_componentWillMount() {
            if (isBrowser) {
                // Polyfill in intersection-observer so that infinite scrolling and lazy
                //  loading work later in the tree for older browsers.
                require("intersection-observer");
            }
        }

        componentDidMount() {
            // TODO: one day add service worker
            // if (navigator.serviceWorker) {
            //   navigator.serviceWorker
            //     .register("/service-worker.js")
            //     .then(() => {
            //       console.log("service worker registration successful");
            //     })
            //     .catch(err => {
            //       console.warn("service worker registration failed", err.message);
            //     });
            // }
        }

        render() {
            return <Component {...this.props} />;
        }
    };

export default createComponentWithData;

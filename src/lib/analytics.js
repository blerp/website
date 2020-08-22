import * as ReactGA from "react-ga";

import projectConfig from "../config";
const GA_TRACKING_ID = projectConfig.googleTrackingId;

// https://github.com/react-ga/react-ga
export const initGA = () => {
    ReactGA.initialize(GA_TRACKING_ID);
};

export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = "", action = "", label = "", value = 0) => {
    if (category && action) {
        ReactGA.event({ category, action, label, value });
    }
};

export const logException = (description = "", fatal = false) => {
    if (description) {
        ReactGA.exception({ description, fatal });
    }
};

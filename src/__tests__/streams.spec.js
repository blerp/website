// import React from "react";
// import { render } from "@testing-library/react";
// import Page from "../pages/streamers";
// import { Themes } from "@blerp/design";
// import { colors } from "../components/theme/Theme";
// import { ThemeProvider } from "styled-components";
// import { MockedProvider } from "@apollo/react-testing";
// import { mount, shallow, configure } from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
// import toJson from "enzyme-to-json";
// import LoadingFullScreen from "../components/loading/loading-full-screen";

// configure({ adapter: new Adapter() });

// const themeMock = {
//     colors: colors,
//     mode: "light",
// };

// const ThemeProviderWrapper = ({ children }) => (
//     <ThemeProvider theme={themeMock}>{children}</ThemeProvider>
// );

// describe("Streamer Page", () => {
//     it("Renders the component", () => {
//         expect(true).toEqual(true);
//     });
// });
describe("Pages", () => {
    describe("Index", () => {
        it("sanity check", () => {
            expect(1 + 1).toBe(2);
        });
    });
});

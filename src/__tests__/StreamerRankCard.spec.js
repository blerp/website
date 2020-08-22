// import React from "react";
// import { render } from "@testing-library/react";
// import StreamerRankCard from "../components/shared/Streams/StreamerRankCard";
// import "jest-styled-components";
// import { ThemeProvider } from "styled-components";
// import { mount, shallow, configure } from "enzyme";
// import colors from "../components/theme/colors";
// import Adapter from "enzyme-adapter-react-16";

// configure({ adapter: new Adapter() });

// const themeMock = {
//     colors: colors,
//     mode: "light",
// };

// const ThemeProviderWrapper = ({ children }) => (
//     <ThemeProvider theme={themeMock}>{children}</ThemeProvider>
// );

// describe("StreamerRankCard", () => {
//     it("Renders the component", () => {
//         const { container, getByText } = render(
//             <ThemeProviderWrapper>
//                 <StreamerRankCard />
//             </ThemeProviderWrapper>,
//         );
//         expect(container).toMatchSnapshot();
//     });

//     it("Renders the component with props", () => {
//         const { container, getByText } = render(
//             <ThemeProviderWrapper>
//                 <StreamerRankCard
//                     rank={20}
//                     username='randbo'
//                     streamImage=''
//                     userId='1'
//                 />
//             </ThemeProviderWrapper>,
//         );
//         expect(container).toMatchSnapshot();
//     });

//     it("Renders different css for different ranks", () => {
//         const rank1 = shallow(
//             <ThemeProviderWrapper>
//                 <StreamerRankCard
//                     rank={1}
//                     username='randbo'
//                     streamImage=''
//                     userId='1'
//                 />
//             </ThemeProviderWrapper>,
//         );

//         expect(rank1).toMatchSnapshot();

//         const rank2 = shallow(
//             <ThemeProviderWrapper>
//                 <StreamerRankCard
//                     rank={2}
//                     username='randbo'
//                     streamImage=''
//                     userId='1'
//                 />
//             </ThemeProviderWrapper>,
//         );

//         expect(rank2).toMatchSnapshot();

//         const rank3 = shallow(
//             <ThemeProviderWrapper>
//                 <StreamerRankCard
//                     rank={3}
//                     username='randbo'
//                     streamImage=''
//                     userId='1'
//                 />
//             </ThemeProviderWrapper>,
//         );

//         expect(rank3).toMatchSnapshot();

//         const normal = shallow(
//             <ThemeProviderWrapper>
//                 <StreamerRankCard
//                     rank={12}
//                     username='randbo'
//                     streamImage=''
//                     userId='1'
//                 />
//             </ThemeProviderWrapper>,
//         );

//         expect(normal).toMatchSnapshot();
//     });
// });

describe("Pages", () => {
    describe("Index", () => {
        it("sanity check", () => {
            expect(1 + 1).toBe(2);
        });
    });
});

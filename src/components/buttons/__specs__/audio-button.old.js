// /*
//  * BLERP LLC ("BLERP") CONFIDENTIAL
//  * Copyright (c) 2017 Blerp LLC All Rights Reserved.
//  * This file is subject to the terms and conditions defined in the file 'LICENSE',
//  *   which is at the root directory of this source code repository.
//  */
// import { ApolloProvider } from "react-apollo";
//
// import { mount, shallow } from "enzyme";
// import * as React from "react";
// import AudioButton, { ButtonModes } from "../audio-button";
//
// import { initClient } from "../../../lib/apolloClient";
//
// const client = initClient();
//
// const defaultProps = () => {
//   return {
//     className: "",
//     durationChangeCallback: () => {},
//     endTime: 0,
//     mode: ButtonModes.play,
//     sources: [],
//     startTime: 0,
//     stopCallBack: () => {},
//     timeUpdateCallback: () => {}
//   };
// };
//
// describe("Audio Play Button Component", () => {
//   it("matches snapshot", () => {
//     const props = defaultProps();
//     const render = shallow(
//       <ApolloProvider client={client}>
//         <AudioButton {...props} />
//       </ApolloProvider>
//     );
//     expect(render).toMatchSnapshot();
//   });
//
//   it("renders audio tag correctly", () => {
//     const props = defaultProps();
//     const render = mount(
//       <ApolloProvider client={client}>
//         <AudioButton {...props} />
//       </ApolloProvider>
//     );
//     const component = render.find("audio");
//     expect(component.length).toBe(1);
//   });
//
//   //   it("calls updateTimeCallback correctly", () => {
//   //     const props = defaultProps();
//   //     props.timeUpdateCallback = jest.fn();
//   //     const render = mount(<AudioButton {...props} />);
//   //     const instance = render.instance();
//   //     instance.onTimeUpdate();
//   //     expect(props.timeUpdateCallback.mock.calls.length).toBe(1);
//   //   });
//   //
//   //   it("calls durationChangeCallback correctly", () => {
//   //     const props = defaultProps();
//   //     props.durationChangeCallback = jest.fn();
//   //     const render = mount(<AudioButton {...props} />);
//   //     const instance = render.instance();
//   //     instance.onDurationChange();
//   //     expect(props.durationChangeCallback.mock.calls.length).toBe(1);
//   //   });
//   //
//   //   it("pressing button ones plays and twice stops state", () => {
//   //     const props = defaultProps();
//   //     const render = mount(<AudioButton {...props} />);
//   //     const instance = render.instance();
//   //     expect(render.state().isPlaying).toBe(false);
//   //     instance.handleAudioClicks();
//   //     expect(render.state().isPlaying).toBe(true);
//   //     instance.handleAudioClicks();
//   //     expect(render.state().isPlaying).toBe(false);
//   //   });
//   // });
//   //
//   // describe("Spam Button Component", () => {
//   //   it("renders audio tag correctly", () => {
//   //     const props = defaultProps();
//   //     props.mode = ButtonModes.spam;
//   //     const render = shallow(<AudioButton {...props} />);
//   //     const component = render.find("audio");
//   //     expect(component.length).toBe(1);
//   //   });
//   //
//   //   it("pressing button once and twice keeps playing state", () => {
//   //     const props = defaultProps();
//   //     props.mode = ButtonModes.spam;
//   //     const render = mount(<AudioButton {...props} />);
//   //     const instance = render.instance();
//   //     expect(render.state().isPlaying).toBe(false);
//   //     instance.handleAudioClicks();
//   //     expect(render.state().isPlaying).toBe(true);
//   //     instance.handleAudioClicks();
//   //     expect(render.state().isPlaying).toBe(true);
//   //   });
//   // });
//   //
//   // describe("Repeat Button Component", () => {
//   //   it("matches snapshot", () => {
//   //     const props = defaultProps();
//   //     props.mode = ButtonModes.repeat;
//   //     const render = mount(<AudioButton {...props} />);
//   //     expect(render).toMatchSnapshot();
//   //   });
//   //
//   //   it("pressing button zero, one, and two times stays on play", () => {
//   //     const props = defaultProps();
//   //     props.mode = ButtonModes.repeat;
//   //     const render = mount(<AudioButton {...props} />);
//   //     const instance = render.instance();
//   //     expect(render.state().isPlaying).toBe(true);
//   //     instance.handleAudioClicks();
//   //     expect(render.state().isPlaying).toBe(true);
//   //     instance.handleAudioClicks();
//   //     expect(render.state().isPlaying).toBe(true);
//   //   });
// });

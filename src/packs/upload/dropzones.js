import * as React from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";

export const canUseDOM = () =>
    !!(
        typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
    );

export const ImageDropzone = canUseDOM()
    ? styled(Dropzone)`
          height: 160px;
          width: 160px;
          margin: 16px 0;
          background-color: ${props => props.color || "#ff0000"};
          background-image: ${props => `url(${props.imageURL})` || "none"};
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          border-radius: 6px;
          cursor: pointer;
      `
    : props => <div>"Loading"</div>;

export const NewImageDropzone = canUseDOM()
    ? styled(Dropzone)`
          height: 200px;
          width: 200px;
          margin: 10px;
          background-color: ${props => props.color || "#ff0000"};
          background-image: ${props => `url(${props.imageURL})` || "none"};
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          border-radius: 6px;
          cursor: pointer;
      `
    : props => <div>"Loading"</div>;

export const SoundDropzone = canUseDOM()
    ? styled(Dropzone)`
          background-image: url("https://storage.googleapis.com/blerp-public-images/interaction/upload_icon_line.svg");
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          margin: 40px;
          width: 200px;
          height: 200px;
          flex-grow: 2;
          flex-shrink: 0;
          border: none;
          transition: all 0.1s ease 0s;
          cursor: pointer;

          &:hover {
              background-image: url("https://storage.googleapis.com/blerp-public-images/interaction/upload_icon.svg");
          }
      `
    : props => <div>"Loading"</div>;

const Dropzones = {
    canUseDOM,
    SoundDropzone,
    ImageDropzone,
};

export default Dropzones;

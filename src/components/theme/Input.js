import styled from "styled-components";
import theme from "styled-theming";
import colors from "./colors";

const inputBorderRadius = theme.variants("mode", "rounding", {
    none: { light: "0px", dark: "0px" },
    square: { light: "4px", dark: "4px" },
    round: { light: "20px", dark: "20px" },
});

const inputFontSize = theme.variants("mode", "fontSize", {
    small: { light: "16px", dark: "16px" },
    default: { light: "24px", dark: "24px" },
    big: { light: "32px", dark: "32px" },
});

const inputFluid = theme.variants("mode", "fluid", {
    true: {
        light: "width: 98%; width: -webkit-fill-available; margin: 0 auto;",
        dark: "width: 98%; width: -webkit-fill-available; margin: 0 auto;",
    },
    false: { light: "width: auto;", dark: "width: auto;" },
});

export const Input = styled.input`
    font-family: inherit;
    background-color: transparent;
    color: ${colors.grey4};
    border: none;
    border-bottom: 2px solid ${colors.grey3};
    border-radius: ${inputBorderRadius};
    font-size: ${inputFontSize};
    transition: 0.2s;

    &::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: ${colors.grey3};
    }

    &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: ${colors.grey3};
    }

    &::-ms-input-placeholder {
        /* Microsoft Edge */
        color: ${colors.grey3};
    }

    &:focus {
        outline: none !important;
        border: none !important;
        color: ${colors.notBlack} !important;
        border-radius: 0 !important;
        border-bottom: 2px solid ${colors.notBlack} !important;
    }
`;

export const InputArea = styled.textarea`
    font-family: inherit;
    background-color: ${colors.white};
    color: ${colors.grey3};
    border: none;
    border-radius: 8px;
    font-size: ${inputFontSize};
    transition: 0.2s;
    padding: 10px;
    resize: none;

    &::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: ${colors.grey3};
    }

    &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: ${colors.grey3};
    }

    &::-ms-input-placeholder {
        /* Microsoft Edge */
        color: ${colors.grey3};
    }

    &:focus {
        color: ${colors.notBlack};
    }
`;

Input.defaultProps = {
    rounding: "default",
    fontSize: "default",
};

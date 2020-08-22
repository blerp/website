import styled, { css } from "styled-components";
import theme from "styled-theming";
import colors from "./colors";

const buttonBackgroundColor = theme.variants("mode", "color", {
    grey: { light: colors.grey3, dark: colors.grey3 },
    dark170D11: { light: colors.notBlack, dark: colors.notBlack },
    lightBlue: { light: colors.buntingBlue, dark: colors.buntingBlue },
    darkBlue: { light: colors.starling, dark: colors.starling },
    seafoam: { light: colors.seafoam, dark: colors.seafoam },
    yellow: { light: colors.popnYellow, dark: colors.popnYellow },
    red: { light: colors.ibisRed, dark: colors.ibisRed },
    invisible: { light: "transparent", dark: "transparent" },
});

const buttonTextColor = theme.variants("mode", "fontColor", {
    white: { light: colors.white, dark: colors.white },
    grey: { light: colors.grey3, dark: colors.grey3 },
    dark170D11: { light: colors.notBlack, dark: colors.notBlack },
    lightBlue: { light: colors.buntingBlue, dark: colors.buntingBlue },
    darkBlue: { light: colors.starling, dark: colors.starling },
    seafoam: { light: colors.seafoam, dark: colors.seafoam },
    yellow: { light: colors.popnYellow, dark: colors.popnYellow },
    red: { light: colors.ibisRed, dark: colors.ibisRed },
    invisible: { light: "transparent", dark: "transparent" },
});

const buttonBackgroundColorHover = theme.variants("mode", "hoverColor", {
    white: { light: colors.white, dark: colors.white },
    grey: { light: colors.grey3, dark: colors.grey3 },
    dark170D11: { light: colors.notBlack, dark: colors.notBlack },
    lightBlue: { light: colors.buntingBlue, dark: colors.buntingBlue },
    darkBlue: { light: colors.starling, dark: colors.starling },
    seafoam: { light: colors.seafoam, dark: colors.seafoam },
    yellow: { light: colors.popnYellow, dark: colors.popnYellow },
    red: { light: colors.ibisRed, dark: colors.ibisRed },
    invisible: { light: "transparent", dark: "transparent" },
});

const buttonBorderRadius = theme.variants("mode", "rounding", {
    square: { light: "border-radius: .25em;", dark: "border-radius: .25em;" },
    round: { light: "border-radius: 20px;", dark: "border-radius: 20px;" },
});

const buttonFontSize = theme.variants("mode", "fontSize", {
    small: { light: "12px", dark: "12px" },
    default: { light: "15px", dark: "15px" },
    big: { light: "20px", dark: "20px" },
});

const buttonActiveColor = theme.variants("mode", "activeColor", {
    grey: { light: colors.grey3, dark: colors.grey3 },
    dark170D11: { light: colors.notBlack, dark: colors.notBlack },
    lightBlue: { light: colors.buntingBlue, dark: colors.buntingBlue },
    darkBlue: { light: colors.starling, dark: colors.starling },
    seafoam: { light: colors.seafoam, dark: colors.seafoam },
    yellow: { light: colors.popnYellow, dark: colors.popnYellow },
    red: { light: colors.ibisRed, dark: colors.ibisRed },
    invisible: { light: "transparent", dark: "transparent" },
});

const buttonTypes = theme.variants("mode", "buttonType", {
    primary: {
        light: css`
      display: flex;
      padding: 0.5em 1em;
      border: none;
      color: ${colors.white};
      background-color: ${colors.ibisRed};
      background-color: ${props => (props.active ? colors.ibisRed : "")};
      ${buttonBorderRadius} font-size: ${buttonFontSize};
      cursor: pointer;
      border: 2px solid transparent;
      transition: 0.2s;
      align-items: center;
      ${props =>
          props.center
              ? `
        justify-self: center;
        align-self: center;
      `
              : ``} &:hover {
        border: 2px solid ${colors.ibisRed};
        color: ${colors.ibisRed};
        background-color: transparent;
      }

      &:focus {
        border: 2px solid ${colors.ibisRed} !important;
      }
    `,
        dark: css``,
    },
    secondary: {
        light: css`
      display: flex;
      padding: 0.5em 1em;
      border: none;
      color: ${colors.secondaryButtonDarkGrey};
      border: 2px solid ${colors.secondaryButtonDarkGrey};
      background-color: transparent;
      background-color: ${props => (props.active ? colors.grey : "")};
      ${buttonBorderRadius} font-size: ${buttonFontSize};
      cursor: pointer;
      transition: 0.2s;
      align-items: center;
      ${props =>
          props.center
              ? `
        justify-self: center;
        align-self: center;
      `
              : ``} &:hover {
        border: 2px solid transparent;
        color: ${colors.white};
        background-color: ${colors.secondaryButtonGrey};
      }

      &:focus {
        border: 2px solid ${colors.secondaryButtonDarkGrey} !important;
      }
    `,
        dark: css``,
    },
    third: {
        light: css`
      display: flex;
      width: auto;
      padding: 0.5em 1em;
      border: none;
      color: ${colors.secondaryButtonDarkGrey};
      border: 2px solid transparent;
      background-color: transparent;
      ${buttonBorderRadius} font-size: ${buttonFontSize};
      cursor: pointer;
      transition: 0.2s;
      align-items: center;
      ${props =>
          props.center
              ? `
        justify-self: center;
        align-self: center;
      `
              : ``} &:hover {
        border: 2px solid transparent;
        background-color: ${colors.grey3};
      }

      &:focus {
        color: ${colors.white};
        background-color: ${colors.secondaryButtonGrey};
        border: 2px solid transparent !important;
      }
    `,
        dark: css``,
    },
    white: {
        light: css`
        display: flex;
        padding: 0.5em 1em;
        border: none;
        color: ${colors.white};
        border: 2px solid ${colors.white};
        background-color: transparent;
        ${buttonBorderRadius} font-size: ${buttonFontSize};
        cursor: pointer;
        transition: 0.2s;
        align-items: center;
        ${props =>
            props.center
                ? `
          justify-self: center;
          align-self: center;
        `
                : ``} &:hover {
          border: 2px solid transparent;
          color: ${colors.notBlack};
          background-color: ${colors.white};
        }
  
        &:focus {
          border: 2px solid ${colors.white} !important;
        }`,
        dark: ``,
    },
    custom: {
        light: css`
      display: flex;
      padding: 0.5em 1em;
      border: none;
      color: ${buttonTextColor};
      border: 2px solid transparent;
      background-color: ${buttonBackgroundColor};
      ${buttonBorderRadius} font-size: ${buttonFontSize};
      cursor: pointer;
      transition: 0.2s;
      align-items: center;
      ${props =>
          props.center
              ? `
        justify-self: center;
        align-self: center;
      `
              : ``} &:hover {
        border: 2px solid transparent;
        background-color: ${buttonBackgroundColorHover};
      }

      &:focus {
        background-color: ${buttonActiveColor};
        border: 2px solid transparent !important;
      }
    `,
        dark: css``,
    },
});

const Button = styled.button`
    ${buttonTypes};
`;

Button.defaultProps = {
    buttonType: "primary",
    color: "red",
    textColor: "white",
    rounding: "round",
    fontSize: "default",
    activeColor: "grey",
    hoverColor: "grey",
    center: true,
};

export default Button;

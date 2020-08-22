import styled from "styled-components";
import theme from "styled-theming";
import colors from "./colors";

const fontColor = theme.variants("mode", "fontColor", {
    white: { light: colors.white, dark: colors.white },
    waxing: { light: colors.waxing, dark: colors.waxing },
    grey2: { light: colors.grey2, dark: colors.grey2 },
    grey3: { light: colors.grey3, dark: colors.grey3 },
    grey4: { light: colors.grey4, dark: colors.grey4 },
    grey5: { light: colors.grey5, dark: colors.grey5 },
    grey6: { light: colors.grey6, dark: colors.grey6 },
    grey7: { light: colors.grey7, dark: colors.grey7 },
    notBlack: { light: colors.notBlack, dark: colors.notBlack },
});

const fontColorHover = theme.variants("mode", "fontColorHover", {
    white: { light: colors.white, dark: colors.white },
    waxing: { light: colors.waxing, dark: colors.waxing },
    grey2: { light: colors.grey2, dark: colors.grey2 },
    grey3: { light: colors.grey3, dark: colors.grey3 },
    grey4: { light: colors.grey4, dark: colors.grey4 },
    grey5: { light: colors.grey5, dark: colors.grey5 },
    grey6: { light: colors.grey6, dark: colors.grey6 },
    grey7: { light: colors.grey7, dark: colors.grey7 },
    notBlack: { light: colors.notBlack, dark: colors.notBlack },
    ibisRed: { light: colors.ibisRed, dark: colors.ibisRed },
    seafoam: { light: colors.seafoam, dark: colors.seafoam },
});

const fontWeight = theme.variants("mode", "fontWeight", {
    light: { light: "lighter", dark: "lighter" },
    normal: { light: "normal", dark: "normal" },
    bold: { light: "bold", dark: "bold" },
});

export const Text = styled.p`
    color: ${fontColor};
    font-weight: ${fontWeight};
    ${props => `
    font-size: ${props.fontSize};
  `} margin: 10px 0px;

    &:hover {
        color: ${fontColorHover};
    }
`;

Text.defaultProps = {
    fontSize: "24px",
    fontColor: "grey4",
    fontWeight: "normal",
};

export default Text;

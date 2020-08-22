import React, { useState } from "react";
import styled from "styled-components";
import theme from "styled-theming";
import colors from "./colors";

const textColor = theme.variants("mode", "color", {
    white: { light: colors.white, dark: colors.black170 },
    grey95: { light: colors.grey3, dark: colors.grey3 },
    black: { light: colors.notBlack, dark: colors.notBlack },
    lightBlue: { light: colors.buntingBlue, dark: colors.buntingBlue },
    darkBlue: { light: colors.starling, dark: colors.starling },
    seafoam: { light: colors.seafoam, dark: colors.seafoam },
    yellow: { light: colors.popnYellow, dark: colors.popnYellow },
    red: { light: colors.ibisRed, dark: colors.ibisRed },
});

const textActiveColor = theme.variants("mode", "activeColor", {
    white: { light: colors.white, dark: colors.black170 },
    lightBlue: { light: colors.buntingBlue, dark: colors.buntingBlue },
    darkBlue: { light: colors.starling, dark: colors.starling },
    seafoam: { light: colors.seafoam, dark: colors.seafoam },
    yellow: { light: colors.popnYellow, dark: colors.popnYellow },
    red: { light: colors.ibisRed, dark: colors.ibisRed },
});

const textWeight = theme.variants("mode", "textWeight", {
    light: { light: "font-weight: lighter;", dark: "font-weight: lighter;" },
    normal: { light: "font-weight: normal;", dark: "font-weight: normal;" },
    bold: { light: "font-weight: bold;", dark: "font-weight: bold;" },
});

const Text = styled.p`
    cursor: pointer;
    margin: 10px 0;
    padding: 0;
    color: ${props => (props.active ? textActiveColor : textColor)};
    font-weight: ${props => (props.active ? "bold !important" : "")};
    ${textWeight} &:hover {
        color: ${textActiveColor};
    }
`;

// Text.defaultProps = {
//     color: "black",
//     activeColor: "red",
//     textWeight: "light",
// };

const CategoryDropdownText = props => {
    const [active, setActive] = useState(props.active);

    return (
        <Text
            onClick={() => {
                if (props.onClick) {
                    props.onClick();
                }
                setActive(!active);
            }}
            active={active}
            activeColor='red'
            onHover={props.showExtra}
        >
            {props.children}
        </Text>
    );
};

export default CategoryDropdownText;

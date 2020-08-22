import styled from "styled-components";
import theme from "styled-theming";
import colors from "./colors";

const iconBackgroundColor = theme.variants("mode", "color", {
    invisible: { light: "transparent", dark: "transparent" },
    grey: { light: colors.grey3, dark: colors.grey3 },
});

const iconBackgroundColorHover = theme.variants("mode", "hoverColor", {
    lightGrey: { light: colors.grey3, dark: colors.grey3 },
    darkGrey: { light: colors.grey6, dark: colors.grey6 },
});

const iconSize = theme.variants("mode", "size", {
    tiny: { light: "8px", dark: "8px" },
    small: { light: "12px", dark: "12px" },
    medium: { light: "16px", dark: "16px" },
    big: { light: "24px", dark: "24px" },
    large: { light: "32px", dark: "32px" },
});

export const Icon = styled.div`
    font: inherit;
    width: ${iconSize};
    height: ${iconSize};
    border: none;
    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    background-size: ${iconSize};
    background-position: center;
    background-color: ${iconBackgroundColor};
    border-radius: 50%;
    padding: 7px;
    align-self: center;

    cursor: pointer;
    transition: 0.2s;

    ${props => (props.noHover ? `padding: 0 !important;` : ``)}

    &:focus {
        border: 0px !important;
    }

    &:hover {
        background-image: url(${props =>
            props.hoverUrl ? props.hoverUrl : props.url});
        background-color: ${props =>
            props.noHover ? "transparent" : iconBackgroundColorHover};
    }
`;

Icon.defaultProps = {
    color: "invisible",
    size: "medium",
    noHover: false,
};

export const FavoriteIcon = styled(Icon)`
    background-image: url(https://storage.googleapis.com/blerp_products/Web/Account/White%20heart.svg);
    background-color: ${props =>
        props.active ? props.theme.pandaPink : props.theme.lightGray};
    background-size: ${iconSize};
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 50%;
    transition: 0.2s;
    z-index: 1;
    justify-self: center;

    &:hover {
        padding: 10px;
        background: url(https://storage.googleapis.com/blerp_products/Web/Account/White%20heart.svg),
            linear-gradient(
                135deg,
                rgba(254, 41, 92, 1) 0%,
                rgba(53, 7, 180, 1) 100%
            );
        background-repeat: no-repeat;
        background-position: center;
        background-size: ${iconSize}, 100%;
        transition: 0.2s;
    }
`;

export const FavoriteIconBite = styled(Icon)`
    background: url(https://storage.googleapis.com/blerp_products/Web/Account/White%20heart.svg);
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
    padding: 10px;
    &:hover {
        padding: 20px;
        transform: scale(0.95);
        transition: 0s;
        background: url(https://storage.googleapis.com/blerp_products/Web/Account/White%20heart.svg),
            linear-gradient(
                135deg,
                rgba(254, 41, 92, 1) 0%,
                rgba(53, 7, 180, 1) 100%
            );
        background-repeat: no-repeat;
        background-position: center;
    }
    &:active {
        padding: 0px;
        transform: scale(1.1);
        transition: 0s;
        background: url(https://storage.googleapis.com/blerp_products/Web/Account/White%20heart.svg),
            linear-gradient(
                150deg,
                rgba(254, 41, 92, 1) 0%,
                rgba(53, 7, 180, 1) 100%
            );
        background-repeat: no-repeat;
        background-position: center;
    }
`;

import styled from "styled-components";
import { Icon } from "../theme/Icon";
import Modal from "../theme/GenericModal";
import Text from "../theme/Text";
import { Grid } from "../theme/Grid";
import { GenericModal } from "../theme/Theme";

export const FeaturedButtonLinkWhite = styled.a`
    font-weight: 600;
    letter-spacing: 1px;
    text-decoration: none;
    white-space: nowrap;
    border-radius: 40px;
    background-color: transparent;
    border-radius: 100px;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.flyoutBackground};
    border: 2px none ${props => props.theme.flyoutBackground};
    padding: 2px 8px;
    margin: 4px;
    display: flex;

    &:focus {
        border-radius: 40px;
        outline: 3px solid rgba(59, 119, 255, 1);
    }

    &:hover {
        color: ${props => props.theme.pandaPink};
        background-color: transparent;
        transition: all 0.2s ease 0s;
    }

    &:active {
        background-color: transparent;
        transition: all 0.2s ease 0s;
    }
`;

export const SecondaryFeaturedButtonLink = styled.a`
    font-weight: 600;
    letter-spacing: 1px;
    text-decoration: none;
    white-space: nowrap;
    border-radius: 40px;
    background-color: transparent;
    border-radius: 100px;
    align-items: center;
    color: ${props => props.theme.bodyText};
    border: 2px solid ${props => props.theme.bodyText};
    padding: 8px;

    &:focus {
        border-radius: 40px;
        outline: 3px solid rgba(59, 119, 255, 1);
    }

    &:hover {
        color: ${props => props.theme.pandaPink};
        background-color: transparent;
        transition: all 0.2s ease 0s;
    }

    &:active {
        background-color: transparent;
        transition: all 0.2s ease 0s;
    }
`;

export const MobileHamburgerMenu = styled.img`
    width: 32px;
    height: 32px;
    background-position: center;
    position: absolute;
    visibility: hidden;
    display: none;
    cursor: pointer;

    @media (max-width: 680px) {
        position: relative;
        visibility: visible;
        display: block;
    }
`;

export const UserProfile = styled.img`
    width: 32px;
    height: 32px;
    background-position: center;
    cursor: pointer;
`;

export const ButtonLink = styled.a`
    text-decoration: none;
    background: transparent;
    margin: 0 32px;
    padding: 0;
    pointer: cursor;

    &:hover {
        opacity: 0.7;
    }

    &:active {
        opacity: 0.9;
    }

    @media (max-width: 680px) {
        margin: 0;
    }
`;

export const Header = styled.header`
    width: 100%;
    position: sticky;
    top: 0;
    background-color: ${props => props.theme.colors.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    border-radius: 0;

    @media (min-width: 680px) {
        justify-content: center;
    }
`;

export const Logo = styled.img`
    height: 66%;
    margin: auto 20px;

    @media (max-width: 680px) {
        height: 56%;
        margin: auto 4px;
        ${({ visibleOnMobile }) =>
            visibleOnMobile
                ? "visibility: hidden;"
                : "position: absolute; visibility: hidden;"};
        display: none;
    }
`;

export const A = styled.a`
    height: 64px;
    display: inline-flex;

    @media (max-width: 680px) {
        visibility: hidden;
        display: none;
    }
`;

export const NavContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background-color: rgba(255, 255, 255, 1);
    width: 95%;

    @media (max-width: 680px) {
        justify-content: center;
    }
`;

export const ButtonContainer = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0 0 0 45px;
    width: 40%;

    @media (max-width: 680px) {
        position: absolute;
        visibility: hidden;
        display: none;
    }
`;

export const ButtonMobileHiddenContainer = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 680px) {
        position: absolute;
        visibility: hidden;
        display: none;
    }
`;

export const TinyIcon = styled.img`
    width: 28px;
    height: 28px;
    padding: 4px;
`;

export const Blockdiv = styled.div`
    padding: 4px;
`;

export const VisibleLinkMobileSearch = styled.div`
    width: 80%;

    @media (max-width: 680px) {
        position: relative;
        visibility: visible;
        display: block;
    }
`;

export const StyledNavText = styled(Text)`
    margin: 20px 0;
`;

export const StyledNavProfileText = styled(Text)`
    margin: 10xp 0;
    white-space: nowrap;
    color: ${props => props.theme.colors.notBlack};
`;

export const StyledModal = styled(GenericModal)`
    width: 800px;

    @media (max-width: 1200px) {
        width: 80%;
    }

    @media (max-width: 600px) {
        width: 100%;
        height: 100vh;
        overflow-y: scroll;
    }

    @media (max-width: 600px) ${Grid} {
        grid-template-columns: auto auto;
        height: 200px;
    }
`;

export const FeaturedButtonLink = styled.a`
    font-weight: 600;
    letter-spacing: 1px;
    text-decoration: none;
    white-space: nowrap;
    border-radius: 40px;
    background-color: transparent;
    border-radius: 100px;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.bodyText};
    border: 2px none ${props => props.theme.bodyText};
    padding: 2px 8px;
    margin: 4px;
    display: flex;

    &:focus {
        border-radius: 40px;
        outline: 0px solid rgba(59, 119, 255, 1) !important;
        border: 0px solid white !important;
    }

    &:hover {
        color: ${props => props.theme.pandaPink};
        background-color: transparent;
        transition: all 0.2s ease 0s;
    }

    &:active {
        background-color: transparent;
        transition: all 0.2s ease 0s;
    }

    &:hover ${StyledNavText} {
        color: ${props =>
            props.hoverColor === "seafoam"
                ? props.theme.colors.seafoam
                : props.theme.colors.ibisRed};

        border-bottom: 3px solid
            ${props =>
                props.hoverColor === "seafoam"
                    ? props.theme.colors.seafoam
                    : props.theme.colors.ibisRed};
        padding-bottom: 5px;
        transition: 0.2s;
    }

    &:hover ${Icon} {
        background-image: url(${props => props.hoverUrl});
    }
`;

export const MobileFeaturedButtonLink = styled.a`
    font-weight: 600;
    letter-spacing: 1px;
    text-decoration: none;
    white-space: nowrap;
    border-radius: 40px;
    background-color: transparent;
    border-radius: 100px;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.bodyText};
    border: 2px none ${props => props.theme.bodyText};
    padding: 0;
    margin: 0;
    display: flex;

    &:focus {
        border-radius: 40px;
        outline: 0px solid rgba(59, 119, 255, 1) !important;
        border: 0px solid white !important;
    }

    &:hover {
        color: ${props => props.theme.pandaPink};
        background-color: transparent;
        transition: all 0.2s ease 0s;
    }

    &:active {
        background-color: transparent;
        transition: all 0.2s ease 0s;
    }

    &:hover ${StyledNavText} {
        color: ${props =>
            props.hoverColor === "seafoam"
                ? props.theme.colors.seafoam
                : props.theme.colors.ibisRed};

        border-bottom: 3px solid
            ${props =>
                props.hoverColor === "seafoam"
                    ? props.theme.colors.seafoam
                    : props.theme.colors.ibisRed};
        padding-bottom: 5px;
        transition: 0.2s;
    }

    &:hover ${Icon} {
        background-image: url(${props => props.hoverUrl});
    }
`;

export const ProfileIcon = styled(Icon)`
    width: 30px;
    height: 30px;
    background-size: 120%;
    margin: 0 0 0 20px;
    border: 2px solid transparent;
    border-radius: 50%;

    &:hover {
        border: 2px solid ${props => props.theme.colors.ibisRed};
    }
`;

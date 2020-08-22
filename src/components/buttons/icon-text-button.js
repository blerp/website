import * as React from "react";
import styled from "styled-components";

import { pandaPink, primaryText, bodyText } from "../../styles/colors";

const StyleLink = styled.a`
    display: flex;
    flex-direction: row;
    padding: 0;
    justify-content: flex-start;
    background-color: ${props => {
        return props.backgroundColor ? props.backgroundColor : pandaPink;
    }};
    text-decoration: none;
    width: 280px;
    height: 48px;

    &:hover {
        opacity: 0.7;
    }
`;

const StyleButton = styled.button`
    display: flex;
    flex-direction: row;
    border: none;
    padding: 0;
    width: 280px;
    height: 48px;
    background-color: ${props => {
        return props.backgroundColor ? props.backgroundColor : pandaPink;
    }};

    &:hover {
        opacity: 0.7;
    }
`;

const SocialLogo = styled.img`
    opacity: 1;
    height: ${props => {
        return props.height ? props.height : "40px";
    }};
    background-color: ${props => {
        return props.iconColor ? props.iconColor : bodyText;
    }};
    border-radius: 6px 0 0 6px;
`;

const MainText = styled.div`
    color: ${props => {
        return props.color ? props.color : primaryText;
    }};
    margin: auto;
    font-size: 16px;
`;

const renderIcon = (props, key) => {
    return [
        <SocialLogo
            key={key}
            src={props.image}
            alt={props.alt}
            height={props.height}
            iconColor={props.iconColor}
        />,
        <MainText key={props.text} color={props.textColor}>
            {props.text}
        </MainText>,
    ];
};

const captureOutboundLink = function(url) {
    if (window.gtag) {
        window.gtag("event", "account_auth_start", {
            event_category: "login_goal",
            event_label: url,
            value: 1,
        });
    }
};

const IconTextButton = props => {
    if (props.link) {
        return (
            <StyleLink
                target='external'
                href={props.link}
                rel='nofollow'
                backgroundColor={props.backgroundColor}
                onClick={captureOutboundLink}
            >
                {renderIcon(props, 1)}
            </StyleLink>
        );
    } else {
        return (
            <StyleButton
                onClick={props.onClick}
                backgroundColor={props.backgroundColor}
            >
                {renderIcon(props, 2)}
            </StyleButton>
        );
    }
};

export default IconTextButton;

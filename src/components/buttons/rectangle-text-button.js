import * as React from "react";
import styled from "styled-components";

import {
    pandaPink,
    flyoutBackground,
    statusColor,
    placeholderText,
    primaryText,
    bodyText,
    focusOutline,
} from "../../styles/colors";

const StyleLink = styled.a`
    display: flex;
    flex-direction: row;
    padding: 0;
    justify-content: flex-start;
    background-color: ${props => {
        return props.backgroundColor ? props.backgroundColor : pandaPink;
    }};
    text-decoration: none;

    &:focus {
        border: none;
    }

    &:hover {
        opacity: 0.7;
    }
`;

const StyleButton = styled.button`
    display: flex;
    width: 100%;
    flex-direction: row;
    border: none;
    padding: 0;
    width: 280px;
    height: 48px;
    background-color: ${props => {
        return props.backgroundColor ? props.backgroundColor : pandaPink;
    }};

    &:focus {
        border: 2px solid
            ${props => {
                return props.backgroundColor === pandaPink
                    ? focusOutline
                    : focusOutline;
            }} !important;
        outline: 0 !important;
        box-shadow: none !important;
    }

    &:hover {
        opacity: 0.7;
    }
`;

const MainText = styled.div`
    color: ${props => {
        return props.color ? props.color : primaryText;
    }};
    margin: auto;
    font-size: 16px;
`;

const renderText = (props, key) => {
    return (
        <MainText key={key} color={props.textColor}>
            {props.text}
        </MainText>
    );
};

const RectangleTextButton = props => {
    if (props.link) {
        return (
            <StyleLink
                target='external'
                href={props.link}
                backgroundColor={props.backgroundColor}
            >
                {renderText(props, 1)}
            </StyleLink>
        );
    } else {
        return (
            <StyleButton
                onClick={props.onClick}
                backgroundColor={props.backgroundColor}
            >
                {renderText(props, 2)}
            </StyleButton>
        );
    }
};

export default RectangleTextButton;

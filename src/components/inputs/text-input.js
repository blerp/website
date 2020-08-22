import * as React from "react";
import styled from "styled-components";

import {
    pandaPink,
    flyoutBackground,
    statusColor,
    placeholderText,
    primaryText,
    bodyText,
} from "../../styles/colors";

const StyledWrapper = styled.div`
    background-color: ${props => props.theme.flyoutBackground};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4px;
    flex-direction: column;
    border-radius: 12px;
`;

const StyledInput = styled.input`
    background-color: ${props => props.theme.lighterBackground};
    border: ${props => {
            return props.theme.lighterBackground;
        }}
        2px
        ${props => {
            return props.errorMessage ? "none" : "solid";
        }};
    border-bottom: 2px
        ${props => {
            return props.errorMessage ? "solid" : "solid";
        }}
        ${props => {
            return props.errorMessage
                ? props.theme.statusColor
                : props.theme.lighterBackground;
        }};
    color: ${props => {
        return props.errorMessage
            ? props.theme.statusColor
            : props.theme.bodyText;
    }};
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 300;
    height: 48px;
    padding: 12px;
    position: relative;
    width: 280px;

    ::placeholder {
        font-weight: lighter;
        color: ${props => {
            return props.errorMessage
                ? props.theme.statusColor
                : props.theme.lightGray;
        }};
    }

    &:focus + .input-underline {
        transform: scale(1);
    }
`;

const StyledUnderline = styled.span`
    background-color: ${pandaPink};
    display: inline-block;
    height: 2px;
    left: 50px;
    margin-top: -4px;
    position: absolute;
    top: 185px;
    transform: scale(0, 1);
    transition: all 0.5s linear;
    width: 202px;
`;

const ErrorMessage = styled.div`
    color: ${statusColor};
`;

const TextInput = props => {
    return (
        <StyledWrapper className={props.className}>
            <StyledInput
                type={props.password ? "password" : "text"}
                placeholder={props.placeholder}
                onChange={props.onTextChange}
                errorMessage={props.errorMessage}
                value={props.value}
            />
            {/* <StyledUnderline className="input-underline" /> */}
            <ErrorMessage>{props.errorMessage}</ErrorMessage>
        </StyledWrapper>
    );
};

export default TextInput;

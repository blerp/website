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
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const StyledInput = styled.input`
    background-color: ${props => {
        return props.theme.flyoutBackground;
    }};
    border: ${props => {
            return props.theme.darkGray;
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
                : props.theme.darkGray;
        }};
    color: ${props => {
        return props.errorMessage
            ? props.theme.statusColor
            : props.theme.bodyText;
    }};
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 300;
    height: 36px;
    padding: 4px 12px;
    position: relative;

    &::placeholder {
        color: ${props => {
            return props.theme.darkGray;
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

const NextTextInput = props => {
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

export default NextTextInput;

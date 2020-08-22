import * as React from "react";
import styled from "styled-components";

import {
    pandaPink,
    flyoutBackground,
    statusColor,
    placeholderText,
    primaryText,
    bodyText,
    inputBorderColor,
    pandaTeal,
} from "../../styles/colors";

const StyledWrapper = styled.div`
    background-color: ${flyoutBackground};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4px;
    flex-direction: column;
    border-radius: 12px;
`;

const StyledInput = styled.input`
    background-color: transparent;
    border-bottom: 1px
        ${props => {
            return props.errorMessage ? "solid" : "none";
        }}
        ${props => {
            return props.errorMessage ? statusColor : placeholderText;
        }};
    color: ${props => {
        return props.errorMessage ? statusColor : bodyText;
    }};
    box-sizing: border-box;
    font-size: 18px;
    height: 48px;
    padding: 12px;
    position: relative;
    border: 2px solid ${inputBorderColor};
    caret-color: ${pandaTeal};
    border-radius: 12px;

    &::placeholder {
        color: ${props => {
            return props.errorMessage ? statusColor : placeholderText;
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

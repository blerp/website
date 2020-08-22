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
    background-color: ${flyoutBackground};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 12px;
    flex-direction: column;
`;

const StyledInput = styled.input`
    background-color: transparent;
    border: none;
    border-bottom: 1px solid
        ${props => {
            return props.errorMessage ? statusColor : placeholderText;
        }};
    color: ${props => {
        return props.errorMessage ? statusColor : bodyText;
    }};
    box-sizing: border-box;
    font-size: 18px;
    height: 50px;
    padding: 10px 0px;
    position: relative;
    width: 200px;

    &::placeholder {
        color: ${props => {
            return props.errorMessage ? statusColor : placeholderText;
        }};
    }

    &:focus + .input-underline {
        transform: scale(1);
    }
`;

const ErrorMessage = styled.div`
    color: ${statusColor};
`;

const Checkbox = props => {
    return (
        <StyledWrapper>
            <StyledInput
                type='checkbox'
                onChange={props.onTextChange}
                errorMessage={props.errorMessage}
                value={props.value}
            />
            <ErrorMessage>{props.errorMessage}</ErrorMessage>
        </StyledWrapper>
    );
};

export default Checkbox;

import * as React from "react";
import styled from "styled-components";

import { pandaPink, secondaryText } from "../../styles/colors";

const CircleImageButtonButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4px 40px;
    padding: 12px;
    text-decoration: none;
    color: ${secondaryText};
    border-radius: 120px;
    white-space: nowrap;
    background-color: ${props =>
        props.isSelected
            ? props.theme.circleIconButtonActive
            : props.theme.circleIconButtonBlue};
    border: none !important;
    border-radius: 120px;
    font-size: 14px;
    line-height: 14px;
    height: 60px;
    width: 60px;
    cursor: pointer;
    box-shadow: ${props =>
        props.isSelected ? `5px 5px 24px -5px rgba(0,0,0,0.3)` : "none"};

    &:focus {
        border-radius: 40px;
        outline: 0 !important;
        background-color: ${props =>
            props.isSelected
                ? props.theme.circleIconButtonHover
                : props.theme.circleIconButtonHover};
        border: none !important;
        box-shadow: none !important;
    }

    &:hover {
        transition: all 0.2s ease 0s;
        background-color: ${props =>
            props.isSelected
                ? props.theme.circleIconButtonHover
                : props.theme.circleIconButtonHover};
    }

    &:active {
        transition: all 0.2s ease 0s;
        background-color: ${props =>
            props.isSelected
                ? props.theme.circleIconButtonActive
                : props.theme.circleIconButtonActive};
    }

    @media (max-width: 600px) {
        margin: 4px 16px;
    }
`;

const IconImage = styled.img`
    width: 80%;
    height: 80%;
`;

const DefaultProps = {
    isSelected: false,
    iconImage: "",
    selectedIconImage: "",
    actionName: "DEFAULT",
};

class CircleImageButton extends React.Component {
    props = DefaultProps;
    state;
    constructor(props) {
        super(props);
    }
    onClick = () => {
        this.props.onClick({ actionName: this.props.actionName });
    };

    render() {
        return (
            <CircleImageButtonButton
                onClick={this.onClick}
                isSelected={this.props.isSelected}
            >
                <IconImage
                    alt={this.props.alt}
                    src={
                        this.props.isSelected
                            ? this.props.selectedIconImage
                            : this.props.iconImage
                    }
                />
            </CircleImageButtonButton>
        );
    }
}

export default CircleImageButton;

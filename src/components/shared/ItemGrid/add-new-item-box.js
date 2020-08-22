/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";

import styled from "styled-components";

import { randomBlerpColor } from "../../../lib/helperFunctions";
import { PlaceholderImage } from "../../bite/placeholder-image";

import Container from "../ContentContainer";

const Scrim = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${props =>
        props.darker ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.2)"};
    box-shadow: inset 0 0 70px 10px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    width: inherit;
    height: inherit;
    z-index: 2;
    border-radius: 6px;

    &:hover span {
        color: rgba(180, 180, 180, 1);
        transition: all 0.2s ease 0s;
    }

    &:hover {
        box-shadow: inset 0 0 70px 1em rgba(0, 0, 0, 1);
        transition: all 0.3s ease 0s;
    }
`;

const TitleSection = styled.span`
    font-size: 32px;
    font-weight: normal;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    display: box;

    &:active {
        color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

const AddButton = styled.button`
    width: inherit;
    height: inherit;
    padding: 0;
    margin: 0;
    text-decoration: none;
    background-color: transparent;
    border: none;
`;

// interface Props {
//   color?: string;
//   title: string;
//   imageUrl?: string;
//   onPlaceholderClick?: (index: number) => void;
//   index?: number;
// }

// interface State {
//   color: string;
// }

class AddNewItemBox extends React.Component {
    props;
    state;

    constructor(props) {
        super(props);
        this.state = {
            color: randomBlerpColor(),
        };
    }

    handlePlaceholderClicked = () => {
        if (this.props.onPlaceholderClick) {
            this.props.onPlaceholderClick(this.props.index);
        }
    };

    render() {
        return (
            <Container
                style={{
                    backgroundColor: this.state.color,
                }}
                role='listitem'
                title={this.props.title}
            >
                <PlaceholderImage backgroundColor={this.state.color} />
                <Scrim darker={false}>
                    <AddButton onClick={this.handlePlaceholderClicked}>
                        <TitleSection>{"+"}</TitleSection>
                    </AddButton>
                </Scrim>
            </Container>
        );
    }
}

export default AddNewItemBox;

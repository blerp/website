/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";

import { randomBlerpColor } from "../../lib/helperFunctions";

const Container = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    visibility: visible;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 1000;
    border-radius: 0;
    background-color: ${props => props.color};

    @media (max-width: 600px) {
        bottom: ${props => props.bottomPixels};
    }
`;

const Item = styled.div`
    font-weight: bold;
    padding: 8px 0;
    text-decoration: none;
    color: white;
    white-space: nowrap;
    text-align: center;
    border-radius: 0;
`;

const Blah = styled.img`
    align-self: center;
    white-space: nowrap;
    padding: 4px 8px;
    width: 30px;
`;

export default class LoadingScroll extends React.Component {
    props;
    backgroundColor;
    constructor(props) {
        super(props);
        this.backgroundColor = randomBlerpColor();
    }

    render() {
        return (
            <Container
                color={this.backgroundColor}
                bottomPixels={this.props.bottomPixels || "38px"}
            >
                {/* <Blah src="https://storage.googleapis.com/blerp-web-images/static/tiny-blah-smile.png" /> */}
                <Item>Loading!</Item>
            </Container>
        );
    }
}

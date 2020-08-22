/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";

const HoverImageButton = styled.div`
    background: url(${props => props.mainImage}) no-repeat;
    z-index: 1000;
    cursor: pointer;
    width: 100%;
    min-height: ${props => (props.minWidth ? props.minWidth : "40px")};
    align-self: center;
    background-position: center;

    &:hover {
        background: url(${props => props.hoverImage}) no-repeat;
        background-position: center;
    }
`;

class HomeHeader extends React.Component {
    props = {};
    constructor(props) {
        super(props);
    }

    onClick = () => {
        window.open(this.props.linkUrl, "_blank");
    };

    render() {
        return (
            <HoverImageButton
                minWidth={this.props.minWidth}
                onClick={this.onClick}
                mainImage={this.props.mainImage}
                hoverImage={this.props.hoverImage}
                alt={this.props.alt}
            />
        );
    }
}

export default HomeHeader;

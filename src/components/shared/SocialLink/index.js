/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import { withRouter } from "next/router";
import * as React from "react";
import styled from "styled-components";

import { randomBlerpColor } from "../../../lib/helperFunctions";

const MegaContainer = styled.div`
    display: flex;
    padding: 12px;
    flex-flow: column;
    align-content: center;
    justify-content: center;
    visibility: visible;
    bottom: 0;
    left: 0;
`;

const MainTitle = styled.div`
    font-weight: bold;
    font-size: 12px;
    text-align: center;
    color: black;
    margin: 6px;
`;

const Container = styled.div`
    display: flex;
    flex-flow: row;
    align-content: center;
    justify-content: center;
    visibility: visible;
    bottom: 0;
    left: 0;
`;

const StyleLink = styled.a``;

const SocialLogo = styled.img`
    width: 40px;
    height: 40px;
    padding: 4px;
    opacity: 1;

    &:hover {
        opacity: 0.7;
    }
`;

// interface Props {
//   className?: any;
//   biteAudioUrl?: string;
//   biteId?: string;
//   imageUrl: string;
//   altTag: string;
// }

export default class SocialLink extends React.Component {
    render() {
        return (
            <StyleLink
                target='external'
                href={this.props.biteAudioUrl}
                download={this.props.biteId || ""}
                className={this.props.className}
            >
                <SocialLogo src={this.props.imageUrl} alt={this.props.altTag} />
            </StyleLink>
        );
    }
}

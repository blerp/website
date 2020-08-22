/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 *
 * @flow
 */

import * as React from "react";
import styled from "styled-components";

import Link from "next/link";

const StyleDiv = styled.a`
    width: fit-content;
    margin: auto;
    color: #7abcff;
    text-decoration: none;
    text-align: center;

    &:hover {
        opacity: 0.7;
    }
`;

const BlerpMascot = styled.img`
    height: 100px;
    background-position: center;
    cursor: pointer;
    margin: 28px;
`;

const StyleImageText = styled.div`
    color: #7abcff;
`;

const StyleNoDataText = styled.div`
    color: ${props => {
        return props.night ? "#1d1d1d" : "#fff";
    }};
    font-size: 28px;
`;

// interface Props {
//   night?: boolean;
// }

const CustomMessage = props => (
    <div>
        <StyleNoDataText night={props.night}>{props.title}</StyleNoDataText>
        <Link prefetch={true} href={props.href}>
            <StyleDiv href={props.href}>
                <BlerpMascot src={props.imageUrl} alt={props.title} />
                <StyleImageText>{props.description}</StyleImageText>
            </StyleDiv>
        </Link>
    </div>
);
export default CustomMessage;

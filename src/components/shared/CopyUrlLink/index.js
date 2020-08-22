/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";

import { randomBlerpColor } from "../../../lib/helperFunctions";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    margin: 10px 40px;
`;

const CopyLink = styled.div`
    color: rgba(220, 220, 220, 1);
    background-color: #353a40;
    margin: 10px 40px;
    padding: 10px;
    user-select: all;
    overflow-wrap: break-word;
    border-radius: 6px;
`;

// interface Props {
//   url: string;
// }

export default class CopyUrlLink extends React.Component {
    backgroundColor;
    props;
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <CopyLink>{this.props.url}</CopyLink>
            </Container>
        );
    }
}

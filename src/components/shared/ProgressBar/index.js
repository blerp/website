/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";

function percentOf(a, b) {
    if (b === 0) {
        return "0";
    }
    return Math.round((a / b) * 100).toString();
}

const ProgressContainer = styled.div`
    width: 100%;
    background-color: #d4d4d4;
`;

const InnerBar = styled.div`
    width: ${props => percentOf(props.part, props.total)}%;
    position: relative;
    height: 24px;
    background-color: ${props => props.color};
    z-index: 100;
    pointer-events: none;
`;

// interface Props {
//   className?: string;
//   part: number;
//   onPlayClick: (event: any) => number | void;
//   total: number;
//   color: string;
// }

const ProgressBar = props => (
    <ProgressContainer onClick={props.onPlayClick} {...props}>
        <InnerBar color={props.color} part={props.part} total={props.total} />
    </ProgressContainer>
);

export default ProgressBar;

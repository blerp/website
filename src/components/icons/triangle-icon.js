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

const StyleSvg = styled.svg`
    margin-top: 1px;
    margin-left: 2px;
    height: 50%;
    opacity: 1;
`;

const TriangleIcon = props => (
    <StyleSvg className={props.className} viewBox='0 0 26.22 26.22'>
        <polygon
            strokeLinecap='round'
            stroke='#BEBEBC'
            fill='white'
            points='13.11 8 22.22 22.22 4 22.22 13.11 8'
            strokeLinejoin='round'
            strokeWidth='1'
        />
        <polygon
            stroke='white'
            fill='white'
            points='22.22 22.22 4 22.22 22.22 26.22 4 26.22'
            strokeLinejoin='round'
            strokeWidth='1'
        />
    </StyleSvg>
);

export default TriangleIcon;

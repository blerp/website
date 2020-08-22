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

const PlayIcon = () => (
    <StyleSvg viewBox='0 0 26.22 26.22'>
        <polygon
            strokeLinecap='round'
            stroke='white'
            fill='white'
            points='22.22 13.11 4 4 4 22.28 22.22 13.11'
            strokeLinejoin='round'
            strokeWidth='4'
        />
    </StyleSvg>
);

export default PlayIcon;

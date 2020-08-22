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
    margin-top: 2px;
    margin-left: 3px;
    height: 50%;

    opacity: 1;

    &:focus {
        border: none;
        outline: none;
    }
`;

const SpamIcon = () => (
    <StyleSvg viewBox='0 0 22.22 22.28'>
        <polygon
            points='22.22 11.14 0 0 0 22.28 22.22 11.14'
            fill='transparent'
            stroke='black'
            strokeWidth='3'
            strokeLinejoin='round'
        />
    </StyleSvg>
);

export default SpamIcon;

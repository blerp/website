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
    height: 50%;
    opacity: 1;

    &:focus {
        border: none;
        outline: none;
    }
`;

const StopIcon = () => (
    <StyleSvg viewBox='0 0 26.22 26.22'>
        <rect x='2' y='2' rx='4' ry='4' width='22.22' height='22.22' />
    </StyleSvg>
);

export default StopIcon;

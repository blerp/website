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

const IconImage = styled.img`
    width: 70%;
    height: 70%;
    align-self: center;
    white-space: nowrap;
`;
// src="https://storage.cloud.google.com/blerp_products/Web/Blerps/play%20on%20click.svg"

const NewStopIcon = () => (
    <IconImage
        src='https://storage.googleapis.com/blerp_products/Web/Blerps/stop%20white.svg'
        alt='stop audio icon'
    />
);

export default NewStopIcon;

/*
 * BLERP Inc. ("BLERP") CONFIDENTIAL
 * Copyright (c) 2018 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 *
 * @flow
 */

import * as React from "react";
import styled from "styled-components";

const IconImage = styled.img`
    width: 100%;
    height: 100%;
    align-self: center;
    white-space: nowrap;
`;

const LightCloseButton = props => (
    <IconImage
        className={props.className}
        src='https://storage.googleapis.com/blerp-public-images/twitch/white_close_button.svg'
        alt='x close button icon'
    />
);

export default LightCloseButton;

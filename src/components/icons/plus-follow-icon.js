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
    width: 100%;
    height: 100%;
    align-self: center;
    white-space: nowrap;
    background-color: transparent;
    fill: #fff;
    min-height: 24px;
    min-width: 24px;
`;

const PlusFollowIcon = props =>
    props.solid ? (
        <IconImage
            src='https://storage.googleapis.com/blerp_products/Web/x%20close%20on%20hover%20grey.svg'
            alt='blue heart selected icon'
        />
    ) : (
        <IconImage
            src='https://storage.googleapis.com/blerp_products/Web/x%20close.svg'
            alt='bluer heart unselected icon'
        />
    );

export default PlusFollowIcon;

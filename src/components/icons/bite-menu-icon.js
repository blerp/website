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
`;

const BiteMenuIcon = () => (
    <IconImage
        src='https://storage.googleapis.com/blerp_products/Web/Blerps/3%20dot%20white.svg'
        alt='share icon'
    />
);

export default BiteMenuIcon;

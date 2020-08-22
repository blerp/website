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
    width: 60%;
    height: 60%;
    align-self: center;
    white-space: nowrap;
    background-color: transparent;
    min-height: 16px;
    min-width: 16px;
`;

const HeartIconWhite = () => (
    <IconImage
        src='https://storage.googleapis.com/blerp_products/Web/Favicons/heart-white.svg'
        alt='selected white heart icon'
    />
);

export default HeartIconWhite;

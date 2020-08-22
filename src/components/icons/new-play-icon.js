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

const IconImage = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    padding-left: 5px;
    align-self: center;
    white-space: nowrap;
    background-image: url("https://storage.googleapis.com/blerp_products/Web/Blerps/play%20quiet.svg");
    background-repeat: no-repeat;
    background-position: 60% 50%;
`;

const NewPlayIcon = () => <IconImage className='bite-play-icons' />;

export default NewPlayIcon;

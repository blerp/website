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

const AddWhiteCircle = () => (
    <IconImage
        src='https://storage.googleapis.com/blerp-web-images/static/buttons/add-button-white-circle.svg'
        alt='add white circle icon'
    />
);

export default AddWhiteCircle;

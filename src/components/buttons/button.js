/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";

export default styled.button`
    background-color: rgba(255, 255, 255, 1);
    border: none;
    height: 32px;
    font-weight: bold;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 8px;

    &:hover {
        background-color: rgba(200, 200, 200, 1);
        transition: all 0.2s ease 0s;
    }

    &:active {
        background-color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

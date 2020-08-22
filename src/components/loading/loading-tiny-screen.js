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
import Loading from "./loading";

const LoadingContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const LoadingTinyScreen = () => (
    <LoadingContainer>
        <Loading />
    </LoadingContainer>
);

export default LoadingTinyScreen;

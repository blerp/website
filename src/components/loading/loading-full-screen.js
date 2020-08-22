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
    height: 640px;
    width: 100%;

    @media (max-width: 600px) {
        padding: 10px;
        height: 400px;
        width: 100%;
    }
`;

const isBrowser = typeof window !== "undefined";

const LoadingFullScreen = () => (
    <LoadingContainer>
        <Loading isMobile={isBrowser ? window.innerWidth < 600 : false} />
    </LoadingContainer>
);

export default LoadingFullScreen;

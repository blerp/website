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

import Link from "next/link";

const Container = styled.div`
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 30px;
`;

const StyleDiv = styled.a`
    width: fit-content;
    margin: auto;
    color: #7abcff;
    font-size: 30px;
    text-decoration: none;

    &:hover {
        opacity: 0.7;
    }
`;

const BlerpMascot = styled.img`
    height: 100px;
    background-position: center;
    cursor: pointer;
`;

const StyleImageText = styled.div`
    color: #7abcff;
    font-size: 30px;
`;

const StyleNoDataText = styled.div`
    color: ${props => {
        return props.night ? "1d1d1d" : "#fff";
    }};
    font-size: 60px;
`;

// interface Props {
//   night?: boolean;
// }

const ErrorMessage = props => (
    <Container>
        <StyleNoDataText night={props.night}>
            Something Bad Happened!
        </StyleNoDataText>
        <Link prefetch={true} href='/'>
            <StyleDiv href='/'>
                <BlerpMascot
                    src='https://storage.googleapis.com/blerp-web-images/static/sadblop.svg'
                    alt='Sad Blerp Background'
                />
                <StyleImageText>Take Us Home!</StyleImageText>
            </StyleDiv>
        </Link>
    </Container>
);
export default ErrorMessage;

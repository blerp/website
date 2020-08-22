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
    display: flex;
    text-align: center;
    flex-direction: column;
    padding: 64px;
    margin: 64px;
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
    color: white;
    font-size: 40px;
`;

const StyleSvg = styled.svg`
    height: 48%;
`;

const CreateBeatMessage = () => (
    <Container>
        <StyleNoDataText>You have no soundboards!</StyleNoDataText>
        <Link prefetch={true} href='/create-beat'>
            <StyleDiv href='/create-beat'>
                <BlerpMascot src='https://storage.googleapis.com/blerp-public-images/branding/BlerpyLeftCircleIbisRed.svg' />
                <StyleImageText>
                    However, you can go create one ;)
                </StyleImageText>
            </StyleDiv>
        </Link>
    </Container>
);
export default CreateBeatMessage;

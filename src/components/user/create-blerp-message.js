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
import { bodyText } from "../../styles/colors";

const Container = styled.div`
    display: flex;
    text-align: center;
    flex-direction: column;
    padding: 64px;
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
    margin: 16px;
`;

const StyleImageText = styled.div`
    color: #7abcff;
    font-size: 30px;
`;

const StyleNoDataText = styled.div`
    color: ${bodyText};
    font-size: 40px;

    @media (max-width: 600px) {
        margin-top: 50px;
    }
`;
const StyleSvg = styled.svg`
    height: 48%;
`;
const CreateBlerpMessage = () => (
    <Container>
        <StyleNoDataText>No blerps here yet!</StyleNoDataText>
        <Link prefetch={true} href='/upload'>
            <StyleDiv href='/upload'>
                <BlerpMascot src='https://storage.googleapis.com/blerp-public-images/branding/BlerpyLeftIbisRed.svg' />
                <StyleImageText>You can go create one ;)</StyleImageText>
            </StyleDiv>
        </Link>
    </Container>
);
export default CreateBlerpMessage;

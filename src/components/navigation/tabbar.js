/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import Link from "next/link";
import { withRouter } from "next/router";
import * as React from "react";
import styled from "styled-components";

import { lightGray } from "../../styles/colors";

const Container = styled.div`
    position: absolute;
    visibility: hidden;
    display: inline-flex;
    flex-grow: 1;

    @media (max-width: 600px) {
        visibility: visible;
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        z-index: 1200;
        background-color: rgb(33, 0, 12);
    }
`;

const Item = styled.a`
    font-weight: bold;
    padding: 10px 15px;
    text-decoration: none;
    color: white;
    white-space: nowrap;
    flex-grow: 1;
    text-align: center;
    border-radius: 0px;
    background-color: ${props => (props.onPage ? lightGray : "rgb(33, 0, 12)")};

    &:hover {
        color: rgba(200, 200, 200, 1);
        transition: all 0.2s ease 0s;
    }

    &:active {
        color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

const TabBar = withRouter(({ router }) => (
    <Container>
        <Link prefetch={true} href='/'>
            <Item href='/' onPage={router && router.route === "/"}>
                Browse
            </Item>
        </Link>
        <Link prefetch={true} href='/search'>
            <Item href='/search' onPage={router && router.route === "/search"}>
                Search
            </Item>
        </Link>
    </Container>
));

export default TabBar;

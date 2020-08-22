/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";

import BoardMaker from "../components/board/board-maker";
import withData from "../lib/withData";

const Container = styled.div`
    position: relative;
    font-weight: 300;
    padding: 0;
    margin: 0;
    width: 100%;
`;

const FooterContainer = styled.div`
    margin-top: 340px;
`;

class Page extends React.Component {
    state;
    props;

    render() {
        return (
            <Container>
                <Helmet />
                <NavBar displayButtons={true} />
                <BoardMaker />
                <FooterContainer>
                    <Footer />
                </FooterContainer>
            </Container>
        );
    }
}

export default withData(Page);

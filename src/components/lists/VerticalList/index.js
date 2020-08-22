/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */
import List from "@researchgate/react-intersection-list";

import { withRouter } from "next/router";
import * as React from "react";
import styled from "styled-components";

import { darkText } from "../../../styles/colors";

const ContentVerticalList = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const itemsRenderer = (items, ref) => (
    <ContentVerticalList ref={ref}>{items}</ContentVerticalList>
);

export default class VerticalList extends React.Component {
    props;

    render() {
        return (
            <List
                itemCount={this.props.length}
                itemsRenderer={itemsRenderer}
                onIntersection={this.props.listLoadMore}
                threshold={"60%"}
            >
                {this.props.renderListItems}
            </List>
        );
    }
}

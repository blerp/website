/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import List from "@researchgate/react-intersection-list";
import * as React from "react";
import styled from "styled-components";

import ItemTitleLink from "./item-title-link";
import AddNewItemBox from "./add-new-item-box";

const ContentContainerGrid = styled.div`
    display: grid;
    grid: minmax(auto, max-content) / repeat(auto-fill, 200px);
    grid-gap: 16px;
    justify-content: center;
    padding: 0 60px;

    @media (max-width: 600px) {
        grid: minmax(auto, max-content) / repeat(auto-fill, 89px);
        grid-gap: 12px;
        padding: 0;
    }
`;

const Container = styled.div`
    width: 100%;
    background-color: transparent;
`;

// interface Props {
//   items: any;
//   handleListLoadMore?: any;
//   addItemNavigation?: any;
//   itemType: any;
//   extraItem?: any;
// }

const itemsRenderer = (items, ref) => (
    <ContentContainerGrid
        ref={ref}
        innerRef={ref}
        role='region'
        aria-labelledby='recent'
    >
        {items}
    </ContentContainerGrid>
);

const ItemLinkGridView = props => (
    <Container>
        <List
            itemCount={
                props.extraItem ? props.items.length + 1 : props.items.length
            }
            itemsRenderer={itemsRenderer}
            onIntersection={props.handleListLoadMore}
            threshold={"30%"}
        >
            {(index, key) => {
                const item = props.items[index];
                if (item) {
                    return (
                        <ItemTitleLink
                            key={key}
                            id={item._id}
                            title={item.title}
                            color={item.color}
                            imageUrl={
                                (item.image && item.image.original.url) ||
                                (item.giphy && item.giphy.gif)
                            }
                            editable={false}
                            itemType={props.itemType}
                        />
                    );
                } else {
                    return (
                        <AddNewItemBox
                            key={key}
                            title='Go Create a List'
                            index={index}
                            onPlaceholderClick={props.addItemNavigation}
                        />
                    );
                }
            }}
        </List>
    </Container>
);

export default ItemLinkGridView;

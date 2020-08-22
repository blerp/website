/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import List from "@researchgate/react-intersection-list";
import * as React from "react";
import styled from "styled-components";
import Bite from "../bite";

import LoadingScroll from "../loading/loading-scroll";
import AddNewItemBox from "../shared/ItemGrid/add-new-item-box";
import ContentContainerGrid from "../shared/ContentContainerGrid";

const Container = styled.div`
    width: 100%;
    background-color: transparent;
`;

// interface Props {
//   networkStatus: any;
//   bites: any;
//   handleListLoadMore?: any;
//   addItemNavigation?: any;
//   mode?: any;
//   favoriteCallback?: any;
//   night?: boolean;
// }

const itemsRenderer = (items, ref) => (
    <ContentContainerGrid ref={ref} role='region' aria-labelledby='recent'>
        {items}
    </ContentContainerGrid>
);

const BitesGridView = props => (
    <Container>
        <List
            itemCount={props.bites.length}
            itemsRenderer={itemsRenderer}
            onIntersection={props.handleListLoadMore}
            threshold={"30%"}
        >
            {(index, key) => {
                const bite = props.bites[index];
                if (bite) {
                    return (
                        <Bite
                            key={bite._id}
                            id={bite._id}
                            title={bite.title}
                            audioSourceUrls={[bite.audio.mp3.url]}
                            color={bite.color}
                            image={
                                (bite.image && bite.image.original.url) ||
                                (bite.giphy && bite.giphy.gif)
                            }
                            favorited={bite.favorited}
                            playCount={bite.playCount}
                            featuredPage={props.featuredPage}
                            isFeaturedBite={true}
                            preload={true}
                            bite={bite}
                        />
                    );
                } else {
                    return (
                        <AddNewItemBox
                            key={key}
                            title='Click this placeholder to go to upload soundbite page'
                            index={index}
                            onPlaceholderClick={props.addItemNavigation}
                        />
                    );
                }
            }}
        </List>
        {props.networkStatus === 3 && <LoadingScroll />}
    </Container>
);

export default BitesGridView;

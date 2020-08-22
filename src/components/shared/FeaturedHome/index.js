/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import List from "@researchgate/react-intersection-list";
import * as React from "react";
import styled from "styled-components";
import Bite from "../../bite";

const FeaturedSuperContainer = styled.div`
    background-color: ${props => props.theme.flyoutBackground};
    padding: 0px 40px 24px;

    @media (max-width: 600px) {
        padding: 12px;
    }
`;

const FeaturedContainer = styled.div`
    background-color: ${props => props.theme.flyoutBackground};
    width: 100%;
`;

const ContentContainerGrid = styled.div`
    height: 460px;
    overflow: hidden;
    display: grid;
    grid: minmax(auto, max-content) / repeat(auto-fill, 160px);
    grid-gap: 16px;
    justify-content: center;
    padding: 0 60px 0 32px;

    @media (max-width: 600px) {
        height: 100%;
        grid: minmax(auto, max-content) / repeat(auto-fill, 160px);
        grid-gap: 12px;
        padding: 0;
    }
`;

const AllTheBitesContainer = styled.div`
    margin: 0 auto;
    max-width: 1400px;
    align-self: center;
    padding: 32px 0;
`;

const BiteContainer = styled.div`
    margin: 4px;
`;

const LeftNavigationButton = styled.button`
    width: 60px;
    height: 80%;
    position: absolute;
    align-self: center;
    z-index: 100;
    left: -30px;
    opacity: 0;
    border-radius: 0;
    border: none;

    &:focus {
        opacity: 0.4;
    }

    &:hover {
        opacity: 0.4;
    }

    &:active {
        opacity: 0.6;
    }
`;

const RightNavigationButton = styled.button`
    width: 60px;
    height: 80%;
    position: absolute;
    align-self: center;
    z-index: 100;
    right: -30px;
    opacity: 0;
    border-radius: 0;
    border: none;

    &:focus {
        opacity: 0.4;
    }

    &:hover {
        opacity: 0.4;
    }

    &:active {
        opacity: 0.6;
    }
`;

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(initialArray) {
    const array = initialArray.slice(0);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// interface State {
//   pageCount?: any;
//   currentPage?: any;
//   currentBites?: any;
// }

// interface Props {
//   defaultShowCount?: number;
//   bites?: any;
//   colored?: boolean;
//   featuredPage?: string;
// }

const itemsRenderer = (items, ref) => (
    <ContentContainerGrid ref={ref} role='region' aria-labelledby='recent'>
        {items}
    </ContentContainerGrid>
);

export default class FeaturedHome extends React.Component {
    state;
    props;

    constructor(props) {
        super(props);
        this.state = {
            currentBites: shuffleArray(props.bites)
                .filter(b => b.audienceRating !== "NC17")
                .filter(b => b.audienceRating !== "R"),
            currentPage: 0,
            pageCount: props.defaultShowCount || 10,
        };
    }

    widthToCount = width => {
        if (width < 360) {
            return 4;
        } else if (width < 720) {
            return 6;
        } else if (width < 1135) {
            return 8;
        } else if (width < 1235) {
            return 10;
        } else if (width < 1335) {
            return 12;
        } else {
            return 14;
        }
    };

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        if (window) {
            this.setState({
                pageCount: this.widthToCount(window.innerWidth),
            });
        }
    };

    onClickLeft = () => {
        let newIndex = this.state.currentPage - this.state.pageCount;
        if (newIndex < 0) {
            newIndex = newIndex + this.state.currentBites.length;
        }
        this.setState({ currentPage: newIndex });
    };

    onClickRight = () => {
        let newIndex = this.state.currentPage + this.state.pageCount;
        if (newIndex >= this.state.currentBites.length) {
            newIndex = newIndex - this.state.currentBites.length;
        }
        this.setState({ currentPage: newIndex });
    };

    transformToCorrectArray(currentBites, currentPage) {
        const startIndex = currentPage;
        const endIndex = startIndex + this.state.pageCount;
        if (endIndex >= this.state.currentBites.length) {
            const newEndIndex = endIndex - this.state.currentBites.length;
            return [
                ...currentBites.slice(
                    startIndex,
                    this.state.currentBites.length,
                ),
                ...currentBites.slice(0, newEndIndex),
            ];
        } else {
            return currentBites.slice(startIndex, endIndex);
        }
    }

    renderBite(bite) {
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
                featuredPage={this.props.featuredPage}
                isFeaturedBite={true}
                preload={true}
                bite={bite}
            />
        );
    }

    render() {
        return (
            <FeaturedSuperContainer>
                <FeaturedContainer>
                    <AllTheBitesContainer>
                        <List
                            itemsRenderer={itemsRenderer}
                            itemCount={this.state.pageCount}
                            threshold={"80%"}
                        >
                            {(index, _) => {
                                const bite = this.state.currentBites[index];
                                if (bite) {
                                    return this.renderBite(bite);
                                }
                            }}
                        </List>
                    </AllTheBitesContainer>
                </FeaturedContainer>
            </FeaturedSuperContainer>
        );
    }
}

/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */
import List from "@researchgate/react-intersection-list";

import Bite from "../../bite";

import { withRouter } from "next/router";
import * as React from "react";
import styled from "styled-components";

import { darkText, flyoutBackground, lightGray } from "../../../styles/colors";

const ContainerWithArrowButtons = styled.div`
    position: relative;
    overflow-y: hidden;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const OuterContentContainer = styled.div`
    position: relative;
    overflow-x: scroll;
    -ms-overflow-style: none;
    overflow-y: hidden;
    transition: 0.3s;
    display: ${props => (props.isCentered ? "flex" : "relative")};
    align-items: ${props => (props.isCentered ? "center" : "center")};
    justify-content: ${props => (props.isCentered ? "center" : "center")};

    &::-webkit-scrollbar {
        display: none;
    }
`;

const ForwardButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0;
    z-index: 1000;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    background-color: ${props => {
        return props.isGrayButton ? lightGray : flyoutBackground;
    }};
    border: none;
    opacity: 0.6;

    &:hover {
        opacity: 1;
    }

    &:focus {
        opacity: 1;
    }

    @media (max-width: 600px) {
    }
`;

const ForwardIcon = styled.div`
    position: relative;
    width: 20px;
    height: 20px;
    padding: 4px;
    margin: 4px;
    opacity: 1;
    background: url(${props => props.imageSrc}) center no-repeat;

    &:hover {
        opacity: 0.5;
        background: url(${props => props.hoverSrc}) center no-repeat;
    }
`;

const BackwardButton = styled.button`
    position: absolute;
    left: 0;
    z-index: 1000;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    background-color: ${props => {
        return props.isGrayButton ? lightGray : flyoutBackground;
    }};
    border-radius: 0;
    border: none;
    opacity: 0.6;

    &:hover {
        opacity: 1;
    }

    &:focus {
        opacity: 1;
    }

    @media (max-width: 600px) {
    }
`;

const BackwardIcon = styled.div`
    position: relative;
    width: 20px;
    height: 20px;
    padding: 4px;
    margin: 4px;
    opacity: 1;
    background: url(${props => props.imageSrc}) center no-repeat;

    &:hover {
        opacity: 0.5;
        background: url(${props => props.hoverSrc}) center no-repeat;
    }
`;

const InnerContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    padding: inherit;
    align-items: center;
    justify-content: center;
    width: max-content;
    padding: 0 40px;
`;

/*
Example of how it works ===========================

public renderTags = keywords => (index, key) => {
  const tag = keywords[index];
  if (tag) {
    return (
      <Link
        key={tag}
        prefetch={true}
        href={{
          pathname: "/search",
          query: { q: tag.split(" ").join("-") }
        }}
        as={`/search/${encodeURI(tag.split(" ").join("-"))}`}
      >
        <A key={tag} href={`/search/${encodeURI(tag.split(" ").join("-"))}`}>
          <StyledTag colored={true}>{`#${tag}`}</StyledTag>
        </A>
      </Link>
    );
  }
};

<HorizontalList
  length={
    ["working", "test", "items"].length
  }
  renderListItems={this.renderTags(
    ["working", "test", "items"]
  )}
  showArrows={true}
/>

*/
const SCROLL_SPEED = 30;
const CLICK_SPEED = 200;
const INVERAL_SPEED = 70;

export default class HorizontalList extends React.Component {
    props;
    scrollInterval;
    state = {
        scrollLeft: false,
        scrollRight: false,
    };

    scrollLeft = () => {
        this.horizontalScroll.scrollLeft -= CLICK_SPEED;
    };

    scrollRight = () => {
        this.horizontalScroll.scrollLeft += CLICK_SPEED;
    };

    scrollLeftSet = () => {
        this.scrollInterval = setInterval(() => {
            this.horizontalScroll.scrollLeft -= SCROLL_SPEED;
        }, INVERAL_SPEED);
        this.setState({ scrollLeft: true });
    };

    scrollRightSet = () => {
        this.scrollInterval = setInterval(() => {
            this.horizontalScroll.scrollLeft += SCROLL_SPEED;
        }, INVERAL_SPEED);
        this.setState({ scrollRight: true });
    };

    scrollExit = () => {
        clearInterval(this.scrollInterval);
        this.setState({ scrollLeft: false, scrollRight: false });
    };

    getScrollRowRef = el => {
        this.horizontalScroll = el;
    };

    itemsRenderer = (items, ref) => (
        <ContainerWithArrowButtons>
            {this.props.showArrows && (
                <BackwardButton
                    onClick={this.scrollLeft}
                    onMouseEnter={this.scrollLeftSet}
                    onMouseLeave={this.scrollExit}
                    onMouseUp={this.scrollExit}
                    onTouchStart={this.scrollLeftSet}
                    onTouchEnd={this.scrollExit}
                    isGrayButton={this.props.isGrayButton}
                >
                    <BackwardIcon
                        imageSrc='https://storage.googleapis.com/blerp-public-images/interaction/backward.svg'
                        hoverSrc='https://storage.googleapis.com/blerp-public-images/interaction/backward-pink.svg'
                    />
                </BackwardButton>
            )}
            <OuterContentContainer
                ref={this.getScrollRowRef}
                isCentered={this.props.isCentered}
            >
                <InnerContentContainer ref={ref}>{items}</InnerContentContainer>
            </OuterContentContainer>
            {this.props.showArrows && (
                <ForwardButton
                    onClick={this.scrollRight}
                    onMouseEnter={this.scrollRightSet}
                    onMouseLeave={this.scrollExit}
                    onMouseUp={this.scrollExit}
                    onTouchStart={this.scrollRightSet}
                    onTouchEnd={this.scrollExit}
                    isGrayButton={this.props.isGrayButton}
                >
                    <ForwardIcon
                        imageSrc='https://storage.googleapis.com/blerp-public-images/interaction/foward.svg'
                        hoverSrc='https://storage.googleapis.com/blerp-public-images/interaction/forward-pink.svg'
                    />
                </ForwardButton>
            )}
        </ContainerWithArrowButtons>
    );

    render() {
        return (
            <List
                itemCount={this.props.length}
                itemsRenderer={this.itemsRenderer}
                onIntersection={this.props.listLoadMore}
                threshold={"60%"}
            >
                {this.props.renderListItems}
            </List>
        );
    }
}

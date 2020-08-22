/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */
import List from "@researchgate/react-intersection-list";

import * as React from "react";
import styled, { withTheme } from "styled-components";

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
    border-radius: 40px;
    z-index: 1000;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    background-color: transparent;
    border: none;
    opacity: 1;
    cursor: pointer;

    &:hover {
        border-radius: 40px;
        opacity: 1;
    }

    &:focus {
        opacity: 1;
        border-radius: 40px;
        border: 2px solid ${props => props.theme.pandaPink}!important;
        outline: 0 !important;
        box-shadow: none !important;
    }

    @media (max-width: 600px) {
    }
`;

const ForwardIcon = styled.div`
    position: relative;
    width: 20px;
    height: 20px;
    opacity: 1;
    background: url(${props => props.imageSrc}) center no-repeat;

    &:hover {
        opacity: 0.5;
        background: url(${props => props.hoverSrc}) center no-repeat;
    }
`;

// background-color: ${(props) => {
//   return props.buttonColor ? props.buttonColor : props.isGrayButton ? props.theme.defaultBackground : props.theme.flyoutBackground;
// }};
const BackwardButton = styled.button`
    z-index: 1000;
    border-radius: 40px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    background-color: transparent;
    border-radius: 0;
    border: none;
    opacity: 1;
    cursor: pointer;

    &:hover {
        border-radius: 40px;
        opacity: 1;
    }

    &:focus {
        opacity: 1;
        border-radius: 40px;
        border: 2px solid ${props => props.theme.pandaPink}!important;
        outline: 0 !important;
        box-shadow: none !important;
    }

    @media (max-width: 600px) {
    }
`;

const BackwardIcon = styled.div`
    position: relative;
    width: 20px;
    height: 20px;
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
    align-items: ${props => (props.flexStart ? "flex-start" : "center")};
    justify-content: center;
    width: max-content;
`;

const ColumnContainer = styled.div``;

const CornerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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
const SCROLL_SPEED = 2;
const CLICK_SPEED = 240;
const INVERAL_SPEED = 50;

const ContainerTitle = styled.p`
    color: ${props => props.theme.headerColor};
    font-weight: 600;
    font-size: 20px;
    align-self: flex-start;
    text-decoration: none;
    margin: 8px;
`;

class HorizontalList extends React.Component {
    props;
    scrollInterval;
    horizontalScroll;
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
            <OuterContentContainer
                ref={this.getScrollRowRef}
                isCentered={this.props.isCentered}
            >
                <InnerContentContainer
                    flexStart={this.props.flexStart}
                    ref={ref}
                >
                    {items}
                </InnerContentContainer>
            </OuterContentContainer>
        </ContainerWithArrowButtons>
    );

    render() {
        return (
            <ColumnContainer>
                <CornerContainer>
                    <CornerContainer>
                        {this.props.title && (
                            <ContainerTitle>{this.props.title}</ContainerTitle>
                        )}
                    </CornerContainer>
                    <CornerContainer>
                        <BackwardButton
                            onClick={this.scrollLeft}
                            onMouseEnter={this.scrollLeftSet}
                            onMouseLeave={this.scrollExit}
                            onMouseUp={this.scrollExit}
                            onTouchStart={this.scrollLeftSet}
                            onTouchEnd={this.scrollExit}
                            isGrayButton={this.props.isGrayButton}
                            buttonColor={this.props.buttonColor}
                        >
                            <BackwardIcon
                                imageSrc='https://storage.googleapis.com/blerp-public-images/interaction/backward.svg'
                                hoverSrc='https://storage.googleapis.com/blerp-public-images/interaction/backward-pink.svg'
                            />
                        </BackwardButton>

                        <ForwardButton
                            onClick={this.scrollRight}
                            onMouseEnter={this.scrollRightSet}
                            onMouseLeave={this.scrollExit}
                            onMouseUp={this.scrollExit}
                            onTouchStart={this.scrollRightSet}
                            onTouchEnd={this.scrollExit}
                            isGrayButton={this.props.isGrayButton}
                            buttonColor={this.props.buttonColor}
                        >
                            <ForwardIcon
                                imageSrc='https://storage.googleapis.com/blerp-public-images/interaction/foward.svg'
                                hoverSrc='https://storage.googleapis.com/blerp-public-images/interaction/forward-pink.svg'
                            />
                        </ForwardButton>
                    </CornerContainer>
                </CornerContainer>

                <List
                    itemCount={this.props.length}
                    itemsRenderer={this.itemsRenderer}
                    onIntersection={this.props.listLoadMore}
                    threshold={"60%"}
                >
                    {this.props.renderListItems}
                </List>
            </ColumnContainer>
        );
    }
}

export default withTheme(HorizontalList);

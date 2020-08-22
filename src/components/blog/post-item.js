/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import Observer from "@researchgate/react-intersection-observer";
import Link from "next/link";
import * as React from "react";
import styled, { keyframes } from "styled-components";

import { randomBlerpColor } from "../../lib/helperFunctions";
import {
    darkBlue,
    darkText,
    secondaryText,
    secondaryGray,
} from "../../styles/colors";

import HorizontalList from "../lists/HorizontalList";
import Tag from "../shared/Tag";
import AudioButton, { ButtonModes } from "../buttons/data/wrapped-audio-button";

const StyledTag = styled(Tag)`
    margin: 4px;
`;

const animateIn = keyframes`
  0% {
    opacity: 0;
  }

  25% {
    opacity: 0.2;
  }

  50% {
    opacity: 0.6;
  }

  75% {
    opacity: 0.9;
  }

  100% {
    opacity: 1;
  }
`;

const TagsContainer = styled.div`
    position: absolute;
    flex-flow: row wrap;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
    overflow-x: scroll;
    bottom: 0;
    left: 20px;
    z-index: 1001;
    height: 48px;

    @media (max-width: 600px) {
        height: 40px;
        width: 80%;
    }
`;

const Container = styled.div`
    position: relative;
    border-radius: 8px;
    animation: ${animateIn} 0.4s 1;
    height: 220px;
    width: 600px;

    @media (max-width: 600px) {
        width: 100%;
        height: 200px;
    }
`;

const BackgroundImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    z-index: 1;
    border-radius: 8px;
    animation: ${animateIn} 0.4s 1;
`;

const BlogSupportingImage = styled.img`
    position: absolute;
    top: 60px;
    right: 8px;
    width: 60px;
    height: 60px;
    animation: ${animateIn} 0.4s 1;
    border-radius: 8px;
`;

const StyledAudioButton = styled(AudioButton)`
    overflow: hidden;
    background-color: ${secondaryGray};
    top: 60px;
    right: 8px;
    width: 68px;
    height: 68px;
    border-radius: 100px;
    border: none;
    position: absolute;
    z-index: 1000;

    @media (max-width: 600px) {
        width: 68px;
        height: 68px;
    }

    &:focus {
        opacity: 1;
        border: none !important;
    }
`;

const Scrim = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    z-index: 80;
    border-radius: 8px;
    animation: ${animateIn} 0.4s 1;

    &:hover span {
        color: rgba(180, 180, 180, 1);
        transition: all 0.2s ease 0s;
    }

    &:hover {
        box-shadow: inset 0 0 72px 1em rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease 0s;
    }
`;

const TitleTextContainer = styled.div`
    position: relative;
`;

const PostInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 8px;
    width: 90%;
    height: 90%;
    position: absolute;

    @media (max-width: 600px) {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        position: absolute;
        top: 0px;
    }
`;

const TitleTextLight = styled.div`
    font-family: Odudo;
    font-weight: light;
    text-align: left;
    overflow: hidden;
    flex-direction: row;
    font-size: 16px;
    color: ${secondaryText};
    text-overflow: ellipsis;
    display: box;
    z-index: 100;
    padding: 0 12px;
    margin: 0 16px;
    font-weight: lighter;

    @media (max-width: 600px) {
        font-size: 12px;
        font-size: 12px;
        height: initial;
    }
`;

const TitleText = styled.div`
    font-family: Odudo;
    font-weight: bold;
    text-align: left;
    width: 80%;
    overflow: hidden;
    flex-direction: row;
    font-size: 20px;
    color: ${darkText};
    text-overflow: ellipsis;
    display: box;
    z-index: 100;
    padding: 0 12px;
    margin: 16px;

    &:active {
        color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }

    @media (max-width: 600px) {
        font-size: 14px;
        font-size: 14px;
        height: initial;
    }
`;

const SrcTest = styled.div`
    flex-direction: row;
    font-size: 16px;
    text-align: center;
    color: ${darkBlue};
    text-overflow: ellipsis;
    display: box;
    line-height: 20px;
    z-index: 100;
    padding: 0 12px;
    font-weight: lighter;

    @media (max-width: 600px) {
        font-size: 12px;
        width: 80px;
        font-size: 12px;
        height: initial;
    }
`;

const TagLink = styled.a`
    text-decoration: none;
    color: inherit;
    border-radius: 10;
`;

const A = styled.a`
    cursor: pointer;
    height: 220px;
    width: 600px;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    animation: ${animateIn} 0.4s 1;
    font-weight: lighter;

    @media (max-width: 600px) {
        width: 320px;
        height: 200px;
    }
`;

// interface Props {
//   color?: string;
//   id?: string;
//   title?: string;
//   imageUrl?: string;
//   linkUrl?: string;
//   creator?: string;
//   pubDate?: string;
//   tags?: [string];
//   onTagClick?: any;
//   blogImage?: string;
//   blerp?: any;
// }

// interface State {
//   color: string;
//   observed: boolean;
// }

function formatDate(date) {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return day + " " + monthNames[monthIndex] + " " + year;
}

class PostItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: randomBlerpColor(),
            observed: false,
        };
    }

    hideErrorImage(i) {
        i.target.style.display = "none";
    }

    onClickTag = tag => event => {
        event.preventDefault();
        this.props.onTagClick(tag);
        return false;
    };

    renderTags = keywords => (index, key) => {
        const tag = keywords[index];
        if (tag) {
            return (
                <TagLink key={tag} href={`#`} onClick={this.onClickTag(tag)}>
                    <StyledTag colored={true}>{`#${tag}`}</StyledTag>
                </TagLink>
            );
        }
    };

    render() {
        return (
            <Observer onChange={this.handleIntersection}>
                <Container
                    style={{
                        backgroundColor: "#fff",
                    }}
                    role='listitem'
                    title={this.props.title}
                >
                    {this.state.observed ? (
                        <Scrim>
                            <Link
                                prefetch={true}
                                href={{
                                    pathname: "/post",
                                    query: { id: this.props.id },
                                }}
                                as={`/blog/post/${this.props.id}`}
                            >
                                <A href={`/blog/post/${this.props.id}`} />
                            </Link>
                        </Scrim>
                    ) : null}
                    {this.props.imageUrl && this.state.observed && (
                        <BackgroundImage
                            aria-hidden='true'
                            src={this.props.imageUrl || ""}
                            onError={this.hideErrorImage}
                        />
                    )}
                    <PostInfoContainer>
                        <TitleTextContainer>
                            <TitleText>{this.props.title}</TitleText>
                            <TitleTextLight>{`Published: ${formatDate(
                                new Date(this.props.pubDate),
                            )}`}</TitleTextLight>
                            <TitleTextLight>{`Author: ${this.props.creator}`}</TitleTextLight>
                        </TitleTextContainer>
                        {this.props.blerp ? (
                            <StyledAudioButton
                                title={this.props.blerp.title}
                                biteId={this.props.blerp._id}
                                sources={[
                                    this.props.blerp.audio &&
                                        this.props.blerp.audio.mp3.url,
                                ]}
                                preload={true}
                                showButton={true}
                                handleIncrementPlayCount={() => {}}
                                mode={ButtonModes.play}
                                useGlobalAudio={true}
                                featuredPage={"Blog"}
                            />
                        ) : (
                            <BlogSupportingImage
                                src={
                                    this.props.blogImage ||
                                    "https://storage.googleapis.com/blerp-main-bucket/images/default2-a89e-4a33-8a26-4fff77cd9607.png"
                                }
                                alt='Main Blog Post Image'
                            />
                        )}
                        <TagsContainer>
                            <HorizontalList
                                length={this.props.tags.length}
                                renderListItems={this.renderTags(
                                    this.props.tags,
                                )}
                                showArrows={true}
                            />
                        </TagsContainer>
                    </PostInfoContainer>
                </Container>
            </Observer>
        );
    }

    handleIntersection = event => {
        this.setState({ observed: event.isIntersecting });
    };
}

export default PostItem;

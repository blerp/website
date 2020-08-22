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
import DeleteBoardButton from "../buttons/DeleteBoardButton";

import { randomBlerpColor } from "../../lib/helperFunctions";
import {
    flyoutBackground,
    iconsInActive,
    bodyText,
    headerBackground,
} from "../../styles/colors";

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

const Container = styled.div`
    width: 280px;
    height: 202px;
    position: relative;
    border-radius: 8px;
    animation: ${animateIn} 0.4s 1;

    @media (max-width: 600px) {
        width: 100px;
        height: 70px;
    }
`;

const BackgroundImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 280px;
    height: 202px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    z-index: 1;
    border-radius: 8px;
    animation: ${animateIn} 0.4s 1;

    @media (max-width: 600px) {
        width: 100px;
        height: 70px;
    }
`;

// &:hover span {
//   color: rgba(180, 180, 180, 1);
//   transition: all 0.2s ease 0s;
// }

// &:hover {
//   box-shadow: inset 0 0 70px 1em rgba(0, 0, 0, 1);
//   transition: all 0.3s ease 0s;
// }

const Scrim = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 280px;
    height: 202px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props =>
        props.darker ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0)"};
    box-shadow: inset 0 0 70px 10px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    z-index: 80;
    border-radius: 8px;
    animation: ${animateIn} 0.4s 1;

    @media (max-width: 600px) {
        width: 100px;
        height: 70px;
    }
`;

const TitleSection = styled.div`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    background-color: rgba(89, 88, 82, 0.6);
    border-radius: 0 0 8px 8px;
    display: flex;
    width: 100%;
    overflow: hidden;
    height: 40px;

    @media (max-width: 600px) {
        height: 40px;
    }
`;

const TitleText = styled.h1`
    padding: 0;
    overflow: hidden;
    flex-direction: row;
    width: 200px;
    max-height: 48px;
    font-size: 20px;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    text-overflow: ellipsis;
    display: box;
    line-height: 24px;
    z-index: 100;
    padding: 0 12px;
    font-weight: 600;

    @media (max-width: 600px) {
        font-size: 12px;
        width: 80px;
        font-size: 12px;
        height: initial;
    }
`;

const A = styled.a`
    cursor: pointer;
    width: 280px;
    height: 202px;
    padding: 12px 0;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    animation: ${animateIn} 0.4s 1;
    font-weight: lighter;

    @media (max-width: 600px) {
        width: 100px;
        height: 70px;
    }
`;

const StyledDeleteButton = styled(DeleteBoardButton)`
    position: absolute;
    transform: translate(137px, 0);
    overflow: hidden;
    border: 3px solid ${flyoutBackground};
    background-color: ${bodyText};
    border-radius: 100px;
    width: 52px;
    height: 52px;
    background-position: center;
    transition: ease-in-out;
    transition: background 1.2s;
    background-position: center;
    z-index: 1001;
    opacity: 1;

    &:focus {
        border: 3px solid ${flyoutBackground} !important;
        border-radius: 100px;
        width: 52px;
        height: 52px;
        opacity: 1;
    }

    &:active {
        opacity: 1;
        background-color: ${iconsInActive};
    }

    @media (max-width: 600px) {
        transform: translate(60px, 0);
        opacity: 1;
        width: 40px;
        height: 40px;
        padding: 0;
    }

    & img {
        outline: 0;
        height: 100%;
        width: 100%;

        @media (max-width: 600px) {
            height: 16px;
            width: 16px;
        }
    }
`;

// interface Props {
//   color?: string;
//   id: string;
//   title: string;
//   imageUrl?: string;
//   dontBeLink?: boolean;
//   showDeleteButtons?: boolean;
//   onDeleteClick?: any;
// }

// interface State {
//   color: string;
//   observed: boolean;
// }

class PlaylistBoardSquare extends React.Component {
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

    render() {
        return (
            <Observer onChange={this.handleIntersection}>
                <Container
                    style={{
                        backgroundColor: flyoutBackground,
                    }}
                    role='listitem'
                    title={this.props.title}
                >
                    {this.state.observed ? (
                        <Scrim darker={Boolean(this.props.imageUrl)}>
                            {this.props.dontBeLink ? (
                                <TitleText>{this.props.title}</TitleText>
                            ) : (
                                <Link
                                    prefetch={true}
                                    href={{
                                        pathname: "/soundboard",
                                        query: { id: this.props.id },
                                    }}
                                    as={`/soundboard/${this.props.id}`}
                                >
                                    <A href={`/soundboard/${this.props.id}`}>
                                        <TitleText>
                                            {this.props.title}
                                        </TitleText>
                                    </A>
                                </Link>
                            )}
                            {this.props.showDeleteButtons && (
                                <StyledDeleteButton
                                    boardId={this.props.id}
                                    onClick={this.props.onDeleteClick}
                                />
                            )}
                        </Scrim>
                    ) : null}
                    {this.props.imageUrl && this.state.observed && (
                        <BackgroundImage
                            aria-hidden='true'
                            src={this.props.imageUrl}
                            onError={this.hideErrorImage}
                            alt={this.props.title}
                        />
                    )}
                </Container>
            </Observer>
        );
    }

    handleIntersection = event => {
        this.setState({ observed: event.isIntersecting });
    };
}

export default PlaylistBoardSquare;

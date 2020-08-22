/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import Link from "next/link";
import * as React from "react";
import styled from "styled-components";

import { randomBlerpColor } from "../../../lib/helperFunctions";

import Container from "../ContentContainer";
import TitleSection from "../ContentContainer/title-center";
import BoardShare from "../AddBoardMenu/board-share";

const BackgroundImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    z-index: 1;
    border-radius: 6px;

    @media (max-width: 600px) {
        width: 89px;
        height: 89px;
    }
`;

const Scrim = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${props =>
        props.darker ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.2)"};
    box-shadow: inset 0 0 70px 10px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    width: inherit;
    height: inherit;
    z-index: 2;
    border-radius: 6px;

    @media (max-width: 600px) {
        width: 89px;
        height: 89px;
    }

    &:hover span {
        color: rgba(180, 180, 180, 1);
        transition: all 0.2s ease 0s;
    }

    &:hover {
        box-shadow: inset 0 0 70px 1em rgba(0, 0, 0, 1);
        transition: all 0.3s ease 0s;
    }
`;

const A = styled.a`
    width: inherit;
    height: inherit;
    padding: 12px 0;
    text-decoration: none;
`;

const ReplaceButton = styled.button`
    width: inherit;
    height: inherit;
    padding: 12px 0;
    text-decoration: none;
    background-color: transparent;
`;

// interface Props {
//   itemType: string;
//   color?: string;
//   id: string;
//   title: string;
//   imageUrl?: string;
//   onPlaceholderClick?: (index: number) => void;
//   editable?: boolean;
//   index?: number;
// }

// interface State {
//   color: string;
// }

class ItemBiteLink extends React.Component {
    props;
    state;

    constructor(props) {
        super(props);
        this.state = {
            color: props.color || randomBlerpColor(),
        };
    }

    static defaultProps = {
        imageUrl: null,
    };

    handlePlaceholderClicked = () => {
        if (this.props.onPlaceholderClick) {
            this.props.onPlaceholderClick(this.props.index);
        }
    };

    render() {
        return (
            <Container
                style={{
                    backgroundColor: this.state.color,
                }}
                role='listitem'
                title={this.props.title}
            >
                {this.props.imageUrl && (
                    <BackgroundImage
                        aria-hidden='true'
                        src={this.props.imageUrl}
                    />
                )}
                <Scrim darker={Boolean(this.props.imageUrl)}>
                    {this.props.editable ? (
                        <ReplaceButton onClick={this.handlePlaceholderClicked}>
                            <TitleSection>{this.props.title}</TitleSection>
                        </ReplaceButton>
                    ) : (
                        <Link
                            prefetch={true}
                            href={{
                                pathname: `/${this.props.itemType}`,
                                query: { id: this.props.id },
                            }}
                            as={`/${this.props.itemType}/${this.props.id}`}
                        >
                            <A
                                href={`/${this.props.itemType}/${this.props.id}`}
                            >
                                <TitleSection>{this.props.title}</TitleSection>
                            </A>
                        </Link>
                    )}
                </Scrim>
            </Container>
        );
    }
}

export default ItemBiteLink;

/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import { withRouter } from "next/router";
import * as React from "react";
import styled from "styled-components";

import { randomBlerpColor } from "../../../lib/helperFunctions";

import { lightGray } from "../../../styles/colors";

const MegaContainer = styled.div`
    display: flex;
    padding: 12px;
    flex-flow: column;
    align-content: center;
    justify-content: center;
    visibility: visible;
    bottom: 0;
    left: 0;
`;

const MainTitle = styled.div`
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    color: black;
    margin: 8px;
`;

const Container = styled.div`
    display: flex;
    flex-flow: row;
    align-content: center;
    justify-content: center;
    visibility: visible;
    bottom: 0;
    left: 0;
`;

const StyleLink = styled.a``;

const SocialLogo = styled.img`
    width: 40px;
    height: 40px;
    padding: 4px;
    opacity: 1;

    &:hover {
        opacity: 0.7;
    }
`;

// interface Props {
//   className?: any;
//   biteAudioUrl?: string;
//   biteId?: string;
//   onFocus?: boolean;
// }

export default class SocialContainer extends React.Component {
    backgroundColor;
    firstSocialLinkRef;
    constructor(props) {
        super(props);
        this.backgroundColor = randomBlerpColor();
    }

    componentDidMount() {
        if (this.props.onFocus) {
            this.firstSocialLinkRef.focus();
        }
    }

    getLinkRef = el => {
        this.firstSocialLinkRef = el;
    };

    render() {
        return (
            <MegaContainer>
                <MainTitle>{"Share With"}</MainTitle>
                <Container
                    className={this.props.className}
                    color={this.backgroundColor}
                >
                    <StyleLink
                        ref={this.getLinkRef}
                        target='external'
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            `https://blerp.com/soundbites/${this.props.biteId}`,
                        )}`}
                    >
                        <SocialLogo
                            src='https://storage.googleapis.com/blerp-web-images/static/social/facebook-small.svg'
                            alt='Share to Facebook'
                        />
                    </StyleLink>
                    <StyleLink
                        target='external'
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                            `https://blerp.com/soundbites/${this.props.biteId}`,
                        )}&via=blerpapp`}
                    >
                        <SocialLogo
                            src='https://storage.googleapis.com/blerp-web-images/static/social/twitter-small.svg'
                            alt='Share to Twitter'
                        />
                    </StyleLink>
                    <StyleLink
                        target='external'
                        href={`http://tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(
                            `https://blerp.com/soundbites/${this.props.biteId}`,
                        )}`}
                    >
                        <SocialLogo
                            src='https://storage.googleapis.com/blerp-web-images/static/social/tumblr-small.svg'
                            alt='Share to Tumblr'
                        />
                    </StyleLink>
                    <StyleLink
                        target='external'
                        href={`http://www.pinterest.com/pin/create/link/?url=${encodeURIComponent(
                            `https://blerp.com/soundbites/${this.props.biteId}`,
                        )}`}
                    >
                        <SocialLogo
                            src='https://storage.googleapis.com/blerp-web-images/static/social/pinterest-small.svg'
                            alt='Share to Pinterest'
                        />
                    </StyleLink>
                    <StyleLink
                        target='external'
                        href={`http://www.reddit.com/submit?url=${encodeURIComponent(
                            `https://blerp.com/soundbites/${this.props.biteId}`,
                        )}`}
                    >
                        <SocialLogo
                            src='https://storage.googleapis.com/blerp-web-images/static/social/reddit-small.svg'
                            alt='Share to Reddit'
                        />
                    </StyleLink>
                    <StyleLink
                        target='external'
                        href={this.props.biteAudioUrl}
                        download={this.props.biteId}
                    >
                        <SocialLogo
                            src='https://storage.googleapis.com/blerp-web-images/static/social/download-small.svg'
                            alt='Download Sound Bite'
                        />
                    </StyleLink>
                </Container>
            </MegaContainer>
        );
    }
}

/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import withData from "../lib/withData";

import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";

import { DarkBody } from "../components/layouts/dark-body";

import marksy from "marksy";

const Link = styled.a`
    text-decoration: none;
    color: #7fc6e1;
`;

const BlerpMascot = styled.img`
    height: 200px;
    background-position: center;
    cursor: pointer;
    display: block;
    margin: auto;
`;

const StyleLink = styled.div`
    &:hover {
        opacity: 0.7;
    }
`;

const TeamPicture = styled.img`
    width: 60%;
    margin: 16px;
`;

const PictureContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

// We can use the options to create custom elements.
const compile = marksy({
    createElement: React.createElement,
    elements: {
        a: Link,
    },
});

const document = `
## Background

Blerp is the product of many late nights hacking on [University of Utah's campus](https://lassonde.utah.edu/blerp-app-for-sharing-your-favorite-soundbites). Blerp was first started out of frustrations towards current rough-edged soundboard apps on the market. As we continued to build blerp we started to see the huge potential of using blerp to completely change the way we consume and share content especially as we move towards voice enabled devices. Blerp has become a wonderful tool that leverages the voice, gaming, live streaming, and messaging spaces to enable us to express ourselves in ways we couldn't before.

## Values

At Blerp, we believe in fostering a community of diverse thinkers who work hard to innovate new ideas that change the world. We believe in building communities where people aren't afraid to stand out, take risks, and be different. We work to build these environments because we believe that people who take courage to take risks and chase their dreams have a higher chance of adding value to this society. \

## Mission

Our focus is to build products that truly enable people to create, connect, and communicate in a more unique and engaging way.  We saw that by making audio easier to find and share we could take our attentions away from our screens and focus on the people around us. Feel free to ask any questions!

There are many sites where people post random sounds just to get traffic to their site. The current soundboards throw ads at the user in order to make quick money. These soundboard owners have no incentive to improve the user experience of his or her site. We see a huge chance of using blerp to disrupt the entire soundboard and audio clip industry. Prior to blerp, people didn't have a better option then to use these ad heavy software applications. That is unfair. We exist to not only be a better solution, but to also be a new solution for creating awesome, hilarious, or even meaningful moments with the people around us. \

## Team

Our [journey](https://blerp.com/company/company-profiles) began as a couple of students from the University of Utah. What started as a side project from a college dorm has now become a story of trying to build a successful consumer app company in Utah. Follow us at [twitter](https://twitter.com/blerp), read our [blog](https://blerp.com/blog), or even listen to our podcast at [anchor](https://anchor.fm/blerp) or our founder's [podcast](https://anchor.fm/ah) to listen to our whole story! \

`;

class Page extends React.Component {
    state;
    props;

    playBlerp = () => {
        const audio = new Audio(
            "https://audio.blerpy.com/audio/7127792f-21a5-4a69-bd08-d737a5c7c21c?type=MP3",
        );
        audio.play();
    };

    render() {
        return (
            <div>
                <Helmet>
                    <title>
                        About Page for Blerp Inc. | Audio Memes for All | Blerp
                    </title>
                    <meta
                        name='description'
                        content='Learn more about the origins of Blerp, and the team that makes it possible. Blerp was created to take back our attention away from our screens empowering us to truly connect with each other in a more unique and human way. Find out how we are making this happen.'
                    />
                    <meta
                        property='og:image'
                        content='https://storage.googleapis.com/blerp-public-images/branding/Screen%20Shot%202019-03-12%20at%208.14.59%20PM.png'
                    />
                    <meta property='og:image:width' content='300' />
                    <meta property='og:image:height' content='300' />
                    <meta
                        name='twitter:image'
                        content='https://storage.googleapis.com/blerp-public-images/branding/Screen%20Shot%202019-03-12%20at%208.14.59%20PM.png'
                    />
                    <meta name='twitter:image:width' content='262' />
                    <meta name='twitter:image:height' content='262' />
                </Helmet>
                <NavBar />
                <DarkBody>
                    <StyleLink onClick={this.playBlerp}>
                        <BlerpMascot
                            alt={"Blerp Iconic Shape"}
                            src='https://storage.googleapis.com/blerp-public-images/branding/BlerpyLeftCircleIbisRed.svg'
                        />
                    </StyleLink>
                    {compile(document).tree}
                    <PictureContainer>
                        <TeamPicture
                            alt={"Blerp Team Picture"}
                            src='https://storage.googleapis.com/blerp-public-images/team/team.jpg'
                        />
                    </PictureContainer>
                </DarkBody>
                <Footer />
            </div>
        );
    }
}

export default withData(Page);

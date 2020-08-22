/*
 * BLERP Inc. ("BLERP") CONFIDENTIAL
 * Copyright (c) 2019 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";
import { flowRight as compose } from "lodash";
import gql from "graphql-tag";
import { Helmet } from "react-helmet";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import MainLink from "../components/link/MainLink";
import { default as Router, withRouter } from "next/router";
import Footer from "../components/navigation/footer";
import PlaylistListContainer from "../components/playlists/PlaylistListContainer";
import Bite from "../components/bite";

import projectConfig from "../config";
const hostDomain = projectConfig.host;

import NavBar from "../components/navigation/navbar";
import withData from "../lib/withData";
import TabBar from "../components/navigation/tabbar";

import {
    defaultBackground,
    statusColor,
    bodyText,
    pandaPink,
    flyoutBackground,
    secondarySubtitleText,
    slidePurple,
    secondaryText,
    pandaTeal,
    focusState,
    darkBlue,
    darkText,
    ligherBackground,
    lightGray,
    headerText,
    darkestBackground,
    pandaNewTeal,
} from "../styles/colors";

const Container = styled.div`
    position: relative;
    justify-content: center;
`;

const HeaderContainer = styled.div`
    background-color: ${props =>
        props.color ? props.color : flyoutBackground};
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px;

    @media (max-width: 600px) {
        padding: 12px;
    }
`;

const MainTitleH1 = styled.h1`
    font-size: 48px;
    color: ${flyoutBackground};
    max-width: 800px;
    text-align: center;
`;

const ThirdTitleH3 = styled.h3`
    color: ${props => (props.color ? props.color : secondarySubtitleText)};
    font-weight: light;
    text-decoration: none;
    margin: 0;
    padding: 16px;
    text-align: left;
    max-width: 800px;
    width: 100%;
`;

const SecondaryTitleH2 = styled.h2`
    color: ${props => (props.color ? props.color : secondarySubtitleText)};
    font-weight: light;
    font-size: 32px;
    text-decoration: none;
    margin: 0;
    padding: 20px;
    max-width: 800px;
    text-align: center;
`;

const SecondaryTitleH2White = styled.h2`
    color: ${props => (props.color ? props.color : flyoutBackground)};
    font-weight: light;
    font-size: 32px;
    text-decoration: none;
    margin: 0;
    padding: 20px;
    text-align: center;
`;

const RowContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 40px;
    background-color: ${props => props.color};
    min-height: 32px;

    @media (max-width: 600px) {
        margin: 0;
        flex-direction: column;
    }
`;

const RowHorizontal = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 80%;
    justify-content: space-evenly;
    padding: 12px;
`;

const TitleH3 = styled.h3`
    color: ${bodyText};
    font-weight: bold;
    text-decoration: none;
    margin: 4px;
    padding-top: 12px;
    font-size: 28px;
`;

const NormalParagraphCenter = styled.p`
    color: ${props => (props.color ? props.color : bodyText)};
    font-size: 20px;
    text-decoration: none;
    text-align: center;
    line-height: 40px;
    max-width: 800px;
`;

const NormalParagraph = styled.p`
    color: ${props => (props.color ? props.color : bodyText)};
    font-size: 20px;
    text-decoration: none;
    text-align: left;
    line-height: 40px;
    max-width: 800px;
`;

const MainTemplateLink = styled.a`
    display: block;
    text-decoration: none;
    padding: 4px;
    color: ${focusState};
    font-size: 20px;

    &:hover {
        color: rgba(200, 200, 200, 1);
        transition: all 0.2s ease 0s;
    }

    &:active {
        color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

const NavigationButton = styled.a`
    font-weight: lighter;
    padding: 12px 20px;
    margin: 20px;
    text-decoration: none;
    color: ${flyoutBackground};
    white-space: pre-wrap;
    background: ${pandaPink};
    border-radius: 40px;
    font-size: 14px;
    line-height: 20px;
    border: none;

    &:focus {
        border-radius: 40px;
    }

    &:hover {
        transition: all 0.2s ease 0s;
        background: rgb(240, 240, 240);
        color: rgb(254, 41, 92);
    }

    &:active {
        color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

const HiddenTag = styled.div`
    opacity: 0;
`;

const StyledImg = styled.img`
    width: 100%;
    max-width: 600px;
    max-height: 400px;
`;

const StyledImgSmall = styled.img`
    width: 300px;
`;

const StyleLinkSmall = styled.a`
    font-weight: 600;
    text-align: center;
    font-size: 20px;
    line-height: 20px;
    text-decoration: underline;
    color: ${darkBlue};
    white-space: pre-wrap;
    margin: 4px;
    cursor: pointer;
`;

const fetchPlaylistQuery = gql`
    query websitePlaylistForOof($id: MongoID!) {
        web {
            playlistById(_id: $id) {
                _id
                title
                image {
                    original {
                        url
                    }
                }
                followed
                giphy {
                    gif
                }
                bitesPagination(page: 0, perPage: 8) {
                    items {
                        _id
                        title
                        keywords
                        color
                        image {
                            original {
                                url
                            }
                        }
                        giphy {
                            gif
                        }
                        favorited
                        playCount
                        audienceRating
                        audio {
                            original {
                                url
                            }
                            mp3 {
                                url
                            }
                        }
                    }
                }
            }
        }
    }
`;

const fetchBiteQuery = gql`
    query websiteBiteTopTen($id: MongoID!) {
        web {
            biteById(_id: $id) {
                _id
                title
                keywords
                color
                image {
                    original {
                        url
                    }
                }
                giphy {
                    gif
                }
                favorited
                playCount
                audienceRating
                audio {
                    original {
                        url
                    }
                    mp3 {
                        url
                    }
                }
            }
        }
    }
`;

class Page extends React.Component {
    static defaultProps = {};
    state;
    props;

    renderHomeLink() {
        return (
            <Link prefetch={true} href='/'>
                <MainTemplateLink>{"Home"}</MainTemplateLink>
            </Link>
        );
    }

    navigateToPath = path => () => {
        window.location.href = path;
    };

    playBlerp = () => {
        const audio = new Audio(
            "https://audio.blerp.com/audio/b3efc7e0-f20e-11e8-b17c-dd2e9bdb6825?type=MP3",
        );
        audio.play();
    };

    renderBoardRow = (boardId, darker) => {
        return (
            <Query
                variables={{
                    id: boardId,
                }}
                ssr={true}
                query={fetchPlaylistQuery}
            >
                {props => {
                    if (
                        !props.data ||
                        !props.data.web ||
                        !props.data.web.playlistById
                    ) {
                        return <div />;
                    }
                    return (
                        <PlaylistListContainer
                            isDarker={darker}
                            playlist={props.data.web.playlistById}
                        />
                    );
                }}
            </Query>
        );
    };

    renderBite = biteId => {
        return (
            <Query
                variables={{
                    id: biteId,
                }}
                ssr={true}
                query={fetchBiteQuery}
            >
                {props => {
                    if (
                        !props.data ||
                        !props.data.web ||
                        !props.data.web.biteById
                    ) {
                        return <div />;
                    }
                    const bite = props.data.web.biteById;
                    return (
                        <Bite
                            key={bite._id}
                            id={bite._id}
                            title={bite.title}
                            audioSourceUrls={[
                                bite.audio && bite.audio.mp3.url,
                                bite.audio && bite.audio.original.url,
                            ]}
                            color={props.data.web.biteById.color}
                            image={
                                (bite.image && bite.image.original.url) ||
                                (bite.giphy && bite.giphy.gif)
                            }
                            favorited={bite.favorited}
                            playCount={bite.playCount}
                            prefetchLink={this.props.prefetchLink}
                            preload={true}
                            bite={bite}
                        />
                    );
                }}
            </Query>
        );
    };

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>
                        {
                            "10 Powerful Ways to Make Your Zoom Business Conferences Better Using Blerp"
                        }
                    </title>
                    <meta
                        name='description'
                        content="Audio is a perfect medium to make zoom conference video chats more fun. I am not saying it's the only tool but, I am here to let you know why using soundbites a great addition to your video chats."
                    />
                    <meta
                        name='keywords'
                        content='meme sound, zoom video conference, video chats, making conference calls more fun'
                    />
                </Helmet>
                <NavBar />

                {this.renderBoardRow("5e83d42c1f385c0005951d2d")}

                <HeaderContainer color={pandaNewTeal}>
                    <MainTitleH1>
                        Add Sound Memes and Audio Clips to Your Zoom Conference
                        Chats using Blerp
                    </MainTitleH1>
                    <StyledImg
                        alt='Zoom Conference of People Laughing'
                        src='https://storage.googleapis.com/blerp_products/Screen%20Shot%202020-03-27%20at%2010.30.25%20PM.png'
                    />
                    <NormalParagraphCenter color={flyoutBackground}>
                        Video chats aren't silent. Sound is a powerful addition
                        to video chats because we are playing to a human sense
                        that is already present in the conversation.
                    </NormalParagraphCenter>
                </HeaderContainer>

                <RowContainer color={flyoutBackground}>
                    <SecondaryTitleH2 color={bodyText}>
                        10 Powerful Ways to Make Your Zoom Business Conferences
                        Calls Better Using Blerp
                    </SecondaryTitleH2>
                </RowContainer>

                <RowContainer color={flyoutBackground}>
                    <ThirdTitleH3>
                        1. Control the room and bring back attention
                    </ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        It's easy to get off topic especially in meetings with
                        big groups of people. Blerp is a perfect tool to get
                        people's attension again to stay on agenda.
                    </NormalParagraph>

                    <RowHorizontal>
                        {this.renderBite("5b237fbafca7167a356196c0")}
                        {this.renderBite("5b26e46bf41c5b000d31556e")}
                        {this.renderBite("5b237fbafca7167a356195ef")}
                    </RowHorizontal>
                </RowContainer>

                <RowContainer color={defaultBackground}>
                    <ThirdTitleH3>
                        2. Lighten a serious conversation
                    </ThirdTitleH3>

                    <NormalParagraph color={bodyText}>
                        During a discussion with a room full passionate people,
                        words can be said that hurt people. Sometimes a
                        soundbite is the perfect way to diffuse a tense
                        situation so people can take a step back without blowing
                        up.
                    </NormalParagraph>

                    {this.renderBite("5b237fbafca7167a35619e26")}
                </RowContainer>

                <RowContainer color={flyoutBackground}>
                    <ThirdTitleH3>3. Break the awkward silience</ThirdTitleH3>

                    <NormalParagraph color={bodyText}>
                        Sometimes people don't like to talk in video chats. If
                        you are asking insightful questions but people still
                        aren't talking. Then playing a simple cricket chirping
                        soundbite may break the ice and get people laughing and
                        talking.
                    </NormalParagraph>

                    <RowHorizontal>
                        {this.renderBite("5b237fbafca7167a356196b2")}
                        {this.renderBite("5b237fbafca7167a356194d4")}
                    </RowHorizontal>
                </RowContainer>

                <RowContainer color={defaultBackground}>
                    <ThirdTitleH3>
                        4. Make your jokes actually funny
                    </ThirdTitleH3>

                    <NormalParagraph color={bodyText}>
                        People who watch sitcoms get surprised how much less
                        funny shows are without the laugh track. Blerp is a
                        perfect way to add a laugh track so you can emphasize
                        your jokes or turn what could be an awkward joke to a
                        funny one.
                    </NormalParagraph>
                    {this.renderBite("5b237fbafca7167a35619da5")}
                </RowContainer>

                <RowContainer color={flyoutBackground}>
                    <ThirdTitleH3>5. Get your point across</ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        Honest discussion is good to get goals accomplished and
                        items moving forward. Using Maybe calling someone out in
                        Donald's Trump's voice makes the point more impactful.
                    </NormalParagraph>
                    {this.renderBite("5b237fbafca7167a35619c74")}
                </RowContainer>

                <RowContainer color={defaultBackground}>
                    <ThirdTitleH3>
                        6. Make your meetings less boring
                    </ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        Adding sounds to make talking tracks more entataining
                        can be traced back to radio shows and podcasts.
                        Incorpating soundbites into your meeting is a great way
                        to keep your meeting engaging. Sometimes a random dance
                        break is needed within a long tense meeting.
                    </NormalParagraph>
                    <RowHorizontal>
                        {this.renderBite("5c8885355514f5004df892bc")}
                        {this.renderBite("5e7b6842282065000533a24b")}
                    </RowHorizontal>
                </RowContainer>

                <RowContainer color={flyoutBackground}>
                    <ThirdTitleH3>
                        7. Extra recognition and better compliments
                    </ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        It's important to always praise teammates when great
                        work is accomplished. A soundbite can be an amazing way
                        to tell someone "hey what you did was great and let's
                        get loud and excited because of it."
                    </NormalParagraph>
                    <RowHorizontal>
                        {this.renderBite("5b237fbafca7167a356196df")}
                        {this.renderBite("5b237fbafca7167a35619c62")}
                    </RowHorizontal>
                </RowContainer>

                <RowContainer color={defaultBackground}>
                    <ThirdTitleH3>
                        8. Censor out inappropriate comments
                    </ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        Sometimes people say the wrong thing at the wrong time.
                        It can also be easier to play a soundbite rather than
                        yelling shut up.
                    </NormalParagraph>
                    {this.renderBite("5b23ee44cec9ea000ddebf7d")}
                </RowContainer>

                <RowContainer color={flyoutBackground}>
                    <ThirdTitleH3>
                        9. Better describe your feelings
                    </ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        It's hard to express feelings especially in a business
                        setting. Sometimes using a soundbite to accurately
                        describe how you feel about a comment will help everyone
                        get on the same page.
                    </NormalParagraph>

                    <RowHorizontal>
                        {this.renderBite("5d01c1eda6c8c800055ae123")}
                        {this.renderBite("5d4df0258df5fe000500e006")}
                    </RowHorizontal>
                </RowContainer>

                <RowContainer color={defaultBackground}>
                    <ThirdTitleH3>10. You can really troll people</ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        Alright i'm just messing with you now, but I hope you
                        get the point. Soundbites are a powerful tool that
                        shouldn't be forgotten in our video business calls.
                    </NormalParagraph>
                    <RowHorizontal>
                        {this.renderBite("5b237fbafca7167a356194b2")}
                        {this.renderBite("5b237fbafca7167a356196c6")}
                    </RowHorizontal>
                </RowContainer>

                <RowContainer color={flyoutBackground}>
                    <MainLink
                        text={
                            "Curious what the top sounds and soundboards are on Blerp.com?"
                        }
                        href={"/top sounds"}
                        as={"/top sounds"}
                    />
                    <NormalParagraphCenter>
                        We have the best and most curated library of sound
                        effects for you to share with your friends!
                        <StyleLinkSmall href='/top-sounds'>
                            Find the best sounds on our site!
                        </StyleLinkSmall>
                    </NormalParagraphCenter>
                </RowContainer>

                <TabBar />
                <Footer />
            </Container>
        );
    }
}

export default compose(withData, withRouter)(Page);

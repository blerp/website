/*
 * BLERP Inc. ("BLERP") CONFIDENTIAL
 * Copyright (c) 2019 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import gql from "graphql-tag";
import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";
import { flowRight as compose } from "lodash";
import { Helmet } from "react-helmet";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import MainLink from "../components/link/MainLink";
import { default as Router, withRouter } from "next/router";
import Footer from "../components/navigation/footer";

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
    lighterDarkText,
    focusState,
    darkBlue,
    darkText,
    ligherBackground,
    lightGray,
    headerText,
    darkestBackground,
    pandaNewTeal,
} from "../styles/colors";

import BitesList from "../components/playlists/biteList";

const fetchBitesSearchQuery = gql`
    query websiteVideogamePageBites($query: String!) {
        web {
            biteElasticSearch(query: $query, page: 0, perPage: 30) {
                pageInfo {
                    perPage
                    hasNextPage
                    currentPage
                    itemCount
                }
                bites {
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
`;

const BoardsPadding = styled.div`
    display: flex;
    flex-flow: column;
    text-align: center;

    @media (max-width: 600px) {
        width: 100%;
    }
`;

const WhiteBoardsContainer = styled.div`
    background-color: ${flyoutBackground};
    padding: 8px;
`;

const NormalParagraphCenter = styled.p`
    color: ${props => (props.color ? props.color : bodyText)};
    font-size: 20px;
    text-decoration: none;
    text-align: center;
    line-height: 40px;
    max-width: 800px;
`;

const SectionTitleSpace = styled.p`
    color: ${lighterDarkText};
    font-weight: 600;
    text-decoration: none;
    padding: 8px 24px;
    text-align: left;
    font-size: 18px;
    margin: 0;
`;

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
    flex-direction: column;
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

const RowContainerTiny = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px;
    background-color: ${props => props.color};
    min-height: 12px;

    @media (max-width: 600px) {
        margin: 0;
        flex-direction: column;
    }
`;

const TitleH3 = styled.h3`
    color: ${bodyText};
    font-weight: bold;
    text-decoration: none;
    margin: 4px;
    padding-top: 12px;
    font-size: 28px;
`;

const Subtitle = styled.h4`
    color: ${secondarySubtitleText};
    font-weight: light;
    font-size: 20px;
    text-decoration: none;
    margin: 4px;
`;

const Paragraph = styled.p`
    color: ${props => (props.color ? props.color : bodyText)};
    font-weight: light;
    font-size: 20px;
    text-decoration: none;
    line-height: 32px;
    text-align: center;
    max-width: 800px;
`;

const WhiteParagraph = styled.p`
    color: ${flyoutBackground};
    font-weight: light;
    font-size: 20px;
    text-decoration: none;
    line-height: 32px;
    text-align: center;
`;

const BoldParagraph = styled.p`
    color: ${props => (props.color ? props.color : bodyText)};
    font-size: 20px;
    text-decoration: none;
    font-weight: bold;
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
    width: 180px;
    min-width: 200px;
    cursor: pointer;
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

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>{"How to Make Money Playing Games | Blerp"}</title>
                    <meta
                        name='description'
                        content='Do you know that making money playing games is possible? Here are various ways you can make money playing mobile games, video games, and even board games on platforms such as Twitch, Mixxer, Youtube Gaming, and Facebook.'
                    />
                    <meta
                        name='keywords'
                        content='making money on twitch, how to make money playing videogames, video games, video game soundboards, esports, playing games making money, make money using sound donations, sound twitch apps'
                    />
                </Helmet>
                <NavBar />
                <HeaderContainer color={slidePurple}>
                    <StyledImg
                        onClick={this.playBlerp}
                        alt='Blerp Logo'
                        src='https://storage.googleapis.com/blerp-public-images/branding/newest-logo.svg'
                    />
                    <MainTitleH1>
                        {"How to Make Money Playing Video Games"}
                    </MainTitleH1>
                    <NormalParagraphCenter color={flyoutBackground}>
                        Do you ever play video games during your leisure time?
                        According to{" "}
                        <StyleLinkSmall href='https://variety.com/2018/gaming/news/how-many-people-play-games-in-the-u-s-1202936332/'>
                            Variety
                        </StyleLinkSmall>{" "}
                        over 70% of Americans or 211 million people play video
                        games on at least one device. According to{" "}
                        <StyleLinkSmall href='https://www.statista.com/statistics/748044/number-video-gamers-world/ '>
                            Statista
                        </StyleLinkSmall>{" "}
                        over 2.3 billion people worldwide play video games with
                        that number growing year over year.
                    </NormalParagraphCenter>
                    <NormalParagraphCenter color={flyoutBackground}>
                        With the increasing popularity of people playing
                        videogames have you ever wondered how hard it would be
                        to make money playing video games. What would life be
                        like if all the time you spent playing video games was
                        also used to generate money? The way that the internet
                        and other technological innovations have changed the
                        gaming distribution has propelled the profitability and
                        growth of the industry. The demand generated for the
                        gaming industry has allowed many people to grow personal
                        businesses off the industry. With the following methods
                        that I am about to share with you, you will see that it
                        is not just the people making video games that are
                        earning all the money in the industry. There are a lot
                        of people who are figuring out how to make money from
                        playing video games as well.
                    </NormalParagraphCenter>
                </HeaderContainer>

                <Query
                    variables={{
                        query: "tune video game nintendo",
                    }}
                    ssr={true}
                    query={fetchBitesSearchQuery}
                >
                    {props => {
                        if (!props.data) {
                            return <div></div>;
                        }
                        return (
                            <div>
                                <BoardsPadding>
                                    {!(
                                        props.networkStatus === 1 ||
                                        props.networkStatus === 2
                                    ) &&
                                        props.data.web &&
                                        props.data.web.biteElasticSearch && (
                                            <WhiteBoardsContainer>
                                                <SectionTitleSpace>
                                                    {"Videogame Sounds"}
                                                </SectionTitleSpace>
                                                <BitesList
                                                    playlist={{
                                                        bites:
                                                            props.data.web
                                                                .biteElasticSearch
                                                                .bites,
                                                    }}
                                                    isGrayButton={false}
                                                />
                                            </WhiteBoardsContainer>
                                        )}
                                </BoardsPadding>
                            </div>
                        );
                    }}
                </Query>

                <RowContainer color={flyoutBackground}>
                    <SecondaryTitleH2 color={bodyText}>
                        The Different Ways to Make Money Playing Video Games
                    </SecondaryTitleH2>
                    <NormalParagraph color={bodyText}>
                        There are many different roles and skills for people
                        interested in making money while playing video games.
                        The different jobs that I am sharing with you have huge
                        disparities in pay and technical talent. The amount of
                        time and hard work required to reach each role may
                        differ immensely as well.
                    </NormalParagraph>
                    <ThirdTitleH3>Becoming a Videogame Tester</ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        A common job for people wanting to get paid to play
                        video games to go for is video game testing. Most people
                        might think that a video game tester gets paid for
                        playing video games but the goal of a tester is
                        generally to break a video game. A video game tester is
                        generally paid by a studio company developing video
                        games. A video game tester may require thousands of
                        hours of playing and single game. For that reason most
                        people who are interested in gaming might actually find
                        that being a video game tester is not that fun. Becoming
                        a video game test for a large or small company may be
                        one of the fastest ways for any person to start being
                        paid to playing video games. Companies who are making
                        video games are constantly hiring people to test and
                        play different video games they create. Some entry level
                        testers are paid 10 to 17 dollars. Testers who become
                        more proficient and have degrees are generally paid on
                        Average 47,800$ a year. Higher paid game testers are
                        expected to write more in depth reviews and suggestions
                        for the game they play.
                    </NormalParagraph>

                    <ThirdTitleH3>
                        Participate in Professional Competitive Gaming Through
                        Esport Events
                    </ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        It is hard to deny that Esports is becoming noticeable
                        force in our world especially when there are companies
                        such as{" "}
                        <StyleLinkSmall href='https://www.bloomberg.com/news/articles/2019-03-25/comcast-places-50-million-bet-on-esports-arena-in-philadelphia'>
                            Comcast investing 50 million
                        </StyleLinkSmall>{" "}
                        into an Arena just for people to pay to watch
                        competitive gaming. Esports is a term coined for
                        competitive gaming. Esports has grown massively over the
                        past attracting over{" "}
                        <StyleLinkSmall href='https://www.slideshare.net/ActivateInc/think-again-tech-media-outlook-2017-67604099'>
                            250 million viewers worldwide.
                        </StyleLinkSmall>
                        There are professional players who are easily raking in
                        2 million dollars annually for competing in playing
                        video games. Out of the top 500 esports teams worldwide
                        only about the top players on{" "}
                        <StyleLinkSmall href='https://www.esportsearnings.com/teams'>
                            the top 150 teams make a reasonable living of over
                            40 thousand dollars.
                        </StyleLinkSmall>{" "}
                        Just breaking into any role in the competitive gaming
                        industry let alone playing on one of the top teams can
                        be a really tough challenge. To start off you may want
                        to sign up for local tournaments in a competitive game
                        that you really enjoy playing. If you start to win those
                        tournaments it may be worth it to invest traveling for
                        bigger tournaments. As you start to gain more skills,
                        move up the rankings, and build a bigger brand for
                        yourself then it might be a good idea to reach out to
                        esports teams in the game that you are playing to see if
                        you can try out for their team. Most professional gamers
                        will generally only focus on mastering one game. More
                        and more colleges are starting to offer scholarships for
                        collegiate video game players. Building a name at the
                        collegiate level may be a great way to get recognized
                        for a professional team as well. Professional gaming may
                        seem fun because of adoring fans and being paid a lot of
                        money, however it takes a lot of pressure, practice, and
                        determination in order to make it to the top. If you
                        want to be paid a decent amount of money then you will
                        have to be a top player in a massively popular
                        competitive game in order to make a sizeable living from
                        competitively playing video games. If you want simple
                        tips to jump start your professional gaming career{" "}
                        <StyleLinkSmall
                            href='https://info.jkcp.com/blog/how-to-get-into-esports/
            '
                        >
                            check out this article.
                        </StyleLinkSmall>
                    </NormalParagraph>
                    <ThirdTitleH3>
                        Creating and Sharing Replay Videos Online On Youtube and
                        Facebook
                    </ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        The first era of online video game content came from a
                        large group of people posting replays online of
                        themselves. These replays slowly evolved to gameplay
                        videos of people recording themselves while playing some
                        of their favorite games. Generally people who make money
                        from this method are posting their content on
                        Youtube.com. You can also build fan pages on Facebook
                        and grow an audience on the Facebook platform through
                        shareable game replays. Most people posting video game
                        content in 2019 make money from ads. The top content
                        creators in the field can make a couple million dollars
                        just from ad revenue. The job can be inconsistent
                        especially for smaller influencers in the space. The
                        difference in pay in different channels can depend
                        entirely on the type of content, the trends of the
                        internet, and the loyalty of the fanbase to the channel.
                        Because of those factors there is no accurate way to
                        really predict the pay of a channel. It easy can look
                        back in the time of when Halo replays were on the rage
                        and there were Youtubers on the internet easily making a
                        couple grand for a single viral no scope headshot
                        video.Some people get popular enough on Youtube to make
                        money from sponsorship and product placements for their
                        videos. Top video game creators such as PewDiePie can be
                        making 1 million dollars just from Ad revenue. According
                        to most Youtuber calculator sites, an average youtuber
                        who gets 20,000 views per day may only be making a
                        little over ten grand average per year. As of 2019,
                        creating and posting video game content online is very
                        saturated market and to make a considerable amount of
                        money may require finding a niche, working hard, and a
                        bit of luck. If you need some extra tips on growing your
                        Youtube gaming channel{" "}
                        <StyleLinkSmall href='https://vtrep.com/video-gaming-youtube-channel/'>
                            you can check out this article.
                        </StyleLinkSmall>
                    </NormalParagraph>
                    <ThirdTitleH3>
                        Live Streaming Video Game Content Online on Youtube
                        Gaming, Twitch, and Mixxer
                    </ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        The next evolution of posting video game video content
                        is on live streaming platforms. With the introduction of
                        platforms such as Twitch, Mixxer, and Youtube Gaming,
                        watching people play video games has exploded over the
                        past eight years. Creators post live content on these
                        streaming platforms to attract large audiences. Viewers
                        are willing to watch a live content creator play his or
                        her favorite games because of the instant enjoyment of
                        watching streamers attempting to be entertaining while
                        trying to complete a challenge in a game. Top creators
                        can be making millions of dollars per month just off of
                        advertisement and streamer donations. When compared to
                        posting regular video content, live streaming may be
                        less competitive and more monetizable method for smaller
                        influencers trying to build a career off of playing
                        video games. However, today in 2019, live streaming
                        video games is a very saturated field. Live streaming
                        may still be an exciting career for those who want to
                        work hard and work for themselves. Live streamers will
                        still be spending hours in strategically growing their
                        channels through creating content, collaborations, and
                        partnerships. There is an up front cost to becoming a
                        live Twitch or Mixxer Streamer. You will generally need
                        a good computer, great internet, and some good audio
                        equipment. It is hard to estimate how much a single
                        streamer will make while live streaming because there
                        are various ways for streamers to monetize their gaming
                        career. We have worked streamers who have as low as a
                        couple thousand followers who are making a couple
                        thousand dollars per month. We have also worked with
                        streamers with far more followers making far less than
                        that amount. At blerp we personally build tools that
                        help streamers add value to their Twitch Channels.{" "}
                        <StyleLinkSmall href='/twitch'>
                            Blerp for Twitch
                        </StyleLinkSmall>{" "}
                        is and app that is specifically providing a unique and
                        fun way for live Twitch streamers to use sound bites to
                        make more money from their live Twitch streams.
                    </NormalParagraph>
                    <ThirdTitleH3>
                        Critiquing and Reviewing Video Games For Game Review
                        Sites and Video Game Blogs
                    </ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        You may have heard of people being paid for critiquing
                        movies, but you may not have heard that the same role
                        exists for video games as well. A video game critic will
                        play games and write very in depth reviews for the video
                        games. A video game critic can provide valuable content
                        for gaming sites and magazines. The game reviews are
                        generally posted on credible gaming forums and magazines
                        to provide gamers in depth into a game. A video game
                        critic can either be hired by the gaming magazine or the
                        game itself. A video game critic could also find a job
                        posting their own content online or working for popular
                        game review channels on Youtube. Depending on the
                        expertise of the critic, a game critic can make as low
                        as 30$ per review to as high as an 80 grand salary. If
                        you are really ambitious you could try starting your own
                        Game Journalism site. The amount of work it takes to
                        successful build a content site is hard. Continually
                        producing content and driving users to the content
                        generally takes more work than one would think. Creating
                        content surrounding videogames does not have to be
                        written blog posts. If you are a talker rather than a
                        writer then you may want to look into creating a podcast
                        or video channel for your video game reviews. A gaming
                        critique will have the chance to play a lot of games but
                        they will mainly be paid for the articles he or she
                        writes. If you are interested in building a career
                        critiquing video games{" "}
                        <StyleLinkSmall href='https://onemorecupof-coffee.com/get-paid-write-game-reviews/'>
                            this article
                        </StyleLinkSmall>{" "}
                        might be helpful for you.
                    </NormalParagraph>
                    <ThirdTitleH3>
                        Creating Professional Tutorial and Guides For Games
                    </ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        As the old saying goes, if you can’t play a sport than
                        coach it. Some people who don’t go into professional
                        gaming may be good enough in a game to teach others how
                        to play it. There are examples on the web of great
                        league players creating tutorial videos and guides on
                        the specific champions that they play. These guides and
                        videos can generally be monetized through ads and
                        donations. Creating content that clearly communicates to
                        people how to improve on a game can be an easier way for
                        a person to grow an audience and eventually be paid for
                        the knowledge that they share. If your professional
                        credibility is strong and the online courses you release
                        are really valuable than you may even be able to sell
                        the courses to your students.
                    </NormalParagraph>
                    <ThirdTitleH3>
                        Earning and Selling in Game Content Specifically for
                        Online Multiplayer Games
                    </ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        Depending on the game, this method may be against the
                        terms of use of the game. It is a popular tactic for
                        people to sell in game items and accounts for real
                        money. MMORPGs and other multiplayer games generally
                        have in game content that people find valuable enough to
                        pay for. Back when Runescape was popular there are case
                        studies of{" "}
                        <StyleLinkSmall href='https://www.mmobux.com/articles/252/elite-runescape-player-earned-50-000-selling-gold'>
                            people making over fifty grand for selling digital
                            gold.
                        </StyleLinkSmall>{" "}
                        If you really enjoy playing a certain online multiplayer
                        it may be a good idea to look into sites that help you
                        sell content to make some money back on the time you
                        spend playing the game.
                    </NormalParagraph>
                    <ThirdTitleH3>
                        Becoming a Video Gameplay Programmer
                    </ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        A far less risky, yet lucrative route to take for being
                        paid to playing video games is becoming a video game
                        developer. A video game developer is not strictly hired
                        to play video games. A video game developer is hired to
                        write the code that powers the game. However a game
                        programming at most mid sized companies will be play
                        testing the code that he or she is writing. This gives a
                        lot of opportunity for any developer in the space to
                        spend time playing the new features that he or she
                        writes up. It is generally harder for a programmer to
                        find work in the gaming industry when compared to other
                        industries. Depending on the area, a video game
                        programmer could be making as low as 40 grand a year to
                        as high as 300 grand a year. You will not be playing a
                        variety of video games for most of the time you spend
                        working. For that reason, if your goal is strictly to be
                        paid for playing video games then this might not be the
                        best option for you. The great benefit of chasing this
                        option is that if your plan to work in the gaming
                        industry fails then you still have a high chance of
                        securing a job that pays really well in another
                        industry.
                    </NormalParagraph>
                </RowContainer>

                <HeaderContainer color={pandaNewTeal}>
                    <SecondaryTitleH2 color={flyoutBackground}>
                        Making Money Playing Video Games is Possible
                    </SecondaryTitleH2>
                    <NormalParagraph color={flyoutBackground}>
                        It is hilarious to think how a piece of entertainment
                        that some people might find a waste of time is making an
                        unavoidable presence in our society. Videogames are
                        growing at a cheetah pace rate with the top companies
                        making over 10 billion in revenue and the number gamers
                        increasing by the billions year over year. Whether your
                        goal is to make a quick buck on the side or create
                        valuable jobs for you and your peers, the gaming
                        industry has a lot of opportunities for people to take a
                        chance to achieve those types of goals. As the growth of
                        the video game and esports industries continues, we may
                        start to see even more ways for people to make money
                        playing video games.
                    </NormalParagraph>
                </HeaderContainer>

                <RowContainer
                    // onClick={this.navigateToPath("/best-games-to-stream-on-twitch")}
                    color={flyoutBackground}
                >
                    <MainLink
                        text={
                            "Are you looking for new game ideas to make your stream better?"
                        }
                        href={"/best-games-to-stream-on-twitch"}
                        as={"/best-games-to-stream-on-twitch"}
                    />
                    <NormalParagraphCenter>
                        Here is a list of the top games to stream on Twitch,
                        Mixxer and Youtube Gaming. Are you looking for the best
                        games to play on your stream? Here are the top ten best
                        games to stream for streamers!
                    </NormalParagraphCenter>
                </RowContainer>

                <RowContainer
                    // onClick={this.navigateToPath("/making-money-on-twitch")}
                    color={slidePurple}
                >
                    <MainLink
                        text={
                            "Are you curious about how you can make money on Twitch?"
                        }
                        href={"/making-money-on-twitch"}
                        as={"/making-money-on-twitch"}
                    />
                    <NormalParagraphCenter color={flyoutBackground}>
                        Making Money on Twitch is one of the best ways to earn
                        income while playing video games. Twitch is a live
                        streaming platform for people to build followings
                        through posting live content. Come learn how some people
                        are really making money from streaming on Twitch.tv.
                    </NormalParagraphCenter>
                </RowContainer>

                <RowContainer
                    // onClick={this.navigateToPath("/videogame-meme-soundboards")}
                    color={flyoutBackground}
                >
                    <MainLink
                        text={"Find all the video game meme soundboards!"}
                        href={"/videogame-meme-soundboards"}
                        as={"/videogame-meme-soundboards"}
                    />
                    <NormalParagraphCenter>
                        Sound effects and audio within gaming has always played
                        vital part in creating a enjoyable experience for users.
                        Blerp has curated soundboards of the top sounds from
                        your favorite video games!
                    </NormalParagraphCenter>
                </RowContainer>

                <TabBar />
                <Footer />
            </Container>
        );
    }
}

export default compose(withData, withRouter)(Page);

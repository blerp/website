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

const Subtitle = styled.h4`
    color: ${secondarySubtitleText};
    font-weight: light;
    font-size: 20px;
    text-decoration: none;
    margin: 4px;
    max-width: 800px;
    width: 100%;
`;

const SecondaryTitleH2 = styled.h2`
    color: ${props => (props.color ? props.color : secondarySubtitleText)};
    font-weight: light;
    font-size: 36px;
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
                    <title>{"Making Money on Twitch | Blerp"}</title>
                    <meta
                        name='description'
                        content='How can you make more money on Twitch from playing video games? Twitch is a platform for people to stream themselves playing video games. It possible for some people to make millions of dollars creating content for Twitch. How exactly are people making money on Twitch?'
                    />
                    <meta
                        name='keywords'
                        content='how do streamers make money, making money on twitch, how to make money playing videogames, video games, video game soundboards, esports, playing games making money, make money using sound donations, sound twitch apps'
                    />
                </Helmet>
                <NavBar />
                <HeaderContainer color={pandaNewTeal}>
                    <StyledImg
                        onClick={this.playBlerp}
                        alt='Blerp Logo'
                        src='https://storage.googleapis.com/blerp-public-images/branding/newest-logo.svg'
                    />
                    <MainTitleH1>{"How to Make Money on Twitch"}</MainTitleH1>
                    <NormalParagraphCenter color={flyoutBackground}>
                        Twitch is hailed as the most popular platform for live
                        streaming online video game content. Besides streaming
                        on Twitch, people can grow an audience through live
                        streaming on platforms such as Microsoft Mixxer,
                        Facebook Live, and Youtube gaming. Twitch is still the
                        leading platform in the live streaming gaming space with
                        100 million monthly active viewer which is{" "}
                        <StyleLinkSmall href='https://www.windowscentral.com/mixer-hits-10-million-monthly-active-users-new-partner-opportunities-way'>
                            90 million more than Microsoft Mixxer.
                        </StyleLinkSmall>
                    </NormalParagraphCenter>
                    <NormalParagraphCenter color={flyoutBackground}>
                        When streaming on Twitch there are many ways for people
                        to make money from the platform. To understand why
                        making money on Twitch is possible you will have to
                        understand that a streamer is essentially a social media
                        influencer. The main difference is that the type of
                        content you make is live. Having qualities of a social
                        influencing for a Twitch Streamer means that streamers
                        have access to all methods that regular influencers have
                        to make money, ie through sponsorship and product
                        placements. Through this article, we want to show you
                        not just how to make money on Twitch but also how you
                        can maximize the full potential of these current methods
                        to add great value to your stream. The information we
                        are sharing is aimed towards supporting you in building
                        simple strategies that will add even more value to your
                        Twitch Live stream.{" "}
                    </NormalParagraphCenter>
                </HeaderContainer>

                <Query
                    variables={{
                        query: "sfx",
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
                                                    {
                                                        "Fun Streamer Sounds Effects"
                                                    }
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
                        Explore the Different Ways to Make Money on Twitch
                    </SecondaryTitleH2>

                    <ThirdTitleH3 color={lighterDarkText}>
                        Making Money on Twitch Through Viewer Donations, Bits,
                        and Cryptocurrency
                    </ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        A large group of streamers make money fully supported by
                        a streamer’s fanbase. Some viewers find joy in
                        supporting creators and the creator’s content. Other
                        viewers just want be a part of something bigger than
                        themselves. By sharing and bringing out your story on
                        stream you may be able to make a sizeable income from
                        Twitch donations on stream.
                    </NormalParagraph>

                    <Subtitle>How to setup donations on Twitch?</Subtitle>
                    <NormalParagraph color={bodyText}>
                        Streamers can setup donations via twitch donation alert
                        apps and Paypal links. Donations generally come from
                        Twitch viewers who are huge fans of the content
                        streamers produce. If you want more info on how to setup
                        donations then{" "}
                        <StyleLinkSmall href='https://www.lifewire.com/set-up-donations-on-twitch-4150141'>
                            checkout this Livewire article.
                        </StyleLinkSmall>
                    </NormalParagraph>

                    <Subtitle>
                        What are the best type of donations on Twitch?
                    </Subtitle>
                    <NormalParagraph color={bodyText}>
                        Viewers can donate using money, bits, or even
                        cryptocurrency. Setting up money donations through
                        various platforms is an easy way to open donations from
                        viewers. Twitch promotes using bits or cheers to give
                        money to streamers. That is because Twitch makes a
                        sizeable cut of the profits at the moment when a viewer
                        is buying bits. Bit donations are also generally safer
                        than other forms of donations. To earn bits a viewer
                        must reach Twitch Affiliate status in order to receive
                        bits on his or her channel. Becoming a Twitch affiliate
                        is a very simple process. Chargeback on Paypal can
                        sometimes cause unwanted fees for the streamers.
                        Allowing viewers to donate using cryptocurrencies can
                        prevent users from doing unnecessary chargebacks.
                        Cryptocurrency valuations are very volities. Sometimes
                        the value of digital coins may decrease as time goes on.
                        The best type of donation for you is generally the
                        method that is easiest for your viewers to pay you for
                        doing good work.
                    </NormalParagraph>

                    <Subtitle>
                        How to add extra flair to Twitch donations?
                    </Subtitle>
                    <NormalParagraph color={bodyText}>
                        Twitch donations can be enhanced to be more fun and
                        recognizable. There are even voice tools that let
                        viewers donate money to play a voice message on stream.
                        It is easy to set up donation alerts through your
                        favorite streaming platforms such as Streamlabs OBS,
                        Stream Elements, and Xlink. If you want to allow viewers
                        to choose customizable sound alerts on demand to play on
                        stream, Blerp for Twitch may be a great tool for adding
                        that type of engagement into your stream.
                    </NormalParagraph>

                    <Subtitle>
                        How much do twitch streamers make from donations?
                    </Subtitle>
                    <NormalParagraph color={bodyText}>
                        Twitch donations can be a very unpredictable way to make
                        money. There have been reports of streamers getting
                        single donations of over 100 thousand dollars. More
                        average tips range within the 1 to 5 dollar range.
                        Tipping on Twitch has been growing at a rate of 30% per
                        quarter according to post release on{" "}
                        <StyleLinkSmall href='https://blog.streamlabs.com/livestreaming-q218-report-streamlabs-obs-doubles-tipping-breaks-record-36m-twitch-hits-1m-ef41d2c61923'>
                            Streamlabs OBS’s Blog
                        </StyleLinkSmall>
                        . There were over 150,000 monetized Twitch channels
                        making over a dollar in tips from the first quarter of
                        2018. That is almost 50,000 streamers more than every
                        quarter in 2017. According to Streamlabs about 6000
                        streamers are making at least 1 grand per quarter in
                        2018.
                    </NormalParagraph>

                    <Subtitle>
                        Tips for earning more donations on Twitch
                    </Subtitle>

                    <NormalParagraph color={bodyText}>
                        Do not beg for money. Twitch viewers want to give you
                        support because they enjoy your presence and want to
                        help you out. If you get donations based on people
                        feeling bad for you then the support will only go so
                        far.
                    </NormalParagraph>
                    <NormalParagraph color={bodyText}>
                        Implement easy ways for viewers to donate to your
                        stream. Not every viewer uses Venmo. Not every viewer
                        likes to use an obscure brandless site. Find ways to
                        make the donation easier to work using a more
                        trustworthy platform.
                    </NormalParagraph>

                    <NormalParagraph color={bodyText}>
                        Get better at sharing your story and learn how to
                        showcase what makes you unique. Find and focus on a
                        niche video game so that you have a higher chance of
                        standing out.
                    </NormalParagraph>

                    <ThirdTitleH3 color={lighterDarkText}>
                        Making Money on Twitch Through Sponsorships, Paid
                        Streams, Product Placements, and Sponsored Swag
                    </ThirdTitleH3>

                    <NormalParagraph color={bodyText}>
                        Twitch streamers that start to build followings on
                        Twitch can start to make money from being sponsored by
                        other entities. There are many companies looking to
                        market their products through the Live streaming space.
                        Twitch streamers who hold strong brands are perfect
                        target for product sponsorship because viewers may
                        generally look up to what a streamer says about a
                        certain product. Video Game companies may also want to
                        market their game by sending twitch streamers free keys
                        and in game items. Big charity groups are also known to
                        reach out to streamers for help in raising money.
                    </NormalParagraph>

                    <Subtitle>
                        How much money can you make through sponsorships?
                    </Subtitle>
                    <NormalParagraph color={bodyText}>
                        Streamers{" "}
                        <StyleLinkSmall href='https://www.tubefilter.com/2018/10/10/twitch-streamers-earn-per-month-breakdown-disguisedtoast/'>
                            have reported
                        </StyleLinkSmall>{" "}
                        to make as low as one cent per viewer to as high as one
                        dollar per viewer per hour. That means some streamers
                        with 10,000 concurrent viewers are making 10,000 dollars
                        per hour. Average sponsorship sizes can range from a 10
                        dollar gift card to your favorite Fast Food restaurant
                        to a half million dollar contract. Companies may even
                        send you free items in order to get a product placement
                        in a stream for the item. The amount of engagement on
                        your stream will heavily determine the type of
                        sponsorships you get.
                    </NormalParagraph>

                    <Subtitle>
                        How do you find sponsorship for your Twitch Stream?
                    </Subtitle>
                    <NormalParagraph color={bodyText}>
                        Work hard to build a strong brand and following for your
                        channel. Even having a channel with a thousand highly
                        engaged followers may put you in a good spot to attract
                        companies. The higher the engagement numbers you can
                        present to companies the more interested companies will
                        be in working with you. Don’t be afraid to reach out to
                        companies earlier. There is a strong growing market for
                        micro influencers. Because of the micro influencer
                        movement, smaller streamers are finding ways to work
                        with companies to make money.{" "}
                    </NormalParagraph>
                    <NormalParagraph color={bodyText}>
                        Read your email. We see companies constantly send
                        opportunities to streamers but streamers don’t always
                        reply to their email. Sometimes finding the right
                        opportunity could mean being responsive in
                        communication.
                    </NormalParagraph>
                    <NormalParagraph color={bodyText}>
                        Don’t be afraid to say no. Some companies may not be a
                        good fit for your brand or may not be offering a good
                        partnership. Stay true to your values and only work with
                        companies that treat you fairly.
                    </NormalParagraph>

                    <NormalParagraph color={bodyText}>
                        Find your niche and make a name for yourself in that
                        niche. A streamer who has created a fanbase around
                        streaming indie video games may have a higher chance of
                        finding a sponsorship from an indie studio trying to
                        promote their next game. It would be a wise idea for
                        that same streamer to create a website and blog about
                        relevant indie game news or present powerful reviews on
                        the games. Finding a niche and making a presence in that
                        niche can go a long way in finding great companies who
                        are willing to sponsor you.
                    </NormalParagraph>

                    <ThirdTitleH3 color={lighterDarkText}>
                        Making Money from Twitch Subscribers
                    </ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        Twitch has created a method for viewers to subscribe to
                        a Twitch streamer’s channel. Viewers who subscribe to
                        your channel will receive an ad free experience and
                        access to your emotes. Emotes are fun art images that
                        viewers can post in chat. Emotes are linked specifically
                        for your channel. You can personally design cool emotes
                        to better incentivise viewers to subscribe to your
                        channel. In order to receive viewer subscriptions you
                        will have to reach Affiliate status on the Twitch
                        platform.
                    </NormalParagraph>

                    <Subtitle>
                        How much can you make through subscriptions?
                    </Subtitle>
                    <NormalParagraph color={bodyText}>
                        A Twitch viewer who enjoys watching the content of a
                        streamer can subscriber to a Twitch channel for a
                        minimum of 5 dollars per month. Amazon takes 50% of the
                        revenue from your subscriptions. Medium sized Twitch
                        streamers with thousands of followers generally have a
                        couple hundred subscribers. A streamer with 500
                        subscribers would be making 1250$ per month from Twitch
                        Subscriptions. Larger streamers such as Ninja, who has
                        over 130,000 thousand subscribers, are making about 500
                        thousand dollars per month from Twitch Subscribers.
                    </NormalParagraph>

                    <Subtitle>Tips for increasing subscribers?</Subtitle>
                    <NormalParagraph color={bodyText}>
                        Do everything you can to show appreciation to your
                        subscribers for the extra support. Try hard not to
                        isolate or neglect your regular viewers as well. Your
                        ability to have high viewer retention with your current
                        viewers will be vital in attracting new viewers to your
                        channel. A viewer who isn’t subscribed to your channel
                        might attract someone else who has the capital to
                        support you.
                    </NormalParagraph>
                    <NormalParagraph color={bodyText}>
                        Setting up unique alerts that trigger on stream when
                        someone subscribes to your channel is a vital step to
                        show people that you appreciate the subscription. You
                        can also give your subscribers access to private social
                        and messaging channels. Some streamers will host
                        subscriber only events. Twitch most recently launched
                        subscriber only streams.
                    </NormalParagraph>
                    <NormalParagraph color={bodyText}>
                        If you want to further incentivise your subscribers in a
                        really unique way you can try our{" "}
                        <StyleLinkSmall href='/twitch-walkon'>
                            Walk On Blerp Twitch Extension
                        </StyleLinkSmall>
                        . Walk on enables your subscribers to set personal walk
                        on alerts as they join your stream!
                    </NormalParagraph>

                    <ThirdTitleH3 color={lighterDarkText}>
                        Making money from ads or affiliate links
                    </ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        Advertising is a simple way for Twitch streamers to make
                        money. A Twitch streamer can build up a viewer following
                        for his or her channel and use that traffic to generate
                        advertising revenue. Advertising is a viable market for
                        Twitch streamers to make money because companies want to
                        use streamers to increase visibility for their products.{" "}
                    </NormalParagraph>

                    <Subtitle>What types of ads make money on Twitch?</Subtitle>
                    <NormalParagraph color={bodyText}>
                        On Twitch, streamers can make money from traditional ads
                        played on the platform or thorough non traditional ads
                        and banners placed over or under a Twitch Stream. In
                        order to make advertising money from the ads run on
                        twitch videos your channel must reach Twitch Partnership
                        status. Twitch gives partnered streamers the ability to
                        choose the frequency and length of advertisements in
                        your Broadcast Dashboard. Advertising revenue from
                        Twitch is generated by visitors to your channel viewing
                        or clicking on ads. You will get paid according to Cost
                        Per Mile model meaning price will be calculated based on
                        per thousand views on the ad.
                    </NormalParagraph>
                    <NormalParagraph color={bodyText}>
                        You can also make money on Twitch through non
                        traditional ads where companies will offer to pay
                        streamers for placing the companies ads on the Twitch
                        Streamers channel. This can be in the form of affiliate
                        links or image ads. Twitch streamers can work out deals
                        with a company where they pay the streamer based on per
                        click or per impression. Twitch streamers can also make
                        money by putting a companies ad as a Twitch overlays
                        over their streams. Companies can pay per stream or per
                        hour on the presentation of the overlays.
                    </NormalParagraph>
                    <Subtitle>
                        How much money can you make from advertising?
                    </Subtitle>

                    <NormalParagraph color={bodyText}>
                        Medium sized partnered streamer have reported to be
                        making about 60-100 dollars per 10 viewers each year.
                        These same streamers have said they are streaming about
                        6 hours per day in order to get that rate. The top
                        streamers on Twitch have reported to be making over 500
                        thousand dollars from just Ad revenue. Here{" "}
                        <StyleLinkSmall href='https://mediakix.com/blog/how-much-do-twitch-streamers-make/'>
                            is more info
                        </StyleLinkSmall>{" "}
                        on how the top ten streamers on Twitch are making their
                        money.
                    </NormalParagraph>

                    <Subtitle>
                        Extra Tips on earning more income from Ads
                    </Subtitle>

                    <NormalParagraph color={bodyText}>
                        Don't have your ads and donation buttons be the only
                        items that exists at the bottom of your stream.
                        Personalize your channel to include information about
                        you and your stream. Don't have your overlay ads cover
                        your entire stream. It can be a big turn off for viewers
                        who come onto your stream just to see a lot of ads.
                    </NormalParagraph>

                    <ThirdTitleH3 color={lighterDarkText}>
                        Making money from ads or affiliate links
                    </ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        Selling Twitch merchandise can be a basic way for a
                        Twitch streamer to jumpstart selling a product from
                        their Twitch Brand. Twitch merchandise can include
                        common item’s with a Twitch streamer’s logo or even
                        wearable items with community related designs.
                    </NormalParagraph>

                    <Subtitle>
                        How do I get started selling merchandise?
                    </Subtitle>
                    <NormalParagraph color={bodyText}>
                        There are many places to quickly sell merchandise. If
                        you don’t care about the cost of margins you can use
                        platforms such as{" "}
                        <StyleLinkSmall href='https://streamlabs.com/merch'>
                            Streamlabs Merch
                        </StyleLinkSmall>{" "}
                        to quickly get your merchandise out to your viewers.
                        However, you can save money by buying merchandise in
                        bulk from custom t shirt or swag sites. My
                        recommendation would be to get designs for the
                        merchandise you want to sell and get a gauge on demand
                        from your viewers before bulk ordering. By ordering bulk
                        you can make far more per shirt especially when compared
                        to using a site that does the shipping, designs, and
                        orders for you. The downside to this method is that you
                        will have to do the mailing and orders yourself.
                    </NormalParagraph>

                    <Subtitle>
                        How to increase the success of selling Twitch
                        Merchandise?
                    </Subtitle>
                    <NormalParagraph color={bodyText}>
                        The best Twitch products come from organic interactions
                        and jokes from the community. Help your community
                        remember the funny sayings and moments that happen on
                        stream. Keep a list of all the popular moments and
                        recurring jokes that happen on yoru stream. Use that
                        list of memorable moments to brainstorm funny shirts and
                        swag to sell for your stream. Make sure to build your
                        brand into something authentic that people care about.
                        Remember that a brand is centered on how your viewers
                        perceive you. If you are a likeable person your viewers
                        will be more likely to support your side businesses.
                    </NormalParagraph>
                </RowContainer>

                <HeaderContainer color={pandaNewTeal}>
                    <SecondaryTitleH2 color={flyoutBackground}>
                        Making Money on Twitch Takes a Huge Amount of Dedication
                    </SecondaryTitleH2>
                    <NormalParagraph color={flyoutBackground}>
                        Understand that making money from Twitch can seem to be
                        a very appealing job because of adoring fans and
                        flexible hours. You should also understand that making a
                        considerable living from Twitch takes determination,
                        time, and a bit of luck. If you are curious about making
                        money while playing video games in other ways besides
                        streaming on Twitch, then you might want to check out
                        our webpage on How to Make Money Playing Video Games. If
                        you are struggling to find games to stream on your
                        Twitch stream you can also check out our article on The
                        Top 10 Best Games to Stream on Twitch.{" "}
                    </NormalParagraph>
                </HeaderContainer>

                <RowContainer
                    // onClick={this.navigateToPath("/how-to-make-money-playing-games")}
                    color={flyoutBackground}
                >
                    <MainLink
                        text={
                            "Are you curious about how you can make money playing video games?"
                        }
                        href={"/how-to-make-money-playing-games"}
                        as={"/how-to-make-money-playing-games"}
                    />
                    <NormalParagraphCenter>
                        As the video game industry continues to grow, more and
                        more people are making money from playing games.{" "}
                        <StyleLinkSmall href='/how-to-make-money-playing-games'>
                            Learn how you can make money too from playing video
                            games!
                        </StyleLinkSmall>
                    </NormalParagraphCenter>
                </RowContainer>

                <RowContainer color={slidePurple}>
                    <MainLink
                        text={
                            "Are you looking for new game ideas to make your stream better?"
                        }
                        href={"/best-games-to-stream-on-twitch"}
                        as={"/best-games-to-stream-on-twitch"}
                    />
                    <NormalParagraphCenter color={flyoutBackground}>
                        Here is a list of the top games to stream on Twitch,
                        Mixxer and Youtube Gaming. Are you looking for the best
                        games to play on your stream? Here are the top ten best
                        games to stream for streamers!
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

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
const BreakLine = styled.hr`
    color: ${props => (props.color ? props.color : bodyText)};
    display: block;
    margin-before: 0.5em;
    margin-after: 0.5em;
    margin-start: auto;
    margin-end: auto;
    overflow: hidden;
    border-style: inset;
    border-width: 1px;
`;

const StyledImg = styled.img`
    width: 100%;
    max-width: 800px;
    max-height: 200px;
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
                    <title>
                        {
                            "Top 12 Best Games to Stream On Twitch In 2019 | Blerp"
                        }
                    </title>
                    <meta
                        name='description'
                        content='Best games to stream on Twitch in 2019 and 2018 are listed in the following article. This list of best games to stream on Twitch and Mixxer is Live streaming video games on Twitch is a great way to build an audience and earn extra money.'
                    />
                    <meta
                        name='keywords'
                        content='best games to stream, best games to stream on twitch, best games to stream for pc, best ideas for streaming games, streaming video games, what games should i stream?'
                    />
                </Helmet>
                <NavBar />
                <HeaderContainer color={pandaNewTeal}>
                    <StyledImg
                        alt='Video Game Arcade Image'
                        src='https://storage.googleapis.com/blerp-public-images/twitch/cool_arcade.jpeg'
                    />
                    <MainTitleH1>
                        {"Top 12 Best Games to Stream On Twitch In 2019"}
                    </MainTitleH1>
                    <NormalParagraphCenter color={flyoutBackground}>
                        As more and more people are figuring out how to make
                        money from playing video games, it may be a great idea
                        to jump into the gaming space and see if you can do it
                        too. One of the fastest and most popular ways to make
                        money while playing video games is creating live content
                        for streaming platforms Twitch or Mixxer. It might sound
                        very simple to play video games, but live streaming
                        playing video games can surprisingly be a daunting task
                        to start. You need good equipment, viewers, and a lot of
                        time to successfully grow a Twitch or Mixxer Stream. On
                        top of figuring out the technical problems, you will
                        also need to figure out the business of your stream and
                        as well as what type of games you should stream. We
                        wanted to make the process easier by giving you a list
                        of the top ten best games to stream on Twitch or any
                        other live streaming platform.
                    </NormalParagraphCenter>
                </HeaderContainer>

                <RowContainer color={flyoutBackground}>
                    <SecondaryTitleH2 color={bodyText}>
                        What are the best type of video games to stream for new
                        streamers?
                    </SecondaryTitleH2>
                    <NormalParagraph color={bodyText}>
                        There are many different roles and skills for people
                        interested in making money while playing video games.
                        The different jobs that I am sharing with you have huge
                        disparities in pay and technical talent. The amount of
                        time and hard work required to reach each role may
                        differ immensely as well.
                    </NormalParagraph>

                    <ThirdTitleH3>1. Warcraft III</ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        Back in the day Blizzard owned the Real Time Strategy
                        space with popular titles such as Starcraft and
                        Warcraft. Warcraft III is a perfect game to stream
                        because of its competitive nature and strong fanbase
                        that it still holds. Despite Starcraft II being more
                        popular, you may be surprised that Warcraft III has a
                        strong fanbase with over 40,000 users still actively
                        playing online. Blizzard has announced that they are
                        remastering Warcraft III. Not only will this rejuvenate
                        the old fanbase it may bring in new consumers into the
                        exciting Warcraft III universe. As a streamer you can
                        jump into Warcraft III and even play some of the fun
                        custom games and mods that Warcraft III online has to
                        offer. Dota, one of the most popular Warcraft III Custom
                        games, has helped pioneer the Multiplayer Online Arena
                        Genre. Depending on what type of gamer you are, it may
                        be fun to stream some custom games and have a more
                        playful stream with your viewers. The online aspect of
                        Warcraft III makes it a great game to play with your
                        viewers as well.
                    </NormalParagraph>
                    <ThirdTitleH3>2. Terraria</ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        With every middle school kid and their enthusiastic mom
                        playing Minecraft it may be a good idea to look into
                        other world exploration and sandbox build games.
                        Terraria has been known as the 2D Minecraft. Players in
                        Terraria are digging and finding items. Terraria players
                        can also build items, fight bosses, and progress through
                        the game. Terraria provides a good pace for casual
                        streamers to play the game as well as still communicate
                        with their chat audience. The openness of the game as
                        well as the casualness of the game makes Terraria a
                        great game to play with your viewers as well.
                    </NormalParagraph>
                    <ThirdTitleH3>3. Overcooked</ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        One of the fastest growing couch co op games.
                        Cooperative couch games are generally great to stream
                        for new streamers because watching them can be fun
                        because of the interactions happening between the
                        players in the game. There is no high skill generally
                        needed to successfully stream cooperative couch games
                        such as Overcooked. Overcooked is a great game because
                        players are spending time in a high paced environment
                        trying to fulfill orders. The quick pace of how the
                        rounds are led by a timer makes the game experience an
                        easy thrill to watch. The downside to streaming a game
                        such as Overcooked is you generally need friends to make
                        watching the game more interesting. If you want to be a
                        loner, this game may not be for you. If you are a big
                        fan of cooperative games{" "}
                        <StyleLinkSmall
                            href='https://www.wired.com/gallery/best-local-couch-co-op-games/
'
                        >
                            this article may help you.
                        </StyleLinkSmall>
                    </NormalParagraph>
                    <ThirdTitleH3>5. Squad</ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        Squad is a First Person Shooter that tries to simulate
                        military experiences through promoting tactical
                        communication and teamwork. We chose squad over games
                        like Halo and Call of Duty because of the chance of the
                        game’s popularity to exponentially grow. Squad is still
                        in Early Access meaning that the game is not finished
                        yet but it is released to people who want to try it out.
                        It is a good idea for new streamers to try new games
                        early despite the potential for bugs. For example, the
                        Ninja who got good at Fortnite from the beginning
                        probably benefited from Fortnite’s later growth as it
                        became the number one game on the internet. Because of
                        the required focus to play FPS games, it is harder to
                        create an interactive stream while playing a FPS game.
                    </NormalParagraph>
                    <ThirdTitleH3>6. Mario Party</ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        Mario Party is one of Nintendo’s oldest and most popular
                        multiplayer titles. Mario Party, similar to Overcooked,
                        is a great game to stream with a fun group of people.
                        Mario Party involves playing minigames, stealing coins
                        and stars, and strategically navigating a map in order
                        to properly beat out your friends. If you have the
                        newest Mario Party for the Nintendo Switch then you may
                        even be able to play with your viewers through Super
                        Mario Party online play. Mario Party titles have been
                        known to destroy friendships. It can be hilarious for
                        viewers to see those friendships destroyed on stream.
                    </NormalParagraph>
                    <ThirdTitleH3>7. Runescape</ThirdTitleH3>
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
                    <ThirdTitleH3>8. Apex Legends</ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        Apex legends is the newest popular Battle Royale game on
                        the market. A Battle Royale multiplayer genre where
                        players are put into a map and have to explore, survive,
                        and essentially be the last group standing. As of 2019,
                        Battle Royales are some of the most popular games on the
                        internet. The top three Battle Royales are Fortnite,
                        PubG, and Apex Legends. With all the kids playing
                        Fortnite, you can stand out by playing a version of a
                        Battle Royale with all the cartoon characters stripped
                        out. Streaming a battle royale game may be harder for
                        new streamers because it takes concentration and skill
                        to get really good at playing them. Also in order to
                        stand out in the streaming space you will generally have
                        to be really skillful at the game.
                    </NormalParagraph>
                    <ThirdTitleH3>9. Just Dance</ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        If you want a quick way to build a connection with your
                        viewers. Just dance maybe a great game for viewers to
                        get to know you fast. Just Dance is a game where you
                        follow the dance moves of a character on screen. Just
                        dance can generally be streamed by a screen capture and
                        webcam. Just dance can be streamed alone or you can
                        invite someone else over to share the fun. Even if you
                        are good or bad, Just Dance is generally a very humorous
                        video game for people to watch.{" "}
                    </NormalParagraph>
                    <ThirdTitleH3>10. Dota 2</ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        Dota 2 is the second most popular MOBA on the market.
                        Dota 2 is less popular than its counterpart MOBA game,
                        League of Legends. However, one may find a higher chance
                        of finding a niche within Dota 2 because there are less
                        streamers streaming the game. Just like battle royale
                        games, MOBAs are highly popular and competitive. It
                        generally takes high skill and determination to become a
                        valuable streamer in any game within the MOBA space. If
                        you want to stand out in the MOBA space you can even
                        consider getting good at playing the characters in a
                        nonconventional way using non standard builds.{" "}
                    </NormalParagraph>
                    <ThirdTitleH3>11. BeatSaber</ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        We couldn’t have an amazing game list without adding a
                        Virtual Reality game to it. Beatsaber is a great game to
                        stream because it’s surprisingly mesmerizing to watch
                        sporadic people swing lightsabers at blocks to a beat of
                        a song. Streaming VR is possible but it requires a bit
                        more setup. The downside to this game is you will need a
                        really good computer and a VR system in order to play
                        it. Streaming a virtual reality game may give you an
                        edge because virtual reality is an industry that is
                        still under developed. Other exciting VR titles to
                        stream are VRchat, and Robo Recall. If you are more
                        curious about streaming even more virtual reality games
                        then{" "}
                        <StyleLinkSmall href='https://uploadvr.com/how-to-stream-vr-games/'>
                            this article may help you out.
                        </StyleLinkSmall>
                    </NormalParagraph>
                    <ThirdTitleH3>12. Amnesia</ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        People love the reactions of a streamers playing
                        frightening games. If scary games such as Resident Evil,
                        Dead by Daylight, and Half Life aren’t enough for you
                        then trying a game like Amnesia for your stream may be a
                        great way to attract new viewers. Amnesia is a great
                        game to stream because of the luring mystery and jump
                        scares that exist within the game. If you want even more
                        engagement to your stream you can use our Blerp Twitch
                        Extension and enable the horror sound effects soundboard
                        to your stream. Allowing your viewers to interact with
                        you as you explore the haunted genre will help your
                        viewers feel more invested in the stream and can open up
                        new reactions that make your stream more unique and
                        exciting.{" "}
                    </NormalParagraph>
                </RowContainer>

                <HeaderContainer color={pandaNewTeal}>
                    <SecondaryTitleH2 color={flyoutBackground}>
                        Need more ideas of games to stream on Twitch, Youtube
                        Gaming, and Mixxer? Here are four bonus tips on how you
                        can find more games and ideas to stream.
                    </SecondaryTitleH2>
                    <BreakLine />
                    <ThirdTitleH3 color={flyoutBackground}>
                        Find Games With Great Narratives or Stories
                    </ThirdTitleH3>
                    <NormalParagraph color={flyoutBackground}>
                        Streaming games with a good narrative is a great idea
                        because viewers watching your stream can experience a
                        story with you. Story games provide can provide a movie
                        like experience for those streaming and watching the
                        stream. There are engaging story titles such as Braid,
                        Paper Mario, Undertale, Celeste, Cave Story, The Stanley
                        Parable, Portal 2,To the Moon, and Life is Strange.
                    </NormalParagraph>
                    <ThirdTitleH3 color={flyoutBackground}>
                        Look for New Indie Game or Student Game Releases
                    </ThirdTitleH3>
                    <NormalParagraph color={flyoutBackground}>
                        If you are an adventurous gamer, it may be fun just to
                        look on Steam and Kickstarter for new indie titles each
                        week to stream. You can even look at colleges with top
                        student video game programs and see if the end of the
                        year video game projects are online to download. Some
                        colleges such as the University of Utah post their
                        published games online.
                        https://games.utah.edu/student-games/ Trying out student
                        indie games will not only be an economical way for you
                        to add variety to your stream but it could also prompt
                        you to find unexplored and aggressively creative
                        experiences. You could even reach out to the students
                        who published the game and see if they had any tips or
                        ideas on streaming their game to people. Streaming
                        upcoming and small developer games are a great way to
                        keep your stream fresh.
                    </NormalParagraph>
                    <ThirdTitleH3 color={flyoutBackground}>
                        Revisit Old Fun Classic Games and Titles
                    </ThirdTitleH3>
                    <NormalParagraph color={flyoutBackground}>
                        If you are looking for a dose of nostalgia a great way
                        to make your stream fun is to add classic games to your
                        library. It may be fun to pull classic titles from old
                        Sega and Nintendo releases. Viewers may find it
                        enjoyable to see you beat the Classic Super Mario game
                        for the first time or even battling it out with your
                        friends in the old Bomberman games. A great way to
                        access a lot of the older classic games is by
                        downloading a good classic console emulator and
                        downloading ROM files of the game. The legality of
                        emulators is in the grey area. This means that people
                        are not completely certain whether or not using
                        emulators to play games is legal. The uncertainty of the
                        legality may also mean that streaming certain games on
                        an emulator may or may not be compliant with Twitch’s
                        terms of use. While the chances are low for getting
                        banned for streaming old classic games, it is good to
                        understand that using emulators may open some risks.
                    </NormalParagraph>

                    <ThirdTitleH3 color={flyoutBackground}>
                        Try streaming Jackbox TV
                    </ThirdTitleH3>
                    <NormalParagraph color={flyoutBackground}>
                        Playing games that allow you play with your viewers can
                        be a great way to get your viewers involved. Jackbox TV
                        released a variety of games that allow people to simply
                        connect with using any computer or phone browser.
                        JackboxTV games will remind you of your favorite party
                        board games that you play in real life such as Apples to
                        Apples and Cards Against Humanity. It is very popular
                        for many streamers to stream with their viewers playing
                        Jackbox TV games.
                    </NormalParagraph>

                    <ThirdTitleH3 color={flyoutBackground}>
                        Choosing the right games to stream on Twitch can help
                        you grow followers faster
                    </ThirdTitleH3>

                    <NormalParagraph color={flyoutBackground}>
                        Starting up a stream and becoming a new streamer can be
                        very overwhelming. Hopefully this list of Best Video
                        Games to Stream can help ease your streaming decisions
                        as you decide to a live streaming career. If you are
                        looking for more ways on how you can make money playing
                        video games, check out our previous post here. If you
                        have comments or suggestions feel free to reach out to
                        us at press@blerp.com or join our Discord Channel. If
                        you have a game that you believe should make our next
                        top game list feel free to share that game with us as
                        well!
                    </NormalParagraph>
                </HeaderContainer>

                <RowContainer
                    // onClick={this.navigateToPath("/how-to-make-money-playing-games")}
                    color={flyoutBackground}
                >
                    <MainLink
                        text={
                            "Did you know people can make money playing video games?"
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

import React, { useState, useContext } from "react";
import withData from "../lib/withData";
import NavBar from "../components/navigation/navbar";
import { Helmet } from "react-helmet";
import styled, { ThemeContext } from "styled-components";
import { Row } from "../components/shared/ProfileTabViews/ProfileStyledComponents";
import Footer from "../components/navigation/footer";
import {
    Text,
    Button,
    Icon,
    Input,
    HeaderH1,
    InputArea,
    Modal,
} from "../components/theme/Theme";
import FAQ from "../components/shared/FAQ/FAQ";

const StyledDiscordText = styled(Text)`
    a {
        padding: 8px;
    }
`;

const StyledDiscordTextH1 = styled(HeaderH1)`
    a {
        padding: 8px;
    }
`;

const Header = styled.div`
    background-image: url(https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Discord/Background%20Purple%20blerp%20texture.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    height: 90vh;
    justify-content: center;
`;

const Card = styled.div`
    width: 60%;
    height: auto;
    place-self: center;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(15px);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;
    max-width: 730px;

    @media (max-width: 600px) {
        width: 95%;
    }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;

const DiscordContainerIcon = styled(Icon)``;

const DiscordContainerText = styled(StyledDiscordText)`
    @media (max-width: 600px) {
        font-size: 24px;
    }
`;

const DiscordContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border: 2px solid ${props => props.theme.colors.notBlack};
    border-radius: 8px;
    transition: 0.1s;

    &:hover {
        background-color: ${props => props.theme.colors.notBlack};
    }

    &:hover ${DiscordContainerText} {
        color: white;
    }

    &:hover ${DiscordContainerIcon} {
        background-image: url(https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Discord/Blerp%20wordmark%20white.svg);
    }

    @media (max-width: 600px) {
        width: 100%;
    }
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 120%;
    padding-left: 30px;
    align-self: center;
`;

const ScrollItem = styled.div`
    width: 550px;
    height: auto;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    @media (max-width: 600px) {
        justify-content: center;
    }

    & ${TextContainer} {
        @media (max-width: 600px) {
            width: 50%;
        }
    }

    & ${StyledDiscordText} {
        @media (max-width: 600px) {
            font-size: 1em;
        }
    }

    & ${Icon} {
        @media (max-width: 600px) {
            width: 80px !important;
            height: 80px !important;
            background-size: 80px 80px !important;
            margin-right: 10px !important;
        }
    }
`;

const SideScrollContent = styled.div`
    display: flex;
    height: 150px;
    width: 2200px;
    transform: translate3d(0, 0, 0);
    transition: 0.2s;

    --webkit-scrollbar {
        display: none;
    }
`;

const SideScrollContainer = styled.div`
    display: flex;
    width: 550px;
    height: 150px;
    overflow: hidden;
    margin-left: 100px;

    @media (max-width: 600px) {
        margin-left: -60px;
    }
`;

const StepItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 30%;

    @media (max-width: 600px) {
        width: 80%;
        margin: 60px 0;
    }

    & ${StyledDiscordText} {
        @media (max-width: 600px) {
            line-height: 30px;
        }
    }
`;

const StepContainer = styled(Row)`
    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center !important;
    }
`;

StyledDiscordText.defaultProps = {
    style: { margin: "7px 0" },
    fontColor: "notBlack",
};

const QuestionText = styled(StyledDiscordText)`
    margin: 0 0 35px 0 !important;
`;

const AnswerText = styled(StyledDiscordText)`
    margin: 0 0 0 80px !important;
    line-height: 25px !important;
`;

const StyledRow = styled(Row)`
    flex-direction: column;
    border-bottom: 2px solid ${props => props.theme.grey3};
    padding: 40px;
`;

const Page = props => {
    const theme = useContext(ThemeContext);
    return (
        <>
            <Helmet>
                <title>
                    Blerp Meme Soundboard for Discord | Soundboard for Discord |
                    Blerp
                </title>
                <meta
                    name='description'
                    content="Soundboard for discord is the best way to search, share, and play sounds and audio clips within discord voice chtas. Blerp's Discord meme soundboard bot pulls audio clips from blerp's large database of sound clips. The soundboard for discord uses blerp's meme sound packs to make your Discord server more fun and engaging!"
                />
                <meta
                    property='og:description'
                    content="Soundboard for discord is the best way to search, share, and play sounds and audio clips within discord voice chtas. Blerp's Discord meme soundboard bot pulls audio clips from blerp's large database of sound clips. The soundboard for discord uses blerp's meme sound packs to make your Discord server more fun and engaging!"
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
                <meta
                    property='og:video'
                    content='https://www.youtube.com/watch?v=0cctIZvKFac'
                />
            </Helmet>
            <NavBar initialSearchQuery={props.searchQuery} />
            <Header>
                <Card>
                    <Row style={{ justifyContent: "center", margin: "30px" }}>
                        <StyledDiscordTextH1
                            fontSize='40px'
                            fontColor='notBlack'
                        >
                            Blerp Soundboard for Discord
                        </StyledDiscordTextH1>
                    </Row>
                    <Row style={{ justifyContent: "center" }}>
                        <StyledDiscordText
                            fontSize='28px'
                            fontWeight='light'
                            fontColor='grey6'
                            style={{ textAlign: "center", lineHeight: "30px" }}
                        >
                            1 Million + Sound alerts & Soundboards for your
                            discord server.
                        </StyledDiscordText>
                    </Row>
                    <Row
                        style={{
                            justifyContent: "center",
                            margin: "40px auto",
                        }}
                    >
                        <Icon
                            style={{
                                width: "120px",
                                height: "120px",
                                backgroundSize: "120px 120px",
                                borderRadius: "0",
                            }}
                            url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Twitch/BlerpIcon%20Ibis.svg'
                        />
                        <StyledDiscordText
                            fontSize='75px'
                            style={{ height: "45px", placeSelf: "center" }}
                        >
                            +
                        </StyledDiscordText>
                        <Icon
                            style={{
                                width: "120px",
                                height: "120px",
                                backgroundSize: "120px 120px",
                                borderRadius: "0",
                            }}
                            url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Discord/Discord%20logo.svg'
                        />
                    </Row>

                    <Row
                        style={{ justifyContent: "center", marginTop: "30px" }}
                    >
                        <a
                            href='https://discordapp.com/oauth2/authorize?client_id=421504209997791232&scope=bot&permissions=104197184'
                            target='_blank'
                            rel='noreferrer'
                            style={{ textDecoration: "none" }}
                        >
                            <Button buttonType='secondary'>Get the bot</Button>
                        </a>
                    </Row>
                </Card>
            </Header>
            <div style={{ backgroundColor: theme.colors.white }}>
                <Row style={{ width: "57%" }}>
                    <StyledDiscordText
                        fontSize='40px'
                        style={{ lineHeight: "50px", margin: "10px 0" }}
                    >
                        Blerp Discord Soundboard Bot
                    </StyledDiscordText>
                </Row>
                <Row style={{ width: "57%", padding: "8px" }}>
                    <StyledDiscordText fontSize='21px' fontWeight='light'>
                        Play the dankest audio memes in Discord using our
                        discord soundboard bot and sound effects library.
                    </StyledDiscordText>
                </Row>
                <Row style={{ width: "57%", marginBottom: "100px" }}>
                    <iframe
                        width='100%'
                        height='600'
                        src='https://www.youtube.com/embed/0cctIZvKFac'
                        frameBorder='0'
                        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                    ></iframe>
                </Row>
                <StyledRow>
                    <StyledDiscordText
                        fontSize='48px'
                        style={{ margin: "0 0 15px 0" }}
                    >
                        FAQ
                    </StyledDiscordText>
                    <StyledDiscordText fontSize='21px' fontWeight='light'>
                        Check out our frequently asked questions. Don’t see an
                        answer to the question you have? Feel free to
                        <a href='/support'>
                            <StyledDiscordText style={{ display: "inline" }}>
                                contact us
                            </StyledDiscordText>
                        </a>
                    </StyledDiscordText>
                </StyledRow>
                <StyledRow>
                    <QuestionText fontSize='32px'>
                        Q: How do I add the Blerp soundboard bot to our server?
                    </QuestionText>
                    <AnswerText fontSize='21px' fontWeight='light'>
                        A: Admins can use the following link to add the bot to
                        your server:
                        <a
                            href='https://discordapp.com/oauth2/authorize?client_id=421504209997791232&scope=bot&permissions=104197184'
                            target='_blank'
                            rel='noreferrer'
                        >
                            <StyledDiscordText style={{ display: "inline" }}>
                                Add Discord Bot
                            </StyledDiscordText>
                        </a>
                    </AnswerText>
                </StyledRow>
                <StyledRow>
                    <QuestionText fontSize='32px'>
                        Q: How do I play a blerp?
                    </QuestionText>
                    <AnswerText fontSize='21px' fontWeight='light'>
                        A: Simply type b!search/ b!play [Search word] in a chat.
                        The bot will either join the voice chat that you’re in
                        or if you’re not in a voice chat it will just link the
                        sound file. You will have the option to select and play
                        from five top soundbites for that search query.
                    </AnswerText>
                </StyledRow>
                <StyledRow>
                    <QuestionText fontSize='32px'>
                        Q: Can I access my own blerps and boards?
                    </QuestionText>
                    <AnswerText fontSize='21px' fontWeight='light'>
                        A: Yes! You can access your boards with b!board command.
                        You will need the URL of your blerp board that you can
                        get from
                        <a href='/'>
                            <StyledDiscordText style={{ display: "inline" }}>
                                www.blerp.com
                            </StyledDiscordText>
                        </a>
                    </AnswerText>
                </StyledRow>
                <StyledRow>
                    <QuestionText fontSize='32px'>
                        Q: Can blerp display more than 5 blerps at a time?
                    </QuestionText>
                    <AnswerText fontSize='21px' fontWeight='light'>
                        A: Yeah, you can do different commands that return a
                        different quantity of blerps, for example b!search
                        command returns a bunch of different blerps you can play
                        and scroll through using reactions.
                    </AnswerText>
                </StyledRow>
                <StyledRow>
                    <QuestionText fontSize='32px'>
                        Q: How do I make my own soundbite?
                    </QuestionText>
                    <AnswerText fontSize='21px' fontWeight='light'>
                        A: To make a soundbite go to www.blerp.com, sign into
                        your account and click “Create” at the top right corner!
                    </AnswerText>
                </StyledRow>
                <Row
                    style={{
                        justifyContent: "center",
                        margin: "70px auto 30px auto",
                        width: "50%",
                    }}
                >
                    <StyledDiscordText
                        fontSize='24px'
                        fontColor='notBlack'
                        fontWeight='light'
                        style={{ lineHeight: "32px", textAlign: "center" }}
                    >
                        If you need help you can use the b!help command when
                        using the bot, for specific questions you can join our
                        Discord or
                        <a href='/support'>
                            <StyledDiscordText style={{ display: "inline" }}>
                                contact us
                            </StyledDiscordText>
                        </a>
                    </StyledDiscordText>
                </Row>
                <Row style={{ justifyContent: "center", marginBottom: "10px" }}>
                    <StyledDiscordText
                        fontSize='16px'
                        fontColor='notBlack'
                        fontWeight='light'
                    >
                        Join our discord
                    </StyledDiscordText>
                </Row>
                <Row
                    style={{ justifyContent: "center", paddingBottom: "100px" }}
                >
                    <a
                        href='https://discordapp.com/oauth2/authorize?client_id=421504209997791232&scope=bot&permissions=104197184'
                        target='_blank'
                        rel='noreferrer'
                        style={{
                            textDecoration: "none",
                            color: theme.colors.notBlack,
                        }}
                    >
                        <DiscordContainer
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                border: "2px solid",
                                padding: "0 16px",
                            }}
                        >
                            <a
                                href='https://discord.com/invite/zYSsRxm'
                                target='_blank'
                                rel='noreferrer'
                                style={{
                                    textDecoration: "none",
                                    color: theme.colors.notBlack,
                                    display: "flex",
                                }}
                            >
                                <DiscordContainerIcon
                                    style={{
                                        width: "200px",
                                        height: "100px",
                                        borderRadius: "0",
                                        backgroundSize: "90% 90%",
                                    }}
                                    hoverUrl='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Discord/Blerp%20wordmark%20white.svg'
                                    url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Discord/Blerp%20wordmark%20black.svg'
                                />
                                <DiscordContainerText
                                    style={{ placeSelf: "center" }}
                                    fontSize='42px'
                                    fontColor='notBlack'
                                >
                                    Discord Server
                                </DiscordContainerText>
                            </a>
                        </DiscordContainer>
                    </a>
                </Row>
            </div>
            <Footer />
        </>
    );
};

export default withData(Page);

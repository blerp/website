import React, { useState, useContext, useRef, useEffect } from "react";
import withData from "../lib/withData";
import NavBar from "../components/navigation/navbar";
import { Helmet } from "react-helmet";
import styled, { ThemeContext } from "styled-components";
import { Row } from "../components/shared/ProfileTabViews/ProfileStyledComponents";
import Footer from "../components/navigation/footer";
import {
    Text,
    HeaderH1,
    Button,
    Icon,
    Input,
    InputArea,
    Modal,
} from "../components/theme/Theme";
import FAQ from "../components/shared/FAQ/FAQ";
import { useWindowSize } from "../lib/ScreenSizeHook";

const StyledTwitchText = styled(Text)``;

const StyledTwitchTextH1 = styled(HeaderH1)``;

const Header = styled.div`
    background-image: url(https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Twitch/Twitch%20Background.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    display: flex;
    height: 90vh;
    justify-content: center;

    @media (max-width: 600px) {
        height: auto;
    }
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
    margin: 30px 0;
    min-width: 730px;
    max-width: 730px;

    @media (max-width: 600px) {
        min-width: 200px !important;
        width: 95%;
    }

    @media (max-width: 1000px) {
        min-width: 600px;
        width: 90%;
    }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;

const DiscordContainerIcon = styled(Icon)``;

const DiscordContainerText = styled(StyledTwitchText)`
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
        width: 300px;
    }

    & ${TextContainer} {
        @media (max-width: 600px) {
            width: 50%;
        }
    }

    & ${StyledTwitchText} {
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
    width: ${props => (props.size.width <= 600 ? "300px" : "550px")};
    height: 150px;
    overflow: hidden;
    margin: 0 auto;

    @media (max-width: 600px) {
        margin: 0 auto;
        height: 200px;
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

    & ${StyledTwitchText} {
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

const QuestionText = styled(StyledTwitchText)`
    margin: 0 0 35px 0 !important;
    line-height: 40px;
`;

const ColorBar = styled.div`
    position: sticky;
    top: 80px;
    background-color: ${props => props.theme.colors.ibisRed};
    height: 4px;
    width: 100%;
    z-index: 8000;

    @media (max-width: 1000px) {
        display: none;
    }
`;

const StickyRow = styled(Row)`
    position: sticky;
    top: 84px;
    height: 50px;
    width: 100%;
    background-color: ${props => props.theme.colors.waxing};
    display: flex;
    justify-content: center;
    place-items: center;
    z-index: 8000;

    @media (max-width: 600px) {
        display: none;
    }

    & ${StyledTwitchText} {
        margin: 0 30px !important;
        cursor: pointer;
    }
`;

StyledTwitchText.defaultProps = {
    style: { margin: "7px 0" },
    fontColor: "notBlack",
};

const AnswerText = styled(StyledTwitchText)`
    margin: 0 0 0 80px !important;
    line-height: 25px !important;
`;

const Dot = styled.div`
    width: 8px;
    height: 8px;
    background-color: ${props =>
        props.active ? props.theme.colors.ibisRed : props.theme.colors.grey3};
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
`;

const StyledRow = styled(Row)`
    flex-direction: column;
    border-bottom: 2px solid ${props => props.theme.grey3};
    padding: 40px;

    @media (max-width: 600px) {
        padding: 10px !important;
    }
`;

const Page = props => {
    const size = useWindowSize();
    const [activeDot, setActiveDot] = useState("dot1");
    const theme = useContext(ThemeContext);
    const [moveTo, setMoveTo] = useState(size.width <= 600 ? 300 : 550);

    const scroll1 = useRef();
    const scroll2 = useRef();
    const scroll3 = useRef();
    const scroll4 = useRef();

    useEffect(() => {
        const interval = setInterval(() => {
            if (activeDot === "dot4") {
                setActiveDot("dot1");
                setMoveTo(size.width <= 600 ? 300 : 550);
                document.getElementById(
                    "scroll-me",
                ).style.transform = `translate3d(0px, 0px, 0)`;
            } else {
                document.getElementById(
                    "scroll-me",
                ).style.transform = `translate3d(-${moveTo}px, 0px, 0)`;
                setMoveTo(size.width <= 600 ? moveTo + 300 : moveTo + 550);
                setActiveDot(
                    activeDot => `dot${parseInt(activeDot.split("t")[1]) + 1}`,
                );
            }
        }, 4000);

        return () => {
            clearInterval(interval);
        };
    }, [moveTo, activeDot]);

    const handleScrollClick = value => {
        if (value === "scroll1") {
            scroll1.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        } else if (value === "scroll2") {
            scroll2.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        } else if (value === "scroll3") {
            scroll3.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        } else if (value === "scroll4") {
            scroll4.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };
    return (
        <>
            <Helmet>
                <title>{`Blerp Tools for Live Streamers on Twitch | Best Sound Effects for Streamers`}</title>
                <meta
                    name='description'
                    content='Blerp streaming tools are built to help you create a more powerful community as well as add new engagement for your live streams. Check out our following guides to learn how you can use blerps to make your stream more fun.'
                />
                <meta
                    property='og:description'
                    content='Blerp streaming tools are built to help you create a more powerful community as well as add new engagement for your live streams. Check out our following guides to learn how you can use blerps to make your stream more fun.'
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
                    content='https://www.youtube.com/watch?v=cocBamyqNec'
                />
            </Helmet>
            <NavBar initialSearchQuery={props.searchQuery} />
            <ColorBar />
            <StickyRow>
                <StyledTwitchText
                    onClick={() => handleScrollClick("scroll1")}
                    fontSize='18px'
                    fontWeight='light'
                >
                    Overview
                </StyledTwitchText>
                <StyledTwitchText
                    onClick={() => handleScrollClick("scroll2")}
                    fontSize='18px'
                    fontWeight='light'
                >
                    How to install
                </StyledTwitchText>
                <StyledTwitchText
                    onClick={() => handleScrollClick("scroll3")}
                    fontSize='18px'
                    fontWeight='light'
                >
                    Set up for success
                </StyledTwitchText>
                <StyledTwitchText
                    onClick={() => handleScrollClick("scroll4")}
                    fontSize='18px'
                    fontWeight='light'
                >
                    FAQ
                </StyledTwitchText>
            </StickyRow>
            <div style={{ position: "absolute", top: 0 }} ref={scroll1}></div>
            <Header>
                <Card>
                    <Row
                        style={{
                            justifyContent: "center",
                            margin: "30px 30px 10px 30px",
                        }}
                    >
                        <StyledTwitchTextH1
                            style={{ lineHeight: "40px", textAlign: "center" }}
                            fontSize='40px'
                            fontColor='notBlack'
                        >
                            Blerp Sound Alerts for Twitch
                        </StyledTwitchTextH1>
                    </Row>
                    <Row style={{ justifyContent: "center" }}>
                        <StyledTwitchText
                            fontSize='28px'
                            fontWeight='light'
                            fontColor='grey6'
                            style={{ textAlign: "center", lineHeight: "30px" }}
                        >
                            1 Million + Sound effects & Soundboards for your
                            Twitch stream.
                        </StyledTwitchText>
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
                        <StyledTwitchText
                            fontSize='75px'
                            style={{ height: "45px", placeSelf: "center" }}
                        >
                            +
                        </StyledTwitchText>
                        <Icon
                            style={{
                                width: "120px",
                                height: "120px",
                                backgroundSize: "120px 120px",
                                borderRadius: "0",
                            }}
                            url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Twitch/TwitchGlitchpurple.svg'
                        />
                    </Row>
                    <SideScrollContainer size={size}>
                        <SideScrollContent id='scroll-me'>
                            <ScrollItem
                                data-pos='0px'
                                onClick={() => {
                                    document.getElementById(
                                        "scroll-me",
                                    ).style.transform = `translate3d(-550px, 0px, 0)`;
                                    setActiveDot("dot2");
                                    setMoveTo(550);
                                }}
                            >
                                <Icon
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                        backgroundSize: "120px 120px",
                                        borderRadius: "0",
                                        marginRight: "30px",
                                    }}
                                    url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Twitch/Rating%20Icon.svg'
                                />
                                <TextContainer
                                    style={{
                                        borderLeft: `2px solid ${theme.colors.ibisRed}`,
                                    }}
                                >
                                    <StyledTwitchText
                                        fontSize='23px'
                                        fontWeight='light'
                                    >
                                        Royalty Free Content
                                    </StyledTwitchText>
                                    <StyledTwitchText
                                        fontSize='30px'
                                        fontColor='notBlack'
                                    >
                                        Set the Rating (G-R)
                                    </StyledTwitchText>
                                    <StyledTwitchText
                                        fontSize='21px'
                                        fontWeight='light'
                                    >
                                        You choose what sounds your viewer can
                                        see and share.
                                    </StyledTwitchText>
                                </TextContainer>
                            </ScrollItem>
                            <ScrollItem
                                data-pos='-660px'
                                onClick={() => {
                                    document.getElementById(
                                        "scroll-me",
                                    ).style.transform = `translate3d(-1100px, 0px, 0)`;
                                    setActiveDot("dot3");
                                    setMoveTo(1100);
                                }}
                            >
                                <Icon
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                        backgroundSize: "120px 120px",
                                        borderRadius: "0",
                                        marginRight: "30px",
                                    }}
                                    url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Twitch/Cool%20Down%20Icon.svg'
                                />
                                <TextContainer
                                    style={{
                                        borderLeft: `2px solid ${theme.colors.buntingBlue}`,
                                    }}
                                >
                                    <StyledTwitchText
                                        fontSize='23px'
                                        fontWeight='light'
                                    >
                                        Cool down
                                    </StyledTwitchText>
                                    <StyledTwitchText
                                        fontSize='30px'
                                        fontColor='notBlack'
                                    >
                                        Set the time between shares
                                    </StyledTwitchText>
                                    <StyledTwitchText
                                        fontSize='21px'
                                        fontWeight='light'
                                    >
                                        You set the tone and pace of your
                                        stream.
                                    </StyledTwitchText>
                                </TextContainer>
                            </ScrollItem>
                            <ScrollItem
                                data-pos='-1320px'
                                onClick={() => {
                                    document.getElementById(
                                        "scroll-me",
                                    ).style.transform = `translate3d(-1650px, 0px, 0)`;
                                    setActiveDot("dot4");
                                    setMoveTo(1650);
                                }}
                            >
                                <Icon
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                        backgroundSize: "120px 120px",
                                        borderRadius: "0",
                                        marginRight: "30px",
                                    }}
                                    url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Twitch/Pricing%20Icon.svg'
                                />
                                <TextContainer
                                    style={{
                                        borderLeft: `2px solid ${theme.colors.seafoam}`,
                                    }}
                                >
                                    <StyledTwitchText
                                        fontSize='23px'
                                        fontWeight='light'
                                    >
                                        Price
                                    </StyledTwitchText>
                                    <StyledTwitchText
                                        fontSize='30px'
                                        fontColor='notBlack'
                                    >
                                        Optimize donations
                                    </StyledTwitchText>
                                    <StyledTwitchText
                                        fontSize='21px'
                                        fontWeight='light'
                                    >
                                        Set the price for the stream and
                                        individual Soundboards
                                    </StyledTwitchText>
                                </TextContainer>
                            </ScrollItem>
                            <ScrollItem
                                data-pos='-1980px'
                                onClick={() => {
                                    document.getElementById(
                                        "scroll-me",
                                    ).style.transform = `translate3d(0px, 0px, 0)`;
                                    setActiveDot("dot1");
                                    setMoveTo(0);
                                }}
                            >
                                <Icon
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                        backgroundSize: "120px 120px",
                                        borderRadius: "0",
                                        marginRight: "30px",
                                    }}
                                    url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Twitch/History%20icon.svg'
                                />
                                <TextContainer
                                    style={{
                                        borderLeft: `2px solid ${theme.colors.starling}`,
                                    }}
                                >
                                    <StyledTwitchText
                                        fontSize='23px'
                                        fontWeight='light'
                                    >
                                        History
                                    </StyledTwitchText>
                                    <StyledTwitchText
                                        fontSize='30px'
                                        fontColor='notBlack'
                                    >
                                        Donation log
                                    </StyledTwitchText>
                                    <StyledTwitchText
                                        fontSize='21px'
                                        fontWeight='light'
                                    >
                                        See who donated what on your stream.
                                    </StyledTwitchText>
                                </TextContainer>
                            </ScrollItem>
                        </SideScrollContent>
                    </SideScrollContainer>
                    <Row
                        style={{
                            justifyContent: "center",
                            margin: "20px 0",
                        }}
                    >
                        <Dot
                            active={activeDot === "dot1"}
                            onClick={() => {
                                document.getElementById(
                                    "scroll-me",
                                ).style.transform = `translate3d(0px, 0px, 0)`;
                                setActiveDot("dot1");
                                setMoveTo(0);
                            }}
                        />
                        <Dot
                            active={activeDot === "dot2"}
                            onClick={() => {
                                document.getElementById(
                                    "scroll-me",
                                ).style.transform = `translate3d(-550px, 0px, 0)`;
                                setActiveDot("dot2");
                                setMoveTo(550);
                            }}
                        />
                        <Dot
                            active={activeDot === "dot3"}
                            onClick={() => {
                                document.getElementById(
                                    "scroll-me",
                                ).style.transform = `translate3d(-1100px, 0px, 0)`;
                                setActiveDot("dot3");
                                setMoveTo(1100);
                            }}
                        />
                        <Dot
                            active={activeDot === "dot4"}
                            onClick={() => {
                                document.getElementById(
                                    "scroll-me",
                                ).style.transform = `translate3d(-1650px, 0px, 0)`;
                                setActiveDot("dot4");
                                setMoveTo(1650);
                            }}
                        />
                    </Row>
                    <Row
                        style={{ justifyContent: "center", marginTop: "30px" }}
                    >
                        <a
                            href='https://dashboard.twitch.tv/extensions/oafn7vvzfyzyccwrwrt233221oe5wq-0.1.57'
                            target='_blank'
                            rel='noreferrer'
                            style={{ textDecoration: "none" }}
                        >
                            <Button buttonType='secondary'>Get Started</Button>
                        </a>
                    </Row>
                </Card>
            </Header>
            <div
                style={{ position: "absolute", top: "900px" }}
                ref={scroll2}
            ></div>
            <Row style={{ width: "57%", marginTop: "60px" }}>
                <StyledTwitchText
                    fontSize='48px'
                    style={{ lineHeight: "50px", margin: "10px 0" }}
                >
                    More viewer interactions on your stream ... More BITs
                </StyledTwitchText>
            </Row>
            <Row style={{ width: "57%" }}>
                <StyledTwitchText fontSize='21px' fontWeight='light'>
                    Sound donations live in stream
                </StyledTwitchText>
            </Row>
            <Row style={{ width: "57%", marginBottom: "100px" }}>
                <iframe
                    width='100%'
                    height='600'
                    src='https://www.youtube.com/embed/ktnCuqAOlNI'
                    frameBorder='0'
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                ></iframe>
            </Row>
            <div
                style={{ position: "absolute", top: "1700px" }}
                ref={scroll3}
            ></div>
            <Row style={{ justifyContent: "center" }}>
                <StyledTwitchText
                    fontSize='64px'
                    style={{ lineHeight: "60px", margin: "10px 0" }}
                >
                    How do you make the most of the Blerp Twitch Extension?
                </StyledTwitchText>
            </Row>
            <StepContainer
                style={{
                    justifyContent: "space-around",
                    width: "90%",
                    alignItems: "self-start",
                    margin: "80px auto",
                }}
            >
                <StepItem>
                    <Icon
                        style={{
                            width: "140px",
                            height: "140px",
                            backgroundSize: "140px 140px",
                        }}
                        url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Twitch/Step%201%20Educate%20Icon.svg'
                    />
                    <StyledTwitchText
                        fontSize='36px'
                        style={{ lineHeight: "30px", margin: "10px 0" }}
                    >
                        Educate your viewers
                    </StyledTwitchText>
                    <StyledTwitchText fontSize='21px' fontWeight='light'>
                        Add a !blerp command to your stream title with a
                        description of what blerp is.
                    </StyledTwitchText>
                </StepItem>
                <StepItem>
                    <Icon
                        style={{
                            width: "140px",
                            height: "140px",
                            backgroundSize: "140px 140px",
                        }}
                        url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Twitch/Step%202%20Create%20boards%20Icon.svg'
                    />
                    <StyledTwitchText
                        fontSize='36px'
                        style={{ lineHeight: "30px", margin: "10px 0" }}
                    >
                        Feature the right content
                    </StyledTwitchText>
                    <StyledTwitchText fontSize='21px' fontWeight='light'>
                        You know your community, feature the soundboards they
                        will love.
                    </StyledTwitchText>
                </StepItem>
                <StepItem>
                    <Icon
                        style={{
                            width: "140px",
                            height: "140px",
                            backgroundSize: "140px 140px",
                        }}
                        url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Twitch/Step%203%20Create%20Blerp%20moments%20Icon.svg'
                    />
                    <StyledTwitchText
                        fontSize='36px'
                        style={{ lineHeight: "30px", margin: "10px 0" }}
                    >
                        Blerp the Best moments from your stream
                    </StyledTwitchText>
                    <StyledTwitchText fontSize='21px' fontWeight='light'>
                        Highlight your stream! Have your moderators create
                        unique Blerps from your stream.
                    </StyledTwitchText>
                </StepItem>
            </StepContainer>
            <div
                style={{ position: "absolute", top: "2300px" }}
                ref={scroll4}
            ></div>
            {/* <Row>
          Soundboards
        </Row> */}
            <StyledRow>
                <StyledTwitchText
                    fontSize='48px'
                    style={{ margin: "0 0 15px 0" }}
                >
                    FAQ
                </StyledTwitchText>
                <StyledTwitchText fontSize='21px' fontWeight='light'>
                    Check out our frequently asked questions. Don’t see an
                    answer to the question you have? Feel free to{" "}
                    <a href='/support'>
                        <StyledTwitchText
                            style={{
                                display: "inline-block",
                                borderBottom: "2px solid black",
                            }}
                        >
                            contact us.
                        </StyledTwitchText>
                    </a>
                </StyledTwitchText>
            </StyledRow>
            <StyledRow>
                <QuestionText fontSize='32px' fontColor='notBlack'>
                    Q: Which OBS do we support?
                </QuestionText>
                <AnswerText fontSize='21px' fontWeight='light'>
                    A: Blerp supports any OBS that accepts a URL element.{" "}
                    <a href='/twitch/streaming-guides/streamlabs'>
                        <StyledTwitchText
                            style={{
                                display: "inline-block",
                                borderBottom: "2px solid black",
                            }}
                        >
                            Learn how
                        </StyledTwitchText>
                    </a>{" "}
                    to install Blerp on some popular OBS’s
                </AnswerText>
            </StyledRow>
            <StyledRow>
                <QuestionText fontSize='32px' fontColor='notBlack'>
                    Q: What about copyright and DMCA?
                </QuestionText>
                <AnswerText fontSize='21px' fontWeight='light'>
                    A: Blerp 10 second soundbites are covered by DMCA as they
                    don’t take away from the original content. We also have a
                    “no music” filter that blocks all music content from being
                    shared on your stream.{" "}
                    <a href='/legal'>
                        <StyledTwitchText
                            style={{
                                display: "inline-block",
                                borderBottom: "2px solid black",
                            }}
                        >
                            Learn more.
                        </StyledTwitchText>
                    </a>
                </AnswerText>
            </StyledRow>
            <StyledRow>
                <QuestionText fontSize='32px' fontColor='notBlack'>
                    Q: What about Music?
                </QuestionText>
                <AnswerText fontSize='21px' fontWeight='light'>
                    A: Quickly filter out any music sounds from being viewed and
                    played on your stream. By enabling the block music filter in
                    the configuration panel under content.
                </AnswerText>
            </StyledRow>
            <StyledRow>
                <QuestionText fontSize='32px' fontColor='notBlack'>
                    Q: Can I use Blerp even though I’m not an affiliate or
                    partner on Twitch?
                </QuestionText>
                <AnswerText fontSize='21px' fontWeight='light'>
                    A: Yes! In fact some of our most successful streamers have
                    less than 1,000 followers. Small communities that embrace
                    blerp and create their own content have really done well!
                </AnswerText>
            </StyledRow>
            <Header>
                <Card
                    style={{
                        height: "300px",
                        padding: "20px",
                        width: "600px",
                        minWidth: "300px",
                    }}
                >
                    <Row
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                            margin: "0 0",
                            height: "100%",
                        }}
                    >
                        <Row
                            style={{
                                justifyContent: "center",
                                margin: "0 0",
                                width: "100%",
                            }}
                        >
                            <Icon
                                style={{
                                    width: "210px",
                                    height: "210px",
                                    backgroundSize: "contain",
                                    borderRadius: "0",
                                }}
                                url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Twitch/BlerpIcon%20Ibis.svg'
                            />
                            <StyledTwitchText
                                fontSize='140px'
                                style={{ height: "80px", placeSelf: "center" }}
                            >
                                +
                            </StyledTwitchText>
                            <Icon
                                style={{
                                    width: "180px",
                                    height: "180px",
                                    backgroundSize: "contain",
                                    borderRadius: "0",
                                }}
                                url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Twitch/TwitchGlitchpurple.svg'
                            />
                        </Row>
                        <a
                            href='https://dashboard.twitch.tv/extensions/oafn7vvzfyzyccwrwrt233221oe5wq-0.1.57'
                            target='_blank'
                            rel='noreferrer'
                            style={{ textDecoration: "none" }}
                        >
                            <Button buttonType='secondary' fontSize='big'>
                                View Extension
                            </Button>
                        </a>
                    </Row>
                </Card>
            </Header>
            <Footer />
        </>
    );
};

export default withData(Page);

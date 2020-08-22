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

const StyledWalkonText = styled(Text)``;
const StyledWalkonTextH1 = styled(HeaderH1)``;

const Header = styled.div`
    background-image: url(https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/WalkOn/WalkOn%20Background%20image.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
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

const DiscordContainerIcon = styled(Icon)``;

const DiscordContainerText = styled(StyledWalkonText)`
    @media (max-width: 600px) {
        font-size: 24px;
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

    & ${StyledWalkonText} {
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

StyledWalkonText.defaultProps = {
    style: { margin: "7px 0" },
    fontColor: "notBlack",
};

const QuestionText = styled(StyledWalkonText)`
    margin: 0 0 35px 0 !important;
    line-height: 30px;
`;

const AnswerText = styled(StyledWalkonText)`
    margin: 0 0 0 80px !important;
    line-height: 25px !important;
`;

const StyledRow = styled(Row)`
    flex-direction: column;
    border-bottom: 2px solid ${props => props.theme.grey3};
    padding: 40px;

    @media (max-width: 600px) {
        padding: 10px !important;
    }
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

const ColorBar = styled.div`
    position: sticky;
    top: 80px;
    background-color: ${props => props.theme.colors.starling};
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
    z-index: 10000;

    & ${StyledWalkonText} {
        margin: 0 30px !important;
        cursor: pointer;
    }
`;

const Page = props => {
    const size = useWindowSize();
    const [activeDot, setActiveDot] = useState("dot1");
    const [moveTo, setMoveTo] = useState(size.width <= 600 ? 300 : 550);
    const theme = useContext(ThemeContext);

    useEffect(() => {
        const interval = setInterval(() => {
            if (activeDot === "dot3") {
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
            <Header>
                <Card>
                    <Row style={{ justifyContent: "center", margin: "30px" }}>
                        <StyledWalkonTextH1
                            fontSize='40px'
                            fontColor='notBlack'
                            style={{ lineHeight: "40px", textAlign: "center" }}
                        >
                            Blerp Walkon Sounds for Twitch
                        </StyledWalkonTextH1>
                    </Row>
                    <Row style={{ justifyContent: "center" }}>
                        <StyledWalkonText
                            fontSize='28px'
                            fontWeight='light'
                            fontColor='grey6'
                            style={{ textAlign: "center", lineHeight: "30px" }}
                        >
                            1 Million + Sound alerts & Soundboards for your
                            stream.
                        </StyledWalkonText>
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
                            url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/WalkOn/WalkonOverlayIcon.svg'
                        />
                        <StyledWalkonText
                            fontSize='75px'
                            style={{ height: "45px", placeSelf: "center" }}
                        >
                            +
                        </StyledWalkonText>
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
                                data-pos='-660px'
                                onClick={() => {
                                    document.getElementById(
                                        "scroll-me",
                                    ).style.transform = `translate3d(-550px, 0px, 0)`;
                                    setActiveDot("dot2");
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
                                    url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/WalkOn/Engagment%20Icon.svg'
                                />
                                <TextContainer
                                    style={{
                                        borderLeft: `2px solid ${theme.colors.seafoam}`,
                                    }}
                                >
                                    <StyledWalkonText
                                        fontSize='23px'
                                        fontWeight='light'
                                    >
                                        Engagement
                                    </StyledWalkonText>
                                    <StyledWalkonText
                                        fontSize='30px'
                                        fontColor='notBlack'
                                    >
                                        More Engagement
                                    </StyledWalkonText>
                                    <StyledWalkonText
                                        fontSize='21px'
                                        fontWeight='light'
                                    >
                                        Increase your viewer engagement on your
                                        stream!
                                    </StyledWalkonText>
                                </TextContainer>
                            </ScrollItem>
                            <ScrollItem
                                data-pos='-1320px'
                                onClick={() => {
                                    document.getElementById(
                                        "scroll-me",
                                    ).style.transform = `translate3d(-1100px, 0px, 0)`;
                                    setActiveDot("dot3");
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
                                    url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/WalkOn/Subscription%20Icon.svg'
                                />
                                <TextContainer
                                    style={{
                                        borderLeft: `2px solid ${theme.colors.starling}`,
                                    }}
                                >
                                    <StyledWalkonText
                                        fontSize='23px'
                                        fontWeight='light'
                                    >
                                        Subscribers
                                    </StyledWalkonText>
                                    <StyledWalkonText
                                        fontSize='30px'
                                        fontColor='notBlack'
                                    >
                                        More Subs
                                    </StyledWalkonText>
                                    <StyledWalkonText
                                        fontSize='21px'
                                        fontWeight='light'
                                    >
                                        Let your subscribers stand out!
                                    </StyledWalkonText>
                                </TextContainer>
                            </ScrollItem>
                            <ScrollItem
                                data-pos='0px'
                                onClick={() => {
                                    document.getElementById(
                                        "scroll-me",
                                    ).style.transform = `translate3d(0px, 0px, 0)`;
                                    setActiveDot("dot1");
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
                                    <StyledWalkonText
                                        fontSize='23px'
                                        fontWeight='light'
                                    >
                                        Royalty Free Content
                                    </StyledWalkonText>
                                    <StyledWalkonText
                                        fontSize='30px'
                                        fontColor='notBlack'
                                    >
                                        Set the Rating (G-R)
                                    </StyledWalkonText>
                                    <StyledWalkonText
                                        fontSize='21px'
                                        fontWeight='light'
                                    >
                                        You choose what sounds your viewer can
                                        see and share.
                                    </StyledWalkonText>
                                </TextContainer>
                            </ScrollItem>
                        </SideScrollContent>
                    </SideScrollContainer>
                    <Row style={{ justifyContent: "center", marginTop: "0px" }}>
                        <Dot active={activeDot === "dot1"} />
                        <Dot active={activeDot === "dot2"} />
                        <Dot active={activeDot === "dot3"} />
                    </Row>
                    <Row
                        style={{ justifyContent: "center", marginTop: "30px" }}
                    >
                        <a
                            href='https://dashboard.twitch.tv/extensions/xptj7dr0lk3xri8fkjot9w7n36zv12-0.0.19'
                            target='_blank'
                            rel='noreferrer'
                            style={{ textDecoration: "none" }}
                        >
                            <Button buttonType='secondary'>Get Started</Button>
                        </a>
                    </Row>
                </Card>
            </Header>
            <Row style={{ width: "57%", marginTop: "60px" }}>
                <StyledWalkonText
                    fontSize='48px'
                    style={{ lineHeight: "50px", margin: "10px 0" }}
                >
                    More subscribers with WalkOn Twitch Extension
                </StyledWalkonText>
            </Row>
            <Row style={{ width: "57%", marginBottom: "100px" }}>
                <iframe
                    width='100%'
                    height='600'
                    src='https://www.youtube.com/embed/YNs2KIF7PAg'
                    frameBorder='0'
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                ></iframe>
            </Row>
            {/* <Row>
          Soundboards
        </Row> */}
            <StyledRow>
                <StyledWalkonText
                    fontSize='48px'
                    style={{ margin: "0 0 15px 0" }}
                >
                    FAQ
                </StyledWalkonText>
                <StyledWalkonText fontSize='21px' fontWeight='light'>
                    Check out our frequently asked questions. Don’t see an
                    answer to the question you have? Feel free to
                    <a href='/support'>
                        <StyledWalkonText>contact us.</StyledWalkonText>
                    </a>
                </StyledWalkonText>
            </StyledRow>
            <StyledRow>
                <QuestionText fontSize='32px'>
                    Q: What sounds can be used on stream?
                </QuestionText>
                <AnswerText fontSize='21px' fontWeight='light'>
                    A: Any approved and rated sound can be used on stream!
                    *Blerps created on the site will be rated and playable
                    within 24 hours!
                </AnswerText>
            </StyledRow>
            <StyledRow>
                <QuestionText fontSize='32px'>
                    Q: What about copyright and DMCA?
                </QuestionText>
                <AnswerText fontSize='21px' fontWeight='light'>
                    A: Blerp 10 second soundbites are covered by DMCA as they
                    don’t take away from the original content. We also have a
                    “no music” filter that blocks all music content from being
                    shared on your stream.{" "}
                    <a href='/legal'>
                        <StyledWalkonText>Learn more.</StyledWalkonText>
                    </a>
                </AnswerText>
            </StyledRow>
            <StyledRow>
                <QuestionText fontSize='32px'>
                    Q: Can I use Walk on even though I’m not an affiliate or
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
                                url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/WalkOn/WalkonOverlayIcon.svg'
                            />
                            <StyledWalkonText
                                fontSize='140px'
                                style={{ height: "45px", placeSelf: "center" }}
                            >
                                +
                            </StyledWalkonText>
                            <Icon
                                style={{
                                    width: "210px",
                                    height: "210px",
                                    backgroundSize: "180px 180px",
                                    borderRadius: "0",
                                }}
                                url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Twitch/TwitchGlitchpurple.svg'
                            />
                        </Row>
                        <a
                            href='https://dashboard.twitch.tv/extensions/xptj7dr0lk3xri8fkjot9w7n36zv12-0.0.19'
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

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
    InputArea,
    GenericModal,
} from "../components/theme/Theme";

const StyledSupportText = styled(Text)`
    cursor: pointer;
`;

const Header = styled.div`
    background-image: url(https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Twitch/Twitch%20Background.png);
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
    max-width: 600px;

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

const DiscordContainerText = styled(StyledSupportText)`
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

StyledSupportText.defaultProps = {
    style: { margin: "10px 0" },
};

const Page = props => {
    const [helpType, setHelpType] = useState("Help");
    const [email, setEmail] = useState("help@blerp.com");
    const [body, setBody] = useState("");
    const [name, setName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const theme = useContext(ThemeContext);
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
            <Header>
                <Card>
                    <Row style={{ justifyContent: "center", margin: "30px" }}>
                        <StyledSupportText
                            fontSize='46px'
                            fontWeight='light'
                            fontColor='notBlack'
                        >
                            Contact Us
                        </StyledSupportText>
                    </Row>
                    <Row style={{ justifyContent: "center" }}>
                        <StyledSupportText
                            fontSize='18px'
                            fontWeight='light'
                            fontColor='grey6'
                        >
                            Question concerns or help? Send us a message and
                            we’ll get back as soon as we can.
                        </StyledSupportText>
                    </Row>
                    <Row style={{ margin: "30px", flexDirection: "column" }}>
                        <StyledSupportText fontSize='16px' fontColor='notBlack'>
                            I'd like to connect about:
                        </StyledSupportText>
                        <GenericModal
                            gridColumns={"100px"}
                            trigger={
                                <Button
                                    buttonType='custom'
                                    style={{ backgroundColor: "white" }}
                                    rounding='square'
                                >
                                    {helpType}{" "}
                                    <Icon
                                        size='small'
                                        style={{ marginLeft: "10px" }}
                                        noHover
                                        url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Discord/Down%20arrow.svg'
                                    />
                                </Button>
                            }
                        >
                            {({ handleCloseClick }) => (
                                <>
                                    <StyledSupportText
                                        fontColorHover='ibisRed'
                                        fontSize='16px'
                                        fontColor='notBlack'
                                        fontWeight='light'
                                        onClick={() => {
                                            setHelpType("Help");
                                            handleCloseClick();
                                            setEmail("help@blerp.com");
                                        }}
                                    >
                                        Help
                                    </StyledSupportText>
                                    <StyledSupportText
                                        fontColorHover='ibisRed'
                                        fontSize='16px'
                                        fontColor='notBlack'
                                        fontWeight='light'
                                        onClick={() => {
                                            setHelpType("Feedback");
                                            handleCloseClick();
                                            setEmail("feedback@blerp.com");
                                        }}
                                    >
                                        Feedback
                                    </StyledSupportText>
                                    <StyledSupportText
                                        fontColorHover='ibisRed'
                                        fontSize='16px'
                                        fontColor='notBlack'
                                        fontWeight='light'
                                        onClick={() => {
                                            setHelpType("Partnerships");
                                            handleCloseClick();
                                            setEmail("partnerships@blerp.com");
                                        }}
                                    >
                                        Partnerships
                                    </StyledSupportText>
                                    <StyledSupportText
                                        fontColorHover='ibisRed'
                                        fontSize='16px'
                                        fontColor='notBlack'
                                        fontWeight='light'
                                        onClick={() => {
                                            setHelpType("Press");
                                            handleCloseClick();
                                            setEmail("press@blerp.com");
                                        }}
                                    >
                                        Press
                                    </StyledSupportText>
                                    <StyledSupportText
                                        fontColorHover='ibisRed'
                                        fontSize='16px'
                                        fontColor='notBlack'
                                        fontWeight='light'
                                        onClick={() => {
                                            setHelpType("Legal");
                                            setEmail("legal@blerp.com");
                                            handleCloseClick();
                                        }}
                                    >
                                        Legal
                                    </StyledSupportText>
                                    <StyledSupportText
                                        fontColorHover='ibisRed'
                                        fontSize='16px'
                                        fontColor='notBlack'
                                        fontWeight='light'
                                        onClick={() => {
                                            setHelpType("API");
                                            setEmail("api@blerp.com");
                                            handleCloseClick();
                                        }}
                                    >
                                        API
                                    </StyledSupportText>
                                </>
                            )}
                        </GenericModal>
                    </Row>
                    <Row style={{ justifyContent: "space-around" }}>
                        <InputContainer>
                            <StyledSupportText
                                fontSize='18px'
                                fontColor='notBlack'
                            >
                                Name
                            </StyledSupportText>
                            <Input
                                onChange={e => setName(e.target.value)}
                                style={{ width: "95%" }}
                                fontSize='small'
                                rounding='none'
                                placeholder='John van Blerp'
                            />
                        </InputContainer>
                        <InputContainer>
                            <StyledSupportText
                                fontSize='18px'
                                fontColor='notBlack'
                            >
                                E-mail
                            </StyledSupportText>
                            <Input
                                onChange={e => setUserEmail(e.target.value)}
                                style={{ width: "95%" }}
                                fontSize='small'
                                rounding='none'
                                placeholder='John@Blerp.com'
                            />
                        </InputContainer>
                    </Row>
                    <Row>
                        <InputContainer style={{ width: "100%" }}>
                            <StyledSupportText
                                fontSize='18px'
                                fontColor='notBlack'
                            >
                                Message
                            </StyledSupportText>
                            <InputArea
                                onChange={e => setBody(e.target.value)}
                                rows={6}
                                rounding='none'
                                placeholder='John van Blerp'
                                style={{ width: "95%" }}
                            />
                        </InputContainer>
                    </Row>
                    <Row
                        style={{ justifyContent: "center", marginTop: "30px" }}
                    >
                        <a
                            style={{
                                textDecoration: "none",
                            }}
                            href={`mailto:${email}?body=Name%3A%20${encodeURI(
                                name,
                            )}%0D%0AE-Mail%3A%20${encodeURI(
                                userEmail,
                            )}%0D%0AMessage%3A%0D%0A${encodeURI(body)}`}
                        >
                            <Button>Send</Button>
                        </a>
                    </Row>
                </Card>
            </Header>
            <Row
                style={{
                    justifyContent: "center",
                    margin: "70px auto 30px auto",
                    width: "50%",
                }}
            >
                <StyledSupportText
                    fontSize='24px'
                    fontColor='notBlack'
                    fontWeight='light'
                    style={{ lineHeight: "32px", textAlign: "center" }}
                >
                    Have feedback? Do you want to make Blerp better? Join our
                    Discord server!
                </StyledSupportText>
            </Row>
            <Row style={{ justifyContent: "center" }}>
                <StyledSupportText
                    fontSize='16px'
                    fontColor='notBlack'
                    fontWeight='light'
                >
                    Join our discord
                </StyledSupportText>
            </Row>
            <Row style={{ justifyContent: "center", marginBottom: "100px" }}>
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
            </Row>
            <Footer />
        </>
    );
};

export default withData(Page);

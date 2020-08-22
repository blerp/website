import React, { useState } from "react";
import withData from "../lib/withData";
import NavBar from "../components/navigation/navbar";
import { Helmet } from "react-helmet";
import styled, { ThemeProvider } from "styled-components";
import { Row } from "../components/shared/ProfileTabViews/ProfileStyledComponents";
import Footer from "../components/navigation/footer";
import { Text, Button, Icon, Input, Modal } from "../components/theme/Theme";

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
    width: 40%;
    height: 65%;
    place-self: center;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(15px);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Page = props => {
    const [helpType, setHelpType] = useState("Help");
    return (
        <ThemeProvider theme={{ mode: "light" }}>
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
                        <Row
                            style={{ justifyContent: "center", margin: "30px" }}
                        >
                            <Text
                                fontSize='46px'
                                fontWeight='light'
                                fontColor='notBlack'
                            >
                                Contact Us
                            </Text>
                        </Row>
                        <Row style={{ justifyContent: "center" }}>
                            <Text
                                fontSize='18px'
                                fontWeight='light'
                                fontColor='grey6'
                            >
                                Question concerns or help? Send us a message and
                                we’ll get back as soon as we can.
                            </Text>
                        </Row>
                        <Row
                            style={{ margin: "30px", flexDirection: "column" }}
                        >
                            <Text fontSize='16px' fontColor='notBlack'>
                                I'd like to connect about:
                            </Text>
                            <Modal
                                gridColumns={1}
                                trigger={
                                    <Button
                                        buttonType='custom'
                                        style={{ backgroundColor: "white" }}
                                        rounding='square'
                                    >
                                        {helpType} <Icon noHover url='' />
                                    </Button>
                                }
                            >
                                <Text
                                    fontColorHover='ibisRed'
                                    onClick={() => setHelpType("Help")}
                                >
                                    Help
                                </Text>
                                <Text
                                    fontColorHover='ibisRed'
                                    onClick={() => setHelpType("Feedback")}
                                >
                                    Feedback
                                </Text>
                                <Text
                                    fontColorHover='ibisRed'
                                    onClick={() => setHelpType("Partnerships")}
                                >
                                    Partnerships
                                </Text>
                                <Text
                                    fontColorHover='ibisRed'
                                    onClick={() => setHelpType("Press")}
                                >
                                    Press
                                </Text>
                                <Text
                                    fontColorHover='ibisRed'
                                    onClick={() => setHelpType("Legal")}
                                >
                                    Legal
                                </Text>
                                <Text
                                    fontColorHover='ibisRed'
                                    onClick={() => setHelpType("API")}
                                >
                                    API
                                </Text>
                            </Modal>
                        </Row>
                        <Row>
                            <InputContainer>
                                <Text>Name</Text>
                                <Input
                                    rounding='none'
                                    placeholder='John van Blerp'
                                />
                            </InputContainer>
                        </Row>
                    </Card>
                </Header>
                <Footer />
            </>
        </ThemeProvider>
    );
};

export default withData(Page);

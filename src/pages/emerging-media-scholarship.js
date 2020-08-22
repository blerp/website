import React from "react";
import withData from "../lib/withData";
import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";
import styled from "styled-components";
import { Text } from "../components/theme/Theme";
import { Row } from "../components/shared/ProfileTabViews/ProfileStyledComponents";
import { Helmet } from "react-helmet";

const StyledCareersText = styled(Text)`
    margin: 40px 20px;

    a {
        color: black;
        font-size: 21px;
        padding: 0px 4px;
    }
`;

const FlexItem = styled.div`
    flex: 1 1 0;
    width: 0;
`;

StyledCareersText.defaultProps = {
    fontColor: "notBlack",
    fontSize: "21px",
    fontWeight: "light",
    style: { lineHeight: "30px" },
};

const Header = styled.div`
    display: flex;
    place-content: center;
    background-image: url(https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Twitch/Twitch%20Background.png);
    width: 100%;
    height: 292px;
`;

const RowText = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1 1 0px;
`;

const Container = styled.div`
    width: 70%;
    margin: 0 auto;
`;

const LineBreak = styled.div`
    width: 100%;
    height: 2px;
    background-color: ${props => props.theme.colors.grey3};
`;

const Column = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
`;

const Page = props => {
    return (
        <>
            <Helmet>
                <title>
                    {"Blerp | Emerging Media Scholarship | Sound Memes"}
                </title>
                <meta
                    name='description'
                    content='Blerp emerging media scholarship is for students of all ages. We are hoping to build the next generation of creative individuals who are looking to change the world.'
                />
                <meta
                    name='keywords'
                    content='soundboards, sound memes, audio clips, emerging live media content, blerp, blerp sounds, audio quotes, best soundboard, Favorite Movies, sounds, funny quotes, tv show moments, great games, funny sound, quotes, movie soundboard, blurp, song lyrics, music snippets'
                />
            </Helmet>
            <NavBar />
            <Header>
                <StyledCareersText
                    style={{
                        placeSelf: "center",
                        lineHeight: "68px",
                        textAlign: "center",
                    }}
                    fontColor='white'
                    fontSize='64px'
                    fontWeight='normal'
                >
                    Blerp Emerging Media Scholarship
                </StyledCareersText>
            </Header>
            <Container>
                <StyledCareersText>
                    <Text
                        style={{
                            placeSelf: "center",
                            lineHeight: "40px",
                            textAlign: "left",
                        }}
                        fontColor='black'
                        fontSize='40px'
                        fontWeight='normal'
                    >
                        About
                    </Text>
                    <br />
                    About Blerp Inc. is the search engine for sound bringing
                    audio expression to millions of people. Blerp is the easiest
                    way to add audio to any moment through its integrations in
                    <a href='/twitch-extension'>Livestreams</a>,{" "}
                    <a href='/discord-soundboard-bot'>Voice chats</a>, and{" "}
                    <a href='/mobile-apps'>Messaging</a>.
                    <br />
                    <br />
                    We’re deeply passionate about the future of expression and
                    how people connect as new technologies arise and are
                    adopted. Blerp is supporting students on their education
                    path with the announcing of their scholarship essay contest
                    - the Blerp Emerging Media Scholarship. The essay winner
                    selected will be awarded $1000 towards their studies.
                    <br />
                    <br />
                    Today there is more than 1.5x audio content consumed than
                    any other form of media. We see a world where sound is able
                    to enrich and enhance any moment. Blerp reaches over 2.5
                    million viewers each week through its integration on Twitch
                    and hundreds of thousands more through its integration on
                    Discord.
                </StyledCareersText>
                <LineBreak />
                <RowText>
                    <FlexItem>
                        <StyledCareersText>
                            <Text
                                style={{
                                    placeSelf: "center",
                                    lineHeight: "28px",
                                    textAlign: "left",
                                }}
                                fontColor='black'
                                fontSize='28px'
                                fontWeight='normal'
                            >
                                WHO IS ELIGIBLE?
                            </Text>
                            <br />
                            At Blerp, we believe in fostering a community of
                            diverse thinkers who work hard to innovate new ideas
                            that change the world. We believe in building
                            communities where people aren’t afraid to stand out,
                            take risks, and be different. We work to build these
                            environments because we believe that people who have
                            courage to take risks and chase their dreams have a
                            higher chance of adding value to this society.
                        </StyledCareersText>
                    </FlexItem>
                    <FlexItem>
                        <StyledCareersText>
                            <Text
                                style={{
                                    placeSelf: "center",
                                    lineHeight: "28px",
                                    textAlign: "left",
                                }}
                                fontColor='black'
                                fontSize='28px'
                                fontWeight='normal'
                            >
                                HOW TO ENTER?
                            </Text>
                            <br />
                            Any student who fits the eligibility requirements
                            listed above can apply for the Blerp Emerging Media
                            Scholarship. To enter, student must submit a{" "}
                            <b>500- 700-word essay,</b> or a video (less than 3
                            minutes long) on <b>one of the following topics:</b>
                            <br />
                            <br />
                            <b>Topic 1:</b>
                            <br />
                            How has live streaming and gaming changed the way we
                            consume media?
                            <br />
                            <br />
                            <b>Topic 2:</b>
                            <br />
                            What unique characteristics about sound alone convey
                            a message differently than video or text?
                            <br />
                            <br />
                            <b> Topic 3:</b>
                            <br />
                            Why is self-expression an important part of our
                            everyday communication?
                        </StyledCareersText>
                    </FlexItem>
                </RowText>
                <RowText>
                    <FlexItem>
                        <StyledCareersText>
                            <Text
                                style={{
                                    placeSelf: "center",
                                    lineHeight: "28px",
                                    textAlign: "left",
                                }}
                                fontColor='black'
                                fontSize='28px'
                                fontWeight='normal'
                            >
                                SUBMISSION DEADLINE
                            </Text>
                            <br />
                            The essay submission deadline is 12:00am MST,
                            December 1, for spring semester.
                            <br />
                            <br />
                        </StyledCareersText>
                    </FlexItem>
                    <FlexItem>
                        <StyledCareersText>
                            <Text
                                style={{
                                    placeSelf: "center",
                                    lineHeight: "28px",
                                    textAlign: "left",
                                }}
                                fontColor='black'
                                fontSize='28px'
                                fontWeight='normal'
                            >
                                SELECTION PROCESS AND NOTIFICATION{" "}
                            </Text>
                            <br />
                            The Blerp Emerging Media Scholarship committee will
                            review all essays received and one winner will be
                            chosen for fall and spring academic semester. The
                            scholarship winner will be announced on the{" "}
                            <a
                                href='https://blerp.com'
                                target='_blank'
                                rel='noreferrer'
                            >
                                www.blerp.com
                            </a>{" "}
                            website two weeks after the application deadline.
                            The winner will also be notified via email.
                            <br />
                        </StyledCareersText>
                    </FlexItem>
                </RowText>
            </Container>
            <Column>
                <iframe
                    src='https://docs.google.com/forms/d/e/1FAIpQLSfap8z1TjxTArXdm7tcuW5w-065-NVSCuQV7wIIedDxFeq9NA/viewform?embedded=true'
                    width='640'
                    height='1302'
                    frameBorder='0'
                    marginHeight='0'
                    marginWidth='0'
                >
                    Loading…
                </iframe>
            </Column>
            <Footer />
        </>
    );
};

export default withData(Page);

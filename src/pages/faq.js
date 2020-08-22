import React from "react";
import withData from "../lib/withData";
import { Row } from "../components/shared/ProfileTabViews/ProfileStyledComponents";
import { Text, Icon } from "../components/theme/Theme";
import styled from "styled-components";
import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";

// Text.defaultProps = {
//     fontColor: "notBlack",
// };
const StyledText = styled(Text)``;

StyledText.defaultProps = {
    fontColor: "notBlack",
};

const QuestionText = styled(StyledText)`
    margin: 0 0 35px 0 !important;
    line-height: 30px;
`;

const AnswerText = styled(StyledText)`
    margin: 0 0 0 80px;
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

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/FAQ/Web%20Faq.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    position: fixed;
    z-index: -1;
`;

const Wrapper = styled.div`
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(15px);
`;

const Page = props => {
    return (
        <>
            <NavBar />
            <Container></Container>
            <Wrapper>
                <StyledRow>
                    <StyledText
                        fontSize='48px'
                        style={{ margin: "50px 0 15px 0" }}
                    >
                        FAQ
                    </StyledText>
                    <StyledText fontSize='21px' fontWeight='light'>
                        Check out our frequently asked questions. Don’t see an
                        answer to the question you have? Feel free to{" "}
                        <a href='/support'>
                            <StyledText
                                style={{
                                    display: "inline-block",
                                    borderBottom: "2px solid black",
                                }}
                            >
                                contact us.
                            </StyledText>
                        </a>
                    </StyledText>
                </StyledRow>
                <StyledRow>
                    <QuestionText fontSize='32px'>
                        Q: What’s a Blerp?
                    </QuestionText>
                    <AnswerText fontSize='21px' fontWeight='light'>
                        A: A Blerp is a short sharable soundbite! Blerps are no
                        longer than 10 seconds and usually are the best part of
                        a quote, song or sound effect. Browse our categories to
                        get inspired!
                    </AnswerText>
                </StyledRow>
                <StyledRow>
                    <QuestionText fontSize='32px'>
                        Q: What’s a Soundboard?
                    </QuestionText>
                    <AnswerText fontSize='21px' fontWeight='light'>
                        A: A soundboard is a collection of similar Blerps! Think
                        of it like a folder. You can organize the best Blerps in
                        to soundboards for easier access and share-ability.
                    </AnswerText>
                </StyledRow>
                <StyledRow>
                    <QuestionText fontSize='32px'>
                        Q: What about copyright?
                    </QuestionText>
                    <AnswerText fontSize='21px' fontWeight='light'>
                        A: Blerp’s library of content is covered by DMCA law.
                        Each Blerp is less than ten seconds long and track
                        licensing. If a user would like to request take down,
                        you can report each Blerp and board by clicking the{" "}
                        <Icon
                            style={{
                                display: "inline-block",
                                margin: "0 5px",
                                backgroundSize: "contain",
                                cursor: "auto",
                                borderRadius: "0",
                                width: "5px",
                                height: "5px",
                            }}
                            url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/FAQ/3%20dot.svg'
                        />{" "}
                        icon then report.
                    </AnswerText>
                </StyledRow>
                <StyledRow>
                    <QuestionText fontSize='32px'>
                        Q: Can I make a Blerp?
                    </QuestionText>
                    <AnswerText fontSize='21px' fontWeight='light'>
                        A: Of course! But only on our website for now, just
                        click the{" "}
                        <Icon
                            style={{
                                display: "inline-block",
                                margin: "0 5px",
                                backgroundSize: "contain",
                                cursor: "auto",
                                borderRadius: "0",
                                width: "70px",
                                height: "10px",
                            }}
                            url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/FAQ/create%20icon.svg'
                        />
                        button in the top navigation bar on any page of our
                        website!
                    </AnswerText>
                </StyledRow>
                <StyledRow>
                    <QuestionText fontSize='32px'>
                        Q: Can I make a Soundboard?
                    </QuestionText>
                    <AnswerText fontSize='21px' fontWeight='light'>
                        A: Yes you can! From your Account you can create a blank
                        soundboard. Or, from the share menu on any Blerp, Just
                        hit the{" "}
                        <Icon
                            style={{
                                display: "inline-block",
                                margin: "0 5px",
                                backgroundSize: "contain",
                                cursor: "auto",
                                borderRadius: "0",
                                width: "5px",
                                height: "5px",
                            }}
                            url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/FAQ/share%20icon.svg'
                        />{" "}
                        Or{" "}
                        <Icon
                            style={{
                                display: "inline-block",
                                margin: "0 5px",
                                backgroundSize: "contain",
                                cursor: "auto",
                                borderRadius: "0",
                                width: "5px",
                                height: "5px",
                            }}
                            url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/FAQ/3%20dot.svg'
                        />
                        , to add a Blerp to a new or existing board.
                    </AnswerText>
                </StyledRow>
                <StyledRow>
                    <QuestionText fontSize='32px'>
                        Q: Do you guys have an App?
                    </QuestionText>
                    <AnswerText fontSize='21px' fontWeight='light'>
                        A: Ya we do! We have an{" "}
                        <a
                            target='_blank'
                            rel='noreferrer'
                            href='https://play.google.com/store/apps/details?id=com.lolibe.blerp&hl=en_US'
                        >
                            <StyledText
                                style={{
                                    display: "inline-block",
                                    borderBottom: "2px solid black",
                                }}
                            >
                                Android
                            </StyledText>
                        </a>{" "}
                        and{" "}
                        <a
                            target='_blank'
                            rel='noreferrer'
                            href='https://apps.apple.com/us/app/blerp-audio-meme-soundboards/id1235261552'
                        >
                            <StyledText
                                style={{
                                    display: "inline-block",
                                    borderBottom: "2px solid black",
                                }}
                            >
                                IOS App
                            </StyledText>
                        </a>
                        . Our IOS app even includes a Keyboard extension so you
                        can share Blerps in iMessage.{" "}
                        <a href='/apps'>
                            <StyledText
                                style={{
                                    display: "inline-block",
                                    borderBottom: "2px solid black",
                                }}
                            >
                                Learn more.
                            </StyledText>
                        </a>
                    </AnswerText>
                </StyledRow>
                <StyledRow>
                    <QuestionText fontSize='32px'>
                        Q: I found an awesome Blerp! Now what?
                    </QuestionText>
                    <AnswerText fontSize='21px' fontWeight='light'>
                        A: Congrats! If it’s good enough you can add it to a
                        sound board so you can quickly find it again! If you
                        know someone who might like it you can click the share
                        icon or and share the Blerp on your favorite platform!
                    </AnswerText>
                </StyledRow>
                <StyledRow>
                    <QuestionText fontSize='32px'>
                        Q: I’m a Streamer how can I use Blerp?
                    </QuestionText>
                    <AnswerText
                        style={{ marginBottom: "80px" }}
                        fontSize='21px'
                        fontWeight='light'
                    >
                        A: If you’re a Twitch streamer you can check out our
                        Blerp Sound Alerts Extension and our Walk on Extension.
                        We’re working on more creator tools! Sign up now to be a
                        beta tester.
                    </AnswerText>
                </StyledRow>
            </Wrapper>
            <Footer />
        </>
    );
};

export default withData(Page);

import React from "react";
import withData from "../lib/withData";
import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";
import styled from "styled-components";
import { Text } from "../components/theme/Theme";
import { Row } from "../components/shared/ProfileTabViews/ProfileStyledComponents";

const StyledCareersText = styled(Text)`
    margin: 40px 0;

    a {
        font-size: 21px;
        padding: 0px 4px;
    }
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

const Container = styled.div`
    width: 70%;
    margin: 0 auto;
`;

const LineBreak = styled.div`
    width: 100%;
    height: 2px;
    background-color: ${props => props.theme.colors.grey3};
`;

const Page = props => {
    return (
        <>
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
                    Audio Expression For Any Moment
                </StyledCareersText>
            </Header>
            <Container>
                <StyledCareersText>
                    <b>About</b>
                    <br />
                    Blerp is the audio expression platform for you to find,
                    create, and share short soundbites. ​You can easily search
                    and share our vast​ ​library of short audio clips through
                    voice assistants, voice chats, and live streams, and
                    messaging! Blerp is the quickest way to add audio
                    expressions to any moment.
                    <br />
                    <br />
                    <b>Values</b>
                    <br />
                    At Blerp, we believe in fostering a community of diverse
                    thinkers who work hard to innovate new ideas that change the
                    world. We believe in building communities where people
                    aren’t afraid to stand out, take risks, and be different. We
                    work to build these environments because we believe that
                    people who have courage to take risks and chase their dreams
                    have a higher chance of adding value to this society.
                    <br />
                    <br />
                    <b>Mission</b>
                    <br />
                    Our focus is to build products that truly enable people to
                    create, connect, and communicate in a more unique and
                    engaging way. We saw that by making audio easier to find and
                    share we could take our attentions away from our screens and
                    focus on the people around us.
                    <br />
                    <br />
                    <b>Team</b>
                    <br />
                    What started as a side project from a college dorm has now
                    become a story of trying to build a successful consumer app
                    company in Utah. Follow us at{" "}
                    <a
                        href='https://twitter.com/blerp'
                        target='_blank'
                        rel='noreferrer'
                    >
                        twitter
                    </a>
                    , read our
                    <a href='/blog'>blog</a>, or even listen to our
                    <a href='/podcast'>podcast</a>
                    at anchor or our founder’s podcast to listen to our whole
                    story!
                </StyledCareersText>
            </Container>
            <Footer />
        </>
    );
};

export default withData(Page);

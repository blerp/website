import React from "react";
import withData from "../lib/withData";
import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";
import styled from "styled-components";
import { Text } from "../components/theme/Theme";
import { Row } from "../components/shared/ProfileTabViews/ProfileStyledComponents";

const StyledCareersText = styled(Text)`
    margin: 40px 0;
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
    height: 200px;
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
                    style={{ placeSelf: "center" }}
                    fontColor='white'
                    fontSize='64px'
                    fontWeight='normal'
                >
                    JOBS
                </StyledCareersText>
            </Header>
            <Container>
                <StyledCareersText fontSize='48px' fontWeight='normal'>
                    Career opportunities at Blerp
                </StyledCareersText>
                <StyledCareersText>
                    Want to be a part of the future of audio expression? Check
                    out our available job positions below.
                </StyledCareersText>
                <LineBreak />
                <StyledCareersText fontSize='32px' fontWeight='normal'>
                    SR. Software engineer/ Application Architect
                </StyledCareersText>
                <StyledCareersText>
                    <b>About Blerp</b>
                    <br />
                    <br />
                    Blerp is a search engine for sound bites. Blerp is the
                    easiest way to add audio expression to any moment. We
                    integrate into the Live streams, Voice chats, and Voice
                    assistants. We have over 80,000 installs of our Twitch
                    extension and are growing fast. We recently closed on
                    funding with the Amazon Alexa Fund and are very excited
                    about what new opportunities that will bring!
                    <br />
                    <br />
                    We are looking for someone who is passionate for the audio,
                    gaming, or consumer space. The candidate must be comfortable
                    with a mixed equity and cash salary incentive.
                    <br />
                    <br />
                    We’re looking for an experienced Developer to come in and
                    help with Dev ops, architecture, and scaling as we continue
                    to take Blerp to a billion users.
                    <br />
                    <br />
                    We are specifically looking for a candidate passionate about
                    the industry, space and problem we are solving. If you have
                    any extra info or questions please email Aaron at blerp.com
                    with the title Indeed Senior Engineer Interest!
                </StyledCareersText>
                <StyledCareersText>
                    <b>Candidates will ideally have experience in: </b>
                    <br />
                    Expert Node.js/Javascript, GraphQl, MongoDB,
                    AWS/GoogleCloud, and ElasticSearch.
                    <br />
                    Leading and designing
                    <br />
                    Payment systems
                    <br />
                    Elastic Search for 3+ years
                    <br />
                    Electron
                    <br />
                    Stripe/Stripe Connect
                    <br />
                    CI and testing Pipelines
                    <br />
                    Cloud-agnostic deployment and monitoring tools
                    <br />
                    Job type: full-time
                </StyledCareersText>
                <StyledCareersText>
                    <b>Pay:</b>
                    <br />
                    $70,000.00 - $100,000.00 per year
                </StyledCareersText>
                <StyledCareersText>
                    <b>Experience:</b>
                    <br />
                    Node.js: 2 years (Required)
                    <br />
                    Software engineering: 2 years (Required)
                    <br />
                    JavaScript: 2 years (Required)
                    <br />
                    Elastic Search: 1 year (Required)
                </StyledCareersText>
                <StyledCareersText>
                    <b>Location:</b>
                    <br />
                    Salt Lake City, UT 84101 (Required)
                </StyledCareersText>
                <StyledCareersText>
                    <b>Benefits:</b>
                    <br />
                    Health insurance, Paid time off
                </StyledCareersText>
                <StyledCareersText>
                    <b>Schedule: </b>
                    <br />
                    Monday to Friday
                </StyledCareersText>
                <StyledCareersText style={{ textAlign: "center" }}>
                    Send your Resume and Cover letter to careers@blerp.com
                </StyledCareersText>
                <a
                    style={{ color: "black", textAlign: "center" }}
                    href='mailto:careers@blerp.com'
                >
                    <StyledCareersText fontWeight='normal'>
                        Apply Now
                    </StyledCareersText>
                </a>
                <LineBreak />
                <StyledCareersText
                    fontSize='24px'
                    style={{ textAlign: "center" }}
                >
                    Don't see an opening that fit's your skill-set?
                </StyledCareersText>
                <StyledCareersText style={{ textAlign: "center" }}>
                    Feel free to send us your resume cover letter and we’ll let
                    youIf a relevant position becomes available.
                </StyledCareersText>
                <a
                    style={{ color: "black", textAlign: "center" }}
                    href='mailto:careers@blerp.com'
                >
                    <StyledCareersText fontWeight='normal'>
                        Send us a message
                    </StyledCareersText>
                </a>
            </Container>
            <Footer />
        </>
    );
};

export default withData(Page);

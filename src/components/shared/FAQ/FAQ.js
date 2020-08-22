import React from "react";
import { Row } from "../ProfileTabViews/ProfileStyledComponents";
import { Text } from "../../theme/Theme";
import styled from "styled-components";

const QuestionText = styled(Text)`
    margin: 0 0 35px 0 !important;
`;

const AnswerText = styled(Text)`
    margin: 0 0 0 80px !important;
    line-height: 25px !important;
`;

const StyledRow = styled(Row)`
    flex-direction: column;
    border-bottom: 2px solid ${props => props.theme.grey3};
    padding: 40px;
`;

const FAQ = props => {
    return (
        <>
            <StyledRow>
                <Text fontSize='48px' style={{ margin: "0 0 15px 0" }}>
                    FAQ
                </Text>
                <Text fontSize='21px' fontWeight='light'>
                    Check out our frequently asked questions. Don’t see an
                    answer to the question you have? Feel free to Contact us
                </Text>
            </StyledRow>
            <StyledRow>
                <QuestionText fontSize='32px'>
                    Q: Which OBS do we support?
                </QuestionText>
                <AnswerText fontSize='21px' fontWeight='light'>
                    A: Blerp supports any OBS that accepts a URL element. Learn
                    how to install Blerp on some popular OBS’s
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
                    shared on your stream. Learn more.
                </AnswerText>
            </StyledRow>
            <StyledRow>
                <QuestionText fontSize='32px'>
                    Q: What about Music?
                </QuestionText>
                <AnswerText fontSize='21px' fontWeight='light'>
                    A: Quickly filter out any music sounds from being viewed and
                    played on your stream. By enabling the block music filter in
                    the configuration panel under content.
                </AnswerText>
            </StyledRow>
            <StyledRow>
                <QuestionText fontSize='32px'>
                    Q: Can I use Blerp even though I’m not an affiliate or
                    partner on Twitch?
                </QuestionText>
                <AnswerText fontSize='21px' fontWeight='light'>
                    A: Yes! In fact some of our most successful streamers have
                    less than 1,000 followers. Small communities that embrace
                    blerp and create their own content have really done well!
                </AnswerText>
            </StyledRow>
        </>
    );
};

export default FAQ;

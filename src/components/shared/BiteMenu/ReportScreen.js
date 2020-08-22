import React, { useState, useContext } from "react";
import { Text, Icon, Button } from "../../theme/Theme";
import { Row } from "../ProfileTabViews/ProfileStyledComponents";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import SuccessOverlay from "../FullScreenOverlays/SuccessOverlay";
import SuccessToast from "../../theme/SuccessToast";
import { Toggle } from "../../theme/Toggle";
import { ToastContext } from "../../theme/ToastProvider";

const REPORT_BLERP = gql`
    mutation reportBlerpContent($record: createReportBiteInputArgs!) {
        web {
            reportBiteContent(record: $record) {
                reportedContent {
                    reporterId
                    reasonType
                }
            }
        }
    }
`;

const REPORT_BOARD = gql`
    mutation reportBoardContent($record: createReportNewPlaylistInputArgs!) {
        web {
            reportPlaylistContent(record: $record) {
                reportedContent {
                    reporterId
                    reasonType
                }
            }
        }
    }
`;

const StyledReportText = styled(Text)``;

StyledReportText.defaultProps = {
    fontColor: "notBlack",
    fontSize: "21px",
};

const StyledRow = styled(Row)`
    width: 90%;
`;

const StyledRowClickable = styled(Row)`
    width: 90%;
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.colors.waxing};
    }
`;

const Container = styled.div`
    width: 350px;
`;

const ReportScreen = props => {
    const [blockUser, setBlockUser] = useState(false);
    const [screen, setScreen] = useState("");
    const [reportBlerp] = useMutation(REPORT_BLERP);
    const [reportSoundboard] = useMutation(REPORT_BOARD);
    const { useToast } = useContext(ToastContext);

    const handleReport = () => {
        let reportType = "";
        switch (screen) {
            case "hate speech":
                reportType = "HATE_SPEECH";
                break;
            case "spam":
                reportType = "SPAM";
                break;
            case "explicit":
                reportType = "EXPLICIT";
                break;
            case "property":
                reportType = "PROPERTY";
                break;
            case "audio quality":
                reportType = "AUDIO_QUALITY";
                break;
            case "other":
                reportType = "OTHER";
                break;
            default:
                break;
        }

        if (props.type === "Blerp") {
            reportBlerp({
                variables: {
                    record: {
                        biteId: props.bite,
                        userDescription: "test",
                        blockUser: blockUser,
                        reasonType: reportType,
                    },
                },
            })
                .then(res => useToast("Reported!", "report"))
                .catch(err => useToast("Error reporting!", "error"));
        } else if (props.type === "soundboard") {
            reportSoundboard({
                variables: {
                    record: {
                        playlistId: props.playlist,
                        blockUser: blockUser,
                        reasonType: reportType,
                    },
                },
            })
                .then(res => useToast("Reported!", "report"))
                .catch(err => useToast("Error reporting!", "error"));
        }
    };

    const switchRenderer = () => {
        let topContent = [];
        let bottomContent = [];
        switch (screen) {
            case "hate speech":
                topContent = [
                    "Attacks or slurs directed at protected groups",
                    "People or groups that advocate hate speech",
                ];
                bottomContent = [
                    "Profanity",
                    "Attacks on public figures",
                    "Critisism of government, political or religious leaders",
                ];
                return renderSpecificScreen(topContent, bottomContent);
            case "spam":
                topContent = [
                    "Misleading content or begaviour.",
                    "Repetitive content.",
                    "Unsolicited commercial message.",
                ];
                bottomContent = [];
                return renderSpecificScreen(topContent, bottomContent);
            case "explicit":
                topContent = [
                    "Sexualised content.",
                    "Depictions of sexual acts.",
                    "Fetish content.",
                ];
                bottomContent = [];
                return renderSpecificScreen(topContent, bottomContent);
            case "property":
                topContent = [
                    "Attacks or slurs directed at protected groups",
                    "People or groups that advocate hate speech",
                ];
                bottomContent = [];
                return renderSpecificScreen(topContent, bottomContent);
            case "audio quality":
                topContent = [
                    "Low quality, too much noise.",
                    "Volume is too loud/quiet.",
                    "Clipping is off.",
                ];
                bottomContent = [];
                return renderSpecificScreen(topContent, bottomContent);
            case "other":
                topContent = [
                    "Attacks or slurs directed at protected groups",
                    "People or groups that advocate hate speech",
                ];
                bottomContent = [];
                return renderSpecificScreen(topContent, bottomContent);
            case "":
                return renderSelectionScreen();
            default:
                return renderSelectionScreen();
        }
    };

    const renderSpecificScreen = (topContent, bottomContent) => {
        return (
            <>
                <StyledRow
                    style={{ justifyContent: "flex-start" }}
                    onClick={() => setScreen("")}
                >
                    <Icon
                        size='tiny'
                        url='https://storage.googleapis.com/blerp_products/Web/Reporting/left%20arrow.svg'
                        style={{ marginRight: "30px" }}
                    />
                    <StyledReportText>Report {screen}?</StyledReportText>
                </StyledRow>
                <StyledRow>
                    <StyledReportText>
                        We remove {props.type}s that have:
                    </StyledReportText>
                </StyledRow>
                <ul>
                    {topContent.map(text => (
                        <StyledRow key={text}>
                            <StyledReportText fontWeight='light'>
                                <li>{text}</li>
                            </StyledReportText>
                        </StyledRow>
                    ))}
                </ul>
                <StyledRow>
                    <StyledReportText fontWeight='light'>
                        Note: We may send support material to the user who
                        created this {props.type}.
                    </StyledReportText>
                </StyledRow>
                {bottomContent.length === 0 ? (
                    <></>
                ) : (
                    <StyledRow>
                        <StyledReportText>
                            We do not remove content that has:
                        </StyledReportText>
                    </StyledRow>
                )}
                <ul>
                    {bottomContent.map(text => (
                        <StyledRow key={text}>
                            <StyledReportText fontWeight='light'>
                                <li>{text}</li>
                            </StyledReportText>
                        </StyledRow>
                    ))}
                </ul>
                <Row>
                    <StyledReportText>Block User</StyledReportText>
                    <Toggle handleClick={value => setBlockUser(value)} />
                </Row>
                <Row>
                    <StyledReportText>
                        You will no longer see any blerps from them.
                    </StyledReportText>
                </Row>
                <StyledRow style={{ justifyContent: "center" }}>
                    <SuccessToast
                        successMessage='Reported!'
                        timeout={1000}
                        trigger={
                            <Button
                                onOpen={() => {
                                    handleReport();
                                }}
                            >
                                Report
                            </Button>
                        }
                    />
                </StyledRow>
            </>
        );
    };

    const renderSelectionScreen = () => {
        return (
            <>
                <StyledRow
                    style={{ justifyContent: "flex-start", marginTop: "20px" }}
                >
                    <Icon
                        style={{ paddingLeft: "0", marginRight: "20px" }}
                        size='small'
                        url='https://storage.googleapis.com/blerp_products/Web/Reporting/Report%20flag.svg'
                    />
                    <StyledReportText>Report {props.type}</StyledReportText>
                </StyledRow>
                <StyledRowClickable onClick={() => setScreen("hate speech")}>
                    <div>
                        <StyledReportText>Hate Speech</StyledReportText>
                        <StyledReportText fontWeight='light' fontSize='16px'>
                            Attacks directed at protected groups.
                        </StyledReportText>
                    </div>
                    <Icon
                        size='small'
                        url='https://storage.googleapis.com/blerp_products/Web/Reporting/right%20arrow.svg'
                    />
                </StyledRowClickable>
                <StyledRowClickable onClick={() => setScreen("spam")}>
                    <div>
                        <StyledReportText>Spam</StyledReportText>
                        <StyledReportText fontWeight='light' fontSize='16px'>
                            Misleading or repetitive post.
                        </StyledReportText>
                    </div>
                    <Icon
                        size='small'
                        url='https://storage.googleapis.com/blerp_products/Web/Reporting/right%20arrow.svg'
                    />
                </StyledRowClickable>
                <StyledRowClickable onClick={() => setScreen("explicit")}>
                    <div>
                        <StyledReportText>Explicit</StyledReportText>
                        <StyledReportText fontWeight='light' fontSize='16px'>
                            Sexually explicit content.
                        </StyledReportText>
                    </div>
                    <Icon
                        size='small'
                        url='https://storage.googleapis.com/blerp_products/Web/Reporting/right%20arrow.svg'
                    />
                </StyledRowClickable>
                <StyledRowClickable onClick={() => setScreen("property")}>
                    <div>
                        <StyledReportText>
                            My intellectual property
                        </StyledReportText>
                        <StyledReportText fontWeight='light' fontSize='16px'>
                            Copyright or trademark infringment.
                        </StyledReportText>
                    </div>
                    <Icon
                        size='small'
                        url='https://storage.googleapis.com/blerp_products/Web/Reporting/right%20arrow.svg'
                    />
                </StyledRowClickable>
                <StyledRowClickable onClick={() => setScreen("audio quality")}>
                    <div>
                        <StyledReportText>Audio Quality</StyledReportText>
                        <StyledReportText fontWeight='light' fontSize='16px'>
                            Low quality, or volume is too loud/quiet.
                        </StyledReportText>
                    </div>
                    <Icon
                        size='small'
                        url='https://storage.googleapis.com/blerp_products/Web/Reporting/right%20arrow.svg'
                    />
                </StyledRowClickable>
                <StyledRowClickable onClick={() => setScreen("other")}>
                    <div>
                        <StyledReportText>Other</StyledReportText>
                        <StyledReportText fontWeight='light' fontSize='16px'>
                            Doesn't belong on {props.type}.
                        </StyledReportText>
                    </div>
                    <Icon
                        size='small'
                        url='https://storage.googleapis.com/blerp_products/Web/Reporting/right%20arrow.svg'
                    />
                </StyledRowClickable>
                <Row style={{ justifyContent: "center", margin: "10px auto" }}>
                    <Button buttonType='secondary'>Cancel</Button>
                </Row>
            </>
        );
    };
    return (
        <>
            <Container>{switchRenderer()}</Container>
        </>
    );
};

export default ReportScreen;

import React, { useContext } from "react";
import withData from "../lib/withData";
import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";
import styled, { ThemeContext } from "styled-components";
import { Text, Icon, Button } from "../components/theme/Theme";
import { Row } from "../components/shared/ProfileTabViews/ProfileStyledComponents";
import BlerpCreatorCard from "../components/shared/Streams/BlerpCreatorCard";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useWindowSize } from "../lib/ScreenSizeHook";

export const TWITCH_STREAMER_QUERY = gql`
    query websiteTwitchStreamersPage {
        web {
            userSignedIn {
                _id
                username
                roles
            }
            userGetTopFollowedTwitchPlatform {
                _id
                username
                loggedInIsFollower
                profileImage {
                    original {
                        url
                    }
                }
                twitchUserInfo {
                    userName
                }
            }
        }
    }
`;

const StyledBlerpStarsText = styled(Text)``;

StyledBlerpStarsText.defaultProps = {
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
    padding: 20px 0;
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

const FullWidthRow = styled.div`
    width: 100%;
    display: flex;
    background-color: ${props =>
        props.backgroundColor === "waxing"
            ? props.theme.colors.waxing
            : props.theme.colors.white};
    flex-direction: column;
`;

const Page = props => {
    const size = useWindowSize();
    const { loading, error, data } = useQuery(TWITCH_STREAMER_QUERY);

    const theme = useContext(ThemeContext);

    if (loading && !data) return <></>;
    if (error) return <></>;

    if (data)
        return (
            <>
                <NavBar />
                <Header>
                    <Row
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <StyledBlerpStarsText
                            style={{
                                placeSelf: "center",
                                marginBottom: "5px",
                                lineHeight: "60px",
                            }}
                            fontColor='white'
                            fontSize='64px'
                            fontWeight='normal'
                        >
                            Blerp Champions
                        </StyledBlerpStarsText>
                        <StyledBlerpStarsText
                            fontColor='white'
                            fontSize='28px'
                            style={{
                                lineHeight: "30px",
                            }}
                        >
                            Recognizing Top Blerp Creators
                        </StyledBlerpStarsText>
                    </Row>
                </Header>
                <FullWidthRow>
                    <Row
                        style={{
                            margin: "60px auto",
                            flexDirection: size.width <= 600 ? "column" : "row",
                        }}
                    >
                        {size.width <= 600 ? (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <Icon
                                    style={{
                                        width: "350px",
                                        height: "350px",
                                        backgroundSize: "auto",
                                        backgroundPosition: "bottom",
                                        borderRadius: "0",
                                    }}
                                    url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Ambassador%20Program/Controler%20Trophy%20image.svg'
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                        <div>
                            <StyledBlerpStarsText
                                fontWeight='normal'
                                fontSize='32px'
                            >
                                Blerp Champions the real MVP's
                            </StyledBlerpStarsText>
                            <StyledBlerpStarsText>
                                As Blerp has expanded across live streaming
                                we’ve been amazed at the reaction we’ve received
                                by the community. AS creators have helped
                                trouble shoot, teach and interact with each
                                other across our integrations. Blerp Champions
                                are creators who are extremely outspoken,
                                passionate and dedicated to their community and
                                craft.
                                <br />
                                <br />
                                To learn more about the Blerp Champions you can
                                click on their profiles below.
                                <br />
                                <br />
                                Are you a streamer? Apply now.
                            </StyledBlerpStarsText>
                        </div>
                        {size.width >= 600 ? (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <Icon
                                    style={{
                                        width: "350px",
                                        height: "350px",
                                        backgroundSize: "auto",
                                        backgroundPosition: "bottom",
                                        borderRadius: "0",
                                    }}
                                    url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Ambassador%20Program/Controler%20Trophy%20image.svg'
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                    </Row>
                </FullWidthRow>
                <FullWidthRow
                    backgroundColor='waxing'
                    style={{ margin: "50px auto" }}
                >
                    <Row>
                        <StyledBlerpStarsText
                            fontSize='32px'
                            fontWeight='normal'
                            style={{ marginBottom: "20px" }}
                        >
                            Blerp Champions Spotlight
                        </StyledBlerpStarsText>
                    </Row>
                    <Row
                        style={{
                            flexDirection:
                                size.width <= 1000 ? "column" : "row",
                        }}
                    >
                        <iframe
                            width='100%'
                            height='315'
                            src='https://www.youtube.com/embed/ktnCuqAOlNI'
                            frameBorder='0'
                            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                            style={{ borderRadius: "8px", marginRight: "80px" }}
                        ></iframe>

                        <iframe
                            width='100%'
                            height='315'
                            src='https://www.youtube.com/embed/XEYlp_x5Jtc'
                            frameBorder='0'
                            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                            style={{ borderRadius: "8px" }}
                        ></iframe>
                    </Row>
                </FullWidthRow>
                {/* <FullWidthRow>
                    <Row
                        style={{
                            justifyContent: "center",
                            margin: "30px auto",
                        }}
                    >
                        <StyledBlerpStarsText
                            fontWeight='normal'
                            fontSize='32px'
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <Icon
                                url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Ambassador%20Program/Star%20with%20confetti.svg'
                                style={{
                                    width: "70px",
                                    height: "80px",
                                    marginRight: "20px",
                                    backgroundSize: "contain",
                                    backgroundPosition: "bottom",
                                }}
                            />
                            Blerp Champions
                        </StyledBlerpStarsText>
                    </Row>
                    <Row></Row>
                    <Row style={{ flexWrap: "wrap" }}>
                        {data.web.userGetTopFollowedTwitchPlatform.map(
                            (user, index) => {
                                return (
                                    <BlerpCreatorCard
                                        key={`creator-${user._id}`}
                                        username={user.username}
                                        profileImage={
                                            user.profileImage &&
                                            user.profileImage.original.url
                                        }
                                        userId={user._id}
                                        following={user.loggedInIsFollower}
                                        style={{
                                            margin: "20px 15px",
                                        }}
                                    />
                                );
                            },
                        )}
                    </Row>
                </FullWidthRow> */}
                <FullWidthRow style={{ padding: "200px 0 50px 0" }}>
                    <Row style={{ width: "50%" }}>
                        <StyledBlerpStarsText
                            fontWeight='normal'
                            fontSize='32px'
                            style={{ textAlign: "center", lineHeight: "30px" }}
                        >
                            Apply today to be a Blerp Champion. Get exclusive
                            content, new features and a verified icon!
                        </StyledBlerpStarsText>
                    </Row>
                    <Row style={{ width: "60%", margin: "40px auto" }}>
                        <div
                            style={{
                                flex: 1,
                                borderRight: `2px solid ${theme.colors.grey3}`,
                            }}
                        >
                            <StyledBlerpStarsText fontSize='21px'>
                                <b>What do I get?</b>
                                <br />
                                -Blerp Champions get a verified icon
                                <br />
                                -Early access to new content
                                <br />
                                -Exclusive Blerp Swag
                                <br />
                                -Recieve 100% of donation revenue. We'll pay you
                                back our cut
                            </StyledBlerpStarsText>
                        </div>
                        <div
                            style={{
                                flex: 1,
                                marginLeft: "20px",
                            }}
                        >
                            <StyledBlerpStarsText fontSize='21px'>
                                <b>How do I qualify?</b>
                                <br />
                                -First, fill out the form below
                                <br />
                                -Integrate Blerp onto your stream
                                <br />
                                -Have a custom soundboard
                                <br />
                                -Add !Blerp to the title of your stream
                            </StyledBlerpStarsText>
                        </div>
                    </Row>
                    <Row
                        style={{
                            margin: "120px auto 40px",
                            justifyContent: "center",
                        }}
                    >
                        <a
                            target='_blank'
                            rel='noreferrer'
                            href='https://forms.gle/UwAxwmCQVtPNd43D6'
                            style={{ textDecoration: "none" }}
                        >
                            <Button>Apply Now</Button>
                        </a>
                    </Row>
                    <Row
                        style={{
                            justifyContent: "center",
                        }}
                    >
                        <StyledBlerpStarsText fontColor='grey3' fontSize='14px'>
                            By applying you agree to our Privacy Policy and
                            Terms of Service
                        </StyledBlerpStarsText>
                    </Row>
                </FullWidthRow>
                <Footer />
            </>
        );
};

export default withData(Page);

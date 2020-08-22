import React, {
    useRef,
    useEffect,
    createRef,
    forwardRef,
    useState,
} from "react";
import styled, { ThemeProvider } from "styled-components";
import NavBar from "../components/navigation/navbar";
import { Helmet } from "react-helmet";
import withData from "../lib/withData";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import LoadingFullScreen from "../components/loading/loading-full-screen";
import projectConfig from "../config";
const hostDomain = projectConfig.host;
import StreamerRankCard from "../components/shared/Streams/StreamerRankCard";
import Text from "../components/theme/Text";
import { Row } from "../components/shared/ProfileTabViews/ProfileStyledComponents";
import SidescollListContainer from "../components/theme/SidescrollListContainer";
import BlerpCreatorCard from "../components/shared/Streams/BlerpCreatorCard";
import Footer from "../components/navigation/footer";
import { Icon } from "../components/theme/Icon";
import { Button, GenericModal, Input } from "../components/theme/Theme";
import Slider, { Dot } from "../components/theme/Slider";
import { useWindowSize } from "../lib/ScreenSizeHook";
import Link from "next/link";

const StyledStreamText = styled(Text)``;

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
            getCreatorListByTitle(title: "Twitch Featured") {
                _id
                title
                userIds
                userObjects {
                    _id
                    username
                    profileImage {
                        original {
                            url
                        }
                    }
                    twitchUserInfo {
                        displayName
                        type
                        broadcaster_type
                        bio
                    }
                }
            }
            getLiveWalkonTwitchUsers {
                _id
                channelId
                logo
                weeklyBlerpBits
                bio
                display_name
                name
                type
                isStreamOnline
                thumbnailUrl
            }
            getLiveTwitchUsers {
                _id
                channelId
                logo
                weeklyBlerpBits
                bio
                display_name
                name
                type
                isStreamOnline
                thumbnailUrl
            }
            getCreatorListByTitle(title: "Twitch Featured") {
                title
                userObjects {
                    _id
                    username
                    twitchId
                    twitchUserInfo {
                        id
                        displayName
                        partnered
                        bio
                        logo
                        userName
                        email
                    }
                }
                description
            }
        }
    }
`;

const UPDATE_FEATURED_USERS = gql`
    mutation updateFeaturedUsers($newUserIds: [MongoID!]) {
        web {
            userUpdateCreatorsForList(
                title: "Twitch Featured"
                newUserIds: $newUserIds
            ) {
                _id
                title
                userIds
                userObjects {
                    _id
                    username
                    profileImage {
                        original {
                            url
                        }
                    }
                    twitchUserInfo {
                        displayName
                        type
                        broadcaster_type
                        bio
                    }
                }
            }
        }
    }
`;

const CustomCard = styled.div`
    position: relative;
    width: 800px;
    height: 400px;
    margin: 20px;
    background-image: linear-gradient(180deg, #170d1148 0%, #121212 100%),
        url(${props =>
            props.backgroundImage
                ? props.backgroundImage
                : "https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/ninja.jpg"});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    place-items: center;
    justify-content: flex-end;

    @media (max-width: 850px) {
        margin: 20px auto;
        ${props => props.mobileStyle}
    }
`;

const SliderCard = styled(CustomCard)`
    @media (max-width: 600px) {
        ${props => props.mobileStyle}
    }
`;

const AllTimeStandingsRow = styled(Row)`
    width: 90%;

    @media (max-width: 1000px) {
        flex-direction: column;
        align-items: center;
    }
`;

const StyledRow = styled(Row)`
    width: 90%;

    @media (max-width: 600px) {
        width: 100%;
    }
`;

const TwitchCallToAction = styled.div`
    width: 346px;
    height: 176px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border: 4px solid ${props => props.theme.colors.grey2};
    border-radius: 8px;
    transition: 0.5s;

    ${Button} {
        display: none;
    }

    ${Icon} {
        width: 100px;
        height: 100px;
        background-size: contain;
        border-radius: 0;
    }

    &:hover {
        border: 4px solid ${props => props.theme.colors.ibisRed};

        ${Text} {
            color: ${props => props.theme.colors.ibisRed};
            transform: scale(0.7);
            transition: 0.5s;
        }

        ${Button} {
            display: block;
            transition: 0.5s;
        }

        ${Icon} {
            transform: scale(0.7);
        }

        & #twitchIcon {
            background-image: url(${props => props.twitchHover});
        }

        & #blerpIcon {
            background-image: url(${props => props.blerpHover});
        }
    }

    @media (max-width: 600px) {
        width: 90% !important;
        min-width: 90% !important;
    }
`;

const Section2Row = styled(Row)`
    width: 90%;

    @media (max-width: 1300px) {
        flex-wrap: wrap;
    }
    @media (max-width: 850px) {
        width: 100%;
        flex-direction: column;
        display: flow-root;
    }
`;

const DesktopSpacer = styled.div`
    display: flex;
    height: auto;
    overflow: hidden;
    margin: 0;
    width: 90%;
    margin: 0 auto;

    @media (max-width: 600px) {
        display: flow-root;
        margin: 0;
    }
`;

const Page = props => {
    const size = useWindowSize();
    const [cardSize, setCardSize] = useState("400px");
    const [userIds, setUserIds] = useState();
    const [userIdInput, setUserIdInput] = useState("");
    const { loading, error, data } = useQuery(TWITCH_STREAMER_QUERY);
    const [updateFeaturedUsers] = useMutation(UPDATE_FEATURED_USERS);

    const sliderRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            if (data && sliderRef.current) {
                setCardSize(`${sliderRef.current.children[0].offsetWidth}px`);
            }
        }, 1000);
    }, [sliderRef]);

    useEffect(() => {
        if (data && sliderRef.current) {
            setCardSize(`${sliderRef.current.children[0].offsetWidth}px`);
        }
    }, [size]);

    if (loading && !data) return <LoadingFullScreen />;
    if (error)
        return (
            <>
                <NavBar />
                <Footer />
            </>
        );

    const sorted =
        data &&
        data.web &&
        data.web.getLiveTwitchUsers &&
        data.web.getLiveTwitchUsers
            .slice()
            .sort(
                (item, item2) => item2.weeklyBlerpBits - item.weeklyBlerpBits,
            );

    const signedInIsAdmin = () => {
        if (
            data.web.userSignedIn &&
            data.web.userSignedIn.roles.includes("ADMIN")
        )
            return true;
        return false;
    };

    if (data)
        return (
            <>
                <Helmet>
                    <title>{`Twitch Streamers | Top Weekly Streamers Using Blerp Sounds`}</title>
                    <meta
                        name='description'
                        content='Blerp for twitch meme soundboards includes our walk on sound extension as well as our twitch soundboard alerts extension. Check out the top streamer using blerp each week. Use audio memes from Blerp to stream sounds on Twitch. You can search sounds on the Twitch platform, stream them live, and earn bits. Learn how!'
                    />
                    <meta
                        property='og:description'
                        content='Blerp for twitch meme soundboards includes our walk on sound extension as well as our twitch soundboard alerts extension. Check out the top streamer using blerp each week. Use audio memes from Blerp to stream sounds on Twitch. You can search sounds on the Twitch platform, stream them live, and earn bits. Learn how!'
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
                        content='https://www.youtube.com/watch?v=u-NBkIt_WRc'
                    />
                </Helmet>
                <NavBar />
                <Row
                    style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundImage:
                            "url(https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/Cartoonfetti.svg)",
                        backgroundSize: "400px 200px",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center -40px",
                        height: "150px",
                        margin: "50px auto 0px auto",
                    }}
                >
                    <StyledStreamText fontSize='36px' fontColor='notBlack'>
                        All Time Standings
                    </StyledStreamText>
                    <StyledStreamText
                        fontSize='21px'
                        fontColor='notBlack'
                        fontWeight='light'
                    >
                        Streamers with the most Blerp shares on their channels.
                    </StyledStreamText>
                </Row>
                <StyledRow
                    style={{
                        justifyContent: "space-around",
                        alignItems: "flex-end",
                        marginBottom: "30px",
                    }}
                >
                    <StyledStreamText>2nd Place Streamer</StyledStreamText>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Icon
                            style={{
                                width: "80px",
                                height: "50px",
                                borderRadius: "0",
                                backgroundSize: "contain",
                            }}
                            url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/firstplaceStars.svg'
                        />
                        <StyledStreamText>1st Place Streamer</StyledStreamText>
                    </div>
                    <StyledStreamText>3rd Place Streamer</StyledStreamText>
                </StyledRow>
                <AllTimeStandingsRow>
                    {sorted.length >= 1 && (
                        <>
                            <StreamerRankCard
                                key={`${sorted[1].display_name}`}
                                rank={2}
                                username={sorted[1].display_name}
                                streamImage={sorted[1].thumbnailUrl}
                                streamProfileImage={sorted[1].logo}
                                streamUrl={`https://www.twitch.tv/${sorted[1].display_name}`}
                                userId={sorted[1]._id}
                            />
                            <StreamerRankCard
                                key={`${sorted[0].display_name}`}
                                rank={1}
                                username={sorted[0].display_name}
                                streamImage={sorted[0].thumbnailUrl}
                                streamProfileImage={sorted[0].logo}
                                streamUrl={`https://www.twitch.tv/${sorted[0].display_name}`}
                                userId={sorted[0]._id}
                            />
                            <StreamerRankCard
                                key={`${sorted[2].display_name}`}
                                rank={3}
                                username={sorted[2].display_name}
                                streamImage={sorted[2].thumbnailUrl}
                                streamProfileImage={sorted[2].logo}
                                streamUrl={`https://www.twitch.tv/${sorted[2].display_name}`}
                                userId={sorted[2]._id}
                            />
                        </>
                    )}
                </AllTimeStandingsRow>
                <StyledRow style={{ marginTop: "50px" }}>
                    <SidescollListContainer
                        style={{ paddingBottom: "20px" }}
                        title={
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                }}
                            >
                                <Text fontColor='notBlack' fontSize='21px'>
                                    Streamers of Note
                                </Text>
                            </div>
                        }
                        scrollId='scroll-top-streamers'
                        backgroundColor='waxing'
                    >
                        {sorted.length >= 1 &&
                            sorted.map((streamer, index) => {
                                if (index <= 2) return <></>;
                                return (
                                    <StreamerRankCard
                                        key={`${streamer.display_name}`}
                                        rank={index + 1}
                                        username={streamer.display_name}
                                        streamImage={streamer.thumbnailUrl}
                                        streamProfileImage={streamer.logo}
                                        streamUrl={`https://www.twitch.tv/${streamer.display_name}`}
                                        userId='2'
                                    />
                                );
                            })}
                    </SidescollListContainer>
                </StyledRow>
                <Row
                    style={{
                        justifyContent: "start",
                        width: "90%",
                        marginTop: "30px",
                    }}
                >
                    <Text fontSize='24px' fontColor='notBlack'>
                        Streamers of the Week
                    </Text>
                    <Text
                        fontSize='24px'
                        fontColor='notBlack'
                        style={{ marginLeft: "30%" }}
                    >
                        Most Followed
                    </Text>
                </Row>
                <Section2Row
                    style={{ justifyContent: "space-between" }}
                    ref={sliderRef}
                >
                    <Slider
                        id='featured-streamer-slider'
                        dots={
                            signedInIsAdmin()
                                ? data.web.getCreatorListByTitle.userObjects
                                      .length + 1
                                : data.web.getCreatorListByTitle.userObjects
                                      .length + 1
                        }
                        moveSize={cardSize}
                        style={{
                            height: "400px",
                            flex: 1,
                            alignSelf: "center",
                        }}
                    >
                        {({ moveSlider }) => (
                            <>
                                {data.web.getCreatorListByTitle.userObjects.map(
                                    (user, index) => (
                                        <SliderCard
                                            key={`featured-${user._id}`}
                                            backgroundImage={
                                                user.profileImage &&
                                                user.profileImage.original.url
                                            }
                                            style={{
                                                margin: "20px 0",
                                                width: cardSize,
                                                minWidth: cardSize,
                                                maxWidth: "400px",
                                            }}
                                            mobileStyle={`width: ${cardSize} !important; minWidth: ${cardSize} !important`}
                                            onClick={() => {
                                                moveSlider(
                                                    cardSize,
                                                    `dot${index + 2}`,
                                                );
                                            }}
                                        >
                                            {signedInIsAdmin() ? (
                                                <Icon
                                                    size='large'
                                                    style={{
                                                        position: "absolute",
                                                        top: "-20px",
                                                        right: "-10px",
                                                    }}
                                                    url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/close.svg'
                                                    onClick={() =>
                                                        updateFeaturedUsers({
                                                            variables: {
                                                                newUserIds: data.web.getCreatorListByTitle.userIds.filter(
                                                                    i =>
                                                                        i !==
                                                                        user._id,
                                                                ),
                                                            },
                                                        })
                                                    }
                                                />
                                            ) : (
                                                <></>
                                            )}
                                            <Text
                                                fontColor='white'
                                                fontSize='36px'
                                            >
                                                {user.username}
                                            </Text>
                                            <Text
                                                fontColor='white'
                                                fontWeight='light'
                                                fontSize='21px'
                                            ></Text>
                                            <a
                                                href={
                                                    user.twitchUserInfo
                                                        ? `https://www.twitch.tv/${user.twitchUserInfo.userName}`
                                                        : `/user/${user._id}`
                                                }
                                                target='_blank'
                                                rel='noreferrer'
                                                style={{
                                                    textDecoration: "none",
                                                    alignSelf: "center",
                                                }}
                                            >
                                                <Button
                                                    buttonType='white'
                                                    style={{
                                                        marginBottom: "20px",
                                                    }}
                                                >
                                                    {user.twitchUserInfo
                                                        ? "Twitch Profile"
                                                        : "Blerp Profile"}
                                                </Button>
                                            </a>
                                        </SliderCard>
                                    ),
                                )}
                                {signedInIsAdmin() ? (
                                    <div
                                        style={{
                                            width: cardSize,
                                            minWidth: cardSize,
                                            maxWidth: "400px",
                                            height: "400px",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                        onClick={() => moveSlider(800)}
                                    >
                                        <GenericModal
                                            style={{
                                                top: "140px",
                                                left: "-90px",
                                            }}
                                            blurBackground
                                            trigger={
                                                <Icon
                                                    style={{
                                                        width: "160px",
                                                        height: "160px",
                                                        backgroundSize: "cover",
                                                        alignSelf: "center",
                                                    }}
                                                    hoverUrl='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/add%20featured%20streamer%20on%20hover.svg'
                                                    url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/add%20featured%20streamer.svg'
                                                />
                                            }
                                        >
                                            {({ handleCloseClick }) => (
                                                <>
                                                    <Input
                                                        onChange={e =>
                                                            setUserIdInput(
                                                                e.target.value,
                                                            )
                                                        }
                                                        value={userIdInput}
                                                        rounding='none'
                                                        placeholder='UserId...'
                                                    />
                                                    <Button
                                                        onClick={() => {
                                                            setUserIdInput("");
                                                            updateFeaturedUsers(
                                                                {
                                                                    variables: {
                                                                        newUserIds: [
                                                                            ...data
                                                                                .web
                                                                                .getCreatorListByTitle
                                                                                .userIds,
                                                                            userIdInput,
                                                                        ],
                                                                    },
                                                                },
                                                            );
                                                        }}
                                                    >
                                                        Add
                                                    </Button>
                                                </>
                                            )}
                                        </GenericModal>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </>
                        )}
                    </Slider>
                    <CustomCard
                        style={{ width: "400px", minWidth: "400px", flex: 1 }}
                        mobileStyle={` width: 90% !important; min-width: 90% !important;`}
                    >
                        <Text fontColor='white' fontSize='36px'>
                            Test Streamer
                        </Text>
                        <Text
                            fontColor='white'
                            fontWeight='light'
                            fontSize='21px'
                        >
                            IRL, Apex, Fortnite
                        </Text>
                        <Button
                            buttonType='white'
                            style={{ marginBottom: "20px" }}
                        >
                            View Stream
                        </Button>
                    </CustomCard>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            flex: 1,
                        }}
                    >
                        <CustomCard
                            style={{
                                width: "350px",
                                height: "180px",
                                marginBottom: "20px",
                            }}
                            mobileStyle={` width: 90% !important; min-width: 90% !important;`}
                        >
                            <Text fontColor='white' fontSize='36px'>
                                Test Streamer
                            </Text>
                            <Text
                                fontColor='white'
                                fontWeight='light'
                                fontSize='21px'
                            >
                                IRL, Apex, Fortnite
                            </Text>
                            <Button
                                buttonType='white'
                                style={{ marginBottom: "20px" }}
                            >
                                View Stream
                            </Button>
                        </CustomCard>

                        <TwitchCallToAction
                            twitchHover='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/Twitch%20glitch%20purple.svg'
                            blerpHover='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/BlerpIcon%20ibis.svg'
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Icon
                                    id='blerpIcon'
                                    url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/BlerpIcon%20grey.svg'
                                />
                                <Text
                                    fontSize='60px'
                                    fontColor='grey2'
                                    style={{ lineHeight: "60px" }}
                                >
                                    +
                                </Text>
                                <Icon
                                    id='twitchIcon'
                                    url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/twitch%20glitch%20grey.svg'
                                />
                            </div>
                            <a
                                href='https://dashboard.twitch.tv/extensions/oafn7vvzfyzyccwrwrt233221oe5wq-0.1.57'
                                target='_blank'
                                rel='noreferrer'
                                style={{
                                    textDecoration: "none",
                                    alignSelf: "center",
                                }}
                            >
                                <Button buttonType='secondary'>
                                    Get Started
                                </Button>
                            </a>
                        </TwitchCallToAction>
                    </div>
                </Section2Row>
                <StyledRow>
                    <SidescollListContainer
                        style={{ paddingBottom: "20px" }}
                        title={
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    paddingLeft: "20px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Icon
                                        style={{
                                            padding: "2px",
                                            marginRight: "10px",
                                        }}
                                        size='large'
                                        url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/on%20the%20rise%20icon.svg'
                                    />
                                    <Text fontColor='notBlack' fontSize='18px'>
                                        On the Rise
                                    </Text>
                                </div>
                                <Text
                                    style={{ margin: "0" }}
                                    fontColor='notBlack'
                                    fontSize='18px'
                                    fontWeight='light'
                                >
                                    Follow your favortie Blerp creators!
                                </Text>
                            </div>
                        }
                        scrollId='scroll-blerp-creators'
                        backgroundColor='waxing'
                    >
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
                                    />
                                );
                            },
                        )}
                    </SidescollListContainer>
                </StyledRow>
                <Footer />
            </>
        );
};

export default withData(Page);

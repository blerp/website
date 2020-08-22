import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import CircleSocialButton from "../buttons/circle-social-button";
import withLogging from "../../lib/withLogging";

const SocialLogo = styled.img`
    width: 40px;
    padding: 4px;
    opacity: 1;
`;

const pulse = keyframes`
  from {
    -webkit-transform: scale3d(.7, .7, .7);
    transform: scale3d(.7, .7, .7);
  }
  50% {
    -webkit-transform: scale3d(1.3, 1.3, 1.3);
    transform: scale3d(1.3, 1.3, 1.3);
  }
  to {
    -webkit-transform: scale3d(.7, .7, .7);
    transform: scale3d(.7, .7, .7);
  }
`;

const bounce = keyframes`
  from,
  20%,
  53%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  40%,
  43% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -30px, 0);
    transform: translate3d(0, -30px, 0);
  }
  70% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -15px, 0);
    transform: translate3d(0, -15px, 0);
  }
  90% {
    -webkit-transform: translate3d(0, -4px, 0);
    transform: translate3d(0, -4px, 0);
  }
`;

const TwitchText = styled.p`
    color: white;
    padding-left: 10px;
    display: none;
`;

const TwitchContainer = styled.a`
    position: fixed;
    z-index: 10000;
    bottom: 10px;
    left: 20px;
    cursor: pointer;
    background-color: #9146ff;
    width: 50px;
    height: 50px;
    border-radius: 75px;
    padding: 10px 10px 10px 12px;
    display: flex;
    justify-content: space-around;
    transition: 0.5s;
    text-decoration: none;

    &:focus {
        border-radius: 75px;
    }

    &:hover {
        width: 200px;
        transition: 0.5s;
    }
    &:hover ${TwitchText} ${RedDot} {
        display: block;
    }
    $:hover ${RedDot} {
        top: 10px;
        right: 190px !important;
    }
`;

const RedDot = styled.div`
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    top: 7px;
    right: 7px;
    animation: ${pulse} 1s infinite;
`;

const UrlLink = styled.a`
    position: absolute;
    text-decoration: none;
    width: 100%;
    height: 100%;
`;

const TwitchOnlineIndicator = props => {
    const [isTwitchOnline, setIsTwitchOnline] = useState(false);
    const [twitch, setTwitch] = useState();

    useEffect(() => {
        async function fetchTwitchOnline() {
            let response = await fetch(
                "https://api.twitch.tv/helix/streams?user_id=253326823",
                {
                    headers: {
                        "Client-Id": "ir7uv13rg3mgwi5jihzvj1ywavl5tm",
                    },
                },
            )
                .then(res => res.json())
                .then(data => {
                    return data;
                })
                .catch(err => console.log(err));
            if (response.data) {
                setIsTwitchOnline(response.data.length > 0);
                setTwitch(response.data);
            }
            return response;
        }

        fetchTwitchOnline();
    }, []);

    return (
        <>
            {props.alwaysOn === false ? (
                isTwitchOnline === true ? (
                    <TwitchContainer
                        target='_blank'
                        href='https://twitch.tv/blerp'
                        rel='nofollow'
                    >
                        <div
                            onClick={() =>
                                props.logAction({
                                    action:
                                        "TWITCH_ONLINE_INDICATOR_TO_TWITCH_CHANNEL_HOME",
                                    event: "WEBSITE_NAVIGATION_EVENT",
                                    data: {},
                                })
                            }
                        >
                            <SocialLogo
                                alt='Blerp Twitch Account'
                                src='https://storage.googleapis.com/blerp_products/Web/Home/twitch-logo-white.svg'
                            />
                        </div>
                        {isTwitchOnline ? <RedDot /> : <></>}
                        <TwitchText>
                            Blerp is {isTwitchOnline ? "live!" : "not live"}
                        </TwitchText>
                    </TwitchContainer>
                ) : (
                    <></>
                )
            ) : (
                <TwitchContainer
                    target='_blank'
                    href='https://twitch.tv/blerp'
                    rel='nofollow'
                >
                    <div
                        onClick={() =>
                            props.logAction({
                                action:
                                    "TWITCH_ONLINE_INDICATOR_TO_TWITCH_CHANNEL",
                                event: "WEBSITE_NAVIGATION_EVENT",
                                data: {},
                            })
                        }
                    >
                        <SocialLogo
                            alt='Blerp Twitch Account'
                            src='https://i.ya-webdesign.com/images/twitch-logo-white-png-1.png'
                        />
                    </div>
                    {isTwitchOnline ? <RedDot /> : <></>}
                    <TwitchText>
                        Blerp is {isTwitchOnline ? "live!" : "not live"}
                    </TwitchText>
                </TwitchContainer>
            )}
        </>
    );
};

export default withLogging(TwitchOnlineIndicator);

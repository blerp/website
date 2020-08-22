/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";
import HoverIntegrationButton from "./HoverIntegrationButton";
import projectConfig from "../../config";

const mainHost = projectConfig.host;

const MainContainer = styled.div`
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MainGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas:
        ". . myArea myArea myArea . ."
        ". . myArea myArea myArea . .";
    align-content: center;
    justify-items: center;
    grid-gap: 28px;
    background-color: ${props =>
        props.isLight ? props.theme.flyoutBackground : props.theme.starling};
    min-height: 600px;
    position: relative;
    min-width: 110%;
`;

const HeadingText = styled.h2`
    font-weight: 300;
    padding: 16px 0;
    font-size: 52px;
    margin: 0;
    color: ${props =>
        props.isLight ? props.theme.bodyText : props.theme.flyoutBackground};
    text-align: center;
    z-index: 100;

    @media (max-width: 600px) {
        font-size: 40px;
    }
`;

const PurpleHeaderText = styled.p`
    font-weight: 600;
    display: inline;
    padding: 12px;
    font-size: 52px;
    padding: 4px;
    letter-spacing: 2px;
    text-decoration: none;
    color: ${props => props.theme.starling};
    text-align: center;
    width: 100%;

    @media (max-width: 600px) {
        font-size: 40px;
    }
`;

const Image = styled.img`
    position: absolute;
    top: 24px;
    border: none;
    left: 0;
    background-repeat: no-repeat;

    /* Preserve aspet ratio */
    max-width: 100%;
    min-height: 60%;
`;

const MainGridItem = styled.div`
    z-index: 10;
    grid-area: myArea;
`;

const GroupGridItem = styled.div`
    width: 130%;
    justify-content: center;
    z-index: 10;
    display: flex;
    align-items: center;
`;

class HomeHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MainContainer>
                <MainGrid isLight={true}>
                    {this.props.hasScrolled && (
                        <React.Fragment>
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Pinterest%20quite.svg'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Pinterest.svg'
                                alt='Pinterest Logo'
                            />
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/tumbler%20quite.svg'
                                minWidth='40px'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Tumbler.svg'
                                alt='Tumblr Logo'
                            />
                        </React.Fragment>
                    )}
                    <MainGridItem>
                        <HeadingText isLight={true}>
                            We{" "}
                            <PurpleHeaderText href='/upload'>
                                integrate
                            </PurpleHeaderText>
                            with the{" "}
                            <PurpleHeaderText href='/upload'>
                                most popular platforms
                            </PurpleHeaderText>
                        </HeadingText>
                    </MainGridItem>

                    {this.props.hasScrolled && (
                        <React.Fragment>
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Pinterest%20quite.svg'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Pinterest.svg'
                                alt='Pinterest Logo'
                            />
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/tumbler%20quite.svg'
                                minWidth='40px'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Tumbler.svg'
                                alt='Tumblr Logo'
                            />

                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/discord`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Discord%20quite.svg'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Discrod.svg'
                                alt='Discor Logo'
                            />
                            <GroupGridItem>
                                <HoverIntegrationButton
                                    linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                    mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/twitter%20quite.svg'
                                    minWidth='60px'
                                    hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Twitter.svg'
                                    alt='Twitter Logo'
                                />
                                <HoverIntegrationButton
                                    linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                    mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/imessage%20quite.svg'
                                    minWidth='48px'
                                    hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/imessage.svg'
                                    alt='iMessage Logo'
                                />
                            </GroupGridItem>
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/discord`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Discord%20quite.svg'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Discrod.svg'
                                alt='Discord Logo'
                            />
                            <GroupGridItem>
                                <HoverIntegrationButton
                                    linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                    mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/twitter%20quite.svg'
                                    minWidth='60px'
                                    hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Twitter.svg'
                                    alt='Twitter Logo'
                                />
                                <HoverIntegrationButton
                                    linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                    mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/imessage%20quite.svg'
                                    minWidth='48px'
                                    hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/imessage.svg'
                                    alt='iMessage Logo'
                                />
                            </GroupGridItem>

                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/twitch`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Twitch%20quite.svg'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Twitch.svg'
                                alt='Twitch Logo'
                            />
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/facebook%20quite.svg'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Facebook.svg'
                                alt='Facebook Logo'
                            />
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/twitch`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Twitch%20quite.svg'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Twitch.svg'
                                alt='Twitch Logo'
                            />
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/facebook%20quite.svg'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Facebook.svg'
                                alt='Facebook Logo'
                            />
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/twitch`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Twitch%20quite.svg'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Twitch.svg'
                                alt='Twitch Logo'
                            />
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/facebook%20quite.svg'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Facebook.svg'
                                alt='Facebook Logo'
                            />
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/twitch`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Twitch%20quite.svg'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Twitch.svg'
                                alt='Twitch Logo'
                            />

                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/redit%20quite.svg'
                                minWidth='60px'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/redit.svg'
                                alt='Reddit Logo'
                            />
                            <GroupGridItem>
                                <HoverIntegrationButton
                                    linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                    mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/ios%20quite.svg'
                                    minWidth='48px'
                                    hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/ios.svg'
                                    alt='iOS App Store Logo'
                                />
                                <HoverIntegrationButton
                                    linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                    mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/android%20quite.svg'
                                    minWidth='40px'
                                    hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/android.svg'
                                    alt='Android Play Store Logo'
                                />
                            </GroupGridItem>
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/redit%20quite.svg'
                                minWidth='60px'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/redit.svg'
                                alt='Reddit Logo'
                            />
                            <GroupGridItem>
                                <HoverIntegrationButton
                                    linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                    mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/ios%20quite.svg'
                                    minWidth='48px'
                                    hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/ios.svg'
                                    alt='iOS App Store Logo'
                                />
                                <HoverIntegrationButton
                                    linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                    mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/android%20quite.svg'
                                    minWidth='40px'
                                    hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/android.svg'
                                    alt='Android Play Store Logo'
                                />
                            </GroupGridItem>
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/redit%20quite.svg'
                                minWidth='60px'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/redit.svg'
                                alt='Reddit Logo'
                            />
                            <GroupGridItem>
                                <HoverIntegrationButton
                                    linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                    mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/ios%20quite.svg'
                                    minWidth='48px'
                                    hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/ios.svg'
                                    alt='iOs Logo'
                                />
                                <HoverIntegrationButton
                                    linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                    mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/android%20quite.svg'
                                    minWidth='40px'
                                    hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/android.svg'
                                    alt='Android Play Store Logo'
                                />
                            </GroupGridItem>
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/redit%20quite.svg'
                                minWidth='60px'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/redit.svg'
                                alt='Reddit Logo'
                            />
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Pinterest%20quite.svg'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Pinterest.svg'
                                alt='Pinterest Logo'
                            />
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/tumbler%20quite.svg'
                                minWidth='40px'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Tumbler.svg'
                                alt='Tumblr Logo'
                            />
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Pinterest%20quite.svg'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Pinterest.svg'
                                alt='Pinterest Logo'
                            />
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/tumbler%20quite.svg'
                                minWidth='40px'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Tumbler.svg'
                                alt='Tumblr Logo'
                            />
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Pinterest%20quite.svg'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Pinterest.svg'
                                alt='Pinterest Logo'
                            />
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/tumbler%20quite.svg'
                                minWidth='40px'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Tumbler.svg'
                                alt='Tumblr Logo'
                            />
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Pinterest%20quite.svg'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Pinterest.svg'
                                alt='Pinterest Logo'
                            />

                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/discord`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Discord%20quite.svg'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Discrod.svg'
                                alt='Discord Logo'
                            />
                            <GroupGridItem>
                                <HoverIntegrationButton
                                    linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                    mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/twitter%20quite.svg'
                                    minWidth='60px'
                                    hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Twitter.svg'
                                    alt='Twitter Logo'
                                />
                                <HoverIntegrationButton
                                    linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                    mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/imessage%20quite.svg'
                                    minWidth='48px'
                                    hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/imessage.svg'
                                    alt='iMessage Logo'
                                />
                            </GroupGridItem>
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/discord`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Discord%20quite.svg'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Discrod.svg'
                                alt='Discord Logo'
                            />
                            <GroupGridItem>
                                <HoverIntegrationButton
                                    linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                    mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/twitter%20quite.svg'
                                    minWidth='60px'
                                    hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Twitter.svg'
                                    alt='TWitter Logo'
                                />
                                <HoverIntegrationButton
                                    linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                    mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/imessage%20quite.svg'
                                    minWidth='48px'
                                    hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/imessage.svg'
                                    alt='iMessage Logo'
                                />
                            </GroupGridItem>
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/discord`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Discord%20quite.svg'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Discrod.svg'
                                alt='Discord Logo'
                            />
                            <GroupGridItem>
                                <HoverIntegrationButton
                                    linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                    mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/twitter%20quite.svg'
                                    minWidth='60px'
                                    hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Twitter.svg'
                                    alt='Twitter Logo'
                                />
                                <HoverIntegrationButton
                                    linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
                                    mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/imessage%20quite.svg'
                                    minWidth='48px'
                                    hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/imessage.svg'
                                    alt='iMessage Logo'
                                />
                            </GroupGridItem>
                            <HoverIntegrationButton
                                linkUrl={`${mainHost}/discord`}
                                mainImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Discord%20quite.svg'
                                hoverImage='https://storage.googleapis.com/blerp_products/Web/Home/integrations/Discrod.svg'
                                alt='Discord Logo'
                            />
                        </React.Fragment>
                    )}
                    {/* 
          <HoverIntegrationButton
            linkUrl={`${mainHost}/twitch`}
            mainImage="https://storage.googleapis.com/blerp_products/Web/Home/integrations/Twitch%20quite.svg"
            hoverImage="https://storage.googleapis.com/blerp_products/Web/Home/integrations/Twitch.svg"
          />
          <HoverIntegrationButton
            linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
            mainImage="https://storage.googleapis.com/blerp_products/Web/Home/integrations/facebook%20quite.svg"
            hoverImage="https://storage.googleapis.com/blerp_products/Web/Home/integrations/Facebook.svg"
          />
          <HoverIntegrationButton
            linkUrl={`${mainHost}/twitch`}
            mainImage="https://storage.googleapis.com/blerp_products/Web/Home/integrations/Twitch%20quite.svg"
            hoverImage="https://storage.googleapis.com/blerp_products/Web/Home/integrations/Twitch.svg"
          />
          <HoverIntegrationButton
            linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
            mainImage="https://storage.googleapis.com/blerp_products/Web/Home/integrations/facebook%20quite.svg"
            hoverImage="https://storage.googleapis.com/blerp_products/Web/Home/integrations/Facebook.svg"
          />
          <HoverIntegrationButton
            linkUrl={`${mainHost}/twitch`}
            mainImage="https://storage.googleapis.com/blerp_products/Web/Home/integrations/Twitch%20quite.svg"
            hoverImage="https://storage.googleapis.com/blerp_products/Web/Home/integrations/Twitch.svg"
          />
          <HoverIntegrationButton
            linkUrl={`${mainHost}/soundboard-products/mobile-apps`}
            mainImage="https://storage.googleapis.com/blerp_products/Web/Home/integrations/facebook%20quite.svg"
            hoverImage="https://storage.googleapis.com/blerp_products/Web/Home/integrations/Facebook.svg"
          />
          <HoverIntegrationButton
            linkUrl={`${mainHost}/twitch`}
            mainImage="https://storage.googleapis.com/blerp_products/Web/Home/integrations/Twitch%20quite.svg"
            hoverImage="https://storage.googleapis.com/blerp_products/Web/Home/integrations/Twitch.svg"
          /> */}

                    {this.props.hasScrolled && (
                        <Image
                            src='https://storage.googleapis.com/blerp_products/Web/product_page/purple%20blerp%20texture.svg'
                            alt='Sound background image of purple blerps'
                        />
                    )}
                </MainGrid>
            </MainContainer>
        );
    }
}

export default HomeHeader;

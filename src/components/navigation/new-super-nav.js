import * as React from "react";
import styled, { keyframes } from "styled-components";

import Link from "next/link";
import { pandaPink } from "../../styles/colors";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  25% {
    opacity: 0.2;
  }

  50% {
    opacity: 0.6;
  }

  75% {
    opacity: 0.9;
  }

  100% {
    opacity: 1;
  }
`;

const OuterContentContainer = styled.div`
    position: relative;
    margin: 0;
    max-width: 50%;

    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 600px) {
        max-width: 80%;
    }
`;

const Container = styled.nav`
    overflow-x: scroll;
    display: flex;
    flex-direction: row;
    margin: 0 16px;
    -ms-overflow-style: none;

    @media (max-width: 600px) {
        margin: 0 40px;
    }

    &::-webkit-scrollbar {
        display: none;
    }
`;

const StyledNavLinkWrapper = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    width: inherit;
    text-align: center;
    padding: 0;
    justify-content: center;
    animation: ${fadeIn} 0.4s 1;
    margin: 0px 20px;
    min-width: 72px;

    @media (max-width: 600px) {
        margin: 0px 8px;
    }
`;

const StyledDropdownNavLinkWrapper = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    width: inherit;
    text-align: center;
    padding: 0;
    justify-content: center;
    animation: ${fadeIn} 0.4s 1;
    margin: 12px;
    padding: 8px;
    transition: 0.3s;
    border-radius: 4px;
    min-width: 72px;

    &:hover {
    }

    &:hover .main_super_nav_dropdown_text {
        color: ${pandaPink};
        text-decoration: underline;
        transition: all 0.2s ease 0s;
    }
`;

const HoverWrapper = styled.div`
    display: flex;
    vertical-align: top;

    &:hover .main_super_nav_text {
        color: ${pandaPink};
        text-decoration: underline;
        transition: all 0.2s ease 0s;
    }

    &:hover .blerp-super-nav-dropdown {
        display: block;
    }

    &:focus .blerp-super-nav-dropdown {
        display: block;
    }

    &:active .blerp-super-nav-dropdown {
        display: block;
    }
`;

const LinkWrapper = styled.a`
    display: block;
    font-size: 16px;
    border: none;
    text-decoration: none;
    background-color: transparent;
    text-align: center;
    align-self: center;

    &:hover {
    }

    &:active {
        background-color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

const DropdownLinkWrapper = styled.a`
    display: block;
    font-size: 16px;
    border: none;
    text-decoration: none;
    text-align: center;
    align-self: center;
    border-radius: 4px;
`;

const DropdownLinkContainer = styled.div`
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    background-color: ${props => props.theme.gray};
    z-index: 1;
    border-radius: 12px;
    opacity: 0.89;
    top: 20px;

    @media (max-width: 720px) {
        visibility: hidden;
    }
`;

const StyledNavText = styled.p`
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 1px;
    border: none;
    color: ${props => props.theme.flyoutBackground};
    text-decoration: none;
    background-color: transparent;
    text-align: center;
    align-self: center;
    margin: 0 4px;
`;

const ForwardButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    background-color: transparent;
    border-radius: 0px;
    border: none;
    opacity: 0.6;

    &:hover {
        opacity: 1;
    }

    &:focus {
        opacity: 1;
    }

    @media (min-width: 900px) {
        visibility: hidden;
    }
`;

const ForwardIcon = styled.div`
    position: relative;
    min-width: 8px;
    min-height: 8px;
    padding: 4px;
    margin: 4px;
    opacity: 1;
    background: url(${props => props.imageSrc}) center no-repeat;

    &:hover {
        opacity: 0.5;
        background: url(${props => props.hoverSrc}) center no-repeat;
    }
`;

const BackwardButton = styled.button`
    position: absolute;
    left: 0;
    z-index: 10;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    background-color: transparent;
    border-radius: 0px;
    border: none;
    opacity: 0.6;

    &:hover {
        opacity: 1;
    }

    &:focus {
        opacity: 1;
    }

    @media (min-width: 900px) {
        visibility: hidden;
    }
`;

const BackwardIcon = styled.div`
    position: relative;
    min-width: 8px;
    min-height: 8px;
    padding: 4px;
    margin: 4px;
    opacity: 1;
    background: url(${props => props.imageSrc}) center no-repeat;

    &:hover {
        opacity: 0.5;
        background: url(${props => props.hoverSrc}) center no-repeat;
    }
`;

// interface Props {
//   prefetch?: boolean;
//   navItems?: Array<{ path: string; name: string }>;
// }

// NOTE: https://github.com/zeit/next.js/issues/2208 path is the direct path to pages folder as is the url to show up in browser
const defaultProps = {
    prefetch: false,
    navItems: [
        // {
        //   path: "/",
        //   as: "/",
        //   name: "Home",
        //   subItems: []
        // },
        {
            path: "/soundboard-products",
            as: "/soundboard-products",
            name: "Integrations",
            subItems: [
                {
                    as: "/streamers",
                    path: "/streamers",
                    name: "Twitch Streamer Tools",
                },
                {
                    path: "/discord",
                    as: "/soundboard-products/discord",
                    name: "Discord Chatbot",
                },
                {
                    as: "/soundboard-products/mobile-apps",
                    path: "/app",
                    name: "Mobile Apps",
                },
                {
                    as: "/soundboard-products/voice-assistants",
                    path: "/voice-assistants",
                    name: "Voice Assistants",
                },
                {
                    as: "/streams",
                    path: "/streams",
                    name: "Live Blerp Streams",
                },
                {
                    path: "/twitch-walkon",
                    as: "/twitch-walkon",
                    name: "Walk on Sounds",
                },
            ],
        },
        {
            path: "/blerps",
            as: "/blerps",
            name: "Blerps",
            subItems: [
                {
                    path: "/what-is-blerp",
                    as: "/blerps/what-is-blerp",
                    name: "What is Blerp?",
                },
                {
                    as: "/blerps/how-blerp-is-used",
                    path: "/how-blerp-is-used",
                    name: "How Blerp is Used?",
                },
                {
                    as: "/blerps/suggest-ways-to-blerp",
                    path: "/suggest-ways-to-blerp",
                    name: "Suggest Ways to Blerp!",
                },
                {
                    path: "/top-sounds",
                    as: "/top-sounds",
                    name: "Popular Soundboards",
                },
                {
                    path: "/soundbites",
                    as: "/soundbites",
                    name: "Soundbites!",
                },
            ],
        },
        {
            as: "/blerps",
            path: "/blerps",
            name: "How To",
            subItems: [
                // {
                //   as: "/how-to/make-a-sound",
                //   path: "/how-to/make-a-sound",
                //   name: "Make a Sound"
                // },
                {
                    path: "/twitch/streaming-guides",
                    as: "/twitch/streaming-guides",
                    name: "Setup Twitch Extension",
                },
                {
                    path: "/how-to/create-a-soundboard",
                    as: "/how-to/create-a-soundboard",
                    name: "Create Soundboards",
                },
                {
                    path: "/twitch/sub-only-soundboards",
                    as: "/twitch/sub-only-soundboards",
                    name: "Create Twitch Sub Only Boards",
                },
            ],
        },
        {
            path: "/blog",
            as: "/blog",
            name: "Blog",
            subItems: [
                {
                    as: "/resources",
                    path: "/resources",
                    name: "All Resources",
                },
                {
                    as: "/resources/terms-of-service",
                    path: "/terms",
                    name: "Terms of Service",
                },
                {
                    as: "/resources/dmca",
                    path: "/dmca",
                    name: "DMCA",
                },
                {
                    as: "/resources/privacy",
                    path: "/privacy",
                    name: "Privacy Policy",
                },
                {
                    path: "/best-games-to-stream-on-twitch",
                    as: "/best-games-to-stream-on-twitch",
                    name: "Best Games To Stream",
                },
                {
                    path: "/making-money-on-twitch",
                    as: "/making-money-on-twitch",
                    name: "Making Money on Twitch",
                },
                {
                    path: "/how-to-make-money-playing-games",
                    as: "/how-to-make-money-playing-games",
                    name: "Making Money Playing Games",
                },
            ],
        },
        {
            path: "/connect-with-us",
            as: "/connect-with-us",
            name: "Contact",
            subItems: [
                {
                    as: "/connect-with-us/contact",
                    path: "/contact",
                    name: "Questions?",
                },
                {
                    as: "/connect-with-us/social-media",
                    path: "/social-media",
                    name: "Social Media",
                },
                {
                    path: "/company",
                    as: "/company",
                    name: "Company",
                },
                {
                    as: "/company/about-us",
                    path: "/about",
                    name: "Vision",
                },
                {
                    as: "/company/company-profiles",
                    path: "/company-profiles",
                    name: "Team",
                },
                {
                    as: "/company/company-picks",
                    path: "/company-picks",
                    name: "Our Favorites",
                },
                {
                    as: "/company/podcast",
                    path: "/podcast",
                    name: "Podcast",
                },
            ],
        },
    ],
};

const SCROLL_SPEED = 30;
const INVERAL_SPEED = 70;

class SuperNav extends React.Component {
    static defaultProps = defaultProps;
    horizontalScroll;
    scrollInterval;
    state = {
        scrollLeft: false,
        scrollRight: false,
    };

    scrollLeft = () => {
        this.horizontalScroll.scrollLeft -= SCROLL_SPEED;
    };

    scrollRight = () => {
        this.horizontalScroll.scrollLeft += SCROLL_SPEED;
    };

    scrollLeftSet = () => {
        this.scrollInterval = setInterval(() => {
            this.horizontalScroll.scrollLeft -= SCROLL_SPEED;
        }, INVERAL_SPEED);
        this.setState({ scrollLeft: true });
    };

    scrollRightSet = () => {
        this.scrollInterval = setInterval(() => {
            this.horizontalScroll.scrollLeft += SCROLL_SPEED;
        }, INVERAL_SPEED);
        this.setState({ scrollRight: true });
    };

    scrollExit = () => {
        clearInterval(this.scrollInterval);
        this.setState({ scrollLeft: false, scrollRight: false });
    };

    getScrollRowRef = el => {
        this.horizontalScroll = el;
    };

    renderLinkSingleItem({ path, name, as }) {
        return (
            <Link key={name} prefetch={true} href={{ pathname: path }} as={as}>
                <DropdownLinkWrapper href={path}>
                    <StyledDropdownNavLinkWrapper>
                        <StyledNavText className='main_super_nav_dropdown_text'>
                            {name}
                        </StyledNavText>
                    </StyledDropdownNavLinkWrapper>
                </DropdownLinkWrapper>
            </Link>
        );
    }

    renderLink({ path, name, subItems, as }) {
        if (this.props.prefetch) {
            return (
                <HoverWrapper key={name}>
                    <Link prefetch={true} href={{ pathname: path }} as={as}>
                        <LinkWrapper href={path}>
                            <StyledNavLinkWrapper>
                                <StyledNavText className='main_super_nav_text'>
                                    {name}
                                </StyledNavText>
                            </StyledNavLinkWrapper>
                        </LinkWrapper>
                    </Link>
                    <DropdownLinkContainer className='blerp-super-nav-dropdown'>
                        {subItems.map(navItem => {
                            return this.renderLinkSingleItem({
                                as: navItem.as,
                                path: navItem.path,
                                name: navItem.name,
                            });
                        })}
                    </DropdownLinkContainer>
                </HoverWrapper>
            );
        } else {
            return (
                <HoverWrapper key={name}>
                    <LinkWrapper href={path}>
                        <StyledNavLinkWrapper>
                            <StyledNavText>{name}</StyledNavText>
                        </StyledNavLinkWrapper>
                    </LinkWrapper>
                    <DropdownLinkContainer>
                        {subItems.map(navItem => {
                            return this.renderLinkSingleItem({
                                as: navItem.as,
                                path: navItem.path,
                                name: navItem.name,
                            });
                        })}
                    </DropdownLinkContainer>
                </HoverWrapper>
            );
        }
    }

    render() {
        return (
            <OuterContentContainer>
                <BackwardButton
                    onClick={this.scrollLeft}
                    onMouseEnter={this.scrollLeftSet}
                    onMouseLeave={this.scrollExit}
                    onMouseUp={this.scrollExit}
                    onTouchStart={this.scrollLeftSet}
                    onTouchEnd={this.scrollExit}
                >
                    <BackwardIcon
                        imageSrc='https://storage.googleapis.com/blerp-public-images/interaction/backward.svg'
                        hoverSrc='https://storage.googleapis.com/blerp-public-images/interaction/backward-pink.svg'
                    />
                </BackwardButton>
                <Container ref={this.getScrollRowRef}>
                    {this.props.navItems.map(navItem => {
                        return this.renderLink({
                            as: navItem.as,
                            path: navItem.path,
                            name: navItem.name,
                            subItems: navItem.subItems,
                        });
                    })}
                </Container>
                <ForwardButton
                    onClick={this.scrollRight}
                    onMouseEnter={this.scrollRightSet}
                    onMouseLeave={this.scrollExit}
                    onMouseUp={this.scrollExit}
                    onTouchStart={this.scrollRightSet}
                    onTouchEnd={this.scrollExit}
                >
                    <ForwardIcon
                        imageSrc='https://storage.googleapis.com/blerp-public-images/interaction/foward.svg'
                        hoverSrc='https://storage.googleapis.com/blerp-public-images/interaction/forward-pink.svg'
                    />
                </ForwardButton>
            </OuterContentContainer>
        );
    }
}

export default SuperNav;

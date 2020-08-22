/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";
import { Helmet } from "react-helmet";
import styled, { withTheme } from "styled-components";

import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";

import withData from "../lib/withData";

import projectConfig from "../config";

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const WholeRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    position: relative;
    padding: 40px 0;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;

const FooterContainer = styled.div`
    margin-top: 160px;
`;

const BlerpsContainer = styled.div`
    margin: 0 auto;
    align-self: center;
`;

const FontSize = styled.div`
    font-size: 20px;
    padding: 16px;
`;

const BigFontSize = styled.div`
    font-size: 5em;
    padding: 0.2em;
    font-weight: 600;
`;

const HeaderFontSize = styled.div`
    font-size: 2em;
    padding: 0;
    text-align: center;
`;

const StatsFontSize = styled.div`
    font-size: 7em;
    padding: 16px;
    color: ${props => props.fontColor};
    text-align: center;
    font-weight: bold;
`;

const DASHBOARD_QUERY = gql`
    query websiteTvDashboard {
        web {
            userSignedIn {
                _id
                roles
                username
            }
        }
        admin {
            totalBiteCount
            totalPlayCount
            totalSignUpCount
            totalTwitchShares
            totalRevenueActive
            totalTwitchInstalls
        }
    }
`;

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class Page extends React.Component {
    static getInitialProps = ctx => ({ id: ctx.query.id });
    props;
    state = {};

    isModOrAdmin(userData) {
        return (
            (userData &&
                userData.web &&
                userData.web.userSignedIn &&
                userData.web.userSignedIn.roles &&
                userData.web.userSignedIn.roles.indexOf("ADMIN") > -1) ||
            (userData &&
                userData.web &&
                userData.web.userSignedIn &&
                userData.web.userSignedIn.roles &&
                userData.web.userSignedIn.roles.indexOf("MODERATOR") > -1)
        );
    }

    render() {
        return (
            <Container>
                <Helmet>
                    <title>{"TV Dashboard Page"}</title>
                </Helmet>
                <NavBar />
                <WholeRow>
                    <BigFontSize>Blerp Stats</BigFontSize>
                </WholeRow>

                <Query
                    query={DASHBOARD_QUERY}
                    ssr={false}
                    errorPolicy={"all"}
                    notifyOnNetworkStatusChange={true}
                    pollInterval={3000}
                >
                    {userQuery => {
                        if (
                            !userQuery.data ||
                            userQuery.networkStatus === 1 ||
                            userQuery.networkStatus === 2
                        ) {
                            return <FontSize>{"loading"}</FontSize>;
                        }

                        if (this.isModOrAdmin(userQuery.data)) {
                            return (
                                <BlerpsContainer>
                                    <WholeRow>
                                        <Column>
                                            <HeaderFontSize>
                                                BITES CREATED
                                            </HeaderFontSize>
                                            <StatsFontSize
                                                fontColor={
                                                    this.props.theme.starling
                                                }
                                            >
                                                {numberWithCommas(
                                                    userQuery.data.admin
                                                        .totalBiteCount,
                                                )}
                                            </StatsFontSize>
                                        </Column>

                                        <Column>
                                            <HeaderFontSize>
                                                SIGN UPS
                                            </HeaderFontSize>
                                            <StatsFontSize
                                                fontColor={
                                                    this.props.theme.pandaPink
                                                }
                                            >
                                                {numberWithCommas(
                                                    userQuery.data.admin
                                                        .totalSignUpCount,
                                                )}
                                            </StatsFontSize>
                                        </Column>
                                        <Column>
                                            <HeaderFontSize>
                                                PLATFORM PLAYS
                                            </HeaderFontSize>
                                            <StatsFontSize
                                                fontColor={
                                                    this.props.theme.seafoam
                                                }
                                            >
                                                {numberWithCommas(
                                                    userQuery.data.admin
                                                        .totalPlayCount,
                                                )}
                                            </StatsFontSize>
                                        </Column>
                                    </WholeRow>
                                    <WholeRow>
                                        <Column>
                                            <HeaderFontSize>
                                                TWITCH INSTALLS
                                            </HeaderFontSize>
                                            <StatsFontSize
                                                fontColor={
                                                    this.props.theme.starling
                                                }
                                            >
                                                {numberWithCommas(
                                                    userQuery.data.admin
                                                        .totalTwitchInstalls,
                                                )}
                                            </StatsFontSize>
                                        </Column>

                                        <Column>
                                            <HeaderFontSize>
                                                MRA STREAMERS
                                            </HeaderFontSize>
                                            <StatsFontSize
                                                fontColor={
                                                    this.props.theme.pandaPink
                                                }
                                            >
                                                {numberWithCommas(
                                                    userQuery.data.admin
                                                        .totalRevenueActive,
                                                )}
                                            </StatsFontSize>
                                        </Column>
                                        <Column>
                                            <HeaderFontSize>
                                                SHARES ON STREAM
                                            </HeaderFontSize>
                                            <StatsFontSize
                                                fontColor={
                                                    this.props.theme.seafoam
                                                }
                                            >
                                                {numberWithCommas(
                                                    userQuery.data.admin
                                                        .totalTwitchShares,
                                                )}
                                            </StatsFontSize>
                                        </Column>
                                    </WholeRow>
                                </BlerpsContainer>
                            );
                        } else {
                            return <div>{"Totally Not Authorized!!"}</div>;
                        }
                    }}
                </Query>

                <FooterContainer>
                    <Footer />
                </FooterContainer>
            </Container>
        );
    }
}

export default withData(withTheme(Page));

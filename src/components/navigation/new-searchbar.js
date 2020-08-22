/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled, { keyframes } from "styled-components";
import { default as Router, withRouter } from "next/router";

import { pandaPink } from "../../styles/colors";

import { logEvent } from "../../lib/analytics";

const opacityAnimation = keyframes`
  0% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
  }
`;

const FeaturedButtonButton = styled.button`
    position: absolute;
    font-weight: 600;
    font-size: 20px;
    height: 100%;
    padding: 12px 20px;
    text-decoration: none;
    letter-spacing: 1px;
    color: ${props => props.theme.flyoutBackground};
    white-space: nowrap;
    background: ${props => props.theme.pandaPink};
    border-radius: 40px;
    line-height: 10px;
    border: ${props => props.theme.pandaPink} solid 2px;
    z-index: 10;
    right: 0;

    &:focus {
        border-radius: 40px;
        border: ${props => props.theme.seafoam} solid 2px !important;
    }

    &:hover {
        transition: all 0.2s ease 0s;
        background: rgb(240, 240, 240);
        color: rgb(254, 41, 92);
    }

    &:active {
        border: none !important;
        color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

const SearchForm = styled.form`
    position: relative;
    display: flex;
    background-color: transparent;
    height: ${props => (props.mobile ? "40px" : "56px")};
    width: 100%;
    margin: 12px 0;
    z-index: 100;
`;

const SearchBox = styled.input`
    position: relative;
    width: 100%;
    height: 100%;
    font-size: 16px;
    padding: 0 20px;
    appearance: none;
    border-radius: 40px;
    background-color: ${props => props.theme.waxWing};
    border: 2px solid ${props => props.theme.waxWing};
    caret-color: ${props => props.theme.pandaPink};
    flex: 1 1 auto;

    &:focus {
        border-radius: 40px !important;
        border: 2px solid ${props => props.theme.pandaPink} !important;
        outline: 0 !important;
        box-shadow: none !important;
    }

    &::placeholder {
        font-size: 18px;
        letter-spacing: 1px;
        color: ${props => props.theme.bodyText};
    }
`;

const PlaceholderBox = styled.div`
    position: absolute;
    opacity: 0;
    width: 100%;
    height: ${props => (props.mobile ? "40px" : "56px")};
    font-size: 16px;
    appearance: none;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${pandaPink};
    pointer-events: none;
    animation: ${opacityAnimation} 0.8s 1;
    z-index: 100;
`;

const ImageBelow = styled.img`
    height: 70%;
    pointer-events: none;
`;

class Header extends React.Component {
    static defaultProps = {
        displayButtons: true,
        displayOnMobile: "logo",
        initialSearchQuery: "",
    };
    navPopoutButton;
    searchBar;

    constructor(props) {
        super(props);
        this.state = {
            searchValue: props.initialSearchQuery,
            placeHolderState: 0,
        };
    }

    componentDidMount() {
        if (this.props.router) {
            this.props.router.prefetch("/search");
        }
        if (this.props.displayOnMobile === "search") {
            if (this.searchBar) {
                this.searchBar.focus();
            }
        }
        setInterval(() => {
            if (this.state.placeHolderState > 5) {
                this.setState({ placeHolderState: 0 });
            } else {
                this.setState({
                    placeHolderState: this.state.placeHolderState + 1,
                });
            }
        }, 6000);
    }

    getPlaceholderString() {
        switch (this.state.placeHolderState) {
            case 0:
                return "Find iconic memes";
            case 1:
                return "Search funny effects";
            case 2:
                return "Discover audio clips";
            case 3:
                return "Find favorite quotes";
            case 4:
                return "Discover fresh sounds";
            case 5:
            default:
                return "Search for Blerps";
        }
    }

    assignSearchBar = el => {
        this.searchBar = el;
    };

    render() {
        return (
            <SearchForm
                mobile={this.props.mobile}
                visibleOnMobile={true}
                role='search'
                onSubmit={
                    this.props.onSearchSubmit || this.defaultHandleSearchSubmit
                }
            >
                <SearchBox
                    ref={this.assignSearchBar}
                    type='search'
                    placeholder={this.getPlaceholderString()}
                    aria-label={this.getPlaceholderString()}
                    value={this.state.searchValue}
                    onChange={
                        this.props.onSearchChange ||
                        this.defaultHandleSearchChange
                    }
                    id='blerp_new_search_bar'
                />
                <PlaceholderBox mobile={this.props.mobile}>
                    <ImageBelow src='https://storage.googleapis.com/blerp_products/Web/blerp_white_logo.svg' />
                </PlaceholderBox>
                <FeaturedButtonButton onClick={this.defaultHandleSearchSubmit}>
                    Search
                </FeaturedButtonButton>
            </SearchForm>
        );
    }

    defaultHandleSearchSubmit = event => {
        event.preventDefault();
        if (!this.state.searchValue || this.state.searchValue === "") {
            return;
        }
        const searchValue = this.state.searchValue.split(" ").join("-");
        if (window) {
            if (window.gtag) {
                window.gtag("event", "search", {
                    search_term: this.state.searchValue,
                });
            }
            window.scrollTo(0, 0);
        }
        this.props.router.push(`/search?q=${searchValue}`);
    };

    defaultHandleSearchChange = event => {
        this.setState({
            searchValue: event.currentTarget.value,
        });
    };
}

export default withRouter(Header);

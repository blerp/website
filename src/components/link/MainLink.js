/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2018 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import Link from "next/link";
import styled from "styled-components";
import { focusState } from "../../styles/colors";

const MainTemplateLink = styled.a`
    display: ${props => (props.inline ? "inline" : "block")};
    text-decoration: none;
    padding: 0;
    color: ${focusState};
    font-size: ${props =>
        props.inline
            ? props.bigLink
                ? "28px"
                : "20px"
            : props.bigLink
            ? "28px"
            : "24px"};
    color: ${focusState};
    cursor: pointer;

    &:hover {
        color: rgba(200, 200, 200, 1);
        transition: all 0.2s ease 0s;
    }

    &:active {
        color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

//  Props: {
//   href: any;
//   as: string;
//   text?: string;
//   children?: any;
//   inline?: any;
//   bigLink?: any;
//   dontPrefetch?: boolean;
// };

class MainLink extends React.Component {
    static defaultProps = {};
    state;
    props;

    render() {
        if (this.props.dontPrefetch) {
            return (
                <MainTemplateLink
                    href={this.props.href}
                    inline={this.props.inline}
                    bigLink={this.props.bigLink}
                >
                    {this.props.text}
                </MainTemplateLink>
            );
        }
        return (
            <Link prefetch={true} href={this.props.href} as={this.props.as}>
                <MainTemplateLink
                    href={this.props.href}
                    inline={this.props.inline}
                    bigLink={this.props.bigLink}
                >
                    {this.props.children || this.props.text}
                </MainTemplateLink>
            </Link>
        );
    }
}

export default MainLink;

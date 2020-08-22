/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 *
 * @flow
 */

import * as React from "react";
import { default as Router } from "next/router";

const MAX_TITLE_LENGTH = 60;
class UrlChanger extends React.Component {
    props;
    static defaultProps = {
        title: "",
    };

    componentDidMount() {
        if (window && !!this.props.title) {
            const truncatedTitle = this.props.title
                .substring(0, MAX_TITLE_LENGTH)
                .replace(/[^a-zA-Z0-9-_]|-/g, " ")
                .replace(/-/g, " ")
                .trim()
                .replace(/\s\s+/g, " ")
                .toLowerCase();
            const truncatedTitleItems = truncatedTitle.split(" ");
            if (truncatedTitleItems.length) {
                truncatedTitleItems.push(this.props.id);
                const newUrlEndJoined = truncatedTitleItems.join("-");
                // Router.replace(
                //   `/${this.props.oldBaseName}/${newUrlEndJoined}`,
                //   `/${this.props.newUrlBasePathName}/${newUrlEndJoined}`,
                //   { shallow: true }
                // );
            }
        }
    }

    render() {
        return <div />;
    }
}

export default UrlChanger;

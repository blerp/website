/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";

import withData from "../lib/withData";

import { DarkBody } from "../components/layouts/dark-body";

import marksy from "marksy";

const Link = styled.a`
    text-decoration: none;
    color: #7fc6e1;
`;

// We can use the options to create custom elements.
const compile = marksy({
    createElement: React.createElement,
    elements: {
        a: Link,
    },
});

const document = `
# BLERP DMCA COPYRIGHT POLICY

Blerp Inc.. ("Company") has adopted the following general policy toward copyright infringement in accordance with the Digital Millennium Copyright Act http://lcweb.loc.gov/copyright/legislation/dmca.pdf. The address of the Designated Agent to Receive Notification of Claimed Infringement ("Designated Agent") is listed at the end of this policy.
## Procedure for Reporting Copyright Infringement:

If you believe that material or content residing on or accessible through Company's websites or services infringes a copyright, please send a notice of copyright infringement containing the following information to the Designated Agent listed below:

1. A physical or electronic signature of a person authorized to act on behalf of the owner of the copyright that has been allegedly infringed;
2. Identification of the copyrighted work claimed to have been infringed, or a representative list of such works;
3. Identification of the material that is claimed to be infringing including information regarding the location of the infringing materials that the copyright owner seeks to have removed, with sufficient detail so that Company is capable of finding and verifying its existence;
4. Your name, address, telephone number, and email address;
5. A statement that you have a good faith belief that the material is not authorized by the copyright owner, its agent, or the law; and
6. A statement made under penalty of perjury that the information provided is accurate and you are authorized to make the complaint on behalf of the copyright owner.

If we receive a takedown notice in accordance with the foregoing, we will remove the material cited in the notice and attempt to notify any user who uploaded the allegedly infringing material if we have their contact information. Any such user will have the opportunity to submit a counter-notice as set forth below. If we determine that any user has repeatedly infringed upon the intellectual property rights of others, we will disable any accounts that user has with us when appropriate.

## Procedure to Deliver Counter-Notice:

If any user believes any material removed is either not infringing or that such user has the right to post and use such material from the copyright owner, the copyright owner’s agent, or pursuant to the law, the user must send a counter-notice containing the following information to the Designated Agent listed below:

1. A physical or electronic signature of the user;
2. Identification of the material that has been removed and the location at which the material appeared before it was removed;
3. A statement that the user has a good faith belief that the material was removed as a result of mistake or a misidentification of the material; and
4. The user's name, address, telephone number, and, if available, e-mail address and a statement that such person or entity consents to the jurisdiction of the Federal Court for the judicial district in which the user's address is located, or if the user's address is located outside the United States, for any judicial district in which Company is located, and that such person or entity will accept service of process from the person who provided notification of the alleged infringement.

If a counter-notice is received by the Designated Agent, Company will forward it to the complaining party and tell them we will restore your content within 10 business days. If that party does not notify Company that they have filed a legal action relating to the allegedly infringing material before that period passes, Company will consider restoring your user content to the site.
Please contact the Designated Agent to Receive Notification of Claimed Infringement for Company at [dmca@blerp.com](mailto:dmca@blerp.com) or at:

Copyright Department

Blerp Inc.
1701 Student Life Way
Salt Lake City, UT 84112

Effective Date of Terms of Service: January 1st, 2017
`;

class Page extends React.Component {
    state;
    props;

    render() {
        return (
            <div>
                <Helmet>
                    <title>
                        Blerp DMCA Copyright Policy | Legal Information | Blerp
                    </title>
                    <meta
                        name='description'
                        content='Blerp DMCA Copyright Policy. Please read the DMCA Copyright Policy before using the Blerp meme soundboard website. Read alongside out Privacy Policy and Terms of Service. Enjoy Blerp.'
                    />
                </Helmet>
                <NavBar />
                <DarkBody>{compile(document).tree}</DarkBody>
                <Footer />
            </div>
        );
    }
}

export default withData(Page);

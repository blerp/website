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
# BLERP PRIVACY POLICY

This Privacy Policy describes the policies and procedures of Blerp Inc. ("we", "our" or "us") on the collection, use and disclosure of your information on www.blerp.com (the "Site") and the services, features, content or applications we offer (collectively with the Site, the "Services"). We receive information about you from various sources, including: (i) your use of the Services generally; and (ii) from third party websites and services. When you use the Services, you are consenting to the collection, transfer, manipulation, storage, disclosure and other uses of your information as described in this Privacy Policy.

## What Does This Privacy Policy Cover?

This Privacy Policy covers the treatment of personally identifiable information ("Personal Information") gathered when you are using or accessing the Services. This Privacy Policy also covers our treatment of any Personal Information that our business partners share with us or that we share with our business partners. This Privacy Policy does not apply to the practices of third parties that we do not own or control, including but not limited to any third party websites, services and applications ("Third Party Services") that you elect to access through the Service or to individuals that we do not manage or employ. While we attempt to facilitate access only to those Third Party Services that share our respect for your privacy, we cannot and do not take responsibility for the content or privacy policies of those Third Party Services.

## What Information Do We Collect?

The information we gather enables us to personalize, improve and continue to operate the Services. In connection with certain aspects of the Services, we may request, collect and/or display some of your Personal Information. We collect the following types of information from our users.

### User Content:

Some features of the Services allow you to provide content to the Services. All content submitted by you to the Services may be retained by us indefinitely, even if and after your access to the Services is terminated. We may continue to disclose such content to third parties in a manner that does not reveal Personal Information, as described in this Privacy Policy.

### IP Address Information and Other Information Collected Automatically:

We automatically receive and record information from your web browser when you interact with the Services, including your IP address and cookie information. This information is used for fighting spam/malware and also to facilitate collection of data concerning your interaction with the Services. Generally, the Services automatically collect usage information, such as the number and frequency of visitors to the Site.

### Information Collected Using Cookies:

We use cookies to enable our servers to recognize your web browser and tell us how and when you visit the Site and otherwise use the Services through the internet.
Our cookies do not, by themselves, contain Personal Information, and we do not combine the general information collected through cookies with other Personal Information to tell us who you are. As noted, however, we do use cookies to identify that your web browser has accessed aspects of the Services. You can set your browser to not accept cookies, but this may limit your ability to use the Services. This Privacy Policy covers our use of cookies only and does not cover the use of cookies by third parties. We do not control when or how third parties place cookies on your computer.

### Information Related to Advertising and the Use of Web Beacons:

To support and enhance the Services, we may serve advertisements, and also allow third parties advertisements, through the Services. These advertisements are sometimes targeted to particular users and may come from ad networks. Advertisements served through the Services may be targeted to users who fit a certain general profile category, which may be based on anonymized information inferred from information provided to us by a user, on the Services usage patterns of particular users, or on your activity on Third Party Services. We do not provide Personal Information to any ad networks for use outside of the Services. To increase the effectiveness of ad delivery, we may deliver a web beacon from an ad network to you through the Services. Web beacons allow ad networks to provide anonymized, aggregated auditing, research and reporting for us and for advertisers. Web beacons also enable ad networks to serve targeted advertisements to you when you visit other websites. Because your web browser must request these advertisements and web beacons from the ad network's servers, these companies can view, edit or set their own cookies, just as if you had requested a web page from their site.

### Aggregate Information:
We collect statistical information about how users, collectively, use the Services ("Aggregate Information"). Some of this information is derived from Personal Information. This statistical information is not Personal Information and cannot be tied back to you, or your web browser.

Protection of Minor’s Personal Information:
We do not knowingly collect any Personal Information from minors.

## How, and With Whom, Is My Information Shared?

The Services are designed to help you share information with others. As a result, some of the information generated through the Services is shared publicly or with third parties.

### Public Information about Your Activity on the Services:

Some of your activity on and through the Services is public by default. This may include, but is not limited to, content you have posted publicly on the Site or otherwise through the Services. Information concerning your use of the Services may be tracked anonymously through the use of cookies and stored by us. If you choose to provide Personal Information using certain public features of the Services, then that information is governed by the privacy settings of those particular features and may be publicly available. Individuals reading such information may use or disclose it to other individuals or entities without our control and without your knowledge, and search engines may index that information. We therefore urge you to think carefully about including any specific information you may deem private in content that you create or information that you submit through the Services.

### IP Address Information:

While we collect and store IP address information, that information is not made public. We do at times, however, share this information with our partners, service providers and other persons with whom we conduct business, and as otherwise specified in this Privacy Policy.

### Information You Elect to Share:

You may access other Third Party Services through the Services, for example by clicking on links to those Third Party Services from within the Site. We are not responsible for the privacy policies and/or practices of these Third Party Services, and you are responsible for reading and understanding those Third Party Services' privacy policies. This Privacy Policy only governs information collected on the Services.

### Aggregate Information:

We share Aggregate Information with our partners, service providers and other persons with whom we conduct business. We share this type of statistical data so that our partners can understand how and how often people use our Services and their services or websites, which facilitates improving both their services and how our Services interface with them. In addition, these third parties may share with us non-private, aggregated or otherwise non Personal Information about you that they have independently developed or acquired.

### Information Shared with Our Agents:

We employ and contract with people and other entities that perform certain tasks on our behalf and who are under our control (our "Agents"). We may need to share Personal Information with our Agents in order to provide products or services to you. Unless we tell you differently, our Agents do not have any right to use Personal Information or other information we share with them beyond what is necessary to assist us. You hereby consent to our sharing of Personal Information with our Agents.

### Information Disclosed Pursuant to Business Transfers:

In some cases, we may choose to buy or sell assets. In these types of transactions, user information is typically one of the transferred business assets. Moreover, if we, or substantially all of our assets, were acquired, or if we go out of business or enter bankruptcy, user information would be one of the assets that is transferred or acquired by a third party. You acknowledge that such transfers may occur, and that any acquirer of us or our assets may continue to use your Personal Information as set forth in this policy.

### Information Disclosed for Our Protection and the Protection of Others:

We also reserve the right to access, read, preserve, and disclose any information as it reasonably believes is necessary to (i) satisfy any applicable law, regulation, legal process or governmental request, (ii) enforce these Terms of Service, including investigation of potential violations hereof, (iii) detect, prevent, or otherwise address fraud, security or technical issues, (iv) respond to user support requests, or (v) protect our rights, property or safety, our users and the public. This includes exchanging information with other companies and organizations for fraud protection and spam/malware prevention.

### Information We Share With Your Consent:

Except as set forth above, you will be notified when your Personal Information may be shared with third parties, and will be able to prevent the sharing of this information.

## Is Information About Me Secure?

We seek to protect user information to ensure that it is kept private; however, we cannot guarantee the security of any user information. Unauthorized entry or use, hardware or software failure, and other factors, may compromise the security of user information at any time. We otherwise store all of our information, including your IP address information, using industry-standard techniques. We do not guarantee or warrant that such techniques will prevent unauthorized access to information about you that we store, Personal Information or otherwise.

## Accessing Your Personal Information

Users can access and delete cookies through their web browser settings. California Privacy Rights: Under California Civil Code sections 1798.83-1798.84, California residents are entitled to ask us for a notice identifying the categories of personal customer information which we share with our affiliates and/or third parties for marketing purposes, and providing contact information for such affiliates and/or third parties. If you are a California resident and would like a copy of this notice, please submit a written request to the following address: 1701 Student Life Way, Salt Lake City, UT 84112

You can use many of the features of the Services without registering, thereby limiting the type of information that we collect. You can always opt not to disclose certain information to us, even though it may be needed to take advantage of some of our features.

## Changes to this Privacy Policy

We may amend this Privacy Policy from time to time. Use of information we collect now is subject to the Privacy Policy in effect at the time such information is used. If we make changes in the way we collect or use information, we will notify you by posting an announcement on the Services. A user is bound by any changes to the Privacy Policy when he or she uses the Services after such changes have been first posted.  We encourage you to review this Privacy Policy regularly.

## What If I Have Questions or Concerns?

If you have any questions or concerns regarding privacy using the Services, please send us a detailed message to support@blerp.com. We will make every effort to resolve your concerns.
Effective Date: January 1st, 2017

`;

class Page extends React.Component {
    state;
    props;

    render() {
        return (
            <div>
                <Helmet>
                    <title>
                        Blerp Privacy Policy | Legal Information | Blerp
                    </title>
                    <meta
                        name='description'
                        content='Blerp Terms of Service. Please read these Terms of Service before using the Blerp meme soundboard website. Read alongside out Privacy Policy and DMCA Copyright Policy. Enjoy BlerpBlerp Privacy Policy. Please read the Privacy Policy before using the Blerp meme soundboard website. Read alongside out DMCA Copyright Policy and Terms of Service. Enjoy Blerp.'
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

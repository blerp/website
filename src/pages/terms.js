/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import withData from "../lib/withData";

import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";

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
# BLERP TERMS OF SERVICE

Please read these Terms of Service collectively with Blerp Inc.'s Privacy Policy (https://blerp.com/privacy) and DMCA Copyright Policy https://blerp.com/dmca, the "Terms of Service" fully and carefully before using www.blerp.com (the "Site"), any of the application programming interfaces offered by Blerp Inc. (collectively, the "API") and the services, features, content or applications offered by Blerp Inc. ("we", "us" or "our") (together with the Site and the API, the "Services"). These Terms of Service set forth the legally binding terms and conditions for your use of the Site and the Services.

1. Acceptance of Terms of Service.
  a. By registering for and/or using the Services in any manner, including but not limited to visiting or browsing the Site, you agree to these Terms of Service and all other operating rules, policies and procedures that may be published from time to time on the Site by us, each of which is incorporated by reference and each of which may be updated from time to time without notice to you.

  b. Certain of the Services may be subject to additional terms and conditions specified by us from time to time; your use of such Services is subject to those additional terms and conditions, which are incorporated into these Terms of Service by this reference.

  c. These Terms of Service apply to all users of the Services, including, without limitation, users who are contributors of content, information, and other materials or services, registered or otherwise.

2. Eligibility. You affirm that you are either more than 18 years of age, or an emancipated minor, or possess legal parental or guardian consent, and are fully able and competent to enter into the terms, conditions, obligations, affirmations, representations, and warranties set forth in these Terms of Service, and to abide by and comply with these Terms of Service. In any case, you affirm that you are over the age of 13, as the Service is not intended for children under 13. If you are under 13 years of age, then please do not use the Service. We may, in our sole discretion, refuse to offer the Services to any person or entity and change its eligibility criteria at any time. You are solely responsible for ensuring that these Terms of Service are in compliance with all laws, rules and regulations applicable to you and the right to access the Services is revoked where these Terms of Service or use of the Services is prohibited or to the extent offering, sale or provision of the Services conflicts with any applicable law, rule or regulation. Further, the Services are offered only for your use, and not for the use or benefit of any third party.

3. Registration. While general use of the Site does not require you to have an account, to use some aspects of the Services, you must register for an account (an "Account"). You must provide accurate and complete information and keep your Account information updated. Should we require that you select a username, you shall not: (i) select or use as a username a name of another person with the intent to impersonate that person; (ii) use as a username a name subject to any rights of any third party without appropriate authorization; or (iii) use, as a username, a name that is otherwise offensive, vulgar, obscene, or that we deem objectionable in our sole discretion. Without limiting the foregoing, we reserve the right to require that any user change its username at any time, for any reason. You are solely responsible for the activity that occurs on your Account, and for keeping your Account password secure. You may never use another person's user account or registration information for the Services without permission. You must notify us immediately of any change in your eligibility to use the Services (including any changes to or revocation of any licenses from state authorities), breach of security or unauthorized use of your Account. You should never publish, distribute or post login information for your Account. You shall have the ability to delete your Account, either directly or through a request made to one of our employees or affiliates.

3. Content.
  a) Definition. For purposes of these Terms of Service, the term "Content" includes, without limitation, information, data, text, photographs, videos, GIFs, audio clips, written posts and comments, software, scripts, graphics, and interactive features generated, provided, or otherwise made accessible on or through the Services. For the purposes of this Agreement, "Content" also includes all User Content (as defined below).

  b) User Content. All Content added, uploaded, submitted, distributed, posted to, or created using the Services by users (collectively "User Content"), whether publicly posted or privately transmitted, is the sole responsibility of the person who originated such User Content. You represent that all User Content provided by you is accurate, complete, up-to-date, and in compliance with all applicable laws, rules and regulations. Without limiting the generality of the foregoing, you represent that any User Content you create using tools accessible on the Services does not infringe upon the intellectual property rights of any third party and is otherwise in compliance with all applicable laws, rules and regulations. You acknowledge that all Content, including User Content, accessed by you using the Services is at your own risk and you will be solely responsible for any damage or loss to you or any other party resulting therefrom. We do not guarantee that any Content you access on or through the Services is or will continue to be accurate.

  c) Notices and Restrictions. The Services may contain Content specifically provided by us, our partners or our users and such Content is protected by copyrights, trademarks, service marks, patents, trade secrets or other proprietary rights and laws. You shall abide by and maintain all copyright notices, information, and restrictions contained in any Content accessed through the Services.

  d) Use License. Subject to these Terms of Service, we grant each user of the Services a worldwide, non-exclusive, non-sublicensable and non-transferable license to use Content solely for purposes of using the Services. Use, reproduction, modification, distribution or storage of any Content for other than purposes of using the Services is expressly prohibited without prior written permission from us. You shall not sell, license, rent, or otherwise use or exploit any Content for commercial use or in any way that violates any third party right or these Terms of Service.

  e) License Grant. By submitting User Content through the Services, you hereby do and shall grant us a worldwide, non-exclusive, perpetual, royalty-free, fully paid, sublicensable and transferable license to use, edit, modify, truncate, aggregate, reproduce, distribute, prepare derivative works of, display, perform, and otherwise fully exploit the User Content in connection with the Site, the Services and our (and our successors' and assignees') businesses, including without limitation for promoting and redistributing part or all of the Site or the Services (and derivative works thereof) in any media formats and through any media channels (including, without limitation, third party websites and feeds and via our API), and including after termination of your Account or the Services. You also hereby do and shall grant each user of the Site and/or the Services a non-exclusive, perpetual license to access your User Content through the Site and/or the Services, and to use, edit, modify, reproduce, distribute, prepare derivative works of, display and perform such User Content, including after termination your Account or the Services. For clarity, the foregoing license grants to us and our users do not affect your other ownership or license rights in your User Content, including the right to grant additional licenses to your User Content, unless otherwise agreed in writing. You represent and warrant that you have all rights to grant such licenses to us without infringement or violation of any third party rights, including without limitation, any privacy rights, publicity rights, copyrights, trademarks, contract rights, or any other intellectual property or proprietary rights.

  e) Availability of Content. We do not guarantee that any Content will be made available on the Site or through the Services. We reserve the right to, but do not have any obligation to, (i) remove, edit, modify, or block from the Services any Content in our sole discretion, at any time, without notice to you and for any reason (including, but not limited to, upon receipt of claims or allegations from third parties or authorities relating to such Content or if we are concerned that you may have breached the final sentence of the immediately foregoing paragraph), or for no reason at all.

5. Blerp's API.
  a) API License. Subject to these Terms of Service, we hereby grant you a non-exclusive, non-transferable, non-assignable, non-sublicensable, revocable, worldwide, limited, royalty-free right and license to access and use our API solely to allow for the creation of software applications that interface with the Services (collectively, the "Applications"). We reserve the right to deny and/or revoke access to the API for any reason or no reason, at any time, without notice. Subject to these Terms of Service, we hereby grant you a non-exclusive, non-transferable, non-assignable, non-sublicensable, revocable, worldwide, limited, right and license to use, reproduce, display, and distribute the Blerp trademarks and service marks (the "Blerp Marks") solely in connection with your licensed and authorized use of the API. You may not use the Blerp Marks in the titles or logos of Applications or other products or services, or in any way that implies our endorsement or sponsorship, or false association with such Applications. You shall (i) conspicuously label any Application with the words "Powered by Blerp," and the Blerp logo, and (ii) comply with the branding requirements that we may provide to you from time to time. For example, you agree not to use the name or logo "Blurp," "Bleerp," or "Blerpy", or any similar names or logos, in your Application. You acknowledge and agree that any and all goodwill accruing from the use of the Blerp shall inure solely to our benefit and that, other than the limited license granted herein, you have no right, title, or interest in any of the Blerp Marks. You shall not use Content to create a database, directory, or index containing GIFs or to improve, edit, augment or supplement any existing database, directory, or index containing GIFs. In addition, you shall not commingle Blerp search results with search results of another provider without Blerp's express written approval.

  b) API Limitations. You agree to respect the programmatic limitations of our API and the restrictions of these Terms of Service in designing and implementing Applications. In addition, you shall comply with any limitations on the frequency of access, calls and use of the API as provided to you by us from time to time. We expressly reserve the right in our sole discretion to limit the number and/or frequency of the API requests. You acknowledge that we may change or republish the API at any time and that it is your obligation to ensure that calls or requests you make through the Application are compatible with the then-current API. We may attempt to inform you of any changes with reasonable notice so you can adjust your service but are under no obligation to do so.

  c) No Misleading Users. You may not, under any circumstances, mislead or confuse users as to the features, functionality, origin, capabilities, or other aspects of an Application, including through an Application description. You shall make sure that your users understand that Applications are not official applications of ours or endorsed by us in any way.

  d) Application Support. You are solely responsible for any Applications that make use of the Services and for providing all support and technical assistance to end users of the Applications. You acknowledge and agree that we have no obligation to provide support or technical assistance directly to your end users or to you, and you shall not represent to any of your end users that we are available to provide such support.

  e) Ownership. The API, and all intellectual property rights therein, are and shall at all times remain our and our licensors' sole and exclusive property.

  f) Downtime and Suspensions. Your access to and use of the API or the Services may be interrupted for the duration of any scheduled, unscheduled, or unanticipated downtime, suspension or other unavailability, for any reason and in our sole discretion, including but not limited to: (i) as a result of power outages, system failures or other interruptions, (ii) for scheduled and unscheduled downtime to permit maintenance or modifications to the API or the Services, (iii) in the event of a denial of service attack or other attack or event that we determine may create any risk to us, you or any of our users, customers, or licensees, or (iv) in the event that we determine that any Service is prohibited by applicable law or otherwise determine that it is necessary or prudent to do so for legal or regulatory reasons. We shall have no liability whatsoever for any damage, liabilities, losses (including any loss of data or profits) or any other consequences that you may incur as a result of any downtime, suspension or other unavailability of the API or the Services.

6. Rules of Conduct.
  1) As a condition of use, you promise not to use the Services for any purpose that is prohibited by these Terms of Use. You are responsible for all of your activity in connection with the Services.

  2. You shall not (and shall not permit any third party to) either (a) take any action or (b) upload, create, download, post, submit or otherwise distribute or facilitate distribution of any Content on or through the Service, including without limitation any User Content, that:
      1. infringes any patent, trademark, trade secret, copyright, right of publicity or other right of any other person or entity or violates any law or contractual duty (see our DMCA Copyright Policy (http://blerp.com/dmca/);
      2. you know is false, misleading, untruthful or inaccurate;
      3. is unlawful, threatening, abusive, harassing, defamatory, libelous, deceptive, fraudulent, invasive of another's privacy, tortious, obscene, vulgar, pornographic, offensive, profane, contains or depicts nudity, contains or depicts sexual activity, or is otherwise inappropriate as determined by us in our sole discretion;
      4. constitutes unauthorized or unsolicited advertising, junk or bulk e-mail ("spamming");
      5. contains software viruses or any other computer codes, files, or programs that are designed or intended to disrupt, damage, limit or interfere with the proper function of any software, hardware, or telecommunications equipment or to damage or obtain unauthorized access to any system, data, password or other information of ours or of any third party;
      6. impersonates any person or entity, including any of our employees or representatives; or
      7. includes anyone’s identification documents or sensitive financial information.

  3. You shall not: (i) take any action that imposes or may impose (as determined by us in our sole discretion) an unreasonable or disproportionately large load on our (or our third party providers') infrastructure; (ii) interfere or attempt to interfere with the proper working of the Services or any activities conducted on the Services; (iii) bypass, circumvent or attempt to bypass or circumvent any measures we may use to prevent or restrict access to the Services (or other accounts, computer systems or networks connected to the Services); (iv) run any form of auto-responder or "spam" on the Services; (v) use manual or automated software, devices, or other processes to "crawl" or "spider" any page of the Site; (vi) harvest or scrape any Content from the Services; or (vii) otherwise take any action in violation of our guidelines and policies.

  4. You shall not (directly or indirectly): (i) decipher, decompile, disassemble, reverse engineer or otherwise attempt to derive any source code or underlying ideas or algorithms of any part of the Services (including without limitation any application of ours or the API), except to the limited extent applicable laws specifically prohibit such restriction, (ii) modify, translate, or otherwise create derivative works of any part of the Services, or (iii) copy, rent, lease, distribute, or otherwise transfer any of the rights that you receive hereunder. You shall abide by all applicable local, state, national and international laws and regulations.

  5. We also reserve the right to access, read, preserve, and disclose any information as we reasonably believe is necessary to (i) satisfy any applicable law, regulation, legal process or governmental request, (ii) enforce these Terms of Service, including investigation of potential violations hereof, (iii) detect, prevent, or otherwise address fraud, security or technical issues, (iv) respond to user support requests, or (v) protect the rights, property or safety of us, our users and the public.

7. Third Party Services. The Services may permit you to link to other websites, services or resources on the Internet including those that provide Content through our API, and other websites, services or resources may contain links to the Services. When you access third party resources on the Internet, you do so at your own risk. These other resources are not under our control, and you acknowledge that we are not responsible or liable for the content, functions, accuracy, legality, appropriateness or any other aspect of such websites or resources. The inclusion of any such link does not imply our endorsement or any association between us and their operators. You further acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such website or resource.

8. Termination. We may terminate your access to all or any part of the Services at any time, with or without cause, with or without notice, effective immediately, which may result in the forfeiture and destruction of all information associated with your membership. If you wish to terminate your Account, you may do so by following the instructions on the Site or through the Services. All provisions of these Terms of Service which by their nature should survive termination shall survive termination, including, without limitation, licenses of User Content, ownership provisions, warranty disclaimers, indemnity and limitations of liability.

9. Warranty Disclaimer.
WE HAVE NO SPECIAL RELATIONSHIP WITH OR FIDUCIARY DUTY TO YOU. YOU ACKNOWLEDGE THAT WE HAVE NO DUTY TO TAKE ANY ACTION REGARDING: WHICH USERS GAIN ACCESS TO THE SERVICES; WHAT CONTENT YOU ACCESS VIA THE SERVICES; OR HOW YOU MAY INTERPRET OR USE THE CONTENT. YOU RELEASE US FROM ALL LIABILITY FOR YOU HAVING ACQUIRED OR NOT ACQUIRED CONTENT THROUGH THE SERVICES. WE MAKE NO REPRESENTATIONS CONCERNING ANY CONTENT CONTAINED IN OR ACCESSED THROUGH THE SERVICES, AND WE WILL NOT BE RESPONSIBLE OR LIABLE FOR THE ACCURACY, COPYRIGHT COMPLIANCE, OR LEGALITY OF MATERIAL OR CONTENT CONTAINED IN OR ACCESSED THROUGH THE SERVICES. THE SERVICES AND CONTENT ARE PROVIDED "AS IS", "AS AVAILABLE" AND WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, AND ANY WARRANTIES IMPLIED BY ANY COURSE OF PERFORMANCE OR USAGE OF TRADE, ALL OF WHICH ARE EXPRESSLY DISCLAIMED. WE, AND OUR DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS, PARTNERS AND CONTENT PROVIDERS DO NOT WARRANT THAT: (I) THE SERVICES WILL BE SECURE OR AVAILABLE AT ANY PARTICULAR TIME OR LOCATION; (II) ANY DEFECTS OR ERRORS WILL BE CORRECTED; (III) ANY CONTENT OR SOFTWARE AVAILABLE AT OR THROUGH THE SERVICES IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS; OR (IV) THE RESULTS OF USING THE SERVICES WILL MEET YOUR REQUIREMENTS. YOUR USE OF THE SERVICES IS SOLELY AT YOUR OWN RISK.

10. Indemnification. You shall defend, indemnify, and hold harmless us, our affiliates and each of our and their respective employees, contractors, directors, suppliers and representatives from all liabilities, claims, and expenses, including reasonable attorneys' fees, that arise from or relate to your use or misuse of, or access to, the Services, Content, or otherwise from your User Content, violation of these Terms of Service, or infringement by you, or any third party using your Account or identity in the Services, of any intellectual property or other right of any person or entity. We reserve the right to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will assist and cooperate with us in asserting any available defenses.

11. Limitation of Liability. IN NO EVENT SHALL WE, NOR OUR DIRECTORS, EMPLOYEES, AGENTS, PARTNERS, SUPPLIERS OR CONTENT PROVIDERS, BE LIABLE UNDER CONTRACT, TORT, STRICT LIABILITY, NEGLIGENCE OR ANY OTHER LEGAL OR EQUITABLE THEORY WITH RESPECT TO THE SERVICES (I) FOR ANY LOST PROFITS, DATA LOSS, COST OF PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, OR SPECIAL, INDIRECT, INCIDENTAL, PUNITIVE, COMPENSATORY OR CONSEQUENTIAL DAMAGES OF ANY KIND WHATSOEVER, SUBSTITUTE GOODS OR SERVICES (HOWEVER ARISING), (II) FOR ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE (REGARDLESS OF THE SOURCE OF ORIGINATION), OR (III) FOR ANY DIRECT DAMAGES IN EXCESS OF $100.00.

12. Governing Law and Jurisdiction. These Terms of Service shall be governed by and construed in accordance with the laws of the State of New York, including its conflicts of law rules, and the United States of America. You agree that any dispute arising from or relating to the subject matter of these Terms of Service shall be governed by the exclusive jurisdiction and venue of the state and Federal courts of New York County, New York.

13. Modification. We reserve the right, in our sole discretion, to modify or replace any of these Terms of Service, or change, suspend, or discontinue the Services (including without limitation, the availability of any feature, database, or Content) at any time by posting updates and/or changes to the Site (or the applicable Services) or by sending you notice through the Services, via e-mail or by another appropriate means of electronic communication. We may also impose limits on certain features and services or restrict your access to parts or all of the Services without notice or liability. You shall be responsible for reviewing and becoming familiar with any such modifications, including by checking these Terms of Service periodically for changes. Your continued use of the Services following notification of any changes to these Terms of Service constitutes acceptance of those changes.

14. Miscellaneous.
  a) Force Majeure. We shall not be liable for any failure to perform our obligations hereunder where such failure results from any cause beyond our reasonable control, including, without limitation, mechanical, electronic or communications failure or degradation.

  b) Assignment. These Terms of Service are personal to you, and are not assignable, transferable or sublicensable by you except with our prior written consent. We may assign, transfer or delegate any of our rights and obligations hereunder without consent.

  c) Agency. No agency, partnership, joint venture, or employment relationship is created as a result of these Terms of Service and neither party has any authority of any kind to bind the other in any respect.

  d) Notices. Unless otherwise specified in these Term of Service, all notices under these Terms of Service will be in writing and will be deemed to have been duly given when received, if personally delivered or sent by certified or registered mail, return receipt requested; when receipt is electronically confirmed, if transmitted by facsimile or e-mail; or the day after it is sent, if sent for next day delivery by recognized overnight delivery service. Electronic notices should be sent to support@blerp.com.

  e) No Waiver. Our failure to enforce any part of these Terms of Service shall not constitute a waiver of our right to later enforce that or any other part of these Terms of Service. Waiver of compliance in any particular instance does not mean that we will waive compliance in the future. In order for any waiver of compliance with these Terms of Service to be binding, we must provide you with written notice of such waiver through one of our authorized representatives.

  f) Headings. The section and paragraph headings in these Terms of Service are for convenience only and shall not affect their interpretation.

15. Contact. You may contact us at the following address:

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
                        Blerp Terms of Service | Legal Information | Blerp
                    </title>
                    <meta
                        name='description'
                        content='Blerp Terms of Service. Please read these Terms of Service before using the Blerp meme soundboard website. Read alongside out Privacy Policy and DMCA Copyright Policy. Enjoy Blerp.'
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

import React, { useContext, useRef, useState, useEffect } from "react";
import withData from "../lib/withData";
import { Row } from "../components/shared/ProfileTabViews/ProfileStyledComponents";
import {
    Text,
    Grid,
    Column,
    Icon,
    Button,
    GenericModal,
} from "../components/theme/Theme";
import styled, { ThemeContext } from "styled-components";
import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";
import marksy from "marksy";
import router from "next/dist/client/router";

const Link = styled.a`
    text-decoration: none;
    color: 7fc6e1;
`;

const StyledText = styled(Text)`
    cursor: pointer;
`;

StyledText.defaultProps = {
    fontColor: "notBlack",
    fontWeight: "light",
    style: { lineHeight: "30px" },
};

const QuestionText = styled(StyledText)``;

const AnswerText = styled(StyledText)`
    line-height: 25px !important;
`;

const StyledRow = styled(Row)`
    flex-direction: column;
    padding: 40px;
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Twitch/Twitch%20Background.png);
    background-size: cover;
    position: fixed;
`;

const Wrapper = styled.div`
    background-color: ${props => props.theme.colors.waxing};
`;

const Sticky = styled.div`
    position: fixed;
    top: 300px;
    left: 100px;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: flex-end;
    z-index: 1;
`;

const Page = props => {
    const [renderPage, setRenderPage] = useState("Content Policy");
    const theme = useContext(ThemeContext);

    const overviewSection = useRef();
    const rulesSection = useRef();
    const enforcementSection = useRef();
    const topRef = useRef();

    useEffect(() => {
        console.log(props.url);
        if (props.url.asPath === "/terms-of-service") {
            setRenderPage("TOS");
        } else if (props.url.asPath === "/content-policy") {
            setRenderPage("Content Policy");
        } else if (props.url.asPath === "/dmca") {
            setRenderPage("DMCA");
        } else if (props.url.asPath === "/privacy-policy") {
            setRenderPage("Privacy Policy");
        }
    }, []);

    const handleScrollClick = value => {
        if (value === "overview") {
            overviewSection.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        } else if (value === "rules") {
            rulesSection.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        } else if (value === "enforcement") {
            enforcementSection.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        } else if (value === "top") {
            topRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    const renderDMCA = () => {
        return (
            <StyledRow>
                <StyledText>
                    BLERP DMCA COPYRIGHT POLICY
                    <br />
                    <br />
                    Blerp Inc.. ("Company") has adopted the following general
                    policy toward copyright infringement in accordance with the
                    Digital Millennium Copyright Act
                    http://lcweb.loc.gov/copyright/legislation/dmca.pdf. The
                    address of the Designated Agent to Receive Notification of
                    Claimed Infringement ("Designated Agent") is listed at the
                    end of this policy. Procedure for Reporting Copyright
                    Infringement:
                    <br />
                    <br />
                    If you believe that material or content residing on or
                    accessible through Company's websites or services infringes
                    a copyright, please send a notice of copyright infringement
                    containing the following information to the Designated Agent
                    listed below:
                    <br />
                    <br />
                    1. A physical or electronic signature of a person authorized
                    to act on behalf of the owner of the copyright that has been
                    allegedly infringed; 2. Identification of the copyrighted
                    work claimed to have been infringed, or a representative
                    list of such works; 3. Identification of the material that
                    is claimed to be infringing including information regarding
                    the location of the infringing materials that the copyright
                    owner seeks to have removed, with sufficient detail so that
                    Company is capable of finding and verifying its existence;
                    4. Your name, address, telephone number, and email address;
                    5. A statement that you have a good faith belief that the
                    material is not authorized by the copyright owner, its
                    agent, or the law; and 6. A statement made under penalty of
                    perjury that the information provided is accurate and you
                    are authorized to make the complaint on behalf of the
                    copyright owner.
                    <br />
                    <br />
                    If we receive a takedown notice in accordance with the
                    foregoing, we will remove the material cited in the notice
                    and attempt to notify any user who uploaded the allegedly
                    infringing material if we have their contact information.
                    Any such user will have the opportunity to submit a
                    counter-notice as set forth below. If we determine that any
                    user has repeatedly infringed upon the intellectual property
                    rights of others, we will disable any accounts that user has
                    with us when appropriate.
                    <br />
                    <br />
                    Procedure to Deliver Counter-Notice:
                    <br />
                    <br />
                    If any user believes any material removed is either not
                    infringing or that such user has the right to post and use
                    such material from the copyright owner, the copyright
                    owner’s agent, or pursuant to the law, the user must send a
                    counter-notice containing the following information to the
                    Designated Agent listed below:
                    <br />
                    <br />
                    1. A physical or electronic signature of the user; 2.
                    Identification of the material that has been removed and the
                    location at which the material appeared before it was
                    removed; 3. A statement that the user has a good faith
                    belief that the material was removed as a result of mistake
                    or a misidentification of the material; and 4. The user's
                    name, address, telephone number, and, if available, e-mail
                    address and a statement that such person or entity consents
                    to the jurisdiction of the Federal Court for the judicial
                    district in which the user's address is located, or if the
                    user's address is located outside the United States, for any
                    judicial district in which Company is located, and that such
                    person or entity will accept service of process from the
                    person who provided notification of the alleged
                    infringement.
                    <br />
                    <br />
                    If a counter-notice is received by the Designated Agent,
                    Company will forward it to the complaining party and tell
                    them we will restore your content within 10 business days.
                    If that party does not notify Company that they have filed a
                    legal action relating to the allegedly infringing material
                    before that period passes, Company will consider restoring
                    your user content to the site. Please contact the Designated
                    Agent to Receive Notification of Claimed Infringement for
                    Company at [dmca@blerp.com](mailto:dmca@blerp.com) or at:
                    <br />
                    <br />
                    Copyright Department
                    <br />
                    <br />
                    Blerp Inc. 324 S. 400 W #275 Salt Lake City, 84101
                    <br />
                    <br />
                    Effective Date of Terms of Service: January 1st, 2017
                </StyledText>
            </StyledRow>
        );
    };

    const renderTOS = () => {
        const compile = marksy({
            createElement: React.createElement,
            elements: {
                a: Link,
            },
        });

        return (
            <StyledRow>
                <StyledText>
                    BLERP TERMS OF SERVICE
                    <br />
                    <br />
                    Please read these Terms of Service collectively with Blerp
                    Inc.'s Privacy Policy (https://blerp.com/privacy) and DMCA
                    Copyright Policy https://blerp.com/dmca, the "Terms of
                    Service" fully and carefully before using www.blerp.com (the
                    "Site"), any of the application programming interfaces
                    offered by Blerp Inc. (collectively, the "API") and the
                    services, features, content or applications offered by Blerp
                    Inc. ("we", "us" or "our") (together with the Site and the
                    API, the "Services"). These Terms of Service set forth the
                    legally binding terms and conditions for your use of the
                    Site and the Services.
                    <br />
                    <br />
                    1. Acceptance of Terms of Service. a. By registering for
                    and/or using the Services in any manner, including but not
                    limited to visiting or browsing the Site, you agree to these
                    Terms of Service and all other operating rules, policies and
                    procedures that may be published from time to time on the
                    Site by us, each of which is incorporated by reference and
                    each of which may be updated from time to time without
                    notice to you.
                    <br />
                    <br />
                    b. Certain of the Services may be subject to additional
                    terms and conditions specified by us from time to time; your
                    use of such Services is subject to those additional terms
                    and conditions, which are incorporated into these Terms of
                    Service by this reference.
                    <br />
                    <br />
                    c. These Terms of Service apply to all users of the
                    Services, including, without limitation, users who are
                    contributors of content, information, and other materials or
                    services, registered or otherwise.
                    <br />
                    <br />
                    2. Eligibility. You affirm that you are either more than 18
                    years of age, or an emancipated minor, or possess legal
                    parental or guardian consent, and are fully able and
                    competent to enter into the terms, conditions, obligations,
                    affirmations, representations, and warranties set forth in
                    these Terms of Service, and to abide by and comply with
                    these Terms of Service. In any case, you affirm that you are
                    over the age of 13, as the Service is not intended for
                    children under 13. If you are under 13 years of age, then
                    please do not use the Service. We may, in our sole
                    discretion, refuse to offer the Services to any person or
                    entity and change its eligibility criteria at any time. You
                    are solely responsible for ensuring that these Terms of
                    Service are in compliance with all laws, rules and
                    regulations applicable to you and the right to access the
                    Services is revoked where these Terms of Service or use of
                    the Services is prohibited or to the extent offering, sale
                    or provision of the Services conflicts with any applicable
                    law, rule or regulation. Further, the Services are offered
                    only for your use, and not for the use or benefit of any
                    third party.
                    <br />
                    <br />
                    3. Registration. While general use of the Site does not
                    require you to have an account, to use some aspects of the
                    Services, you must register for an account (an "Account").
                    You must provide accurate and complete information and keep
                    your Account information updated. Should we require that you
                    select a username, you shall not: (i) select or use as a
                    username a name of another person with the intent to
                    impersonate that person; (ii) use as a username a name
                    subject to any rights of any third party without appropriate
                    authorization; or (iii) use, as a username, a name that is
                    otherwise offensive, vulgar, obscene, or that we deem
                    objectionable in our sole discretion. Without limiting the
                    foregoing, we reserve the right to require that any user
                    change its username at any time, for any reason. You are
                    solely responsible for the activity that occurs on your
                    Account, and for keeping your Account password secure. You
                    may never use another person's user account or registration
                    information for the Services without permission. You must
                    notify us immediately of any change in your eligibility to
                    use the Services (including any changes to or revocation of
                    any licenses from state authorities), breach of security or
                    unauthorized use of your Account. You should never publish,
                    distribute or post login information for your Account. You
                    shall have the ability to delete your Account, either
                    directly or through a request made to one of our employees
                    or affiliates.
                    <br />
                    <br />
                    3. Content. a) Definition. For purposes of these Terms of
                    Service, the term "Content" includes, without limitation,
                    information, data, text, photographs, videos, GIFs, audio
                    clips, written posts and comments, software, scripts,
                    graphics, and interactive features generated, provided, or
                    otherwise made accessible on or through the Services. For
                    the purposes of this Agreement, "Content" also includes all
                    User Content (as defined below).
                    <br />
                    <br />
                    b) User Content. All Content added, uploaded, submitted,
                    distributed, posted to, or created using the Services by
                    users (collectively "User Content"), whether publicly posted
                    or privately transmitted, is the sole responsibility of the
                    person who originated such User Content. You represent that
                    all User Content provided by you is accurate, complete,
                    up-to-date, and in compliance with all applicable laws,
                    rules and regulations. Without limiting the generality of
                    the foregoing, you represent that any User Content you
                    create using tools accessible on the Services does not
                    infringe upon the intellectual property rights of any third
                    party and is otherwise in compliance with all applicable
                    laws, rules and regulations. You acknowledge that all
                    Content, including User Content, accessed by you using the
                    Services is at your own risk and you will be solely
                    responsible for any damage or loss to you or any other party
                    resulting therefrom. We do not guarantee that any Content
                    you access on or through the Services is or will continue to
                    be accurate.
                    <br />
                    <br />
                    c) Notices and Restrictions. The Services may contain
                    Content specifically provided by us, our partners or our
                    users and such Content is protected by copyrights,
                    trademarks, service marks, patents, trade secrets or other
                    proprietary rights and laws. You shall abide by and maintain
                    all copyright notices, information, and restrictions
                    contained in any Content accessed through the Services.
                    <br />
                    <br />
                    d) Use License. Subject to these Terms of Service, we grant
                    each user of the Services a worldwide, non-exclusive,
                    non-sublicensable and non-transferable license to use
                    Content solely for purposes of using the Services. Use,
                    reproduction, modification, distribution or storage of any
                    Content for other than purposes of using the Services is
                    expressly prohibited without prior written permission from
                    us. You shall not sell, license, rent, or otherwise use or
                    exploit any Content for commercial use or in any way that
                    violates any third party right or these Terms of Service.
                    <br />
                    <br />
                    e) License Grant. By submitting User Content through the
                    Services, you hereby do and shall grant us a worldwide,
                    non-exclusive, perpetual, royalty-free, fully paid,
                    sublicensable and transferable license to use, edit, modify,
                    truncate, aggregate, reproduce, distribute, prepare
                    derivative works of, display, perform, and otherwise fully
                    exploit the User Content in connection with the Site, the
                    Services and our (and our successors' and assignees')
                    businesses, including without limitation for promoting and
                    redistributing part or all of the Site or the Services (and
                    derivative works thereof) in any media formats and through
                    any media channels (including, without limitation, third
                    party websites and feeds and via our API), and including
                    after termination of your Account or the Services. You also
                    hereby do and shall grant each user of the Site and/or the
                    Services a non-exclusive, perpetual license to access your
                    User Content through the Site and/or the Services, and to
                    use, edit, modify, reproduce, distribute, prepare derivative
                    works of, display and perform such User Content, including
                    after termination your Account or the Services. For clarity,
                    the foregoing license grants to us and our users do not
                    affect your other ownership or license rights in your User
                    Content, including the right to grant additional licenses to
                    your User Content, unless otherwise agreed in writing. You
                    represent and warrant that you have all rights to grant such
                    licenses to us without infringement or violation of any
                    third party rights, including without limitation, any
                    privacy rights, publicity rights, copyrights, trademarks,
                    contract rights, or any other intellectual property or
                    proprietary rights.
                    <br />
                    <br />
                    e) Availability of Content. We do not guarantee that any
                    Content will be made available on the Site or through the
                    Services. We reserve the right to, but do not have any
                    obligation to, (i) remove, edit, modify, or block from the
                    Services any Content in our sole discretion, at any time,
                    without notice to you and for any reason (including, but not
                    limited to, upon receipt of claims or allegations from third
                    parties or authorities relating to such Content or if we are
                    concerned that you may have breached the final sentence of
                    the immediately foregoing paragraph), or for no reason at
                    all.
                    <br />
                    <br />
                    5. Blerp's API. a) API License. Subject to these Terms of
                    Service, we hereby grant you a non-exclusive,
                    non-transferable, non-assignable, non-sublicensable,
                    revocable, worldwide, limited, royalty-free right and
                    license to access and use our API solely to allow for the
                    creation of software applications that interface with the
                    Services (collectively, the "Applications"). We reserve the
                    right to deny and/or revoke access to the API for any reason
                    or no reason, at any time, without notice. Subject to these
                    Terms of Service, we hereby grant you a non-exclusive,
                    non-transferable, non-assignable, non-sublicensable,
                    revocable, worldwide, limited, right and license to use,
                    reproduce, display, and distribute the Blerp trademarks and
                    service marks (the "Blerp Marks") solely in connection with
                    your licensed and authorized use of the API. You may not use
                    the Blerp Marks in the titles or logos of Applications or
                    other products or services, or in any way that implies our
                    endorsement or sponsorship, or false association with such
                    Applications. You shall (i) conspicuously label any
                    Application with the words "Powered by Blerp," and the Blerp
                    logo, and (ii) comply with the branding requirements that we
                    may provide to you from time to time. For example, you agree
                    not to use the name or logo "Blurp," "Bleerp," or "Blerpy",
                    or any similar names or logos, in your Application. You
                    acknowledge and agree that any and all goodwill accruing
                    from the use of the Blerp shall inure solely to our benefit
                    and that, other than the limited license granted herein, you
                    have no right, title, or interest in any of the Blerp Marks.
                    You shall not use Content to create a database, directory,
                    or index containing GIFs or to improve, edit, augment or
                    supplement any existing database, directory, or index
                    containing GIFs. In addition, you shall not commingle Blerp
                    search results with search results of another provider
                    without Blerp's express written approval.
                    <br />
                    <br />
                    b) API Limitations. You agree to respect the programmatic
                    limitations of our API and the restrictions of these Terms
                    of Service in designing and implementing Applications. In
                    addition, you shall comply with any limitations on the
                    frequency of access, calls and use of the API as provided to
                    you by us from time to time. We expressly reserve the right
                    in our sole discretion to limit the number and/or frequency
                    of the API requests. You acknowledge that we may change or
                    republish the API at any time and that it is your obligation
                    to ensure that calls or requests you make through the
                    Application are compatible with the then-current API. We may
                    attempt to inform you of any changes with reasonable notice
                    so you can adjust your service but are under no obligation
                    to do so.
                    <br />
                    <br />
                    c) No Misleading Users. You may not, under any
                    circumstances, mislead or confuse users as to the features,
                    functionality, origin, capabilities, or other aspects of an
                    Application, including through an Application description.
                    You shall make sure that your users understand that
                    Applications are not official applications of ours or
                    endorsed by us in any way.
                    <br />
                    <br />
                    d) Application Support. You are solely responsible for any
                    Applications that make use of the Services and for providing
                    all support and technical assistance to end users of the
                    Applications. You acknowledge and agree that we have no
                    obligation to provide support or technical assistance
                    directly to your end users or to you, and you shall not
                    represent to any of your end users that we are available to
                    provide such support.
                    <br />
                    <br />
                    e) Ownership. The API, and all intellectual property rights
                    therein, are and shall at all times remain our and our
                    licensors' sole and exclusive property.
                    <br />
                    <br />
                    f) Downtime and Suspensions. Your access to and use of the
                    API or the Services may be interrupted for the duration of
                    any scheduled, unscheduled, or unanticipated downtime,
                    suspension or other unavailability, for any reason and in
                    our sole discretion, including but not limited to: (i) as a
                    result of power outages, system failures or other
                    interruptions, (ii) for scheduled and unscheduled downtime
                    to permit maintenance or modifications to the API or the
                    Services, (iii) in the event of a denial of service attack
                    or other attack or event that we determine may create any
                    risk to us, you or any of our users, customers, or
                    licensees, or (iv) in the event that we determine that any
                    Service is prohibited by applicable law or otherwise
                    determine that it is necessary or prudent to do so for legal
                    or regulatory reasons. We shall have no liability whatsoever
                    for any damage, liabilities, losses (including any loss of
                    data or profits) or any other consequences that you may
                    incur as a result of any downtime, suspension or other
                    unavailability of the API or the Services.
                    <br />
                    <br />
                    6. Rules of Conduct. 1) As a condition of use, you promise
                    not to use the Services for any purpose that is prohibited
                    by these Terms of Use. You are responsible for all of your
                    activity in connection with the Services.
                    <br />
                    <br />
                    2. You shall not (and shall not permit any third party to)
                    either (a) take any action or (b) upload, create, download,
                    post, submit or otherwise distribute or facilitate
                    distribution of any Content on or through the Service,
                    including without limitation any User Content, that: 1.
                    infringes any patent, trademark, trade secret, copyright,
                    right of publicity or other right of any other person or
                    entity or violates any law or contractual duty (see our DMCA
                    Copyright Policy (http://blerp.com/dmca/); 2. you know is
                    false, misleading, untruthful or inaccurate; 3. is unlawful,
                    threatening, abusive, harassing, defamatory, libelous,
                    deceptive, fraudulent, invasive of another's privacy,
                    tortious, obscene, vulgar, pornographic, offensive, profane,
                    contains or depicts nudity, contains or depicts sexual
                    activity, or is otherwise inappropriate as determined by us
                    in our sole discretion; 4. constitutes unauthorized or
                    unsolicited advertising, junk or bulk e-mail ("spamming");
                    5. contains software viruses or any other computer codes,
                    files, or programs that are designed or intended to disrupt,
                    damage, limit or interfere with the proper function of any
                    software, hardware, or telecommunications equipment or to
                    damage or obtain unauthorized access to any system, data,
                    password or other information of ours or of any third party;
                    6. impersonates any person or entity, including any of our
                    employees or representatives; or 7. includes anyone’s
                    identification documents or sensitive financial information.
                    <br />
                    <br />
                    3. You shall not: (i) take any action that imposes or may
                    impose (as determined by us in our sole discretion) an
                    unreasonable or disproportionately large load on our (or our
                    third party providers') infrastructure; (ii) interfere or
                    attempt to interfere with the proper working of the Services
                    or any activities conducted on the Services; (iii) bypass,
                    circumvent or attempt to bypass or circumvent any measures
                    we may use to prevent or restrict access to the Services (or
                    other accounts, computer systems or networks connected to
                    the Services); (iv) run any form of auto-responder or "spam"
                    on the Services; (v) use manual or automated software,
                    devices, or other processes to "crawl" or "spider" any page
                    of the Site; (vi) harvest or scrape any Content from the
                    Services; or (vii) otherwise take any action in violation of
                    our guidelines and policies.
                    <br />
                    <br />
                    4. You shall not (directly or indirectly): (i) decipher,
                    decompile, disassemble, reverse engineer or otherwise
                    attempt to derive any source code or underlying ideas or
                    algorithms of any part of the Services (including without
                    limitation any application of ours or the API), except to
                    the limited extent applicable laws specifically prohibit
                    such restriction, (ii) modify, translate, or otherwise
                    create derivative works of any part of the Services, or
                    (iii) copy, rent, lease, distribute, or otherwise transfer
                    any of the rights that you receive hereunder. You shall
                    abide by all applicable local, state, national and
                    international laws and regulations.
                    <br />
                    <br />
                    5. We also reserve the right to access, read, preserve, and
                    disclose any information as we reasonably believe is
                    necessary to (i) satisfy any applicable law, regulation,
                    legal process or governmental request, (ii) enforce these
                    Terms of Service, including investigation of potential
                    violations hereof, (iii) detect, prevent, or otherwise
                    address fraud, security or technical issues, (iv) respond to
                    user support requests, or (v) protect the rights, property
                    or safety of us, our users and the public.
                    <br />
                    <br />
                    7. Third Party Services. The Services may permit you to link
                    to other websites, services or resources on the Internet
                    including those that provide Content through our API, and
                    other websites, services or resources may contain links to
                    the Services. When you access third party resources on the
                    Internet, you do so at your own risk. These other resources
                    are not under our control, and you acknowledge that we are
                    not responsible or liable for the content, functions,
                    accuracy, legality, appropriateness or any other aspect of
                    such websites or resources. The inclusion of any such link
                    does not imply our endorsement or any association between us
                    and their operators. You further acknowledge and agree that
                    we shall not be responsible or liable, directly or
                    indirectly, for any damage or loss caused or alleged to be
                    caused by or in connection with the use of or reliance on
                    any such content, goods or services available on or through
                    any such website or resource.
                    <br />
                    <br />
                    8. Termination. We may terminate your access to all or any
                    part of the Services at any time, with or without cause,
                    with or without notice, effective immediately, which may
                    result in the forfeiture and destruction of all information
                    associated with your membership. If you wish to terminate
                    your Account, you may do so by following the instructions on
                    the Site or through the Services. All provisions of these
                    Terms of Service which by their nature should survive
                    termination shall survive termination, including, without
                    limitation, licenses of User Content, ownership provisions,
                    warranty disclaimers, indemnity and limitations of
                    liability.
                    <br />
                    <br />
                    9. Warranty Disclaimer. WE HAVE NO SPECIAL RELATIONSHIP WITH
                    OR FIDUCIARY DUTY TO YOU. YOU ACKNOWLEDGE THAT WE HAVE NO
                    DUTY TO TAKE ANY ACTION REGARDING: WHICH USERS GAIN ACCESS
                    TO THE SERVICES; WHAT CONTENT YOU ACCESS VIA THE SERVICES;
                    OR HOW YOU MAY INTERPRET OR USE THE CONTENT. YOU RELEASE US
                    FROM ALL LIABILITY FOR YOU HAVING ACQUIRED OR NOT ACQUIRED
                    CONTENT THROUGH THE SERVICES. WE MAKE NO REPRESENTATIONS
                    CONCERNING ANY CONTENT CONTAINED IN OR ACCESSED THROUGH THE
                    SERVICES, AND WE WILL NOT BE RESPONSIBLE OR LIABLE FOR THE
                    ACCURACY, COPYRIGHT COMPLIANCE, OR LEGALITY OF MATERIAL OR
                    CONTENT CONTAINED IN OR ACCESSED THROUGH THE SERVICES. THE
                    SERVICES AND CONTENT ARE PROVIDED "AS IS", "AS AVAILABLE"
                    AND WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                    INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
                    TITLE, NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS FOR A
                    PARTICULAR PURPOSE, AND ANY WARRANTIES IMPLIED BY ANY COURSE
                    OF PERFORMANCE OR USAGE OF TRADE, ALL OF WHICH ARE EXPRESSLY
                    DISCLAIMED. WE, AND OUR DIRECTORS, EMPLOYEES, AGENTS,
                    SUPPLIERS, PARTNERS AND CONTENT PROVIDERS DO NOT WARRANT
                    THAT: (I) THE SERVICES WILL BE SECURE OR AVAILABLE AT ANY
                    PARTICULAR TIME OR LOCATION; (II) ANY DEFECTS OR ERRORS WILL
                    BE CORRECTED; (III) ANY CONTENT OR SOFTWARE AVAILABLE AT OR
                    THROUGH THE SERVICES IS FREE OF VIRUSES OR OTHER HARMFUL
                    COMPONENTS; OR (IV) THE RESULTS OF USING THE SERVICES WILL
                    MEET YOUR REQUIREMENTS. YOUR USE OF THE SERVICES IS SOLELY
                    AT YOUR OWN RISK.
                    <br />
                    <br />
                    10. Indemnification. You shall defend, indemnify, and hold
                    harmless us, our affiliates and each of our and their
                    respective employees, contractors, directors, suppliers and
                    representatives from all liabilities, claims, and expenses,
                    including reasonable attorneys' fees, that arise from or
                    relate to your use or misuse of, or access to, the Services,
                    Content, or otherwise from your User Content, violation of
                    these Terms of Service, or infringement by you, or any third
                    party using your Account or identity in the Services, of any
                    intellectual property or other right of any person or
                    entity. We reserve the right to assume the exclusive defense
                    and control of any matter otherwise subject to
                    indemnification by you, in which event you will assist and
                    cooperate with us in asserting any available defenses.
                    <br />
                    <br />
                    11. Limitation of Liability. IN NO EVENT SHALL WE, NOR OUR
                    DIRECTORS, EMPLOYEES, AGENTS, PARTNERS, SUPPLIERS OR CONTENT
                    PROVIDERS, BE LIABLE UNDER CONTRACT, TORT, STRICT LIABILITY,
                    NEGLIGENCE OR ANY OTHER LEGAL OR EQUITABLE THEORY WITH
                    RESPECT TO THE SERVICES (I) FOR ANY LOST PROFITS, DATA LOSS,
                    COST OF PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, OR
                    SPECIAL, INDIRECT, INCIDENTAL, PUNITIVE, COMPENSATORY OR
                    CONSEQUENTIAL DAMAGES OF ANY KIND WHATSOEVER, SUBSTITUTE
                    GOODS OR SERVICES (HOWEVER ARISING), (II) FOR ANY BUGS,
                    VIRUSES, TROJAN HORSES, OR THE LIKE (REGARDLESS OF THE
                    SOURCE OF ORIGINATION), OR (III) FOR ANY DIRECT DAMAGES IN
                    EXCESS OF $100.00.
                    <br />
                    <br />
                    12. Governing Law and Jurisdiction. These Terms of Service
                    shall be governed by and construed in accordance with the
                    laws of the State of New York, including its conflicts of
                    law rules, and the United States of America. You agree that
                    any dispute arising from or relating to the subject matter
                    of these Terms of Service shall be governed by the exclusive
                    jurisdiction and venue of the state and Federal courts of
                    New York County, New York.
                    <br />
                    <br />
                    13. Modification. We reserve the right, in our sole
                    discretion, to modify or replace any of these Terms of
                    Service, or change, suspend, or discontinue the Services
                    (including without limitation, the availability of any
                    feature, database, or Content) at any time by posting
                    updates and/or changes to the Site (or the applicable
                    Services) or by sending you notice through the Services, via
                    e-mail or by another appropriate means of electronic
                    communication. We may also impose limits on certain features
                    and services or restrict your access to parts or all of the
                    Services without notice or liability. You shall be
                    responsible for reviewing and becoming familiar with any
                    such modifications, including by checking these Terms of
                    Service periodically for changes. Your continued use of the
                    Services following notification of any changes to these
                    Terms of Service constitutes acceptance of those changes.
                    <br />
                    <br />
                    14. Miscellaneous. a) Force Majeure. We shall not be liable
                    for any failure to perform our obligations hereunder where
                    such failure results from any cause beyond our reasonable
                    control, including, without limitation, mechanical,
                    electronic or communications failure or degradation.
                    <br />
                    <br />
                    b) Assignment. These Terms of Service are personal to you,
                    and are not assignable, transferable or sublicensable by you
                    except with our prior written consent. We may assign,
                    transfer or delegate any of our rights and obligations
                    hereunder without consent.
                    <br />
                    <br />
                    c) Agency. No agency, partnership, joint venture, or
                    employment relationship is created as a result of these
                    Terms of Service and neither party has any authority of any
                    kind to bind the other in any respect.
                    <br />
                    <br />
                    d) Notices. Unless otherwise specified in these Term of
                    Service, all notices under these Terms of Service will be in
                    writing and will be deemed to have been duly given when
                    received, if personally delivered or sent by certified or
                    registered mail, return receipt requested; when receipt is
                    electronically confirmed, if transmitted by facsimile or
                    e-mail; or the day after it is sent, if sent for next day
                    delivery by recognized overnight delivery service.
                    Electronic notices should be sent to support@blerp.com.
                    <br />
                    <br />
                    e) No Waiver. Our failure to enforce any part of these Terms
                    of Service shall not constitute a waiver of our right to
                    later enforce that or any other part of these Terms of
                    Service. Waiver of compliance in any particular instance
                    does not mean that we will waive compliance in the future.
                    In order for any waiver of compliance with these Terms of
                    Service to be binding, we must provide you with written
                    notice of such waiver through one of our authorized
                    representatives.
                    <br />
                    <br />
                    f) Headings. The section and paragraph headings in these
                    Terms of Service are for convenience only and shall not
                    affect their interpretation.
                    <br />
                    <br />
                    15. Contact. You may contact us at the following address:
                    <br />
                    <br />
                    Blerp Inc. 324 S. 400 W #275 Salt Lake City, 84101
                    <br />
                    <br />
                    Effective Date of Terms of Service: January 1st, 2017
                </StyledText>
            </StyledRow>
        );
    };

    const renderPrivacyPolicy = () => {
        const compile = marksy({
            createElement: React.createElement,
            elements: {
                a: Link,
            },
        });
        return (
            <StyledRow>
                <StyledText>
                    This Privacy Policy describes the policies and procedures of
                    Blerp Inc. ("we", "our" or "us") on the collection, use and
                    disclosure of your information on www.blerp.com (the "Site")
                    and the services, features, content or applications we offer
                    (collectively with the Site, the "Services"). We receive
                    information about you from various sources, including: (i)
                    your use of the Services generally; and (ii) from third
                    party websites and services. When you use the Services, you
                    are consenting to the collection, transfer, manipulation,
                    storage, disclosure and other uses of your information as
                    described in this Privacy Policy.
                    <br />
                    <br />
                    What Does This Privacy Policy Cover?
                    <br />
                    <br />
                    This Privacy Policy covers the treatment of personally
                    identifiable information ("Personal Information") gathered
                    when you are using or accessing the Services. This Privacy
                    Policy also covers our treatment of any Personal Information
                    that our business partners share with us or that we share
                    with our business partners. This Privacy Policy does not
                    apply to the practices of third parties that we do not own
                    or control, including but not limited to any third party
                    websites, services and applications ("Third Party Services")
                    that you elect to access through the Service or to
                    individuals that we do not manage or employ. While we
                    attempt to facilitate access only to those Third Party
                    Services that share our respect for your privacy, we cannot
                    and do not take responsibility for the content or privacy
                    policies of those Third Party Services.
                    <br />
                    <br />
                    What Information Do We Collect?
                    <br />
                    <br />
                    The information we gather enables us to personalize, improve
                    and continue to operate the Services. In connection with
                    certain aspects of the Services, we may request, collect
                    and/or display some of your Personal Information. We collect
                    the following types of information from our users.
                    <br />
                    <br />
                    User Content:
                    <br />
                    <br />
                    Some features of the Services allow you to provide content
                    to the Services. All content submitted by you to the
                    Services may be retained by us indefinitely, even if and
                    after your access to the Services is terminated. We may
                    continue to disclose such content to third parties in a
                    manner that does not reveal Personal Information, as
                    described in this Privacy Policy.
                    <br />
                    <br />
                    IP Address Information and Other Information Collected
                    Automatically:
                    <br />
                    <br />
                    We automatically receive and record information from your
                    web browser when you interact with the Services, including
                    your IP address and cookie information. This information is
                    used for fighting spam/malware and also to facilitate
                    collection of data concerning your interaction with the
                    Services. Generally, the Services automatically collect
                    usage information, such as the number and frequency of
                    visitors to the Site.
                    <br />
                    <br />
                    Information Collected Using Cookies:
                    <br />
                    <br />
                    We use cookies to enable our servers to recognize your web
                    browser and tell us how and when you visit the Site and
                    otherwise use the Services through the internet. Our cookies
                    do not, by themselves, contain Personal Information, and we
                    do not combine the general information collected through
                    cookies with other Personal Information to tell us who you
                    are. As noted, however, we do use cookies to identify that
                    your web browser has accessed aspects of the Services. You
                    can set your browser to not accept cookies, but this may
                    limit your ability to use the Services. This Privacy Policy
                    covers our use of cookies only and does not cover the use of
                    cookies by third parties. We do not control when or how
                    third parties place cookies on your computer.
                    <br />
                    <br />
                    Information Related to Advertising and the Use of Web
                    Beacons:
                    <br />
                    <br />
                    To support and enhance the Services, we may serve
                    advertisements, and also allow third parties advertisements,
                    through the Services. These advertisements are sometimes
                    targeted to particular users and may come from ad networks.
                    Advertisements served through the Services may be targeted
                    to users who fit a certain general profile category, which
                    may be based on anonymized information inferred from
                    information provided to us by a user, on the Services usage
                    patterns of particular users, or on your activity on Third
                    Party Services. We do not provide Personal Information to
                    any ad networks for use outside of the Services. To increase
                    the effectiveness of ad delivery, we may deliver a web
                    beacon from an ad network to you through the Services. Web
                    beacons allow ad networks to provide anonymized, aggregated
                    auditing, research and reporting for us and for advertisers.
                    Web beacons also enable ad networks to serve targeted
                    advertisements to you when you visit other websites. Because
                    your web browser must request these advertisements and web
                    beacons from the ad network's servers, these companies can
                    view, edit or set their own cookies, just as if you had
                    requested a web page from their site.
                    <br />
                    <br />
                    Aggregate Information: We collect statistical information
                    about how users, collectively, use the Services ("Aggregate
                    Information"). Some of this information is derived from
                    Personal Information. This statistical information is not
                    Personal Information and cannot be tied back to you, or your
                    web browser.
                    <br />
                    <br />
                    Protection of Minor’s Personal Information: We do not
                    knowingly collect any Personal Information from minors.
                    <br />
                    <br />
                    How, and With Whom, Is My Information Shared?
                    <br />
                    <br />
                    The Services are designed to help you share information with
                    others. As a result, some of the information generated
                    through the Services is shared publicly or with third
                    parties.
                    <br />
                    <br />
                    Public Information about Your Activity on the Services:
                    <br />
                    <br />
                    Some of your activity on and through the Services is public
                    by default. This may include, but is not limited to, content
                    you have posted publicly on the Site or otherwise through
                    the Services. Information concerning your use of the
                    Services may be tracked anonymously through the use of
                    cookies and stored by us. If you choose to provide Personal
                    Information using certain public features of the Services,
                    then that information is governed by the privacy settings of
                    those particular features and may be publicly available.
                    Individuals reading such information may use or disclose it
                    to other individuals or entities without our control and
                    without your knowledge, and search engines may index that
                    information. We therefore urge you to think carefully about
                    including any specific information you may deem private in
                    content that you create or information that you submit
                    through the Services.
                    <br />
                    <br />
                    IP Address Information:
                    <br />
                    <br />
                    While we collect and store IP address information, that
                    information is not made public. We do at times, however,
                    share this information with our partners, service providers
                    and other persons with whom we conduct business, and as
                    otherwise specified in this Privacy Policy.
                    <br />
                    <br />
                    Information You Elect to Share:
                    <br />
                    <br />
                    You may access other Third Party Services through the
                    Services, for example by clicking on links to those Third
                    Party Services from within the Site. We are not responsible
                    for the privacy policies and/or practices of these Third
                    Party Services, and you are responsible for reading and
                    understanding those Third Party Services' privacy policies.
                    This Privacy Policy only governs information collected on
                    the Services.
                    <br />
                    <br />
                    Aggregate Information:
                    <br />
                    <br />
                    We share Aggregate Information with our partners, service
                    providers and other persons with whom we conduct business.
                    We share this type of statistical data so that our partners
                    can understand how and how often people use our Services and
                    their services or websites, which facilitates improving both
                    their services and how our Services interface with them. In
                    addition, these third parties may share with us non-private,
                    aggregated or otherwise non Personal Information about you
                    that they have independently developed or acquired.
                    <br />
                    <br />
                    Information Shared with Our Agents:
                    <br />
                    <br />
                    We employ and contract with people and other entities that
                    perform certain tasks on our behalf and who are under our
                    control (our "Agents"). We may need to share Personal
                    Information with our Agents in order to provide products or
                    services to you. Unless we tell you differently, our Agents
                    do not have any right to use Personal Information or other
                    information we share with them beyond what is necessary to
                    assist us. You hereby consent to our sharing of Personal
                    Information with our Agents.
                    <br />
                    <br />
                    Information Disclosed Pursuant to Business Transfers:
                    <br />
                    <br />
                    In some cases, we may choose to buy or sell assets. In these
                    types of transactions, user information is typically one of
                    the transferred business assets. Moreover, if we, or
                    substantially all of our assets, were acquired, or if we go
                    out of business or enter bankruptcy, user information would
                    be one of the assets that is transferred or acquired by a
                    third party. You acknowledge that such transfers may occur,
                    and that any acquirer of us or our assets may continue to
                    use your Personal Information as set forth in this policy.
                    <br />
                    <br />
                    Information Disclosed for Our Protection and the Protection
                    of Others:
                    <br />
                    <br />
                    We also reserve the right to access, read, preserve, and
                    disclose any information as it reasonably believes is
                    necessary to (i) satisfy any applicable law, regulation,
                    legal process or governmental request, (ii) enforce these
                    Terms of Service, including investigation of potential
                    violations hereof, (iii) detect, prevent, or otherwise
                    address fraud, security or technical issues, (iv) respond to
                    user support requests, or (v) protect our rights, property
                    or safety, our users and the public. This includes
                    exchanging information with other companies and
                    organizations for fraud protection and spam/malware
                    prevention.
                    <br />
                    <br />
                    Information We Share With Your Consent:
                    <br />
                    <br />
                    Except as set forth above, you will be notified when your
                    Personal Information may be shared with third parties, and
                    will be able to prevent the sharing of this information.
                    <br />
                    <br />
                    Is Information About Me Secure?
                    <br />
                    <br />
                    We seek to protect user information to ensure that it is
                    kept private; however, we cannot guarantee the security of
                    any user information. Unauthorized entry or use, hardware or
                    software failure, and other factors, may compromise the
                    security of user information at any time. We otherwise store
                    all of our information, including your IP address
                    information, using industry-standard techniques. We do not
                    guarantee or warrant that such techniques will prevent
                    unauthorized access to information about you that we store,
                    Personal Information or otherwise.
                    <br />
                    <br />
                    Accessing Your Personal Information
                    <br />
                    <br />
                    Users can access and delete cookies through their web
                    browser settings. California Privacy Rights: Under
                    California Civil Code sections 1798.83-1798.84, California
                    residents are entitled to ask us for a notice identifying
                    the categories of personal customer information which we
                    share with our affiliates and/or third parties for marketing
                    purposes, and providing contact information for such
                    affiliates and/or third parties. If you are a California
                    resident and would like a copy of this notice, please submit
                    a written request to the following address: 324 S. 400 W
                    #275 Salt Lake City, 84101
                    <br />
                    <br />
                    You can use many of the features of the Services without
                    registering, thereby limiting the type of information that
                    we collect. You can always opt not to disclose certain
                    information to us, even though it may be needed to take
                    advantage of some of our features.
                    <br />
                    <br />
                    Changes to this Privacy Policy
                    <br />
                    <br />
                    We may amend this Privacy Policy from time to time. Use of
                    information we collect now is subject to the Privacy Policy
                    in effect at the time such information is used. If we make
                    changes in the way we collect or use information, we will
                    notify you by posting an announcement on the Services. A
                    user is bound by any changes to the Privacy Policy when he
                    or she uses the Services after such changes have been first
                    posted. We encourage you to review this Privacy Policy
                    regularly.
                    <br />
                    <br />
                    What If I Have Questions or Concerns?
                    <br />
                    <br />
                    If you have any questions or concerns regarding privacy
                    using the Services, please send us a detailed message to
                    support@blerp.com. We will make every effort to resolve your
                    concerns. Effective Date: January 1st, 2017
                </StyledText>
            </StyledRow>
        );
    };

    const renderContentPolicy = () => {
        return (
            <>
                <StyledRow ref={overviewSection}>
                    <StyledText fontSize='48px'>
                        Blerp Content Policy
                    </StyledText>
                    <StyledText fontSize='21px' fontWeight='light'>
                        Blerp is the audio expression engine that lets users add
                        soundbites to any moment. Through Blerp’s platform and
                        integrations, you can Discover, Create and Share the
                        best audio clip to express yourself at any moment. We
                        encourage you to explore our content library and create
                        the perfect soundboard for you. While not every Blerp
                        will be for you (some might even be offensive), no sound
                        bite should be used as a weapon. We all have our own way
                        of expressing ourselves and everyone on Blerp should
                        have an expectation of privacy and safety, so please
                        respect the privacy and safety of others. Blerp is
                        committed to creating a safe search experience for all
                        ages, backgrounds, and tastes. Users opt in to the
                        search experience they want by setting the rating
                        guidelines for the types of Blerps they will see.
                    </StyledText>
                </StyledRow>
                <StyledRow ref={rulesSection}>
                    <StyledText fontSize='48px'>Rules</StyledText>
                </StyledRow>
                <StyledRow>
                    <QuestionText fontSize='32px'>
                        Rule 1 | Respect Timing
                    </QuestionText>
                    <AnswerText fontSize='21px' fontWeight='light'>
                        Respect Timing Timing is key, for better and for worse,
                        the timing of a blerp can make or break a moment. But
                        not at the expense of others. Attacking marginalized or
                        vulnerable groups of people is not allowed. Everyone has
                        a right to use Blerp free of harassment, bullying, and
                        threats of violence. Communities and users that incite
                        violence or that promote hate based on identity or
                        vulnerability will be banned.
                    </AnswerText>
                </StyledRow>
                <StyledRow>
                    <QuestionText fontSize='32px'>
                        Rule 2 | No hate speech
                    </QuestionText>
                    <AnswerText fontSize='21px' fontWeight='light'>
                        No hate speech Slurs, and other forms of racist content
                        Hate Speech, Racial, sexual or other slurs are not
                        allowed.
                    </AnswerText>
                </StyledRow>
                <StyledRow>
                    <QuestionText fontSize='32px'>
                        Rule 3 | Keep the kids out of it
                    </QuestionText>
                    <AnswerText fontSize='21px' fontWeight='light'>
                        Keep the Kids out of it Do not post or encourage the
                        posting of sexual or suggestive content involving
                        minors.
                    </AnswerText>
                </StyledRow>
                <StyledRow>
                    <QuestionText fontSize='32px'>
                        Rule 4 | Be yourself
                    </QuestionText>
                    <AnswerText fontSize='21px' fontWeight='light'>
                        Be yourself You don’t have to use your real name to use
                        Blerp, but don’t impersonate an individual or an entity
                        in a misleading or deceptive manner.
                    </AnswerText>
                </StyledRow>
                <StyledRow>
                    <QuestionText fontSize='32px'>
                        Rule 5 | Create good conent
                    </QuestionText>
                    <AnswerText fontSize='21px' fontWeight='light'>
                        Create good content Ensure people have predictable
                        experiences on Blerp by properly labeling Blerps and
                        Soundboards, particularly content that is graphic,
                        sexually explicit, or offensive.
                    </AnswerText>
                </StyledRow>
                <StyledRow>
                    <QuestionText fontSize='32px'>
                        Rule 6 | Don't break stuff
                    </QuestionText>
                    <AnswerText fontSize='21px' fontWeight='light'>
                        Don’t Break Stuff Don’t break the site or do anything
                        that interferes with the normal use of Blerp Enforcement
                        We have a variety of ways of enforcing our rules,
                        including, but not limited to.
                    </AnswerText>
                </StyledRow>
                <StyledRow>
                    <StyledText fontSize='48px' ref={enforcementSection}>
                        Enforcement
                    </StyledText>
                    <StyledText fontSize='21px' fontWeight='light'>
                        We have a variety of ways of enforcing our rules,
                        including, but not limited to:
                    </StyledText>
                    <ul>
                        <li style={{}}>
                            <StyledText fontSize='24px' fontWeight='light'>
                                Changing the rating of content to match the
                                content
                            </StyledText>
                        </li>
                        <li>
                            <StyledText fontSize='24px' fontWeight='light'>
                                Asking you nicely to edit content your to
                                follows our guidelines
                            </StyledText>
                        </li>
                        <li>
                            <StyledText fontSize='24px' fontWeight='light'>
                                Temporary or permanent suspension of accounts
                            </StyledText>
                        </li>
                        <li>
                            <StyledText fontSize='24px' fontWeight='light'>
                                Removal of privileges from, or adding
                                restrictions to, accounts
                            </StyledText>
                        </li>
                        <li>
                            <StyledText fontSize='24px' fontWeight='light'>
                                Adding restrictions to Soundboards, such as
                                adding NSFW tags
                            </StyledText>
                        </li>
                        <li>
                            <StyledText fontSize='24px' fontWeight='light'>
                                Removal of content
                            </StyledText>
                        </li>
                    </ul>
                </StyledRow>
            </>
        );
    };

    return (
        <>
            <NavBar />
            <Container></Container>
            <div ref={topRef}></div>
            <Grid gridColumns='20% 80%' style={{ marginTop: "150px" }}>
                <Column
                    style={{
                        position: "relative",
                        backgroundColor: theme.colors.waxing,
                    }}
                >
                    <Sticky>
                        <StyledText
                            style={{ cursor: "pointer" }}
                            onClick={() => handleScrollClick("top")}
                        >
                            <Icon
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    backgroundSize: "cover",
                                }}
                                url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Legal/scroll%20up%20button.svg'
                            />
                        </StyledText>
                    </Sticky>
                </Column>
                <Column
                    style={{
                        position: "relative",
                        backgroundColor: theme.colors.waxing,
                    }}
                >
                    <Row style={{ marginTop: "40px" }}>
                        <GenericModal
                            gridColumns={"100px"}
                            trigger={
                                <Button
                                    buttonType='custom'
                                    style={{ backgroundColor: "white" }}
                                    rounding='square'
                                >
                                    {renderPage}{" "}
                                    <Icon
                                        size='small'
                                        style={{ marginLeft: "10px" }}
                                        noHover
                                        url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Discord/Down%20arrow.svg'
                                    />
                                </Button>
                            }
                        >
                            {({ handleCloseClick }) => (
                                <>
                                    <StyledText
                                        fontColorHover='ibisRed'
                                        fontSize='16px'
                                        fontColor='notBlack'
                                        fontWeight='light'
                                        onClick={() => {
                                            setRenderPage("Content Policy");
                                            handleCloseClick();
                                            window.history.pushState(
                                                {},
                                                "",
                                                "/content-policy",
                                            );
                                        }}
                                    >
                                        Content Policy
                                    </StyledText>
                                    <StyledText
                                        fontColorHover='ibisRed'
                                        fontSize='16px'
                                        fontColor='notBlack'
                                        fontWeight='light'
                                        onClick={() => {
                                            setRenderPage("TOS");
                                            handleCloseClick();
                                            window.history.pushState(
                                                {},
                                                "",
                                                "/terms-of-service",
                                            );
                                        }}
                                    >
                                        TOS
                                    </StyledText>
                                    <StyledText
                                        fontColorHover='ibisRed'
                                        fontSize='16px'
                                        fontColor='notBlack'
                                        fontWeight='light'
                                        onClick={() => {
                                            setRenderPage("Privacy Policy");
                                            handleCloseClick();
                                            window.history.pushState(
                                                {},
                                                "",
                                                "/privacy-policy",
                                            );
                                        }}
                                    >
                                        Privacy Policy
                                    </StyledText>
                                    <StyledText
                                        fontColorHover='ibisRed'
                                        fontSize='16px'
                                        fontColor='notBlack'
                                        fontWeight='light'
                                        onClick={() => {
                                            setRenderPage("DMCA");
                                            handleCloseClick();
                                            window.history.pushState(
                                                {},
                                                "",
                                                "/dmca",
                                            );
                                        }}
                                    >
                                        DMCA
                                    </StyledText>
                                </>
                            )}
                        </GenericModal>
                    </Row>
                    {renderPage === "Content Policy" ? (
                        renderContentPolicy()
                    ) : (
                        <></>
                    )}
                    {renderPage === "TOS" ? renderTOS() : <></>}
                    {renderPage === "Privacy Policy" ? (
                        renderPrivacyPolicy()
                    ) : (
                        <></>
                    )}
                    {renderPage === "DMCA" ? renderDMCA() : <></>}
                </Column>
            </Grid>
            <Footer />
        </>
    );
};

export default withData(Page);

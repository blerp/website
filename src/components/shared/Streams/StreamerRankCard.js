import React, { useState } from "react";
import { Row } from "../ProfileTabViews/ProfileStyledComponents";
import styled from "styled-components";
import Link from "next/link";
import { Text, Button } from "../../theme/Theme";

const Image = styled.div`
    width: 200px;
    height: 130px;
    background-image: url(${props => props.url});
    background-position: left top;
    background-repeat: no-repeat;
    position: relative;
`;

const Card = styled.div`
    width: 378px;
    height: auto;
    background-color: ${props => props.theme.colors.white};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    box-shadow: 0px 0px 15px #0000001a;
    position: relative;

    ${props =>
        !props.isOnline && props.rank === 1
            ? `
        border: 4px solid gold;
        transform: scale(1.1);
    
        &:after {
            content: "'_'";
            font-size: 0px;
            background-image: url(https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/firstplace%20trophy.svg);
            background-repeat: no-repeat;
            background-position: center;
            width: 50px;
            height: 100px;
            position: absolute;
            bottom: -50px;
            right: 42%;
        }

        @media(max-width: 1300px) {
            width: 300px;  
        }

        @media(max-width: 1000px) {
            width: 400px;  
            margin-bottom: 50px;
            transform: scale(1.0);
        }

        @media(max-width: 600px) {
            width: 100%;
            margin-bottom: 50px;
            transform: scale(1.0);
        }
        `
            : ``}

    ${props =>
        !props.isOnline && props.rank === 2
            ? `
        border: 4px solid #707070;
            
        &:after {
            content: "'_'";
            font-size: 0px;
            background-image: url(https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/secondplace%20medal.svg);
            background-repeat: no-repeat;
            background-position: center;
            width: 50px;
            height: 100px;
            position: absolute;
            bottom: -50px;
            right: 42%;
        }

        @media(max-width: 1300px) {
            width: 300px;  
        }

        @media(max-width: 1000px) {
            width: 400px;
            margin-bottom: 50px;
        }

        @media(max-width: 600px) {
            width: 100%;
        }
        `
            : ``}

    ${props =>
        !props.isOnline && props.rank === 3
            ? `
        border: 4px solid #BA4400;
        
        &:after {
            content: "'_'";
            font-size: 0px;
            background-image: url(https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/3rd%20place%20medal.svg);
            background-repeat: no-repeat;
            background-position: center;
            width: 50px;
            height: 100px;
            position: absolute;
            bottom: -50px;
            right: 42%;
        }

        @media(max-width: 1300px) {
            width: 300px;  
        }

        @media(max-width: 1000px) {
            width: 400px;  
        }

        @media(max-width: 600px) {
            width: 100%;
            margin-bottom: 50px;
        }
        `
            : ``}
`;

const Live = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    right: 15px;
    align-items: center;
`;

const RedDot = styled.div`
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
`;

const StreamerRankCard = props => {
    const [test, setTest] = useState();
    const {
        rank,
        username,
        streamImage,
        streamProfileImage,
        streamUrl,
        userId,
        isOnline,
    } = props;
    const intermediate = streamImage.replace("{height}", 200);
    const newImageUrl = intermediate.replace("{width}", 320);

    return (
        <>
            <Card rank={props.rank} isOnline={isOnline}>
                <Row style={{ width: "100%" }}>
                    <Image
                        style={{
                            flex: 1,
                            backgroundSize: "contain",
                            borderRadius: "8px 0 0 0",
                        }}
                        url={streamProfileImage}
                    />
                    <Image
                        style={{
                            flex: 2,
                            backgroundSize: "cover",
                            borderRadius: "0 8px 0 0",
                        }}
                        url={newImageUrl}
                    >
                        {isOnline && (
                            <Live>
                                <RedDot />
                                <Text fontSize='16px' fontColor='white'>
                                    Live
                                </Text>
                            </Live>
                        )}
                    </Image>
                </Row>
                <Row style={{ width: "90%", margin: "10px auto 0 auto" }}>
                    <Text
                        fontColor='notBlack'
                        fontSize='28px'
                        style={{
                            lineHeight: "24px",
                            maxWidth: "50%",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {username}
                    </Text>
                    <a
                        target='_blank'
                        rel='noreferrer'
                        href={streamUrl}
                        style={{ textDecoration: "none" }}
                    >
                        <Button buttonType='secondary'>View Stream</Button>
                    </a>
                </Row>
                <Row style={{ width: "90%" }}>
                    <Text
                        fontColor='notBlack'
                        fontSize='14px'
                        fontWeight='light'
                    >
                        <b>{rank}</b> Rank
                    </Text>
                    {/* <Link href={`/users/${userId}`}>
                        <Text
                            style={{ marginRight: "45px", cursor: "pointer" }}
                            fontColor='notBlack'
                            fontSize='14px'
                        >
                            Profile
                        </Text>
                    </Link> */}
                </Row>
            </Card>
        </>
    );
};

export default StreamerRankCard;

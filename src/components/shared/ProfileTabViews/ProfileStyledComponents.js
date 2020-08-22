import styled from "styled-components";

export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-self: center;
    height: auto;
    width: 80%;
    margin: 0 auto;

    @media (max-width: 600px) {
        width: 95% !important;
    }
`;

export const MainContentHeaderText = styled.div`
    text-align: center;
    font-size: 20px;
    padding: 20px 0;
    margin: 0 auto;
`;

export const StyledSelect = styled.select`
    border-radius: 0;
    text-align-last: center;
    text-align: center;
    -ms-text-align-last: center;
    -moz-text-align-last: center;
    align-self: center;
    cursor: pointer;
    position: absolute;
    right: 9%;
    &:focus {
        border-radius: 0;
        outline: none;
    }
`;

export const StyledFilter = styled.option`
    background-color: white;
    text-align-last: center;
    text-align: center;
    -ms-text-align-last: center;
    -moz-text-align-last: center;
    display: block;
    margin: 0 auto;
`;

export const ActiveStyledFilter = styled(StyledFilter)`
    color: white;
    background-color: ${props => props.theme.pandaPink};
`;

export const AllBitesContainer = styled.div`
    padding: 40px;
    background-color: transparent;
    border-radius: 0;
`;

export const BoardSquareRow = styled.div`
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    display: flex;
    height: 80px;
    width: 91%;
    text-align: center;
    justify-content: ${props =>
        props.viewType === "list" ? "start" : "center"};
    margin: ${props => (props.viewType === "list" ? "0 0 0 9%" : "0 auto")};
    flex-wrap: ${props => (props.viewType === "list" ? "no-wrap" : "wrap")};
    overflow-x: ${props => (props.viewType === "list" ? "scroll" : "none")};
    transition: 0.3s;
    margin-bottom: 40px;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const BoardSquareContainer = styled.button`
    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    background-size: 140% 140%;
    background-position: center;
    width: 229px;
    height: 166px;
    border-radius: 4px;
    margin: 10px;
    flex: 0 0 auto;
    position: relative;
    padding: 0;
    border: 0px !important;
    transition: 0.5s;

    @media (max-width: 600px) {
        width: 185px;
        height: 130px;
    }

    &:focus {
        border: 0px !important;
        margin-bottom: 10px;
        transform: translate(0, -10px);

        &::after {
            content: "blerblerblerblerblerblerblerblerberlberlberlberlberblerblerb";
            font-size: 6px;
            color: ${props => props.theme.pandaPink};
            width: 200px;
            height: 6px;
            background-color: ${props => props.theme.pandaPink};
            border-radius: 10px;
            margin: 0 auto;
        }
    }
`;

export const BoardFavoriteIcon = styled.button`
    position: absolute;
    top: -5px;
    left: -5px;
    width: 40px;
    height: 40px;
    background-image: url(${props => props.url});
    background-color: ${props =>
        props.active ? props.theme.pandaPink : props.theme.lightGray};
    background-repeat: no-repeat;
    background-size: 15px;
    background-position: center;
    border: 4px solid ${props => props.theme.defaultBackground};
    border-radius: 50%;
    transition: 0.2s;
    z-index: 10;
    cursor: pointer;

    &:focus {
        border: 4px solid ${props => props.theme.defaultBackground};
    }

    &:active {
        border: 4px solid ${props => props.theme.defaultBackground};
        background-color: ${props =>
            props.active ? props.theme.lightGray : props.theme.pandaPink};
        background-image: url(${props => props.url});
        background-repeat: no-repeat;
        background-size: 15px;
        background-position: center;
    }

    &:hover {
        border: 4px solid ${props => props.theme.defaultBackground};
        background: url(${props => props.url}),
            linear-gradient(
                135deg,
                rgba(254, 41, 92, 1) 0%,
                rgba(53, 7, 180, 1) 100%
            );
        background-repeat: no-repeat;
        background-size: auto;
        background-position: center;
        transition: 0.2s;
    }
`;

export const BoardFavoriteIconInline = styled.div`
    width: 32px;
    height: 32px;
    background-image: url(${props => props.url});
    background-color: ${props =>
        props.active ? props.theme.pandaPink : props.theme.lightGray};
    background-repeat: no-repeat;
    background-size: 15px;
    background-position: center;
    border: 4px solid ${props => props.theme.defaultBackground};
    border-radius: 50%;
    transition: 0.2s;
    z-index: 1;

    &:hover {
        background: url(${props => props.url}),
            linear-gradient(
                135deg,
                rgba(254, 41, 92, 1) 0%,
                rgba(53, 7, 180, 1) 100%
            );
        background-repeat: no-repeat;
        background-size: auto;
        background-position: center;
        transition: 0.2s;
    }
`;

export const BoardSquareContainerOverlay = styled.div`
    position: relative;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
    }
`;

export const BoardSquareText = styled.div`
    color: white;
    font-size: 28px;
    width: 80%;
    text-align: center;
    align-self: center;
    width: 200px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    white-space: nowrap;
    text-overflow: ellipses;
    overflow: hidden;

    @media (max-width: 600px) {
        font-size: 28px;
    }
`;

export const BoardSquareContainerSmall = styled.div`
    background-color: ${props => props.theme.flyoutBackground};
    display: grid;
    grid-template-columns: 140px 140px;
    width: 290px;
    height: 104px;
    border-radius: 6px;
    margin: 10px;
    box-shadow: 0px 2px 10px 0px #00000026;
    cursor: pointer;
    position: relative;

    transition: 0.2s;

    &:hover {
        box-shadow: 0px 2px 7px 0px #00000033;
        transition: 0s;
    }

    &:active {
        box-shadow: 0px 1px 5px 0px #00000040;
    }
`;

export const BoardSquareImageSmall = styled.div`
    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 115%;
    height: 104px;
    border-radius: 6px;
    grid: 1;
`;

export const BoardSquareShareButton = styled.div`
    width: 30px;
    height: 30px;

    border: 4px solid #fff;
    border-radius: 50%;

    background-color: ${props => props.theme.grey5};
    background-image: url("https://storage.googleapis.com/blerp_products/Web/Account/White%20Share%20icon.svg");
    background-size: 50% 50%;
    background-repeat: no-repeat;
    background-position: 50% 45%;

    position: absolute;

    bottom: 0px;
    left: 49%;
`;

export const BoardSquareTextSmall = styled.div`
    color: ${props => props.theme.secondaryText};
    font-size: 21px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    align-self: center;
    grid: 2;
    padding-left: 10px;

    @media (max-width: 600px) {
        font-size: 18px;
    }
`;

export const FavoriteBoardHeaderControlsContainer = styled.div`
    width: 100%;
    margin: 20px 0;
    display: grid;
    grid-template-columns: auto auto auto auto auto;
`;

export const FavoriteBoardHeaderControlsText = styled.div`
    font-size: 24px;
    text-align: left;

    @media (max-width: 600px) {
        font-size: 21px;
    }
`;

export const FavoriteBoardHeaderControlsView = styled.div`
    grid-column-start: 5;
    display: grid;
    grid-template-columns: auto auto auto auto auto auto;
`;

export const ControlIcon = styled.div`
    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    background-size: 16px 16px;
    background-position: center;
    float: right;
    width: 40px;
    height: 40px;
    grid-column-start: ${props => props.gridColumn};
    align-self: center;
    justify-self: end;
    cursor: pointer;
    border-radius: 50%;
    transition: 0.2s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 50%;
    }

    @media (max-width: 600px) {
        background-size: 12px 12px;
        width: 30px;
        height: 30px;
        align-self: center;
        ${props => (props.mobileHide ? "display: none;" : "")}
    }
`;

export const BoardContent = styled.div`
    justify-content: center;
    padding: 0 60px;

    @media (max-width: 600px) {
        grid: minmax(auto, max-content) / repeat(auto-fill, 89px);
        grid-gap: 12px;
        padding: 0;
    }
`;

export const MainContentConatiner = styled.div`
    background-color: ${props =>
        props.greyBackground === true
            ? props.theme.defaultBackground
            : props.theme.flyoutBackground};
`;

export const LargeCenterText = styled.h2`
    font-size: 18px;
    text-align: center;
    padding: 30px;
    width: 100%;
    align-self: center;
    font-weight: 300;
    color: ${props => props.theme.grey47};
`;

export const CreateBlerpContainer = styled.a`
    width: 160px;
    height: 260px;
    flex-direction: column;
    position: relative;
    color: ${props => props.theme.bodyText};
    margin: 0 auto;
`;

export const CreateBlerpIcon = styled.div`
    background-image: url(${props => props.icon});
    background-repeat: no-repeat;
    backgroun-size: cover;
    align-self: center;
    margin: 40px auto;
    height: 80px;
    width: 80px;
    cursor: pointer;

    &:hover {
        background-image: url(${props => props.hoverIcon});
    }
`;

export const CreateBlerpText = styled.div`
    font-size: 15px;
    font-weight: normal;
    text-align: center;
    position: absolute;
    bottom: 75px;
`;

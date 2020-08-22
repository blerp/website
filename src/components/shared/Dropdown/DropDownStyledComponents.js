import styled from "styled-components";

export const DropdownWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0 0 0;
    cursor: pointer;
    position: relative;

    &:hover {
        background-color: ${props => props.theme.defaultBackground};
    }
`;

export const DropdownFilterItem = styled.li`
    list-style: none;
    background-color: white;
    text-align-last: center;
    text-align: center;
    -ms-text-align-last: center;
    -moz-text-align-last: center;
    display: block;
    padding: 10px;

    &:hover {
        color: white;
        background-color: ${props => props.theme.pandaPink};
    }
`;

export const DropdownList = styled.ul`
    position: absolute;
    top: 15px;
    padding: 0;
    width: 100%;
    background-color: ${props => props.bgColor};
    box-shadow: 0px 0px 20px #0000001a;
    z-index: 11000;
`;

export const DropdownListItem = styled.li`
    list-style: none;
    color: #706f6b;
    font-size: 16px;
    font-weight: 5;
    &:hover {
        background-color: ${props => props.bgColor};
    }
`;

export const DropdownHeader = styled.div`
    position: relative;
    width: 100%;
    height: 32px;
    background: #f8f8f8 0% 0% no-repeat padding-box;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    z-index: 9000;
`;

export const DropdownHeaderText = styled.p`
    color: ${props => props.theme.secondaryGray};
    font-size: 14px;
    padding: 10px;
    padding-right: 0px;
    margin: 0;
    align-self: center;
    font-weight: 5;
`;

export const DropdownHeaderIcon = styled.img`
    width: 8px;
    height: 8px;
    align-self: center;
    padding: 5px;
`;

export const ControlGrid = styled.div`
    position: absolute;
    right: 10%;
    display: grid;
    grid-template-columns: auto auto auto auto;
    justify-content: center;
    align-self: center;
    transition: 0.2s;
`;

import React, { useState, useEffect, useRef } from "react";
import {
    DropdownWrapper,
    DropdownHeader,
    DropdownHeaderText,
    DropdownHeaderIcon,
    DropdownListItem,
    DropdownList,
    DropdownFilterItem,
} from "./DropDownStyledComponents";
import {
    darkBackground,
    darkestBackground,
    ligherBackground,
    pandaPink,
    defaultBackground,
} from "../../../styles/colors";

const Dropdown = props => {
    const [showList, setShowList] = useState(false);
    const [selectedOption, setSelectedOption] = useState(
        props.currentSelection,
    );

    const dropdownWrapperRef = useRef();

    const closeDropdownOutsideClick = e => {
        if (
            dropdownWrapperRef.current &&
            !dropdownWrapperRef.current.contains(e.target)
        ) {
            setShowList(!showList);
        }
    };

    useEffect(() => {
        if (showList) {
            document.addEventListener("click", closeDropdownOutsideClick);
        }

        return () => {
            document.removeEventListener("click", closeDropdownOutsideClick);
        };
    }, [showList]);

    const renderList = () => {
        return props.options.map(option => {
            if (option == selectedOption) {
                return (
                    <DropdownFilterItem
                        style={{ color: "white", backgroundColor: pandaPink }}
                        onClick={() => {
                            setSelectedOption(option);
                            setShowList(false);
                            props.updateSelection(option);
                        }}
                    >
                        {option.name}
                    </DropdownFilterItem>
                );
            } else {
                return (
                    <DropdownFilterItem
                        bgColor={pandaPink}
                        onClick={() => {
                            setSelectedOption(option);
                            setShowList(false);
                            props.updateSelection(option);
                        }}
                    >
                        {option.name}
                    </DropdownFilterItem>
                );
            }
        });
    };

    const handleSelect = option => {
        setSelectedOption(option);
        setShowList(false);
        if (props.onSelect) {
            props.onSelect(option);
        }
    };

    if (props.type === "filter")
        return (
            <DropdownWrapper
                ref={dropdownWrapperRef}
                style={{
                    alignSelf: "center",
                    margin: "0",
                    cursor: "pointer",
                    zIndex: "9000",
                }}
            >
                <DropdownHeader
                    style={{
                        justifyContent: "center",
                        backgroundColor: "rgba(0,0,0,0)",
                    }}
                    onClick={() => setShowList(!showList)}
                >
                    <DropdownHeaderText style={{ fontSize: "18px" }}>
                        {props.currentSelection}
                    </DropdownHeaderText>
                    <DropdownHeaderIcon
                        style={{ width: "15px", height: "15px" }}
                        src={props.icon}
                    />
                </DropdownHeader>
                {showList ? (
                    <DropdownList style={{ width: "120px" }}>
                        {renderList()}
                    </DropdownList>
                ) : (
                    <></>
                )}
            </DropdownWrapper>
        );

    return (
        <DropdownWrapper ref={dropdownWrapperRef}>
            <DropdownHeader onClick={() => setShowList(!showList)}>
                <DropdownHeaderText>{selectedOption}</DropdownHeaderText>
                <DropdownHeaderIcon src={props.icon} />
            </DropdownHeader>
            {showList ? (
                <DropdownList bgColor={ligherBackground}>
                    {props.options.map(option => (
                        <DropdownFilterItem
                            key={option.name}
                            bgColor={darkBackground}
                            onClick={() => {
                                handleSelect(option);
                            }}
                        >
                            {option}
                        </DropdownFilterItem>
                    ))}
                </DropdownList>
            ) : (
                <></>
            )}
        </DropdownWrapper>
    );
};

export default Dropdown;

import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Button from "../components/theme/Button";
import { Icon } from "../components/theme/Icon";
import { Input } from "../components/theme/Input";
import Modal from "../components/theme/Modal";
import CategoryDropdownText from "../components/theme/CategoryDropdownText";

const page = () => {
    const [gridColumns, setGridColumns] = useState(1);
    const [showExtra, setShowExtra] = useState(false);

    return (
        <>
            <ThemeProvider theme={{ mode: "light" }}>
                <>
                    <Button>Test</Button>
                    <Button buttonType='secondary'>Test</Button>
                    <Button buttonType='third'>Test</Button>
                    <Button color='yellow'>Test</Button>
                    <Button color='red'>Test</Button>
                    <Button color='invisible'>Test</Button>
                    <Modal
                        trigger={<Button>Test</Button>}
                        gridColumns={gridColumns}
                    >
                        <div>
                            <CategoryDropdownText>test</CategoryDropdownText>
                            <CategoryDropdownText active>
                                test
                            </CategoryDropdownText>
                            <CategoryDropdownText
                                onClick={() => {
                                    if (gridColumns === 2) {
                                        setGridColumns(1);
                                    } else {
                                        setGridColumns(2);
                                    }
                                    setShowExtra(!showExtra);
                                }}
                            >
                                Category
                            </CategoryDropdownText>
                            <CategoryDropdownText active>
                                test
                            </CategoryDropdownText>
                            <CategoryDropdownText>test</CategoryDropdownText>
                            <CategoryDropdownText active>
                                test
                            </CategoryDropdownText>
                        </div>
                        <div style={{ display: showExtra ? "block" : "none" }}>
                            <CategoryDropdownText>test</CategoryDropdownText>
                            <CategoryDropdownText active>
                                test
                            </CategoryDropdownText>
                            <CategoryDropdownText active>
                                test
                            </CategoryDropdownText>
                            <CategoryDropdownText>test</CategoryDropdownText>
                            <CategoryDropdownText active>
                                test
                            </CategoryDropdownText>
                        </div>
                    </Modal>
                    <Modal
                        trigger={<Button>Test</Button>}
                        right
                        gridColumns={gridColumns}
                    >
                        <div>
                            <CategoryDropdownText>test</CategoryDropdownText>
                            <CategoryDropdownText active>
                                test
                            </CategoryDropdownText>
                            <CategoryDropdownText
                                onClick={() =>
                                    gridColumns === 2
                                        ? setGridColumns(1)
                                        : setGridColumns(2)
                                }
                            >
                                Category
                            </CategoryDropdownText>
                            <CategoryDropdownText active>
                                test
                            </CategoryDropdownText>
                            <CategoryDropdownText>test</CategoryDropdownText>
                            <CategoryDropdownText active>
                                test
                            </CategoryDropdownText>
                        </div>
                        <div>
                            <CategoryDropdownText>test</CategoryDropdownText>
                            <CategoryDropdownText active>
                                test
                            </CategoryDropdownText>
                            <CategoryDropdownText active>
                                test
                            </CategoryDropdownText>
                            <CategoryDropdownText>test</CategoryDropdownText>
                            <CategoryDropdownText active>
                                test
                            </CategoryDropdownText>
                        </div>
                    </Modal>
                    <br />
                    <ThemeProvider theme={{ mode: "light", rounding: "round" }}>
                        <>
                            <Modal
                                trigger={<Button>Test</Button>}
                                color='lightBlue'
                                gridColumns={2}
                            >
                                <div>
                                    <Input />
                                    <Button>Yeah Boi?</Button>
                                </div>
                                <div>
                                    <Input />
                                    <Button>Yeah Boi?</Button>
                                </div>
                            </Modal>
                        </>
                    </ThemeProvider>
                </>
            </ThemeProvider>
            <br />
            <ThemeProvider theme={{ mode: "dark" }}>
                <>
                    <Button>Test</Button>
                    <Button color='lightBlue'>Test</Button>
                    <Button color='seafoam'>Test</Button>
                    <Button color='yellow'>Test</Button>
                    <Button color='red'>Test</Button>
                    <Button color='invisible'>Test</Button>
                    <Modal
                        trigger={<Button>Test</Button>}
                        color='lightBlue'
                        gridColumns={1}
                    >
                        <div>
                            <Input />
                            <Button>Yeah Boi?</Button>
                        </div>
                        <div>
                            <Input />
                            <Button>Yeah Boi?</Button>
                        </div>
                    </Modal>
                    <Button color='invisible' activeColor='lightBlue'>
                        Test
                    </Button>
                    <Button color='invisible' activeColor='seafoam'>
                        Test
                    </Button>
                    <Button color='invisible' activeColor='yellow'>
                        Test
                    </Button>
                    <Button color='invisible' activeColor='red'>
                        Test
                    </Button>
                    <Button color='lightBlue' fontSize='small'>
                        Test
                    </Button>
                    <Button color='seafoam' fontSize='defualt'>
                        Test
                    </Button>
                    <Button color='yellow' fontSize='big'>
                        Test
                    </Button>
                    <br />
                    <ThemeProvider theme={{ rounding: "round" }}>
                        <>
                            <Button>Test</Button>
                            <Button color='lightBlue'>Test</Button>
                            <Button color='seafoam'>Test</Button>
                            <Button color='yellow'>Test</Button>
                            <Button color='red'>Test</Button>
                            <Button color='invisible'>Test</Button>
                            <Button color='invisible' activeColor='lightBlue'>
                                Test
                            </Button>
                            <Button color='invisible' activeColor='seafoam'>
                                Test
                            </Button>
                            <Button color='invisible' activeColor='yellow'>
                                Test
                            </Button>
                            <Button color='invisible' activeColor='red'>
                                Test
                            </Button>
                            <Button color='lightBlue' fontSize='small'>
                                Test
                            </Button>
                            <Button color='seafoam' fontSize='defualt'>
                                Test
                            </Button>
                            <Button color='yellow' fontSize='big'>
                                Test
                            </Button>
                        </>
                    </ThemeProvider>
                </>
            </ThemeProvider>
            <br />
            <ThemeProvider theme={{ mode: "light" }}>
                <>
                    <Icon
                        url='https://storage.cloud.google.com/blerp_products/Web/Account/zoom%20icon.svg?folder=true&organizationId=true'
                        size='small'
                    ></Icon>
                    <Icon
                        url='https://storage.cloud.google.com/blerp_products/Web/Account/zoom%20icon.svg?folder=true&organizationId=true'
                        size='medium'
                    ></Icon>
                    <Icon
                        url='https://storage.cloud.google.com/blerp_products/Web/Account/zoom%20icon.svg?folder=true&organizationId=true'
                        size='large'
                    ></Icon>
                    <Input placeholder='input some text...' rounding='round' />
                    <Input placeholder='input some text...' rounding='square' />
                    <Input
                        placeholder='input some text...'
                        color='invisible'
                        rounding='none'
                        activeColor='invisible'
                    />
                    <Input
                        placeholder='input some text...'
                        color='invisible'
                        rounding='none'
                        activeColor='invisible'
                        fontSize='small'
                    />
                    <Input
                        placeholder='input some text...'
                        color='invisible'
                        rounding='none'
                        activeColor='invisible'
                        fontSize='default'
                    />
                    <Input
                        placeholder='input some text...'
                        color='invisible'
                        rounding='none'
                        activeColor='invisible'
                        fontSize='big'
                    />
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "auto auto",
                            overflowX: "hidden",
                        }}
                    >
                        <Input
                            placeholder='input some text...'
                            color='grey'
                            rounding='none'
                            fontSize='big'
                            fluid
                        />
                        <Input
                            placeholder='input some text...'
                            color='lightBlue'
                            rounding='none'
                            fontSize='big'
                            fluid
                        />
                        <Input
                            placeholder='input some text...'
                            color='seafoam'
                            rounding='none'
                            fontSize='big'
                            fluid
                        />
                        <Input
                            placeholder='input some text...'
                            color='yellow'
                            rounding='none'
                            fontSize='big'
                            fluid
                        />
                        <Input
                            placeholder='input some text...'
                            color='red'
                            rounding='none'
                            fontSize='big'
                            fluid
                        />
                        <Input
                            placeholder='input some text...'
                            color='invisible'
                            rounding='none'
                            activeColor='invisible'
                            fontSize='big'
                            fluid
                        />
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "auto auto auto",
                            overflowX: "hidden",
                        }}
                    >
                        <Input
                            placeholder='input some text...'
                            color='grey'
                            rounding='square'
                        />
                        <Input
                            placeholder='input some text...'
                            color='lightBlue'
                            rounding='square'
                        />
                        <Input
                            placeholder='input some text...'
                            color='seafoam'
                            rounding='square'
                        />
                        <Input
                            placeholder='input some text...'
                            color='yellow'
                            rounding='square'
                        />
                        <Input
                            placeholder='input some text...'
                            color='red'
                            rounding='square'
                        />
                        <Input
                            placeholder='input some text...'
                            color='invisible'
                            rounding='square'
                            activeColor='invisible'
                        />
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "auto auto auto auto auto auto",
                            overflowX: "hidden",
                        }}
                    >
                        <Input
                            placeholder='input some text...'
                            color='grey'
                            rounding='round'
                            fontSize='small'
                        />
                        <Input
                            placeholder='input some text...'
                            color='lightBlue'
                            rounding='round'
                            fontSize='small'
                        />
                        <Input
                            placeholder='input some text...'
                            color='seafoam'
                            rounding='round'
                            fontSize='small'
                        />
                        <Input
                            placeholder='input some text...'
                            color='yellow'
                            rounding='round'
                            fontSize='small'
                        />
                        <Input
                            placeholder='input some text...'
                            color='red'
                            rounding='round'
                            fontSize='small'
                        />
                        <Input
                            placeholder='input some text...'
                            color='invisible'
                            rounding='round'
                            fontSize='small'
                            activeColor='invisible'
                        />
                    </div>
                    <br />
                    <ThemeProvider theme={{ mode: "dark" }}>
                        <>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "auto auto",
                                    overflowX: "hidden",
                                }}
                            >
                                <Input
                                    placeholder='input some text...'
                                    color='grey'
                                    rounding='none'
                                    fontSize='big'
                                    fluid
                                />
                                <Input
                                    placeholder='input some text...'
                                    color='lightBlue'
                                    rounding='none'
                                    fontSize='big'
                                    fluid
                                />
                                <Input
                                    placeholder='input some text...'
                                    color='seafoam'
                                    rounding='none'
                                    fontSize='big'
                                    fluid
                                />
                                <Input
                                    placeholder='input some text...'
                                    color='yellow'
                                    rounding='none'
                                    fontSize='big'
                                    fluid
                                />
                                <Input
                                    placeholder='input some text...'
                                    color='red'
                                    rounding='none'
                                    fontSize='big'
                                    fluid
                                />
                                <Input
                                    placeholder='input some text...'
                                    color='invisible'
                                    rounding='none'
                                    activeColor='invisible'
                                    fontSize='big'
                                    fluid
                                />
                            </div>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "auto auto auto",
                                    overflowX: "hidden",
                                }}
                            >
                                <Input
                                    placeholder='input some text...'
                                    color='grey'
                                    rounding='square'
                                />
                                <Input
                                    placeholder='input some text...'
                                    color='lightBlue'
                                    rounding='square'
                                />
                                <Input
                                    placeholder='input some text...'
                                    color='seafoam'
                                    rounding='square'
                                />
                                <Input
                                    placeholder='input some text...'
                                    color='yellow'
                                    rounding='square'
                                />
                                <Input
                                    placeholder='input some text...'
                                    color='red'
                                    rounding='square'
                                />
                                <Input
                                    placeholder='input some text...'
                                    color='invisible'
                                    rounding='square'
                                    activeColor='invisible'
                                />
                            </div>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "auto auto auto auto auto auto",
                                    overflowX: "hidden",
                                }}
                            >
                                <Input
                                    placeholder='input some text...'
                                    color='grey'
                                    rounding='round'
                                    fontSize='small'
                                />
                                <Input
                                    placeholder='input some text...'
                                    color='lightBlue'
                                    rounding='round'
                                    fontSize='small'
                                />
                                <Input
                                    placeholder='input some text...'
                                    color='seafoam'
                                    rounding='round'
                                    fontSize='small'
                                />
                                <Input
                                    placeholder='input some text...'
                                    color='yellow'
                                    rounding='round'
                                    fontSize='small'
                                />
                                <Input
                                    placeholder='input some text...'
                                    color='red'
                                    rounding='round'
                                    fontSize='small'
                                />
                                <Input
                                    placeholder='input some text...'
                                    color='invisible'
                                    rounding='round'
                                    fontSize='small'
                                    activeColor='invisible'
                                />
                            </div>
                        </>
                    </ThemeProvider>
                </>
            </ThemeProvider>
            <br />
            <ThemeProvider theme={{ mode: "dark" }}>
                <>
                    <Icon>Test</Icon>
                    <Icon color='lightBlue'>Test</Icon>
                    <Icon color='seafoam'>Test</Icon>
                    <Icon color='yellow'>Test</Icon>
                    <Icon color='red'>Test</Icon>
                    <Icon color='invisible'>Test</Icon>
                    <Icon color='invisible' activeColor='lightBlue'>
                        Test
                    </Icon>
                    <Icon color='invisible' activeColor='seafoam'>
                        Test
                    </Icon>
                    <Icon color='invisible' activeColor='yellow'>
                        Test
                    </Icon>
                    <Icon color='invisible' activeColor='red'>
                        Test
                    </Icon>
                    <Icon color='lightBlue' fontSize='small'>
                        Test
                    </Icon>
                    <Icon color='seafoam' fontSize='defualt'>
                        Test
                    </Icon>
                    <Icon color='yellow' fontSize='big'>
                        Test
                    </Icon>
                    <br />
                    <ThemeProvider theme={{ rounding: "round" }}>
                        <>
                            <Icon>Test</Icon>
                            <Icon color='lightBlue'>Test</Icon>
                            <Icon color='seafoam'>Test</Icon>
                            <Icon color='yellow'>Test</Icon>
                            <Icon color='red'>Test</Icon>
                            <Icon color='invisible'>Test</Icon>
                            <Icon color='invisible' activeColor='lightBlue'>
                                Test
                            </Icon>
                            <Icon color='invisible' activeColor='seafoam'>
                                Test
                            </Icon>
                            <Icon color='invisible' activeColor='yellow'>
                                Test
                            </Icon>
                            <Icon color='invisible' activeColor='red'>
                                Test
                            </Icon>
                            <Icon color='lightBlue' fontSize='small'>
                                Test
                            </Icon>
                            <Icon color='seafoam' fontSize='defualt'>
                                Test
                            </Icon>
                            <Icon color='yellow' fontSize='big'>
                                Test
                            </Icon>
                            <Modal
                                trigger={<Button>Open Modal</Button>}
                                color='lightBlue'
                                test='2'
                                blur
                                modalGridColumns='2'
                            >
                                <div>
                                    <Input />
                                    <Button>Yeah Boi?</Button>
                                </div>
                            </Modal>
                        </>
                    </ThemeProvider>
                </>
            </ThemeProvider>
        </>
    );
};

export default page;

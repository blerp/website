import styled from "styled-components";
import theme from "styled-theming";
import colors from "./colors";

const gridBackgroundColor = theme.variants("mode", "backgroundColor", {
    greyE9: { light: colors.grey3, dark: colors.grey3 },
    offWhite: { light: colors.grey2, dark: colors.grey2 },
    white: { light: colors.white, dark: colors.white },
});

export const Grid = styled.div`
  ${props => `
    display: grid;
    grid-template-columns: ${props.gridColumns};
    padding: ${props.padding};
    margin: ${props.margin};
    `} background-color: ${gridBackgroundColor};

  @media (max-width: 600px) {
    display: block;
  }
`;

export const Column = styled.div`
    ${props => `
    grid-column: span ${props.width};
    align-self: ${props.centerText ? "center" : ""};
    text-align: ${props.centerText ? "center" : "left"};
    text-align: ${props.centerText ? "-webkit-center" : ""};
  `};
`;

export const GridColumn = styled.div`
    ${props => `
    grid-column: span ${props.width};
    text-align: ${props.centerText ? "center" : "left"};
  `};

    @media (max-width: 600px) {
        margin: 0 !important;
    }
`;

Grid.defaultProps = {
    gridColumns: "auto auto",
    backgroundColor: "offWhite",
};

Column.defaultProps = {
    width: 1,
};
// const Grid = props => {

//   return (
//     <Container>
//       {show ? (
//         <>
//           {props.blur ? <TheBlur /> : <></>}
//           <Card ref={cardRef} posY={posY} posX={posX} {...props}>
//             {props.children}
//           </Card>
//         </>
//       ) : (<></>)}
//       <Button
//         color={props.triggerButton && props.triggerButton.color || 'grey'}
//         activeColor={props.triggerButton && props.triggerButton.activeColor || 'grey'}
//         rounding={props.triggerButton && props.triggerButton.rounding || 'square'}
//         textColor={props.triggerButton && props.triggerButton.textColor || 'light'}
//         innerRef={input => setButtonRef(input)}
//         onClick={() => {
//           setShow(true);
//           onMenuClick();
//         }}
//       >
//         Open Modal
//       </Button>
//     </Container>
//   );
// };

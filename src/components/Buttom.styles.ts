import styled, { css } from "styled-components";

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface StyledButtonProps {
  variant: ButtonVariant
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green'
}

export const StyledButton = styled.button<StyledButtonProps>`
  width: 100px;
  height: 48px;

  border-radius: 4px;
  margin: 8px;
  border: 0;

  background-color: ${props => props.theme["green-500"]};
  color:  ${props => props.theme.white};

  /* ${props => {
      return css`
        background-color: ${buttonVariants[props.variant]}
        `
   }} */
`
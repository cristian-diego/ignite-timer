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

  background-color: ${props => props.theme.primary};

  /* ${props => {
      return css`
        background-color: ${buttonVariants[props.variant]}
        `
   }} */
`
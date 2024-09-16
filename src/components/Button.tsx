import { ButtonVariant, StyledButton } from "./Buttom.styles";

interface ButtonProps {
  variant: ButtonVariant
}

export function Button({variant = 'primary' } : ButtonProps) {
  return <StyledButton variant={variant}>Enviar</StyledButton>
}
import { ButtonContainer, ButtonVariant } from './Button.styles'

interface ButtonContainerPros {
  variant?: ButtonVariant
}
export function ButtonComponent({ variant = 'primary' }: ButtonContainerPros) {
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}

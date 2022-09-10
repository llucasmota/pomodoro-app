import styled from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerPros {
  variant: ButtonVariant
}

export const ButtonContainer = styled.button<ButtonContainerPros>`
  width: 100px;
  height: 40px;
  margin: 0 10px;
  color: ${(props) => props.theme.white};
  border-radius: 10px;
  outline: 0;
  border: 0;
  background-color: ${(props) => props.theme['green-300']};
`

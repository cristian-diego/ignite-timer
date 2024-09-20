import styled from 'styled-components'
import { Flag } from 'phosphor-react'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${(props) => props.theme['gray-500']};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['green-500']};
      }

      &.active {
        color: ${(props) => props.theme['green-500']};
      }
    }
  }
`

export const HeaderLeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};
`

interface FlagButtonProps {
  isActive: boolean
}

export const FlagButton = styled.button<FlagButtonProps>`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 0.5rem;

  cursor: pointer;

  background-color: ${(props) => props.theme['gray-700']};

  span {
    color: ${(props) =>
      props.isActive ? props.theme['green-500'] : props.theme['gray-500']};
  }
`

interface StyledFlagProps {
  isActive: boolean
}

export const StyledFlag = styled(Flag)<StyledFlagProps>`
  color: ${(props) =>
    props.isActive ? props.theme['green-500'] : props.theme['gray-500']};
  width: ${(props) => props.size || '24px'};
  height: ${(props) => props.size || '24px'};
`

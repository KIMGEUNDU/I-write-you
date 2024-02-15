/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Common } from '@/style/Common';
import { mq } from '@/style/mq';

type ButtonStyleProps = {
  size: 'small' | 'medium';
  colorType: 'default' | 'red';
};

const ButtonStyle = styled.button<ButtonStyleProps>`
  border-radius: 25px;

  ${(props) => buttonSize[props.size]}
  ${(props) => buttonType[props.colorType]}
`;

interface BunttonProps extends ButtonStyleProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const FriendButton = ({ children, onClick, ...styleProps }: BunttonProps) => {
  return (
    <ButtonStyle {...styleProps} onClick={onClick}>
      {children}
    </ButtonStyle>
  );
};

export default FriendButton;

export const buttonSize = {
  small: css`
    padding: 8px 15px;
    ${mq({
      fontSize: ['17px', '18px', '19px', ' 20px'],
    })}
  `,
  medium: css`
    width: 150px;
    height: 30px;
  `,
};

export const DefaultButton = css`
  background-color: ${Common.colors.lightMint};
  color: white;
  border: none;
  &:hover {
    background-color: #3b9bb2;
  }
`;

export const RedButton = css`
  background-color: #ff6d6d;
  color: white;
  border: none;
  &:hover {
    background-color: #e84343;
  }
`;

export const buttonType = {
  default: DefaultButton,
  red: RedButton,
};

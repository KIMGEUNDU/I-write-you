/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { mq } from '@/style/mq';
import { Common } from '@/style/Common';

export default function FriendNavButton({
  value,
  index,
  state,
  onClick,
}: {
  value: string;
  index: number;
  state: string;
  onClick: () => void;
}) {
  return (
    <li key={index} css={NavButton({ value, state })}>
      <button onClick={onClick}>{value}</button>
    </li>
  );
}

export const NavButton = ({
  value,
  state,
}: {
  value: string;
  state: string;
}) => css`
  width: 80%;

  & > button {
    border: none;
    background: transparent;
    border-bottom: ${value === state
      ? css`solid 3px ${Common.colors.darkNavy}`
      : css`none`};
    color: ${value === state
      ? css`
          ${Common.colors.darkNavy}
        `
      : css`#6E6D8E`};
    font-weight: ${value === state
      ? css`
            bold
          `
      : css`medium`};
    ${mq({
      padding: ['21px 50px', '21px 50px', '22px 50px', ' 23px 80px'],
      fontSize: ['23px', '23px', '26px', ' 27px'],
      width: '100%',
    })};
  }
`;

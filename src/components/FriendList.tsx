/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { mq } from '@/style/mq';
import { Common } from '@/style/Common';

import FriendButton from './FriendButton';
import { SrOnlyStyle } from '@/pages/Login';

export default function FreindList() {
  return (
    <section css={FriendSection}>
      <ul>
        <li css={FriendListItem}>
          <div css={FriendListNumber}>
            <span css={SrOnlyStyle}>1</span>
          </div>
          <span>name</span>
          <FriendButton size="ssmall" colorType="default">
            편지 발송
          </FriendButton>
        </li>
        <li css={FriendListItem}>
          <div css={FriendListNumber}>
            <span css={SrOnlyStyle}>1</span>
          </div>
          <span>name</span>
          <FriendButton size="ssmall" colorType="default">
            편지 발송
          </FriendButton>
        </li>
      </ul>
    </section>
  );
}

export const FriendSection = css`
  margin: 0 auto;
  ${mq({
    width: ['90%', '80%', '75%', '75%'],
  })};
`;

export const FriendListItem = css`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  ${mq({
    margin: ['17px auto', '18px auto', '20px auto', '21px auto'],
  })};

  & > span {
    text-align: start;
    margin-bottom: 3px;

    ${mq({
      flexGrow: '1',
      fontSize: ['21px', '24px', '25px', ' 26px'],
    })};
  }
`;
export const FriendListNumber = css`
  display: inline-block;
  margin: auto 0;
  border-radius: 50%;
  ${mq({
    width: ['27px', '32px', '37px', ' 40px'],
    height: ['27px', '32px', '37px', ' 40px'],
    background: `${Common.colors.lightMint}`,
  })};
`;

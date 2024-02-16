/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { mq } from '@/style/mq';
import { Common } from '@/style/Common';

import FriendButton from './FriendButton';

import { FriendListItem, FriendListNumber, FriendSection } from './FriendList';
import { SrOnlyStyle } from '@/pages/Login';
import FriendRequestForm from './FriendRequestForm';

export default function FriendRequest() {
  return (
    <section css={FriendSection}>
      <h3 css={FriendRequestTitle}>✉️친구 요청 보내기</h3>
      <FriendRequestForm />

      <h3 css={FriendRequestTitle}>📬받은 친구 요청</h3>
      <ul>
        <li css={FriendListItem}>
          <div css={FriendListNumber}>
            <span css={SrOnlyStyle}>1</span>
          </div>
          <span>name</span>
          <div css={FriendRequestBtnBox}>
            <FriendButton size="ssmall" colorType="default">
              수락
            </FriendButton>
            <FriendButton size="ssmall" colorType="red">
              거절
            </FriendButton>
          </div>
        </li>
        <li css={FriendListItem}>
          <div css={FriendListNumber}>
            <span css={SrOnlyStyle}>1</span>
          </div>
          <span>name</span>

          <div css={FriendRequestBtnBox}>
            <FriendButton size="ssmall" colorType="default">
              수락
            </FriendButton>
            <FriendButton size="ssmall" colorType="red">
              거절
            </FriendButton>
          </div>
        </li>
      </ul>
    </section>
  );
}

export const FriendRequestTitle = css`
  text-align: start;
  margin: 25px 0;
  padding-bottom: 5px;
  border-bottom: solid 1px ${Common.colors.darkNavy};
  ${mq({
    fontSize: ['18px', '22px', '24px', ' 25px'],
  })};
`;

/* export const FriendRequestWidth = css`
  & > span {
    ${mq({
      width: ['40%', '40%', '40%', '50%'],
    })};
  }
`; */

export const FriendRequestBtnBox = css`
  display: flex;
  justify-content: end;
  ${mq({
    width: ['50%', '43%', '40%', '30%'],
    gap: ['2px', '4px', '4px', '5px'],
  })};
`;

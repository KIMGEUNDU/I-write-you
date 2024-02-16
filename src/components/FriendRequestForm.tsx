/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { mq } from '@/style/mq';
import { Common } from '@/style/Common';

import FriendButton from './FriendButton';
import { SrOnlyStyle } from '@/pages/Login';

export default function FriendRequestForm() {
  return (
    <form css={Requestform}>
      <label css={SrOnlyStyle} htmlFor="friendRequest">
        친구 요청 보내기
      </label>

      <input
        css={FriendRequestInput}
        id="friendRequest"
        name="friendRequest"
        type="text"
        placeholder="(7자~15자)"
        maxLength={15}
      />
      {/* <img src="/public/pass.png" /> */}

      <FriendButton size="ssmall" colorType="default">
        보내기
      </FriendButton>
    </form>
  );
}
export const Requestform = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  position: relative;
  & > img {
    position: absolute;
    right: 10px;
    top: 5px;
  }
  ${mq({
    height: ['38px', '43px', '46px', '48px'],
  })}
`;

export const FriendRequestInput = css`
  ::placeholder {
    color: ${Common.colors.lightMint};
  }
  :focus {
    border: 2px solid ${Common.colors.lightMint};
  }
  outline: none;

  background: url('/public/noPass.png') no-repeat;
  background: url('/public/pass.png') no-repeat;
  background-position: right 10px top 50%;
  background-size: 6%;

  padding: 0 60px 0 23px;
  border: none;
  border-radius: 25px;
  background-color: white;

  color: ${Common.colors.lightMint};

  ${mq({
    '&::placeholder': {
      fontSize: ['16px', '20px', '20px', ' 22px'],
    },
    fontSize: ['20px', '22px', '23px', ' 24px'],
    width: ['55%', '59%', '63%', '67%'],
    height: ['33px', '43px', '43px', '45px'],
    'margin-bottom': ['8px', '26px', '34px', '36px'],
  })}
`;

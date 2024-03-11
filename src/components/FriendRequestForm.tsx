/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { mq } from '@/style/mq';
import { Common } from '@/style/Common';

import FriendButton from './FriendButton';
import { SrOnlyStyle } from '@/pages/Login';
import { FriendListItem, FriendListNumber } from './FriendList';
import { FriendRequestBtnBox } from './FriendRequest';

import { useRecoilState } from 'recoil';
import { usersInfoState, myInfoState } from '@/recoil/atom/useFriend';

export default function FriendRequestForm() {
  // 본인 uuid 값와 email 값
  const [myInfo, setMyInfo] = useRecoilState(myInfoState);

  // 다른 사용자들 uuid 값와 email 값 리스트
  const [usersInfo, setUsersInfo] = useRecoilState(usersInfoState);

  //TODO: 친구 친구요청 버튼 누를때 본인값과 상대 값 friend 테이블에 올리기
  //친구 수락 버튼
  const handleFriendAccept = (value: infoType) => {
    console.log(value);
    console.log(myInfo);
  };
  return (
    <>
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

        <FriendButton size="small" colorType="default">
          검색
        </FriendButton>
      </form>
      <ul>
        {usersInfo.map((value, index) => {
          return (
            <li key={index} css={FriendListItem}>
              <div css={FriendListNumber}>
                <span css={SrOnlyStyle}>1</span>
              </div>
              <span>{value.email}</span>
              <div css={FriendRequestBtnBox}>
                <FriendButton
                  size="ssmall"
                  colorType="default"
                  onClick={() => handleFriendAccept(value)}
                >
                  친구 요청
                </FriendButton>
              </div>
            </li>
          );
        })}
      </ul>
    </>
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
    marginBottom: ['8px', '26px', '34px', '36px'],
  })}
`;

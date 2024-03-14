/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { mq } from '@/style/mq';
import { Common } from '@/style/Common';

import FriendButton from './FriendButton';
import { SrOnlyStyle } from '@/pages/Login';
import { useEffect, useState } from 'react';
import { supabase } from '@/client';

import { useRecoilState } from 'recoil';
import { myInfoState } from '@/recoil/atom/useFriend';
import { letterState } from '@/recoil/atom/useLetter';

export default function FreindList() {
  const [myInfo, setMyInfo] = useRecoilState(myInfoState);
  const [friendList, setFriendList] = useState<friendData[]>([]);
  const [, setLetter] = useRecoilState(letterState);

  //TODO: myInfo값이 바로 안불러와져서 친구 목록에 친구가 이상하게 나오는 버그
  //* 본인 값 불러오고 그 값으로 자신의 hotelName 가져오기
  useEffect(() => {
    const findAndFetchMyId = async () => {
      try {
        // 사용자 기본 정보를 불러옵니다.
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          // userId를 이용해 추가 정보를 조회합니다.
          const { data: userInfo, error } = await supabase
            .from('userInfo')
            .select('*')
            .eq('userId', user.id);

          // 에러가 없으면 상태를 한 번만 업데이트합니다.
          if (!error && userInfo.length > 0) {
            // 사용자 정보와 추가 정보 모두를 상태에 설정합니다.
            setMyInfo({ id: user.id, email: userInfo[0].hotelName });
          } else {
            // userInfo가 비어있거나 오류가 발생한 경우, 사용자 기본 정보만으로 상태를 업데이트합니다.
            setMyInfo({ id: user.id, email: '' });
          }
        }
      } catch (error) {
        console.log('Error fetching user info: ', error);
      }
    };

    findAndFetchMyId();
  }, []);
  //친구 등록된 사용자 리스트 가져오기 : friends 테이블에서 친구 true된 값만 가져오기
  useEffect(() => {
    console.log(myInfo);
    const fetchFriendList = async () => {
      try {
        const { data, error } = await supabase
          .from('friends')
          .select('*')
          // senderId가 MyInfo.id와 일치하고 status가 true인 조건
          // 또는 receiveId가 MyInfo.id와 일치하고 status가 true인 조건
          .or(
            `senderId.eq.${myInfo.id},receiverId.eq.${myInfo.id},status.is.true`
          );

        if (error) {
          console.error('Error fetching friends:', error);
        } else {
          // 조회된 데이터를 활용
          setFriendList(
            data.filter((value) => {
              return value.status === true;
            })
          );
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };
    fetchFriendList();
  }, []);

  console.log(friendList);

  //* 편지 발송 버튼 누르면 setLetter로 값 변경(sender, receiver 값 전달)
  const handleMoveWriteLetter = (value: friendData) => {
    setLetter((prev) => ({
      ...prev,
      member: true,
      sender: myInfo.email,
      receiver:
        myInfo.email !== value.receiverName
          ? value.receiverName
          : value.senderName,
      secretQuestion: '',
      secretKey: '',
      contents: [],
    }));
  };

  return (
    <section css={FriendSection}>
      <ul>
        {friendList.map((value, index) => {
          return (
            <li key={index} css={FriendListItem}>
              <div css={FriendListNumber}>
                <span css={SrOnlyStyle}>1</span>
              </div>
              <span>
                {value.receiverId === myInfo.id
                  ? value.senderName
                  : value.receiverName}
              </span>
              <Link to={`/writeLetter`}>
                <FriendButton
                  size="ssmall"
                  colorType="default"
                  onClick={() => handleMoveWriteLetter(value)}
                >
                  편지 발송
                </FriendButton>
              </Link>
            </li>
          );
        })}
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
    margin: ['17px auto', '16px auto', '17px auto', '21px auto'],
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

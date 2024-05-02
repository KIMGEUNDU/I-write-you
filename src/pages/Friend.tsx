/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { mq } from '@/style/mq';
import { Helmet } from 'react-helmet-async';
import { Common } from '@/style/Common';
import FreindList from '@/components/FriendList';
import { useEffect, useState } from 'react';
import FriendReceived from '@/components/FriendReceived';
import { useNavigate } from 'react-router-dom';
import FriendNavButton from '@/components/FriendNavButton';
import { supabase } from '@/client';

import { useRecoilState } from 'recoil';
import { myInfoState } from '@/recoil/atom/useFriend';

export default function Friend() {
  const [nav, setNav] = useState('목록');
  const navName = ['목록', '요청'];
  const navigate = useNavigate();

  // 본인 uuid 값와 email 값
  const [, setMyInfo] = useRecoilState(myInfoState);

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
            //localStorage에 나의 정보 담기
            localStorage.setItem(
              'myInfo',
              JSON.stringify({ id: user.id, email: userInfo[0].hotelName })
            );
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

  return (
    <>
      <Helmet>
        <title>친구 목록</title>
      </Helmet>
      <section css={FriendSection}>
        <div css={FriendBox}>
          <header css={FreindHeader}>
            <h2>친구</h2>
            <button
              css={FriendBackButton}
              onClick={() => navigate(-1)}
              type="button"
            >
              <img src="/back.png" alt="뒤로 가기" />
            </button>
          </header>
          <section>
            <nav
              css={css({
                display: 'flex',
                justifyContent: 'center',
              })}
            >
              <ul
                css={mq({
                  display: 'flex',
                  justifyContent: 'center',
                  borderBottom: `solid 2px ${Common.colors.darkNavy}`,
                  width: ['90%', '80%', '75%', '75%'],
                })}
              >
                {navName.map((i, index) => {
                  return (
                    <FriendNavButton
                      key={index}
                      value={i}
                      index={index}
                      state={nav}
                      onClick={() => setNav(i)}
                    />
                  );
                })}
              </ul>
            </nav>
            {nav === '목록' ? <FreindList /> : <FriendReceived />}
          </section>
        </div>
      </section>
    </>
  );
}

export const FriendSection = css`
  position: relative;
  width: 100%;
  min-height: calc(100vh - 100px);
  background-color: ${Common.colors.darkNavy};
  text-align: center;
  padding: 50px 0;
`;

export const FriendBox = mq({
  width: ['100%', '90%', '85%', '792px'],
  background: `${Common.colors.lightPink}`,
  margin: 'auto',
  padding: ['30px 0', '32px 0', '38px 0', '40px 0'],
  borderRadius: '40px',
});

export const FreindHeader = css`
  position: relative;
  & > h2 {
    ${mq({
      fontSize: ['23px', '25px', '30px', ' 32px'],
    })}
  }
`;

export const FriendBackButton = css`
  border: none;
  background: transparent;
  position: absolute;
  height: 5px;
  top: 0;
  left: 6%;
  cursor: pointer;
  & > img {
    ${mq({
      height: ['29px', '30px', '35px', ' 38px'],
    })}
  }
`;

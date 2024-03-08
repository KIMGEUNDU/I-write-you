/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { mq } from '@/style/mq';
import { Helmet } from 'react-helmet-async';
import { Common } from '@/style/Common';
import FreindList from '@/components/FriendList';
import { useEffect, useState } from 'react';
import FriendRequest from '@/components/FriendRequest';
import { useNavigate } from 'react-router-dom';
import FriendNavButton from '@/components/FriendNavButton';
import { supabase } from '@/client';

import { useRecoilState } from 'recoil';
import { usersInfoState, myInfoState } from '@/recoil/atom/useFriend';

export default function Friend() {
  // const main = document.querySelector('main');
  // main?.setAttribute('style', 'background: #2D3A6F');

  const [nav, setNav] = useState('목록');
  const navName = ['목록', '요청'];
  const navigate = useNavigate();
  const [usersInfo, setUsersInfo] = useRecoilState(usersInfoState);
  const [myInfo, setMyInfo] = useRecoilState(myInfoState);

  // 본인 uuid 값와 email 값
  // const [myInfo, setMyInfo] = useState<infoType>({
  //   id: '',
  //   email: '',
  // });

  // 다른 사용자들 uuid 값와 email 값 리스트
  // const [userInfo, setUserInfo] = useState<infoType[]>([]);

  // useEffect(() => {
  //   console.log(usersInfo);

  //   setUsersInfo((prev) => [...prev, { id: 'd', email: 'ddddd' }]);
  // }, []);
  // console.log(usersInfo);

  // 본인 값 불러오기
  useEffect(() => {
    const fetchId = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        setMyInfo(() => ({ id: user!.id, email: user!.email! }));
        // const { data } = await supabase
        //   .from('User')
        //   .select('User UID, Display Name');
        // if (data && data.length > 0) {
        //   setmyInfo({ id: data[0].id, userName: data[0].hotelName });
        // }
        console.log(myInfo);
      } catch (error) {
        console.log(error);
      }
    };
    fetchId();
  }, []);

  // 다른 사용자 값 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await supabase
          .from('userInfo')
          .select('id, hotelName');
        if (data && data.length > 0) {
          const formattedData = data.map((item: any) => ({
            // 데이터를 원하는 형식으로 변환합니다.
            id: item.id,
            email: item.hotelName,
          }));

          setUsersInfo(() => [...formattedData]);
        }

        console.log(usersInfo);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfo();
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
              <img src="/public/back.png" alt="뒤로 가기" />
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
            {nav === '목록' ? <FreindList /> : <FriendRequest />}
          </section>
        </div>
      </section>
    </>
  );
}

export const FriendSection = css`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: ${Common.colors.darkNavy};
  text-align: center;
`;

export const FriendBox = mq({
  width: ['100%', '90%', '85%', '792px'],
  height: ['90%', '90%', '85%', '792px'],
  background: `${Common.colors.lightPink}`,
  margin: 'auto',
  padding: ['30px 0', '32px 0', '38px 0', '40px 0'],
  color: `${Common.colors.darkNavy}`,
  'border-radius': '40px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
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
  & > img {
    ${mq({
      height: ['29px', '30px', '35px', ' 38px'],
    })}
  }
`;

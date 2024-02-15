/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { mq } from '@/style/mq';
import { Helmet } from 'react-helmet-async';
import { Common } from '@/style/Common';
import FreindList from '@/components/FriendList';
import { useState } from 'react';
import FriendRequest from '@/components/FriendRequest';
import { useNavigate } from 'react-router-dom';
import FriendNavButton from '@/components/FriendNavButton';

export default function Friend() {
  // const main = document.querySelector('main');
  // main?.setAttribute('style', 'background: #2D3A6F');

  const [nav, setNav] = useState('목록');
  const navName = ['목록', '요청'];
  const navigate = useNavigate();

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
                css={css({
                  display: 'flex',
                  justifyContent: 'center',
                  borderBottom: `solid 2px ${Common.colors.darkNavy}`,
                  width: '75%',
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
  width: ['95%', '90%', '80%', '792px'],
  height: ['90%', '80%', '80%', '792px'],
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

export const FriendTitle = css`
  ${mq({
    fontSize: ['23px', '25px', '29px', ' 30px'],
  })}
`;

export const FreindHeader = css`
  position: relative;
  & > h2 {
    ${mq({
      fontSize: ['26px', '28px', '30px', ' 32px'],
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

/** @jsxImportSource @emotion/react */

import { Common } from '@/style/Common';
import { mq } from '@/style/mq';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Login() {
  const main = document.querySelector('main');
  main?.setAttribute('style', 'background: #2D3A6F');

  return (
    <>
      <Helmet>
        <title>로그인</title>
      </Helmet>
      <section css={CardFlex}>
        <div css={InviteCard}>
          <h2>로그인</h2>
          <form action="" name="loginForm" className="loginForm" method="POST">
            <fieldset>
              <legend>로그인</legend>
              <label htmlFor="userId">아이디</label>
              <input
                id="userId"
                type="text"
                name="userId"
                placeholder="아이디"
                required
              />
              <label htmlFor="userPassword">비밀번호</label>
              <input
                type="password"
                id="userPassword"
                name="userPassword"
                placeholder="비밀번호"
              />
              <button id="loginBtn" aria-label="로그인 버튼" type="submit">
                체크인
              </button>
              <Link to="/Join" id="JoinBtn" aria-label="회원가입으로 바로가기">
                호텔만들기
              </Link>
            </fieldset>
          </form>
        </div>
      </section>
    </>
  );
}

export const CardFlex = mq({
  width: '100%',
  height: '100%',
  display: 'flex',
  background: `${Common.colors.darkNavy}`,
});

export const InviteCard = mq({
  width: ['95%', '80%', '80%', '792px'],
  height: ['30%', '35%', '50%', '50%'],
  background: `${Common.colors.lightPink}`,
  margin: 'auto',
});

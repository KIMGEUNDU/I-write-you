/** @jsxImportSource @emotion/react */

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CardFlex } from './Login';
import { Common } from '@/style/Common';
import { mq } from '@/style/mq';

export default function Login() {
  const main = document.querySelector('main');
  main?.setAttribute('style', 'background: #2D3A6F');

  return (
    <>
      <Helmet>
        <title>회원가입</title>
      </Helmet>
      <section css={CardFlex}>
        <div css={InviteCard}>
          <h2>회원가입</h2>
          <h3>당신의 호텔을 만들어주세요</h3>
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
              <label htmlFor="checkPassword">비밀번호 확인</label>
              <input
                type="password"
                id="checkPassword"
                name="checkPassword"
                placeholder="비밀번호 확인"
              />
              <label htmlFor="hotelName">
                호텔의 이름은 무엇으로 하시겠습니까?
              </label>
              <input
                type="password"
                id="hotelName"
                name="hotelName"
                placeholder="호텔 이름"
              />
              <Link
                to="/login"
                id="joinBtn"
                aria-label="회원가입 버튼"
                type="submit"
              >
                만들기
              </Link>
              <button id="cancelBtn" aria-label="회원가입 취소 버튼">
                취소
              </button>
            </fieldset>
          </form>
        </div>
      </section>
    </>
  );
}

export const InviteCard = mq({
  width: ['95%', '80%', '80%', '792px'],
  height: ['30%', '35%', '50%', '50%'],
  background: `${Common.colors.lightPink}`,
  margin: 'auto',
});

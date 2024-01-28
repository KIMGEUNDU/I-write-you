/** @jsxImportSource @emotion/react */

import { Common } from '@/style/Common';
import { mq } from '@/style/mq';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';

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
          <h2 css={srOnlyStyle}>로그인</h2>
          <form
            css={LoginForm}
            action=""
            name="loginForm"
            className="loginForm"
            method="POST"
          >
            <fieldset
            /* css={css({ display: 'flex', 'flex-direction': 'column' })} */
            >
              <legend css={srOnlyStyle}>로그인</legend>
              <label htmlFor="userId" css={srOnlyStyle}>
                아이디
              </label>
              <input
                css={CardInput}
                id="userId"
                type="text"
                name="userId"
                placeholder="아이디"
                required
              />
              <label htmlFor="userPassword" css={srOnlyStyle}>
                비밀번호
              </label>
              <input
                css={CardInput}
                type="password"
                id="userPassword"
                name="userPassword"
                placeholder="비밀번호"
              />
              <div css={LoginButtonBox}>
                <Link
                  css={LoginButton}
                  to="/Join"
                  id="JoinBtn"
                  aria-label="회원가입으로 바로가기"
                >
                  호텔만들기
                </Link>
                <button
                  css={LoginButton}
                  id="loginBtn"
                  aria-label="로그인 버튼"
                  type="submit"
                >
                  체크인
                </button>
              </div>
            </fieldset>
          </form>
          <div css={InviteCardRibbon}></div>
        </div>
      </section>
    </>
  );
}

export const LoginButton = css`
  text-decoration: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  ${mq({
    fontSize: ['19px', '21px', '25px', '26px'],
  })};
  color: ${Common.colors.darkPurple};
`;

export const LoginButtonBox = css`
  display: flex;

  justify-content: space-between;
  ${mq({
    'margin-top': ['45px', '50px', '60px', '65px'],
  })}
`;

export const CardInput = css`
  ::placeholder {
    color: ${Common.colors.darkPurple};
  }
  margin: 0 auto;
  border: none;
  background-color: transparent;
  color: ${Common.colors.darkNavy};

  ${mq({
    '&::placeholder': {
      fontSize: ['21px', '23px', '27px', '28px'],
    },
    fontSize: ['21px', '23px', '27px', '28px'],
    width: '100%',
    height: ['45px', '55px', '55px', '60px'],
    margin: ['3px 0', '3px 0', '16px 0', '17px 0'],
  })}
`;

export const LoginForm = css`
  display: inline-block;
  width: 80%;
  margin: auto;
  ${mq({
    width: '70%',
  })}
`;

export const HeightFull = css`
  height: 100%;
`;

export const CardFlex = mq({
  width: '100%',
  height: '100%',
  display: 'flex',
  background: `${Common.colors.darkNavy}`,
});

export const InviteCard = mq({
  position: 'relative',
  width: ['95%', '80%', '80%', '792px'],
  height: ['300px', '390px', '470px', '500px'],
  background: `${Common.colors.lightPink}`,
  margin: 'auto',
  display: 'flex',
});

export const srOnlyStyle = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export const InviteCardRibbon = css`
  position: absolute;
  top: 9px;
  right: -55px;
  transform: rotate(32deg);
  background: ${Common.colors.lightMint};
  ${mq({
    width: ['190px', '200px', '255px', '270px'],
    height: ['42px', '48px', '63px', '63px'],
  })};
`;
